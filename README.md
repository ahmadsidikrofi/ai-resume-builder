# 🧠 Resumind - AI-Powered Resume Builder SaaS

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.13.0-blueviolet?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Stripe](https://img.shields.io/badge/Stripe-Integration-purple?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![Clerk Auth](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_2.0_Flash-AI-orange?style=for-the-badge&logo=google-gemini)](https://deepmind.google/technologies/gemini/)

**Resumind** adalah platform SaaS *(Software as a Service)* modern berbasis AI yang dirancang untuk membantu para pencari kerja membuat curriculum vitae (CV) atau resume profesional yang dipersonalisasi secara *real-time* dan interaktif. Dengan bantuan AI dan sistem manajemen visual yang intuitif, proses pembuatan resume kini menjadi instan dan menyenangkan.

---

## 📌 Pendahuluan: Masalah, Solusi, & Keunikan

### ⚠️ Problem (Masalah)
1. **Menghabiskan Banyak Waktu:** Menyusun CV dari nol membutuhkan waktu berjam-jam bahkan berhari-hari untuk memikirkan struktur, pemilihan kata, dan desain layout yang tepat.
2. **Keterbatasan Kemampuan Menulis Profesional:** Banyak pelamar kerja, khususnya *fresh graduate*, kesulitan merangkum profil profesional mereka *(summary)* atau menulis pencapaian kerja *(work experiences)* menggunakan terminologi industri yang menarik bagi *recruiter*.
3. **Format & Desain yang Tidak Konsisten:** Seringkali format file berantakan saat diekspor, skema warna tidak cocok, atau border layout tidak serasi, mengurangi nilai profesionalisme pelamar di mata HRD.

### 💡 Solution (Solusi)
1. **Real-Time Interactive Editor:** Resumind menghadirkan editor resume dua panel yang canggih. Pengguna dapat langsung mengetik di panel input, dan hasilnya langsung di-render secara visual di panel preview secara real-time.
2. **AI-Powered Input Optimization:** Terintegrasi dengan **Gemini 2.0 Flash**, pengguna hanya perlu mendeskripsikan secara singkat pengalaman kerja atau keahlian mereka, dan AI akan otomatis mengoptimalkannya menjadi kalimat siap kerja profesional yang terformat rapi.
3. **Responsive PDF Export:** Layout resume dirancang presisi untuk dicetak atau disimpan langsung ke format PDF ramah ATS *(Applicant Tracking System)* tanpa merusak estetika visual.

### ✨ Uniqueness (Keunikan)
* **Kecerdasan Kontekstual Gemini AI:** Berbeda dengan generator AI generik yang membuat teks acak, AI Resumind menganalisis secara dinamis riwayat pendidikan, keahlian, dan deskripsi kerja pengguna secara menyeluruh untuk memformulasikan ringkasan karir (*Summary*) yang relevan.
* **Dynamic Styling Engine:** Di tingkat Pro Plus, pengguna dapat secara fleksibel mengganti palette warna (dengan *custom hex color picker*) dan memilih bentuk sudut (*squircle*, *round*, atau *sharp* untuk border resume) demi mencerminkan kepribadian profesional mereka secara unik.
* **Fluid Drag-and-Drop Experience:** Menggunakan `@dnd-kit` untuk mempermudah pengaturan urutan keahlian *(skills)* dan riwayat secara intuitif.

---

## 💎 Fitur Utama & Tingkatan Subscription

Aplikasi ini menggunakan model bisnis Freemium yang diintegrasikan dengan **Stripe Checkout** dan **Stripe Webhooks** untuk mengelola level akses pengguna.

### Perbandingan Fitur Tiap Tier

| Fitur | 🌟 Free Tier | 🥈 Pro Tier | 🥇 Pro Plus Tier |
| :--- | :---: | :---: | :---: |
| **Batasan Jumlah CV** | Maksimal 1 CV | Maksimal 3 CV | **Tak Terbatas (Infinity)** |
| **Real-time Live Preview** | Yes | Yes | Yes |
| **Penyimpanan Foto Profil (Vercel Blob)**| Yes | Yes | Yes |
| **Akses Fitur AI (Gemini 2.0 Flash)** | No | **Yes** | **Yes** |
| **Kustomisasi Gaya (Warna & Border)**| No | No | **Yes (Full Custom)** |
| **Harga Langganan** | Rp 0 / Bulan | Rp XX.XXX / Bulan (Pro) | Rp XX.XXX / Bulan (Pro Plus) |

---

## 🛠️ Tech Stack & Arsitektur

Resumind dibangun menggunakan teknologi modern berkinerja tinggi:

* **Framework Utama:** [Next.js 15.4 (App Router)](https://nextjs.org/) dengan aktivasi fitur Turbopack untuk kompilasi pengembangan super cepat.
* **Autentikasi & Profil Pengguna:** [Clerk Auth](https://clerk.com/) untuk pengamanan rute dashboard, login multi-faktor, dan metadata langganan pengguna yang terenkripsi.
* **Database & ORM:** [PostgreSQL](https://www.postgresql.org/) yang dikelola menggunakan [Prisma ORM](https://www.prisma.io/) untuk migrasi database terstruktur dan performa kueri yang aman.
* **Pemrosesan AI:** SDK resmi `@google/generative-ai` menggunakan model canggih `gemini-2.0-flash`.
* **Sistem Pembayaran SaaS:** [Stripe API](https://stripe.com/) untuk siklus langganan bulanan dan Stripe Webhooks untuk sinkronisasi instan database lokal saat transaksi berhasil atau dibatalkan.
* **Penyimpanan Berkas:** [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob) untuk menyimpan foto profil pengguna dengan aman dan cepat.
* **Manajemen State & Form:** [Zustand](https://zustand-demo.pmnd.rs/) untuk state editor global, [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) untuk validasi form input resume yang ketat.
* **Styling & Komponen UI:** Tailwind CSS v4, Radix UI, dan `shadcn/ui` untuk komponen visual premium yang ramah aksesibilitas.

---

## 📂 Struktur Database (Skema Prisma)

Prisma mengelola relasi database PostgreSQL dengan model-model utama berikut:
- **`Resume`**: Menyimpan semua data CV pengguna (nama, detail kontak, warna hex, border style, dll.) yang berelasi dengan tabel `WorkExperience` dan `Education`.
- **`WorkExperience`**: Menyimpan riwayat pengalaman kerja pengguna, termasuk posisi, nama perusahaan, serta deskripsi tugas terformat.
- **`Education`**: Menyimpan riwayat pendidikan formal.
- **`UserSubscription`**: Menyimpan status integrasi billing Stripe pengguna (termasuk `stripeCustomerId`, `stripeSubscriptionId`, `stripePriceId`, dan `stripeCurrentPeriodEnd` untuk validasi status kedaluwarsa langganan).

---

## ⚙️ Variabel Lingkungan (Environment Variables)

Salin berkas `.env.example` ke `.env` Anda dan isi variabel berikut:

```env
# Database PostgreSQL (Database Utama & Koneksi Langsung untuk Serverless)
DATABASE_URL="postgresql://..."
DATABASE_URL_UNPOOLED="postgresql://..."
PGHOST="..."
PGHOST_UNPOOLED="..."
PGUSER="..."
PGDATABASE="..."
PGPASSWORD="..."
POSTGRES_URL="..."
POSTGRES_URL_NON_POOLING="..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
POSTGRES_URL_NO_SSL="..."
POSTGRES_PRISMA_URL="..."

# Otentikasi Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Google Gemini API Key
GOOGLE_GEMINI_API="AIzaSy..."

# Vercel Blob Storage Token (Untuk upload foto profil)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."

# Integrasi Stripe Payment Gateway
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Konfigurasi ID Produk & Harga Bulanan Stripe
NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY="price_..."
NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY="price_..."

# URL Dasar Aplikasi (Digunakan untuk URL pengembalian Stripe)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Stack Auth (Opsional jika diimplementasikan paralel)
NEXT_PUBLIC_STACK_PROJECT_ID="..."
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="..."
STACK_SECRET_SERVER_KEY="..."
```

---

## 🚀 Langkah Memulai (Local Setup)

Untuk menjalankan proyek ini secara lokal di komputer Anda, ikuti langkah-langkah di bawah ini:

### 1. Klon Repositori & Instal Dependensi
Pastikan Anda menggunakan Node.js (versi 18+) atau Bun. Proyek ini menggunakan `bun` atau `npm` untuk manajemen paket.
```bash
# Instal seluruh package dependensi menggunakan Bun (rekomendasi) atau NPM
bun install
# atau
npm install
```

### 2. Jalankan Migrasi Database Prisma
Pastikan database PostgreSQL Anda aktif, lalu jalankan perintah berikut untuk menginisialisasi tabel-tabel di database lokal Anda:
```bash
# Sinkronkan model schema dengan database dan buat prisma client local
npx prisma db push
```

### 3. Jalankan Server Pengembangan
Nyalakan server lokal Next.js dengan dukungan Turbopack untuk performa build instan:
```bash
bun dev
# atau
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat aplikasinya berjalan.

### 4. Menyalakan Stripe Webhook Listener (Lokal)
Agar aplikasi dapat menerima pembaruan status transaksi Stripe secara lokal, pasang Stripe CLI dan jalankan perintah penerusan webhook:
```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```
Salin token `whsec_...` yang muncul di terminal Anda ke variabel `STRIPE_WEBHOOK_SECRET` di dalam berkas `.env` Anda.

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan komersial SaaS yang dilindungi hak cipta. Silakan hubungi pemilik proyek untuk informasi lebih lanjut mengenai lisensi penggunaan kode.
