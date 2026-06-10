import { NextRequest, NextResponse } from "next/server";
import { getSocialGemsApiBaseUrl } from "../../../lib/socialgems-api";
import { readBackendResponse } from "../backend-response";

type SignupResponse = {
  status?: number;
  message?: string;
  data?: {
    user_id?: string;
    username?: string;
    referral_code?: string;
  };
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch(`${getSocialGemsApiBaseUrl()}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const result = await readBackendResponse<SignupResponse>(response);

  if (!response.ok || result.status !== 200) {
    return NextResponse.json(
      { ok: false, message: result.message || "Signup failed" },
      { status: response.ok ? result.status || 400 : response.status },
    );
  }

  return NextResponse.json({
    ok: true,
    message: result.message,
    userId: result.data?.user_id,
    username: result.data?.username,
    referralCode: result.data?.referral_code,
  });
}
