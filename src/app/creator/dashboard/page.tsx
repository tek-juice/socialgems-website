import { ActionGrid, MetricGrid, PortalLayout, creatorActions, creatorMetrics } from "../../components/portal";
import { getSocialGemsSession, socialGemsApiFetch } from "../../lib/socialgems-api";

export const dynamic = "force-dynamic";

export default async function CreatorDashboardPage() {
  const session = await getSocialGemsSession();
  const [campaigns, invites, applications, subscription, wallet] = session
    ? await Promise.all([
        socialGemsApiFetch("campaigns/userCampaigns"),
        socialGemsApiFetch("campaigns/receivedInvites"),
        socialGemsApiFetch("jobs/myApplications"),
        socialGemsApiFetch("payments/mySubscription"),
        socialGemsApiFetch("payments/walletWithStates"),
      ])
    : [null, null, null, null, null];

  const responseCount = (response: unknown) => {
    const data = (response as { data?: { data?: unknown } } | null)?.data?.data;
    return Array.isArray(data) ? data.length : session ? "Loaded" : "Sign in";
  };

  const metrics = creatorMetrics.map((metric) => {
    const valueMap: Record<string, string | number> = {
      Campaigns: responseCount(campaigns),
      Invites: responseCount(invites),
      "Job Applications": responseCount(applications),
      "Affiliate Offers": "Browse",
      Subscription: subscription ? "Loaded" : session ? "0" : "Sign in",
      Wallet: wallet ? "Loaded" : session ? "0" : "Sign in",
    };

    return { ...metric, value: valueMap[metric.label] };
  });

  return (
    <PortalLayout
      kind="creator"
      title="Creator Dashboard"
      description="Overview for campaigns, invites, jobs, affiliate opportunities, applications, membership, wallet, and profile readiness."
    >
      {!session ? (
        <div className="mb-6 rounded-lg border border-[#f0d5a8] bg-[#fff5d5] p-4 text-sm font-semibold text-[#5c4218]">
          Sign in at /creator/login to load live creator data from the SocialGems backend.
        </div>
      ) : null}
      <MetricGrid metrics={metrics} />
      <div className="mt-6">
        <ActionGrid actions={creatorActions} />
      </div>
    </PortalLayout>
  );
}
