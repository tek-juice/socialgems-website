import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import SocialGemsLoginForm from "../../components/SocialGemsLoginForm";

export default function BusinessLoginPage() {
  return (
    <div className="min-h-screen bg-[#fffdf8]">
      <Navbar />
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <SocialGemsLoginForm audience="business" />
      </main>
      <Footer />
    </div>
  );
}
