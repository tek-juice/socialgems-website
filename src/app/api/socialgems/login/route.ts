import { NextRequest, NextResponse } from "next/server";
import {
  SOCIALGEMS_ACCESS_COOKIE,
  SOCIALGEMS_DISPLAY_COOKIE,
  SOCIALGEMS_REFRESH_COOKIE,
  SOCIALGEMS_USER_ID_COOKIE,
  SOCIALGEMS_USER_TYPE_COOKIE,
  getSocialGemsApiBaseUrl,
} from "../../../lib/socialgems-api";

type LoginResponse = {
  status?: number;
  message?: string;
  data?: {
    jwt?: string;
    refreshToken?: string;
    user_id?: string;
    user_type?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
  };
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch(`${getSocialGemsApiBaseUrl()}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const result = (await response.json()) as LoginResponse;
  const token = result.data?.jwt;

  if (!response.ok || result.status !== 200 || !token) {
    return NextResponse.json(
      { ok: false, message: result.message || "Login failed" },
      { status: response.ok ? result.status || 400 : response.status },
    );
  }

  const userType = result.data?.user_type || "";
  const destination = userType === "brand" ? "/business/dashboard" : "/creator/dashboard";
  const displayName =
    [result.data?.first_name, result.data?.last_name].filter(Boolean).join(" ") ||
    result.data?.username ||
    result.data?.email ||
    "";

  const nextResponse = NextResponse.json({
    ok: true,
    destination,
    userType,
    userId: result.data?.user_id,
    profile: result.data,
  });

  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 12 * 60 * 60,
  };

  nextResponse.cookies.set(SOCIALGEMS_ACCESS_COOKIE, token, cookieOptions);
  if (result.data?.refreshToken) {
    nextResponse.cookies.set(SOCIALGEMS_REFRESH_COOKIE, result.data.refreshToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60,
    });
  }
  nextResponse.cookies.set(SOCIALGEMS_USER_TYPE_COOKIE, userType, cookieOptions);
  if (result.data?.user_id) nextResponse.cookies.set(SOCIALGEMS_USER_ID_COOKIE, result.data.user_id, cookieOptions);
  if (displayName) nextResponse.cookies.set(SOCIALGEMS_DISPLAY_COOKIE, displayName, cookieOptions);

  return nextResponse;
}
