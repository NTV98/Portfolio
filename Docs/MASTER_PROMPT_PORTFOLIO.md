# MASTER PROMPT — PERSONAL DEVELOPER PORTFOLIO

> **Execution tool:** Claude Code  
> **Design direction:** Minimalist + Bento Grid  
> **Deployment target:** Linux VPS with Docker, Docker Compose, Nginx and HTTPS  
> **Primary objective:** Plan, design, implement, test, document and prepare a production-ready personal developer portfolio.

---

# 1. ROLE AND WORKING EXPECTATIONS

Act as a Senior Software Architect, Full-stack Developer, UI/UX Designer, DevOps Engineer, QA Engineer and Technical Project Manager.

Work directly in the current workspace using Claude Code.

This is a real software project, not merely a landing-page mockup. Deliver a professional, maintainable, secure, responsive and extensible website that can represent my professional identity as a Software Developer for years.

Work in manageable milestones. Inspect before modifying, plan before coding, document conventions, reuse components, test before claiming completion, and verify before reporting success.

Do not silently overwrite or delete existing work. Do not fabricate personal details, work history, achievements, project metrics or integrations.

## Confidentiality

Some projects were developed for previous employers and are private or confidential.

Never expose:
- Proprietary source code.
- Credentials, tokens, API keys or internal URLs.
- Customer, employee or business-sensitive data.
- Confidential architecture or operational details.
- Screenshots or assets that are not authorized for public use.

For company projects, use sanitized descriptions of the problem, my role, general responsibilities and technologies only where disclosure is appropriate. Omit confidential projects entirely when even a generalized description would be inappropriate.

---

# 2. PROJECT VISION AND AUDIENCE

Build a Personal Developer Portfolio Website that helps:

- Recruiters and employers understand my experience and technical capabilities.
- Potential clients understand my development expertise.
- Developers explore my projects and technical knowledge.
- Visitors contact me for professional opportunities and collaboration.

The portfolio should introduce:
- Personal profile and professional identity.
- Technical skills and technology stack.
- Work experience and career timeline.
- Personal, open-source and selected professional projects.
- GitHub repositories and live demos where available.
- Online resume and downloadable CV.
- Technical articles and knowledge sharing.
- Contact details and professional social links.

The site must be easy to update when I add projects, skills, experience or articles.

---

# 3. MANDATORY EXECUTION PHASES

Follow these phases in order.

## Phase 1 — Workspace Discovery

Before changing files:

1. Inspect the current workspace and existing source code.
2. Identify framework, dependencies, project structure and conventions.
3. Determine whether this is a new project or an existing project.
4. Inspect available images, logos, CV files and other assets.
5. Identify technical constraints, risks and missing information.
6. Do not replace an existing suitable stack without a clear reason.
7. Do not overwrite existing work without inspecting it.

Deliver a concise discovery report.

## Phase 2 — Product and Technical Planning

Create the project documentation described in Section 13.

Define:
- Product objectives and target audiences.
- Sitemap and navigation.
- User journeys.
- Page-by-page requirements.
- Component architecture.
- Content models and data ownership.
- Technology choices and rationale.
- Security and privacy requirements.
- Deployment architecture.
- Testing strategy.
- Milestones, risks and acceptance criteria.

Present the proposed architecture and implementation roadmap before large-scale implementation.

Ask only questions that materially block a decision. Use sensible defaults for non-critical details. Use clearly marked placeholders when personal information is missing.

## Phase 3 — Design System and UI/UX

Establish the complete design system before building individual pages.

The required visual direction is **Minimalist + Bento Grid**. See Sections 7 and 8.

## Phase 4 — Implementation

Implement all agreed pages and features using reusable components and centralized content. Do not stop after the homepage.

Update the roadmap and testing checklist as work progresses.

## Phase 5 — Quality Assurance

Run the relevant checks, inspect responsive layouts and themes, test user journeys, fix defects and record actual results.

## Phase 6 — Production Preparation and Deployment

Prepare Docker, Docker Compose, Nginx, HTTPS, VPS deployment, backup and rollback documentation. Do not claim a production deployment has succeeded unless it has actually been performed and verified.

---

# 4. TECHNOLOGY STACK AND ARCHITECTURE

Unless workspace inspection reveals a compelling reason to retain an existing compatible architecture, use:

## Frontend

- Next.js, latest stable version compatible with the project.
- React.
- TypeScript.
- Next.js App Router.
- Tailwind CSS.
- Lucide React icons.
- Reusable custom UI components.

## Content

- JSON or TypeScript data for profile, skills, experience, education and projects.
- Markdown or MDX for technical articles.
- Local static assets where appropriate.

## Rendering

- Prefer Static Site Generation (SSG) for content that does not require dynamic data.
- Use Server Components by default.
- Use Client Components only when interaction requires them.
- Optimize images and fonts.
- Use Next.js standalone output for the production Docker image where appropriate.

## Infrastructure

- Linux VPS.
- Docker.
- Docker Compose.
- Nginx reverse proxy.
- HTTPS with Let's Encrypt.
- Git-based deployment workflow.

## Database and backend

- Do not add a database in the initial version.
- Do not create backend services unless a real requirement justifies them.
- Keep the architecture lightweight and operationally simple.
- For contact, use a configurable secure server-side integration or a mailto fallback.
- Never expose email service API keys in browser code.

Use compatible stable dependencies. Avoid unnecessary packages and infrastructure.

---

# 5. WEBSITE INFORMATION ARCHITECTURE

Implement the following pages and sections.

## 5.1 Home

Create a compelling but uncluttered landing page with:

- Hero introduction.
- Full name and professional title.
- Short professional introduction.
- Profile photo or avatar placeholder.
- Primary CTA: View Projects.
- Secondary CTA: Contact Me.
- Download CV CTA.
- Technology highlights.
- Featured projects.
- About Me summary.
- Experience overview.
- Latest technical articles.
- Contact CTA.
- Footer with professional links.

Use Bento Grid layouts to organize content naturally. Keep the visual hierarchy clear and avoid overcrowding.

## 5.2 About

Include:
- Personal introduction.
- Professional background.
- Development philosophy.
- Career direction.
- Professional strengths.
- Education and certifications, when supplied.
- Optional personal interests.

## 5.3 Skills

Organize skills into:
- Programming Languages.
- Frontend Development.
- Backend Development.
- Databases.
- DevOps and Infrastructure.
- Cloud and Deployment.
- Development Tools.
- Architecture and Engineering.

Use technology icons where appropriate.

Do not invent proficiency percentages, skill rankings or years of experience.

## 5.4 Projects

This is one of the most important sections.

Each project should support:
- Project name.
- Cover image or thumbnail.
- Short description.
- Detailed overview.
- Problem and solution.
- My role and responsibilities.
- Technologies used.
- Main features.
- Architecture overview, only when safe to disclose.
- Screenshots, only when authorized.
- Category and status.
- Timeline, if known.
- GitHub repository URL, optional.
- Live demo URL, optional.

Project types:
- PERSONAL.
- OPEN_SOURCE.
- COMPANY.
- EXPERIMENTAL.
- SIDE_PROJECT.

Visibility:
- PUBLIC: Show approved details and public links.
- PRIVATE: Show only sanitized, non-confidential information.
- CONFIDENTIAL: Omit or show only a generic description if appropriate.

Features:
- Project search.
- Category filters.
- Featured projects.
- Project detail pages.
- Related projects.
- GitHub and Live Demo links.
- Graceful handling of missing URLs and images.

Manage project content through centralized structured data. Do not hardcode project information separately in UI components.

External links must be valid when configured and use safe external-link attributes. Do not render fake or dead buttons.

## 5.5 Experience

Create a professional career timeline with:
- Organization, when approved for disclosure.
- Job title.
- Employment period.
- Responsibilities.
- Technologies.
- Notable contributions, only when verified.

Selected company projects may be linked using sanitized descriptions.

## 5.6 Resume / CV

Provide:
- Online resume.
- Professional summary.
- Skills.
- Experience.
- Projects.
- Education.
- Certifications.
- Downloadable PDF CV.

Make the CV file and resume content easy to update. If no CV file is supplied, show a clear unconfigured state rather than a broken download.

## 5.7 Blog

Build a technical knowledge-sharing section with:
- Article listing.
- Article detail.
- Categories and tags.
- Search.
- Reading time.
- Publication date.
- Related articles.
- Markdown/MDX rendering.
- Code syntax highlighting.

Potential subjects include .NET, Angular, React, Node.js/NestJS, SQL Server, software architecture, DevOps, Docker, Kubernetes and technical problem-solving.

The blog must have a useful empty state when no articles exist.

## 5.8 Contact

Include:
- Contact form.
- Email.
- GitHub.
- LinkedIn.
- Other professional social links.
- Optional location.

Contact form requirements:
- Input validation.
- Loading state.
- Success state only after actual success.
- Error state.
- Basic spam protection if a backend integration is configured.
- Secure server-side handling for any secret-bearing integration.

If no provider is configured, provide a clear mailto fallback. Never pretend that a message was sent when it was not.

## 5.9 Additional pages

Consider:
- Custom 404 page.
- Privacy Policy.
- Optional Now page.
- Optional Uses page.
- Optional Services page.

Do not add pages merely to increase page count. Include only pages with useful content.

---

# 6. PERSONAL BRANDING AND CONTENT MANAGEMENT

Create centralized configuration for personal information.

Suggested organization:

```text
src/
  config/
    site.ts
    profile.ts
    navigation.ts
  data/
    projects.ts
    skills.ts
    experience.ts
    education.ts
  content/
    blog/
  public/
    images/
    icons/
    files/
      cv.pdf
```

Adapt the structure to the chosen framework and repository conventions.

All personal information must be editable without modifying multiple UI components.

Use placeholders that are clearly marked as placeholders until actual information is supplied. Do not present placeholder content as factual personal history.

---

# 7. DESIGN DIRECTION — MINIMALIST + BENTO GRID

The visual identity must be modern, elegant, clean, professional and distinctive.

Design principles:
- Minimalist but visually memorable.
- Bento Grid as a layout tool, not a decorative requirement for every section.
- Strong typography and clear hierarchy.
- Generous whitespace.
- Consistent alignment and spacing.
- Carefully balanced content density.
- Distinctive project presentation.
- Subtle transitions and purposeful micro-interactions.
- Excellent usability on mobile and desktop.
- Accessible color contrast and keyboard navigation.

Avoid:
- Generic portfolio-template appearance.
- Excessive gradients, glow effects or glassmorphism.
- Excessive animations.
- Random decorative elements.
- Overcrowded cards.
- Inconsistent card dimensions without design intent.
- Unnecessary visual effects.

Create a premium personal technology brand rather than a generic developer template.

Support both Light Mode and Dark Mode.

---

# 8. DESIGN SYSTEM — SINGLE SOURCE OF TRUTH

This requirement is mandatory.

The Design System is the single source of truth for all UI development. Every future page, feature, component, refactor or visual change must follow the documented standards.

Create and maintain:

- `docs/DESIGN_SYSTEM.md`
- `docs/UI_UX_GUIDELINES.md`
- `docs/COMPONENT_GUIDELINES.md`

Also create a root-level `CLAUDE.md` containing persistent instructions for Claude Code. See Section 13.

## 8.1 Design tokens

Centralize:
- Primary and secondary colors.
- Background and surface colors.
- Text colors.
- Border colors.
- Semantic colors: success, warning, error and info.
- Font families.
- Font sizes and weights.
- Line heights.
- Spacing scale.
- Border radius.
- Shadows.
- Z-index layers.
- Responsive breakpoints.
- Animation durations and easing.

Use CSS variables and centralized Tailwind theme configuration where appropriate.

Do not scatter arbitrary design values across components.

## 8.2 Typography

Document:
- Font families and fallbacks.
- Heading hierarchy.
- Body text sizes.
- Caption and metadata sizes.
- Font weights.
- Line heights.
- Responsive typography.
- Text wrapping and truncation rules.

## 8.3 Colors and themes

Define consistent Light and Dark palettes.

Ensure:
- Accessible contrast.
- Consistent background hierarchy.
- Consistent interactive states.
- Semantic color usage.
- No undocumented random colors.

## 8.4 Layout and spacing

Standardize:
- Maximum content width.
- Page containers.
- Section spacing.
- Grid systems.
- Bento Grid patterns.
- Card layouts.
- Grid gaps.
- Responsive behavior.
- Navigation dimensions.

All pages must share consistent alignment, spacing and visual rhythm.

## 8.5 Component standards

Document reusable components and their usage rules:
- Buttons and links.
- Navigation and footer.
- Cards and Bento Cards.
- Project Cards.
- Skill badges and tags.
- Forms and inputs.
- Dropdowns, modals and tooltips.
- Loading, empty and error states.

Before creating a component, inspect whether an existing shared component can be reused or extended. Avoid duplicated components with slightly different styling.

## 8.6 Interaction and animation

Define:
- Hover, focus, active and disabled states.
- Loading behavior.
- Transitions.
- Page and scroll animations.
- Micro-interactions.
- Reduced-motion behavior.

Animations must be subtle, purposeful and performant. Respect `prefers-reduced-motion`.

## 8.7 Responsive standards

Define and test:
- Mobile.
- Tablet.
- Desktop.
- Large desktop.

Prevent horizontal overflow, broken layouts, clipped text, inconsistent spacing and unusable mobile navigation.

## 8.8 Mandatory design compliance rules

Before implementing any UI change:

1. Read `docs/DESIGN_SYSTEM.md`.
2. Read `docs/UI_UX_GUIDELINES.md`.
3. Read `docs/COMPONENT_GUIDELINES.md`.
4. Inspect existing shared components.
5. Reuse design tokens and existing components.
6. Do not introduce undocumented styles without a justified design-system update.
7. Preserve both Light and Dark themes.
8. Keep all pages visually consistent.
9. Update design documentation when conventions change.
10. Perform a design consistency audit before marking the feature complete.

Never redesign existing pages or introduce a new visual direction without explicit approval.

## 8.9 README design requirements

`README.md` must contain a dedicated section named **Design System & UI/UX Standards**.

It must explain:
- Overall design philosophy.
- Bento Grid conventions.
- Design tokens and theme configuration.
- Component reuse requirements.
- Responsive standards.
- How to add pages and components consistently.
- Links to all detailed design documents.

It must also contain **Instructions for AI Coding Agents**, requiring future AI sessions to read `README.md`, `CLAUDE.md` and all design documents before changing UI.

---

# 9. INTERNATIONALIZATION

Support:
- Vietnamese.
- English.

Requirements:
- Language switcher.
- Centralized translation dictionaries.
- Consistent translated navigation and content.
- Locale-aware metadata.
- Correct localized URLs.
- Preserve the selected language during navigation.

Avoid duplicating entire page components for each language.

Do not machine-translate personal claims or confidential project details without review. Use clearly marked translation placeholders where source content is missing.

---

# 10. SEO, ACCESSIBILITY AND PERFORMANCE

## SEO

Implement:
- Unique title and description per page.
- Canonical URLs.
- Open Graph metadata.
- Social sharing metadata.
- Sitemap.xml.
- Robots.txt.
- Favicon.
- Semantic HTML.
- Structured data where appropriate.

## Accessibility

Implement:
- Semantic markup.
- Keyboard navigation.
- Visible focus states.
- Proper form labels.
- Accessible contrast.
- Meaningful alternative text.
- Reduced-motion support.
- Appropriate ARIA only when needed.

## Performance

- Optimize images.
- Use modern image formats where suitable.
- Lazy-load appropriate assets.
- Optimize fonts.
- Avoid unnecessary JavaScript.
- Minimize layout shifts.
- Prefer static generation where appropriate.

Lighthouse targets:
- Performance: 90+.
- Accessibility: 95+.
- Best Practices: 95+.
- SEO: 95+.

These are targets, not assumed results. Measure actual scores and document the test environment and results. Do not claim a target was achieved without measurement.

---

# 11. SECURITY AND PRIVACY

- Never expose API keys, credentials or secrets.
- Use environment variables.
- Provide `.env.example`.
- Never commit `.env` or private keys.
- Validate and sanitize contact form input.
- Keep secret-bearing integrations server-side.
- Secure external links.
- Avoid leaking private project information.
- Use HTTPS in production.
- Apply appropriate security headers.
- Apply reasonable request limits to contact endpoints.
- Keep dependencies updated and avoid unnecessary packages.

---

# 12. VPS PRODUCTION ARCHITECTURE AND DEPLOYMENT

Target: Linux VPS running Docker and Docker Compose.

Recommended architecture:

```text
Internet
   |
   v
Domain / DNS
   |
   v
VPS Firewall
   |
   | Public ports: 80 and 443 only
   v
Nginx Reverse Proxy
   |
   | HTTPS termination and proxy headers
   v
Private Docker Network
   |
   v
Next.js Production Container
   |
   v
Static Content / Application
```

Only expose necessary public ports. Keep the Next.js application port internal to the Docker network. Do not expose unnecessary service ports.

## 12.1 Docker

Create:
- `Dockerfile`.
- `.dockerignore`.
- `docker-compose.yml`.
- `.env.example`.

Requirements:
- Multi-stage build.
- Production-only runtime dependencies.
- Next.js standalone output where appropriate.
- Non-root runtime user where practical.
- Restart policy.
- Health check.
- Reasonable image size.
- Persistent logs where appropriate.
- No secrets embedded in the image.

## 12.2 Nginx

Provide:
- Reverse proxy configuration.
- HTTP to HTTPS redirection.
- Correct forwarding headers.
- Compression where appropriate.
- Reasonable request limits.
- Security headers.
- SSL configuration.

## 12.3 HTTPS

Document Let's Encrypt certificate setup and automatic renewal.

Never commit private SSL keys.

## 12.4 Server directory

Use a clear server deployment layout, for example:

```text
/opt/portfolio/
  docker-compose.yml
  .env
  deployment/
    nginx/
    scripts/
  backups/
  logs/
```

Keep secrets outside Git.

## 12.5 Deployment workflow

Document and, where safe, automate:

1. Prepare Linux VPS.
2. Configure firewall.
3. Install Docker and Docker Compose.
4. Configure DNS.
5. Clone the Git repository.
6. Configure environment variables.
7. Build the Docker image.
8. Start containers.
9. Configure Nginx.
10. Configure HTTPS.
11. Verify application health.
12. Configure backup and recovery.
13. Document update and rollback.

## 12.6 Deployment scripts

Where useful, create:
- `scripts/deploy.sh`.
- `scripts/backup.sh`.
- `scripts/rollback.sh`.

Scripts must validate prerequisites and fail safely. Explain destructive operations before running them. Do not run destructive commands without explicit approval.

## 12.7 Backup and recovery

Even without a database, document backup of:
- Environment configuration.
- Content files.
- Uploaded assets, if any.
- Deployment configuration.
- Release information.

Document restoration and rollback procedures.

## 12.8 Deployment documentation

`docs/DEPLOYMENT.md` must include:
- VPS requirements.
- Architecture diagram.
- DNS and domain configuration.
- Firewall.
- Docker installation.
- Environment setup.
- Build and deployment.
- Nginx configuration.
- SSL and renewal.
- Logs and health checks.
- Updates and rollback.
- Backup and restoration.
- Troubleshooting.

Do not claim that the site is deployed, the domain resolves or HTTPS works unless those conditions have actually been verified.

---

# 13. PROJECT DOCUMENTATION AND CLAUDE CODE RULES

Maintain these files:

```text
README.md
CLAUDE.md

docs/
  PRD.md
  ARCHITECTURE.md
  ROADMAP.md
  CONTENT_GUIDE.md
  DESIGN_SYSTEM.md
  UI_UX_GUIDELINES.md
  COMPONENT_GUIDELINES.md
  DEPLOYMENT.md
  TESTING.md
```

## README.md

The main project entry point. Include:
- Project overview.
- Features.
- Technology stack.
- Installation and development.
- Build commands.
- Content management.
- How to add projects.
- How to add articles.
- How to update personal information and CV.
- Environment variables.
- Deployment overview.
- Design System & UI/UX Standards.
- Instructions for AI Coding Agents.
- Links to detailed documentation.

## CLAUDE.md

Create a root-level `CLAUDE.md` with persistent instructions for Claude Code:
- Project context.
- Architecture conventions.
- Coding conventions.
- Design System requirements.
- Component reuse rules.
- Security and confidentiality.
- Testing requirements.
- Documentation maintenance.
- Deployment safety.

Claude Code must read the relevant project instructions and documentation before making changes. Keep `CLAUDE.md` concise and link to detailed documents instead of duplicating them.

## Documentation maintenance

Whenever architecture, design conventions, deployment procedures or content models change, update the relevant documentation in the same implementation milestone.

---

# 14. CODE QUALITY AND TESTING

Use:
- TypeScript strict mode where practical.
- ESLint.
- Prettier if configured.
- Reusable components.
- Clear separation of concerns.
- Consistent naming.
- Maintainable folder structure.

Testing should include, where appropriate:
- Unit tests for important utilities.
- Component tests for critical shared components.
- E2E tests for important user journeys.
- Production build verification.
- Internal route and link verification.
- Responsive layout checks.
- Light and Dark theme checks.
- Language switching.
- Project filtering and search.
- GitHub and demo links when configured.
- CV download when configured.
- Contact form validation and success/error behavior.
- SEO metadata checks.
- Accessibility checks.

Do not leave:
- Broken internal links.
- Dead buttons.
- Empty major pages.
- Fake success states.
- Critical console errors.
- TypeScript errors.
- Lint errors.
- Production build errors.
- Exposed secrets.

Record commands, results and known limitations in `docs/TESTING.md`.

---

# 15. ACCEPTANCE CRITERIA

The project is complete only when the agreed criteria below have been verified.

## A. Product

- All agreed pages exist and render correctly.
- Navigation works.
- Projects display correctly.
- Project search and category filters work.
- Project detail pages work.
- GitHub and demo links work when configured.
- CV download works when configured.
- Blog renders Markdown/MDX.
- Contact flow behaves honestly and correctly.
- Vietnamese and English work.
- 404 page works.

## B. Design

- Consistent Minimalist + Bento Grid direction.
- Centralized design tokens.
- Consistent typography and spacing.
- Reusable components.
- Light and Dark themes.
- Responsive layouts across supported devices.
- No horizontal overflow.
- Accessible interaction states.
- Design documentation is complete.
- README and CLAUDE.md contain the required design compliance instructions.

## C. Technical

- Production build succeeds.
- TypeScript checks pass.
- Lint checks pass.
- No critical runtime errors.
- No broken internal routes.
- No exposed secrets.
- SEO metadata exists.
- Performance and accessibility have been measured.

## D. VPS

- Docker image builds.
- Docker Compose starts the application.
- Container health check passes.
- Nginx reverse proxy works.
- HTTPS works after configuration.
- Domain resolves correctly after DNS configuration.
- Restart policy works.
- Logs can be inspected.
- Deployment instructions are reproducible.
- Backup and rollback procedures are documented.

Maintain a checklist in `docs/TESTING.md`. Mark each item as:
- PASS — verified.
- FAIL — tested and failed.
- NOT TESTED — not yet verified.
- BLOCKED — requires external configuration or access.
- NOT APPLICABLE — genuinely not relevant.

Never mark an item PASS based only on generated code or assumptions.

---

# 16. FINAL DELIVERY REPORT

At completion, provide:

1. Project overview.
2. Final architecture and important decisions.
3. Implemented pages and features.
4. Technology stack.
5. Design System documentation.
6. Project directory structure.
7. Local development commands.
8. Production build commands.
9. VPS deployment instructions.
10. Required environment variables.
11. Test commands and actual results.
12. Known limitations.
13. Remaining tasks and external configuration required.

Clearly distinguish:
- Implemented and verified.
- Implemented but not verified.
- Not implemented.
- Blocked by external configuration or access.

Never claim deployment, SSL, domain, email integration or other external service success without verification.

---

# 17. EXECUTION RULES AND FIRST ACTION

You are an autonomous engineering partner, but project quality and safety take priority.

- Inspect before modifying.
- Plan before coding.
- Design before implementing pages.
- Document before introducing conventions.
- Reuse before creating new components.
- Test before declaring completion.
- Verify before claiming success.
- Update `ROADMAP.md` continuously.
- Never fabricate personal content.
- Never expose confidential information.
- Never silently overwrite existing work.
- Never introduce unnecessary architecture.
- Never sacrifice maintainability for speed.
- Never redesign the established visual direction without approval.

Work in manageable milestones and report progress with concrete completed items and remaining work.

**START NOW:**

1. Inspect the current workspace.
2. Produce the discovery report.
3. Identify missing personal information and assets.
4. Prepare the detailed product and technical plan.
5. Create the initial documentation files.
6. Present the proposed architecture, roadmap, risks and decisions requiring approval.

Do not immediately generate the entire application. Complete discovery and planning first, then wait for my approval before large-scale implementation.
