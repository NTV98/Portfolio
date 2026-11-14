# Hướng dẫn nội dung

> **Trạng thái:** BẢN NHÁP — đường dẫn và trường dữ liệu là hợp đồng đề xuất; chốt khi triển khai Giai đoạn 3.

## 1. Nội dung nằm ở đâu

| Nội dung | File | Ghi chú |
|---|---|---|
| URL site, tên, ngôn ngữ mặc định, đường dẫn CV, chế độ liên hệ | `src/config/site.ts` | |
| Họ tên, chức danh, giới thiệu, avatar, địa điểm, trạng thái sẵn sàng | `src/config/profile.ts` | Văn bản `Localized` |
| Email & mạng xã hội | `src/config/social.ts` | Chỉ link đã cấu hình mới hiển thị |
| Điều hướng | `src/config/navigation.ts` | Nhãn lấy từ `messages/*.json` |
| Dự án | `src/data/projects.ts` | Xem §3 |
| Kỹ năng | `src/data/skills.ts` | Nhóm + tên + slug icon — **không có mức độ** |
| Kinh nghiệm | `src/data/experience.ts` | |
| Học vấn / chứng chỉ | `src/data/education.ts`, `certifications.ts` | |
| Bài viết | `src/content/blog/<slug>/vi.mdx`, `en.mdx` | Một hoặc cả hai ngôn ngữ |
| Chữ giao diện | `src/messages/vi.json`, `en.json` | Chỉ chữ của giao diện |
| Ảnh | `public/images/{profile,projects/<slug>,blog/<slug>}` | |
| CV | `public/files/cv-vi.pdf`, `cv-en.pdf` | Thiếu file ⇒ trạng thái chưa cấu hình |

## 2. Placeholder

Mọi thông tin chưa biết ghi dạng `"[PLACEHOLDER] mô tả ngắn"`. Placeholder hiện badge ở dev; build production với `STRICT_CONTENT=true` sẽ thất bại nếu còn placeholder. Không bao giờ thay placeholder bằng thông tin bịa.

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
