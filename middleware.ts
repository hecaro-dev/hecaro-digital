import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LANGS = ["de", "en", "es"];
const DEFAULT_LANG = "de";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLangPrefix = SUPPORTED_LANGS.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  );

  if (hasLangPrefix) return NextResponse.next();

  const acceptLang = request.headers.get("accept-language") ?? "";
  const preferred = acceptLang
    .split(",")
    .map((s) => s.split(";")[0].trim().split("-")[0].toLowerCase())
    .find((l) => SUPPORTED_LANGS.includes(l));

  const lang = preferred ?? DEFAULT_LANG;
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|.*\\..*).*)"],
};
