import { locale as localeParam } from "next/root-params";
import { notFound } from "next/navigation";
import { en } from "@/messages/en";
import { vi, type Messages } from "@/messages/vi";
import { isLocale, type Locale } from "./config";

const dictionaries: Record<Locale, Messages> = { vi, en };

/** Current locale from the [locale] root segment (Server Components only). */
export async function getLocale(): Promise<Locale> {
  const value = await localeParam();
  if (!isLocale(value)) notFound();
  return value;
}

export function getMessagesFor(locale: Locale): Messages {
  return dictionaries[locale];
}

export async function getMessages(): Promise<{ locale: Locale; t: Messages }> {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale] };
}
