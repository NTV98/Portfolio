import type { Experience } from "@/lib/content/schemas";

/**
 * Career timeline, newest first. Organization names only when disclosure is acceptable —
 * otherwise use a generic descriptor (Docs/CONTENT_GUIDE.md §6).
 *
 * @sample All entries below are PREVIEW CONTENT — replace with your real roles, dates and companies.
 */
export const experience: Experience[] = [
  {
    id: "enterprise-software",
    organization: { vi: "Công ty phần mềm doanh nghiệp", en: "Enterprise software company" },
    title: { vi: "Senior Full-stack Developer", en: "Senior Full-stack Developer" },
    period: { start: "2023-03" },
    summary: {
      vi: "Phụ trách các cổng thông tin B2B cho khách hàng doanh nghiệp, từ API đến giao diện.",
      en: "Owning B2B portals for enterprise clients, from the APIs to the user interface.",
    },
    responsibilities: {
      vi: [
        "Thiết kế và xây dựng API bằng ASP.NET Core",
        "Phát triển giao diện quản trị bằng Angular",
        "Review code và hướng dẫn thành viên mới",
      ],
      en: [
        "Designing and building APIs with ASP.NET Core",
        "Developing admin interfaces with Angular",
        "Reviewing code and onboarding new teammates",
      ],
    },
    technologies: ["C#", "ASP.NET Core", "Angular", "SQL Server"],
    projectSlugs: ["b2b-order-portal"],
  },
  {
    id: "digital-services",
    organization: { vi: "Công ty dịch vụ số", en: "Digital services company" },
    title: { vi: "Full-stack Developer", en: "Full-stack Developer" },
    period: { start: "2021-06", end: "2023-02" },
    summary: {
      vi: "Xây dựng ứng dụng đặt lịch và các trang web cho chuỗi cửa hàng dịch vụ.",
      en: "Built booking apps and websites for a chain of service stores.",
    },
    responsibilities: {
      vi: ["Dựng giao diện ReactJS và thư viện component dùng chung", "Viết API Node.js và C# cho các màn quản trị"],
      en: ["Built ReactJS interfaces and a shared component library", "Wrote Node.js and C# APIs for admin screens"],
    },
    technologies: ["ReactJS", "Node.js", "C#"],
    projectSlugs: ["booking-system"],
  },
  {
    id: "freelance",
    organization: { vi: "Làm việc tự do", en: "Freelance" },
    title: { vi: "Web Developer", en: "Web Developer" },
    period: { start: "2020-01", end: "2021-05" },
    summary: {
      vi: "Làm website và ứng dụng web nhỏ cho cửa hàng, cá nhân và startup.",
      en: "Built websites and small web apps for shops, individuals and startups.",
    },
    responsibilities: {
      vi: ["Trao đổi yêu cầu trực tiếp với khách hàng", "Phát triển, triển khai và bảo trì website"],
      en: ["Gathered requirements directly with clients", "Developed, deployed and maintained websites"],
    },
    technologies: ["Next.js", "Node.js"],
    projectSlugs: [],
  },
];
