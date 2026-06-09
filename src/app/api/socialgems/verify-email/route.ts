import { NextRequest, NextResponse } from "next/server";
import {
  SOCIALGEMS_ACCESS_COOKIE,
  SOCIALGEMS_USER_ID_COOKIE,
  SOCIALGEMS_USER_TYPE_COOKIE,
  getSocialGemsApiBaseUrl,
} from "../../../lib/socialgems-api";

type VerifyEmailResponse = {
  status?: number;
  message?: string;
  data?: {
    token?: string;
    user_id?: string;
    username?: string;
    type?: string;
    status?: string;
  };
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch(`${getSocialGemsApiBaseUrl()}/users/verifyEmail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const result = (await response.json()) as VerifyEmailResponse;
  const token = result.data?.token;

  if (!response.ok || result.status !== 200 || !token) {
    return NextResponse.json(
      { ok: false, message: result.message || "Email verification failed" },
      { status: response.ok ? result.status || 400 : response.status },
    );
  }

  const nextResponse = NextResponse.json({
    ok: true,
    message: result.message,
    userId: result.data?.user_id,
    userType: result.data?.type,
    username: result.data?.username,
  });

  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 30 * 60,
  };

  nextResponse.cookies.set(SOCIALGEMS_ACCESS_COOKIE, token, cookieOptions);
  if (result.data?.user_id) nextResponse.cookies.set(SOCIALGEMS_USER_ID_COOKIE, result.data.user_id, cookieOptions);
  if (result.data?.type) nextResponse.cookies.set(SOCIALGEMS_USER_TYPE_COOKIE, result.data.type, cookieOptions);

  return nextResponse;
}
