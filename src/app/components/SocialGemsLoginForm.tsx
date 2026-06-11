"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function SocialGemsLoginForm({
  audience,
}: {
  audience: "business" | "creator";
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/socialgems/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setMessage(result.message || "Login failed");
        return;
      }

      sessionStorage.setItem("socialgemsSession", "true");
      if (result.userType) {
        sessionStorage.setItem("socialgemsUserType", result.userType);
      }
      if (result.profile?.first_name || result.profile?.username || result.profile?.email) {
        sessionStorage.setItem(
          "socialgemsDisplayName",
          [result.profile?.first_name, result.profile?.last_name].filter(Boolean).join(" ") ||
            result.profile?.username ||
            result.profile?.email,
        );
      }
      window.dispatchEvent(new Event("socialgems-auth-changed"));
      window.location.href = result.destination;
    } catch {
      setMessage("Unable to reach SocialGems backend. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const isBusiness = audience === "business";

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-lg border border-[#e7e1d6] bg-white p-6 shadow-sm">
      <p className={`text-sm font-bold uppercase tracking-[0.16em] ${isBusiness ? "text-[#245d9c]" : "text-[#287d69]"}`}>
        {isBusiness ? "Business Login" : "Creator Login"}
      </p>
      <h1 className="mt-3 text-3xl font-bold text-[#171717]">
        Sign in with your SocialGems account
      </h1>
     

      <label className="mt-6 block text-sm font-bold text-[#171717]" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        className="mt-2 w-full rounded-md border border-[#d8d0c2] px-3 py-3 text-[#171717] outline-none focus:border-[#171717]"
      />

      <label className="mt-4 block text-sm font-bold text-[#171717]" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        className="mt-2 w-full rounded-md border border-[#d8d0c2] px-3 py-3 text-[#171717] outline-none focus:border-[#171717]"
      />

      {message ? <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{message}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex min-h-12 w-full items-center justify-center rounded-md bg-[#171717] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm">
        <Link href={isBusiness ? "/business/signup" : "/creator/signup"} className="font-semibold text-[#171717] underline">
          Create account
        </Link>
        <Link href="/" className="text-[#555] underline">
          Back to website
        </Link>
      </div>
    </form>
  );
}
