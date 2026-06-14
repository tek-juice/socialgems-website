"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

type ApiResponse<T> = {
  status?: number;
  message?: string;
  data?: T;
};

type JobPost = {
  job_id?: string;
  title?: string;
  description?: string;
  business_name?: string;
  comp_amount?: number | string;
  comp_currency?: string;
  comp_type?: string;
  min_followers?: number;
  niche?: string;
  deadline?: string;
  status?: string;
  access_tier?: string;
  interest_count?: number;
  my_interest_status?: string;
};

type Campaign = {
  campaign_id?: string;
  title?: string;
  description?: string;
  brand_name?: string;
  status?: string;
  objective?: string;
  budget?: number | string;
  earning_type?: string;
  access_tier?: string;
  is_open?: number;
  is_invited?: number;
  invite_status?: string;
  affiliate_link?: string;
  has_joined?: number;
  my_ref_code?: string;
};

type MyAffiliate = {
  campaign_id?: string;
  title?: string;
  brand_name?: string;
  brand_logo?: string;
  image_urls?: string;
  commission_type?: string;
  commission_value?: number | string;
  tracking_url?: string;
  ref_code?: string;
  click_count?: number;
  joined_at?: string;
  affiliate_link?: string;
};

type Application = {
  interest_id?: string;
  job_id?: string;
  creator_id?: string;
  first_name?: string;
  last_name?: string;
  title?: string;
  business_name?: string;
  status?: string;
  note?: string;
  description?: string;
  payment_status?: string;
};

type Creator = {
  user_id?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  profile_pic?: string;
  influencer_rating?: number;
  subscription_badge?: string;
};

type Profile = {
  user_id?: string;
  email?: string;
  user_type?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  phone?: string;
  address?: string;
  subscription_badge?: string;
  business_profile?: {
    name?: string;
    address?: string;
    phone?: string;
    website?: string;
    email?: string;
    description?: string;
    verification_status?: string;
    is_registered?: string;
    registration_number?: string;
    country?: string;
  };
  wallet?: {
    asset?: string;
    balance?: string;
    available_balance?: string;
    pending_balance?: string;
    total_earned?: string;
    total_withdrawn?: string;
  };
};

type Plan = {
  id?: number;
  sub_tag?: string;
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  is_popular?: number;
  features?: string;
};

const everythingUgandaJobs: JobPost[] = [
  {
    job_id: "demo-everything-uganda-ugc",
    title: "UGC Creator for Everything Uganda",
    description: "Create short-form videos, reels, and photo content featuring Uganda travel experiences, tours, accommodation, and adventure destinations.",
    business_name: "Everything Uganda",
    comp_amount: "Project-based",
    comp_currency: "KES",
    comp_type: "paid",
    min_followers: 1000,
    niche: "Travel",
    status: "open",
    access_tier: "creator_plus",
    interest_count: 12,
  },
  {
    job_id: "demo-everything-uganda-lifestyle",
    title: "Lifestyle Influencer for Everything Uganda",
    description: "Share authentic lifestyle and travel content with an audience interested in exploring Uganda, weekend escapes, culture, food, and adventure.",
    business_name: "Everything Uganda",
    comp_amount: "Project-based",
    comp_currency: "KES",
    comp_type: "paid",
    min_followers: 2500,
    niche: "Lifestyle",
    status: "open",
    access_tier: "open",
    interest_count: 8,
  },
];

const everythingUgandaCampaigns: Campaign[] = [
  {
    campaign_id: "demo-everything-uganda-affiliate",
    title: "Everything Uganda Affiliate Program",
    description: "Promote travel experiences, accommodation, tours, and destinations across Uganda and earn commissions on successful referrals.",
    brand_name: "Everything Uganda",
    status: "active",
    objective: "Drive qualified travel referrals through creator-led content.",
    earning_type: "affiliate",
    access_tier: "creator_plus",
    affiliate_link: "https://affiliate.everythinguganda.com/",
  },
  {
    campaign_id: "demo-everything-uganda-expeditions",
    title: "Promote Uganda Adventure Expeditions",
    description: "Create reels, stories, and destination content for Uganda travel expeditions and wild adventure experiences.",
    brand_name: "Everything Uganda",
    status: "active",
    objective: "Increase awareness for Uganda travel expeditions.",
    earning_type: "paid",
    access_tier: "creator_pro",
  },
  {
    campaign_id: "demo-everything-uganda-collab",
    title: "Uganda Travel Storytelling Collaboration",
    description: "Build portfolio content around tourism, culture, nightlife, wildlife, and destination stories across Uganda.",
    brand_name: "Everything Uganda",
    status: "active",
    objective: "Showcase Uganda through creator storytelling.",
    earning_type: "barter",
    access_tier: "open",
  },
];

const fallbackCreatorPlans: Plan[] = [
  {
    sub_tag: "free",
    name: "Free",
    description: "Start with standard access to creator opportunities and core profile tools.",
    price: 0,
    currency: "USD",
    features: "Standard campaign discovery, Standard job board access, Basic profile visibility",
  },
  {
    sub_tag: "creator_plus",
    name: "Creator Plus",
    description: "Access premium opportunities, increase your visibility to businesses, and unlock additional creator benefits.",
    features: "Enhanced campaign discovery, Enhanced job board access, Increased profile visibility",
  },
  {
    sub_tag: "creator_pro",
    name: "Creator Pro",
    description: "Get priority access to opportunities, enhanced profile visibility, and exclusive features designed to help you grow and earn more.",
    is_popular: 1,
    features: "Priority opportunity access, Highest profile visibility, Premium creator growth benefits",
  },
];

const unwrapList = <T,>(payload: unknown): T[] => {
  const response = payload as ApiResponse<T[] | { data?: T[] }>;
  if (Array.isArray(response?.data)) return response.data;
  if (response?.data && "data" in response.data && Array.isArray(response.data.data)) return response.data.data;
  return [];
};

async function api<T = unknown>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(`/api/socialgems/proxy/${path}`, {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}

export function BusinessJobsClient() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [campaigns, setCampaigns] = useState<{ campaign_id?: string; title?: string }[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    comp_amount: "",
    comp_currency: "USD",
    comp_type: "cash",
    min_followers: "0",
    niche: "",
    deadline: "",
    campaign_id: "",
    guidelines_text: "",
    status: "active",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const [jobPayload, campaignPayload] = await Promise.all([
        api<JobPost[]>("jobs/brandJobs"),
        api<{ campaign_id?: string; title?: string }[]>("jobs/brandCampaigns"),
      ]);
      setJobs(unwrapList<JobPost>(jobPayload));
      setCampaigns(unwrapList<{ campaign_id?: string; title?: string }>(campaignPayload));
    } finally {
      setLoading(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const payload = {
      ...form,
      comp_amount: Number(form.comp_amount),
      min_followers: Number(form.min_followers),
      campaign_id: form.campaign_id || undefined,
      niche: form.niche || undefined,
      guidelines_text: form.guidelines_text || undefined,
    };

    const result = await api("jobs/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    setMessage(result.message || (result.status === 200 ? "Job created." : "Unable to create job."));
    if (result.status === 200) {
      setForm({
        title: "",
        description: "",
        comp_amount: "",
        comp_currency: "USD",
        comp_type: "cash",
        min_followers: "0",
        niche: "",
        deadline: "",
        campaign_id: "",
        guidelines_text: "",
        status: "active",
      });
      setIsCreating(false);
      load();
    }
  }

  return (
    <LiveSection title="Creator Jobs" actionLabel={isCreating ? "Close Form" : "Post Job"} onAction={() => setIsCreating((value) => !value)}>
      {message ? <Notice>{message}</Notice> : null}
      {isCreating ? (
        <form onSubmit={submit} className="mb-6 grid gap-4 rounded-lg border border-[#e7e1d6] bg-[#fffdf8] p-4 md:grid-cols-2">
          <Input label="Job Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} required />
          <Input label="Niche" value={form.niche} onChange={(value) => setForm({ ...form, niche: value })} placeholder="UGC, beauty, food, travel..." />
          <Input label="Compensation Amount" type="number" value={form.comp_amount} onChange={(value) => setForm({ ...form, comp_amount: value })} required />
          <Input label="Currency" value={form.comp_currency} onChange={(value) => setForm({ ...form, comp_currency: value })} required />
          <Input label="Compensation Type" value={form.comp_type} onChange={(value) => setForm({ ...form, comp_type: value })} required />
          <Input label="Minimum Followers" type="number" value={form.min_followers} onChange={(value) => setForm({ ...form, min_followers: value })} required />
          <Input label="Deadline" type="date" value={form.deadline} onChange={(value) => setForm({ ...form, deadline: value })} required />
          <label className="block">
            <span className="text-sm font-bold text-[#171717]">Link to Campaign</span>
            <select value={form.campaign_id} onChange={(event) => setForm({ ...form, campaign_id: event.target.value })} className="mt-2 min-h-12 w-full rounded-md border border-[#d8d0c2] px-3 text-[#171717]">
              <option value="">No campaign</option>
              {campaigns.map((campaign) => (
                <option key={campaign.campaign_id} value={campaign.campaign_id}>{campaign.title || campaign.campaign_id}</option>
              ))}
            </select>
          </label>
          <Textarea label="Job Description" value={form.description} onChange={(value) => setForm({ ...form, description: value })} required />
          <Textarea label="Guidelines" value={form.guidelines_text} onChange={(value) => setForm({ ...form, guidelines_text: value })} />
          <button type="submit" className="min-h-12 rounded-md bg-[#171717] px-5 py-3 text-sm font-bold text-white md:col-span-2">
            Create Job
          </button>
        </form>
      ) : null}
      <List loading={loading} empty="No jobs found.">
        {jobs.map((job) => (
          <Card key={job.job_id || job.title} title={job.title || "Untitled job"} badge={job.status || "active"}>
            <p>{job.description || "No description."}</p>
            <Meta items={[`Pay: ${job.comp_currency || ""} ${job.comp_amount || "N/A"}`, `Type: ${job.comp_type || "cash"}`, `Niche: ${job.niche || "Any"}`, `Applicants: ${job.interest_count || 0}`]} />
          </Card>
        ))}
      </List>
    </LiveSection>
  );
}

export function CreatorJobsClient() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [niche, setNiche] = useState("");
  const [message, setMessage] = useState("");
  const [upgradeRequired, setUpgradeRequired] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const result = await api<JobPost[]>(`jobs/list${niche ? `?niche=${encodeURIComponent(niche)}` : ""}`);
    const list = unwrapList<JobPost>(result);
    const demoList = niche
      ? everythingUgandaJobs.filter((job) => `${job.niche} ${job.title}`.toLowerCase().includes(niche.toLowerCase()))
      : everythingUgandaJobs;
    setJobs(list.length ? list : demoList);
    setLoading(false);
  }

  async function expressInterest(jobId?: string, accessTier?: string) {
    if (!jobId) return;
    setUpgradeRequired(false);

    if (jobId.startsWith("demo-")) {
      const isLoggedIn = typeof window !== "undefined" && !!sessionStorage.getItem("socialgemsSession");
      if (accessTier === "creator_plus" || accessTier === "creator_pro") {
        const planName = accessTier === "creator_pro" ? "Creator Pro" : "Creator Plus";
        setMessage(`This opportunity requires ${planName}. Upgrade your plan to apply for opportunities like this.`);
        setUpgradeRequired(true);
      } else if (isLoggedIn) {
        setMessage("Real opportunities will appear here as businesses post jobs. Check back regularly.");
      } else {
        setMessage("Sign in to your creator account to apply for this opportunity.");
      }
      return;
    }

    const note = window.prompt("Add a short note for the business") || "";
    const result = await api("jobs/expressInterest", {
      method: "POST",
      body: JSON.stringify({ job_id: jobId, note }),
    });

    const msg = (result.message || "").toLowerCase();
    const isSubscriptionError =
      msg.includes("subscription") ||
      msg.includes("upgrade") ||
      msg.includes("creator plus") ||
      msg.includes("creator pro") ||
      msg.includes("access tier") ||
      msg.includes("premium") ||
      msg.includes("membership") ||
      (result.status === 403 && !!accessTier && accessTier !== "open" && accessTier !== "free");

    if (isSubscriptionError) {
      setUpgradeRequired(true);
      setMessage(result.message || `This opportunity requires a Creator subscription. Upgrade your plan to apply.`);
    } else {
      setMessage(result.message || "Interest submitted.");
      load();
    }
  }

  return (
    <LiveSection title="Browse Creator Jobs" actionLabel="Search" onAction={load}>
      {message ? (
        <Notice>
          <p>{message}</p>
          {upgradeRequired && (
            <Link
              href="/creator/memberships"
              className="mt-2 inline-flex items-center gap-1 font-bold text-[#287d69] underline underline-offset-2 hover:text-[#171717]"
            >
              View Creator Memberships →
            </Link>
          )}
        </Notice>
      ) : null}
      <div className="mb-4">
        <Input label="Filter by niche" value={niche} onChange={setNiche} placeholder="beauty, food, ugc..." />
      </div>
      <List loading={loading} empty="No jobs available.">
        {jobs.map((job) => (
          <Card key={job.job_id || job.title} title={job.title || "Untitled job"} badge={job.my_interest_status || job.access_tier || "open"}>
            <p>{job.description || "No description."}</p>
            <Meta items={[job.business_name || "Business", `${job.comp_currency || ""} ${job.comp_amount || "N/A"}`, job.niche || "Any niche", `Min followers: ${job.min_followers || 0}`]} />
            <button
              onClick={() => expressInterest(job.job_id, job.access_tier)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-[#171717] px-4 py-2 text-sm font-bold text-white"
            >
              {(job.access_tier === "creator_plus" || job.access_tier === "creator_pro") && (
                <span className="rounded bg-[#fdda6d] px-1.5 py-0.5 text-xs font-black text-[#171717]">
                  {job.access_tier === "creator_pro" ? "Pro" : "Plus"}
                </span>
              )}
              Express Interest
            </button>
          </Card>
        ))}
      </List>
    </LiveSection>
  );
}

export function CreatorCampaignsClient({ affiliateOnly = false, freeOnly = false }: { affiliateOnly?: boolean; freeOnly?: boolean }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [message, setMessage] = useState("");
  const [upgradeRequired, setUpgradeRequired] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState<string | null>(null);
  const [joinedLinks, setJoinedLinks] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, [affiliateOnly]);

  async function load() {
    setLoading(true);
    const result = await api<Campaign[]>(`campaigns/explore${affiliateOnly ? "?earningType=affiliate" : ""}`);
    const list = unwrapList<Campaign>(result).filter((campaign) => !freeOnly || campaign.earning_type === "barter");
    const demoList = everythingUgandaCampaigns.filter((campaign) => {
      if (affiliateOnly) return campaign.earning_type === "affiliate";
      if (freeOnly) return campaign.earning_type === "barter";
      return true;
    });
    setCampaigns(list.length ? list : demoList);
    setLoading(false);
  }

  async function joinAffiliate(campaign: Campaign) {
    if (!campaign.campaign_id) return;
    setUpgradeRequired(false);
    setMessage("");

    if (campaign.campaign_id.startsWith("demo-")) {
      const tier = campaign.access_tier;
      if (tier === "creator_plus" || tier === "creator_pro") {
        const planName = tier === "creator_pro" ? "Creator Pro" : "Creator Plus";
        setMessage(`This affiliate program requires ${planName}. Upgrade your plan to join.`);
        setUpgradeRequired(true);
        return;
      }
      setMessage("Sign up to join this affiliate program and get your unique tracking link.");
      return;
    }

    setJoiningId(campaign.campaign_id);
    const result = await api<{ tracking_url?: string; ref_code?: string }>("campaigns/join-affiliate", {
      method: "POST",
      body: JSON.stringify({ campaignId: campaign.campaign_id }),
    });
    setJoiningId(null);

    const msg = (result.message || "").toLowerCase();
    const isSubscriptionError = msg.includes("subscription") || msg.includes("upgrade") || msg.includes("creator plus") || msg.includes("creator pro") || msg.includes("access tier") || msg.includes("membership");

    if (isSubscriptionError) {
      setUpgradeRequired(true);
      setMessage(result.message || "This campaign requires a Creator subscription.");
    } else if (result.status === 200 && (result.data as { tracking_url?: string })?.tracking_url) {
      const trackingUrl = (result.data as { tracking_url: string }).tracking_url;
      setJoinedLinks((prev) => ({ ...prev, [campaign.campaign_id!]: trackingUrl }));
      load();
    } else {
      setMessage(result.message || "Failed to join program.");
    }
  }

  function copyLink(campaignId: string, url: string) {
    navigator.clipboard.writeText(url);
    setCopiedId(campaignId);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function openInvite(campaign: Campaign, action: "accepted" | "declined") {
    if (!campaign.campaign_id) return;
    const result = await api("campaigns/actionInvite", {
      method: "POST",
      body: JSON.stringify({ campaign_id: campaign.campaign_id, action }),
    });
    setMessage(result.message || "Campaign updated.");
    setUpgradeRequired(false);
    load();
  }

  return (
    <LiveSection
      title={affiliateOnly ? "Affiliate Programs" : freeOnly ? "Free Collaborations" : "Campaigns"}
      actionLabel="Refresh"
      onAction={load}
      headerExtra={affiliateOnly ? <Link href="/creator/my-affiliate-links" className="text-sm font-bold text-[#287d69] underline underline-offset-2">My Links →</Link> : undefined}
    >
      {message ? (
        <Notice>
          <p>{message}</p>
          {upgradeRequired && (
            <Link href="/creator/memberships" className="mt-2 inline-flex items-center gap-1 font-bold text-[#287d69] underline underline-offset-2 hover:text-[#171717]">
              View Creator Memberships →
            </Link>
          )}
        </Notice>
      ) : null}
      <List loading={loading} empty="No campaigns found.">
        {campaigns.map((campaign) => {
          const isAffiliate = campaign.earning_type === "affiliate";
          const alreadyJoined = campaign.has_joined === 1;
          const trackingUrl = joinedLinks[campaign.campaign_id!] ?? (alreadyJoined && campaign.my_ref_code ? `${typeof window !== "undefined" ? window.location.origin : ""}/campaigns/affiliate-redirect/${campaign.my_ref_code}` : null);
          const isJoining = joiningId === campaign.campaign_id;

          return (
            <Card key={campaign.campaign_id || campaign.title} title={campaign.title || "Untitled campaign"} badge={campaign.access_tier || campaign.earning_type || "free"}>
              <p>{campaign.description || "No description."}</p>
              <Meta items={[campaign.brand_name || "Brand", `Type: ${campaign.earning_type || "paid"}`, `Status: ${campaign.status || "active"}`, campaign.objective || "No objective"]} />

              {trackingUrl && (
                <div className="mt-3 flex items-center gap-2 rounded-md border border-[#d8d0c2] bg-[#f9f7f4] px-3 py-2">
                  <span className="flex-1 truncate text-xs text-[#555]">{trackingUrl}</span>
                  <button
                    onClick={() => copyLink(campaign.campaign_id!, trackingUrl)}
                    className="shrink-0 rounded bg-[#171717] px-2 py-1 text-xs font-bold text-white"
                  >
                    {copiedId === campaign.campaign_id ? "Copied!" : "Copy"}
                  </button>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {isAffiliate ? (
                  alreadyJoined || trackingUrl ? (
                    <Link href="/creator/my-affiliate-links" className="inline-flex items-center gap-1.5 rounded-md border border-[#171717] px-4 py-2 text-sm font-bold text-[#171717]">
                      View My Link
                    </Link>
                  ) : (
                    <button
                      onClick={() => joinAffiliate(campaign)}
                      disabled={isJoining}
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#171717] px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
                    >
                      {isJoining ? "Joining…" : "Join Program"}
                    </button>
                  )
                ) : null}
                {campaign.is_invited ? (
                  <>
                    <button onClick={() => openInvite(campaign, "accepted")} className="rounded-md bg-[#171717] px-4 py-2 text-sm font-bold text-white">Accept Invite</button>
                    <button onClick={() => openInvite(campaign, "declined")} className="rounded-md border border-[#171717] px-4 py-2 text-sm font-bold text-[#171717]">Decline</button>
                  </>
                ) : null}
              </div>
            </Card>
          );
        })}
      </List>
    </LiveSection>
  );
}

export function CreatorApplicationsClient() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const result = await api<Application[]>("jobs/myApplications");
    setApplications(unwrapList<Application>(result));
    setLoading(false);
  }

  async function action(path: string, interestId?: string, extra?: Record<string, string>) {
    if (!interestId) return;
    const result = await api(path, {
      method: "POST",
      body: JSON.stringify({ interest_id: interestId, ...extra }),
    });
    setMessage(result.message || "Updated.");
    load();
  }

  return (
    <LiveSection title="My Applications" actionLabel="Refresh" onAction={load}>
      {message ? <Notice>{message}</Notice> : null}
      <List loading={loading} empty="No applications found.">
        {applications.map((application) => (
          <Card key={application.interest_id} title={application.title || "Job application"} badge={application.status || "pending"}>
            <p>{application.description || application.note || "No details."}</p>
            <Meta items={[application.business_name || "Business", `Payment: ${application.payment_status || "N/A"}`, `Job: ${application.job_id || "N/A"}`]} />
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => action("jobs/accept", application.interest_id)} className="rounded-md bg-[#171717] px-4 py-2 text-sm font-bold text-white">Accept</button>
              <button onClick={() => action("jobs/decline", application.interest_id)} className="rounded-md border border-[#171717] px-4 py-2 text-sm font-bold text-[#171717]">Decline</button>
              <button onClick={() => action("jobs/markWorkDone", application.interest_id)} className="rounded-md border border-[#171717] px-4 py-2 text-sm font-bold text-[#171717]">Mark Work Done</button>
            </div>
          </Card>
        ))}
      </List>
    </LiveSection>
  );
}

export function BusinessCreatorsClient() {
  const [query, setQuery] = useState("");
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function search() {
    setLoading(true);
    setMessage("");
    const result = await api<Creator[]>(`users/searchUser?q=${encodeURIComponent(query)}`);
    const list = unwrapList<Creator>(result);
    setCreators(list);
    if (!list.length) setMessage(result.message || "No creators found.");
    setLoading(false);
  }

  return (
    <LiveSection title="Discover Creators" actionLabel="Search Creators" onAction={search}>
      {message ? <Notice>{message}</Notice> : null}
      <div className="mb-4">
        <Input label="Search by name or username" value={query} onChange={setQuery} placeholder="creator name, username, niche..." />
      </div>
      <List loading={loading} empty="Search for creators to begin.">
        {creators.map((creator) => (
          <Card key={creator.user_id || creator.email} title={`${creator.first_name || ""} ${creator.last_name || ""}`.trim() || creator.username || "Creator"} badge={creator.subscription_badge || "creator"}>
            <Meta items={[creator.username || "No username", creator.email || "", `Rating: ${creator.influencer_rating || "N/A"}`]} />
          </Card>
        ))}
      </List>
    </LiveSection>
  );
}

export function BusinessApplicantsClient() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api<JobPost[]>("jobs/brandJobs").then((result) => {
      const list = unwrapList<JobPost>(result);
      setJobs(list);
      if (list[0]?.job_id) setSelectedJob(list[0].job_id);
    });
  }, []);

  useEffect(() => {
    if (selectedJob) loadApplicants();
  }, [selectedJob]);

  async function loadApplicants() {
    setLoading(true);
    const result = await api<Application[]>(`jobs/${selectedJob}/applicants`);
    setApplicants(unwrapList<Application>(result));
    setLoading(false);
  }

  async function applicantAction(path: string, interestId?: string) {
    if (!interestId) return;
    const body: Record<string, string> = { interest_id: interestId };
    if (path === "jobs/shortlist") body.job_id = selectedJob;
    if (path === "jobs/sendGuidelines") body.guidelines = window.prompt("Guidelines") || "";
    if (path === "jobs/requestRevision") body.note = window.prompt("Revision note") || "";

    const result = await api(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
    setMessage(result.message || "Applicant updated.");
    loadApplicants();
  }

  return (
    <LiveSection title="Applicants" actionLabel="Refresh" onAction={loadApplicants}>
      {message ? <Notice>{message}</Notice> : null}
      <label className="mb-4 block">
        <span className="text-sm font-bold text-[#171717]">Select Job</span>
        <select value={selectedJob} onChange={(event) => setSelectedJob(event.target.value)} className="mt-2 min-h-12 w-full rounded-md border border-[#d8d0c2] px-3 text-[#171717]">
          {jobs.map((job) => (
            <option key={job.job_id} value={job.job_id}>{job.title || job.job_id}</option>
          ))}
        </select>
      </label>
      <List loading={loading} empty="No applicants for this job.">
        {applicants.map((applicant) => (
          <Card key={applicant.interest_id} title={`${applicant.first_name || ""} ${applicant.last_name || ""}`.trim() || "Creator"} badge={applicant.status || "pending"}>
            <p>{applicant.note || "No note submitted."}</p>
            <Meta items={[`Creator: ${applicant.creator_id || "N/A"}`, `Payment: ${applicant.payment_status || "N/A"}`]} />
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => applicantAction("jobs/shortlist", applicant.interest_id)} className="rounded-md bg-[#171717] px-4 py-2 text-sm font-bold text-white">Shortlist</button>
              <button onClick={() => applicantAction("jobs/approve", applicant.interest_id)} className="rounded-md border border-[#171717] px-4 py-2 text-sm font-bold text-[#171717]">Approve</button>
              <button onClick={() => applicantAction("jobs/decline", applicant.interest_id)} className="rounded-md border border-[#171717] px-4 py-2 text-sm font-bold text-[#171717]">Decline</button>
              <button onClick={() => applicantAction("jobs/sendGuidelines", applicant.interest_id)} className="rounded-md border border-[#171717] px-4 py-2 text-sm font-bold text-[#171717]">Send Guidelines</button>
              <button onClick={() => applicantAction("jobs/requestRevision", applicant.interest_id)} className="rounded-md border border-[#171717] px-4 py-2 text-sm font-bold text-[#171717]">Request Revision</button>
              <button onClick={() => applicantAction("jobs/approveWorkDone", applicant.interest_id)} className="rounded-md border border-[#171717] px-4 py-2 text-sm font-bold text-[#171717]">Approve Work</button>
              <button onClick={() => applicantAction("jobs/triggerPayment", applicant.interest_id)} className="rounded-md border border-[#171717] px-4 py-2 text-sm font-bold text-[#171717]">Trigger Payment</button>
            </div>
          </Card>
        ))}
      </List>
    </LiveSection>
  );
}

export function CreatorProfileClient() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ first_name: "", last_name: "", username: "", bio: "", address: "", phone: "" });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const result = await api<Profile>("users/getUserProfile");
    const data = result.data as Profile | undefined;
    setProfile(data || null);
    setForm({
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      username: data?.username || "",
      bio: data?.bio || "",
      address: data?.address || "",
      phone: data?.phone || "",
    });
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await api("users/updateProfile", { method: "PATCH", body: JSON.stringify(form) });
    setMessage(result.message || "Profile updated.");
    load();
  }

  return (
    <LiveSection title="Creator Profile" actionLabel="Refresh" onAction={load}>
      {message ? <Notice>{message}</Notice> : null}
      <form onSubmit={save} className="grid gap-4 md:grid-cols-2">
        <Input label="First Name" value={form.first_name} onChange={(value) => setForm({ ...form, first_name: value })} />
        <Input label="Last Name" value={form.last_name} onChange={(value) => setForm({ ...form, last_name: value })} />
        <Input label="Username" value={form.username} onChange={(value) => setForm({ ...form, username: value })} />
        <Input label="Phone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
        <Input label="Address" value={form.address} onChange={(value) => setForm({ ...form, address: value })} />
        <Textarea label="Bio" value={form.bio} onChange={(value) => setForm({ ...form, bio: value })} />
        <button type="submit" className="min-h-12 rounded-md bg-[#171717] px-5 py-3 text-sm font-bold text-white md:col-span-2">Save Profile</button>
      </form>
      <Meta items={[`Email: ${profile?.email || "N/A"}`, `Plan: ${profile?.subscription_badge || "free"}`, `Wallet: ${profile?.wallet?.asset || ""} ${profile?.wallet?.available_balance || profile?.wallet?.balance || "0"}`]} />
    </LiveSection>
  );
}

export function CreatorMembershipsClient() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [current, setCurrent] = useState<unknown>(null);
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [message, setMessage] = useState("");
  const [upgradeRequired, setUpgradeRequired] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const [plansResult, myResult, walletResult] = await Promise.all([
      api<Plan[]>("payments/getSubscriptions"),
      api("payments/mySubscription"),
      api("payments/walletWithStates"),
    ]);
    setPlans(unwrapList<Plan>(plansResult));
    setCurrent(myResult.data || null);
    const raw = walletResult.data as { data?: WalletData } | WalletData | undefined;
    setWallet(raw && typeof raw === "object" && "data" in raw ? raw.data ?? null : (raw as WalletData | undefined) ?? null);
    setLoading(false);
  }

  async function subscribeViaWallet(plan: Plan) {
    if (!plan.id) {
      setMessage("Plan pricing not available yet.");
      setUpgradeRequired(false);
      return;
    }
    setMessage("");
    setUpgradeRequired(false);
    const result = await api("payments/createSubscription", {
      method: "POST",
      body: JSON.stringify({ sub_tag: plan.sub_tag, subscription_id: plan.id, payment_method: "wallet" }),
    });
    setMessage(result.message || "Subscription activated.");
    const msg = (result.message || "").toLowerCase();
    if (msg.includes("insufficient") || msg.includes("balance") || msg.includes("fund")) {
      setUpgradeRequired(true);
    } else {
      load();
    }
  }

  async function subscribeViaMpesa(plan: Plan) {
    if (!plan.id) {
      setMessage("Live subscription checkout will be available when plan pricing is supplied.");
      setUpgradeRequired(false);
      return;
    }
    setMessage("");
    setUpgradeRequired(false);
    const result = await api("payments/createSubscription", {
      method: "POST",
      body: JSON.stringify({ sub_tag: plan.sub_tag, subscription_id: plan.id }),
    });
    setMessage(result.message || "Subscription request created.");
    const data = result.data as { checkoutUrl?: string; url?: string } | undefined;
    const checkoutUrl = data?.checkoutUrl || data?.url;
    if (checkoutUrl) window.location.href = checkoutUrl;
  }

  async function cancel() {
    const result = await api("payments/cancelSubscription", { method: "POST", body: JSON.stringify({}) });
    setMessage(result.message || "Subscription cancelled.");
    setUpgradeRequired(false);
    load();
  }

  const displayPlans = plans.length ? plans : fallbackCreatorPlans;
  const walletBalance = parseFloat(wallet?.available_balance ?? wallet?.balance ?? "0");
  const walletCurrency = wallet?.currency ?? wallet?.asset ?? "KES";

  return (
    <LiveSection title="Creator Memberships" actionLabel="Refresh" onAction={load}>
      {/* Wallet balance banner */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#e7e1d6] bg-[#fffdf8] px-4 py-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#555]">Wallet Balance</p>
          <p className="mt-0.5 text-xl font-black text-[#171717]">
            {wallet ? `KES ${walletBalance.toLocaleString()}` : "—"}
          </p>
        </div>
        <Link
          href="/creator/wallet"
          className="rounded-md border-2 border-[#171717] bg-[#fdda6d] px-4 py-2 text-sm font-bold text-[#171717] transition hover:bg-[#171717] hover:text-white"
        >
          Fund Wallet via M-Pesa
        </Link>
      </div>

      {message ? (
        <Notice>
          <p>{message}</p>
          {upgradeRequired && (
            <Link href="/creator/wallet" className="mt-2 inline-flex items-center gap-1 font-bold text-[#287d69] underline underline-offset-2 hover:text-[#171717]">
              Fund Wallet via M-Pesa →
            </Link>
          )}
        </Notice>
      ) : null}
      {current ? <Notice>Current subscription data loaded.</Notice> : null}
      {!loading && !plans.length ? <Notice>Showing default plan details until live subscription data is available.</Notice> : null}

      <List loading={loading} empty="No subscription plans found.">
        {displayPlans.map((plan) => {
          const planPrice = plan.price ?? 0;
          const planCurrency = plan.currency ?? "KES";
          const canPayFromWallet = plan.id !== undefined && planPrice > 0 && planCurrency === walletCurrency && walletBalance >= planPrice;
          const isFree = planPrice === 0 || plan.sub_tag === "free";

          return (
            <Card key={plan.id || plan.sub_tag} title={plan.name || plan.sub_tag || "Plan"} badge={plan.is_popular ? "Popular" : plan.sub_tag}>
              <p>{plan.description || plan.features || "No description."}</p>
              {plan.features ? (
                <div className="mt-4 grid gap-2">
                  {plan.features.split(",").map((feature) => (
                    <p key={feature.trim()} className="rounded-md bg-[#f7f3eb] px-3 py-2 text-xs font-semibold text-[#333]">
                      {feature.trim()}
                    </p>
                  ))}
                </div>
              ) : null}
              <Meta items={[planPrice > 0 ? `${planCurrency} ${planPrice.toLocaleString()} / month` : "Free"]} />
              {isFree ? (
                <p className="mt-4 text-sm font-semibold text-[#287d69]">Your current free access</p>
              ) : (
                <div className="mt-4 flex flex-wrap gap-2">
                  {/* Pay from wallet — shown when balance is sufficient */}
                  <button
                    onClick={() => subscribeViaWallet(plan)}
                    disabled={!canPayFromWallet && plan.id !== undefined}
                    className={`rounded-md px-4 py-2 text-sm font-bold transition ${
                      canPayFromWallet
                        ? "bg-[#287d69] text-white hover:bg-[#1e6155]"
                        : "cursor-not-allowed bg-[#e7e1d6] text-[#999]"
                    }`}
                    title={canPayFromWallet ? "Pay using your wallet balance" : "Insufficient wallet balance"}
                  >
                    Pay from Wallet
                  </button>
                  {/* Pay via M-Pesa — always available */}
                  <button
                    onClick={() => subscribeViaMpesa(plan)}
                    className="rounded-md bg-[#171717] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#333]"
                  >
                    Pay via M-Pesa
                  </button>
                </div>
              )}
            </Card>
          );
        })}
      </List>
      <button onClick={cancel} className="mt-4 rounded-md border border-[#171717] px-4 py-2 text-sm font-bold text-[#171717]">
        Cancel Current Subscription
      </button>
    </LiveSection>
  );
}

export function CreatorSettingsClient() {
  return (
    <LiveSection title="Creator Settings" actionLabel="Refresh Wallet" onAction={() => window.location.reload()}>
      <WalletPanel />
      <AccountActions />
    </LiveSection>
  );
}

export function BusinessSettingsClient() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [message, setMessage] = useState("");
  const business = profile?.business_profile;
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    website: "",
    email: "",
    description: "",
    is_registered: "yes",
    registration_number: "",
    country: "",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const result = await api<Profile>("users/getUserProfile");
    const data = result.data as Profile | undefined;
    setProfile(data || null);
    setForm({
      name: data?.business_profile?.name || "",
      address: data?.business_profile?.address || "",
      phone: data?.business_profile?.phone || "",
      website: data?.business_profile?.website || "",
      email: data?.business_profile?.email || data?.email || "",
      description: data?.business_profile?.description || "",
      is_registered: data?.business_profile?.is_registered || "yes",
      registration_number: data?.business_profile?.registration_number || "",
      country: data?.business_profile?.country || "",
    });
  }

  async function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await api("users/verifyBusiness", { method: "POST", body: JSON.stringify(form) });
    setMessage(result.message || "Business verification submitted.");
    load();
  }

  return (
    <LiveSection title="Business Settings and Verification" actionLabel="Refresh" onAction={load}>
      {message ? <Notice>{message}</Notice> : null}
      <Notice>Verification status: {business?.verification_status || "not submitted"}</Notice>
      <form onSubmit={verify} className="grid gap-4 md:grid-cols-2">
        <Input label="Business Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
        <Input label="Business Email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
        <Input label="Phone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
        <Input label="Website" value={form.website} onChange={(value) => setForm({ ...form, website: value })} />
        <Input label="Country" value={form.country} onChange={(value) => setForm({ ...form, country: value })} />
        <Input label="Registration Number" value={form.registration_number} onChange={(value) => setForm({ ...form, registration_number: value })} />
        <Input label="Address" value={form.address} onChange={(value) => setForm({ ...form, address: value })} />
        <label className="block">
          <span className="text-sm font-bold text-[#171717]">Registered Business</span>
          <select value={form.is_registered} onChange={(event) => setForm({ ...form, is_registered: event.target.value })} className="mt-2 min-h-12 w-full rounded-md border border-[#d8d0c2] px-3 text-[#171717]">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <Textarea label="Business Description" value={form.description} onChange={(value) => setForm({ ...form, description: value })} />
        <button type="submit" className="min-h-12 rounded-md bg-[#171717] px-5 py-3 text-sm font-bold text-white md:col-span-2">Submit Verification</button>
      </form>
      <div className="mt-6">
        <WalletPanel />
      </div>
    </LiveSection>
  );
}

function WalletPanel() {
  const [wallet, setWallet] = useState<Profile["wallet"] | null>(null);
  useEffect(() => {
    api("payments/walletWithStates").then((result) => {
      const data = result.data as { data?: Profile["wallet"] } | Profile["wallet"] | undefined;
      const resolvedWallet: Profile["wallet"] | null =
        data && typeof data === "object" && "data" in data ? data.data || null : (data as Profile["wallet"] | undefined) || null;
      setWallet(resolvedWallet);
    });
  }, []);
  return (
    <div className="rounded-lg border border-[#e7e1d6] bg-[#fffdf8] p-4">
      <h3 className="text-lg font-bold text-[#171717]">Wallet</h3>
      <Meta items={[`Asset: ${wallet?.asset || "N/A"}`, `Available: ${wallet?.available_balance || wallet?.balance || "0"}`, `Pending: ${wallet?.pending_balance || "0"}`, `Earned: ${wallet?.total_earned || "0"}`]} />
    </div>
  );
}

function AccountActions() {
  async function logout() {
    await fetch("/api/socialgems/logout", { method: "POST" });
    window.location.href = "/";
  }
  return (
    <div className="mt-4 rounded-lg border border-[#e7e1d6] bg-[#fffdf8] p-4">
      <h3 className="text-lg font-bold text-[#171717]">Account</h3>
      <button onClick={logout} className="mt-4 rounded-md bg-[#171717] px-4 py-2 text-sm font-bold text-white">Sign Out</button>
    </div>
  );
}

// ─── Wallet ───────────────────────────────────────────────────────────────────

type Transaction = {
  transaction_id?: string;
  reference_id?: string;
  amount?: string | number;
  currency?: string;
  type?: string;
  transaction_type?: string;
  status?: string;
  narration?: string;
  description?: string;
  created_at?: string;
};

type WalletData = {
  asset?: string;
  balance?: string;
  available_balance?: string;
  pending_balance?: string;
  total_earned?: string;
  total_withdrawn?: string;
  currency?: string;
};

function WalletBalanceGrid({ wallet, currency }: { wallet: WalletData | null; currency?: string }) {
  const displayCurrency = currency ?? wallet?.currency ?? wallet?.asset ?? "KES";
  const stats = [
    { label: "Available", value: wallet?.available_balance ?? wallet?.balance ?? "0" },
    { label: "Pending", value: wallet?.pending_balance ?? "0" },
    { label: "Total Earned", value: wallet?.total_earned ?? "0" },
    { label: "Total Withdrawn", value: wallet?.total_withdrawn ?? "0" },
  ];
  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-[#e7e1d6] bg-[#fffdf8] p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#555]">{stat.label}</p>
          <p className="mt-1 text-2xl font-black text-[#171717]">{wallet ? stat.value : "—"}</p>
          {wallet ? <p className="mt-1 text-xs text-[#888]">{displayCurrency}</p> : null}
        </div>
      ))}
    </div>
  );
}

function TransactionList({ transactions, loading }: { transactions: Transaction[]; loading: boolean }) {
  return (
    <div className="mt-4">
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#555]">Recent Transactions</p>
      <List loading={loading} empty="No transactions yet.">
        {transactions.map((tx, i) => (
          <Card
            key={tx.transaction_id ?? tx.reference_id ?? String(i)}
            title={tx.narration ?? tx.description ?? "Transaction"}
            badge={tx.status}
          >
            <Meta
              items={[
                `${tx.currency === "USD" ? "KES" : (tx.currency ?? "KES")} ${tx.amount ?? "0"}`.trim(),
                tx.type ?? tx.transaction_type ?? "",
                tx.created_at ? new Date(tx.created_at).toLocaleDateString() : "",
              ]}
            />
          </Card>
        ))}
      </List>
    </div>
  );
}

export function CreatorWalletClient() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [form, setForm] = useState({ amount: "", msisdn: "", pin: "" });

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const [walletResult, txResult] = await Promise.all([
      api("payments/walletWithStates"),
      api("wallet/accountStatement", { method: "POST", body: JSON.stringify({ limit: 20 }) }),
    ]);
    const raw = walletResult.data as { data?: WalletData } | WalletData | undefined;
    setWallet(raw && typeof raw === "object" && "data" in raw ? raw.data ?? null : (raw as WalletData | undefined) ?? null);
    setTransactions(unwrapList<Transaction>(txResult));
    setLoading(false);
  }

  async function withdraw(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const result = await api("wallet/kesWithdraw", {
      method: "POST",
      body: JSON.stringify({ amount: Number(form.amount), msisdn: form.msisdn, pin: form.pin }),
    });
    setMessage(result.message ?? (result.status === 200 ? "Withdrawal initiated." : "Withdrawal failed."));
    if (result.status === 200) {
      setIsWithdrawing(false);
      setForm({ amount: "", msisdn: "", pin: "" });
      load();
    }
  }

  return (
    <LiveSection
      title="My Wallet"
      actionLabel={isWithdrawing ? "Cancel" : "Withdraw (KES)"}
      onAction={() => { setIsWithdrawing((v) => !v); setMessage(""); }}
    >
      {message ? <Notice>{message}</Notice> : null}
      <WalletBalanceGrid wallet={wallet} currency="KES" />
      {isWithdrawing ? (
        <form onSubmit={withdraw} className="mb-6 grid gap-4 rounded-lg border border-[#e7e1d6] bg-[#fffdf8] p-4 md:grid-cols-2">
          <Input label="Amount (KES)" type="number" value={form.amount} onChange={(v) => setForm({ ...form, amount: v })} required />
          <Input label="M-Pesa Phone" value={form.msisdn} onChange={(v) => setForm({ ...form, msisdn: v })} placeholder="07XXXXXXXX" required />
          <Input label="Transaction PIN" type="password" value={form.pin} onChange={(v) => setForm({ ...form, pin: v })} required />
          <button type="submit" className="min-h-12 rounded-md bg-[#171717] px-5 py-3 text-sm font-bold text-white md:col-span-2">
            Confirm Withdrawal
          </button>
        </form>
      ) : null}
      <TransactionList transactions={transactions} loading={loading} />
    </LiveSection>
  );
}

export function BusinessWalletClient() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [form, setForm] = useState({ amount: "", currency: "KES", payment_method: "mpesa", msisdn: "" });

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const [walletResult, txResult] = await Promise.all([
      api("payments/walletWithStates"),
      api("wallet/accountStatement", { method: "POST", body: JSON.stringify({ limit: 20 }) }),
    ]);
    const raw = walletResult.data as { data?: WalletData } | WalletData | undefined;
    setWallet(raw && typeof raw === "object" && "data" in raw ? raw.data ?? null : (raw as WalletData | undefined) ?? null);
    setTransactions(unwrapList<Transaction>(txResult));
    setLoading(false);
  }

  async function deposit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const result = await api("wallet/depositRequest", {
      method: "POST",
      body: JSON.stringify({
        amount: Number(form.amount),
        currency: form.currency,
        paymentMethod: form.payment_method,
        account_number: form.msisdn,
        redirect_url: window.location.href,
      }),
    });
    setMessage(result.message ?? (result.status === 200 ? "Deposit initiated." : "Deposit failed."));
    const checkoutUrl = (result.data as { checkoutUrl?: string; url?: string } | undefined)?.checkoutUrl
      ?? (result.data as { checkoutUrl?: string; url?: string } | undefined)?.url;
    if (checkoutUrl) window.location.href = checkoutUrl;
    if (result.status === 200) {
      setIsDepositing(false);
      setForm({ amount: "", currency: "KES", payment_method: "mpesa", msisdn: "" });
      load();
    }
  }

  return (
    <LiveSection
      title="Business Wallet"
      actionLabel={isDepositing ? "Cancel" : "Fund Wallet"}
      onAction={() => { setIsDepositing((v) => !v); setMessage(""); }}
    >
      {message ? <Notice>{message}</Notice> : null}
      <WalletBalanceGrid wallet={wallet} />
      {isDepositing ? (
        <form onSubmit={deposit} className="mb-6 grid gap-4 rounded-lg border border-[#e7e1d6] bg-[#fffdf8] p-4 md:grid-cols-2">
          <Input label="Amount" type="number" value={form.amount} onChange={(v) => setForm({ ...form, amount: v })} required />
          <label className="block">
            <span className="text-sm font-bold text-[#171717]">Currency</span>
            <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} className="mt-2 min-h-12 w-full rounded-md border border-[#d8d0c2] px-3 text-[#171717]">
              <option value="KES">KES</option>
              <option value="USD">USD</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-bold text-[#171717]">Payment Method</span>
            <select value={form.payment_method} onChange={(e) => setForm({ ...form, payment_method: e.target.value })} className="mt-2 min-h-12 w-full rounded-md border border-[#d8d0c2] px-3 text-[#171717]">
              <option value="mpesa">M-Pesa</option>
              <option value="card">Card</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </label>
          <Input label="Phone / Account Number" value={form.msisdn} onChange={(v) => setForm({ ...form, msisdn: v })} placeholder="07XXXXXXXX" required />
          <button type="submit" className="min-h-12 rounded-md bg-[#171717] px-5 py-3 text-sm font-bold text-white md:col-span-2">
            Confirm Deposit
          </button>
        </form>
      ) : null}
      <TransactionList transactions={transactions} loading={loading} />
    </LiveSection>
  );
}

// ─── Social Connect ────────────────────────────────────────────────────────────

export function MyAffiliateLinksClient() {
  const [affiliates, setAffiliates] = useState<MyAffiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const result = await api<MyAffiliate[]>("campaigns/my-affiliates");
    setAffiliates(unwrapList<MyAffiliate>(result));
    setLoading(false);
  }

  function copyLink(id: string, url: string) {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function commissionDisplay(affiliate: MyAffiliate) {
    if (!affiliate.commission_value) return "";
    return affiliate.commission_type === "percentage"
      ? `${affiliate.commission_value}% per sale`
      : `KES ${affiliate.commission_value} per sale`;
  }

  return (
    <LiveSection title="My Affiliate Links" actionLabel="Refresh" onAction={load}>
      <List loading={loading} empty="You haven't joined any affiliate programs yet.">
        {affiliates.map((affiliate, i) => (
          <Card key={affiliate.campaign_id ?? i} title={affiliate.title || "Untitled"} badge={commissionDisplay(affiliate) || "affiliate"}>
            <Meta items={[affiliate.brand_name || "Brand", `${affiliate.click_count ?? 0} clicks`, affiliate.joined_at ? `Joined ${new Date(affiliate.joined_at).toLocaleDateString()}` : ""].filter(Boolean)} />
            {affiliate.tracking_url && (
              <div className="mt-3 flex items-center gap-2 rounded-md border border-[#d8d0c2] bg-[#f9f7f4] px-3 py-2">
                <span className="flex-1 truncate text-xs text-[#555]">{affiliate.tracking_url}</span>
                <button
                  onClick={() => copyLink(affiliate.campaign_id ?? String(i), affiliate.tracking_url!)}
                  className="shrink-0 rounded bg-[#171717] px-2 py-1 text-xs font-bold text-white"
                >
                  {copiedId === (affiliate.campaign_id ?? String(i)) ? "Copied!" : "Copy"}
                </button>
              </div>
            )}
            <div className="mt-4 flex gap-2">
              {affiliate.affiliate_link && (
                <a href={affiliate.affiliate_link} target="_blank" rel="noopener noreferrer" className="rounded-md border border-[#d8d0c2] px-4 py-2 text-sm font-bold text-[#555] hover:border-[#171717]">
                  Visit Brand Link
                </a>
              )}
            </div>
          </Card>
        ))}
      </List>
    </LiveSection>
  );
}

type SocialSite = {
  site_id?: string;
  sm_name?: string;
  platform?: string;
  username?: string;
  followers?: string | number;
};

const SOCIAL_PLATFORMS = [
  { id: "x", label: "X (Twitter)", color: "#000000", textColor: "#ffffff" },
  { id: "tiktok", label: "TikTok", color: "#FF0050", textColor: "#ffffff" },
  { id: "linkedin", label: "LinkedIn", color: "#0A66C2", textColor: "#ffffff" },
  { id: "instagram", label: "Instagram", color: "#E4405F", textColor: "#ffffff" },
  { id: "facebook", label: "Facebook", color: "#1877F2", textColor: "#ffffff" },
];

export function SocialConnectClient() {
  const [sites, setSites] = useState<SocialSite[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [igUsername, setIgUsername] = useState("");
  const [fbPageUrl, setFbPageUrl] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    load();
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  async function load() {
    setLoading(true);
    const [sitesResult, profileResult] = await Promise.all([
      api<SocialSite[]>("users/userSocialSites"),
      api<Profile>("users/getUserProfile"),
    ]);
    setSites(unwrapList<SocialSite>(sitesResult));
    const profile = profileResult.data as Profile | undefined;
    if (profile?.user_id) setUserId(profile.user_id);
    setLoading(false);
  }

  function getConnected(platformId: string) {
    return sites.find((s) => (s.sm_name ?? s.platform ?? "").toLowerCase() === platformId.toLowerCase());
  }

  async function disconnect(platformId: string) {
    setMessage("");
    const result = await api(`oauth/disconnect/${platformId}`, {
      method: "POST",
      body: JSON.stringify({ userId }),
    });
    setMessage(result.message ?? `${platformId} disconnected.`);
    load();
  }

  async function connectOAuth(platformId: string) {
    setMessage("");
    setConnectingPlatform(platformId);
    const initResult = await api<{ authUrl?: string; state?: string }>(`oauth/init/${platformId}`);
    const data = initResult.data as { authUrl?: string; state?: string } | undefined;
    if (!data?.authUrl || !data?.state) {
      setMessage(initResult.message ?? "Could not start connection.");
      setConnectingPlatform(null);
      return;
    }

    const popup = window.open(data.authUrl, `sg_oauth_${platformId}`, "width=620,height=720,scrollbars=yes");
    if (!popup) {
      setMessage("Popup blocked — please allow popups for this site and try again.");
      setConnectingPlatform(null);
      return;
    }

    let attempts = 0;
    pollRef.current = setInterval(async () => {
      attempts++;
      if (attempts > 90 || popup.closed) {
        clearInterval(pollRef.current!);
        setConnectingPlatform(null);
        if (attempts > 90) setMessage("Connection timed out.");
        return;
      }
      try {
        const statusResult = await api<{ status?: string; message?: string }>(`oauth/status/${data.state}`);
        const status = (statusResult.data as { status?: string } | undefined)?.status;
        if (status === "success") {
          clearInterval(pollRef.current!);
          popup.close();
          setConnectingPlatform(null);
          setMessage(`${platformId} connected successfully!`);
          load();
        } else if (status === "error") {
          clearInterval(pollRef.current!);
          popup.close();
          setConnectingPlatform(null);
          setMessage((statusResult.data as { message?: string } | undefined)?.message ?? "Connection failed.");
        }
      } catch {
        // ignore individual poll failures
      }
    }, 2000);
  }

  async function connectInstagram(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const result = await api("oauth/connect-instagram", {
      method: "POST",
      body: JSON.stringify({ username: igUsername }),
    });
    setMessage(result.message ?? (result.status === 200 ? "Instagram connected." : "Connection failed."));
    if (result.status === 200) {
      setConnectingPlatform(null);
      setIgUsername("");
      load();
    }
  }

  async function initFacebook() {
    setMessage("");
    setConnectingPlatform("facebook");
    const initResult = await api<{ authUrl?: string; method?: string }>(`oauth/init/facebook`);
    const data = initResult.data as { authUrl?: string; method?: string } | undefined;
    if (data?.method === "page_url" || !data?.authUrl) {
      // Stay on "facebook" connecting state to show the page URL form
      return;
    }
    // OAuth flow available — open popup
    const popup = window.open(data.authUrl, "sg_oauth_facebook", "width=620,height=720,scrollbars=yes");
    if (!popup) {
      setMessage("Popup blocked — please allow popups for this site and try again.");
      setConnectingPlatform(null);
      return;
    }
    let attempts = 0;
    pollRef.current = setInterval(async () => {
      attempts++;
      if (attempts > 90 || popup.closed) {
        clearInterval(pollRef.current!);
        setConnectingPlatform(null);
        if (attempts > 90) setMessage("Connection timed out.");
        return;
      }
      try {
        const statusResult = await api<{ status?: string; message?: string }>(`oauth/status/${data.state}`);
        const status = (statusResult.data as { status?: string } | undefined)?.status;
        if (status === "success") {
          clearInterval(pollRef.current!);
          popup.close();
          setConnectingPlatform(null);
          setMessage("Facebook connected successfully!");
          load();
        } else if (status === "error") {
          clearInterval(pollRef.current!);
          popup.close();
          setConnectingPlatform(null);
          setMessage((statusResult.data as { message?: string } | undefined)?.message ?? "Connection failed.");
        }
      } catch { /* ignore */ }
    }, 2000);
  }

  async function connectFacebook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const result = await api("oauth/connect-facebook", {
      method: "POST",
      body: JSON.stringify({ pageUrl: fbPageUrl }),
    });
    setMessage(result.message ?? (result.status === 200 ? "Facebook page connected." : "Connection failed."));
    if (result.status === 200) {
      setConnectingPlatform(null);
      setFbPageUrl("");
      load();
    }
  }

  if (loading) return <div className="rounded-lg border border-[#e7e1d6] bg-white p-5 text-sm text-[#555]">Loading...</div>;

  return (
    <div className="grid gap-4">
      {message ? <Notice>{message}</Notice> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        {SOCIAL_PLATFORMS.map((platform) => {
          const connected = getConnected(platform.id);
          const isConnecting = connectingPlatform === platform.id;
          const showIgForm = connectingPlatform === "instagram" && platform.id === "instagram";
          const showFbForm = connectingPlatform === "facebook" && platform.id === "facebook";

          return (
            <article key={platform.id} className="rounded-lg border border-[#e7e1d6] bg-white p-5">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-xs font-black"
                  style={{ backgroundColor: platform.color, color: platform.textColor }}
                >
                  {platform.label.slice(0, 1)}
                </div>
                <div>
                  <p className="font-bold text-[#171717]">{platform.label}</p>
                  {connected ? (
                    <p className="text-xs text-[#287d69]">
                      Connected{connected.username ? ` · @${connected.username}` : ""}
                      {connected.followers ? ` · ${connected.followers} followers` : ""}
                    </p>
                  ) : (
                    <p className="text-xs text-[#888]">Not connected</p>
                  )}
                </div>
              </div>

              {showIgForm ? (
                <form onSubmit={connectInstagram} className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={igUsername}
                    onChange={(e) => setIgUsername(e.target.value)}
                    placeholder="Instagram username"
                    required
                    className="min-h-10 flex-1 rounded-md border border-[#d8d0c2] px-3 text-sm text-[#171717]"
                  />
                  <button type="submit" className="rounded-md bg-[#E4405F] px-4 py-2 text-sm font-bold text-white">
                    Connect
                  </button>
                  <button type="button" onClick={() => setConnectingPlatform(null)} className="rounded-md border border-[#d8d0c2] px-3 py-2 text-sm font-bold text-[#555]">
                    Cancel
                  </button>
                </form>
              ) : showFbForm ? (
                <form onSubmit={connectFacebook} className="mt-4">
                  <p className="mb-2 text-xs text-[#555]">Enter your Facebook Page name or URL (e.g. facebook.com/YourPage)</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={fbPageUrl}
                      onChange={(e) => setFbPageUrl(e.target.value)}
                      placeholder="YourPageName or facebook.com/..."
                      required
                      className="min-h-10 flex-1 rounded-md border border-[#d8d0c2] px-3 text-sm text-[#171717]"
                    />
                    <button type="submit" className="rounded-md bg-[#1877F2] px-4 py-2 text-sm font-bold text-white">
                      Connect
                    </button>
                    <button type="button" onClick={() => setConnectingPlatform(null)} className="rounded-md border border-[#d8d0c2] px-3 py-2 text-sm font-bold text-[#555]">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-4 flex gap-2">
                  {connected ? (
                    <button
                      onClick={() => disconnect(platform.id)}
                      className="rounded-md border border-[#d8d0c2] px-4 py-2 text-sm font-bold text-[#555] hover:border-red-300 hover:text-red-600"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (platform.id === "instagram") setConnectingPlatform("instagram");
                        else if (platform.id === "facebook") initFacebook();
                        else connectOAuth(platform.id);
                      }}
                      disabled={isConnecting}
                      className="rounded-md px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
                      style={{ backgroundColor: platform.color }}
                    >
                      {isConnecting ? "Connecting…" : "Connect"}
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function LiveSection({ title, actionLabel, onAction, headerExtra, children }: { title: string; actionLabel: string; onAction: () => void; headerExtra?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-[#e7e1d6] bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-[#171717]">{title}</h2>
          {headerExtra}
        </div>
        <button type="button" onClick={onAction} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#171717] px-5 py-2 text-sm font-bold text-white">
          {actionLabel}
        </button>
      </div>
      {children}
    </section>
  );
}

function List({ loading, empty, children }: { loading: boolean; empty: string; children: React.ReactNode }) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : !!children;
  if (loading) return <p className="text-sm text-[#555]">Loading...</p>;
  if (!hasChildren) return <p className="text-sm text-[#555]">{empty}</p>;
  return <div className="grid gap-4">{children}</div>;
}

function Card({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <article className="rounded-lg border border-[#e7e1d6] bg-[#fffdf8] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="text-lg font-bold text-[#171717]">{title}</h3>
        {badge ? <span className="rounded-md bg-[#eaf7f1] px-3 py-1 text-xs font-bold text-[#287d69]">{badge}</span> : null}
      </div>
      <div className="mt-3 text-sm leading-6 text-[#555]">{children}</div>
    </article>
  );
}

function Meta({ items }: { items: (string | undefined)[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.filter(Boolean).map((item) => (
        <span key={item} className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-[#555]">{item}</span>
      ))}
    </div>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 rounded-lg border border-[#e7e1d6] bg-[#fff5d5] p-4 text-sm font-semibold text-[#5c4218]">{children}</div>;
}

function Input({ label, value, onChange, type = "text", required = false, placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-[#171717]">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} placeholder={placeholder} className="mt-2 min-h-12 w-full rounded-md border border-[#d8d0c2] px-3 text-[#171717]" />
    </label>
  );
}

function Textarea({ label, value, onChange, required = false }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="block md:col-span-2">
      <span className="text-sm font-bold text-[#171717]">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} required={required} rows={4} className="mt-2 w-full rounded-md border border-[#d8d0c2] px-3 py-3 text-[#171717]" />
    </label>
  );
}
