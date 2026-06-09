import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export const creatorFeatures = [
  {
    title: "Paid Campaigns",
    description: "Work with brands and earn money through sponsored opportunities.",
  },
  {
    title: "Job Board",
    description: "Browse creator jobs posted directly by businesses, including UGC Creator, Brand Ambassador, Influencer, and Content Creator roles.",
  },
  {
    title: "Affiliate Programs",
    description: "Promote products and earn commissions through affiliate partnerships.",
  },
  {
    title: "Explore Opportunities",
    description: "Discover product gifting, service collaborations, event invitations, and brand experiences.",
  },
  {
    title: "Creator Plus",
    description: "Access premium opportunities, increase your visibility to businesses, and unlock additional creator benefits.",
  },
  {
    title: "Creator Pro",
    description: "Get first access to opportunities, maximum profile visibility, and exclusive features designed to help you grow and earn more.",
  },
];

export const businessFeatures = [
  {
    title: "Discover Creators",
    description: "Find creators that match your audience, goals, category, and campaign needs.",
  },
  {
    title: "Create Paid Campaigns",
    description: "Launch campaigns and connect with relevant creators ready to promote your brand.",
  },
  {
    title: "Post Creator Jobs",
    description: "Hire content creators, UGC creators, influencers, and brand ambassadors.",
  },
  {
    title: "Create Affiliate Programs",
    description: "Build affiliate partnerships and manage creator affiliates from one place.",
  },
  {
    title: "Offer Collaborations",
    description: "Create gifting opportunities, service collaborations, events, and brand experiences.",
  },
  {
    title: "Register & Verify Your Business",
    description: "Create a business account and complete verification to unlock campaigns, jobs, affiliate programs, collaborations, and creator management tools.",
  },
  {
    title: "Manage Creator Applications",
    description: "View applications, communicate with creators, approve submissions, request revisions, and manage opportunity progress from one dashboard.",
  },
];

export const whySocialGems = [
  {
    title: "Multiple Opportunity Types",
    description: "Access campaigns, jobs, affiliate programs, and collaborations from one platform.",
  },
  {
    title: "Built For African Creators",
    description: "Designed specifically for creators and businesses across Africa.",
  },
  {
    title: "Direct Brand Connections",
    description: "Connect directly with businesses looking for creators.",
  },
  {
    title: "Growth Opportunities",
    description: "Build your portfolio, increase visibility, and grow your creator career.",
  },
  {
    title: "All In One Platform",
    description: "Manage opportunities, collaborations, and creator growth from a single account.",
  },
];

export const faqs = [
  {
    question: "What can creators find on SocialGems?",
    answer: "Creators can access paid campaigns, creator jobs, affiliate programs, free collaborations, and membership tools that help them grow.",
  },
  {
    question: "Can businesses post creator jobs?",
    answer: "Yes. Businesses can post creator roles such as UGC Creator, Brand Ambassador, Influencer, and Content Creator.",
  },
  {
    question: "How do affiliate programs work?",
    answer: "Businesses create affiliate opportunities and commission structures, while creators promote products or services and earn commissions.",
  },
  {
    question: "Are all opportunities paid campaigns?",
    answer: "No. SocialGems also supports product gifting, complimentary services, event access, brand experiences, and other collaborations.",
  },
  {
    question: "What are Creator Plus and Creator Pro?",
    answer: "They are creator membership options designed to increase visibility, access, and platform benefits. Final plan details will be provided by the product team.",
  },
  {
    question: "How do payments work?",
    answer: "Payment terms depend on the opportunity type and the business offering it. Creators should review each opportunity before applying.",
  },
  {
    question: "Can businesses create an account?",
    answer: "Yes. Businesses can create an account to discover creators, launch campaigns, post jobs, create affiliate programs, and offer collaborations.",
  },
];

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#287d69]">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-bold text-[#171717] sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-[#545454] sm:text-lg">{description}</p> : null}
    </div>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#287d69] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#171717]"
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-[#171717] bg-[#fdda6d] px-6 py-3 text-sm font-extrabold text-[#171717] transition hover:bg-[#171717] hover:text-white"
    >
      {children}
    </Link>
  );
}

export function FeatureCard({ title, description }: { title: string; description: string }) {
  const tones = [
    "border-[#171717] bg-[#fff9df] sm:shadow-[8px_8px_0_#fdda6d]",
    "border-[#171717] bg-[#e8fff7] sm:shadow-[8px_8px_0_#287d69]",
    "border-[#171717] bg-[#e8fff7] sm:shadow-[8px_8px_0_#4dd7b5]",
    "border-[#171717] bg-[#edf3ff] sm:shadow-[8px_8px_0_#8fb8ff]",
  ];
  const tone = tones[title.length % tones.length];

  return (
    <article className={`animate-social-pop rounded-lg border-2 p-5 transition hover:-translate-y-1 ${tone}`}>
      <p className="mb-3 inline-flex rounded-full bg-[#171717] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white">
        SocialGems
      </p>
      <h3 className="text-xl font-extrabold text-[#171717]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#555]">{description}</p>
    </article>
  );
}

export function ScreenshotPanel({
  title,
  description,
  src,
  alt,
  tone = "green",
}: {
  title: string;
  description: string;
  src: string;
  alt: string;
  tone?: "green" | "blue" | "gold";
}) {
  const toneClass =
    tone === "blue" ? "bg-[#edf3ff]" : tone === "gold" ? "bg-[#fff0b8]" : "bg-[#e8fff7]";

  return (
    <div className={`animate-social-pop rounded-lg border-2 border-[#171717] ${toneClass} p-4 transition hover:-translate-y-1 sm:shadow-[10px_10px_0_#171717]`}>
      <div className="overflow-hidden rounded-md border-2 border-[#171717] bg-white shadow-sm">
        <Image src={src} alt={alt} width={900} height={620} className="h-64 w-full object-contain p-3 transition duration-500 hover:scale-[1.03]" />
      </div>
      <h3 className="mt-4 text-xl font-extrabold text-[#171717]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#555]">{description}</p>
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="bg-[#fff7ec] text-[#171717]">{children}</main>;
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryHref = "/signup",
  primaryLabel = "Create a Business Account",
  secondaryHref = "/influencers",
  secondaryLabel = "Join as a Creator",
  image = "/app.png",
  imageAlt = "SocialGems platform screen",
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="animate-social-pop">
          <p className="mb-4 inline-flex rounded-full border-2 border-[#171717] bg-[#fdda6d] px-4 py-2 text-sm font-extrabold uppercase tracking-[0.16em] text-[#171717] sm:shadow-[5px_5px_0_#171717]">{eyebrow}</p>
          <h1 className="max-w-4xl text-[2.6rem] font-black leading-[1] text-[#171717] sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4f4f4f]">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href={secondaryHref}>{secondaryLabel}</PrimaryButton>
            <SecondaryButton href={primaryHref}>{primaryLabel}</SecondaryButton>
          </div>
        </div>
        <div className="animate-social-float">
          <ScreenshotPanel
            title="Platform view"
            description="A product-led view of opportunities, creator profiles, and growth tools."
            src={image}
            alt={imageAlt}
            tone="blue"
          />
        </div>
      </div>
    </section>
  );
}

export function AppDownload() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border-2 border-[#171717] bg-[#171717] p-6 text-white sm:p-8 sm:shadow-[12px_12px_0_#287d69] lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fdda6d]">Mobile app</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Take SocialGems Everywhere</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
            Discover opportunities, manage applications, and stay connected with creators or brands from your phone.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="https://play.google.com/store/apps/details?id=com.tekjuice.social_gems" target="_blank" rel="noopener noreferrer">
              <Image src="/Google-play-store.svg" alt="Get it on Google Play" width={160} height={48} />
            </Link>
            <Link href="https://apps.apple.com/ug/app/social-gems/id6736918664" target="_blank" rel="noopener noreferrer">
              <Image src="/App-store.svg" alt="Download on the App Store" width={160} height={48} />
            </Link>
          </div>
        </div>
        <div className="grid h-36 w-36 grid-cols-5 gap-1 rounded-md bg-white p-3" aria-label="SocialGems app download QR code placeholder">
          {Array.from({ length: 25 }).map((_, index) => (
            <span
              key={index}
              className={`rounded-sm ${
                [0, 1, 3, 4, 5, 8, 10, 12, 14, 16, 18, 20, 21, 23, 24].includes(index)
                  ? "bg-[#171717]"
                  : "bg-[#fdda6d]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
