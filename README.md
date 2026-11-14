# Portfolio cá nhân cho Developer

> **Trạng thái:** Đang lập kế hoạch — đã có bản nháp kiến trúc, design system và CSS tổng; **đang chờ chủ dự án phê duyệt**. Chưa có mã nguồn ứng dụng.

Portfolio cá nhân song ngữ (Tiếng Việt / English) cho Software Developer: hồ sơ, kỹ năng, kinh nghiệm, dự án, resume online + CV, blog kỹ thuật và liên hệ. Next.js ưu tiên static, tự host trên Linux VPS với Docker, Nginx và Let's Encrypt.

## Tính năng (dự kiến)

- Home dạng bento, About, Skills, Timeline kinh nghiệm, Projects (tìm kiếm, lọc, trang chi tiết, dự án liên quan), Resume + CV PDF, Blog (MDX, tag, tìm kiếm, highlight code, thời gian đọc), Contact (gửi mail phía server hoặc mailto dự phòng), Privacy, 404.
- VI/EN với URL theo ngôn ngữ (`/vi`, `/en`) và metadata riêng.
- Theme Sáng / Tối / Theo hệ thống; responsive điện thoại, tablet, desktop.
- SEO: metadata, canonical, hreflang, Open Graph, sitemap, robots, JSON-LD.
- Mô hình dự án có kiểm soát bảo mật (`PUBLIC` / `PRIVATE` / `CONFIDENTIAL`).

## Công nghệ (đề xuất)

Next.js (App Router, bản stable mới nhất) · React · TypeScript (strict) · Tailwind CSS v4 · next-intl · next-themes · Zod · MDX + Shiki · Lucide + Simple Icons · Vitest · Playwright + axe · Docker · Nginx · Let's Encrypt. Lý do lựa chọn: [Docs/ARCHITECTURE.md](Docs/ARCHITECTURE.md).

## Phát triển

_Lệnh sẽ được bổ sung ở Giai đoạn 1._ Dự kiến: `npm install`, `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`.

Yêu cầu: Node.js 24 LTS, npm, Docker (cho image production).

## Quản lý nội dung

Toàn bộ nội dung nằm trong repo — xem [Docs/CONTENT_GUIDE.md](Docs/CONTENT_GUIDE.md).

| Việc cần làm | Ở đâu |
|---|---|
| Cập nhật thông tin cá nhân | `src/config/profile.ts`, `src/config/social.ts` |
| Thêm dự án | `src/data/projects.ts` + `public/images/projects/<slug>/` |
| Thêm bài viết | `src/content/blog/<slug>/{vi,en}.mdx` |
| Cập nhật CV | `public/files/cv-vi.pdf`, `cv-en.pdf` |
| Chữ giao diện | `src/messages/{vi,en}.json` |

Thông tin chưa biết được đánh dấu `[PLACEHOLDER]` và tuyệt đối không được thay bằng nội dung bịa.

## Biến môi trường

Khai báo trong `.env.example` (Giai đoạn 5/7). Secret chỉ ở phía server, không dùng `NEXT_PUBLIC_*`, không commit.

## Tổng quan triển khai

Docker image multi-stage (Next standalone, user không phải root) → Docker Compose (`app` chỉ nội bộ + `nginx` cổng 80/443 + `certbot`) trên Linux VPS. Deploy bằng script, image gắn tag theo git SHA, rollback một lệnh. Chi tiết: [Docs/DEPLOYMENT.md](Docs/DEPLOYMENT.md).

---

## Design System & UI/UX Standards

Design system là **nguồn chân lý duy nhất** cho mọi thay đổi giao diện. Đây là bắt buộc, không phải gợi ý.

### Triết lý thiết kế
**Minimalist + Bento Grid.** Ưu tiên nội dung và typography, khoảng trắng rộng rãi, viền hairline 1px thay cho shadow, một màu accent dùng tiết kiệm, chuyển động tiết chế có mục đích. Dấu ấn riêng: nhãn eyebrow và metadata bằng font mono, lưới chính xác và đồng nhất, icon công nghệ đơn sắc. Không gradient, glow, glassmorphism, thanh % kỹ năng hay trang trí rườm rà.

### Quy ước Bento Grid
- Bento là công cụ layout cho nội dung đa dạng (hero Home, điểm nổi bật About, tóm tắt dự án) — không dùng cho danh sách, bài viết, form hay timeline.
- 1 cột (điện thoại) → 2 cột (tablet ≥ 768px) → 4 cột (desktop ≥ 1024px), utility `bento`. Chỉ các kích thước `bento-1x1`, `2x1`, `1x2`, `2x2`, `4x1`.
- Một ô chính `2x2`, ≤ 8 ô, mỗi ô một ý và ≤ 1 CTA, hàng luôn khép kín, thứ tự DOM = thứ tự đọc trên mobile.
- Chỉ dùng layout đã duyệt trong DESIGN_SYSTEM §7.3; layout mới cần phê duyệt.

### Design token & cấu hình theme
- Token định nghĩa một lần trong [`src/styles/tokens.css`](src/styles/tokens.css) (khối `@theme` của Tailwind v4 + token layout trong `:root`); base styles và utilities trong [`src/app/globals.css`](src/app/globals.css).
- **Sáng/tối:** màu khai báo bằng `light-dark()` — tự theo hệ điều hành trước khi JS tải, `next-themes` gắn class `light`/`dark` để ép theme. Component gần như không cần `dark:`.
- **Palette mặc định của Tailwind đã bị reset** → class như `bg-zinc-500`, `text-2xl` không tồn tại. Chỉ dùng class ngữ nghĩa (`bg-surface`, `text-fg-muted`, `border-border`, `bg-accent`, `text-h1` …). Không hex thô, không giá trị tuỳ ý.
- Mọi màu chữ đã kiểm chứng tương phản ≥ 4.5:1 ở cả hai theme.

### Yêu cầu tái sử dụng component
- Tái sử dụng hoặc mở rộng (variant) component trong `src/components/{ui,bento,layout}` trước khi tạo mới. Không tạo bản gần trùng.
- Mặc định Server Component; chỉ dùng client component cho tương tác, đặt ở component lá.
- Không hard-code nội dung trong component — dùng `config/`, `data/`, MDX, `messages/`.

### Chuẩn responsive
- Breakpoint mặc định của Tailwind (`sm 640`, `md 768` tablet, `lg 1024` desktop, `xl 1280`).
- Khoảng cách (gutter, gap, padding card, nhịp section) là **token tự co giãn** theo điện thoại → tablet → desktop; component không phải tự viết breakpoint cho khoảng cách.
- Base CSS đã xử lý sẵn: `100dvh`, safe-area (tai thỏ), chống iOS zoom khi focus input, hover chỉ trên thiết bị có chuột, chống cuộn ngang do URL/code dài.
- Kiểm tra ở 360, 390, 768, 1024, 1280, 1440px. Không cuộn ngang, không cắt dấu tiếng Việt, vùng chạm ≥ 44px, layout chịu được chữ VI dài hơn EN ~30%.

### Thêm trang & component một cách nhất quán
1. Đọc các tài liệu thiết kế bên dưới.
2. Ghép từ `Container` / `PageHeader` / `Section` và component có sẵn.
3. Thêm chữ vào cả `messages/vi.json` và `messages/en.json`.
4. Làm đủ trạng thái empty / error / chưa cấu hình.
5. Kiểm tra cả 2 theme, 2 ngôn ngữ, mọi breakpoint.
6. Chạy audit nhất quán (UI_UX_GUIDELINES §12).
7. Cập nhật tài liệu trong cùng thay đổi nếu quy ước thay đổi.

### Tài liệu chi tiết
- [Docs/DESIGN_SYSTEM.md](Docs/DESIGN_SYSTEM.md) — token, màu, typography, khoảng cách, layout, bento, chuyển động, trạng thái
- [Docs/UI_UX_GUIDELINES.md](Docs/UI_UX_GUIDELINES.md) — điều hướng, khung trang, trạng thái, form, UX đa ngôn ngữ, accessibility, QA
- [Docs/COMPONENT_GUIDELINES.md](Docs/COMPONENT_GUIDELINES.md) — catalog component, quy tắc, cấu trúc thư mục

### Kiểm soát thay đổi
Thay đổi token, thêm màu/font/radius/shadow/layout pattern hoặc thay đổi phong cách thiết kế bắt buộc có lý do được ghi lại **và chủ dự án phê duyệt** trước khi triển khai.

---

## Instructions for AI Coding Agents

Trước khi thay đổi bất cứ thứ gì — đặc biệt là giao diện — **bắt buộc** đọc:
1. `README.md` (file này)
2. [`CLAUDE.md`](CLAUDE.md)
3. [`Docs/DESIGN_SYSTEM.md`](Docs/DESIGN_SYSTEM.md), [`Docs/UI_UX_GUIDELINES.md`](Docs/UI_UX_GUIDELINES.md), [`Docs/COMPONENT_GUIDELINES.md`](Docs/COMPONENT_GUIDELINES.md)
4. Các tài liệu khác liên quan đến nhiệm vụ (ARCHITECTURE, CONTENT_GUIDE, DEPLOYMENT, TESTING).

Sau đó: khảo sát component dùng chung hiện có, tái sử dụng token và component, không thêm style chưa được ghi nhận hay phong cách mới khi chưa được chủ dự án duyệt, giữ đủ 2 theme và 2 ngôn ngữ, không bịa thông tin cá nhân, không lộ thông tin mật của công ty cũ, ghi kết quả test thật vào `Docs/TESTING.md`, và **viết mọi tài liệu `.md` bằng tiếng Việt**.

## Tài liệu

| Tài liệu | Mục đích |
|---|---|
| [PRD](Docs/PRD.md) | Mục tiêu, đối tượng, sơ đồ trang, yêu cầu từng trang, mô hình nội dung |
| [ARCHITECTURE](Docs/ARCHITECTURE.md) | Công nghệ, render, cấu trúc, quyết định, bảo mật |
| [ROADMAP](Docs/ROADMAP.md) | Các giai đoạn & tiến độ |
| [CONTENT_GUIDE](Docs/CONTENT_GUIDE.md) | Cách sửa nội dung an toàn |
| [DESIGN_SYSTEM](Docs/DESIGN_SYSTEM.md) | Nguồn chân lý về hình thức |
| [UI_UX_GUIDELINES](Docs/UI_UX_GUIDELINES.md) | Quy tắc hành vi & UX |
| [COMPONENT_GUIDELINES](Docs/COMPONENT_GUIDELINES.md) | Catalog component |
| [DEPLOYMENT](Docs/DEPLOYMENT.md) | Triển khai VPS |
| [TESTING](Docs/TESTING.md) | Chiến lược kiểm thử & kết quả đã xác minh |

## Câu hỏi cần xác nhận (trước khi triển khai)

| # | Câu hỏi | Mặc định nếu không có ý kiến |
|---|---|---|
| Q1 | Thông tin cá nhân: họ tên, chức danh, giới thiệu, ảnh, CV (VI/EN), email, GitHub, LinkedIn, địa điểm | Dùng `[PLACEHOLDER]` |
| Q2 | Ngôn ngữ mặc định khi vào `/` | `vi`, có nhận diện theo trình duyệt |
| Q3 | Tên miền | Chưa có → chặn Giai đoạn 8 |
| Q4 | Gửi mail form liên hệ: Resend / SMTP (Gmail, Zoho…) / chỉ mailto | Mailto trước, Resend sau |
| Q5 | Cấu hình VPS (RAM/OS), build trên VPS hay qua GitHub Actions + GHCR | Build trên VPS |
| Q6 | Duyệt màu accent cobalt `#2E4FD6` và font Inter + JetBrains Mono | Như đề xuất |
| Q7 | Trang tuỳ chọn Uses / Now / Services | Không làm ở v1 |
| Q8 | Analytics: không / Umami tự host / Plausible | Không |
| Q9 | `git init`, repo public hay private; làm sạch `.claude/settings*.json` | Init + gitignore settings |
| Q10 | Nâng Node local lên 24 LTS | Có |
| Q11 | Giữ thư mục `Docs/` hay đổi thành `docs/` | Giữ `Docs/` |
| Q12 | Danh sách dự án công ty và mức công khai từng dự án | Chưa đưa dự án công ty nào |
