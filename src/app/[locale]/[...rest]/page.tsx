import { notFound } from "next/navigation";

/** Any unmatched path under a valid locale → the localized not-found page (with header/footer). */
export default function CatchAll() {
  notFound();
}
