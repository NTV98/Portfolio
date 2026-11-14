import type { CodeCard, NumberedItem, StackCard } from "@/lib/content/schemas";

/**
 * Home & About highlight content (copy from the owner's design, Docs/DesignUI).
 * Validated in src/lib/content/highlights.ts.
 */

/** Hero code card (`developer.ts`). */
export const codeCard: CodeCard = {
  filename: "developer.ts",
  backend: ["C#", "Node.js"],
  frontend: ["Angular", "ReactJS", "Next.js"],
  openToWork: true,
};

/** Home → "Bộ công cụ mình dùng hằng ngày". */
export const stackCards: StackCard[] = [
  {
    id: "backend",
    tone: 1,
    title: { vi: "Backend", en: "Backend" },
    text: {
      vi: "Xây dựng API, xử lý nghiệp vụ và dữ liệu cho hệ thống web.",
      en: "Building APIs, business logic and data handling for web systems.",
    },
    items: ["C#", ".NET", "ASP.NET Core", "Node.js", "REST API"],
  },
  {
    id: "frontend",
    tone: 3,
    title: { vi: "Frontend", en: "Frontend" },
    text: {
      vi: "Dựng giao diện web nhanh, rõ ràng và dễ mở rộng.",
      en: "Fast, clear web interfaces that are easy to extend.",
    },
    items: ["Angular", "ReactJS", "Next.js", "TypeScript", "HTML / CSS"],
  },
];

/** Home → "Mình có thể giúp bạn". */
export const services: NumberedItem[] = [
  {
    title: { vi: "API và hệ thống backend", en: "APIs and backend systems" },
    text: {
      vi: "Thiết kế và xây dựng API bằng C# hoặc Node.js, rõ ràng, dễ kiểm thử.",
      en: "Designing and building APIs in C# or Node.js — clear and easy to test.",
    },
  },
  {
    title: { vi: "Ứng dụng web frontend", en: "Frontend web apps" },
    text: {
      vi: "Giao diện bằng Angular, ReactJS hoặc Next.js, từ trang quản trị đến trang công khai.",
      en: "Interfaces in Angular, ReactJS or Next.js, from admin dashboards to public sites.",
    },
  },
  {
    title: { vi: "Tối ưu hiệu năng", en: "Performance tuning" },
    text: {
      vi: "Rút ngắn thời gian tải, giảm truy vấn thừa, giữ trải nghiệm mượt trên mọi thiết bị.",
      en: "Shorter load times, fewer wasted queries, a smooth experience on every device.",
    },
  },
  {
    title: { vi: "Mã nguồn sạch, dễ bảo trì", en: "Clean, maintainable code" },
    text: {
      vi: "Cấu trúc rõ ràng, đặt tên nhất quán, có tài liệu để đội ngũ tiếp tục dễ dàng.",
      en: "Clear structure, consistent naming and documentation so the team can carry on easily.",
    },
  },
];

/** About → "Cách mình làm việc". */
export const workSteps: NumberedItem[] = [
  {
    title: { vi: "Hiểu bài toán", en: "Understand the problem" },
    text: {
      vi: "Làm rõ mục tiêu, người dùng và ràng buộc trước khi viết dòng code đầu tiên.",
      en: "Clarify goals, users and constraints before writing the first line of code.",
    },
  },
  {
    title: { vi: "Thiết kế gọn", en: "Keep the design lean" },
    text: {
      vi: "Chọn kiến trúc đủ dùng, tránh phức tạp không cần thiết, chia nhỏ để giao sớm.",
      en: "Pick an architecture that is just enough, avoid needless complexity, ship in small steps.",
    },
  },
  {
    title: { vi: "Viết và kiểm thử", en: "Write and test" },
    text: {
      vi: "Code dễ đọc, có kiểm thử cho phần quan trọng, review kỹ trước khi hợp nhất.",
      en: "Readable code, tests for what matters, careful review before merging.",
    },
  },
  {
    title: { vi: "Triển khai và cải tiến", en: "Ship and improve" },
    text: {
      vi: "Theo dõi hiệu năng và lỗi sau khi chạy thật, rồi cải thiện liên tục.",
      en: "Watch performance and errors in production, then keep improving.",
    },
  },
];
