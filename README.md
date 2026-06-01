# HeartShop — 拾心市集

全端電商平台，採用前後端分離架構，部署於 AWS Elastic Beanstalk + EC2。

---

## 專案架構

```
heart-shop-aws/
├── HeartShop-Spring/     # 後端 Spring Boot API
├── heartshop-frontend/   # 前端 Nuxt 3 (SSR)
├── heartshop-admin/      # 管理後台 Vue 3 + Vite
└── heartshopsql/         # 資料庫初始化 SQL
```

---

## 技術棧與版本

### 後端 `HeartShop-Spring`

| 技術 | 版本 |
|---|---|
| Java | 21 |
| Spring Boot | 3.5.7 |
| MyBatis Spring Boot Starter | 3.0.3 |
| PostgreSQL Driver | runtime (managed) |
| JJWT | 0.11.5 |
| Lombok | latest |

### 前端 `heartshop-frontend`

| 技術 | 版本 |
|---|---|
| Nuxt | ^4.2.0 |
| Vue | ^3.5.22 |
| Pinia (`@pinia/nuxt`) | ^0.11.3 |
| Naive UI | ^2.43.2 |

### 管理後台 `heartshop-admin`

| 技術 | 版本 |
|---|---|
| Vue | ^3.5.22 |
| Vite | ^7.1.7 |
| Vue Router | ^4.6.4 |
| Naive UI | ^2.43.2 |
| Axios | ^1.13.2 |

### 資料庫 / 雲端

| 服務 | 說明 |
|---|---|
| PostgreSQL | AWS RDS (Private VPC) |
| 後端部署 | AWS Elastic Beanstalk (Corretto 21 / Amazon Linux 2023) |
| 前端部署 | AWS EC2 (Ubuntu) + PM2 + Nginx |
| 管理後台部署 | 同一台 EC2，Nginx port 5173 |

---

## 環境變數

複製 `.env.example` 為 `.env` 並填入對應值：

```bash
cp .env.example .env
```

| 變數 | 說明 |
|---|---|
| `DB_HOST` | RDS 端點 |
| `DB_PORT` | 資料庫埠號（預設 5432） |
| `DB_NAME` | 資料庫名稱 |
| `DB_USERNAME` | 資料庫帳號 |
| `DB_PASSWORD` | 資料庫密碼 |
| `JWT_SECRET` | JWT 簽名金鑰（建議 64 字元以上） |
| `VITE_API_BASE_URL` | 後端 API 位址（前端 build 用） |
| `VITE_ADMIN_URL` | 管理後台位址 |
| `SERVER_URL` | 後端公開位址（付款回調用） |
| `FRONTEND_URL` | 前端位址（付款完成導回用） |
| `CORS_ALLOWED_ORIGINS` | CORS 允許來源（逗號分隔） |

---

## 本機開發

### 後端

```bash
cd HeartShop-Spring/HeartShop
mvn spring-boot:run
# 預設啟動於 http://localhost:8080/api
```

### 前端

```bash
cd heartshop-frontend
npm install
npm run dev
# 預設啟動於 http://localhost:3000
```

### 管理後台

```bash
cd heartshop-admin
npm install
npm run dev
# 預設啟動於 http://localhost:5173
```

---

## AWS 部署重點

### Elastic Beanstalk 必要環境變數

| 變數 | 值 |
|---|---|
| `SERVER_PORT` | `5000`（nginx 預設轉發埠） |
| `UPLOAD_DIR` | `/var/app/current/uploads` |
| `DB_HOST` | RDS 端點 |
| `DB_USERNAME` | 資料庫帳號 |
| `DB_PASSWORD` | 資料庫密碼 |

### VPC 設定

EB 環境與 RDS 需在同一 VPC，且 VPC 必須啟用 DNS：

```bash
aws ec2 modify-vpc-attribute --vpc-id <vpc-id> --enable-dns-hostnames '{"Value":true}'
aws ec2 modify-vpc-attribute --vpc-id <vpc-id> --enable-dns-support '{"Value":true}'
```

### 健康檢查路徑

ALB / EB 健康檢查路徑設為 `/api/categories`（根路徑 `/` 回 404）

---

## 功能列表

- 會員註冊 / 登入（JWT）
- 商品瀏覽、分類篩選、搜尋
- 購物車 / 結帳
- 訂單管理
- 商品問答
- 收藏清單
- 管理後台：商品 / 分類 / 訂單 / 會員 / 輪播管理
- 圖片上傳（本機儲存，建議正式環境改用 S3）

---

## License

MIT
