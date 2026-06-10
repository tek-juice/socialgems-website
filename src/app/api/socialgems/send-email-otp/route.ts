import { NextRequest, NextResponse } from "next/server";
import { getSocialGemsApiBaseUrl } from "../../../lib/socialgems-api";
import { readBackendResponse } from "../backend-response";

type BackendResponse = {
  status?: number;
  message?: string;
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch(`${getSocialGemsApiBaseUrl()}/users/sendEmailOTP`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const result = await readBackendResponse<BackendResponse>(response);

  if (!response.ok || result.status !== 200) {
    return NextResponse.json(
      { ok: false, message: result.message || "Unable to send OTP" },
      { status: response.ok ? result.status || 400 : response.status },
    );
  }

  return NextResponse.json({ ok: true, message: result.message });
}
