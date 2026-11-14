# Hướng dẫn UI/UX

> **Trạng thái:** v2.1 (2026-11-14) — theo thiết kế `Docs/DesignUI/`. Bổ sung cho [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) (token, hình thức) và [COMPONENT_GUIDELINES.md](COMPONENT_GUIDELINES.md) (khối xây dựng).

## 1. Đối tượng & nhiệm vụ chính

| Đối tượng | Mục tiêu | Phải đến được trong ≤ 2 click từ Home |
|---|---|---|
| Nhà tuyển dụng | Đánh giá mức phù hợp nhanh | Experience, Skills, Contact, Resume (footer) |
| Khách hàng tiềm năng | Tin tưởng & năng lực | Dịch vụ (Home), Projects, Contact |
| Developer | Khám phá dự án & kiến thức | Projects (lọc mã nguồn mở), Blog (footer) |

Màn hình đầu tiên của Home phải trả lời: **ai** ("Xin chào, mình là …"), **làm gì** (chức danh + 1 câu giới thiệu), **hành động tiếp theo** ("Xem dự án" / "Liên hệ mình").

## 2. Điều hướng

- Header (không sticky): avatar tròn + tên → Trang chủ · Giới thiệu · Kỹ năng · Dự án · Kinh nghiệm · Liên hệ (đúng 6 mục như mockup).
- Bên phải: nút ngôn ngữ (nút tròn 44px hiện mã ngôn ngữ **sẽ chuyển sang**, vd "EN"; bấm là đổi, giữ nguyên trang) · bộ chọn màu (nút tròn → lưới 18 ô màu 6×3; trong menu mobile popover mở lên trên).
- Dưới 1024px: nút menu → `<dialog>` toàn màn hình (khoá focus, Esc để đóng, khoá cuộn, tự đóng khi đổi trang); VI/EN và bộ chọn màu nằm cuối menu.
- Trang hiện tại: `aria-current="page"` + gạch dưới đầy. Trang con (`/projects/x`) làm sáng mục cha.
- Footer: bản quyền + Dự án · Giới thiệu · Liên hệ · Blog · Resume · Quyền riêng tư (Blog/Resume/Privacy không có trên header).
- Link "Bỏ qua đến nội dung" là phần tử focus đầu tiên.

## 3. Khung trang chuẩn

```
PageHeader   eyebrow · h1 (rất lớn) · lead (tuỳ chọn) · actions (tuỳ chọn)
Sections     Section (nhịp 120px) → SectionHeader (eyebrow + h2 + nút ghost bên phải) → nội dung
```
Home có hero riêng. Mỗi trang đúng một `h1`, không nhảy cấp heading.

## 4. Mật độ nội dung

- Card dự án: danh mục, tiêu đề, dòng công nghệ (`A · B · C`), mũi tên. Không mô tả dài trên card.
- Danh sách dự án: **nổi bật trước**, sau đó theo `order`.
- Đoạn văn ≤ 4–5 dòng trên desktop; độ rộng tối đa 560–680px.
- Section không có dữ liệu → ẩn (Home) hoặc empty state (trang chính). Không lấp bằng nội dung giả ở production.

## 5. Trạng thái

| Trạng thái | Hành vi |
|---|---|
| Loading | Không có (SSG). Lọc phía client tức thì. |
| Rỗng | `EmptyState` (khung viền nét đứt): tiêu đề + gợi ý + hành động tuỳ chọn. |
| Lọc không có kết quả | Empty state + nút "Xem tất cả". |
| Chưa cấu hình | Thiếu CV → ghi chú "gửi theo yêu cầu" + nút Liên hệ. Email là placeholder → **ẩn form**, hiện thông báo "Form liên hệ chưa sẵn sàng", trường Email ghi "Chưa cập nhật". Thiếu số điện thoại/link mạng xã hội → không render dòng đó. |
| Placeholder | Chuỗi `[PLACEHOLDER]` hiển thị nguyên văn để chủ dự án thấy chỗ cần điền; `npm run check:content` liệt kê, `STRICT_CONTENT=true` làm build thất bại. |

## 6. Form liên hệ (mailto, chưa có backend)

- Trường: Họ và tên*, Email*, Bạn cần giúp gì?, Lời nhắn*. Nhãn luôn hiển thị phía trên ô.
- Validate bằng HTML gốc (`required`, `type="email"`).
- Bấm "Gửi lời nhắn" → mở ứng dụng email của người xem với tiêu đề + nội dung điền sẵn (`buildMailto`). Không có dữ liệu nào gửi về server; dòng gợi ý dưới nút nói rõ điều này.
- Không bao giờ hiển thị "đã gửi thành công" — vì trang không biết người xem có bấm gửi trong ứng dụng email hay không.
- Khi có backend (Giai đoạn 5): thay `onSubmit` bằng Server Action, thêm trạng thái loading/thành công/lỗi, honeypot, giới hạn tần suất.

## 7. Bộ lọc (Projects, Blog)

- Hàng chip: "Tất cả" + một chip cho mỗi loại đang có dữ liệu (dự án) hoặc tag (blog). Không có ô tìm kiếm (mockup không có).
- Chip là nút bật/tắt (`aria-pressed`), nằm trong `role="group"` có nhãn.
- Trạng thái lưu trên URL `?f=` (chia sẻ được, nút Back đúng). Home → "Xem mã nguồn mở" mở `/projects?f=OPEN_SOURCE`.
- Số kết quả đọc cho screen reader qua vùng `aria-live` ẩn.
- HTML tĩnh chứa toàn bộ danh sách → vẫn dùng được khi không có JS.

## 8. Link & nút

- Button = hành động; Link = điều hướng. Không dùng `<div>` giả làm nút.
- Mỗi section tối đa **1 nút chính** (`main`); hành động phụ dùng `ghost`.
- Link ngoài: `target="_blank" rel="noopener noreferrer"` + chữ ẩn "(mở tab mới)".
- Card dự án: cả card bấm được (stretched link trên tiêu đề), vòng focus bao cả card.
- Không render nút khi không có `href`/handler hợp lệ.

## 9. Đa ngôn ngữ

- Giao diện **ưu tiên tiếng Việt** (ngôn ngữ mặc định `vi`), giọng thân mật xưng "mình" như mockup. Bản tiếng Anh giữ nghĩa, giọng tự nhiên.
- URL `/vi/...`, `/en/...`; chuyển ngôn ngữ giữ nguyên trang; lựa chọn lưu cookie `locale`.
- `<html lang>` khớp ngôn ngữ; ngày tháng qua `Intl.DateTimeFormat`.
- Layout chịu được chữ VI dài hơn ~30%: không nút cố định độ rộng, không heading ép một dòng.
- Nội dung về bản thân / công ty: chủ dự án viết cho từng ngôn ngữ, không dịch máy khi chưa duyệt.

## 10. Accessibility (WCAG 2.2 AA)

- Bàn phím: mọi hành động truy cập được; focus luôn thấy (vòng 3px `accent-text`); popover màu đóng bằng Esc và trả focus về nút.
- Tương phản theo DESIGN_SYSTEM §3.2 (mọi bảng màu ≥ 4.5:1).
- Landmark: `header`, `nav` (có nhãn), `main#content`, `footer`. Section có `aria-labelledby` hoặc `aria-label`.
- Ảnh có alt ý nghĩa; hình trang trí (đường cong, thumb mock, đốm sáng) `aria-hidden`.
- `prefers-reduced-motion` tắt mọi chuyển động.
- Vùng chạm ≥ 44px.

## 11. Checklist responsive (mỗi trang)

- [ ] Kiểm tra ở 360 / 390 / 768 / 1024 / 1280 / 1440px, ít nhất 2 bảng màu (violet + light), cả 2 ngôn ngữ.
- [ ] Không cuộn ngang (`scrollWidth <= clientWidth`) — có E2E test.
- [ ] Không chữ/dấu tiếng Việt bị cắt; từ/URL dài tự xuống dòng.
- [ ] Menu mobile dùng được; vùng chạm ≥ 44px.
- [ ] Ảnh giữ tỉ lệ; không CLS.

## 12. Audit tính nhất quán (trước khi đánh dấu xong một tính năng UI)

- [ ] Chỉ dùng token ngữ nghĩa (grep `#`, `[`, class palette mặc định trong `className`).
- [ ] Tái sử dụng component chung; không có bản gần trùng.
- [ ] Nhịp section, padding panel giống các trang khác (DESIGN_SYSTEM §5).
- [ ] Kiểm tra bảng màu tối + sáng.
- [ ] Kiểm tra VI + EN.
- [ ] Có trạng thái empty / unconfigured.
- [ ] Đã cập nhật tài liệu nếu quy ước thay đổi.
