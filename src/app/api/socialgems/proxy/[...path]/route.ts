import { NextRequest, NextResponse } from "next/server";
import { getSocialGemsApiBaseUrl, getSocialGemsSession } from "../../../../lib/socialgems-api";

type RouteParams = {
  params: Promise<{ path: string[] }>;
};

async function proxy(request: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  const session = await getSocialGemsSession();
  const search = request.nextUrl.search || "";
  const targetUrl = `${getSocialGemsApiBaseUrl()}/${path.join("/")}${search}`;
  const headers = new Headers(request.headers);

  headers.delete("host");
  if (session?.token) {
    headers.set("Authorization", `Bearer ${session.token}`);
  }

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer(),
    cache: "no-store",
  });

  const body = await response.arrayBuffer();
  return new NextResponse(body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "application/json",
    },
  });
}

export async function GET(request: NextRequest, context: RouteParams) {
  return proxy(request, context);
}

export async function POST(request: NextRequest, context: RouteParams) {
  return proxy(request, context);
}

export async function PATCH(request: NextRequest, context: RouteParams) {
  return proxy(request, context);
}

export async function DELETE(request: NextRequest, context: RouteParams) {
  return proxy(request, context);
}
