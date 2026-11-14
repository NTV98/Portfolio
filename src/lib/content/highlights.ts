import { z } from "zod";
import * as raw from "@/data/highlights";
import { skillGroups as rawSkillGroups } from "@/data/skills";
import { codeCardSchema, numberedItemSchema, skillGroupSchema, stackCardSchema } from "./schemas";

/** Parsed at import → invalid content fails the build. */
export const codeCard = codeCardSchema.parse(raw.codeCard);
export const stackCards = z.array(stackCardSchema).parse(raw.stackCards);
export const services = z.array(numberedItemSchema).parse(raw.services);
export const workSteps = z.array(numberedItemSchema).parse(raw.workSteps);
export const skillGroups = z.array(skillGroupSchema).parse(rawSkillGroups);

/** "01", "02" … for numbered lists. */
export function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}
