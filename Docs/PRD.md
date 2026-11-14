# PRD — Portfolio cá nhân cho Developer

> **Trạng thái:** BẢN NHÁP v0.2 — chờ phê duyệt. Brief gốc: [MASTER_PROMPT_PORTFOLIO.md](MASTER_PROMPT_PORTFOLIO.md).

## 1. Mục tiêu

1. Thể hiện danh tính nghề nghiệp Software Developer của chủ dự án (song ngữ VI/EN).
2. Nhà tuyển dụng đánh giá được trong < 60 giây (là ai, stack, kinh nghiệm, CV, liên hệ).
3. Trình bày dự án trung thực — kể cả dự án công ty đã làm sạch thông tin — không lộ dữ liệu mật.
4. Có blog chia sẻ kiến thức lâu dài.
5. Rẻ và đơn giản khi vận hành trên một VPS; cập nhật nội dung = sửa file + deploy.

**Ngoài phạm vi (v1):** CMS/trang admin, database, tài khoản người dùng, bình luận, newsletter, analytics (chờ quyết định Q8), thương mại điện tử, blog nhiều tác giả.

## 2. Đối tượng & hành trình

| Hành trình | Các bước |
|---|---|
| Nhà tuyển dụng | Hero Home → Resume online → Tải CV → Liên hệ |
| Khách hàng | Home → Projects (lọc) → Chi tiết dự án → Liên hệ |
| Developer | Home / tìm kiếm → Bài blog → Bài liên quan → Projects → GitHub |
| Người quay lại | Vào thẳng `/blog` hoặc `/projects`, giữ nguyên ngôn ngữ |

## 3. Sơ đồ trang

```
/                           → chuyển hướng /vi (ngôn ngữ mặc định, xem Q2)
/{locale}                   Home
/{locale}/about             Giới thiệu
/{locale}/skills            Kỹ năng
/{locale}/projects          Dự án (tìm kiếm, lọc)
/{locale}/projects/{slug}   Chi tiết dự án
/{locale}/experience        Timeline kinh nghiệm
/{locale}/resume            Resume online + tải CV (in được)
/{locale}/blog              Danh sách bài viết (tìm kiếm, lọc tag)
/{locale}/blog/{slug}       Bài viết
/{locale}/contact           Liên hệ
/{locale}/privacy           Chính sách riêng tư (cần vì form liên hệ thu thập dữ liệu cá nhân)
404                         Trang không tồn tại (theo ngôn ngữ)
/sitemap.xml /robots.txt /api/health
```
Hoãn lại (chỉ làm khi có nội dung thật): `/uses`, `/now`, `/services` (Q7).

## 4. Yêu cầu từng trang

| Trang | Bắt buộc có | Nguồn dữ liệu |
|---|---|---|
| Home | Hero bento (tên, chức danh, giới thiệu, avatar, CTA: Xem dự án / Liên hệ / Tải CV), trạng thái sẵn sàng làm việc, công nghệ nổi bật, dự án nổi bật (≤ 3), tóm tắt About, tổng quan kinh nghiệm (2–3 gần nhất), bài viết mới (≤ 3, ẩn hoặc teaser nếu chưa có), CTA liên hệ | profile, projects, experience, posts |
| About | Giới thiệu, nền tảng nghề nghiệp, triết lý phát triển, định hướng, thế mạnh, học vấn & chứng chỉ (nếu có), sở thích (tuỳ chọn) | profile, education |
| Skills | 8 nhóm (Ngôn ngữ, Frontend, Backend, Database, DevOps & Hạ tầng, Cloud & Deploy, Công cụ, Kiến trúc & Kỹ thuật); icon đơn sắc; **không** %, số năm, xếp hạng | skills |
| Projects | Tìm kiếm, lọc loại (PERSONAL, OPEN_SOURCE, COMPANY, EXPERIMENTAL, SIDE_PROJECT), nổi bật trước, lưới card, trạng thái rỗng/không kết quả | projects |
| Chi tiết dự án | Tổng quan, vấn đề/giải pháp, vai trò, stack, tính năng, kiến trúc (nếu an toàn), ảnh chụp (nếu được phép), trạng thái, thời gian, link (nếu có), dự án liên quan (cùng loại/tag) | projects |
| Experience | Timeline: tổ chức (nếu được công khai), chức danh, thời gian, trách nhiệm, công nghệ, đóng góp đã xác minh, link tới dự án đã làm sạch | experience |
| Resume | Tóm tắt, kỹ năng, kinh nghiệm, dự án, học vấn, chứng chỉ, tải CV PDF theo ngôn ngữ (hoặc trạng thái chưa cấu hình); CSS khi in | tất cả |
| Blog | Danh sách, tìm kiếm, tag, thời gian đọc, ngày đăng, trạng thái rỗng | MDX |
| Bài viết | Render MDX, highlight code bằng Shiki, mục lục (tuỳ chọn), bài liên quan, bài trước/sau | MDX |
| Contact | Form (validate, loading, thành công thật, lỗi, honeypot + rate limit) hoặc mailto dự phòng; email, GitHub, LinkedIn, mạng xã hội khác, địa điểm (tuỳ chọn) | site config |
| Privacy | Form thu thập gì, mục đích, thời gian lưu, provider, cách yêu cầu xoá | i18n tĩnh |
| 404 | Thông báo + link về Home/Projects/Blog | — |

## 5. Mô hình nội dung (tóm tắt — chi tiết ở CONTENT_GUIDE)

```ts
type Locale = "vi" | "en";
type Localized<T = string> = Record<Locale, T>;

type ProjectType = "PERSONAL" | "OPEN_SOURCE" | "COMPANY" | "EXPERIMENTAL" | "SIDE_PROJECT";
type ProjectStatus = "COMPLETED" | "IN_PROGRESS" | "MAINTAINED" | "ARCHIVED";

type ProjectBase = {
  slug: string; type: ProjectType; status: ProjectStatus; featured?: boolean;
  title: Localized; summary: Localized; overview?: Localized;
  problem?: Localized; solution?: Localized; role: Localized; responsibilities?: Localized<string[]>;
  features?: Localized<string[]>; stack: string[]; tags?: string[];
  period?: { start: string; end?: string };   // "2024-03"
  cover?: ImageRef; order?: number;
};
type Project =
  | (ProjectBase & { visibility: "PUBLIC"; repoUrl?: string; demoUrl?: string; architecture?: Localized; screenshots?: ImageRef[] })
  | (ProjectBase & { visibility: "PRIVATE" })              // hệ thống kiểu cấm repo/demo/ảnh/kiến trúc
  | (ProjectBase & { visibility: "CONFIDENTIAL"; showGeneric: boolean }); // bị ẩn trừ khi showGeneric
```
Mọi dữ liệu được validate bằng Zod lúc build → dữ liệu sai thì build thất bại.

## 6. Yêu cầu phi chức năng

| Mảng | Yêu cầu |
|---|---|
| Hiệu năng | SSG cho mọi trang nội dung; mục tiêu Lighthouse Perf 90+, A11y 95+, BP 95+, SEO 95+ (**đo thực tế**, không giả định) |
| Accessibility | Chuẩn WCAG 2.2 AA (UI_UX §10) |
| SEO | Title/description riêng mỗi trang, canonical, hreflang vi/en/x-default, OG/Twitter, sitemap, robots, JSON-LD (Person, WebSite, BlogPosting, BreadcrumbList) |
| Bảo mật | Không secret phía client; dùng env; security headers; form liên hệ có rate limit + validate; chỉ HTTPS; không dữ liệu mật |
| Đa ngôn ngữ | VI + EN, URL có tiền tố, từ điển tập trung, metadata & ngày tháng theo ngôn ngữ |
| Bảo trì | Config/data/token tập trung; cập nhật tài liệu theo từng milestone |
| Vận hành | Một VPS, Docker Compose, rollback < 5 phút |
| Responsive | Điện thoại (360+), tablet (768+), desktop (1024+), màn lớn (1440+); sáng/tối |

## 7. Tiêu chí nghiệm thu

Theo MASTER_PROMPT §15, theo dõi trong [TESTING.md](TESTING.md).
