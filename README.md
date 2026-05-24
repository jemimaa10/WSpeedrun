# 🏆 WSpeedrun Project - Group 13

[cite_start]Dokumentasi utama untuk sistem microservices WSpeedrun[cite: 38, 41]. [cite_start]Sistem ini terbagi menjadi tiga bagian utama sesuai spesifikasi tugas[cite: 55, 56]:

---

## 🔐 1. Auth Service
[cite_start]**Port:** `3000` [cite: 57]
[cite_start]Service ini bertanggung jawab untuk autentikasi user, otorisasi role, dan manajemen akun[cite: 57].

### 🛠 Tech Stack
- [cite_start]**Framework:** NestJS [cite: 45]
- [cite_start]**ORM:** Prisma [cite: 50]
- [cite_start]**Database:** MySQL [cite: 47]
- [cite_start]**Security:** Passport JWT[cite: 51], Bcrypt

### 🛣 API Endpoints
- [cite_start]`POST /auth/register` - Mendaftarkan user baru[cite: 97].
- [cite_start]`POST /auth/login` - Login untuk mendapatkan access_token[cite: 107].
- [cite_start]`GET /users/:id/profile` - Melihat profil user[cite: 115].

---

## 🎮 2. Game Service
[cite_start]**Port:** `3001` [cite: 57]
[cite_start]Service ini mengelola katalog game dan kategori speedrun[cite: 57].

### 🛠 Tech Stack
- [cite_start]**Framework:** NestJS [cite: 45]
- [cite_start]**ORM:** Prisma [cite: 50]
- [cite_start]**Database:** MySQL [cite: 47]

### 🛣 API Endpoints
- [cite_start]`GET /games` - List semua game[cite: 120].
- [cite_start]`GET /games/:id` - Detail game beserta kategori[cite: 122, 123].
- [cite_start]`POST /admin/games` - Tambah game baru (Admin Only)[cite: 128].
- [cite_start]`PATCH /admin/games/:id/update` - Edit game (Admin Only)[cite: 134].
- [cite_start]`DELETE /admin/games/:id/delete` - Hapus game (Admin Only)[cite: 137].

---

## 🏃 3. Run Service
[cite_start]**Port:** `3002` [cite: 57]
[cite_start]Service inti untuk submisi data speedrun dan sistem komentar[cite: 57].

### 🛠 Tech Stack
- [cite_start]**Framework:** NestJS [cite: 45]
- [cite_start]**ORM:** Prisma [cite: 50]
- [cite_start]**Database:** MySQL [cite: 47]

### 🛣 API Endpoints
- [cite_start]`GET /runs/:id` - Detail run beserta komentar[cite: 168, 169].
- [cite_start]`POST /runs` - Submit run baru (User/Admin)[cite: 170, 171].
- [cite_start]`POST /comments` - Memberi komentar pada run[cite: 179].
- [cite_start]`POST /admin/runs/:id/accept` - Accept run (Admin Only)[cite: 195].

---

## ⚙️ Environment Setup
Pastikan setiap folder service memiliki file `.env` dengan konfigurasi berikut:

```text
DATABASE_URL="mysql://root:@localhost:3306/nama_database_service"
JWT_SECRET="SUPER_SECRET_KEY_BINUS"
