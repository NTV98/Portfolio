# Kiến trúc

> **Trạng thái:** BẢN NHÁP v0.2 — chờ phê duyệt.

## 1. Tổng quan

Ứng dụng Next.js ưu tiên static. Toàn bộ nội dung nằm trong repo (data TypeScript + MDX), được validate lúc build và render sẵn (SSG) cho từng ngôn ngữ. Logic server duy nhất lúc chạy: xử lý form liên hệ và endpoint health. Không database, không CMS, không backend riêng.

```
                ┌──────────────────────── Git repo ────────────────────────┐
                │ src/config  src/data  src/content/blog (MDX)  messages   │
                │        │ Validate bằng Zod lúc build │                   │
                └────────┼─────────────────────────────┼───────────────────┘
                         ▼                             ▼
                 next build (SSG, output standalone, trang theo từng locale)
                         │
                         ▼
   Trình duyệt ─HTTPS─► Nginx (TLS, headers, gzip, rate limit, cache static)
                         │  mạng docker nội bộ
                         ▼
                  Next.js standalone (node, user không phải root)
                    ├─ HTML/RSC đã render sẵn
                    ├─ Server Action: contact → Zod → rate limit → MailProvider
                    └─ /api/health
                                   │ (chỉ phía server, secret trong env)
                                   ▼
                            Email provider (Q4)
```

## 2. Lựa chọn công nghệ

| Vấn đề | Lựa chọn | Lý do | Phương án bị loại |
|---|---|---|---|
| Framework | **Next.js (bản stable mới nhất lúc scaffold), App Router, TypeScript strict** | Brief yêu cầu; có sẵn SSG + RSC + metadata API + tối ưu ảnh/font | Astro (tốt cho static thuần nhưng brief yêu cầu Next; giữ form liên hệ + i18n trong một stack đơn giản hơn) |
| Runtime | **Node.js 24 LTS** (Docker `node:24-alpine`) | Đang là Active LTS. Máy local đang Node 20.19 → **đã hết hỗ trợ từ 04/2026**, nên nâng cấp (Q10) | Node 20 |
| Styling | **Tailwind CSS v4** (cấu hình bằng CSS `@theme`) | Token là CSS variable gốc → đúng nhu cầu design system; reset palette để cưỡng chế token | CSS Modules (nhiều file, khó cưỡng chế token) |
| Variant | `class-variance-authority` + `clsx` + `tailwind-merge` | Variant có kiểu, tránh component trùng lặp | shadcn/ui (dễ ra giao diện "template", nhiều code thừa; có thể tham khảo pattern) |
| Icon | `lucide-react` (UI) + `simple-icons` (thương hiệu/công nghệ, đơn sắc) | Lucide đã bỏ icon thương hiệu | react-icons (rất nặng, style không đồng nhất) |
| Đa ngôn ngữ | **next-intl**, segment `[locale]`, `localePrefix: "always"` | Hỗ trợ App Router + RSC tốt, render static qua `setRequestLocale`, metadata theo ngôn ngữ, message có kiểu | Tự viết từ điển (phải tự làm routing/nhận diện ngôn ngữ) |
| Theme | `next-themes` (chiến lược class, mặc định system) | Script chống nháy theme, rất nhẹ; kết hợp `light-dark()` trong CSS | Tự viết script |
| Dữ liệu nội dung | Module TS + schema **Zod** | An toàn kiểu, dễ refactor, build lỗi khi dữ liệu sai; Zod dùng lại cho form liên hệ | JSON (không kiểu/không comment), CMS (ngoài phạm vi) |
| Blog | File MDX `src/content/blog/<slug>/{vi,en}.mdx`; `gray-matter` + `next-mdx-remote` (RSC) | Loader đọc file đơn giản, biên dịch lúc build, mỗi ngôn ngữ một file | Velite / content-collections (thêm bước build; cân nhắc khi số bài lớn) |
| Highlight code | `rehype-pretty-code` + **Shiki** (lúc build, 2 theme sáng/tối) | Không JS phía client, grammar chính xác | Prism phía client |
| Form liên hệ | **Server Action** + Zod + honeypot + thời gian tối thiểu + rate limit theo IP trong bộ nhớ; interface `MailProvider` với 1 implementation (Q4) + mailto dự phòng | Secret không bao giờ đến trình duyệt; chỉ 1 container ⇒ limiter trong bộ nhớ là đủ; Nginx `limit_req` là lớp thứ hai | Formspree (bên thứ ba xử lý dữ liệu), Redis (YAGNI) |
| Kiểm thử | Vitest + Testing Library; Playwright + `@axe-core/playwright`; Lighthouse CLI | Chuẩn phổ biến, nhanh, phủ unit/e2e/a11y | Jest (ESM chậm/phức tạp hơn) |
| Lint/format | ESLint (config Next, flat) + Prettier + `prettier-plugin-tailwindcss` | Thứ tự class ổn định giúp audit giao diện | Biome (ổn, nhưng tích hợp Next kém hơn) |
| Package manager | **npm** (đã cài) | Không thêm công cụ | pnpm (chưa cài; lợi ích nhỏ ở dự án này) |
| Deploy | Docker multi-stage → standalone; Compose: `app` + `nginx` (+ `certbot` chạy một lần) | Brief yêu cầu; tái lập được | Node trực tiếp + PM2; Caddy (brief yêu cầu Nginx) |

## 3. Chiến lược render

| Route | Chế độ |
|---|---|
| Mọi trang nội dung | SSG qua `generateStaticParams` (locale × slug) + `setRequestLocale` |
| Bộ lọc Projects/Blog | Trang static + island client đọc `useSearchParams` trong `<Suspense>` |
| Trang Contact | Static; form là island client; gửi = Server Action (dynamic) |
| `/api/health` | Dynamic, trả `{ status: "ok", version }` |
| `sitemap.xml`, `robots.txt` | Sinh lúc build |
| Ảnh OG | Ảnh mặc định theo ngôn ngữ; OG từng bài blog bằng `next/og` lúc build (Giai đoạn 5, tuỳ chọn) |
| Chuyển hướng `/` | proxy/middleware của next-intl (Accept-Language → cookie → mặc định) |

## 4. Cấu trúc thư mục (đề xuất)

```
.
├─ src/
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ layout.tsx            html lang, font, ThemeProvider, header/footer
│  │  │  ├─ page.tsx              Home
│  │  │  ├─ about/ skills/ experience/ resume/ contact/ privacy/   mỗi thư mục 1 page.tsx
│  │  │  ├─ projects/page.tsx  projects/[slug]/page.tsx
│  │  │  ├─ blog/page.tsx      blog/[slug]/page.tsx
│  │  │  └─ not-found.tsx
│  │  ├─ api/health/route.ts
│  │  ├─ sitemap.ts  robots.ts
│  │  └─ globals.css              ✅ đã có (bản đề xuất)
│  ├─ components/                 xem COMPONENT_GUIDELINES §2
│  ├─ config/                     site.ts · profile.ts · navigation.ts · social.ts
│  ├─ data/                       projects.ts · skills.ts · experience.ts · education.ts · certifications.ts
│  ├─ content/blog/<slug>/        vi.mdx · en.mdx · images/
│  ├─ i18n/                       routing.ts · request.ts · navigation.ts
│  ├─ messages/                   vi.json · en.json   (chỉ chữ giao diện)
│  ├─ lib/
│  │  ├─ content/                 schemas.ts (Zod) · projects.ts · posts.ts (loader/selector)
│  │  ├─ mail/                    provider.ts (interface) · <impl>.ts
│  │  └─ seo.ts  rate-limit.ts  format.ts  cn.ts
│  ├─ actions/contact.ts
│  ├─ styles/tokens.css           ✅ đã có (bản đề xuất)
│  └─ proxy.ts                    (next-intl; tên file theo phiên bản Next được cài)
├─ public/                        images/ · icons/ · files/cv-vi.pdf · cv-en.pdf · favicon
├─ tests/                         unit/ · e2e/
├─ deployment/nginx/              nginx.conf · conf.d/portfolio.conf · snippets/{ssl,security-headers}.conf
├─ scripts/                       deploy.sh · backup.sh · rollback.sh · check-placeholders.ts
├─ Docs/                          toàn bộ tài liệu (xem README)
├─ Dockerfile  .dockerignore  docker-compose.yml  .env.example
└─ README.md  CLAUDE.md
```
Lưu ý: `public/` bắt buộc nằm ở gốc repo (yêu cầu của Next.js), không nằm trong `src/` như phác thảo trong brief.

## 5. Các quyết định chính

1. **Visibility được cưỡng chế bằng kiểu + selector.** Dự án `PRIVATE` không thể chứa repo/demo/ảnh ở mức kiểu dữ liệu; `getVisibleProjects()` loại `CONFIDENTIAL` trừ khi `showGeneric`. Một điểm kiểm soát duy nhất → không lộ nhầm.
2. **Trường đa ngôn ngữ nằm cùng dữ liệu** (`Localized<string>`); **bài MDX tách file theo ngôn ngữ**. Bài chỉ có một ngôn ngữ → hiển thị bằng ngôn ngữ đó kèm badge (không dịch giả).
3. **Tách chữ giao diện khỏi nội dung**: `messages/*.json` = giao diện; `data/` = thông tin về chủ dự án.
4. **Chặn placeholder**: `scripts/check-placeholders.ts` quét `[PLACEHOLDER]` → cảnh báo ở dev, làm `build:prod` thất bại khi `STRICT_CONTENT=true`.
5. **Mỗi release một image tag**: `portfolio:<git-sha>`; rollback = chuyển về tag trước.
6. **Theme bằng `light-dark()`**: màu định nghĩa một lần, theo hệ điều hành trước khi JS tải, `next-themes` chỉ gắn class để ép theme.

## 6. Bảo mật

- Secret chỉ ở env phía server (`.env` trên VPS, không commit, không `NEXT_PUBLIC_*`).
- Header (Nginx): HSTS (sau khi HTTPS đã xác minh), `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `X-Frame-Options: DENY` / `frame-ancestors 'none'`.
- CSP: chính sách tĩnh không dùng nonce (nonce buộc render dynamic, mất SSG). Đánh đổi: cần `script-src 'self' 'unsafe-inline'` cho script khởi tạo của Next. Chấp nhận được vì không có nội dung do người dùng tạo và không có script bên thứ ba. Xem xét lại nếu thêm script bên thứ ba.
- Form liên hệ: validate Zod, giới hạn độ dài, loại bỏ CR/LF trong trường header email, honeypot, thời gian điền tối thiểu, rate limit theo IP (vd 5 lần / 15 phút) trong app + Nginx `limit_req` cho POST.
- `.claude/settings*.json` hiện chứa allowlist lệnh tham chiếu dự án/host của công ty cũ → **phải gitignore hoặc làm sạch trước commit đầu tiên** (Q9).

## 7. Kiến trúc deploy

Xem [DEPLOYMENT.md](DEPLOYMENT.md).
