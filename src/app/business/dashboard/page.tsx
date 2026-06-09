import { ActionGrid, MetricGrid, PortalLayout, businessActions, businessMetrics } from "../../components/portal";
import { getSocialGemsSession, socialGemsApiFetch } from "../../lib/socialgems-api";
import Link from "next/link";
import { FiBriefcase, FiSearch, FiTarget } from "react-icons/fi";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

type BrandStatsResponse = {
  status?: number;
  data?: {
    total_campaigns?: number;
    total_completed_campaigns?: number;
    total_completed_jobs?: number;
    total_unique_influencers?: number;
    total_paid_users?: number;
    total_amount_spent?: number;
  };
};

export default async function BusinessDashboardPage() {
  const session = await getSocialGemsSession();
  const stats = session
    ? await socialGemsApiFetch<BrandStatsResponse>("campaigns/getBrandStats")
    : null;
  const data = stats?.data?.data;
  const metrics = businessMetrics.map((metric) => {
    const valueMap: Record<string, number | string | undefined> = {
      "Total Campaigns": data?.total_campaigns,
      "Completed Campaigns": data?.total_completed_campaigns,
      "Completed Jobs": data?.total_completed_jobs,
      "Unique Creators": data?.total_unique_influencers,
      "Paid Creators": data?.total_paid_users,
      "Amount Spent": data?.total_amount_spent,
    };

    return {
      ...metric,
      value: valueMap[metric.label] ?? (session ? "0" : "Sign in"),
    };
  });

  return (
    <PortalLayout
      kind="business"
      title="Business Dashboard"
      description="Overview for brand campaigns, creator jobs, applicants, creator relationships, spend, and verification status."
    >
      {!session ? (
        <div className="mb-6 rounded-lg border border-[#f0d5a8] bg-[#fff5d5] p-4 text-sm font-semibold text-[#5c4218]">
          Sign in at /business/login to load live business data from the SocialGems backend.
        </div>
      ) : null}
      <MetricGrid metrics={metrics} />
      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <DashboardStep
          icon={<FiSearch className="h-5 w-5" />}
          title="Find matching creators"
          description="Search creators by fit, niche, and audience before launching an opportunity."
          href="/business/creators"
          cta="Discover Creators"
        />
        <DashboardStep
          icon={<FiTarget className="h-5 w-5" />}
          title="Launch a campaign"
          description="Create a paid, affiliate, or collaboration campaign and invite creators."
          href="/business/campaigns"
          cta="Create Campaign"
        />
        <DashboardStep
          icon={<FiBriefcase className="h-5 w-5" />}
          title="Post a creator job"
          description="Recruit UGC creators, influencers, ambassadors, and content creators."
          href="/business/jobs"
          cta="Post Job"
        />
      </section>
      <div className="mt-6">
        <ActionGrid actions={businessActions} />
      </div>
    </PortalLayout>
  );
}

function DashboardStep({
  icon,
  title,
  description,
  href,
  cta,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <article className="rounded-xl border border-[#eadfca] bg-white p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8fff7] text-[#287d69]">
        {icon}
      </div>
      <h2 className="mt-4 text-lg font-black text-[#171717]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[#555]">{description}</p>
      <Link href={href} className="mt-5 inline-flex min-h-10 items-center rounded-md bg-[#171717] px-4 py-2 text-sm font-bold text-white">
        {cta}
      </Link>
    </article>
  );
}
