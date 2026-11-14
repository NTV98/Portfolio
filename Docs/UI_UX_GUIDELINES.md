# Hướng dẫn UI/UX

> **Trạng thái:** BẢN NHÁP v0.2 — chờ phê duyệt. Bổ sung cho [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) (token, hình thức) và [COMPONENT_GUIDELINES.md](COMPONENT_GUIDELINES.md) (khối xây dựng).

## 1. Đối tượng & nhiệm vụ chính

| Đối tượng | Mục tiêu | Phải đến được trong ≤ 2 click từ Home |
|---|---|---|
| Nhà tuyển dụng | Đánh giá mức phù hợp nhanh | Resume, tải CV, Experience, Contact |
| Khách hàng tiềm năng | Tin tưởng & năng lực | Projects, Contact |
| Developer | Khám phá dự án & kiến thức | Projects (link GitHub), Blog |

Màn hình đầu tiên của Home phải trả lời: **ai** (tên + chức danh), **làm gì** (giá trị trong 1 dòng), **hành động tiếp theo** (Xem dự án / Liên hệ / Tải CV).

## 2. Điều hướng

- Header (sticky, 64px): logo/tên → Home · Projects · Experience · Blog · About · Contact. Resume truy cập qua CTA "Resume" trên header và từ Home.
- Skills truy cập từ About và Resume (giữ menu chính ≤ 6 mục).
- Bên phải: chuyển ngôn ngữ (nút chữ VI/EN, không dùng dropdown) · chuyển theme (vòng system/sáng/tối).
- Điện thoại & tablet dọc (< 768px): nút menu → `<dialog>` toàn màn hình, khoá focus, Esc để đóng, khoá cuộn trang, tự đóng khi đổi trang.
- Tablet (768–1023px): nếu menu chữ không vừa (VI dài hơn) → dùng menu như mobile. Quyết định bằng kiểm thử thực tế, không cắt chữ.
- Trang hiện tại: `aria-current="page"` + chữ màu `accent`.
- Footer: tagline ngắn, mạng xã hội, điều hướng phụ (Resume, Skills, Privacy), bản quyền.
- Link "Bỏ qua đến nội dung" là phần tử focus đầu tiên.

## 3. Khung trang chuẩn

Mọi trang theo cấu trúc:
```
PageHeader   eyebrow (mono) · h1 · lead (tuỳ chọn, ≤ 2 dòng) · actions (tuỳ chọn)
Sections     Section → eyebrow + h2 → nội dung (grid / list / prose)
CTA band     tuỳ chọn, cuối trang (Liên hệ)
```
Mỗi trang đúng một `h1`. Không nhảy cấp heading.

## 4. Mật độ nội dung

- Card: eyebrow, tiêu đề (≤ 2 dòng), mô tả (≤ 3 dòng), tối đa 4 tag (chip `+N` cho phần còn lại), một CTA.
- Danh sách: **nổi bật trước**, sau đó mới nhất trước.
- Đoạn văn ≤ 4–5 dòng trên desktop; dài hơn thì tách.
- Ưu tiên dữ liệu thật. Section không có nội dung → ẩn (hoặc empty state ở trang chính), không bao giờ lấp bằng lorem ipsum ở production.

## 5. Trạng thái (mọi view dựa trên dữ liệu)

| Trạng thái | Hành vi |
|---|---|
| Loading | Hầu như không có (SSG). Bộ lọc client tức thì; gửi form liên hệ dùng trạng thái loading của nút. |
| Rỗng (empty) | `EmptyState`: icon, tiêu đề 1 dòng, gợi ý 1 dòng, hành động tuỳ chọn. Blog rỗng → "Bài viết sắp ra mắt" + link GitHub/Projects. |
| Không có kết quả (tìm/lọc) | Hiển thị từ khoá, số kết quả = 0, nút "Xoá bộ lọc". |
| Lỗi | `ErrorState`, có nút thử lại nếu được. Lỗi form liên hệ giữ nguyên dữ liệu đã nhập. |
| Chưa cấu hình | Thiếu CV → thay nút bằng ghi chú "CV gửi theo yêu cầu" + link Liên hệ (không nút chết). Thiếu URL GitHub/demo → không render link. |
| Nội dung placeholder | Hiển thị badge `[PLACEHOLDER]` ở môi trường dev; **build production thất bại** nếu còn placeholder (bật bằng cờ). |

## 6. Form (Liên hệ)

- Trường: Họ tên, Email, Chủ đề (tuỳ chọn), Nội dung. Nhãn luôn hiển thị (không dùng placeholder thay nhãn).
- Validate khi blur + khi submit (schema Zod dùng chung client/server). Thông báo lỗi dưới trường, gắn `aria-describedby`.
- Gửi → loading → **chỉ báo thành công khi server xác nhận** → panel thành công thay form, có link "Gửi tin khác".
- Thất bại → banner lỗi + link mailto dự phòng; giữ nguyên dữ liệu.
- Chưa cấu hình provider → thay form bằng card mailto (email, nút copy). Không bao giờ có form "gửi" mà thực ra không làm gì.
- Chống spam: trường honeypot ẩn + thời gian điền tối thiểu + giới hạn tần suất phía server.

## 7. Tìm kiếm & bộ lọc (Projects, Blog)

- Ô tìm kiếm + chip lọc (loại dự án hoặc tag). Lọc tức thì phía client.
- Trạng thái lưu trên URL (`?q=&type=`) để chia sẻ được và nút Back hoạt động đúng.
- Số kết quả được đọc cho screen reader qua `aria-live="polite"`.
- Chip là nút bật/tắt (`aria-pressed`). "Tất cả" để reset.
- Trên điện thoại: hàng chip cuộn ngang trong khung riêng (không làm trang cuộn ngang) hoặc xuống dòng.

## 8. Link & nút

- Button = hành động; Link = điều hướng. Không bao giờ dùng `<div>` giả làm nút/link.
- Link ngoài: `target="_blank" rel="noopener noreferrer"` + chữ ẩn "(mở tab mới)" + icon `ArrowUpRight`.
- Chữ trên link phải có nghĩa ("Xem dự án: X"), không dùng "bấm vào đây".
- Không render nút khi không có `href`/handler hợp lệ.

## 9. Đa ngôn ngữ (UX)

- URL: `/vi/...`, `/en/...`. Chuyển ngôn ngữ giữ nguyên trang hiện tại (`/vi/projects/x` ↔ `/en/projects/x`).
- `<html lang>` khớp ngôn ngữ. Ngày tháng qua `Intl.DateTimeFormat(locale)`: VI `14 thg 11, 2026`, EN `Nov 14, 2026`.
- Layout chịu được chữ VI dài hơn ~30%: không nút cố định độ rộng, không heading bắt buộc một dòng.
- Thiếu bản dịch: dùng ngôn ngữ còn lại + gắn `lang` cho phần tử đó; không bao giờ hiện key thô.
- Nội dung về bản thân / dự án công ty: người thật viết cho từng ngôn ngữ — không dịch máy khi chưa được duyệt.

## 10. Accessibility tối thiểu (WCAG 2.2 AA)

- Bàn phím: mọi hành động đều truy cập được, thứ tự tab hợp lý, focus luôn thấy, không bẫy focus (trừ modal).
- Độ tương phản theo DESIGN_SYSTEM §3 (chữ ≥ 4.5:1).
- Landmark: `header`, `nav` (có nhãn), `main#content`, `footer`.
- Ảnh có alt ý nghĩa; alt avatar = họ tên.
- Tôn trọng `prefers-reduced-motion`.
- Vùng chạm ≥ 44px; khoảng cách giữa hai vùng chạm ≥ 8px.
- Form: nhãn, `aria-invalid`, focus vào tóm tắt lỗi khi submit thất bại.
- Chỉ dùng ARIA khi HTML gốc không diễn đạt được.

## 11. Checklist responsive (mỗi trang)

- [ ] Kiểm tra ở 360 / 390 / 768 / 1024 / 1280 / 1440px, cả 2 theme, cả 2 ngôn ngữ.
- [ ] Không cuộn ngang (`document.documentElement.scrollWidth <= innerWidth`).
- [ ] Không chữ/dấu tiếng Việt bị cắt; từ/URL dài tự xuống dòng.
- [ ] Hàng bento khép kín ở tablet và desktop; thứ tự trên mobile có nghĩa.
- [ ] Menu mobile dùng được; vùng chạm ≥ 44px.
- [ ] Ảnh giữ tỷ lệ; không CLS.
- [ ] Xoay ngang điện thoại vẫn dùng được (safe area, header không che nội dung).

## 12. Audit tính nhất quán (trước khi đánh dấu xong một tính năng UI)

- [ ] Chỉ dùng token ngữ nghĩa (grep `#`, `[`, class palette trong `className`).
- [ ] Đã tái sử dụng component chung; không có bản gần trùng.
- [ ] Khoảng cách theo thang cho phép; nhịp section giống các trang khác.
- [ ] Đã kiểm tra sáng + tối.
- [ ] Đã kiểm tra VI + EN.
- [ ] Có trạng thái empty/error/unconfigured.
- [ ] Đã cập nhật tài liệu nếu quy ước thay đổi.
