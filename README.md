# FRONTEND

# TripWise
**TripWise** adalah platform perjalanan digital yang memungkinkan pengguna untuk mengakses rute perjalanan, mencari destinasi wisata, mendapatkan rekomendasi yang dipersonalisasi, serta menikmati berbagai konten video dan fitur manajemen data. Dibangun menggunakan **React.js**, **Axios**, **Tailwind CSS**, **Formik**, **Yup**, **Zustand**, **ApexCharts**, dan **React Leaflet**.

---

## Fitur Utama
### 1. **User Features**
- **Insert User Detail**: Pengguna dapat memasukkan detail pribadi.
- **Access Travel Routes**: Akses rute perjalanan yang tersedia.
- **Search Destination**: Cari destinasi wisata sesuai kebutuhan.
- **Personalized Recommendation**: Rekomendasi destinasi berdasarkan preferensi pengguna.
- **Video Content** *(Nilai Plus)*: Menampilkan konten video menarik.
- **Landing Page**: Tampilan utama dengan informasi menarik seputar TripWise.

### 2. **Admin Features**
- **Manage User Detail**: Kelola detail pengguna.
- **Manage User Routes**: Kelola rute perjalanan pengguna.
- **Add Custom Data for OpenAI**: Tambahkan data kustom untuk AI model (Gemini AI).
- **Manage Contents**: Tambahkan, perbarui, dan hapus konten.
- **Manage Destinations**: Kelola destinasi wisata.

---

## Teknologi yang Digunakan
| **Teknologi**           | **Deskripsi**                                          |
|-------------------------|-------------------------------------------------------|
| **React.js**            | Library untuk membangun antarmuka pengguna (UI).      |
| **Axios**               | HTTP client untuk berinteraksi dengan API.            |
| **Tailwind CSS**        | Framework CSS untuk styling cepat dan responsif.      |
| **Flowbite React**      | Komponen UI tambahan berbasis Tailwind CSS.           |
| **ApexCharts**          | Visualisasi data berbentuk grafik.                    |
| **Formik & Yup**        | Validasi form input yang efektif dan efisien.         |
| **React Leaflet**       | Peta interaktif untuk menampilkan rute dan lokasi.    |
| **Zustand**             | State management sederhana dan ringan.               |
| **Gemini AI**           | Integrasi kecerdasan buatan untuk rekomendasi konten. |
| **Postman**             | Testing API untuk memastikan performa backend.        |

---

## Struktur Proyek
```
TripWise/
├── api/                       # Konfigurasi Axios untuk API
├── assets/                    # Gambar dan asset lainnya
├── components/                # Komponen reusable
│   ├── Admin/                 # Komponen khusus untuk Admin
│   ├── common/                # Komponen umum (Alert, Modal, dsb.)
│   ├── LandingPage/           # Komponen untuk Landing Page
│   ├── Login/                 # Komponen form login
│   ├── Register/              # Komponen form register
│   └── User/                  # Komponen untuk User Pages
│       ├── ChatBot/           # Komponen chatbot
│       ├── Destination/       # Komponen filter dan sort destinasi
│       ├── DetailDestinasi/   # Detail destinasi
│       ├── HomePage/          # Halaman utama user
│       ├── Rute/              # Kelola rute perjalanan
│       └── UserDetail/        # Detail profil pengguna
├── data/                      # Data dummy (mock API, destinasi)
├── hooks/                     # Custom hooks
├── layouts/                   # Layout halaman
├── pages/                     # Halaman aplikasi
│   ├── admin/                 # Halaman untuk Admin
│   └── user/                  # Halaman untuk User
├── routes/                    # Routing dan proteksi halaman
├── services/                  # Service untuk API dan AI
│   └── servicesgemini/        # Service khusus Gemini AI
├── store/                     # State management menggunakan Zustand
└── utils/                     # Utility functions
```

---

## Instalasi dan Menjalankan Proyek
Ikuti langkah-langkah berikut untuk menjalankan proyek **TripWise** secara lokal:

### 1. **Clone Repository**
```bash
git clone <repository-url>
cd tripwise
```

### 2. **Install Dependencies**
Pastikan **Node.js** dan **npm** sudah terinstal di sistem Anda.
```bash
npm install
```

### 3. **Jalankan Proyek**
```bash
npm run dev
```
Buka browser dan akses [http://localhost:5173](http://localhost:5173).

---

## Konfigurasi API
Pastikan Anda memiliki **backend server** untuk menangani API.

- File konfigurasi API terdapat di folder `api/axiosInstance.js`.
- Ubah URL base API sesuai kebutuhan Anda:
```javascript
const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // Ganti dengan base URL backend Anda
  timeout: 5000,
});
```

---

## Testing API
Gunakan **Postman** untuk menguji semua endpoint backend yang digunakan dalam proyek ini. Dokumentasi API tersedia sesuai kebutuhan Anda.

---

## Deployment
Untuk melakukan build produksi, jalankan perintah berikut:
```bash
npm run build
```
Deploy hasil build ke platform seperti **Vercel**, **Netlify**, atau **Firebase Hosting**.

---

## Kontribusi
Jika Anda ingin berkontribusi:
1. Fork repositori ini.
2. Buat branch baru: `git checkout -b fitur-anda`.
3. Commit perubahan: `git commit -m 'Deskripsi fitur'`.
4. Push branch Anda: `git push origin fitur-anda`.
5. Ajukan pull request.

---

## Kontak
Jika ada pertanyaan atau masalah terkait proyek ini, silakan hubungi:
- **Nama**: Aryo
- **Email**: [email@example.com](mailto:email@example.com)

---

## Lisensi
Proyek ini menggunakan lisensi **MIT License**.
