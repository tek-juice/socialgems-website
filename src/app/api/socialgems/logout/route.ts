import { NextResponse } from "next/server";
import {
  SOCIALGEMS_ACCESS_COOKIE,
  SOCIALGEMS_DISPLAY_COOKIE,
  SOCIALGEMS_REFRESH_COOKIE,
  SOCIALGEMS_USER_ID_COOKIE,
  SOCIALGEMS_USER_TYPE_COOKIE,
} from "../../../lib/socialgems-api";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  [SOCIALGEMS_ACCESS_COOKIE, SOCIALGEMS_REFRESH_COOKIE, SOCIALGEMS_USER_TYPE_COOKIE, SOCIALGEMS_USER_ID_COOKIE, SOCIALGEMS_DISPLAY_COOKIE].forEach((name) => {
    response.cookies.set(name, "", { path: "/", maxAge: 0 });
  });
  return response;
}
