import { defaultLocale, localePrefix, locales } from '@/navigation';
import createMiddleware from "next-intl/middleware";
export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale,
  localeDetection: false,

});

export const config = {
  // Skip all paths that should not be internationalized.
  // This skips the folders "api", "_next" and all files
  // with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};