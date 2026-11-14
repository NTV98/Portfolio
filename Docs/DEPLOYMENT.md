# Triển khai — Linux VPS (Docker + Compose + Nginx + Let's Encrypt)

> **Trạng thái:** ĐỀ XUẤT — chưa có bước nào được thực thi hay xác minh. File cụ thể (Dockerfile, compose, cấu hình nginx, script) được tạo ở Giai đoạn 7 và kiểm tra trên máy local; các bước trên VPS chỉ được xác minh ở Giai đoạn 8 khi có quyền truy cập server thật.

## 1. Yêu cầu VPS

| Hạng mục | Tối thiểu | Khuyến nghị |
|---|---|---|
| Hệ điều hành | Ubuntu 24.04 LTS / Debian 12 | Ubuntu 24.04 LTS |
| CPU / RAM | 1 vCPU / 1 GB (nếu build image ở nơi khác) | 2 vCPU / 2 GB (nếu chạy `next build` trên VPS) |
| Ổ đĩa | 10 GB | 20 GB (giữ được nhiều phiên bản image) |
| Truy cập | SSH key, user sudo không phải root | + fail2ban, unattended-upgrades |
| Tên miền | Bản ghi A/AAAA → IP VPS | apex + `www` (chuyển www → apex) |

## 2. Kiến trúc

```
Internet ─► DNS (A/AAAA: example.com, www) ─► Firewall VPS (ufw: chỉ 22, 80, 443)
                                                     │
                     ┌───────────────── docker compose ─────────────────┐
                     │  nginx  (publish cổng 80, 443)                   │
                     │   ├─ /.well-known/acme-challenge → webroot certbot│
                     │   ├─ TLS, HSTS, security headers, gzip           │
                     │   ├─ /_next/static → cache dài hạn (immutable)   │
                     │   └─ proxy_pass http://app:3000                  │
                     │                │  network: portfolio_internal     │
                     │  app (Next standalone, user node, KHÔNG publish cổng)│
                     │  certbot (chạy một lần: certonly / renew)        │
                     └──────────────────────────────────────────────────┘
```

## 3. Cấu trúc thư mục trên server

```
/opt/portfolio/
  repo/                 git clone (mã nguồn; deploy build từ đây)
  .env                  secret production (chmod 600, KHÔNG nằm trong git)
  releases.log          sha, image tag, ngày, kết quả — deploy.sh ghi thêm
  certbot/{conf,www}/   /etc/letsencrypt + webroot ACME (mount vào nginx/certbot)
  logs/nginx/           log truy cập/lỗi (logrotate)
  backups/              file tar.gz từ backup.sh
```
File compose và `deployment/nginx/*` nằm trong repo; `.env` và chứng chỉ nằm ngoài repo.

## 4. Chiến lược build/release

**Phương án A (khuyến nghị cho v1): build trên VPS.** `deploy.sh` → `git fetch` + checkout tag/sha → `docker build -t portfolio:<sha>` → `docker compose up -d app` → kiểm tra health → lỗi thì tự quay về tag trước. Cần ~2 GB RAM (thêm 2 GB swap nếu VPS chỉ 1 GB).

**Phương án B (sau này): GitHub Actions build + push lên GHCR**, VPS chỉ pull. Tốt cho VPS nhỏ, cần credential registry. Chuyển khi đã có CI (Q5).

## 5. Yêu cầu container

- Dockerfile multi-stage: `deps` (npm ci) → `builder` (next build, `output: "standalone"`) → `runner` (`node:24-alpine`, copy `.next/standalone`, `.next/static`, `public`; `USER node`; `NODE_ENV=production`).
- `HEALTHCHECK` → `wget -qO- http://127.0.0.1:3000/api/health`.
- Compose: `restart: unless-stopped`; `app` chỉ `expose: 3000`; logging `json-file` với `max-size: 10m, max-file: 3`; `env_file: /opt/portfolio/.env`; `read_only: true` + tmpfs cho `/tmp` và `.next/cache` nếu khả thi.
- Không secret trong image (`.dockerignore` loại `.env*`, `.git`, `node_modules`, `tests`, `Docs`, `.claude`).

## 6. Cấu hình Nginx chính

- Cổng 80: location ACME challenge + 301 → https.
- Cổng 443: `http2`, TLS 1.2/1.3 (Mozilla "intermediate"), OCSP stapling, `ssl_session_cache`.
- Snippet header: HSTS (`max-age=31536000; includeSubDomains` — chỉ bật sau khi HTTPS đã xác minh), `X-Content-Type-Options nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options DENY`, CSP (xem ARCHITECTURE §6).
- `gzip on` cho file text (brotli tuỳ chọn, cần module).
- `client_max_body_size 64k`; `limit_req_zone` cho `POST` form liên hệ (vd 5 r/m, burst 5).
- Chuyển tiếp header: `Host`, `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`.
- `server_tokens off`.

## 7. HTTPS (Let's Encrypt)

1. Chạy nginx với cấu hình chỉ HTTP (bootstrap) để webroot ACME truy cập được.
2. `docker compose run --rm certbot certonly --webroot -w /var/www/certbot -d example.com -d www.example.com --email <email chủ dự án> --agree-tos`.
3. Chuyển sang cấu hình TLS đầy đủ, `nginx -t`, reload.
4. Gia hạn: systemd timer / cron 2 lần/ngày → `docker compose run --rm certbot renew && docker compose exec nginx nginx -s reload`.
5. Xác minh: `curl -I https://example.com`, kiểm tra SSL Labs. Private key không bao giờ rời `/opt/portfolio/certbot/conf`.

## 8. Quy trình triển khai (sẽ viết script + xác minh)

1. Chuẩn bị VPS: user, SSH key, tắt đăng nhập bằng mật khẩu, cập nhật hệ thống.
2. Firewall: `ufw allow OpenSSH; ufw allow 80,443/tcp; ufw enable`.
3. Cài Docker Engine + Compose plugin (repo chính thức).
4. DNS: bản ghi A/AAAA; chờ cập nhật (`dig +short`).
5. Clone repo vào `/opt/portfolio/repo`.
6. Tạo `/opt/portfolio/.env` từ `.env.example`.
7–8. `scripts/deploy.sh <git-ref>` build và khởi động.
9–10. Nginx + certbot theo §6–7.
11. Health: `docker compose ps`, `curl https://<domain>/api/health`.
12. Backup: cron chạy `scripts/backup.sh` hàng tuần.
13. Cập nhật = `deploy.sh <ref mới>`; rollback = `rollback.sh` (tag trước trong `releases.log`).

## 9. Script (Giai đoạn 7)

| Script | Hành vi |
|---|---|
| `deploy.sh <ref>` | `set -euo pipefail`; kiểm tra docker, compose, `.env`, cây git sạch; build `portfolio:<sha>`; đánh dấu tag cũ làm ứng viên rollback; `up -d`; chờ healthy (timeout 60s); lỗi → khôi phục tag cũ và thoát với mã lỗi; ghi `releases.log`; xoá image cũ hơn 3 bản gần nhất |
| `rollback.sh [tag]` | Mặc định là tag thành công trước đó; hỏi xác nhận trước khi chạy; kiểm tra health |
| `backup.sh` | Nén `.env`, `releases.log`, `deployment/`, cấu hình certbot, nội dung (`src/content`, `src/data`, `public/files`) → `backups/portfolio-<ngày>.tar.gz`, giữ N bản mới nhất. Bản thân repo là bản sao lưu chính của nội dung. |

Không script nào chạy lệnh phá huỷ khi không có cờ/xác nhận rõ ràng.

## 10. Log & giám sát

- `docker compose logs -f app|nginx`; log nginx ở `/opt/portfolio/logs/nginx` có logrotate.
- Giám sát uptime bên ngoài (vd UptimeRobot miễn phí trỏ vào `/api/health`) — tuỳ chủ dự án.

## 11. Backup & khôi phục

Khôi phục: VPS mới → bước 1–5 → giải nén backup vào `/opt/portfolio` → `deploy.sh <sha trong releases.log>` → cấp lại/khôi phục chứng chỉ.

## 12. Xử lý sự cố (sẽ bổ sung theo thực tế)

| Hiện tượng | Kiểm tra |
|---|---|
| 502 Bad Gateway | `docker compose ps` (app healthy?), `docker compose logs app` |
| Cấp chứng chỉ thất bại | DNS đã trỏ về VPS? Cổng 80 mở? Đường dẫn challenge có phục vụ? |
| Form liên hệ lỗi | Biến provider trong `.env`, dashboard provider, log app |
| Build hết RAM trên VPS | Thêm swap hoặc chuyển Phương án B |
