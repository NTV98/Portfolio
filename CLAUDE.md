# CLAUDE.md — Chỉ dẫn cố định cho Claude Code

Portfolio cá nhân song ngữ (VI/EN), Next.js App Router + TypeScript + Tailwind v4, ưu tiên static, deploy bằng Docker/Nginx trên VPS. Brief gốc: `Docs/MASTER_PROMPT_PORTFOLIO.md`. Tiến độ & bước tiếp theo: `Docs/ROADMAP.md`.

## Ngôn ngữ tài liệu (bắt buộc)
- **Mọi file `.md` của dự án (README, CLAUDE.md, `Docs/*.md`) phải viết bằng tiếng Việt** để chủ dự án đọc và duyệt.
- Giữ nguyên tiếng Anh cho: thuật ngữ kỹ thuật, tên file/thư mục, code, class, lệnh, tên biến/token.
- Comment trong file code (`.ts`, `.tsx`, `.css`) có thể viết tiếng Anh.

## Trước khi thay đổi
- Đọc `README.md` và các tài liệu liên quan. **Mọi thay đổi UI phải đọc trước `Docs/DESIGN_SYSTEM.md`, `Docs/UI_UX_GUIDELINES.md`, `Docs/COMPONENT_GUIDELINES.md`.**
- Khảo sát code hiện có trước khi sửa; không ghi đè hoặc xoá âm thầm.
- Giai đoạn hiện tại cần chủ dự án phê duyệt trước khi triển khai lớn (xem ROADMAP).

## Kiến trúc
- Mặc định Server Components; `"use client"` chỉ ở component lá có tương tác.
- SSG tối đa (`generateStaticParams` + `setRequestLocale`). Không database, không backend riêng.
- Nội dung chỉ nằm ở `src/config`, `src/data`, `src/content/blog`, `src/messages`. Không hard-code nội dung trong component.
- Validate nội dung bằng Zod (`src/lib/content`). Quy tắc hiển thị dự án (visibility) chỉ nằm trong selector.

## Design System (bắt buộc) — v2.0 theo `Docs/DesignUI/`
- Thiết kế gốc của chủ dự án: `Docs/DesignUI/Portfolio-html/Main.dc.html` (+ PDF). Chỉ là **tham chiếu** — tái hiện bằng token/component, không copy markup hay inline style.
- Token gốc: `src/styles/tokens.css` (6 bảng màu qua `<html data-palette>`: violet, light, blue, teal, orange, pink); utility/component class: `src/app/globals.css`.
- Chỉ dùng class token ngữ nghĩa (`bg-surface`, `text-fg-muted`, `text-accent-text`, `text-h1`, `panel`, `chip`, `grid-fit-md`…). Không hex thô, không palette mặc định (đã bị reset), không giá trị tuỳ ý (`p-[13px]`, `h-[clamp(…)]`) — cần giá trị mới thì thêm utility có tên + ghi tài liệu.
- Màu nhấn dạng **chữ** dùng `text-accent-text`; `accent` chỉ dùng làm nền/viền/chấm.
- Font: Be Vietnam Pro (thay Poppins vì Poppins không có subset tiếng Việt) + JetBrains Mono.
- Tái sử dụng/mở rộng component trong `src/components/{ui,layout}` trước; không tạo bản gần trùng. Cập nhật catalog (COMPONENT_GUIDELINES §3) khi thêm.
- Không thêm token, font, màu, bảng màu, layout pattern hay phong cách mới khi chưa có lý do + chủ dự án duyệt + cập nhật tài liệu.
- Mỗi thay đổi UI: kiểm tra bảng màu tối + sáng, 2 ngôn ngữ, 360–1440px, trạng thái empty/unconfigured, audit (UI_UX §12).
- Giao diện và giao tiếp với chủ dự án **ưu tiên tiếng Việt**.

## Quy ước code
- TypeScript strict, không `any` nếu không có lý do. ESLint + Prettier sạch.
- Component PascalCase, mỗi file một component; route và slug dạng kebab-case; `cn()` + `cva` cho variant.

## Bảo mật & bảo mật thông tin
- Không bịa thông tin cá nhân; dùng `[PLACEHOLDER]`. Ngoại lệ: khi chủ dự án yêu cầu nội dung mẫu để xem bố cục → đánh dấu `@sample` (CONTENT_GUIDE §2); `STRICT_CONTENT=true npm run check:content` phải sạch trước khi public.
- Video và ảnh chụp màn hình chỉ cho dự án `PUBLIC` (schema đã chặn); dự án công ty chỉ dùng minh hoạ chung.
- Không lộ mã nguồn công ty cũ, credentials, host/URL nội bộ, dữ liệu khách hàng/nhân viên, kiến trúc mật, ảnh chụp chưa được phép. Dự án `PRIVATE`/`CONFIDENTIAL` theo `Docs/CONTENT_GUIDE.md` §3.
- `.claude/settings*.json` chứa dữ liệu từ dự án cũ → không commit/publish khi chưa làm sạch.
- Secret chỉ ở server qua env; không dùng `NEXT_PUBLIC_*`, không commit. Link ngoài dùng `rel="noopener noreferrer"`.

## Kiểm thử & báo cáo
- Chạy typecheck, lint, test, build (+ `npm run test:e2e` cho thay đổi UI) trước khi báo hoàn thành. Trên Windows chạy từ đường dẫn `C:\Projects\Portfolio` (chữ **C hoa**) — mở bằng `c:\` thường làm Vitest lỗi "Cannot read properties of undefined (reading 'config')". Ghi kết quả thật vào `Docs/TESTING.md` (chỉ PASS khi đã xác minh).
- Không khẳng định deploy, HTTPS, DNS, email hoạt động khi chưa xác minh.

## Duy trì tài liệu
- Cập nhật ARCHITECTURE / DESIGN_SYSTEM / CONTENT_GUIDE / DEPLOYMENT / ROADMAP ngay trong cùng milestone với thay đổi.

## An toàn khi deploy
- Không chạy lệnh phá huỷ (rm, prune, force push, xoá cert, thay đổi server từ xa) khi chưa được phép rõ ràng.
