# Design System — "Portfolio Nguyễn Tuấn Vũ"

> **Trạng thái:** v2.2 (2026-11-14: tổng 18 bảng màu, nút ngôn ngữ thu gọn; v2.1: +6 bảng màu, hover nút ghost mới, avatar, ảnh/video dự án) — v2.0 dựng lại theo thiết kế của chủ dự án trong `Docs/DesignUI/` (`Portfolio-html/Main.dc.html` + `Portfolio Nguyễn Tuấn Vũ.pdf`). Thay thế hoàn toàn bản v0.1 "Minimalist + Bento Grid".
> **Nguồn sự thật:** `src/styles/tokens.css` (token) và `src/app/globals.css` (utility/component class). Tài liệu này giải thích *tại sao* và *khi nào dùng*; giá trị chính xác nằm trong code.
> Mockup HTML chỉ là **tham chiếu**: không copy markup/inline style vào app — luôn tái hiện bằng token + component.

## 1. Nguyên tắc thiết kế

1. **Tối, đậm, tự tin.** Nền gần đen ánh màu, tiêu đề cỡ rất lớn (800), một màu nhấn duy nhất theo bảng màu đang chọn.
2. **Bo tròn mềm.** Panel bo 28px, nút và chip là viên thuốc (pill). Không góc vuông.
3. **Viền mảnh, ít bóng.** Panel dùng viền 1px `line`; bóng chỉ dùng cho phần tử nổi (code card, popover, cửa sổ mock).
4. **Màu nhấn có chủ đích.** `accent` cho nền nút/chấm/thanh; `accent-text` khi màu nhấn là **chữ** (đảm bảo tương phản). Nhóm/danh mục dùng `key-1…6` (chấm) và `tint-1…6` (nền thumb).
5. **Chuyển động có nhịp.** Trang vào bằng hiệu ứng "rise" so le; hover nâng nhẹ; trang trí chuyển động chậm (đường cong sway 16s, code card bob 6s). Tắt hết khi `prefers-reduced-motion`.
6. **Trung thực.** Không ảnh chụp hệ thống công ty — thumbnail dự án là minh hoạ trừu tượng (cửa sổ trình duyệt mock).

## 2. Kiến trúc token & CSS tổng

```
tokens.css   @theme (Tailwind)  →  --color-*  --text-*  --radius-*  --shadow-*  --font-*  --container-*
             :root[data-palette]  →  --p-*  (giá trị thô của 6 bảng màu)
             :root               →  --gutter --page-top --section-gap --z-* --duration-*
globals.css  base · layout utility · component class · motion · prose · print
```

- `@theme` **reset** toàn bộ palette/cỡ chữ/bo góc/bóng/container mặc định của Tailwind → class như `bg-zinc-500`, `text-2xl`, `rounded-xl` (mặc định) không tồn tại. Chỉ token của dự án biên dịch được. Thang spacing mặc định (`p-6`, `gap-5.5`…) **vẫn dùng**.
- Màu ngữ nghĩa trỏ tới biến bảng màu: `--color-surface: var(--p-surface)`. Đổi bảng màu = đổi thuộc tính `data-palette` trên `<html>`, không cần class `dark:`.

### 2.1 Bảng màu (palette)

| Giá trị `data-palette` | Kiểu | Ghi chú |
|---|---|---|
| `violet` | tối | **Mặc định** khi hệ điều hành ở chế độ tối |
| `light` | sáng | **Mặc định** khi hệ điều hành ở chế độ sáng |
| `blue`, `teal`, `orange`, `pink` | tối | Từ mockup; chọn qua bộ chọn màu trên header |
| `midnight` (navy + cyan), `forest` (xanh rừng + mint), `ruby` (đỏ rượu + hồng), `amber` (đen ấm + vàng), `graphite` (đơn sắc) | tối | **v2.1 — Claude đề xuất**, chờ chủ dự án chọn mặc định |
| `sand` (giấy ấm + cam cháy) | sáng | **v2.1 — Claude đề xuất** |
| `ocean` (xanh biển sâu + xanh trời), `coffee` (nâu cà phê + caramel), `lime` (đen + xanh chanh, chữ trên nút tối) | tối | **v2.2 — Claude đề xuất** |
| `lavender` (oải hương), `mint` (bạc hà), `sakura` (hoa anh đào) | sáng | **v2.2 — Claude đề xuất** |

Bộ chọn hiển thị **18 bảng màu** dạng lưới 6×3 (hàng 1: mockup · hàng 2: tối bổ sung · hàng 3: tối + sáng bổ sung).

- Tạm thời (theo yêu cầu chủ dự án 2026-11-14): mỗi lần chọn màu, `PalettePicker` ghi `console.info("🎨 Bảng màu: <tên>")` kèm các giá trị chính. Gỡ khi đã chốt bảng màu mặc định.
- `graphite` và `lime` có màu nhấn rất sáng → chữ trên nút dùng biến `--p-on` (tối). Các bảng màu khác `--p-on` = trắng.

- Chưa chọn → không có thuộc tính; CSS tự chọn theo `prefers-color-scheme` (hoạt động cả khi chưa có JS).
- Đã chọn → lưu `localStorage["palette"]`; script nhỏ trong `<head>` (`themeScript`) gắn lại thuộc tính **trước lần vẽ đầu** (không nháy màu). Script chỉ chấp nhận 6 giá trị hợp lệ.
- Thêm/sửa bảng màu: cập nhật đồng thời `tokens.css`, `palettes`/`paletteSwatch`/`paletteBg` trong `src/components/layout/theme.ts`, nhãn trong `messages`, bảng tương phản §3.2.

### 2.2 Responsive bằng token

Layout dùng `clamp()` và lưới `auto-fit` như mockup — **ít breakpoint**:

| Token / utility | Giá trị |
|---|---|
| `--gutter` (padding ngang container) | `clamp(20px, 4vw, 48px)` |
| `--page-top` (khoảng dưới header) | `clamp(32px, 6vw, 72px)` |
| `--section-gap` (giữa các section) | 120px (80px khi < 768px) |
| `grid-fit-sm / md / lg / xl` | cột tối thiểu 250 / 340 / 400 / 440px, tự xuống dòng |

Breakpoint Tailwind mặc định chỉ dùng cho: menu (`lg` 1024px), padding panel (`md`), độ mờ hình trang trí (`max-md`), so le card dự án (≥ 900px).

### 2.3 Quy trình ngoại lệ

Cần giá trị không có token → **không** dùng giá trị tuỳ ý (`p-[13px]`, `h-[clamp…]`). Thêm utility/token có tên trong `globals.css`/`tokens.css` + ghi vào tài liệu này + được chủ dự án duyệt. Ngoại lệ duy nhất được phép: `style` inline của ô màu (swatch) trong bộ chọn bảng màu, vì nó *mô tả* chính bảng màu.

## 3. Màu sắc

### 3.1 Token ngữ nghĩa

| Token (class) | Dùng cho |
|---|---|
| `bg` | Nền trang |
| `bg-2` | Nền ô nhập liệu |
| `surface` / `surface-2` | Panel, card / khối phụ trong mock |
| `line` / `line-strong` | Viền mảnh, đường kẻ / viền chip, nút ghost, ô nhập |
| `fg` / `fg-muted` | Chữ chính / chữ phụ |
| `accent` | **Nền** nút chính, chấm, thanh, chip đang chọn, viền khi hover |
| `accent-text` | Màu nhấn khi là **chữ**: eyebrow, nhãn danh mục, số thứ tự, link |
| `on-accent` | Chữ trên nền `accent` (`--p-on`: trắng, riêng `graphite` là tối) |
| `accent-soft` | Lớp phủ màu nhấn 16% — nền khi hover của nút ghost, chip link, nút tròn |
| `key-1…6` | Chấm màu nhóm (kỹ năng, stack) và thanh trong thumb |
| `tint-1…6` | Nền thumb dự án (màu theo vị trí dự án) |
| `live` | Chấm "sẵn sàng" nhấp nháy |
| `code-*` | Code card ở hero và khối code trong blog — **luôn tối**, không đổi theo bảng màu |

Quy tắc:
- Chữ màu nhấn **luôn** dùng `text-accent-text`, không dùng `text-accent` (ở một số bảng màu `accent` tối, không đủ tương phản trên nền tối).
- `key-*`/`tint-*` chỉ để phân biệt nhóm, không mang nghĩa trạng thái.
- Không có token success/warning/error: v1 không có form gửi lên server.

### 3.2 Độ tương phản (WCAG, đo 2026-11-14 bằng script Node)

| Bảng màu | fg/bg | muted/bg | muted/surface | accent-text/bg | accent-text/surface | trắng/accent |
|---|---|---|---|---|---|---|
| violet | 19.6 | 8.4 | 7.8 | 7.9 | 7.4 | 5.2 |
| blue | 19.3 | 8.9 | 8.0 | 9.3 | 8.3 | 5.2 |
| teal | 19.1 | 9.5 | 8.6 | 11.8 | 10.6 | 5.3 |
| orange | 19.4 | 9.5 | 8.7 | 10.2 | 9.4 | 5.2 |
| pink | 19.4 | 9.1 | 8.4 | 9.2 | 8.5 | 6.0 |
| light | 17.0 | 6.1 | 6.6 | 5.9 | 6.4 | 6.4 |
| midnight | 19.7 | 8.9 | 8.3 | 13.6 | 12.6 | 5.4 |
| forest | 19.4 | 9.8 | 8.9 | 13.8 | 12.6 | 5.0 |
| ruby | 19.7 | 9.0 | 8.5 | 10.4 | 9.7 | 6.3 |
| amber | 19.4 | 10.1 | 9.4 | 13.5 | 12.5 | 5.0 |
| graphite | 18.8 | 7.7 | 7.1 | 19.7 | 18.2 | 15.5 (chữ tối/accent) |
| sand | 16.4 | 7.1 | 7.6 | 5.3 | 5.6 | 5.6 |
| ocean | 19.2 | 8.9 | 8.2 | 11.5 | 10.6 | 6.7 |
| coffee | 19.3 | 9.5 | 8.8 | 11.8 | 10.9 | 7.1 |
| lime | 19.6 | 9.5 | 8.8 | 15.0 | 13.9 | 15.0 (chữ tối/accent) |
| lavender | 16.3 | 6.5 | 7.0 | 6.6 | 7.1 | 7.1 |
| mint | 16.0 | 6.1 | 6.5 | 5.1 | 5.5 | 5.5 |
| sakura | 16.6 | 6.4 | 6.8 | 5.7 | 6.0 | 6.0 |

Tất cả ≥ 4.5:1 (AA cho chữ thường). axe (Playwright) pass ở chế độ sáng và tối.

## 4. Typography

### 4.1 Font (tự host qua `next/font/google`, subset `latin` + `vietnamese`)

| Vai trò | Font | Lý do |
|---|---|---|
| Sans (mọi chữ) | **Be Vietnam Pro** 400–800 | Mockup dùng Poppins, nhưng Poppins **không có subset tiếng Việt** (các dấu như ễ, ấ, ộ rơi về font khác). Be Vietnam Pro cùng phong cách hình học, thiết kế cho tiếng Việt. Chủ dự án đã duyệt 2026-11-14. |
| Mono | JetBrains Mono 400–500 | Code card, số thứ tự `01`, mốc thời gian |

### 4.2 Thang cỡ chữ (class `text-*`)

| Token | Cỡ | Weight · line-height | Dùng cho |
|---|---|---|---|
| `display` | 40 → 84px | 800 · 1.1 | Tiêu đề hero, CTA cuối trang |
| `h1` | 38 → 76px | 800 · 1.1 | Tiêu đề trang |
| `h2` | 32 → 56px | 700 · 1.12 | Tiêu đề section |
| `title` | 26 → 44px | 700 · 1.15 | Tiêu đề phụ (banner mã nguồn mở, "Cách mình làm việc", chứng chỉ) |
| `h3` | 24px | 700 · 1.25 | Tiêu đề card/panel |
| `h4` | 20px | 700 · 1.3 | Tiêu đề nhỏ (dịch vụ, bước, kinh nghiệm rút gọn) |
| `lead` | 19 → 26px | 500 · 1.45 | Dòng chức danh ở hero |
| `body-xl` / `body-lg` / `body-md` / `body` | 21 / 19 / 17 / 16px | 400 | Đoạn mở đầu About / lead trang / đoạn văn / mặc định |
| `sm` / `xs` / `2xs` / `3xs` | 15 / 14 / 13 / 12px | — | Nav, meta / chip, nhãn, eyebrow / nhãn danh mục card / tên file code |

- Line-height tiêu đề lớn nâng từ 1.05 (mockup) lên **≥ 1.1** để dấu tiếng Việt chồng tầng không chạm dòng trên.
- Letter-spacing tiêu đề −0.03em. `text-wrap: balance` cho tiêu đề, `pretty` cho đoạn văn.

### 4.3 Nhãn

- `eyebrow`: 14px · 600 · in hoa · tracking 0.08em · `accent-text` (vd "CÔNG NGHỆ").
- `label-cat`: 13px · 600 · in hoa · tracking 0.06em · `accent-text` (danh mục trên card dự án).

## 5. Khoảng cách

Thang spacing Tailwind mặc định (bội số 4px, cho phép nửa bước như `4.5` = 18px). Nhịp chuẩn theo mockup:

| Vị trí | Giá trị |
|---|---|
| Header | padding dọc 24px |
| Page header | `page-top` → `pb-14` (56px); gap 18px |
| Giữa section | `section-gap` (120 / 80px); section thứ nhất dưới hero Home 96px |
| Tiêu đề section → nội dung | 40px (`mb-10`), dự án nổi bật 48px |
| Panel | padding 28–36px (`p-7` … `p-9`); gap lưới 20–24px |
| Card dự án | gap thumb → chữ 18px; lưới 32px, hàng 40px |
| Footer | `pt-24 pb-10`, đường kẻ trên + `pt-7` |

## 6. Layout

- Container duy nhất `container-page`: tối đa **1200px**, padding `--gutter`. `container-prose` (68ch) cho bài viết/quyền riêng tư.
- Header **không sticky** (như mockup), cao ~92px. Desktop (≥ 1024px): logo · 6 link · VI/EN · bộ chọn màu. Dưới 1024px: nút menu mở `<dialog>` toàn màn hình.
- `<main>` có `overflow-x: clip` để hình đường cong của hero tràn mép phải mà không gây cuộn ngang.
- Lưới: luôn dùng `grid-fit-*` (auto-fit) thay cho số cột cố định.

## 7. Bố cục các trang (đã duyệt theo mockup)

| Trang | Cấu trúc |
|---|---|
| Home | Hero 2 cột (đường dọc phát sáng · pill "sẵn sàng" · "Xin chào, mình là **tên**" · chức danh · intro · 2 nút) + code card `developer.ts` → Công nghệ (2 panel Backend/Frontend) → Mình có thể giúp bạn (4 panel đánh số) → Dự án nổi bật (3 card) → Kinh nghiệm (tóm tắt + danh sách 3 dòng) → Banner mã nguồn mở → CTA lớn "Cùng làm một điều thật hay nhé?" |
| About | Page header → ảnh chân dung trong panel (đĩa màu nhấn) + 3 đoạn + 2 nút → "Cách mình làm việc" (4 bước đánh số) |
| Skills | Page header + lead → panel theo nhóm (chấm `key-*` + chip) → "Chứng chỉ và học tập" |
| Projects | Page header → chip lọc → lưới 2 cột card lớn, card chẵn so le xuống 56px (≥ 900px) |
| Chi tiết dự án | Back link · danh mục · h1 · tóm tắt → 4 ô meta (Vai trò/Thời gian/Công nghệ/Liên kết) → thumb lớn → chip stack → các khối đánh số 01, 02… → Dự án trước / tiếp theo |
| Experience | Page header → mỗi vai trò một panel (thời gian · chức danh · công ty | mô tả · chip) |
| Contact | Page header → cột thông tin (Email/Điện thoại/Địa điểm/Mạng xã hội, kẻ dòng) + panel form |
| Blog, Resume, Privacy, 404 | Không có trong mockup → dùng cùng bộ component (PageHeader, panel, chip, nút) |

## 8. Radius, viền, độ nổi

| Token | Giá trị | Dùng cho |
|---|---|---|
| `rounded-sm` | 12px | Vòng focus |
| `rounded-md` | 16px | Ô nhập, khối nhỏ trong mock |
| `rounded-lg` | 22px | Code card, cửa sổ mock |
| `rounded-xl` | 28px | **Panel**, thumb |
| `rounded-2xl` | 36px | Ảnh lớn, chân dung, form |
| `rounded-3xl` | 40px | Khối CTA cuối Home |
| `rounded-full` | — | Nút, chip, avatar, chấm |

- Viền: `border border-line` (1px) cho panel; `edge-bold` (1.5px) cho nút ghost, nút tròn, chọn ngôn ngữ, popover, ô nhập.
  - Lưu ý: utility 1.5px **không được** đặt tên bắt đầu bằng `border-` (tailwind-merge sẽ coi là màu viền và xoá mất).
- Bóng: `shadow-pop` (popover), `shadow-float` (code card), `shadow-mock` (cửa sổ mock), `shadow-glow` (card dự án khi hover), `shadow-cta` (nút chính khi hover), `shadow-dot` (chấm hero).
- Đốm sáng trang trí: `glow-blob` + `opacity-16/20` + `blur-3xl` sau banner/CTA.

### Lớp z-index
`z-raised` 3 (header) · `z-dropdown` 10 (popover màu) · `z-modal` 70 (menu mobile) · `z-skip` 90 (skip link).

## 9. Icon

Lucide, nét 2px, cỡ 18px trong nút (`[&_svg]:size-4.5`). Dùng: mũi tên (→, ←, ↗), menu, đóng, khoá (dự án nội bộ), tải xuống. Không dùng logo thương hiệu vẽ tay; chip công nghệ là chữ.

## 10. Chuyển động

| Utility | Hiệu ứng | Ghi chú |
|---|---|---|
| `view` (trên `<main>`) | Con trực tiếp "rise" (mờ → rõ, trượt 22px) 0.75s, so le 60ms | Chạy mỗi lần vào trang |
| `anim-sway` | Đường cong hero xoay ±2° 16s | Trang trí |
| `anim-grow` | Đường dọc hero mọc từ trên xuống | 1.2s |
| `anim-bob` | Code card nhấp nhô 10px, 6s | |
| `anim-live` | Chấm "sẵn sàng" toả vòng | 2.4s |
| `anim-pop` | Popover bảng màu xuất hiện | 0.3s |
| `btn-motion` | Nút nâng 3px khi hover | |
| `project-card` | Card nâng 8px, thumb viền accent + glow, phần trong phóng 1.05, mũi tên bật lên | Chỉ trên thiết bị có hover |

Đường cong duy nhất `--ease-out: cubic-bezier(.2,.7,.2,1)`. Đổi bảng màu chuyển nền/chữ trong 0.45s. `prefers-reduced-motion: reduce` → mọi animation/transition gần như tức thì.

## 11. Trạng thái tương tác

| Phần tử | Hover | Focus (bàn phím) | Đang chọn |
|---|---|---|---|
| Link nav | chữ → `fg`, gạch dưới 50% | vòng 3px `accent-text`, offset 3px | `aria-current`, gạch dưới 100% |
| Nút chính (`btn-main`) | nâng 3px + `shadow-cta` (giữ đúng như mockup — chủ dự án đã duyệt) | vòng focus | — |
| Nút ghost (`btn-ghost`) | nâng 3px, viền → `accent`, nền `accent-soft`, quầng `--p-glow`; mũi tên trượt theo hướng (→ sang phải, ← sang trái). **Không** đảo màu toàn bộ (v2.1, theo phản hồi "chỉ sáng lên") | vòng focus | — |
| Nút tròn (`icon-btn`) / chip link | viền `accent` + nền `accent-soft`; nút tròn xoay 14°, chip nâng 2px | vòng focus | — |
| Chip lọc | viền `accent`, nâng 2px | vòng focus | `aria-pressed="true"` → nền `accent` |
| Panel | viền `line-strong` (`panel-row`: viền `accent`) | — | — |
| Card dự án | xem §10 | vòng focus quanh **cả card** | — |
| Ô nhập | — | viền `accent` + quầng `--p-glow` 3px | — |

Vùng chạm tối thiểu 44px (`tap-target`, `min-h-11`).

## 12. Hình ảnh

- Ảnh chân dung: `/public/assets/images/profile/avatar.webp`, tỉ lệ 4:5, `next/image`. Cắt tròn (`Avatar`, căn `object-top`) để dùng ở header, menu mobile, footer — thay cho chữ cái "V" (vẫn là fallback khi không có ảnh).
- Thumbnail dự án: dùng `cover` (16:10, 1600×1000) nếu có; không có → **minh hoạ trừu tượng** `ProjectThumb` theo `tint-N`/`key-N`. Dự án PRIVATE chỉ được dùng **minh hoạ chung**, không ảnh chụp hệ thống.
- Trang chi tiết: ảnh bìa lớn → khối "Video giới thiệu" (`<video controls preload="metadata">`, không tự phát) → các khối nội dung → "Hình ảnh" (`screenshots` + chú thích). Video và screenshots **chỉ dành cho PUBLIC** (schema chặn).
- Card có video hiện nhãn "▶ Video" ở góc dưới trái ảnh.
- Ảnh/video mẫu hiện tại có nhãn "ẢNH MẪU" — phải thay trước khi public (xem CONTENT_GUIDE §2).

## 13. Kiểm soát thay đổi

Mọi thay đổi token, font, màu, bảng màu, layout pattern → cập nhật tài liệu này + `COMPONENT_GUIDELINES.md` + ghi vào ROADMAP, và được chủ dự án duyệt trước khi merge.
