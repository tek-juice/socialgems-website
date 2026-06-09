import Link from "next/link";
import Footer from "../components/footer";
import { businessActions } from "../components/portal";
import { ActionGrid } from "../components/portal";
import Navbar from "../components/navbar";

export default function BusinessLandingPage() {
  return (
    <div className="min-h-screen bg-[#fff7ec]">
      <Navbar />
      <main className="overflow-hidden px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <section className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div className="animate-social-pop">
            <p className="inline-flex rounded-full border-2 border-[#171717] bg-[#8fb8ff] px-4 py-2 text-sm font-extrabold uppercase tracking-[0.16em] text-[#171717] sm:shadow-[5px_5px_0_#171717]">
              SocialGems for Business
            </p>
            <h1 className="mt-5 max-w-4xl text-[2.6rem] font-black leading-[1] text-[#171717] sm:text-6xl lg:text-7xl">
              Find creators who move culture.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#555]">
              Register your business, launch campaigns, post creator jobs, build affiliate programs, and manage creator applications from one dashboard.
            </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/business/dashboard" className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#287d69] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#171717]">
              Open Business Portal
            </Link>
            <Link href="/business/signup" className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-[#171717] bg-[#fdda6d] px-6 py-3 text-sm font-extrabold text-[#171717] transition hover:bg-[#171717] hover:text-white">
              Create Business Account
            </Link>
          </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Campaigns", "Jobs", "Applicants", "Affiliate Programs"].map((item) => (
                <span key={item} className="rounded-full border-2 border-[#171717] bg-white px-4 py-2 text-sm font-black text-[#171717] sm:shadow-[4px_4px_0_#8fb8ff]">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="animate-social-float rounded-lg border-2 border-[#171717] bg-[#edf3ff] p-5 sm:p-6 sm:shadow-[12px_12px_0_#8fb8ff]">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#245d9c]">Business flow</p>
            <div className="mt-5 grid gap-4">
              {["Verify business", "Launch opportunity", "Manage applications"].map((item) => (
                <div key={item} className="rounded-lg border-2 border-[#171717] bg-white p-4 font-extrabold text-[#171717]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-7xl">
          <ActionGrid actions={businessActions} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
