import type { Certification, Education } from "@/lib/content/schemas";

/** @sample PREVIEW CONTENT — replace with your real degree and courses. */
export const education: Education[] = [
  {
    id: "it-degree",
    institution: { vi: "Trường Đại học Kỹ thuật (tên mẫu)", en: "University of Engineering (sample name)" },
    degree: { vi: "Kỹ sư Công nghệ Thông tin", en: "B.Eng. in Information Technology" },
    period: { start: "2015-09", end: "2020-06" },
  },
];

/** @sample PREVIEW CONTENT. Empty → certificates are hidden. */
export const certifications: Certification[] = [
  { id: "angular-advanced", name: "Angular nâng cao (khoá học mẫu)", issuer: "Nền tảng học trực tuyến", date: "2022-08" },
  { id: "aspnet-core-api", name: "ASP.NET Core Web API (khoá học mẫu)", issuer: "Nền tảng học trực tuyến", date: "2023-04" },
];
