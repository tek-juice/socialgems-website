import Footer from "../components/footer";
import { PageHero, PageShell, PrimaryButton, ScreenshotPanel, SectionHeader } from "../components/marketing";
import Navbar from "../components/navbar";

const features = [
  { label: "Platform access", free: "Included", plus: "Included", pro: "Included" },
  { label: "Campaign discovery", free: "Standard", plus: "Enhanced", pro: "Priority" },
  { label: "Job board access", free: "Standard", plus: "Enhanced", pro: "Priority" },
  { label: "Affiliate opportunities", free: "Standard", plus: "Enhanced", pro: "Priority" },
  { label: "Profile visibility", free: "Basic", plus: "Increased", pro: "Highest" },
  { label: "Growth benefits", free: "Limited", plus: "Additional benefits", pro: "Premium benefits" },
  { label: "Pricing", free: "To be supplied", plus: "To be supplied", pro: "To be supplied" },
];

const plans = [
  {
    name: "Free",
    description: "Start with standard access to creator opportunities and core profile tools.",
    benefits: ["Standard campaign discovery", "Standard job board access", "Basic profile visibility"],
    cta: "Join Free",
  },
  {
    name: "Creator Plus",
    description: "Access premium opportunities, increase your visibility to businesses, and unlock additional creator benefits.",
    benefits: ["Enhanced campaign discovery", "Enhanced job board access", "Increased profile visibility"],
    cta: "Upgrade to Creator Plus",
  },
  {
    name: "Creator Pro",
    description: "Get priority access to opportunities, enhanced profile visibility, and exclusive features designed to help you grow and earn more.",
    benefits: ["Priority opportunity access", "Highest profile visibility", "Premium creator growth benefits"],
    cta: "Upgrade to Creator Pro",
  },
];

export default function CreatorMembershipsPage() {
  return (
    <div className="min-h-screen bg-[#fff7ec]">
      <Navbar />
      <PageShell>
        <PageHero
          eyebrow="Creator Memberships"
          title="Compare Free, Creator Plus, and Creator Pro."
          description="Creator memberships are designed to help creators increase visibility, access stronger opportunities, and grow on SocialGems. Final benefits and pricing will be supplied by the product team."
          image="/app.png"
          imageAlt="Creator membership plans screen"
        />

        <section className="bg-[#fff0b8] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader title="Creator Plan Comparison" description="A responsive comparison of the planned membership structure. Exact pricing and final benefits will be updated when confirmed." />
            <div className="mt-10 overflow-x-auto rounded-lg border-2 border-[#171717] bg-white shadow-[10px_10px_0_#171717]">
              <table className="min-w-[760px] w-full border-collapse text-left">
                <thead className="bg-[#171717] text-white">
                  <tr>
                    <th className="p-4 text-sm font-bold">Feature</th>
                    <th className="p-4 text-sm font-bold">Free</th>
                    <th id="creator-plus" className="p-4 text-sm font-bold">Creator Plus</th>
                    <th id="creator-pro" className="p-4 text-sm font-bold">Creator Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature) => (
                    <tr key={feature.label} className="border-t border-[#171717]/10">
                      <td className="p-4 text-sm font-bold text-[#171717]">{feature.label}</td>
                      <td className="p-4 text-sm text-[#555]">{feature.free}</td>
                      <td className="p-4 text-sm text-[#555]">{feature.plus}</td>
                      <td className="p-4 text-sm text-[#555]">{feature.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {plans.map((plan) => (
                <article key={plan.name} className="animate-social-pop rounded-lg border-2 border-[#171717] bg-[#fff7ec] p-6 shadow-[8px_8px_0_#fdda6d] transition hover:-translate-y-1">
                  <h3 className="text-2xl font-black text-[#171717]">{plan.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#555]">{plan.description}</p>
                  <ul className="mt-5 grid gap-3">
                    {plan.benefits.map((benefit) => (
                      <li key={benefit} className="rounded-md border-2 border-[#171717] bg-white px-4 py-3 text-sm font-bold text-[#333]">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm font-bold text-[#171717]">Pricing: To be supplied</p>
                  <div className="mt-6">
                    <PrimaryButton href="/creator/signup">{plan.cta}</PrimaryButton>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10">
              <ScreenshotPanel title="Membership Plans" description="A dedicated space for the latest Creator Plus and Creator Pro screenshots." src="/app-1.png" alt="Creator membership plan screenshot" tone="gold" />
            </div>
          </div>
        </section>
      </PageShell>
      <Footer />
    </div>
  );
}
