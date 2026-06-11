"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

type Audience = "business" | "creator";
type Step = "details" | "verify" | "secure" | "complete";

export default function SocialGemsSignupForm({ audience }: { audience: Audience }) {
  const isBusiness = audience === "business";
  const [step, setStep] = useState<Step>("details");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phoneNumber: "",
    countryId: "KE",
    isoCode: "KE",
    referralCode: "",
    otp: "",
    userId: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const accent = isBusiness ? "text-[#245d9c]" : "text-[#287d69]";
  const loginHref = isBusiness ? "/business/login" : "/creator/login";
  const destination = isBusiness ? "/business/dashboard" : "/creator/dashboard";
  const suggestedUsername = useMemo(() => {
    const base = isBusiness ? form.businessName : `${form.firstName}${form.lastName}`;
    return base.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 24);
  }, [form.businessName, form.firstName, form.lastName, isBusiness]);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function requestJson(path: string, body: Record<string, unknown>) {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.message || "Request failed");
    return result;
  }

  async function createAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const firstName = isBusiness ? form.businessName : form.firstName;
      const lastName = isBusiness ? "Owner" : form.lastName;
      const result = await requestJson("/api/socialgems/signup", {
        first_name: firstName,
        last_name: lastName,
        business_name: isBusiness ? form.businessName : undefined,
        email: form.email,
        user_type: isBusiness ? "brand" : "influencer",
        phone_number: form.phoneNumber,
        country_id: form.countryId,
        iso_code: form.isoCode,
        referral_code: form.referralCode || undefined,
      });

      await requestJson("/api/socialgems/send-email-otp", { email: form.email });
      setForm((current) => ({
        ...current,
        userId: result.userId || "",
        username: result.username && !result.username.includes("user-") ? result.username : suggestedUsername,
      }));
      setStep("verify");
      setMessage("We sent a verification code to your email.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  async function verifyEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await requestJson("/api/socialgems/verify-email", {
        email: form.email,
        otp: form.otp,
        user_id: form.userId,
      });
      setForm((current) => ({
        ...current,
        userId: result.userId || current.userId,
        username: current.username || result.username || suggestedUsername,
      }));
      setStep("secure");
      setMessage("Email verified. Create your username and password.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Email verification failed");
    } finally {
      setLoading(false);
    }
  }

  async function secureAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await requestJson("/api/socialgems/secure-account", {
        userId: form.userId,
        username: form.username,
        password: form.password,
        confirm_password: form.confirmPassword,
      });
      const loginResult = await requestJson("/api/socialgems/login", {
        email: form.email,
        password: form.password,
      });
      window.location.href = loginResult.destination || destination;
    } catch (error) {
      setStep("complete");
      setMessage(error instanceof Error ? error.message : "Account created. Sign in to continue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-2xl rounded-lg border border-[#e7e1d6] bg-white p-6 shadow-sm">
      <p className={`text-sm font-bold uppercase tracking-[0.16em] ${accent}`}>
        {isBusiness ? "Business Signup" : "Creator Signup"}
      </p>
      <h1 className="mt-3 text-3xl font-bold text-[#171717]">
        {isBusiness ? "Create a SocialGems business account" : "Create your SocialGems creator account"}
      </h1>
      {message ? <p className="mt-5 rounded-md bg-[#fff5d5] px-3 py-2 text-sm font-semibold text-[#5c4218]">{message}</p> : null}

      {step === "details" ? (
        <form onSubmit={createAccount} className="mt-6 grid gap-4">
          {isBusiness ? (
            <Field label="Business Name" value={form.businessName} onChange={(value) => update("businessName", value)} required />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First Name" value={form.firstName} onChange={(value) => update("firstName", value)} required />
              <Field label="Last Name" value={form.lastName} onChange={(value) => update("lastName", value)} required />
            </div>
          )}
          <Field label="Email" type="email" value={form.email} onChange={(value) => update("email", value)} required />
          <Field label="Phone Number" type="tel" value={form.phoneNumber} onChange={(value) => update("phoneNumber", value)} required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Country" value={form.countryId} onChange={(value) => update("countryId", value.toUpperCase())} required />
            <Field label="ISO Code" value={form.isoCode} onChange={(value) => update("isoCode", value.toUpperCase())} required />
          </div>
          <Field label="Referral Code" value={form.referralCode} onChange={(value) => update("referralCode", value.toUpperCase())} />
          <Submit loading={loading} label="Create Account" loadingLabel="Creating account..." />
        </form>
      ) : null}

      {step === "verify" ? (
        <form onSubmit={verifyEmail} className="mt-6 grid gap-4">
          <Field label="Verification Code" value={form.otp} onChange={(value) => update("otp", value)} required />
          <Submit loading={loading} label="Verify Email" loadingLabel="Verifying..." />
        </form>
      ) : null}

      {step === "secure" ? (
        <form onSubmit={secureAccount} className="mt-6 grid gap-4">
          <Field label="Username" value={form.username} onChange={(value) => update("username", value)} required />
          <Field label="Password" type="password" value={form.password} onChange={(value) => update("password", value)} required />
          <Field label="Confirm Password" type="password" value={form.confirmPassword} onChange={(value) => update("confirmPassword", value)} required />
          <Submit loading={loading} label="Enter Dashboard" loadingLabel="Securing account..." />
        </form>
      ) : null}

      {step === "complete" ? (
        <div className="mt-6">
          <Link href={loginHref} className="inline-flex min-h-12 items-center rounded-md bg-[#171717] px-5 py-3 text-sm font-bold text-white">
            Sign In
          </Link>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap justify-between gap-3 text-sm">
        <Link href={loginHref} className="font-semibold text-[#171717] underline">
          Already have an account?
        </Link>
        <Link href="/" className="text-[#555] underline">
          Back to website
        </Link>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-bold text-[#171717]">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="mt-2 min-h-12 w-full rounded-md border border-[#d8d0c2] px-3 text-[#171717] outline-none focus:border-[#171717]"
      />
    </label>
  );
}

function Submit({ loading, label, loadingLabel }: { loading: boolean; label: string; loadingLabel: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 flex min-h-12 w-full items-center justify-center rounded-md bg-[#171717] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? loadingLabel : label}
    </button>
  );
}
