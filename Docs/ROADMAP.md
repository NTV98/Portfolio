# Lộ trình

> Cập nhật liên tục. Trạng thái: ☐ chưa bắt đầu · ◐ đang làm · ☑ xong (đã xác minh) · ⛔ bị chặn

## Giai đoạn 0 — Khảo sát & lập kế hoạch ◐ (chờ phê duyệt)
- ☑ Khảo sát workspace (2026-11-14): dự án mới; chỉ có `Docs/MASTER_PROMPT_PORTFOLIO.md`; chưa có asset, CV, git; Node 20.19 (đã EOL), npm 10.8, Docker 29.5, Git 2.53.
- ☑ Bản nháp tài liệu (tiếng Việt): PRD, ARCHITECTURE, DESIGN_SYSTEM, UI_UX_GUIDELINES, COMPONENT_GUIDELINES, DEPLOYMENT, CONTENT_GUIDE, TESTING, README, CLAUDE.md.
- ☑ CSS tổng đề xuất: `src/styles/tokens.css` + `src/app/globals.css` (sáng/tối bằng `light-dark()`, responsive điện thoại/tablet/desktop, bento). Đã biên dịch thử bằng Tailwind CLI v4.3.5 — thành công.
- ☐ Chủ dự án trả lời câu hỏi mở (README → "Câu hỏi cần xác nhận") và duyệt kế hoạch + design system.

## Mốc UI v2 — Dựng lại giao diện theo `Docs/DesignUI/` ☑ (2026-11-14, chờ chủ dự án duyệt trực quan)
- ☑ Thay toàn bộ UI "Minimalist + Bento" bằng thiết kế của chủ dự án: token + 6 bảng màu (`tokens.css`), utility/component class (`globals.css`), font Be Vietnam Pro (thay Poppins — đã duyệt), bộ chọn màu thay nút sáng/tối.
- ☑ Đã xoá: `bento/`, `motion/RevealObserver`, `media/HeroMedia`, `ThemeToggle`, `SearchFilter`, `Tag`, `Badge`, `CopyButton`, `tech-icons`, `Timeline`.
- ☑ Trang theo mockup: Home, About, Skills, Projects, Chi tiết dự án (dự án trước/sau), Experience, Contact (form mailto). Blog, Resume, Privacy, 404 dùng cùng bộ component.
- ☑ Dữ liệu mới: `src/data/highlights.ts` (code card, Công nghệ, dịch vụ, cách làm việc); `skills.ts` theo 4 nhóm của mockup; `profile.ts` thêm `monogram`, `headline`, `experienceSummary`, `openSourceBlurb`, `about`; `social.ts` thêm `phone`, `facebook`; dự án thêm trường `outcome`.
- ☑ Cập nhật DESIGN_SYSTEM, UI_UX_GUIDELINES, COMPONENT_GUIDELINES, CONTENT_GUIDE, ARCHITECTURE, PRD, README, CLAUDE.md.
- ☑ typecheck · lint · unit (21) · build · E2E (19, gồm axe sáng/tối) — xem TESTING.md.
- ☐ Chủ dự án duyệt trực quan; điền nội dung `[PLACEHOLDER]` (địa điểm, email, kinh nghiệm, đoạn About 2–3, học vấn).
- ☐ Kỹ năng bị bỏ so với bản cũ (Docker, Kubernetes, Nginx, Linux, NestJS, Tailwind CSS, SQL Server, JavaScript, nhóm Cloud): chủ dự án xác nhận có thêm lại hay không.
- ☐ `simple-icons` không còn được dùng → có thể gỡ khỏi `package.json`.

## Mốc UI v2.1 — Điều chỉnh theo phản hồi ☑ (2026-11-14)
- ☑ Thêm 6 bảng màu đề xuất (midnight, forest, ruby, amber, graphite, sand) → tổng 12; chọn màu ghi log ra console.
- ☑ Hover nút ghost / nút tròn / chip link: viền + nền phủ màu nhấn, icon trượt (thay cho đảo màu). Nút chính giữ nguyên.
- ☑ Avatar tròn thay chữ "V" ở header, menu mobile, footer; avatar minh hoạ mẫu.
- ☑ 6 dự án mẫu (2 cá nhân, 2 công ty, 2 mã nguồn mở) có ảnh bìa, ảnh chụp, video review (PUBLIC); card có mô tả ngắn + nhãn Video.
- ☑ Thay mọi `[PLACEHOLDER]` bằng nội dung mẫu đánh dấu `@sample`; `check:content` liệt kê `@sample`.
- ☑ Email liên hệ thật → form mailto đã bật; hỗ trợ Zalo (`social.zalo`).
- ☑ v2.2: thêm ocean, coffee, lime, lavender, mint, sakura → tổng 18 bảng màu; nút đổi ngôn ngữ thu gọn thành nút tròn.
- ☐ **Chủ dự án chọn bảng màu mặc định** → đổi mặc định trong `tokens.css` + gỡ `console.info` trong `PalettePicker`.
- ☐ Cung cấp số điện thoại/Zalo; thay toàn bộ nội dung `@sample` (ảnh thật, video thật, kinh nghiệm, học vấn, địa điểm).

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
