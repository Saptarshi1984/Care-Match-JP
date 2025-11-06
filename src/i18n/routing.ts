import {defineRouting} from 'next-intl/routing';
import {createNavigation} from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['ja', 'en'] as const,
 
  // Used when no locale matches
  defaultLocale: 'ja'
});

export type Locale = (typeof routing.locales)[number];

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);