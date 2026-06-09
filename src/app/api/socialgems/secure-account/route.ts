import { NextRequest, NextResponse } from "next/server";
import {
  SOCIALGEMS_ACCESS_COOKIE,
  getSocialGemsApiBaseUrl,
} from "../../../lib/socialgems-api";

type BackendResponse = {
  status?: number;
  message?: string;
};

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SOCIALGEMS_ACCESS_COOKIE)?.value;
  const body = await request.json();

  if (!token) {
    return NextResponse.json({ ok: false, message: "Verify your email before securing the account." }, { status: 401 });
  }

  const response = await fetch(`${getSocialGemsApiBaseUrl()}/users/secureAccount`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const result = (await response.json()) as BackendResponse;

  if (!response.ok || result.status !== 200) {
    return NextResponse.json(
      { ok: false, message: result.message || "Unable to secure account" },
      { status: response.ok ? result.status || 400 : response.status },
    );
  }

  return NextResponse.json({ ok: true, message: result.message });
}
