import Link from "next/link";
import { PortalHeader, PortalSidebar, PortalMobileBar } from "./PortalShell";
import {
  FiBriefcase,
  FiCheckCircle,
  FiCreditCard,
  FiDollarSign,
  FiFileText,
  FiGrid,
  FiSearch,
  FiSettings,
  FiShare2,
  FiTarget,
  FiTrendingUp,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import type { IconType } from "react-icons";

export type PortalKind = "business" | "creator";

type NavItem = {
  label: string;
  href: string;
  icon: IconType;
};

type Metric = {
  label: string;
  helper: string;
  value?: string | number;
  icon: IconType;
  tone: string;
};

type Action = {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: IconType;
  tone: string;
};

export const socialGemsEndpoints = {
  auth: ["users/login", "users/signup", "users/getUserProfile", "users/updateProfile"],
  business: [
    "users/verifyBusiness",
    "users/searchUser",
    "users/brandHiredInfluencers",
    "campaigns/getBrandStats",
    "campaigns/brandCampaigns",
  ],
  campaigns: [
    "campaigns/create-draft",
    "campaigns/create",
    "campaigns/edit",
    "campaigns/brandCampaigns",
    "campaigns/get-applications",
    "campaigns/approved-influencers",
    "campaigns/batch-process-applications",
    "campaigns/filterInfluencers",
    "campaigns/prefund",
    "campaigns/cancel",
    "campaigns/approve-submission",
  ],
  jobs: [
    "jobs/list",
    "jobs/create",
    "jobs/brandJobs",
    "jobs/{jobId}/applicants",
    "jobs/shortlist",
    "jobs/accept",
    "jobs/approve",
    "jobs/decline",
    "jobs/sendGuidelines",
    "jobs/markWorkDone",
    "jobs/approveWorkDone",
    "jobs/triggerPayment",
    "jobs/myApplications",
  ],
  creator: [
    "campaigns/explore",
    "campaigns/explore?earningType=affiliate",
    "campaigns/receivedInvites",
    "campaigns/actionInvite",
    "campaigns/userCampaigns",
    "campaigns/start",
    "campaigns/complete",
    "campaigns/affiliate-click",
    "jobs/expressInterest",
    "jobs/myApplications",
  ],
  membership: [
    "payments/getSubscriptions",
    "payments/mySubscription",
    "payments/createSubscription",
    "payments/cancelSubscription",
  ],
  wallet: [
    "wallet/getWallets",
    "payments/walletWithStates",
    "wallet/accountStatement",
    "wallet/addPaymentMethod",
    "wallet/transferRequest",
    "wallet/kesWithdraw",
    "wallet/myKesWithdrawals",
  ],
};

export const businessNav: NavItem[] = [
  { label: "Overview", href: "/business/dashboard", icon: FiGrid },
  { label: "Discover Creators", href: "/business/creators", icon: FiSearch },
  { label: "Campaigns", href: "/business/campaigns", icon: FiTarget },
  { label: "Jobs", href: "/business/jobs", icon: FiBriefcase },
  { label: "Affiliate Programs", href: "/business/affiliate-programs", icon: FiTrendingUp },
  { label: "Opportunities", href: "/business/opportunities", icon: FiFileText },
  { label: "Applicants", href: "/business/applicants", icon: FiUsers },
  { label: "Wallet", href: "/business/wallet", icon: FiDollarSign },
  { label: "Settings", href: "/business/settings", icon: FiSettings },
];

export const creatorNav: NavItem[] = [
  { label: "Overview", href: "/creator/dashboard", icon: FiGrid },
  { label: "Campaigns", href: "/creator/campaigns", icon: FiTarget },
  { label: "Jobs", href: "/creator/jobs", icon: FiBriefcase },
  { label: "Affiliate Programs", href: "/creator/affiliate-programs", icon: FiTrendingUp },
  { label: "Opportunities", href: "/creator/opportunities", icon: FiFileText },
  { label: "Memberships", href: "/creator/memberships", icon: FiCreditCard },
  { label: "Applications", href: "/creator/applications", icon: FiCheckCircle },
  { label: "Wallet", href: "/creator/wallet", icon: FiDollarSign },
  { label: "Social Connect", href: "/creator/social-connect", icon: FiShare2 },
  { label: "Profile", href: "/creator/profile", icon: FiUserCheck },
  { label: "Settings", href: "/creator/settings", icon: FiSettings },
];

export const businessMetrics: Metric[] = [
  { label: "Total Campaigns", helper: "Paid, affiliate, and collaboration campaigns.", icon: FiTarget, tone: "bg-[#e8fff7] text-[#287d69]" },
  { label: "Completed Campaigns", helper: "Campaigns finished and closed.", icon: FiCheckCircle, tone: "bg-[#fff0b8] text-[#734d20]" },
  { label: "Completed Jobs", helper: "Creator jobs completed through the job board.", icon: FiBriefcase, tone: "bg-[#edf3ff] text-[#245d9c]" },
  { label: "Unique Creators", helper: "Creators connected to your brand activity.", icon: FiUsers, tone: "bg-[#e8fff7] text-[#287d69]" },
  { label: "Paid Creators", helper: "Creators paid through SocialGems.", icon: FiUserCheck, tone: "bg-[#fff0b8] text-[#734d20]" },
  { label: "Amount Spent", helper: "Total recorded campaign and job spend.", icon: FiDollarSign, tone: "bg-[#edf3ff] text-[#245d9c]" },
];

export const creatorMetrics: Metric[] = [
  { label: "Campaigns", helper: "Campaign work linked to your creator account.", icon: FiTarget, tone: "bg-[#e8fff7] text-[#287d69]" },
  { label: "Invites", helper: "Brand invitations waiting for your response.", icon: FiFileText, tone: "bg-[#fff0b8] text-[#734d20]" },
  { label: "Job Applications", helper: "Creator jobs you have applied to.", icon: FiBriefcase, tone: "bg-[#edf3ff] text-[#245d9c]" },
  { label: "Affiliate Offers", helper: "Commission opportunities available to browse.", icon: FiTrendingUp, tone: "bg-[#e8fff7] text-[#287d69]" },
  { label: "Subscription", helper: "Your current creator membership status.", icon: FiCreditCard, tone: "bg-[#fff0b8] text-[#734d20]" },
  { label: "Wallet", helper: "Wallet balance and payout status.", icon: FiDollarSign, tone: "bg-[#edf3ff] text-[#245d9c]" },
];

export const businessActions: Action[] = [
  {
    title: "Register & Verify Your Business",
    description: "Create a business account and complete verification to unlock campaigns, jobs, affiliate programs, collaborations, and creator management tools.",
    href: "/business/settings",
    cta: "Verify Business",
    icon: FiCheckCircle,
    tone: "bg-[#fff0b8] text-[#734d20]",
  },
  {
    title: "Create Campaign",
    description: "Build a campaign draft with title, description, dates, objective, image, tasks, earning type, and affiliate link when needed.",
    href: "/business/campaigns",
    cta: "Create Campaign",
    icon: FiTarget,
    tone: "bg-[#e8fff7] text-[#287d69]",
  },
  {
    title: "Find Creators",
    description: "Search and filter creators by audience, niche, social platform, and campaign fit.",
    href: "/business/creators",
    cta: "Discover Creators",
    icon: FiSearch,
    tone: "bg-[#edf3ff] text-[#245d9c]",
  },
  {
    title: "Post Creator Job",
    description: "Create jobs with compensation amount, currency, type, minimum followers, niche, deadline, guidelines, and campaign link.",
    href: "/business/jobs",
    cta: "Post Job",
    icon: FiBriefcase,
    tone: "bg-[#fff0b8] text-[#734d20]",
  },
  {
    title: "Manage Creator Applications",
    description: "View and manage creator applications for your campaigns, jobs, affiliate programs, and collaborations. Registered businesses can review applicants, communicate with creators, approve submissions, request revisions, and manage opportunity progress from one dashboard.",
    href: "/business/applicants",
    cta: "Manage Applications",
    icon: FiUsers,
    tone: "bg-[#e8fff7] text-[#287d69]",
  },
];

export const creatorActions: Action[] = [
  {
    title: "Explore Paid Campaigns",
    description: "Browse paid brand opportunities, including Everything Uganda campaign examples, invite-only campaigns, and Creator Plus or Creator Pro gated opportunities.",
    href: "/creator/signup",
    cta: "Create Your Creator Account",
    icon: FiTarget,
    tone: "bg-[#e8fff7] text-[#287d69]",
  },
  {
    title: "Browse Creator Jobs",
    description: "Find creator jobs posted by businesses and apply directly through SocialGems.",
    href: "/creator/jobs",
    cta: "Join SocialGems to Apply",
    icon: FiBriefcase,
    tone: "bg-[#fff0b8] text-[#734d20]",
  },
  {
    title: "Join Affiliate Programs",
    description: "Promote products, services, travel experiences, accommodation, tours, and destinations, then earn commissions on successful referrals.",
    href: "/creator/affiliate-programs",
    cta: "Join as a Creator",
    icon: FiTrendingUp,
    tone: "bg-[#edf3ff] text-[#245d9c]",
  },
  {
    title: "My Applications",
    description: "Track your campaign, job, affiliate, and collaboration applications from one dashboard.",
    href: "/creator/login",
    cta: "Sign In",
    icon: FiCheckCircle,
    tone: "bg-[#e8fff7] text-[#287d69]",
  },
  {
    title: "Upgrade Membership",
    description: "Compare Free, Creator Plus, and Creator Pro plans, including opportunity access, visibility benefits, and creator growth features.",
    href: "/creator-memberships",
    cta: "View Plans",
    icon: FiCreditCard,
    tone: "bg-[#fff0b8] text-[#734d20]",
  },
];

export function PortalLayout({
  kind,
  title,
  description,
  children,
}: {
  kind: PortalKind;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const nav = kind === "business" ? businessNav : creatorNav;
  const accent = kind === "business" ? "text-[#245d9c]" : "text-[#287d69]";

  return (
    <div className="min-h-screen bg-[#fff7ec]">
      <PortalHeader kind={kind} />
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 pb-24 sm:px-6 lg:grid-cols-[260px_1fr] lg:pb-8 lg:px-8">
        <PortalSidebar nav={nav} kind={kind} />
        <section>
          <div className="rounded-lg border-2 border-[#171717] bg-white p-6 sm:shadow-[8px_8px_0_#fdda6d]">
            <p className={`text-xs font-bold uppercase tracking-[0.16em] ${accent}`}>Workspace</p>
            <h1 className="mt-3 text-3xl font-black text-[#171717] sm:text-4xl">{title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#555]">{description}</p>
          </div>
          <div className="mt-6">{children}</div>
        </section>
      </main>
      <PortalMobileBar nav={nav} kind={kind} />
    </div>
  );
}

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => (
        <article key={metric.label} className="rounded-xl border border-[#eadfca] bg-white p-5 transition hover:-translate-y-1">
          <div className="flex items-start justify-between gap-4">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${metric.tone}`}>
              <metric.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="rounded-full bg-[#f7f3eb] px-3 py-1 text-xs font-bold text-[#555]">Live</p>
          </div>
          <p className="mt-4 text-sm font-bold text-[#171717]">{metric.label}</p>
          {metric.value !== undefined ? (
            <p className="mt-2 text-3xl font-black text-[#171717]">{metric.value}</p>
          ) : null}
          <p className="mt-3 text-xs leading-5 text-[#666]">{metric.helper}</p>
        </article>
      ))}
    </div>
  );
}

export function ActionGrid({ actions }: { actions: Action[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {actions.map((action) => (
        <article key={action.title} className="animate-social-pop rounded-xl border border-[#eadfca] bg-white p-5 transition hover:-translate-y-1">
          <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${action.tone}`}>
            <action.icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-black text-[#171717]">{action.title}</h2>
          <p className="mt-3 text-sm leading-6 text-[#555]">{action.description}</p>
          <Link href={action.href} className="mt-5 inline-flex min-h-11 items-center rounded-md bg-[#287d69] px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#171717]">
            {action.cta}
          </Link>
        </article>
      ))}
    </div>
  );
}

export function EndpointList({ title, endpoints }: { title: string; endpoints: string[] }) {
  return (
    <section className="rounded-lg border border-[#e7e1d6] bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-[#171717]">{title}</h2>
      <div className="mt-4 grid gap-2">
        {endpoints.map((endpoint) => (
          <code key={endpoint} className="rounded-md bg-[#f7f3eb] px-3 py-2 text-xs text-[#333]">
            {endpoint}
          </code>
        ))}
      </div>
    </section>
  );
}

export function PortalEmptyState({
  title,
  description,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-[#d6cdbc] bg-white p-8 text-center">
      <h2 className="text-xl font-bold text-[#171717]">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#555]">{description}</p>
      {ctaHref && ctaLabel ? (
        <Link href={ctaHref} className="mt-6 inline-flex min-h-11 items-center rounded-md bg-[#171717] px-5 py-2 text-sm font-bold text-white">
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
