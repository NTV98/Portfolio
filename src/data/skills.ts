import type { SkillGroup } from "@/lib/content/schemas";

/**
 * Skills by group (from the owner's design, Docs/DesignUI). NO proficiency levels,
 * percentages or years (PRD §4). `tone` 1–6 picks the group's accent dot color.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    tone: 1,
    items: ["C#", ".NET", "ASP.NET Core", "Node.js", "REST API", "SQL"],
  },
  {
    id: "frontend",
    tone: 3,
    items: [
      "Angular",
      "ReactJS",
      "Next.js",
      "TypeScript",
      "HTML / CSS",
      { vi: "Giao diện responsive", en: "Responsive UI" },
    ],
  },
  {
    id: "tools",
    tone: 4,
    items: ["Git", "Postman", "VS Code", "Visual Studio"],
  },
  {
    id: "practices",
    tone: 5,
    items: [
      "Clean code",
      "Code review",
      { vi: "Làm việc nhóm", en: "Teamwork" },
      { vi: "Tối ưu hiệu năng", en: "Performance tuning" },
    ],
  },
];
