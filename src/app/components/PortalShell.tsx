"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import type { IconType } from "react-icons";

export type PortalKind = "business" | "creator";

type NavItem = {
  label: string;
  href: string;
  icon: IconType;
};

type UserState = {
  displayName: string;
  userType: string;
};

function usePortalUser(): UserState | null {
  const [user, setUser] = useState<UserState | null>(null);

  useEffect(() => {
    const read = () => {
      if (!sessionStorage.getItem("socialgemsSession")) {
        setUser(null);
        return;
      }
      setUser({
        displayName: sessionStorage.getItem("socialgemsDisplayName") || "My Account",
        userType: sessionStorage.getItem("socialgemsUserType") || "",
      });
    };

    read();
    window.addEventListener("focus", read);
    window.addEventListener("socialgems-auth-changed", read as EventListener);
    return () => {
      window.removeEventListener("focus", read);
      window.removeEventListener("socialgems-auth-changed", read as EventListener);
    };
  }, []);

  return user;
}

function useLogout(kind: PortalKind) {
  const router = useRouter();

  return async () => {
    sessionStorage.removeItem("socialgemsSession");
    sessionStorage.removeItem("socialgemsUserType");
    sessionStorage.removeItem("socialgemsDisplayName");
    try {
      await fetch("/api/socialgems/logout", { method: "POST" });
    } catch {
      // session already cleared client-side
    }
    window.dispatchEvent(new Event("socialgems-auth-changed"));
    router.push(kind === "business" ? "/business/login" : "/creator/login");
  };
}

function UserAvatar({ name }: { name: string }) {
  const parts = name.trim().split(/\s+/);
  const initials =
    parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`
      : name.slice(0, 2);
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#171717] text-xs font-black text-white">
      {initials.toUpperCase()}
    </div>
  );
}

// ─── Portal Header ────────────────────────────────────────────────────────────

export function PortalHeader({
  kind,
}: {
  kind: PortalKind;
}) {
  const user = usePortalUser();
  const logout = useLogout(kind);
  const accent = kind === "business" ? "text-[#245d9c]" : "text-[#287d69]";
  const loginHref = kind === "business" ? "/business/login" : "/creator/login";

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#171717] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="SocialGems home">
          <Image
            src="/social-gems-fn-200.png"
            width={92}
            height={72}
            alt="SocialGems"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Portal label — desktop only */}
        <p className={`hidden text-xs font-black uppercase tracking-[0.18em] lg:block ${accent}`}>
          {kind === "business" ? "Business Portal" : "Creator Portal"}
        </p>

        {/* Right side */}
        {user ? (
          <div className="flex items-center gap-3">
            {/* User name — desktop */}
            <div className="hidden items-center gap-2.5 sm:flex">
              <UserAvatar name={user.displayName} />
              <div className="leading-tight">
                <p className="text-sm font-bold text-[#171717]">{user.displayName}</p>
                <p className={`text-xs font-semibold ${accent}`}>
                  {kind === "business" ? "Business" : "Creator"}
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-md border-2 border-[#171717] bg-white px-4 py-2 text-sm font-bold text-[#171717] transition hover:bg-[#171717] hover:text-white"
            >
              <FiLogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        ) : (
          <Link
            href={loginHref}
            className="inline-flex min-h-10 items-center rounded-md border-2 border-[#171717] bg-[#fdda6d] px-4 py-2 text-sm font-bold text-[#171717] transition hover:bg-[#171717] hover:text-white"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}

// ─── Portal Sidebar ───────────────────────────────────────────────────────────

export function PortalSidebar({
  nav,
  kind,
}: {
  nav: NavItem[];
  kind: PortalKind;
}) {
  const pathname = usePathname();
  const user = usePortalUser();
  const logout = useLogout(kind);
  const accent = kind === "business" ? "text-[#245d9c]" : "text-[#287d69]";
  const accentBg = kind === "business" ? "bg-[#edf3ff]" : "bg-[#e8fff7]";

  return (
    <aside className="hidden h-fit rounded-lg border-2 border-[#171717] bg-white sm:shadow-[8px_8px_0_#171717] lg:flex lg:flex-col">

      {/* User card */}
      {user ? (
        <div className={`flex items-center gap-3 rounded-t-md ${accentBg} px-4 py-4`}>
          <UserAvatar name={user.displayName} />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#171717]">{user.displayName}</p>
            <p className={`text-xs font-semibold ${accent}`}>
              {kind === "business" ? "Business" : "Creator"}
            </p>
          </div>
        </div>
      ) : (
        <div className="px-4 pt-4">
          <p className={`text-xs font-bold uppercase tracking-[0.16em] ${accent}`}>
            SocialGems for {kind === "business" ? "Business" : "Creators"}
          </p>
        </div>
      )}

      {/* Nav links */}
      <nav className="grid gap-0.5 p-3">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-bold transition ${
                active
                  ? "bg-[#fff0b8] text-[#171717]"
                  : "text-[#444] hover:bg-[#fff0b8] hover:text-[#171717]"
              }`}
            >
              <item.icon
                className={`h-4 w-4 shrink-0 ${active ? "text-[#171717]" : "text-[#287d69]"}`}
                aria-hidden="true"
              />
              <span className="flex-1">{item.label}</span>
              {active && (
                <span className="h-2 w-2 rounded-full bg-[#287d69]" aria-hidden="true" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-[#f0eadf] p-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-bold text-[#c0392b] transition hover:bg-red-50"
        >
          <FiLogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          Log out
        </button>
      </div>
    </aside>
  );
}

// ─── Portal Mobile Bottom Bar ─────────────────────────────────────────────────

export function PortalMobileBar({ nav, kind }: { nav: NavItem[]; kind: PortalKind }) {
  const pathname = usePathname();
  const logout = useLogout(kind);

  // Show first 4 nav items + logout as the 5th slot
  const visibleItems = nav.slice(0, 4);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-[#171717] bg-white lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex max-w-lg items-stretch">
        {visibleItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 px-1 py-3 text-center transition ${
                active ? "text-[#171717]" : "text-[#777]"
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${active ? "text-[#287d69]" : "text-[#aaa]"}`}
                aria-hidden="true"
              />
              <span className="text-[10px] font-bold leading-none">
                {item.label.split(" ")[0]}
              </span>
              {active && (
                <span className="h-0.5 w-5 rounded-full bg-[#fdda6d]" aria-hidden="true" />
              )}
            </Link>
          );
        })}

        {/* Logout slot */}
        <button
          type="button"
          onClick={logout}
          className="flex flex-1 flex-col items-center gap-1 px-1 py-3 text-[#c0392b] transition hover:bg-red-50"
        >
          <FiLogOut className="h-5 w-5" aria-hidden="true" />
          <span className="text-[10px] font-bold leading-none">Log out</span>
        </button>
      </div>
    </nav>
  );
}
