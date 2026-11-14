# Kiểm thử

> Trạng thái: **PASS** đã xác minh · **FAIL** đã test và lỗi · **NOT TESTED** chưa test · **BLOCKED** cần truy cập/cấu hình bên ngoài · **N/A** không áp dụng
> Không bao giờ đánh PASS chỉ dựa trên code được sinh ra hay giả định. Ghi lệnh, ngày, môi trường.

## 1. Lệnh (dự kiến)

| Lệnh | Mục đích |
|---|---|
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run test` | Vitest unit/component |
| `npm run test:e2e` | Playwright (chạy trên `next start`) kèm axe |
| `npm run build` | Build production (+ validate nội dung) |
| `npx lighthouse <url> --preset=desktop` / mobile | Đo Lighthouse |

## 2. Checklist nghiệm thu

### A. Sản phẩm
| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| Mọi trang đã thống nhất hiển thị đúng | NOT TESTED | |
| Điều hướng hoạt động | NOT TESTED | |
| Hiển thị dự án | NOT TESTED | |
| Tìm kiếm & lọc dự án | NOT TESTED | |
| Trang chi tiết dự án | NOT TESTED | |
| Link GitHub/demo (khi có cấu hình) | NOT TESTED | |
| Tải CV (khi có cấu hình) | NOT TESTED | |
| Blog render MDX + highlight | NOT TESTED | |
| Liên hệ: validate / thành công / lỗi / dự phòng | NOT TESTED | |
| VI + EN | NOT TESTED | |
| 404 | NOT TESTED | |

### B. Thiết kế
| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| Nhất quán phong cách Minimalist + Bento | NOT TESTED | |
| Token tập trung (không giá trị thô) | NOT TESTED | Tailwind đã reset palette (xem bên dưới) |
| Sáng & tối | NOT TESTED | |
| Responsive 360–1920, không cuộn ngang | NOT TESTED | |
| Trạng thái tương tác accessible | NOT TESTED | |
| Tài liệu thiết kế đầy đủ | NOT TESTED | Có bản nháp, chờ duyệt |
| README + CLAUDE.md có hướng dẫn tuân thủ | NOT TESTED | Có bản nháp |

### C. Kỹ thuật
| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| Build production | NOT TESTED | |
| TypeScript | NOT TESTED | |
| Lint | NOT TESTED | |
| Không lỗi runtime nghiêm trọng | NOT TESTED | |
| Không route nội bộ hỏng | NOT TESTED | |
| Không lộ secret | NOT TESTED | |
| SEO metadata | NOT TESTED | |
| Đã đo Lighthouse | NOT TESTED | |

### D. VPS
| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| Build được Docker image | NOT TESTED | |
| Compose khởi động app | NOT TESTED | |
| Health check pass | NOT TESTED | |
| Nginx reverse proxy | NOT TESTED | |
| HTTPS | BLOCKED | Cần tên miền + VPS |
| DNS phân giải đúng | BLOCKED | Cần tên miền |
| Restart policy | NOT TESTED | |
| Xem được log | NOT TESTED | |
| Hướng dẫn tái lập được | NOT TESTED | |
| Có tài liệu backup & rollback | NOT TESTED | Bản nháp trong DEPLOYMENT.md |

## 3. Nhật ký kết quả

| Ngày | Môi trường | Lệnh / kiểm tra | Kết quả |
|---|---|---|---|
| 2026-11-14 | Windows 11, Node 20.19, Tailwind CLI 4.3.5 (cài tạm trong scratchpad, không cài vào dự án) | Biên dịch `src/app/globals.css` + `src/styles/tokens.css` với HTML mẫu | PASS — biên dịch thành công; sinh đúng `text-h1`, `bento-*`, `eyebrow`, `bg-accent`, `grid-cards`, `max-w-measure`, `card-interactive`; `dark:` → `:where(.dark, .dark *)`; `bg-zinc-500`, `text-2xl` **không** được sinh (reset palette hoạt động); `@media` lồng nhau được làm phẳng khi `--minify` |
| 2026-11-14 | Node script | Tính độ tương phản WCAG cho palette | PASS — mọi token chữ ≥ 4.5:1 trên mọi bề mặt (sau khi chỉnh `fg-subtle` sáng thành `#6B6B74`) |

| 2026-11-14 | Windows 11, Node 20.19, Next 16.4 (UI v2 theo `Docs/DesignUI/`) | `npm run typecheck` | PASS |
| 2026-11-14 | như trên | `npm run lint` (đã loại `Docs/**` — mã vendor của mockup) | PASS — 0 lỗi, 0 cảnh báo |
| 2026-11-14 | như trên, chạy từ `C:\Projects\Portfolio` | `npm run test` (Vitest) | PASS — 4 file, 21 test (format, i18n cùng bộ khoá, visibility dự án, logic UI mới: `buildMailto`, bảng màu, highlights, dự án trước/sau). **Lưu ý:** mở terminal ở `c:\` (chữ thường) làm Vitest lỗi "reading 'config'" — lỗi môi trường Windows, không phải code. |
| 2026-11-14 | như trên | `npm run build` | PASS — mọi trang SSG cho `vi` + `en` |
| 2026-11-14 | Playwright Chromium trên `next start` | `npx playwright test` | PASS — 19/19: redirect theo ngôn ngữ, 1 `h1` + `lang` đúng ở 20 trang, đổi ngôn ngữ giữ đường dẫn, 404 có khung trang, mọi link nội bộ hợp lệ, bảng màu áp dụng + giữ sau reload + Esc đóng popover, chip lọc + URL `?f=`, dự án PRIVATE không có link repo, link ngoài an toàn, CV/email chưa cấu hình hiển thị trung thực, blog rỗng, không cuộn ngang ở 360/768/1280, menu mobile, axe WCAG 2.2 AA ở chế độ sáng + tối (đo với `reducedMotion: reduce` để không bắt khung giữa animation). |
| 2026-11-14 | Node script | Tương phản WCAG 6 bảng màu | PASS — mọi cặp chữ ≥ 5.2:1 (DESIGN_SYSTEM §3.2) |
| 2026-11-14 | Chụp màn hình Playwright 1440/390px (violet, light, teal, orange) | So sánh trực quan với mockup | Khớp bố cục; đã sửa lỗi viền nút ghost bị `tailwind-merge` xoá (`border-bold` → `edge-bold`). Chờ chủ dự án duyệt. |

Chưa đo Lighthouse cho UI v2.
