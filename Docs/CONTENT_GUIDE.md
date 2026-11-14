# Hướng dẫn nội dung

> **Trạng thái:** BẢN NHÁP — đường dẫn và trường dữ liệu là hợp đồng đề xuất; chốt khi triển khai Giai đoạn 3.

## 1. Nội dung nằm ở đâu

| Nội dung | File | Ghi chú |
|---|---|---|
| URL site, tên, ngôn ngữ mặc định, đường dẫn CV, chế độ liên hệ | `src/config/site.ts` | |
| Họ tên, chữ cái logo (`monogram`), chức danh, dòng hero (`headline`), giới thiệu, trạng thái sẵn sàng, địa điểm, avatar, tóm tắt kinh nghiệm, câu giới thiệu mã nguồn mở, các đoạn trang About | `src/config/profile.ts` | Văn bản `Localized` |
| Email, điện thoại/Zalo, GitHub, LinkedIn, Facebook | `src/config/social.ts` | Để `undefined` hoặc `[PLACEHOLDER]` ⇒ không hiển thị; email placeholder ⇒ ẩn form liên hệ |
| Điều hướng | `src/config/navigation.ts` | Nhãn lấy từ `src/messages/*.ts` |
| Dự án | `src/data/projects.ts` | Xem §3. Trường `outcome` (Kết quả) chỉ ghi số liệu/phản hồi thật |
| Kỹ năng | `src/data/skills.ts` | 4 nhóm `backend`, `frontend`, `tools`, `practices`; `tone` 1–6 = màu chấm; mục là chuỗi (tên công nghệ) hoặc `{ vi, en }` — **không có mức độ** |
| Code card hero, thẻ Công nghệ (Backend/Frontend), "Mình có thể giúp bạn", "Cách mình làm việc" | `src/data/highlights.ts` | Validate bằng Zod trong `src/lib/content/highlights.ts` |
| Kinh nghiệm | `src/data/experience.ts` | |
| Học vấn / chứng chỉ | `src/data/education.ts` | Hiển thị ở trang Kỹ năng ("Chứng chỉ và học tập") và Resume |
| Bài viết | `src/content/blog/<slug>/vi.mdx`, `en.mdx` | Một hoặc cả hai ngôn ngữ |
| Chữ giao diện | `src/messages/vi.ts`, `en.ts` | Chỉ chữ của giao diện; hai file phải cùng bộ khoá (có unit test) |
| Ảnh | `public/assets/images/{profile,projects/<slug>,og}` | Thumbnail dự án là minh hoạ tự sinh, không cần ảnh |
| CV | `public/assets/files/cv-vi.pdf`, `cv-en.pdf` | Thiếu file ⇒ trạng thái chưa cấu hình |

## 2. Placeholder

Hai loại nội dung chưa hoàn thiện:

| Loại | Cách đánh dấu | Khi nào dùng |
|---|---|---|
| Placeholder | chuỗi `"[PLACEHOLDER] mô tả ngắn"` (hiển thị nguyên văn) | Chưa có nội dung, cần nhắc chủ dự án điền |
| **Nội dung mẫu** | comment `// @sample` trên dòng/khối (hoặc trong JSDoc của file) | Chủ dự án yêu cầu điền sẵn nội dung giả để xem bố cục (2026-11-14) — văn bản, ảnh "ẢNH MẪU", video mẫu |

- `npm run check:content` liệt kê mọi `[PLACEHOLDER]` và `@sample`. Trước khi public, chạy với `STRICT_CONTENT=true` → **thất bại** nếu còn bất kỳ mục nào.
- Nội dung mẫu không dùng tên công ty/trường/chứng chỉ có thật; tên tổ chức dùng mô tả chung.
- Thay nội dung mẫu xong → xoá comment `@sample` tương ứng.
- Không bao giờ để thông tin bịa lên production.

### Ảnh, video dự án
- `cover` (16:10, 1600×1000, WebP) — hiển thị trên card và đầu trang chi tiết. Dự án PRIVATE: chỉ minh hoạ chung.
- `screenshots[]` và `video` (`{ src, type: "video/webm" | "video/mp4", poster, title }`) — **chỉ PUBLIC**. Đặt file ở `public/assets/images/projects/<slug>/` và `public/assets/videos/`. Video nên ≤ 10 MB, có poster.

### Liên hệ
- `social.email` có giá trị thật ⇒ form liên hệ (mailto) được bật.
- `social.zalo` = số điện thoại Zalo (vd `"0912345678"`) ⇒ hiện nút "Nhắn Zalo" (link `https://zalo.me/<số>`). `social.phone` ⇒ hiện số + link gọi.

## 3. Thêm một dự án

1. Quyết định **visibility**:
   - `PUBLIC` — dự án của bản thân / mã nguồn mở / đã được cho phép rõ ràng. Được có repo, demo, ảnh chụp, kiến trúc.
   - `PRIVATE` — dự án công ty được phép mô tả chung. Chỉ gồm: tiêu đề (chung chung nếu cần), lĩnh vực bài toán ở mức tổng quát, vai trò, trách nhiệm, công nghệ. **Không**: tên khách hàng (trừ khi được duyệt), tên hệ thống nội bộ, URL, số liệu, ảnh chụp, chi tiết kiến trúc.
   - `CONFIDENTIAL` — bị ẩn. `showGeneric: true` chỉ hiện một dòng chung (vd "Ứng dụng web nội bộ cho một khách hàng doanh nghiệp").
2. Thêm object vào `src/data/projects.ts` (schema ở PRD §5). Slug dạng kebab-case, ổn định.
3. Ảnh → `public/images/projects/<slug>/cover.webp` (16:10).
4. Viết cả `vi` và `en`; thiếu ngôn ngữ nào thì dùng `[PLACEHOLDER]` — không dịch máy nội dung về bản thân khi chưa duyệt.
5. Chạy `npm run check` (typecheck + lint + validate nội dung).

**Checklist bảo mật (dự án công ty):** không mã nguồn, không credential/host/URL, không dữ liệu khách hàng hay nhân viên, không tên hệ thống nội bộ, không ảnh chụp nếu chưa có cho phép bằng văn bản, không số liệu không thể xác minh công khai.

## 4. Thêm một bài viết

```mdx
---
title: "…"
description: "… (≤ 160 ký tự)"
date: "2026-11-14"
updated: "2026-11-20"   # tuỳ chọn
tags: ["dotnet", "architecture"]
draft: false
cover: "./images/cover.webp"  # tuỳ chọn
---
```
Code block: dùng fenced code kèm ngôn ngữ (```ts). Bài `draft: true` không xuất hiện ở build production.

## 5. Cập nhật CV

Thay `public/files/cv-<locale>.pdf`, giữ nguyên tên file. Resume online sinh từ `data/` — giữ hai nơi đồng bộ.

## 6. Thêm kinh nghiệm

Chỉ ghi tên tổ chức nếu được phép công khai; nếu không, dùng mô tả chung ("Công ty phần mềm, Hà Nội"). Đóng góp chỉ ghi khi xác minh được.
