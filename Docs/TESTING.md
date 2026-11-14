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

Chưa kiểm tra hiển thị trên trình duyệt thật (chưa có ứng dụng) — sẽ làm ở Giai đoạn 1–2.
