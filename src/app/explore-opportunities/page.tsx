import Footer from "../components/footer";
import { FeatureCard, PageHero, PageShell, PrimaryButton, ScreenshotPanel, SecondaryButton, SectionHeader } from "../components/marketing";
import Navbar from "../components/navbar";

const opportunities = [
  { title: "Product Gifting", description: "Receive products from brands looking for authentic creator coverage." },
  { title: "Complimentary Services", description: "Access services that support your content, lifestyle, or creator growth." },
  { title: "Event Access", description: "Find invitations to launches, activations, and community events." },
  { title: "Brand Experiences", description: "Join experiences that help you build relationships and create stronger content." },
];

export default function ExploreOpportunitiesPage() {
  return (
    <div className="min-h-screen bg-[#fffdf8]">
      <Navbar />
      <PageShell>
        <PageHero
          eyebrow="Explore Opportunities"
          title="Discover valuable collaborations beyond paid campaigns."
          description="Creators can find free collaborations such as product gifting, complimentary services, event access, and brand experiences."
          image="/influencer-pic.png"
          imageAlt="Opportunity listings screen"
        />

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader title="Free collaboration opportunities" description="Not every creator opportunity needs to start as a paid campaign. SocialGems gives creators more ways to connect, build portfolios, and grow." />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {opportunities.map((item) => <FeatureCard key={item.title} {...item} />)}
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <ScreenshotPanel title="Opportunity Listings" description="Browse collaborations by category, value, and brand fit." src="/app.png" alt="Explore opportunities listings" tone="green" />
              <ScreenshotPanel title="Creator Profiles" description="Use your profile to show brands what you create and where you fit." src="/influencer-app.png" alt="Creator profile screen" tone="blue" />
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <PrimaryButton href="/influencers">Explore as a Creator</PrimaryButton>
              <SecondaryButton href="/signup">Offer a Collaboration</SecondaryButton>
            </div>
          </div>
        </section>
      </PageShell>
      <Footer />
    </div>
  );
}
