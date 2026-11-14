# Hướng dẫn Component

> **Trạng thái:** BẢN NHÁP v0.2 — chờ phê duyệt. Quy tắc hình thức: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md). Quy tắc hành vi: [UI_UX_GUIDELINES.md](UI_UX_GUIDELINES.md).

## 1. Quy tắc

1. **Tái sử dụng trước khi tạo mới.** Tìm trong `src/components/` trước. Mở rộng bằng variant, không sao chép.
2. **Mặc định Server Component.** Chỉ thêm `"use client"` khi cần state, effect, API trình duyệt hoặc event handler — và đẩy xuống component lá nhỏ nhất.
3. **Không chứa nội dung trong component.** Chữ giao diện từ `messages/{vi,en}.json`; nội dung từ `src/data` / `src/config` / MDX.
4. **Style:** chỉ class token ngữ nghĩa và utility trong `globals.css` (`bento-*`, `container-*`, `section`, `eyebrow`…). Variant qua `cva`; gộp class qua `cn()` (`clsx` + `tailwind-merge`). Không `style` inline trừ khi truyền CSS variable.
5. **Props:** có kiểu, tối giản, primitive nào cũng nhận `className`. Đa hình chỉ khi cần (`href` → render `Link`).
6. **Accessibility là một phần API** (ví dụ `IconButton` bắt buộc `label`).
7. **Mỗi file một component**, tên file PascalCase = tên component. Phần con rất nhỏ có thể để cùng file.
8. Thêm component hoặc variant ⇒ thêm dòng vào catalog bên dưới trong cùng thay đổi.

## 2. Cấu trúc thư mục

```
src/components/
  ui/          primitive — không biết gì về nghiệp vụ
  bento/       BentoGrid, BentoCard
  layout/      SiteHeader, SiteFooter, MobileNav, ThemeToggle, LocaleSwitcher, SkipLink, PageHeader, Section, Container
  projects/    ProjectCard, ProjectGrid, ProjectFilters, ProjectMeta, ProjectLinks, RelatedProjects
  blog/        PostCard, PostList, PostFilters, PostMeta, MdxContent, TableOfContents (tuỳ chọn)
  experience/  Timeline, TimelineItem
  skills/      SkillGroup, TechIcon
  resume/      ResumeSection, CvDownload
  contact/     ContactForm, ContactFallback, SocialLinks
```
Quy tắc: `ui/` và `bento/` không được import từ thư mục nghiệp vụ. Thư mục nghiệp vụ được import `ui/`, `bento/`, `layout/`.

## 3. Catalog

### 3.1 Primitive (`ui/`)

| Component | Loại | Variant / props | Ghi chú |
|---|---|---|---|
| `Button` | Server-safe | `variant: primary \| secondary \| ghost`, `size: sm \| md`, `loading`, `href?` (thành link), `icon?` | Primary = nền accent. Tối đa 1 nút primary mỗi section. |
| `IconButton` | Server-safe | `label` (bắt buộc), `size` | Vùng chạm 44px (`tap-target`) |
| `TextLink` | Server | `external?` | Gạch chân khi hover; link ngoài tự thêm icon + rel |
| `Badge` | Server | `tone: neutral \| accent \| success \| warning` | Trạng thái (vd `In progress`, `Open source`) |
| `Tag` | Server | `interactive?`, `selected?` | Chip công nghệ/chủ đề; chỉ màu trung tính |
| `Card` | Server | `variant: default \| muted`, `interactive?`, `href?` | Bề mặt gốc; BentoCard & card nghiệp vụ dựa trên nó |
| `Eyebrow` | Server | `index?` | Nhãn mono in hoa, vd `02 / EXPERIENCE` (utility `eyebrow`) |
| `Heading` | Server | `level`, `size` | Tách cấp ngữ nghĩa khỏi cỡ hiển thị |
| `Input`, `Textarea` | Có thể client | `invalid`, `describedBy` | Luôn dùng trong `Field` |
| `Field` | Server | `label`, `hint`, `error`, `required` | Tự nối id/aria |
| `Dialog` | Client | bọc `<dialog>` gốc | Mobile nav; modal duy nhất ở v1 |
| `EmptyState` | Server | `icon`, `title`, `description`, `action?` | |
| `ErrorState` | Server | `title`, `description`, `retry?` | |
| `VisuallyHidden` | Server | — | Chữ chỉ dành cho screen reader |
| `Placeholder` | Server | — | Bọc nội dung placeholder, hiện badge ở dev |

**Không có ở v1 (YAGNI):** dropdown menu, tooltip, tabs, toast, carousel, skeleton. Chỉ thêm khi có nhu cầu thật + cập nhật tài liệu. Nếu cần widget phức tạp, ưu tiên primitive headless (Radix) style bằng token của dự án thay vì tự viết accessibility.

### 3.2 Bento (`bento/`)

| Component | Props | Ghi chú |
|---|---|---|
| `BentoGrid` | `layout?: "home" \| "about" \| "project"`, `children` | Dùng utility `bento` (1 → 2 → 4 cột) |
| `BentoCard` | `size: 1x1 \| 2x1 \| 1x2 \| 2x2 \| 4x1`, `variant: default \| muted \| accent`, `href?`, `eyebrow?`, `title?` | Map sang `bento-cell` + `bento-<size>`; có `href` → `card-interactive` + `stretched-link`; tối đa 1 `accent`/lưới |

### 3.3 Layout (`layout/`)

`Container` (`size: page | wide | prose` → `container-page/-wide/-prose`), `Section` (`id`, `eyebrow`, `title`, `action?` → utility `section`, `stack-title`), `PageHeader` (`page-top`), `SiteHeader` (`z-header`, `header-safe`), `SiteFooter`, `MobileNav` (client), `ThemeToggle` (client), `LocaleSwitcher` (client — cần pathname), `SkipLink` (`z-skip`).

### 3.4 Nghiệp vụ

| Component | Nguồn dữ liệu | Ghi chú |
|---|---|---|
| `ProjectCard` | `Project` | Ảnh bìa (fallback chữ viết tắt), badge loại, tiêu đề, tóm tắt, ≤ 4 tag, link chỉ khi đã cấu hình |
| `ProjectFilters` | client | Tìm kiếm + chip loại, đồng bộ URL |
| `ProjectLinks` | `Project` | Không render gì khi thiếu URL; PRIVATE/CONFIDENTIAL không bao giờ hiện repo |
| `PostCard`, `PostMeta` | frontmatter bài viết | Ngày, thời gian đọc (mono), tag |
| `MdxContent` | MDX đã biên dịch | Style văn bản, code highlight bằng Shiki lúc build (không JS phía client) |
| `Timeline` | `Experience[]` | Dạng dọc, `<ol>` ngữ nghĩa; không dùng bento |
| `SkillGroup`, `TechIcon` | `Skill[]` | Icon đơn sắc, không thanh % |
| `CvDownload` | cấu hình `site.cv` | Trạng thái chưa cấu hình theo UI_UX §5 |
| `ContactForm` | client + server action | Trạng thái theo UI_UX §6 |

## 4. Ví dụ — hình dạng mong đợi

```tsx
// src/components/ui/Button.tsx (minh hoạ)
const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors duration-fast ease-out disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:bg-accent-hover",
        secondary: "border border-border-strong bg-surface text-fg hover:bg-surface-muted",
        ghost: "text-fg-muted hover:bg-surface-muted hover:text-fg",
      },
      size: { sm: "h-9 px-3", md: "h-11 px-5" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);
// Focus ring đến từ base CSS (:focus-visible) — không cần lặp lại trong component.
```

```tsx
// Bento trên Home (minh hoạ)
<BentoGrid layout="home">
  <BentoCard size="2x2" eyebrow="00 / HELLO">…</BentoCard>
  <BentoCard size="1x2">…ảnh…</BentoCard>
  <BentoCard size="1x1" eyebrow="STATUS">…</BentoCard>
  …
</BentoGrid>
```

## 5. Định nghĩa hoàn thành (component)

- [ ] Chỉ dùng token; đã kiểm tra 2 theme.
- [ ] Đã kiểm tra bàn phím + screen reader.
- [ ] Xử lý chữ VI dài và dữ liệu tuỳ chọn bị thiếu.
- [ ] Đã thêm/cập nhật dòng trong catalog.
- [ ] Có test cho primitive có logic (Button loading, ProjectLinks visibility, Field aria).
