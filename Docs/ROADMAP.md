# Lộ trình

> Cập nhật liên tục. Trạng thái: ☐ chưa bắt đầu · ◐ đang làm · ☑ xong (đã xác minh) · ⛔ bị chặn

## Giai đoạn 0 — Khảo sát & lập kế hoạch ◐ (chờ phê duyệt)
- ☑ Khảo sát workspace (2026-11-14): dự án mới; chỉ có `Docs/MASTER_PROMPT_PORTFOLIO.md`; chưa có asset, CV, git; Node 20.19 (đã EOL), npm 10.8, Docker 29.5, Git 2.53.
- ☑ Bản nháp tài liệu (tiếng Việt): PRD, ARCHITECTURE, DESIGN_SYSTEM, UI_UX_GUIDELINES, COMPONENT_GUIDELINES, DEPLOYMENT, CONTENT_GUIDE, TESTING, README, CLAUDE.md.
- ☑ CSS tổng đề xuất: `src/styles/tokens.css` + `src/app/globals.css` (sáng/tối bằng `light-dark()`, responsive điện thoại/tablet/desktop, bento). Đã biên dịch thử bằng Tailwind CLI v4.3.5 — thành công.
- ☐ Chủ dự án trả lời câu hỏi mở (README → "Câu hỏi cần xác nhận") và duyệt kế hoạch + design system.

## Giai đoạn 1 — Nền tảng
- ☑ `git init`, `.gitignore` (loại toàn bộ `.claude/`, `.env*`), `.gitattributes` (LF); push lên GitHub `NTV98/Portfolio` nhánh `main` (2026-11-14).
- ☐ Scaffold Next.js (TS strict, App Router, `src/`), ESLint, Prettier (+ plugin tailwind), `.nvmrc`. Giữ nguyên `tokens.css`/`globals.css` đã duyệt.
- ☐ Font (Inter, JetBrains Mono, subset vietnamese), `next-themes`.
- ☐ Routing next-intl (`/vi`, `/en`), khung messages, `<html lang>` theo ngôn ngữ.
- ☐ Khung layout: SkipLink, SiteHeader, MobileNav, LocaleSwitcher, ThemeToggle, SiteFooter, 404.
- **Điều kiện xong:** `typecheck`, `lint`, `build` pass; khung hiển thị đúng ở cả 2 ngôn ngữ × 2 theme.

## Giai đoạn 2 — Bộ UI
- ☐ Primitive (`ui/`), `bento/`, `layout/` theo COMPONENT_GUIDELINES.
- ☐ Route `/[locale]/styleguide` chỉ ở dev (404 ở production) hiển thị mọi component/trạng thái ở 2 theme — dùng cho audit giao diện.
- ☐ Test cho primitive có logic.
- **Điều kiện xong:** catalog đầy đủ, checklist audit pass trên styleguide.

## Giai đoạn 3 — Lớp nội dung
- ☐ Schema Zod + loader/selector (quy tắc visibility).
- ☐ File `config/` và `data/` với nội dung `[PLACEHOLDER]` đánh dấu rõ.
- ☐ Pipeline MDX (frontmatter, Shiki 2 theme, thời gian đọc), 1 bài mẫu ghi rõ là mẫu.
- ☐ Script `check-placeholders`.
- **Điều kiện xong:** unit test selector/schema pass; dữ liệu sai làm build thất bại.

## Giai đoạn 4 — Các trang
- ☐ Home (bento) → About → Skills → Experience → Projects (+ lọc) → Chi tiết dự án → Resume (+ CSS in, trạng thái CV) → Blog → Bài viết → Contact (mailto dự phòng trước) → Privacy.
- **Điều kiện xong:** mỗi trang pass checklist UI_UX §11–12 ở cả 2 ngôn ngữ/2 theme.

## Giai đoạn 5 — Tích hợp, SEO, bảo mật
- ☐ Server Action liên hệ + provider đã chọn (Q4), honeypot, rate limit.
- ☐ Metadata mỗi trang, canonical + hreflang, ảnh OG, sitemap, robots, JSON-LD.
- ☐ Security headers / CSP (ở app để dev giống prod; ở Nginx cho production).

## Giai đoạn 6 — Kiểm thử chất lượng
- ☐ Vitest unit/component; Playwright E2E (điều hướng, đổi ngôn ngữ, theme, lọc, CV, liên hệ thành công/lỗi/dự phòng, 404, quét link, không cuộn ngang); axe.
- ☐ Đo Lighthouse (mobile + desktop) trên bản build production; ghi kết quả vào TESTING.md.

## Giai đoạn 7 — Chuẩn bị production
- ☐ Dockerfile, `.dockerignore`, compose, cấu hình nginx, script, `.env.example`.
- ☐ Xác minh local: build image, container healthy, nginx proxy hoạt động (cert tự ký/local).
- ☐ Hoàn thiện DEPLOYMENT.md với lệnh thật.

## Giai đoạn 8 — Đưa lên VPS ⛔ (hoãn theo yêu cầu chủ dự án 2026-11-14; cần quyền VPS + tên miền)
- ☐ Thực hiện DEPLOYMENT §8 trên VPS, cấp chứng chỉ, xác minh HTTPS/DNS/restart/log/rollback.

## Song song — Nội dung từ chủ dự án
- ☐ Thông tin cá nhân (VI+EN), ảnh, file CV PDF, mạng xã hội, email.
- ☐ Danh sách dự án kèm quyết định visibility từng dự án.
- ☐ Kinh nghiệm làm việc (được phép công khai theo từng công ty).
- ☐ Các bài viết thật đầu tiên.
