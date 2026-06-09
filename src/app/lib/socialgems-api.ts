import { cookies } from "next/headers";

export type SocialGemsApiResult<T = unknown> = {
  ok: boolean;
  status: number;
  data: T | null;
  error?: string;
};

export type SocialGemsSession = {
  token: string;
  refreshToken?: string;
  userId?: string;
  userType?: string;
  displayName?: string;
};

export const SOCIALGEMS_ACCESS_COOKIE = "sg_access_token";
export const SOCIALGEMS_REFRESH_COOKIE = "sg_refresh_token";
export const SOCIALGEMS_USER_TYPE_COOKIE = "sg_user_type";
export const SOCIALGEMS_USER_ID_COOKIE = "sg_user_id";
export const SOCIALGEMS_DISPLAY_COOKIE = "sg_display_name";

export function getSocialGemsApiBaseUrl() {
  return (process.env.SOCIALGEMS_API_URL || "https://sg-backend-0cs6.onrender.com").replace(/\/$/, "");
}

export async function getSocialGemsSession(): Promise<SocialGemsSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SOCIALGEMS_ACCESS_COOKIE)?.value;

  if (!token) return null;

  return {
    token,
    refreshToken: cookieStore.get(SOCIALGEMS_REFRESH_COOKIE)?.value,
    userType: cookieStore.get(SOCIALGEMS_USER_TYPE_COOKIE)?.value,
    userId: cookieStore.get(SOCIALGEMS_USER_ID_COOKIE)?.value,
    displayName: cookieStore.get(SOCIALGEMS_DISPLAY_COOKIE)?.value,
  };
}

export async function socialGemsApiFetch<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<SocialGemsApiResult<T>> {
  const session = await getSocialGemsSession();
  const url = `${getSocialGemsApiBaseUrl()}/${path.replace(/^\//, "")}`;
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (session?.token) {
    headers.set("Authorization", `Bearer ${session.token}`);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      cache: "no-store",
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    return {
      ok: response.ok,
      status: response.status,
      data,
      error: response.ok ? undefined : data?.message || data?.error || response.statusText,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: error instanceof Error ? error.message : "Unable to reach SocialGems backend",
    };
  }
}
