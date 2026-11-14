# Design System — Minimalist + Bento Grid

> **Trạng thái:** BẢN NHÁP v0.2 — chờ chủ dự án phê duyệt. Sau khi duyệt, đây là **nguồn chân lý duy nhất** cho mọi giao diện.
> **Quy tắc:** Không thêm style, màu, font, radius, shadow hay layout pattern mới khi chưa cập nhật file này **và** được chủ dự án duyệt.
> Liên quan: [UI_UX_GUIDELINES.md](UI_UX_GUIDELINES.md) · [COMPONENT_GUIDELINES.md](COMPONENT_GUIDELINES.md)
> Hiện thực hoá: [`src/styles/tokens.css`](../src/styles/tokens.css) · [`src/app/globals.css`](../src/app/globals.css)

---

## 1. Nguyên tắc thiết kế

| # | Nguyên tắc | Ý nghĩa thực tế |
|---|---|---|
| 1 | **Nội dung là trên hết** | Typography và khoảng trắng tạo nên thiết kế. Trang trí phải có lý do tồn tại. |
| 2 | **Bento là công cụ** | Dùng Bento khi nội dung đa dạng (Home, tóm tắt Project detail, điểm nổi bật About). Danh sách, bài viết, form dùng layout thường. |
| 3 | **Một màu nhấn** | Chỉ một accent, dùng tiết kiệm: CTA chính, link, focus ring, trạng thái active. Tối đa ~1 phần tử tô accent mỗi section. |
| 4 | **Viền thay bóng** | Phân tách bề mặt bằng viền 1px + bậc nền. Shadow chỉ cho lớp nổi (menu, dialog, toast). |
| 5 | **Chuyển động tiết chế** | Motion chỉ để xác nhận tương tác (hover, focus, mở/đóng). Không hiệu ứng theo scroll, không parallax. |
| 6 | **An toàn song ngữ** | Token phải hợp với dấu tiếng Việt (line-height, font subset) và độ dài chênh VI/EN (VI thường dài hơn 15–30%). |
| 7 | **Giao diện trung thực** | Không nút giả, số liệu giả, thanh tiến độ giả, trạng thái thành công giả. |

**Dấu ấn riêng (để không giống template):**
- **Nhãn eyebrow font mono** có số thứ tự phía trên tiêu đề — ví dụ `01 / PROJECTS`, `STATUS · OPEN TO WORK`.
- **Metadata dạng mono, số tabular** (ngày, thời gian đọc, stack) — cảm giác "bảng thông số" của kỹ sư.
- **Lưới hairline**: viền 1px, radius và gap đồng nhất tuyệt đối — sự chính xác chính là thẩm mỹ.
- **Icon công nghệ đơn sắc** (`currentColor`), không dùng logo màu sặc sỡ.

**Cấm:** gradient làm nền, glow, glassmorphism/backdrop blur (kể cả header — header dùng nền `bg` đặc + viền dưới), neon, 3D tilt, hiệu ứng theo con trỏ, thanh % kỹ năng, blob/minh hoạ ngẫu nhiên, emoji làm icon UI, nhiều hơn một màu accent.

---

## 2. Kiến trúc token & CSS tổng

```
src/styles/tokens.css   ← @theme (màu, font, cỡ chữ, radius, shadow, easing, container)
                          + :root (token layout responsive, z-index, duration)
src/app/globals.css     ← @import tailwindcss + tokens, base styles,
                          utilities layout / bento / helper, style code Shiki
components              ← CHỈ dùng class ngữ nghĩa (bg-surface, text-fg-muted, bento-2x2 …)
```

### 2.1 Sáng / tối (Light / Dark)
- Màu khai báo **một lần** bằng `light-dark(<sáng>, <tối>)` — không lặp bảng màu cho dark.
- Theme quyết định bởi `color-scheme`:
  - `:root` → `light dark`: theo hệ điều hành (hoạt động cả trước khi JS tải → không nháy màu).
  - `html.light` / `html.dark` → ép theme (do `next-themes` gắn class, mặc định **system**).
- Vì token tự đổi màu, component **gần như không cần** variant `dark:`. Chỉ dùng `dark:` cho khác biệt không phải màu.
- Hỗ trợ trình duyệt của `light-dark()`: Chrome 123+, Safari 17.5+, Firefox 120+.

### 2.2 Ràng buộc bằng trình biên dịch
`tokens.css` **reset** các namespace mặc định của Tailwind (`--color-*`, `--text-*`, `--shadow-*`, `--radius-*`, `--font-*`, `--leading-*`, `--tracking-*`, `--ease-*`). Kết quả: class như `bg-zinc-500`, `text-2xl` **không tồn tại** — quy tắc "chỉ dùng token" được cưỡng chế khi build, không chỉ nằm trên giấy.
Đã kiểm chứng (2026-11-14, Tailwind CLI v4.3.5): biên dịch thành công; `bg-zinc-500`, `text-2xl` không được sinh; `dark:` sinh đúng `:where(.dark, .dark *)`; `@media` lồng nhau được làm phẳng khi minify.

### 2.3 Responsive bằng token
Token layout nằm trong `:root` và tự tăng ở **tablet (≥ 768px)** và **desktop (≥ 1024px)** — component không cần viết breakpoint cho khoảng cách:

| Token | Điện thoại | Tablet ≥ 768 | Desktop ≥ 1024 | Utility |
|---|---|---|---|---|
| `--gutter` (padding ngang container) | 16px | 24px | 32px | `container-page` / `-wide` / `-prose` |
| `--grid-gap` | 16px | 16px | 24px | `gap-grid`, `bento`, `grid-cards` |
| `--card-pad` | 20px | 20px | 24px | `card-pad`, `bento-cell` |
| `--section-y` | 64px | 80px | 96px | `section` |
| `--page-top` | 48px | 64px | 80px | `page-top` |
| `--stack-title` | 32px | 32px | 40px | `stack-title` |
| `--bento-row` | auto | auto | `minmax(11rem, auto)` | `bento` |
| `--header-h` | 64px | 64px | 64px | — |
| `--tap-min` | 44px | 44px | 44px | `tap-target` |

Cỡ chữ heading dùng `clamp()` co giãn mượt từ 360px → 1280px (xem §4.2).

### 2.4 Quy trình ngoại lệ
Thêm token vào đây → chủ dự án duyệt → thêm vào `tokens.css` → mới được dùng.

---

## 3. Màu sắc

Tất cả cặp màu dưới đây đã được **tính toán thực** (độ tương phản WCAG 2.x, chạy script ngày 2026-11-14). Tỷ lệ so với `bg` / `surface` / `surface-muted`.

### 3.1 Theme sáng

| Token | Class ví dụ | Hex | Tương phản (bg / surface / muted) | Dùng cho |
|---|---|---|---|---|
| bg | `bg-bg` | `#FAFAF9` | — | Nền trang |
| surface | `bg-surface` | `#FFFFFF` | — | Card, header, input |
| surface-muted | `bg-surface-muted` | `#F4F4F2` | — | Code block, nền tag, hover |
| fg | `text-fg` | `#18181B` | 16.96 / 17.72 / 16.09 | Heading, nội dung |
| fg-muted | `text-fg-muted` | `#52525B` | 7.40 / 7.73 / 7.02 | Chữ phụ, mô tả |
| fg-subtle | `text-fg-subtle` | `#6B6B74` | 5.05 / 5.28 / 4.79 | Metadata, caption, placeholder |
| border | `border-border` | `#E4E4E7` | trang trí | Viền card, đường kẻ |
| border-strong | `border-border-strong` | `#A1A1AA` | 2.45 | Viền input, viền hover |
| accent | `bg-accent` / `text-accent` | `#2E4FD6` | 6.27 / 6.55 / 5.95 | Link, nút chính, focus ring |
| accent-hover | `bg-accent-hover` | `#2541B8` | 7.96 / 8.31 / 7.55 | Hover/active của accent |
| accent-fg | `text-accent-fg` | `#FFFFFF` | 6.55 trên accent | Chữ trên nền accent |
| accent-soft | `bg-accent-soft` | accent 8% | — | Chip đang chọn, nav active, selection |
| success | `text-success` | `#15803D` | 4.80 / 5.02 / 4.55 | Thành công |
| warning | `text-warning` | `#B45309` | 4.81 / 5.02 / 4.56 | Cảnh báo |
| error | `text-error` | `#B91C1C` | 6.19 / 6.47 / 5.88 | Lỗi, input không hợp lệ |
| info | `text-info` | `#0369A1` | 5.68 / 5.93 / 5.39 | Ghi chú thông tin |

> Ghi chú: `fg-subtle` ban đầu đề xuất `#71717A` chỉ đạt 4.39 trên `surface-muted` (< 4.5) → đã chỉnh thành `#6B6B74`.

### 3.2 Theme tối

| Token | Hex | Tương phản (bg / surface / muted) |
|---|---|---|
| bg | `#0C0C0B` | — |
| surface | `#161615` | — |
| surface-muted | `#1F1F1D` | — |
| fg | `#FAFAFA` | 18.75 / 17.35 / 15.82 |
| fg-muted | `#A1A1AA` | 7.64 / 7.07 / 6.44 |
| fg-subtle | `#8B8B93` | 5.79 / 5.36 / 4.88 |
| border | `#2A2A28` | trang trí |
| border-strong | `#52525B` | trang trí / input |
| accent | `#8EA2FF` | 8.17 / 7.56 / 6.89 |
| accent-hover | `#A9B8FF` | 10.24 / 9.47 / 8.64 |
| accent-fg | `#0C0C0B` | 8.17 trên accent |
| accent-soft | accent 12% | — |
| success | `#4ADE80` | 11.23 / 10.39 / 9.47 |
| warning | `#FBBF24` | 11.72 / 10.85 / 9.89 |
| error | `#F87171` | 7.07 / 6.55 / 5.97 |
| info | `#38BDF8` | 9.14 / 8.45 / 7.71 |

### 3.3 Quy tắc màu
- Mọi token chữ đạt **WCAG AA (≥ 4.5:1)** trên mọi bề mặt trong theme của nó. Màu mới bắt buộc tính lại tỷ lệ và ghi vào bảng.
- Màu semantic chỉ dùng cho **trạng thái** — không dùng trang trí hay phân loại.
- Category/tag dự án **không** mã hoá bằng màu (chip trung tính); phân biệt bằng chữ.
- Ảnh trong dark mode: không filter tự động; chỉ làm bản tối nếu ảnh không đọc được.

---

## 4. Typography

### 4.1 Font (tự host qua `next/font/google`, subset `latin`, `latin-ext`, `vietnamese`)

| Vai trò | Font | Fallback | Token |
|---|---|---|---|
| Sans (UI, nội dung, heading) | **Inter** (variable) | `ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif` | `font-sans` |
| Mono (eyebrow, metadata, code) | **JetBrains Mono** (variable) | `ui-monospace, "SFMono-Regular", Consolas, monospace` | `font-mono` |

Chỉ hai font. Heading phân biệt bằng cỡ, độ đậm, tracking — không thêm font thứ ba.
Phải kiểm tra lại subset `vietnamese` khi scaffold; nếu thiếu thì loại font đó.

### 4.2 Thang cỡ chữ

| Class | Cỡ (mobile → desktop) | Line height | Weight | Tracking | Dùng cho |
|---|---|---|---|---|---|
| `text-display` | 40 → 64px | 1.1 | 600 | -0.03em | Tên ở hero Home (1 lần/site) |
| `text-h1` | 32 → 48px | 1.15 | 600 | -0.025em | Tiêu đề trang (1 lần/trang) |
| `text-h2` | 24 → 32px | 1.25 | 600 | -0.02em | Tiêu đề section |
| `text-h3` | 18 → 20px | 1.35 | 600 | -0.01em | Tiêu đề card, mục con |
| `text-body-lg` | 18px | 1.65 | 400 | 0 | Đoạn dẫn, giới thiệu hero |
| `text-body` | 16px | 1.65 | 400 | 0 | Nội dung mặc định |
| `text-prose` | 17px | 1.75 | 400 | 0 | Thân bài blog |
| `text-sm` | 14px | 1.55 | 400/500 | 0 | Nhãn UI, chữ phụ, nút |
| `text-xs` + `eyebrow` | 12px | 1.5 | 500 | 0.04em, **mono, in hoa** | Eyebrow, metadata |

**Quy tắc tiếng Việt:** line-height không thấp hơn **1.1 (display)**, **1.15 (heading)**, **1.5 (mọi đoạn văn)** — dấu chồng (ẫ, ỗ, ặ) sẽ bị cắt. Không dùng `overflow: hidden` kèm line-height chặt cho heading.

### 4.3 Độ đậm
400 (thường), 500 (medium — nhãn UI, nút), 600 (semibold — heading). Không dùng 300, không 700+.

### 4.4 Xuống dòng & cắt chữ
- Heading: `text-wrap: balance`. Đoạn văn: `text-wrap: pretty` (đã đặt trong base).
- Độ dài dòng tối đa **68ch** (`max-w-measure` / `container-prose`).
- Chỉ cắt chữ ở: mô tả card (`line-clamp-3`), tiêu đề card (`line-clamp-2`). Tag luôn xuống dòng, không cắt. Nội dung đầy đủ phải có ở trang chi tiết.
- URL/code/định danh dài: `overflow-wrap: anywhere` (đã đặt trong base).
- Không bao giờ cắt tên, chức danh, ngày tháng.

---

## 5. Khoảng cách

Đơn vị gốc **4px** (mặc định Tailwind). Chỉ dùng các bậc:

`0, 0.5(2px), 1(4), 1.5(6), 2(8), 3(12), 4(16), 5(20), 6(24), 8(32), 10(40), 12(48), 16(64), 20(80), 24(96), 32(128)`

| Ngữ nghĩa | Giá trị | Cách dùng |
|---|---|---|
| Icon ↔ chữ | 8px | `gap-2` |
| Khoảng trong card | 12 / 16px | `gap-3` / `gap-4` |
| Padding card | 20 → 24px | `card-pad` |
| Gap lưới | 16 → 24px | `gap-grid` |
| Tiêu đề section → nội dung | 32 → 40px | `stack-title` |
| Nhịp section | 64 → 80 → 96px | `section` |
| Đầu trang dưới header | 48 → 64 → 80px | `page-top` |

---

## 6. Layout

| Token | Giá trị | Utility | Dùng cho |
|---|---|---|---|
| `--container-page` | 72rem (1152px) | `container-page` | Container mặc định |
| `--container-wide` | 80rem (1280px) | `container-wide` | Chỉ bento Home & gallery dự án |
| `--container-measure` | 68ch | `container-prose`, `max-w-measure` | Văn bản dài, bài viết |
| Header | 64px, sticky | `header-safe` (tránh tai thỏ) | |
| Vùng chạm | ≥ 44×44px | `tap-target` | Mọi phần tử tương tác |

### 6.1 Breakpoint (mặc định Tailwind — không tuỳ biến)

| Tên | Từ | Thiết bị | Kiểm tra ở |
|---|---|---|---|
| (mặc định) | 0 | Điện thoại | 360px, 390px |
| `sm` | 640px | Điện thoại ngang | 640px |
| `md` | 768px | **Tablet** | 768px |
| `lg` | 1024px | **Desktop** / tablet ngang | 1024px, 1280px |
| `xl` | 1280px | Desktop lớn | 1440px, 1920px |

### 6.2 Lưới

| Lưới | Điện thoại | Tablet (md) | Desktop (lg+) | Utility |
|---|---|---|---|---|
| **Bento** | 1 cột | 2 cột | 4 cột | `bento` |
| Danh sách card (dự án, bài viết) | 1 | 2 | 3 | `grid-cards` |
| Nhóm kỹ năng | 1 | 2 | 2 | grid thường |
| Trang văn bản | 1 cột, tối đa 68ch | | | `container-prose` |
| Trang chi tiết | 1 | 1 | nội dung 8/12 + aside 4/12 | grid thường |

### 6.3 Các xử lý mobile/tablet có sẵn trong base CSS
- `min-height: 100dvh` — đúng chiều cao trên trình duyệt di động (thanh địa chỉ co giãn).
- `env(safe-area-inset-*)` — tránh tai thỏ / thanh cử chỉ.
- `text-size-adjust: 100%` — iOS không tự phóng chữ khi xoay máy.
- Input cỡ chữ tối thiểu 16px — iOS không tự zoom khi focus.
- `scroll-padding-top` — anchor không bị header sticky che.
- `scrollbar-gutter: stable` — không nhảy layout khi xuất hiện thanh cuộn.
- Hover chỉ áp dụng trên thiết bị có chuột (`@media (hover: hover)`) — không bị "kẹt hover" trên màn hình cảm ứng.
- Code block cuộn ngang bên trong khung, trang không bao giờ cuộn ngang.

---

## 7. Hệ thống Bento Grid

### 7.1 Kích thước ô (utility `bento-*`, prop `size` của `BentoCard`)

| Kích thước | Điện thoại | Tablet (2 cột) | Desktop (4 cột) |
|---|---|---|---|
| `bento-1x1` | full | 1 cột | 1 cột × 1 hàng |
| `bento-2x1` | full | 2 cột | 2 cột × 1 hàng |
| `bento-1x2` | full | 1 cột × 2 hàng | 1 cột × 2 hàng |
| `bento-2x2` | full | 2 cột | 2 cột × 2 hàng |
| `bento-4x1` | full | 2 cột | 4 cột (cả hàng) |

Mỗi ô dùng thêm `bento-cell` (bề mặt chung) và `card-interactive` nếu click được. Hàng desktop: `minmax(11rem, auto)` — nội dung được phép làm ô cao lên, không bao giờ bị cắt.

### 7.2 Quy tắc
1. **Thứ tự DOM = thứ tự đọc = thứ tự trên mobile.** Không dùng `order-*` hay `grid-auto-flow: dense`.
2. Tối đa **8 ô** mỗi lưới; nên 5–7.
3. Đúng **một ô chính** (`2x2`) mỗi lưới, chứa thông điệp chính.
4. **Mỗi ô một ý**, tối đa **một CTA**.
5. Hàng phải khép kín: ở desktop mỗi hàng đủ 4 cột — không để lỗ. Chỉ dùng layout đã duyệt bên dưới.
6. Các ô giống nhau về radius, viền, padding, nền. Chỉ `variant="accent"` (tối đa 1/lưới) hoặc `variant="muted"` được khác.
7. Cả ô là link: một thẻ `<a>` duy nhất với `stretched-link`; không lồng phần tử tương tác khác.
8. Không dùng Bento cho: danh sách dài, thân bài viết, form, timeline.

### 7.3 Layout đã duyệt

**Home (desktop, 4 cột):**
```
┌───────────────┬───────┬───────┐
│ Giới thiệu +  │ Ảnh   │Trạng  │  hàng 1
│ CTA (2x2)     │ (1x2) │thái   │
│               │       ├───────┤
│               │       │ Stack │  hàng 2
├───────────────┼───────┼───────┤
│ Dự án nổi bật │Kinh   │  CV   │  hàng 3
│ (2x1)         │nghiệm │ (1x1) │
├───────────────┼───────┴───────┤
│ Bài viết mới  │ CTA liên hệ   │  hàng 4
│ (2x1)         │ (2x1, accent) │
└───────────────┴───────────────┘
```
Tablet (2 cột): Giới thiệu full → [Ảnh 1x2 | Trạng thái / Stack] → Dự án full → [Kinh nghiệm | CV] → Bài viết full → Liên hệ full. Tất cả hàng đều khép kín.
Dưới bento: các section thường (danh sách dự án nổi bật, tóm tắt About, bài viết) dùng lưới thường.

**Điểm nổi bật About (desktop):** `2x1 Triết lý` · `1x1 Địa điểm/Ngôn ngữ` · `1x1 Học vấn` · `4x1 Thế mạnh`.

**Tóm tắt Project detail (desktop):** `2x1 Vai trò` · `1x1 Thời gian/Trạng thái` · `1x1 Link` · `4x1 Stack`.

Layout mới = thay đổi design system → ghi vào đây trước.

---

## 8. Radius, viền, độ nổi

| Class | Giá trị | Dùng cho |
|---|---|---|
| `rounded-sm` | 6px | Tag, badge, chip nhỏ, kbd |
| `rounded-md` | 10px | Nút, input, ảnh inline, code block |
| `rounded-lg` | 16px | Card, ô bento, dialog |
| `rounded-full` | 9999px | Avatar, chấm trạng thái, toggle |

- Radius lồng nhau: radius trong = radius ngoài − padding (tối thiểu `sm`).
- Viền: **chỉ 1px**. Focus ring: 2px.

| Shadow | Sáng | Tối | Dùng cho |
|---|---|---|---|
| (không) | none | none | Card mặc định |
| `shadow-sm` | `0 1px 2px rgb(0 0 0 / .05)` | trong suốt (dùng `border-strong`) | Card tương tác khi hover |
| `shadow-overlay` | `0 12px 32px -8px rgb(0 0 0 / .16)` | `… / .6` | Menu, dialog, toast |

### Lớp z-index

| Utility | Giá trị | Dùng cho |
|---|---|---|
| (base) | 0 | Nội dung |
| `z-raised` | 10 | Lớp phủ stretched-link, aside sticky |
| `z-header` | 40 | Header sticky |
| `z-dropdown` | 50 | Menu/popover |
| `z-overlay` | 60 | Nền mờ dialog / mobile nav |
| `z-modal` | 70 | Dialog |
| `z-toast` | 80 | Toast |
| `z-skip` | 90 | Link "Bỏ qua đến nội dung" |

---

## 9. Icon

- **Icon UI:** `lucide-react`, 16px (inline), 20px (nút/nav), 24px (nổi bật). `strokeWidth={1.75}`, màu `currentColor`.
- **Icon thương hiệu/công nghệ** (GitHub, LinkedIn, React, .NET…): `simple-icons` (Lucide đã bỏ icon thương hiệu), đơn sắc `currentColor`, cùng kích thước.
- Icon cạnh chữ: `gap-2`, căn giữa dọc. Nút chỉ có icon bắt buộc `aria-label`.
- Không dùng emoji trong giao diện.

---

## 10. Chuyển động

| Token | Giá trị | Utility | Dùng cho |
|---|---|---|---|
| `--duration-fast` | 120ms | `duration-fast` | Đổi màu/viền/opacity khi hover, focus |
| `--duration-base` | 200ms | `duration-base` | Transform nhỏ, mở menu |
| `--duration-slow` | 320ms | `duration-slow` | Mở dialog/mobile nav |
| `--ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | `ease-out` | Xuất hiện |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | `ease-in-out` | Đổi trạng thái |

- Chỉ animate `opacity`, `transform`, `color`, `background-color`, `border-color`.
- Card tương tác khi hover: viền → `border-strong`, nhích lên tối đa 2px, `shadow-sm` (chỉ theme sáng).
- Mũi tên trong link/CTA nhích `translateX(2px)` khi hover.
- v1 không có animation theo scroll. Không dùng thư viện animation (chỉ CSS).
- `prefers-reduced-motion: reduce`: duration về ~0, tắt mọi transform/animation (đã cài trong token + base).

---

## 11. Trạng thái tương tác (mọi phần tử tương tác)

| Trạng thái | Cách thể hiện |
|---|---|
| Hover | Đổi màu/viền (fast). Chỉ thiết bị có chuột. |
| Focus-visible | `outline: 2px solid accent; outline-offset: 2px` — không bao giờ xoá mà không thay thế (đã đặt trong base) |
| Active | Đậm hơn (accent-hover) / scale(0.98) với nút |
| Disabled | `opacity: .5`, `cursor: not-allowed`, không đổi khi hover, `disabled`/`aria-disabled` |
| Loading | Spinner (`Loader2` xoay) thay icon đầu, giữ nhãn, nút bị disable, `aria-busy` |
| Đang chọn (chip/nav) | nền `accent-soft` + chữ `accent`, `aria-pressed`/`aria-current` |
| Không hợp lệ (input) | viền `error` + thông báo kèm icon bên dưới, `aria-invalid`, `aria-describedby` |

---

## 12. Hình ảnh

- Định dạng: AVIF/WebP qua `next/image`; file gốc PNG/JPG trong `public/images`.
- Tỷ lệ: ảnh bìa dự án **16:10**, avatar **1:1** (hoặc 4:5 trong ô hero `1x2`), ảnh OG 1200×630.
- Thiếu ảnh: khung `surface-muted` với chữ viết tắt tên dự án (font mono) — không ảnh vỡ, không ảnh stock.
- Ảnh chụp dự án công ty: chỉ khi được cho phép rõ ràng (xem CONTENT_GUIDE).
- Ảnh có ý nghĩa phải có `alt`; ảnh trang trí → `alt=""`.

---

## 13. Kiểm soát thay đổi

| Loại thay đổi | Quy trình |
|---|---|
| Dùng token/component có sẵn | Tự do |
| Thêm variant component | Ghi vào COMPONENT_GUIDELINES → triển khai |
| Token, màu, font, radius, shadow, layout pattern mới | Đề xuất kèm lý do → **chủ dự án duyệt** → cập nhật file này → triển khai |
| Phong cách mới / thiết kế lại | **Cấm nếu không có phê duyệt rõ ràng** |

Lịch sử thay đổi:
- v0.1 (2026-11-14) — bản nháp đầu.
- v0.2 (2026-11-14) — chuyển sang tiếng Việt; thêm CSS tổng (`tokens.css`, `globals.css`) với `light-dark()`, reset palette Tailwind, token layout responsive, utility bento/container; đã biên dịch thử thành công.
