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

## Design System (bắt buộc)
- Token gốc: `src/styles/tokens.css`; utilities layout/bento: `src/app/globals.css`.
- Chỉ dùng class token ngữ nghĩa (`bg-surface`, `text-fg-muted`, `text-h1`, `bento-2x2`…). Không hex thô, không palette mặc định (đã bị reset), không giá trị tuỳ ý (`p-[13px]`).
- Tái sử dụng/mở rộng component trong `src/components/{ui,bento,layout}`; không tạo bản gần trùng. Cập nhật catalog khi thêm.
- Không thêm token, font, màu, layout pattern hay phong cách mới khi chưa có lý do + chủ dự án duyệt + cập nhật tài liệu.
- Mỗi thay đổi UI: kiểm tra 2 theme, 2 ngôn ngữ, breakpoint 360–1440, trạng thái empty/error/unconfigured, audit (UI_UX §12).

## Quy ước code
- TypeScript strict, không `any` nếu không có lý do. ESLint + Prettier sạch.
- Component PascalCase, mỗi file một component; route và slug dạng kebab-case; `cn()` + `cva` cho variant.

## Bảo mật & bảo mật thông tin
- Không bịa thông tin cá nhân; dùng `[PLACEHOLDER]`.
- Không lộ mã nguồn công ty cũ, credentials, host/URL nội bộ, dữ liệu khách hàng/nhân viên, kiến trúc mật, ảnh chụp chưa được phép. Dự án `PRIVATE`/`CONFIDENTIAL` theo `Docs/CONTENT_GUIDE.md` §3.
- `.claude/settings*.json` chứa dữ liệu từ dự án cũ → không commit/publish khi chưa làm sạch.
- Secret chỉ ở server qua env; không dùng `NEXT_PUBLIC_*`, không commit. Link ngoài dùng `rel="noopener noreferrer"`.

## Kiểm thử & báo cáo
- Chạy typecheck, lint, test, build trước khi báo hoàn thành. Ghi kết quả thật vào `Docs/TESTING.md` (chỉ PASS khi đã xác minh).
- Không khẳng định deploy, HTTPS, DNS, email hoạt động khi chưa xác minh.

## Duy trì tài liệu
- Cập nhật ARCHITECTURE / DESIGN_SYSTEM / CONTENT_GUIDE / DEPLOYMENT / ROADMAP ngay trong cùng milestone với thay đổi.

## An toàn khi deploy
- Không chạy lệnh phá huỷ (rm, prune, force push, xoá cert, thay đổi server từ xa) khi chưa được phép rõ ràng.
