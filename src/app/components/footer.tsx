import Image from "next/image";
import Link from "next/link";

const footerGroups = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/contact" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Campaigns", href: "/#creator-features" },
      { label: "Job Board", href: "/job-board" },
      { label: "Affiliate Programs", href: "/affiliate-programs" },
      { label: "Explore Opportunities", href: "/explore-opportunities" },
      { label: "Creator Memberships", href: "/creator-memberships" },
      { label: "Creator Portal", href: "/creator" },
      { label: "Business Portal", href: "/business" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blogpost" },
      { label: "FAQs", href: "/faq" },
      { label: "Guides", href: "/blogpost" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacypolicy" },
      { label: "Terms & Conditions", href: "/terms-of-use" },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/socialgems.ug?igsh=YXJoYzl5bTBvMTRn" },
  { label: "TikTok", href: "https://www.tiktok.com/@social_gems_?_t=ZM-8uQSMzJIl7O&_r=1" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/social-gems-africa/" },
  { label: "X", href: "https://x.com/socialgems_ug?s=21&t=e3hDCBTz5hi2lkSy-3BO9A" },
];

const partnerLinks = [
  {
    name: "Everything Uganda",
    href: "https://www.everythinguganda.com/",
    logo: "https://www.everythinguganda.com/logo.svg",
  },
  {
    name: "TekJuice",
    href: "https://tekjuice.co.uk/",
    logo: "/partnerlogos/tekjuice-logo.png",
  },
  {
    name: "HustleIN",
    href: "https://hustlein.net/",
    logo: "/partnerlogos/hustlein-logo.png",
  },
  {
    name: "Kampala Nights",
    href: "https://kampalanights.com/",
    logo: "/partnerlogos/kampala-nights-logo.png",
  },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-[#171717] bg-[#171717] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Image src="/social-gems-fn-200.png" width={120} height={90} alt="SocialGems" className="h-14 w-auto object-contain" />
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
              A Creator Opportunities Platform where creators find campaigns, jobs, affiliate programs,
              collaborations, and growth tools.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
              className="rounded-md border-2 border-white/30 px-3 py-2 text-sm font-bold text-white/85 transition hover:-translate-y-0.5 hover:border-[#fdda6d] hover:bg-[#fdda6d] hover:text-[#171717]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#fdda6d]">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-white/70 transition hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#fdda6d]">Our Partners</h3>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {partnerLinks.map((partner) => (
              <Link
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.name}
                className="block overflow-hidden rounded-md border border-white/10 transition hover:-translate-y-0.5 hover:border-[#fdda6d] hover:shadow-[0_0_0_2px_rgba(253,218,109,0.25)]"
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-24 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="flex h-24 items-center justify-center text-xl font-black tracking-normal text-white">{partner.name}</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/55">
          <p>Copyright 2026 SocialGems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
