import type { Localized } from "@/i18n/config";

/**
 * Personal information — the ONLY place to edit it.
 * Anything containing [PLACEHOLDER] is unknown and must be replaced by the owner.
 * Never replace a placeholder with an invented fact.
 */
export type Profile = {
  name: string;
  /** Single letter shown in the round header logo. */
  monogram: string;
  /** Short job title (metadata, resume). */
  title: Localized;
  /** Hero subtitle under the name. */
  headline: Localized;
  /** Hero paragraph / meta description. */
  intro: Localized;
  /** Pill above the hero title. Omit to hide. */
  availability?: Localized;
  location?: Localized;
  /** Portrait under /public/assets/images/profile (4:5). Omit → placeholder panel. */
  avatar?: { src: string; width: number; height: number };
  /** One or two sentences next to the experience summary on Home. */
  experienceSummary: Localized;
  /** Short line in the open-source banner on Home. */
  openSourceBlurb: Localized;
  /** About page paragraphs: first is the large intro, the rest are muted. */
  about: Localized<string[]>;
};

export const profile: Profile = {
  name: "Nguyễn Tuấn Vũ",
  monogram: "V",
  title: { vi: "Lập trình viên Full-stack", en: "Full-stack Developer" },
  headline: {
    vi: "Lập trình viên Full-stack: C#, Node.js, Angular, ReactJS, Next.js.",
    en: "Full-stack developer: C#, Node.js, Angular, ReactJS, Next.js.",
  },
  intro: {
    vi: "Mình làm API ổn định và web nhanh, dễ bảo trì, từ dự án cá nhân đến sản phẩm công ty.",
    en: "I build reliable APIs and fast, maintainable web apps — from personal projects to company products.",
  },
  availability: { vi: "Sẵn sàng cho cơ hội mới", en: "Open to new opportunities" },
  // @sample — confirm the real city.
  location: {
    vi: "Hà Nội, Việt Nam",
    en: "Hanoi, Vietnam",
  },
  // @sample asset (illustrated avatar) — replace the file with your photo, keep the path (Docs/CONTENT_GUIDE.md §1).
  avatar: { src: "/assets/images/profile/avatar.webp", width: 800, height: 1000 },
  // @sample — rewrite with your real years / domains.
  experienceSummary: {
    vi: "Hơn 5 năm xây dựng phần mềm cho doanh nghiệp: cổng B2B, hệ thống đặt lịch và các ứng dụng web công khai. Điều mình tự hào nhất là những sản phẩm vẫn chạy ổn định nhiều năm sau khi bàn giao.",
    en: "5+ years building software for businesses: B2B portals, booking systems and public web apps. What I'm proudest of is software that keeps running reliably years after hand-over.",
  },
  openSourceBlurb: {
    vi: "Các thư viện, công cụ và bản vá mình chia sẻ công khai trên GitHub.",
    en: "Libraries, tools and patches I share publicly on GitHub.",
  },
  about: {
    vi: [
      "Mình là Nguyễn Tuấn Vũ, lập trình viên Full-stack. Mình làm backend với C# và Node.js, làm frontend với Angular, ReactJS và Next.js.",
      // @sample — paragraphs 2–3
      "Mình bắt đầu bằng những website nhỏ khi còn là sinh viên, rồi đi làm tại các công ty phần mềm, xây dựng hệ thống quản trị và cổng thông tin cho doanh nghiệp. Mình thích nhất những sản phẩm giải quyết việc thật cho người dùng mỗi ngày.",
      "Trong nhóm, mình thích trao đổi sớm, viết tài liệu rõ ràng và review code kỹ. Hiện mình đang tìm hiểu sâu hơn về kiến trúc hệ thống và hiệu năng web. Ngoài giờ làm, mình chạy bộ, đọc sách và thỉnh thoảng viết blog kỹ thuật.",
    ],
    en: [
      "I'm Nguyễn Tuấn Vũ, a full-stack developer. I build backends with C# and Node.js, and frontends with Angular, ReactJS and Next.js.",
      // @sample — paragraphs 2–3
      "I started with small websites as a student, then joined software companies building admin systems and portals for businesses. I enjoy most the products that solve real, everyday problems for their users.",
      "In a team I like talking early, writing clear docs and reviewing code carefully. I'm currently going deeper into system architecture and web performance. Outside work I run, read and occasionally write technical posts.",
    ],
  },
};
