import Link from "next/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { ActionGrid, creatorActions } from "../components/portal";

export default function CreatorLandingPage() {
  return (
    <div className="min-h-screen bg-[#fff7ec]">
      <Navbar />
      <main className="overflow-hidden px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <section className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div className="animate-social-pop">
            <p className="inline-flex rounded-full border-2 border-[#171717] bg-[#fdda6d] px-4 py-2 text-sm font-extrabold uppercase tracking-[0.16em] text-[#171717] sm:shadow-[5px_5px_0_#171717]">
              SocialGems for Creators
            </p>
            <h1 className="mt-5 max-w-4xl text-[2.6rem] font-black leading-[1] text-[#171717] sm:text-6xl lg:text-7xl">
              Your next brand deal starts here.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#555]">
              Discover paid campaigns, creator jobs, affiliate programs, collaborations, and growth tools built to help you get seen and earn.
            </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/creator/dashboard" className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#287d69] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#171717]">
              Open Creator Portal
            </Link>
            <Link href="/creator/signup" className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-[#171717] bg-[#fdda6d] px-6 py-3 text-sm font-extrabold text-[#171717] transition hover:bg-[#171717] hover:text-white">
              Join as Creator
            </Link>
          </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Campaigns", "Jobs", "Affiliate Links", "Collabs"].map((item) => (
                <span key={item} className="rounded-full border-2 border-[#171717] bg-white px-4 py-2 text-sm font-black text-[#171717] sm:shadow-[4px_4px_0_#4dd7b5]">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="animate-social-float rounded-lg border-2 border-[#171717] bg-[#e8fff7] p-5 sm:p-6 sm:shadow-[12px_12px_0_#287d69]">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#287d69]">Creator pulse</p>
            <div className="mt-5 grid gap-4">
              {["Apply to a UGC job", "Open an affiliate link", "Track My Applications"].map((item) => (
                <div key={item} className="rounded-lg border-2 border-[#171717] bg-white p-4 font-extrabold text-[#171717]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-7xl">
          <ActionGrid actions={creatorActions} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
