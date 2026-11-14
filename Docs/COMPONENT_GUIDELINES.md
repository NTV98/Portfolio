# Hướng dẫn Component

> **Trạng thái:** v2.1 (2026-11-14) — catalog thực tế sau khi dựng lại UI theo `Docs/DesignUI/`. Quy tắc hình thức: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md). Quy tắc hành vi: [UI_UX_GUIDELINES.md](UI_UX_GUIDELINES.md).

## 1. Quy tắc

1. **Tái sử dụng trước khi tạo mới.** Tìm trong `src/components/` trước. Mở rộng bằng variant/prop, không sao chép.
2. **Mặc định Server Component.** Chỉ thêm `"use client"` khi cần state, effect, API trình duyệt hoặc event handler — và đẩy xuống component lá nhỏ nhất.
3. **Không chứa nội dung trong component.** Chữ giao diện từ `src/messages/{vi,en}.ts`; nội dung từ `src/config`, `src/data`, MDX.
4. **Style:** chỉ class token và utility trong `globals.css` (`panel`, `chip`, `eyebrow`, `grid-fit-*`…). Variant qua `cva`; gộp class qua `cn()`. Không `style` inline (ngoại lệ duy nhất: ô màu trong `PalettePicker`).
5. Utility mới **không** đặt tên trùng tiền tố nhóm của Tailwind (`border-`, `text-`, `bg-`, `shadow-`…) nếu không phải đúng nhóm đó — `tailwind-merge` sẽ xoá nhầm (bài học `border-bold` → `edge-bold`).
6. **Props:** có kiểu, tối giản, nhận `className` khi cần ghép layout.
7. **Accessibility là một phần API** (nhãn bắt buộc cho nút chỉ có icon, `aria-pressed` cho chip lọc…).
8. **Mỗi file một component**, tên file PascalCase. Phần con rất nhỏ có thể để cùng file.
9. Thêm component hoặc variant ⇒ cập nhật catalog bên dưới trong cùng thay đổi.

## 2. Cấu trúc thư mục

```
src/components/
  ui/          primitive — không biết gì về nghiệp vụ
  layout/      khung trang: header, footer, menu, chọn ngôn ngữ/màu, Primitives
  home/        chỉ dùng ở Home: HeroArt, CodeCard
  projects/    ProjectThumb, ProjectCard, ProjectGrid, ProjectExplorer, to-card
  experience/  ExperienceSummary, ExperienceList
  skills/      SkillGroups
  contact/     ContactForm, SocialLinks
  resume/      CvDownload
  blog/        PostCard (+PostMeta, PostGrid), PostExplorer, MdxContent, to-card
```
`ui/` không import từ thư mục nghiệp vụ. Thư mục nghiệp vụ được import `ui/` và `layout/`. `skills/` và `home` dùng chung bảng màu nhóm `keyBg` từ `projects/ProjectThumb`.

## 3. Catalog

### 3.1 Primitive (`ui/`)

| Component | Loại | Props | Ghi chú |
|---|---|---|---|
| `Button` | Server-safe | `variant: main \| ghost`, `size: sm (48px) \| md (52px) \| lg (56px)`, `href?`, `external?`, `download?`, `icon?` (sau chữ), `iconStart?` (trước chữ) | Pill (`btn-main` / `btn-ghost`). Ghost hover: viền + nền `accent-soft`, icon trượt theo hướng. Có `href` → `Link`/`<a>`. |
| `Avatar` | Server | `size: sm (40px) \| md (56px)`, `alt?` | Ảnh tròn từ `profile.avatar`; fallback chữ cái `monogram`. Dùng ở header, menu mobile, footer. |
| `Chip`, `ChipList` | Server | `items: string[]` | Chip tĩnh (công nghệ, kỹ năng). `ChipList` không render gì khi rỗng. |
| `FilterChips` + `useUrlFilter` | Client | `value`, `options`, `allLabel`, `label`, `onChange` | Nhóm chip bật/tắt, đồng bộ `?f=`. |
| `Eyebrow` | Server | — | Utility `eyebrow`. |
| `EmptyState` | Server | `title`, `description?`, `action?` | Khung viền nét đứt. |
| `TextLink` | Server | `external?`, `newTabLabel?` | Link chữ phụ (muted → fg), vd "← Tất cả dự án". |

Class CSS dùng trực tiếp (không cần component): `panel`, `panel-row`, `chip`, `chip-button`, `chip-link`, `field`, `nav-link`, `icon-btn`, `swatch`, `swatch-btn`, `label-cat`, `edge-bold`, `btn-main`, `btn-ghost`, `glow-blob`, `stretched-link`.

**Không có ở v1 (YAGNI):** tooltip, tabs, toast, carousel, dropdown menu, skeleton, ô tìm kiếm.

### 3.2 Layout (`layout/`)

| Component | Ghi chú |
|---|---|
| `Container` | `size: page \| prose` |
| `PageHeader` | eyebrow · h1 · lead · actions; `page-top pb-14` |
| `SectionHeader` | eyebrow + h2 (có `id`) + action bên phải |
| `Section` | `container-page` + `section-gap`; `first` bỏ khoảng trên; `labelledBy` hoặc `label` |
| `SkipLink` | Phần tử focus đầu tiên |
| `SiteHeader` (+`brandName()`) | Logo chữ cái, nav, VI/EN, bộ chọn màu; menu dialog dưới `lg` |
| `NavLinks` | Client — `aria-current`, `layout: row \| stack` |
| `MobileNav` | Client — `<dialog>` toàn màn hình |
| `LocaleSwitcher` | Client — nút tròn (`icon-btn`) hiện ngôn ngữ đích, giữ đường dẫn, ghi cookie |
| `PalettePicker` | Client — nút tròn + popover lưới 18 màu; `placement: header \| menu`; Esc/click ngoài để đóng; **tạm thời** log lựa chọn ra console |
| `SiteFooter` | Bản quyền + `footerNav` |
| `theme.ts` | `palettes`, `isPalette`, `paletteSwatch`, `paletteBg`, `themeScript` |

### 3.3 Nghiệp vụ

| Component | Nguồn dữ liệu | Ghi chú |
|---|---|---|
| `HeroArt` | — | SVG 40 đường bezier, tính 1 lần phía server, `anim-sway` |
| `CodeCard` | `data/highlights.ts → codeCard` | Luôn tối (`code-*`), `anim-bob` |
| `ProjectThumb` | `tone` 1–6, `image?`, `badge?`, `priority?` | Ảnh bìa nếu có, không thì cửa sổ mock trừu tượng; `size: sm \| md \| lg` |
| `ProjectCard` | `ProjectCardData` (`to-card.ts`) | Ảnh bìa, danh mục, tiêu đề, mô tả ngắn (2 dòng), stack, nhãn "Video"; cả card là link (trừ CONFIDENTIAL) |
| `ProjectGrid` | — | `variant: featured` (3 cột nhỏ) \| `list` (2 cột lớn, so le) |
| `ProjectExplorer` | client | Chip lọc + lưới + empty state |
| `ExperienceSummary` | `Experience[]` | Danh sách rút gọn ở Home |
| `ExperienceList` | `Experience[]` | Panel đầy đủ (Experience, Resume) |
| `SkillGroups` | `skillGroups` (đã parse) | Panel có chấm màu nhóm |
| `ContactForm` (+`buildMailto`) | client | Soạn email qua `mailto:`; chỉ render khi email đã cấu hình |
| `SocialLinks` (+`getPublicEmail`, `getPublicPhone`, `getZaloHref`, `getSocialLinks`) | `config/social.ts` | Chip hover viền accent; bỏ qua giá trị trống/placeholder; Zalo → `https://zalo.me/<số>` |
| `CvDownload` | `site.cv` | Nút tải hoặc ghi chú "gửi theo yêu cầu" |
| `PostCard`, `PostMeta`, `PostGrid`, `PostExplorer`, `MdxContent` | bài viết MDX | Code block luôn dùng giao diện code tối |

## 4. Ví dụ — hình dạng mong đợi

```tsx
<Section labelledBy="stack-title">
  <SectionHeader
    id="stack-title"
    eyebrow={t.home.stackEyebrow}
    title={t.home.stackTitle}
    action={<Button href={localePath(locale, "/skills")} variant="ghost" size="sm">{t.home.allSkills}</Button>}
  />
  <ul className="grid-fit-xl gap-6">
    <li className="panel flex flex-col gap-5.5 p-9">…</li>
  </ul>
</Section>
```

## 5. Định nghĩa hoàn thành (component)

- [ ] Chỉ dùng token; đã kiểm tra bảng màu tối + sáng.
- [ ] Đã kiểm tra bàn phím + screen reader (nhãn, `aria-*`).
- [ ] Xử lý chữ VI dài và dữ liệu tuỳ chọn bị thiếu.
- [ ] Đã cập nhật catalog.
- [ ] Có unit test nếu chứa logic (vd `buildMailto`, `getAdjacentProjects`, `isPalette` — `tests/unit/ui-logic.test.ts`).
