# WSpeedrun: Auth Service

Service ini bertanggung jawab untuk autentikasi user, otorisasi role, dan manajemen akun. Token JWT yang dihasilkan di sini digunakan untuk mengakses endpoint Admin di service lainnya.

## Tech Stack
- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** MySQL
- **Port:** 3000
- **Security:** Passport JWT, Bcrypt (Password Hashing)

## API Endpoints
### Public Access
- `POST /auth/register` - Mendaftarkan user baru (role default: `USER`).
- `POST /auth/login` - Login untuk mendapatkan `access_token`.

### Admin Access (Contoh)
- `GET /users` - Melihat semua user (hanya untuk role `ADMIN`).

## Cara Mendapatkan Token Admin untuk Testing
1. Pastikan database `wspeedrun_auth_service` sudah ada.
2. Register akun baru via Postman: `POST /auth/register`.
3. (Opsional) Ubah role user tersebut menjadi `ADMIN` langsung di database MySQL (tabel `users`).
4. Login via Postman: `POST /auth/login`.
5. Salin string `access_token` dari response untuk digunakan di Swagger Game Service.

## Environment Setup
Buat file `.env` di root folder:
```text
DATABASE_URL="mysql://root:@localhost:3306/wspeedrun_auth_service"
JWT_SECRET="SUPER_SECRET_KEY_BINUS"




# WSpeedrun: Game Service

Service ini mengelola katalog game dan kategori speedrun dalam ekosistem microservices WSpeedrun.

## Tech Stack
- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** MySQL
- **Port:** 3001

## API Endpoints
### Guest Access
- `GET /games` - List semua game.
- `GET /games/:id` - Detail game beserta kategori.
- `GET /categories/:id` - Detail kategori.

### Admin Access (Locked by JWT)
- `POST /admin/games` - Tambah game baru.
- `PATCH /admin/games/:id/update` - Update data game.
- `DELETE /admin/games/:id/delete` - Hapus game.
- `POST /admin/categories` - Tambah kategori.
- `PATCH /admin/categories/:id/update` - Update kategori.
- `DELETE /admin/categories/:id/delete` - Hapus kategori.

## Cara Menjalankan
1. Pastikan MySQL aktif (XAMPP).
2. Buat database `wspeedrun_game_service`.
3. Konfigurasi `.env` (DATABASE_URL & JWT_SECRET).
4. `npm install`
5. `npx prisma generate`
6. `npm run start:dev`



# WSpeedrun: Run Service

Service ini menangani inti dari platform: submisi data speedrun (Runs) dan interaksi antar user melalui sistem komentar.

## Tech Stack
- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** MySQL
- **Port:** 3002

## API Endpoints
### Run Management
- `GET /runs` - Menampilkan semua submisi speedrun (Public).
- `GET /runs/:id` - Detail run beserta komentar yang ada di dalamnya.
- `POST /runs` - Submit run baru (Hanya untuk Role `USER`/`ADMIN`).
- `PATCH /runs/:id` - Update data run milik sendiri.
- `DELETE /runs/:id` - Hapus run (Milik sendiri atau oleh Admin).

### Comment System
- `POST /runs/:id/comments` - Menambahkan komentar pada suatu run.
- `DELETE /comments/:id` - Menghapus komentar.

## Integrasi Data (Cross-Service)
Saat melakukan `POST /runs`, service ini membutuhkan validasi eksternal:
1. **User ID:** Diambil dari payload JWT (Auth Service).
2. **Game ID & Category ID:** Harus divalidasi keberadaannya di Game Service (Port 3001).

## Environment Setup
Buat file `.env` di root folder:
```text
DATABASE_URL="mysql://root:@localhost:3306/wspeedrun_run_service"
JWT_SECRET="SUPER_SECRET_KEY_BINUS"
GAME_SERVICE_URL="http://localhost:3001"
