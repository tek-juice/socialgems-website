import Footer from "../components/footer";
import {
  FeatureCard,
  PageHero,
  PageShell,
  PrimaryButton,
  SecondaryButton,
  SectionHeader,
} from "../components/marketing";
import Navbar from "../components/navbar";

const businessBenefits = [
  { title: "Post Creator Jobs", description: "Publish role-based opportunities directly to creators on SocialGems." },
  { title: "Recruit UGC Creators", description: "Find creators who can produce authentic product, service, and campaign content." },
  { title: "Hire Ambassadors", description: "Build longer-term relationships with creators who can represent your brand." },
  { title: "Find Influencers", description: "Connect with creators whose audience and content style fit your goals." },
];

const creatorBenefits = [
  { title: "Browse Opportunities", description: "Find creator jobs that match your skills, niche, and availability." },
  { title: "Apply Directly", description: "Submit interest for roles posted by businesses from one platform." },
  { title: "Build Experience", description: "Use jobs to sharpen your content, campaign, and brand collaboration skills." },
  { title: "Grow Portfolios", description: "Turn completed jobs into stronger creator proof and future opportunities." },
];

const sampleJobs = [
  {
    eyebrow: "UGC Creator",
    title: "UGC Creator for Everything Uganda",
    description: "Create short-form videos, reels, and photo content featuring Uganda travel experiences, tours, accommodation, and adventure destinations.",
    tags: ["UGC", "Travel", "Short-form video"],
  },
  {
    eyebrow: "Lifestyle Influencer",
    title: "Lifestyle Influencer for Everything Uganda",
    description: "Share authentic lifestyle and travel content with an audience interested in exploring Uganda, weekend escapes, culture, food, and adventure.",
    tags: ["Lifestyle", "Travel", "Influencer"],
  },
  {
    eyebrow: "Tourism Ambassador",
    title: "Tourism Ambassador for Everything Uganda",
    description: "Represent Everything Uganda through ongoing destination storytelling, trip highlights, travel tips, and community engagement.",
    tags: ["Tourism", "Ambassador", "Storytelling"],
  },
  {
    eyebrow: "Travel Content Creator",
    title: "Travel Content Creator for Everything Uganda",
    description: "Produce photo, video, blog, or social content that helps travellers discover Uganda's destinations and book experiences.",
    tags: ["Content Creator", "Travel", "Destinations"],
  },
];

export default function JobBoardPage() {
  return (
    <div className="min-h-screen bg-[#fffdf8]">
      <Navbar />
      <PageShell>
        <PageHero
          eyebrow="Job Board"
          title="Recruit creators directly through SocialGems."
          description="The Job Board helps businesses post creator roles and gives creators a focused place to find paid or experience-building work."
          image="/brands-pic.png"
          imageAlt="SocialGems job board screen"
        />

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader title="Built for creator recruitment" description="Businesses can publish roles while creators can discover work that fits their profile and goals." />
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <div>
                <h3 className="mb-5 text-2xl font-bold text-[#171717]">Business Benefits</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  {businessBenefits.map((benefit) => <FeatureCard key={benefit.title} {...benefit} />)}
                </div>
              </div>
              <div>
                <h3 className="mb-5 text-2xl font-bold text-[#171717]">Creator Benefits</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  {creatorBenefits.map((benefit) => <FeatureCard key={benefit.title} {...benefit} />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Featured Client Opportunity"
              title="Create travel content for Everything Uganda"
              description="Everything Uganda is looking for creators to help showcase Uganda's expeditions, destinations, culture, accommodation, and travel experiences. Creators can apply for available roles directly through SocialGems."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {sampleJobs.map((job) => (
                <article key={job.title} className="rounded-lg border border-[#e7e1d6] bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#287d69]">{job.eyebrow}</p>
                  <h3 className="mt-3 text-xl font-bold text-[#171717]">{job.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#555]">{job.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-[#e8fff7] px-3 py-1 text-xs font-bold text-[#287d69]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <PrimaryButton href="/creator/signup">Join SocialGems to Apply</PrimaryButton>
              <SecondaryButton href="/business/signup">Post a Creator Job</SecondaryButton>
            </div>
          </div>
        </section>
      </PageShell>
      <Footer />
    </div>
  );
}
