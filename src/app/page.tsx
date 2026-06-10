import Footer from "./components/footer";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  AppDownload,
  PageShell,
  SectionHeader,
  businessFeatures,
  creatorFeatures,
  faqs,
  whySocialGems,
} from "./components/marketing";
import Navbar from "./components/navbar";

const creatorSteps = [
  {
    step: "Step 1",
    title: "Create Your Profile",
    description: "Select your interests and connect your social platforms.",
  },
  {
    step: "Step 2",
    title: "Discover Opportunities",
    description: "Browse paid campaigns, jobs, affiliate programs, and collaborations.",
  },
  {
    step: "Step 3",
    title: "Grow and Earn",
    description: "Apply, participate, earn, and build your creator reputation.",
  },
];

const businessSteps = [
  {
    step: "Step 1",
    title: "Create a Business Account",
    description: "Set up your business profile and define the creators you want to reach.",
  },
  {
    step: "Step 2",
    title: "Discover Creators",
    description: "Search and connect with creators that fit your brand.",
  },
  {
    step: "Step 3",
    title: "Launch Opportunities",
    description: "Create campaigns, jobs, affiliate programs, and collaborations.",
  },
];

const socialProof = ["Paid Campaigns", "Creator Jobs", "Affiliate Links", "Brand Collabs", "UGC Briefs", "Creator Profiles"];

const homeImages = [
  { src: "/hero-image.webp", alt: "SocialGems creator hero" },
  { src: "/connect-image.jpg", alt: "Creators connecting with brands" },
  { src: "/inspire-image.jpg", alt: "Creator inspiration" },
  { src: "/glow-image.jpg", alt: "SocialGems creator growth" },
];

const socialGemsMoments = [
  {
    src: "/Img_22.jpg",
    alt: "Creator recording content at a SocialGems event",
    title: "Creators capturing the moment",
  },
  {
    src: "/Img_119.jpg",
    alt: "SocialGems community member with branded event frame",
    title: "Community moments that travel",
  },
  {
    src: "/Img_133.jpg",
    alt: "SocialGems creator posing with branded frame",
    title: "Real people, real visibility",
  },
];

const everythingUgandaOpportunities = [
  {
    title: "Everything Uganda Affiliate Program",
    description: "Promote travel experiences, accommodation, tours, and destinations across Uganda and earn commissions on successful referrals.",
  },
  {
    title: "UGC Creator Needed for Everything Uganda",
    description: "Create short-form content that highlights adventure expeditions, accommodation, tours, and destinations.",
  },
  {
    title: "Lifestyle Influencer for Everything Uganda",
    description: "Share authentic lifestyle and travel content with audiences interested in discovering Uganda.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fff7ec]">
      <Navbar />
      <PageShell>
        <section className="w-full max-w-full overflow-hidden px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto grid w-full max-w-7xl min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
            <div className="min-w-0 max-w-full animate-social-pop">
              <p className="mb-4 inline-flex rounded-full bg-[#fdda6d] px-4 py-2 text-sm font-extrabold uppercase tracking-[0.16em] text-[#171717]">
                Creator Opportunities Platform
              </p>
              <h1 className="max-w-full break-words text-[2.35rem] font-black leading-[1.02] text-[#171717] [overflow-wrap:anywhere] sm:text-6xl sm:leading-[0.98] lg:text-7xl">
                #WeAreSocialGems. Where influence meets opportunity.
              </h1>
              <p className="mt-6 max-w-full break-words text-base leading-7 text-[#4f4f4f] [overflow-wrap:anywhere] sm:max-w-2xl sm:text-lg sm:leading-8">
                Find paid campaigns, creator jobs, affiliate programs, free collaborations, and premium growth tools in one social-first platform.
              </p>
              <div className="mt-8 flex max-w-full min-w-0 flex-col gap-3 sm:flex-row">
                <HomePrimaryButton href="/creator">Join as a Creator</HomePrimaryButton>
                <HomeSecondaryButton href="/business">Create a Business Account</HomeSecondaryButton>
              </div>
              <p className="mt-4 text-sm font-semibold text-[#4f4f4f]">
                Already have an account?{" "}
                <Link href="/creator/login" className="font-extrabold text-[#287d69] underline underline-offset-4 hover:text-[#171717]">
                  Creator login
                </Link>
                <span className="mx-2 text-[#9a8f7f]">or</span>
                <Link href="/business/login" className="font-extrabold text-[#287d69] underline underline-offset-4 hover:text-[#171717]">
                  Business login
                </Link>
              </p>
            </div>

            <div className="grid min-w-0 max-w-full gap-4 md:relative md:min-h-[620px]">
              <div className="relative h-[360px] overflow-hidden rounded-[2rem] animate-social-float md:absolute md:left-0 md:top-0 md:h-[430px] md:w-[70%]">
                <Image
                  src="/hero-image.webp"
                  alt="SocialGems creator"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="relative h-[320px] overflow-hidden rounded-[2rem] animate-social-float [animation-delay:1.4s] md:absolute md:bottom-4 md:right-0 md:h-[360px] md:w-[58%]">
                <Image
                  src="/influencer-app.png"
                  alt="SocialGems app campaign listings"
                  fill
                  className="object-contain bg-white/75 p-4"
                />
              </div>
              <div className="justify-self-start rounded-full bg-[#287d69] px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-white animate-social-pulse md:absolute md:right-8 md:top-8 md:text-sm">
                New drops weekly
              </div>
              <div className="justify-self-end rounded-full bg-[#fdda6d] px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#171717] md:absolute md:bottom-8 md:left-8 md:text-sm">
                Brands are hiring
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#171717] py-4 text-white">
          <div className="overflow-hidden">
            <div className="flex min-w-max gap-4 whitespace-nowrap animate-social-marquee">
              {[...socialProof, ...socialProof, ...socialProof].map((item, index) => (
                <span key={`${item}-${index}`} className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-[#171717] sm:px-5 sm:text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#287d69]">#WeAreSocialGems in action</p>
              <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight text-[#171717] sm:text-5xl">
                The platform feels better when creators can see themselves in it.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#4f4f4f] sm:text-lg">
                Real creator moments bring the SocialGems community to life before users explore campaigns, jobs, affiliate programs, and collaborations.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {socialGemsMoments.map((moment, index) => (
                <figure
                  key={moment.src}
                  className={`group ${index === 1 ? "sm:translate-y-8" : ""}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-white">
                    <Image
                      src={moment.src}
                      alt={moment.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 280px"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4">
                      <figcaption className="text-sm font-bold leading-5 text-white">
                        {moment.title}
                      </figcaption>
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
            <article className="rounded-2xl bg-[#e8fff7] p-6 transition hover:-translate-y-1">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#287d69]">For Creators</p>
              <h2 className="mt-3 text-2xl font-black text-[#171717] sm:text-3xl">Find more ways to earn and grow.</h2>
              <p className="mt-4 leading-7 text-[#4f4f4f]">
                Access campaigns, jobs, affiliate programs, collaborations, and membership tools built around your
                creator career.
              </p>
              <div className="mt-6">
                <HomePrimaryButton href="/creator">Start as a Creator</HomePrimaryButton>
              </div>
            </article>
            <article className="rounded-2xl bg-[#fff0b8] p-6 transition hover:-translate-y-1">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#245d9c]">For Businesses</p>
              <h2 className="mt-3 text-2xl font-black text-[#171717] sm:text-3xl">Find creators and launch opportunities.</h2>
              <p className="mt-4 leading-7 text-[#4f4f4f]">
                Discover creators, run campaigns, post creator jobs, launch affiliate programs, and manage
                relationships from one account.
              </p>
              <div className="mt-6">
                <HomeSecondaryButton href="/business">Create a Business Account</HomeSecondaryButton>
              </div>
            </article>
          </div>
        </section>

        <section id="creator-features" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              title="Everything Creators Need to Grow"
              description="SocialGems gives creators one place to find paid work, commission-based partnerships, free collaborations, and tools that increase visibility."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {creatorFeatures.map((feature) => (
                <HomeFeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#e8fff7] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Featured Client"
              title="Everything Uganda opportunities are live on SocialGems"
              description="Creators can discover tourism campaigns, creator jobs, and affiliate opportunities connected to Uganda travel experiences."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {everythingUgandaOpportunities.map((item) => (
                <HomeFeatureCard key={item.title} {...item} />
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <HomePrimaryButton href="/affiliate-programs">View Affiliate Program</HomePrimaryButton>
              <HomeSecondaryButton href="/job-board">View Creator Jobs</HomeSecondaryButton>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {homeImages.map((image) => (
              <div key={image.src} className="relative h-64 overflow-hidden rounded-[1.75rem] bg-white sm:h-72">
                <Image src={image.src} alt={image.alt} fill className="object-cover transition duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#fff0b8] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              title="Everything Businesses Need To Work With Creators"
              description="Create the right opportunity type for your brand and connect with creators ready to help you grow."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {businessFeatures.map((feature) => (
                <HomeFeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader title="How It Works" description="Separate paths for creators and businesses keep every workflow focused." />
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <StepGroup title="For Creators" steps={creatorSteps} />
              <StepGroup title="For Businesses" steps={businessSteps} />
            </div>
          </div>
        </section>

        <section className="bg-[#edf3ff] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader title="Why SocialGems?" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {whySocialGems.map((feature) => (
                <HomeFeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              title="Platform Screenshots"
              description="Product areas for creators and businesses, ready for the latest live screenshots as they become available."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <HomeImagePanel title="Job Board" description="Creator jobs posted directly by businesses." src="/brands-pic.png" alt="Job board screenshot" />
              <HomeImagePanel title="Affiliate Programs" description="Commission-based partnerships for creators." src="/app-1.png" alt="Affiliate programs screenshot" />
              <HomeImagePanel title="Opportunity Listings" description="Campaigns, collaborations, and brand experiences." src="/influencer-pic.png" alt="Opportunity listings screenshot" />
            </div>
          </div>
        </section>

        <section className="bg-[#e8fff7] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <SectionHeader title="Frequently Asked Questions" />
            <div className="mt-10 divide-y divide-[#171717]/10 rounded-2xl bg-white">
              {faqs.map((item) => (
                <details key={item.question} className="group p-5">
                  <summary className="cursor-pointer list-none text-base font-bold text-[#171717]">
                    {item.question}
                  </summary>
                  <p className="mt-3 leading-7 text-[#555]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <AppDownload />
      </PageShell>
      <Footer />
    </div>
  );
}

function StepGroup({
  title,
  steps,
}: {
  title: string;
  steps: { step: string; title: string; description: string }[];
}) {
  return (
    <div className="rounded-2xl bg-white p-6">
      <h3 className="text-2xl font-black text-[#171717]">{title}</h3>
      <div className="mt-6 grid gap-5">
        {steps.map((item) => (
          <article key={item.title} className="rounded-xl bg-[#fff7ec] p-4 transition hover:-translate-y-1">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#287d69]">{item.step}</p>
            <h4 className="mt-2 text-lg font-bold text-[#171717]">{item.title}</h4>
            <p className="mt-2 leading-7 text-[#555]">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function HomeFeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="animate-social-pop rounded-2xl bg-white/90 p-6 transition hover:-translate-y-1">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#287d69]">SocialGems</p>
      <h3 className="mt-3 text-xl font-extrabold text-[#171717]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#555]">{description}</p>
    </article>
  );
}

function HomeImagePanel({
  title,
  description,
  src,
  alt,
}: {
  title: string;
  description: string;
  src: string;
  alt: string;
}) {
  return (
    <article className="rounded-[1.75rem] bg-white p-4 transition hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden rounded-[1.25rem] bg-[#fff7ec] sm:h-80">
        <Image src={src} alt={alt} fill className="object-contain p-3 transition duration-500 hover:scale-[1.03]" />
      </div>
      <h3 className="mt-5 text-xl font-extrabold text-[#171717]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#555]">{description}</p>
    </article>
  );
}

function HomePrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#287d69] px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#171717]"
    >
      {children}
    </Link>
  );
}

function HomeSecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#fdda6d] px-6 py-3 text-sm font-extrabold text-[#171717] transition hover:-translate-y-0.5 hover:bg-[#171717] hover:text-white"
    >
      {children}
    </Link>
  );
}
