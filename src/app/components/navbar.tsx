"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const creatorLinks = [
  { name: "Creator Home", path: "/creator" },
  { name: "Campaigns", path: "/#creator-features" },
  { name: "Job Board", path: "/job-board" },
  { name: "Affiliate Programs", path: "/affiliate-programs" },
  { name: "Explore Opportunities", path: "/explore-opportunities" },
  { name: "Creator Plus", path: "/creator-memberships#creator-plus" },
  { name: "Creator Pro", path: "/creator-memberships#creator-pro" },
  { name: "Creator Portal", path: "/creator/dashboard" },
];

const businessLinks = [
  { name: "Business Home", path: "/business" },
  { name: "Find Creators", path: "/business/creators" },
  { name: "Create Opportunities", path: "/business/opportunities" },
  { name: "Business Portal", path: "/business/dashboard" },
];

const companyLinks = [
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Resources", path: "/blogpost" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#171717] bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="SocialGems home">
          <Image src="/social-gems-fn-200.png" width={92} height={72} alt="SocialGems" className="h-12 w-auto object-contain" />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <NavGroup title="For Creators" links={creatorLinks} pathname={pathname} />
          <NavGroup title="For Businesses" links={businessLinks} pathname={pathname} />
          <NavGroup title="Company" links={companyLinks} pathname={pathname} />
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/business"
            className="inline-flex min-h-11 items-center justify-center rounded-md border-2 border-[#171717] bg-[#287d69] px-5 py-2 text-sm font-extrabold text-white transition hover:bg-[#171717]"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border-2 border-[#171717] bg-[#fdda6d] text-[#171717] lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="flex flex-col gap-1.5" aria-hidden="true">
            <span className={`block h-0.5 w-5 bg-current transition ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t-2 border-[#171717] bg-white px-4 py-4 lg:hidden">
          <MobileGroup title="For Creators" links={creatorLinks} onNavigate={() => setIsOpen(false)} />
          <MobileGroup title="For Businesses" links={businessLinks} onNavigate={() => setIsOpen(false)} />
          <MobileGroup title="Company" links={companyLinks} onNavigate={() => setIsOpen(false)} />
          <Link
            href="/business"
            onClick={() => setIsOpen(false)}
            className="mt-4 flex min-h-12 items-center justify-center rounded-md border-2 border-[#171717] bg-[#287d69] px-5 py-3 text-sm font-extrabold text-white"
          >
            Get Started
          </Link>
        </div>
      ) : null}
    </header>
  );
}

function NavGroup({
  title,
  links,
  pathname,
}: {
  title: string;
  links: { name: string; path: string }[];
  pathname: string;
}) {
  return (
    <div className="group relative">
      <button className="rounded-md px-2 py-2 text-sm font-extrabold text-[#171717] transition group-hover:bg-[#fdda6d]">
        {title}
      </button>
      <div className="invisible absolute left-0 top-full w-64 translate-y-2 rounded-lg border-2 border-[#171717] bg-white p-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 sm:shadow-[8px_8px_0_#171717]">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={`block rounded-md px-3 py-2 text-sm font-semibold text-[#333] transition hover:bg-[#fff0b8] ${
              pathname === link.path ? "font-bold text-[#171717]" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileGroup({
  title,
  links,
  onNavigate,
}: {
  title: string;
  links: { name: string; path: string }[];
  onNavigate: () => void;
}) {
  return (
    <div className="border-b border-[#f0eadf] py-3 last:border-b-0">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#287d69]">{title}</p>
      <div className="grid gap-1">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            onClick={onNavigate}
            className="rounded-md px-2 py-2 text-sm font-semibold text-[#171717] hover:bg-[#fff0b8]"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
