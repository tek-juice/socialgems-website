//thank you page.
import Navbar from "../components/navbar";
import Footer  from "../components/footer";

export default function ThankYouPage() {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="bg-white p-4 flex-grow flex  items-center justify-center text-green-600">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
            <h1 className="text-3xl font-bold text-green mb-4">Thank You!</h1>
            <>✅</>
            <p className="text-l font-bold mt-2">
                Your message has been sent successfully. We'll get back to you soon.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }