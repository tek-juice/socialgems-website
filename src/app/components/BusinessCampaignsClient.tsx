"use client";

import { FormEvent, useEffect, useState } from "react";

type CampaignTask = {
  task: string;
  description: string;
  site_id: number;
  is_repetitive: "yes" | "no";
  repeats_after: string;
  requires_url: "yes" | "no";
};

type CampaignForm = {
  title: string;
  objective: string;
  description: string;
  start_date: string;
  end_date: string;
  budget: string;
  number_of_influencers: string;
  campaign_image: string;
  earning_type: "paid" | "affiliate" | "barter";
  affiliate_link: string;
  commission_type: "percentage" | "fixed";
  commission_value: string;
};

type Campaign = {
  campaign_id?: string;
  title?: string;
  description?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  budget?: number | string;
  number_of_influencers?: number;
  earning_type?: string;
};

const emptyTask: CampaignTask = {
  task: "",
  description: "",
  site_id: 4,
  is_repetitive: "no",
  repeats_after: "daily",
  requires_url: "yes",
};

const defaultForm: CampaignForm = {
  title: "",
  objective: "",
  description: "",
  start_date: "",
  end_date: "",
  budget: "",
  number_of_influencers: "1",
  campaign_image: "",
  earning_type: "paid",
  affiliate_link: "",
  commission_type: "percentage",
  commission_value: "",
};

export default function BusinessCampaignsClient() {
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<CampaignForm>(defaultForm);
  const [tasks, setTasks] = useState<CampaignTask[]>([{ ...emptyTask }]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    setLoadingCampaigns(true);
    try {
      const response = await fetch("/api/socialgems/proxy/campaigns/brandCampaigns", { cache: "no-store" });
      const result = await response.json();
      const data = Array.isArray(result?.data) ? result.data : Array.isArray(result?.data?.data) ? result.data.data : [];
      setCampaigns(data);
    } catch {
      setCampaigns([]);
    } finally {
      setLoadingCampaigns(false);
    }
  }

  function updateForm(field: keyof CampaignForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateTask(index: number, field: keyof CampaignTask, value: string | number) {
    setTasks((current) =>
      current.map((task, taskIndex) =>
        taskIndex === index ? { ...task, [field]: value } : task,
      ),
    );
  }

  function addTask() {
    setTasks((current) => [...current, { ...emptyTask }]);
  }

  function removeTask(index: number) {
    setTasks((current) => current.filter((_, taskIndex) => taskIndex !== index));
  }

  function validateForm() {
    if (form.description.trim().length < 200) {
      return "Campaign description must be at least 200 characters, matching the mobile app backend rule.";
    }

    const startDate = new Date(form.start_date);
    const minStartDate = new Date();
    minStartDate.setDate(minStartDate.getDate() + 3);
    minStartDate.setHours(0, 0, 0, 0);

    if (startDate < minStartDate) {
      return "Campaign start date must be at least 3 days from today.";
    }

    const endDate = new Date(form.end_date);
    const minEndDate = new Date(startDate);
    minEndDate.setDate(minEndDate.getDate() + 1);

    if (endDate <= minEndDate) {
      return "Campaign end date must be more than 1 day after the start date.";
    }

    if (tasks.length === 0 || tasks.some((task) => !task.task.trim() || !task.description.trim())) {
      return "Add at least one complete task.";
    }

    if (form.earning_type === "affiliate" && !form.affiliate_link.trim()) {
      return "Affiliate campaigns require an affiliate link.";
    }

    if (form.earning_type === "affiliate") {
      const cv = Number(form.commission_value);
      if (!form.commission_value || isNaN(cv) || cv <= 0) return "Please enter a valid commission value.";
      if (form.commission_type === "percentage" && cv > 100) return "Percentage commission cannot exceed 100%.";
    }

    return "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const validationMessage = validateForm();
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: form.title,
        objective: form.objective,
        description: form.description,
        start_date: form.start_date,
        end_date: form.end_date,
        budget: form.earning_type === "affiliate" ? 0 : Number(form.budget),
        number_of_influencers: Number(form.number_of_influencers),
        campaign_image: form.campaign_image || "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&q=80",
        earning_type: form.earning_type,
        affiliate_link: form.earning_type === "affiliate" ? form.affiliate_link : undefined,
        commission_type: form.earning_type === "affiliate" ? form.commission_type : undefined,
        commission_value: form.earning_type === "affiliate" ? Number(form.commission_value) : undefined,
        tasks,
      };

      const response = await fetch("/api/socialgems/proxy/campaigns/create-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || result?.status !== 200) {
        setMessage(result?.message || "Campaign could not be created.");
        return;
      }

      setMessage("Campaign draft created successfully.");
      setForm(defaultForm);
      setTasks([{ ...emptyTask }]);
      setIsCreating(false);
      await loadCampaigns();
    } catch {
      setMessage("Unable to create campaign. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-[#e7e1d6] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#171717]">Campaigns</h2>
            <p className="mt-2 text-sm leading-6 text-[#555]">
              Create campaign drafts using the same backend flow as the Flutter app.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreating((value) => !value)}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#171717] px-5 py-2 text-sm font-bold text-white"
          >
            {isCreating ? "Close Form" : "Create Campaign"}
          </button>
        </div>
      </section>

      {message ? (
        <div className="rounded-lg border border-[#e7e1d6] bg-[#fff5d5] p-4 text-sm font-semibold text-[#5c4218]">
          {message}
        </div>
      ) : null}

      {isCreating ? (
        <form onSubmit={handleSubmit} className="rounded-lg border border-[#e7e1d6] bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Campaign Title" value={form.title} onChange={(value) => updateForm("title", value)} required />
            <Field label="Objective" value={form.objective} onChange={(value) => updateForm("objective", value)} required placeholder="Awareness, Sales, App installs..." />
            <Field label="Start Date" value={form.start_date} onChange={(value) => updateForm("start_date", value)} type="date" required />
            <Field label="End Date" value={form.end_date} onChange={(value) => updateForm("end_date", value)} type="date" required />
            {form.earning_type !== "affiliate" ? (
              <Field label="Budget (KES)" value={form.budget} onChange={(value) => updateForm("budget", value)} type="number" required />
            ) : null}
            <Field label="Number of Creators" value={form.number_of_influencers} onChange={(value) => updateForm("number_of_influencers", value)} type="number" required />
            <Field label="Campaign Image URL" value={form.campaign_image} onChange={(value) => updateForm("campaign_image", value)} placeholder="Optional. Backend has a default image." />
            <label className="block">
              <span className="text-sm font-bold text-[#171717]">Earning Type</span>
              <select
                value={form.earning_type}
                onChange={(event) => updateForm("earning_type", event.target.value)}
                className="mt-2 min-h-12 w-full rounded-md border border-[#d8d0c2] px-3 text-[#171717]"
              >
                <option value="paid">Paid Campaign</option>
                <option value="affiliate">Affiliate Campaign</option>
                <option value="barter">Free / Barter Collaboration</option>
              </select>
            </label>
            {form.earning_type === "affiliate" ? (
              <>
                <Field label="Affiliate Link" value={form.affiliate_link} onChange={(value) => updateForm("affiliate_link", value)} required />
                <label className="block md:col-span-2">
                  <span className="text-sm font-bold text-[#171717]">Commission Structure</span>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateForm("commission_type", "percentage")}
                      className={`flex-1 rounded-l-md border px-4 py-2 text-sm font-semibold transition-colors ${form.commission_type === "percentage" ? "border-[#171717] bg-[#171717] text-white" : "border-[#d8d0c2] bg-[#f9f6f0] text-[#555]"}`}
                    >
                      Percentage (%)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateForm("commission_type", "fixed")}
                      className={`flex-1 rounded-r-md border px-4 py-2 text-sm font-semibold transition-colors ${form.commission_type === "fixed" ? "border-[#171717] bg-[#171717] text-white" : "border-[#d8d0c2] bg-[#f9f6f0] text-[#555]"}`}
                    >
                      Fixed (KES)
                    </button>
                  </div>
                  <div className="relative mt-2">
                    <input
                      type="number"
                      value={form.commission_value}
                      onChange={(e) => updateForm("commission_value", e.target.value)}
                      placeholder={form.commission_type === "percentage" ? "e.g. 10" : "e.g. 500"}
                      required
                      className="min-h-12 w-full rounded-md border border-[#d8d0c2] px-3 pr-14 text-[#171717]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#999]">
                      {form.commission_type === "percentage" ? "%" : "KES"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#666]">
                    {form.commission_type === "percentage"
                      ? "Influencers earn this % of every sale they drive."
                      : "Influencers earn this fixed KES amount per conversion."}
                  </p>
                </label>
              </>
            ) : null}
          </div>

          <label className="mt-4 block">
            <span className="text-sm font-bold text-[#171717]">Description</span>
            <textarea
              value={form.description}
              onChange={(event) => updateForm("description", event.target.value)}
              required
              rows={7}
              className="mt-2 w-full rounded-md border border-[#d8d0c2] px-3 py-3 text-[#171717]"
              placeholder="Minimum 200 characters. Include brand context, deliverables, expectations, and creator fit."
            />
            <span className="mt-1 block text-xs text-[#666]">{form.description.length}/200 minimum characters</span>
          </label>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-[#171717]">Campaign Tasks</h3>
              <button type="button" onClick={addTask} className="rounded-md border border-[#171717] px-4 py-2 text-sm font-bold text-[#171717]">
                Add Task
              </button>
            </div>
            <div className="mt-4 grid gap-4">
              {tasks.map((task, index) => (
                <div key={index} className="rounded-lg border border-[#e7e1d6] bg-[#fffdf8] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Task" value={task.task} onChange={(value) => updateTask(index, "task", value)} required placeholder="Post a Reel, Share a story..." />
                    <label className="block">
                      <span className="text-sm font-bold text-[#171717]">Platform</span>
                      <select value={task.site_id} onChange={(event) => updateTask(index, "site_id", Number(event.target.value))} className="mt-2 min-h-12 w-full rounded-md border border-[#d8d0c2] px-3 text-[#171717]">
                        <option value={4}>Instagram</option>
                        <option value={2}>TikTok</option>
                        <option value={3}>Facebook</option>
                        <option value={1}>X</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-[#171717]">Requires URL</span>
                      <select value={task.requires_url} onChange={(event) => updateTask(index, "requires_url", event.target.value)} className="mt-2 min-h-12 w-full rounded-md border border-[#d8d0c2] px-3 text-[#171717]">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-[#171717]">Recurring</span>
                      <select value={task.is_repetitive} onChange={(event) => updateTask(index, "is_repetitive", event.target.value)} className="mt-2 min-h-12 w-full rounded-md border border-[#d8d0c2] px-3 text-[#171717]">
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </label>
                    {task.is_repetitive === "yes" ? (
                      <label className="block">
                        <span className="text-sm font-bold text-[#171717]">Repeats After</span>
                        <select value={task.repeats_after} onChange={(event) => updateTask(index, "repeats_after", event.target.value)} className="mt-2 min-h-12 w-full rounded-md border border-[#d8d0c2] px-3 text-[#171717]">
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                        </select>
                      </label>
                    ) : null}
                  </div>
                  <label className="mt-4 block">
                    <span className="text-sm font-bold text-[#171717]">Task Description</span>
                    <textarea value={task.description} onChange={(event) => updateTask(index, "description", event.target.value)} required rows={3} className="mt-2 w-full rounded-md border border-[#d8d0c2] px-3 py-3 text-[#171717]" />
                  </label>
                  {tasks.length > 1 ? (
                    <button type="button" onClick={() => removeTask(index)} className="mt-4 text-sm font-bold text-red-700">
                      Remove Task
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-[#171717] px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create Campaign Draft"}
          </button>
        </form>
      ) : null}

      <section className="rounded-lg border border-[#e7e1d6] bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-[#171717]">Your Campaigns</h2>
        {loadingCampaigns ? (
          <p className="mt-4 text-sm text-[#555]">Loading campaigns...</p>
        ) : campaigns.length === 0 ? (
          <p className="mt-4 text-sm text-[#555]">No campaigns found for this business account yet.</p>
        ) : (
          <div className="mt-4 grid gap-4">
            {campaigns.map((campaign) => (
              <article key={campaign.campaign_id || campaign.title} className="rounded-lg border border-[#e7e1d6] bg-[#fffdf8] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#171717]">{campaign.title || "Untitled campaign"}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#555]">{campaign.description || "No description provided."}</p>
                  </div>
                  <span className="rounded-md bg-[#eaf7f1] px-3 py-1 text-xs font-bold text-[#287d69]">
                    {campaign.status || "draft"}
                  </span>
                </div>
                <div className="mt-4 grid gap-2 text-xs text-[#666] sm:grid-cols-4">
                  <span>Budget: {campaign.budget || "N/A"}</span>
                  <span>Creators: {campaign.number_of_influencers || "N/A"}</span>
                  <span>Type: {campaign.earning_type || "paid"}</span>
                  <span>ID: {campaign.campaign_id || "N/A"}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-[#171717]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-2 min-h-12 w-full rounded-md border border-[#d8d0c2] px-3 text-[#171717] outline-none focus:border-[#171717]"
      />
    </label>
  );
}
