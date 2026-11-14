import { pickText, type Locale } from "@/i18n/config";
import type { SkillGroup } from "@/lib/content/schemas";
import type { Messages } from "@/messages/vi";
import { ChipList } from "@/components/ui/Chip";
import { keyBg, type Tone } from "@/components/projects/ProjectThumb";

/** Skills page: one panel per group — color dot, group name, chips. Empty groups are hidden. */
export function SkillGroups({ groups, locale, t }: { groups: SkillGroup[]; locale: Locale; t: Messages }) {
  return (
    <ul className="grid-fit-md gap-6">
      {groups
        .filter((g) => g.items.length > 0)
        .map((group) => (
          <li key={group.id} className="panel flex flex-col gap-5 p-8">
            <div className="flex items-center gap-3">
              <span aria-hidden className={`size-3 rounded-full ${keyBg[group.tone as Tone]}`} />
              <h2 className="text-h3">{t.skills.groups[group.id]}</h2>
            </div>
            <ChipList items={group.items.map((item) => pickText(item, locale))} />
          </li>
        ))}
    </ul>
  );
}
