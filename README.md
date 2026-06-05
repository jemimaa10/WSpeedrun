# 🏆 WSpeedrun Project - Group 13

Sistem ini terbagi menjadi tiga bagian utama sesuai spesifikasi tugas:

---

## 🔐 1. Auth Service
**Port:** `3000`  
Service ini bertanggung jawab untuk autentikasi user, otorisasi role, dan manajemen akun.

### 🛠 Tech Stack
- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** MySQL
- **Security:** Passport JWT, Bcrypt

### 🛣 API Endpoints
- `POST /auth/register` - Mendaftarkan user baru.
- `POST /auth/login` - Login untuk mendapatkan access_token.
- `GET /users/:id/profile` - Melihat profil user.

---

## 🎮 2. Game Service
**Port:** `3001`  
Service ini mengelola katalog game dan kategori speedrun.

### 🛠 Tech Stack
- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** MySQL

### 🛣 API Endpoints
- `GET /games` - List semua game.
- `GET /games/:id` - Detail game beserta kategori.
- `POST /admin/games` - Tambah game baru (Admin Only).
- `PATCH /admin/games/:id/update` - Edit game (Admin Only).
- `DELETE /admin/games/:id/delete` - Hapus game (Admin Only).

---

## 🏃 3. Run Service
**Port:** `3002`  
Service inti untuk submisi data speedrun dan sistem komentar.

### 🛠 Tech Stack
- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** MySQL

### 🛣 API Endpoints
- `GET /runs/:id` - Detail run beserta komentar.
- `POST /runs` - Submit run baru (User/Admin).
- `POST /comments` - Memberi komentar pada run.
- `POST /admin/runs/:id/accept` - Accept run (Admin Only).

---

## ⚙️ Environment Setup
Pastikan setiap folder service memiliki file `.env` dengan konfigurasi berikut:

```text
DATABASE_URL="mysql://root:@localhost:3306/nama_database_service"
JWT_SECRET="SUPER_SECRET_KEY_BINUS"
