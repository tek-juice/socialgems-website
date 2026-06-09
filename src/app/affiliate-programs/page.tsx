import Footer from "../components/footer";
import { FeatureCard, PageHero, PageShell, ScreenshotPanel, SectionHeader, PrimaryButton, SecondaryButton } from "../components/marketing";
import Navbar from "../components/navbar";

const businessItems = [
  { title: "Create Affiliate Programs", description: "Launch commission-based opportunities for products or services." },
  { title: "Set Commission Structures", description: "Define the rewards creators can earn when they generate results." },
  { title: "Manage Creator Affiliates", description: "Track creator affiliates and keep partnerships organized." },
];

const creatorItems = [
  { title: "Discover Affiliate Opportunities", description: "Find products and services that fit your audience." },
  { title: "Promote Products and Services", description: "Share affiliate offers through your content and communities." },
  { title: "Earn Commissions", description: "Build recurring earning opportunities from brand partnerships." },
];

const idealCreators = ["Travel Creators", "Lifestyle Creators", "Tourism Ambassadors", "Content Creators"];
const affiliateSteps = ["Join the affiliate program", "Receive your affiliate link", "Promote the experience or service", "Earn commissions on successful referrals"];

export default function AffiliateProgramsPage() {
  return (
    <div className="min-h-screen bg-[#fff7ec]">
      <Navbar />
      <PageShell>
        <PageHero
          eyebrow="Affiliate Programs"
          title="Create commission-based partnerships between brands and creators."
          description="SocialGems helps businesses launch affiliate programs and helps creators discover products and services they can promote for commission."
          image="/app-1.png"
          imageAlt="Affiliate programs screen"
        />

        <section className="bg-[#fff0b8] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader align="left" title="For Businesses" description="Create and manage affiliate programs from one business account." />
              <div className="mt-8 grid gap-5">
                {businessItems.map((item) => <FeatureCard key={item.title} {...item} />)}
              </div>
            </div>
            <div>
              <SectionHeader align="left" title="For Creators" description="Turn trusted recommendations into earning opportunities." />
              <div className="mt-8 grid gap-5">
                {creatorItems.map((item) => <FeatureCard key={item.title} {...item} />)}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-7xl overflow-hidden rounded-2xl bg-[#11130f] text-white">
            <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="relative min-h-[380px] bg-[#1a2218] p-6 sm:p-8">
                <div className="absolute inset-0 bg-[url('/background-3.jpg')] bg-cover bg-center opacity-45" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11130f] via-[#11130f]/55 to-transparent" />
                <div className="relative flex h-full min-h-[320px] flex-col justify-between">
                  <div>
                    <p className="inline-flex rounded-full bg-[#f4c542] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#11130f]">
                      Featured Client
                    </p>
                    <div className="mt-6 inline-grid gap-1 rounded-xl bg-black/55 px-5 py-4 backdrop-blur">
                      <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f4c542]">Everything</p>
                      <p className="text-4xl font-black uppercase leading-none text-white">Uganda</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f4c542]">
                      Untamed. Unseen. Unforgettable.
                    </p>
                    <h2 className="mt-3 max-w-lg text-4xl font-black leading-tight sm:text-5xl">
                      Affiliate travel opportunities for Uganda creators.
                    </h2>
                  </div>
                </div>
              </div>

              <div className="bg-[#f7f1df] p-6 text-[#171717] sm:p-8">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#287d69]">Affiliate Program</p>
                <h3 className="mt-3 text-3xl font-black">Everything Uganda Affiliate Program</h3>
                <p className="mt-4 max-w-3xl leading-7 text-[#4f4f4f]">
                  Promote travel experiences, accommodation, tours, and destinations across Uganda and earn commissions on successful referrals.
                </p>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  <div>
                    <h4 className="text-lg font-black">Ideal For</h4>
                    <div className="mt-4 grid gap-2">
                      {idealCreators.map((item) => (
                        <p key={item} className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-[#171717]">{item}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-black">How It Works</h4>
                    <div className="mt-4 grid gap-2">
                      {affiliateSteps.map((item, index) => (
                        <p key={item} className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-[#333]">
                          {index + 1}. {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <PrimaryButton href="/creator/signup">Join as a Creator</PrimaryButton>
                  <a
                    href="https://affiliate.everythinguganda.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-[#171717] px-5 py-3 text-sm font-extrabold text-[#171717] transition hover:bg-[#171717] hover:text-white"
                  >
                    Visit Affiliate Destination
                  </a>
                </div>
                <p className="mt-4 text-sm font-semibold text-[#287d69]">
                  Existing affiliate destination: affiliate.everythinguganda.com
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
            <ScreenshotPanel title="Affiliate Discovery" description="Creators can browse affiliate programs that match their niche." src="/influencer-app.png" alt="Affiliate opportunity discovery" tone="green" />
            <ScreenshotPanel title="Program Management" description="Businesses can organize affiliate partnerships and program details." src="/brands-pic.png" alt="Affiliate program management" tone="blue" />
          </div>
          <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 sm:flex-row sm:justify-center">
            <PrimaryButton href="/creator/signup">Find Affiliate Opportunities</PrimaryButton>
            <SecondaryButton href="/signup">Create an Affiliate Program</SecondaryButton>
          </div>
        </section>
      </PageShell>
      <Footer />
    </div>
  );
}
