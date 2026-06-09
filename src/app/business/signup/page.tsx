import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import SocialGemsSignupForm from "../../components/SocialGemsSignupForm";

export default function BusinessSignupPage() {
  return (
    <div className="min-h-screen bg-[#fffdf8]">
      <Navbar />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <SocialGemsSignupForm audience="business" />
      </main>
      <Footer />
    </div>
  );
}
