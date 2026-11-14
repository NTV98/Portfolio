import type { ProjectInput } from "@/lib/content/schemas";

/**
 * Projects — single source of truth. Validated by Zod at build time.
 * Before adding company work read Docs/CONTENT_GUIDE.md §3 (visibility + confidentiality checklist).
 *
 * @sample Entries marked `@sample` are PREVIEW CONTENT written so the owner can see the layout.
 * Replace them (text, images under /public/assets/images/projects/<slug>/, video) before going public.
 * `npm run check:content` lists every @sample marker; STRICT_CONTENT=true makes the build fail on them.
 */

const sampleVideo = { src: "/assets/videos/intro.webm", type: "video/webm" } as const;

const cover = (slug: string, vi: string, en: string) => ({
  src: `/assets/images/projects/${slug}/cover.webp`,
  alt: { vi, en },
  width: 1600,
  height: 1000,
});

const shot = (slug: string, n: number, vi: string, en: string) => ({
  src: `/assets/images/projects/${slug}/shot-${n}.webp`,
  alt: { vi, en },
  width: 1600,
  height: 1000,
});

export const projects: ProjectInput[] = [
  {
    slug: "portfolio-website",
    visibility: "PUBLIC",
    type: "PERSONAL",
    status: "IN_PROGRESS",
    featured: true,
    order: 1,
    title: { vi: "Website Portfolio cá nhân", en: "Personal Portfolio Website" },
    summary: {
      vi: "Website portfolio song ngữ Việt/Anh, render tĩnh, 12 bảng màu tuỳ chọn và nội dung quản lý tập trung.",
      en: "Bilingual Vietnamese/English portfolio, statically rendered, with 12 color themes and centrally managed content.",
    },
    overview: {
      vi: "Chính website bạn đang xem. Nội dung được quản lý tập trung bằng TypeScript và MDX, kiểm tra bằng Zod lúc build và render sẵn cho từng ngôn ngữ.",
      en: "The website you are looking at. Content is managed centrally in TypeScript and MDX, validated with Zod at build time and pre-rendered per locale.",
    },
    problem: {
      vi: "Cần một nơi trình bày hồ sơ nghề nghiệp dễ cập nhật, nhanh, dễ tiếp cận và không làm lộ thông tin mật của các dự án công ty.",
      en: "A place to present a professional profile that is easy to update, fast, accessible, and never leaks confidential company project details.",
    },
    solution: {
      vi: "Next.js App Router với SSG, design token tập trung, mô hình dự án có kiểm soát mức công khai, triển khai bằng Docker sau Nginx.",
      en: "Next.js App Router with SSG, centralized design tokens, a visibility-aware project model, deployed with Docker behind Nginx.",
    },
    role: { vi: "Thiết kế & phát triển toàn bộ", en: "Design & full development" },
    features: {
      vi: [
        "Song ngữ Việt/Anh với URL theo ngôn ngữ",
        "12 bảng màu, nhớ lựa chọn, không nháy màu khi tải",
        "Lọc dự án và bài viết bằng chip, đồng bộ URL",
        "Blog MDX với highlight code lúc build",
      ],
      en: [
        "Vietnamese/English with localized URLs",
        "12 color themes, remembered, no flash on load",
        "Project and article filters synced to the URL",
        "MDX blog with build-time code highlighting",
      ],
    },
    architecture: {
      vi: "Toàn bộ trang được render sẵn (SSG). Nội dung nằm trong repo, không database. Nginx làm reverse proxy và TLS cho container Next.js standalone.",
      en: "All pages are pre-rendered (SSG). Content lives in the repository, no database. Nginx provides reverse proxy and TLS in front of a standalone Next.js container.",
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MDX", "Docker"],
    tags: ["web", "design-system", "i18n"],
    period: { start: "2026-11" },
    cover: cover("portfolio-website", "Minh hoạ website portfolio (ảnh mẫu)", "Portfolio website illustration (sample)"),
    screenshots: [
      shot("portfolio-website", 1, "Bảng điều khiển nội dung (ảnh mẫu)", "Content dashboard (sample)"),
      shot("portfolio-website", 2, "Quy trình build và triển khai (ảnh mẫu)", "Build and deploy pipeline (sample)"),
    ],
    video: { ...sampleVideo, poster: "/assets/images/projects/portfolio-website/cover.webp", title: { vi: "Video giới thiệu website (mẫu)", en: "Website walkthrough (sample)" } }, // @sample video
    repoUrl: "https://github.com/NTV98/Portfolio",
  },
  // @sample — whole entry
  {
    slug: "taskflow",
    visibility: "PUBLIC",
    type: "PERSONAL",
    status: "COMPLETED",
    featured: true,
    order: 2,
    title: { vi: "TaskFlow — Quản lý công việc nhóm", en: "TaskFlow — Team task manager" },
    summary: {
      vi: "Ứng dụng quản lý công việc dạng Kanban cho nhóm nhỏ, cập nhật theo thời gian thực và nhắc hạn tự động.",
      en: "A Kanban task manager for small teams with real-time updates and automatic deadline reminders.",
    },
    problem: {
      vi: "Nhóm nhỏ thường quản lý việc bằng chat và bảng tính, dễ sót hạn và khó biết ai đang làm gì.",
      en: "Small teams often track work in chat and spreadsheets, missing deadlines and losing sight of who does what.",
    },
    solution: {
      vi: "Bảng Kanban kéo-thả, đồng bộ qua WebSocket, phân quyền theo dự án và email nhắc hạn chạy theo lịch.",
      en: "Drag-and-drop Kanban boards synced over WebSocket, per-project permissions and scheduled reminder emails.",
    },
    outcome: {
      vi: "Nhóm 8 người dùng thử trong 3 tháng, thời gian họp tiến độ hằng tuần giảm khoảng một nửa.",
      en: "Piloted by an 8-person team for 3 months; weekly status meetings were cut roughly in half.",
    },
    role: { vi: "Phát triển full-stack", en: "Full-stack development" },
    features: {
      vi: ["Bảng Kanban kéo-thả", "Cập nhật thời gian thực", "Nhắc hạn qua email", "Báo cáo tiến độ theo tuần"],
      en: ["Drag-and-drop boards", "Real-time updates", "Email deadline reminders", "Weekly progress reports"],
    },
    stack: ["Next.js", "Node.js", "PostgreSQL", "WebSocket", "TypeScript"],
    tags: ["web", "realtime"],
    period: { start: "2025-03", end: "2025-09" },
    cover: cover("taskflow", "Bảng Kanban của TaskFlow (ảnh mẫu)", "TaskFlow Kanban board (sample)"),
    screenshots: [
      shot("taskflow", 1, "Bảng tổng quan tiến độ (ảnh mẫu)", "Progress overview (sample)"),
      shot("taskflow", 2, "Lịch hạn công việc (ảnh mẫu)", "Deadline calendar (sample)"),
    ],
    video: { ...sampleVideo, poster: "/assets/images/projects/taskflow/cover.webp", title: { vi: "Demo TaskFlow (mẫu)", en: "TaskFlow demo (sample)" } },
  },
  // @sample — whole entry (company work: illustration only, no links/screenshots/video)
  {
    slug: "b2b-order-portal",
    visibility: "PRIVATE",
    type: "COMPANY",
    status: "COMPLETED",
    featured: true,
    order: 3,
    title: { vi: "Cổng quản lý đơn hàng B2B", en: "B2B order management portal" },
    summary: {
      vi: "Hệ thống cho đại lý đặt hàng, theo dõi công nợ và trạng thái giao hàng, thay cho quy trình đặt hàng qua email.",
      en: "A portal where dealers place orders and track balances and deliveries, replacing an email-based ordering process.",
    },
    problem: {
      vi: "Đơn hàng từ đại lý đến qua email và điện thoại, nhập tay nhiều lần nên dễ sai và chậm xác nhận.",
      en: "Dealer orders arrived by email and phone and were re-typed several times, causing errors and slow confirmations.",
    },
    solution: {
      vi: "Cổng web cho đại lý, API đồng bộ với hệ thống kho, quy trình duyệt đơn nhiều cấp và thông báo trạng thái tự động.",
      en: "A dealer web portal, an API synced with the warehouse system, multi-level approval and automatic status notifications.",
    },
    role: { vi: "Full-stack Developer", en: "Full-stack Developer" },
    responsibilities: {
      vi: ["Xây dựng API đơn hàng và công nợ bằng ASP.NET Core", "Phát triển giao diện đặt hàng bằng Angular", "Tối ưu truy vấn báo cáo trên SQL Server"],
      en: ["Built the order and balance APIs in ASP.NET Core", "Developed the ordering UI in Angular", "Optimized reporting queries on SQL Server"],
    },
    stack: ["Angular", "ASP.NET Core", "C#", "SQL Server"],
    tags: ["enterprise"],
    period: { start: "2023-05", end: "2024-08" },
    cover: cover("b2b-order-portal", "Minh hoạ chung, không phải ảnh chụp hệ thống (mẫu)", "Generic illustration, not a system screenshot (sample)"),
  },
  // @sample — whole entry
  {
    slug: "booking-system",
    visibility: "PRIVATE",
    type: "COMPANY",
    status: "MAINTAINED",
    featured: false,
    order: 4,
    title: { vi: "Hệ thống đặt lịch dịch vụ", en: "Service booking system" },
    summary: {
      vi: "Ứng dụng đặt lịch hẹn cho chuỗi cửa hàng dịch vụ: khách tự chọn giờ, nhân viên quản lý lịch theo chi nhánh.",
      en: "Appointment booking for a chain of service stores: customers pick a slot, staff manage schedules per branch.",
    },
    problem: {
      vi: "Lịch hẹn ghi trên sổ và nhóm chat, thường trùng giờ và khó thống kê theo chi nhánh.",
      en: "Appointments lived in notebooks and chat groups, often double-booked and hard to report per branch.",
    },
    solution: {
      vi: "Trang đặt lịch cho khách, bảng điều phối cho nhân viên, kiểm tra trùng lịch phía server và nhắc lịch qua SMS.",
      en: "A customer booking page, a staff scheduling board, server-side conflict checks and SMS reminders.",
    },
    role: { vi: "Frontend lead", en: "Frontend lead" },
    responsibilities: {
      vi: ["Dựng giao diện đặt lịch bằng ReactJS", "Thiết kế component dùng chung cho các màn quản trị", "Phối hợp backend C# định nghĩa API"],
      en: ["Built the booking UI in ReactJS", "Designed shared components for admin screens", "Defined APIs together with the C# backend team"],
    },
    stack: ["ReactJS", "C#", "ASP.NET Core", "SQL Server"],
    tags: ["web"],
    period: { start: "2021-08", end: "2023-02" },
    cover: cover("booking-system", "Minh hoạ chung, không phải ảnh chụp hệ thống (mẫu)", "Generic illustration, not a system screenshot (sample)"),
  },
  // @sample — whole entry
  {
    slug: "dotnet-result-kit",
    visibility: "PUBLIC",
    type: "OPEN_SOURCE",
    status: "MAINTAINED",
    featured: false,
    order: 5,
    title: { vi: "ResultKit cho .NET", en: "ResultKit for .NET" },
    summary: {
      vi: "Thư viện C# nhỏ gọn áp dụng Result pattern: xử lý lỗi nghiệp vụ rõ ràng thay cho việc ném exception.",
      en: "A small C# library for the Result pattern: explicit business errors instead of throwing exceptions.",
    },
    problem: {
      vi: "Dùng exception cho lỗi nghiệp vụ khiến code khó đọc, khó kiểm thử và tốn hiệu năng.",
      en: "Using exceptions for business errors makes code hard to read, hard to test and slower.",
    },
    solution: {
      vi: "Kiểu Result<T> bất biến, các hàm Map/Bind/Match, và bộ chuyển đổi sang ProblemDetails cho ASP.NET Core.",
      en: "An immutable Result<T> type, Map/Bind/Match helpers and a ProblemDetails adapter for ASP.NET Core.",
    },
    role: { vi: "Tác giả & người duy trì", en: "Author & maintainer" },
    stack: ["C#", ".NET", "ASP.NET Core"],
    tags: ["library", "dotnet"],
    period: { start: "2024-02" },
    cover: cover("dotnet-result-kit", "Mã nguồn ResultKit (ảnh mẫu)", "ResultKit source code (sample)"),
    screenshots: [shot("dotnet-result-kit", 1, "Chạy test trên terminal (ảnh mẫu)", "Running tests in the terminal (sample)")],
  },
  // @sample — whole entry
  {
    slug: "vn-text-utils",
    visibility: "PUBLIC",
    type: "OPEN_SOURCE",
    status: "MAINTAINED",
    featured: false,
    order: 6,
    title: { vi: "vn-text-utils", en: "vn-text-utils" },
    summary: {
      vi: "Bộ tiện ích TypeScript cho tiếng Việt: bỏ dấu, tạo slug, chuẩn hoá Unicode và so sánh chuỗi không phân biệt dấu.",
      en: "TypeScript helpers for Vietnamese text: strip diacritics, slugify, normalize Unicode and accent-insensitive compare.",
    },
    problem: {
      vi: "Tìm kiếm và tạo URL cho nội dung tiếng Việt thường lỗi vì dấu và các dạng Unicode khác nhau.",
      en: "Search and URLs for Vietnamese content often break because of diacritics and mixed Unicode forms.",
    },
    solution: {
      vi: "Các hàm thuần, không phụ thuộc, có kiểu đầy đủ, chạy được cả trên Node.js và trình duyệt.",
      en: "Pure, dependency-free, fully typed functions that run in both Node.js and the browser.",
    },
    role: { vi: "Tác giả", en: "Author" },
    stack: ["TypeScript", "Node.js"],
    tags: ["library", "i18n"],
    period: { start: "2023-10" },
    cover: cover("vn-text-utils", "Mã nguồn vn-text-utils (ảnh mẫu)", "vn-text-utils source code (sample)"),
    screenshots: [shot("vn-text-utils", 1, "Ví dụ sử dụng trên terminal (ảnh mẫu)", "Usage example in the terminal (sample)")],
  },
];
