# Smart Academic AI Assistant

A "Desktop-like" AI application for academic research and summarization, built with **PHP** and **TailwindCSS**.

## ⚠️ Prerequisites (Wajib Dibaca)

Aplikasi ini membutuhkan **PHP** untuk berjalan. Karena di komputer Anda belum terdeteksi PHP, mohon ikuti langkah berikut:

### Cara 1: Menggunakan XAMPP (Paling Mudah)
1. Install **XAMPP** (jika belum ada).
2. Salin folder `academic-ai-assistant` ini ke dalam `C:\xampp\htdocs`.
3. Buka folder `backend` lalu `Services`. Pastikan `server.php` ada.
4. Buka browser dan akses `http://localhost/academic-ai-assistant/public`.
   *(Catatan: Anda mungkin perlu menyesuaikan konfigurasi jika menggunakan cara ini karena struktur file ini dioptimalkan untuk `php -S`)*.

### Cara 2: Menjalankan Langsung (Recommended)
1. Pastikan Anda sudah menginstall **PHP** dan menambahkannya ke "PATH" Windows.
2. Edit file `.env.example` menjadi `.env` dan masukkan API Key OpenRouter Anda:
   ```
   OPENROUTER_API_KEY=sk-or-v1-xxxxxxxx...
   ```
3. Klik ganda file **`run_app.bat`**.
4. Aplikasi akan terbuka otomatis di browser.

### Cara 3: Menjadikan Aplikasi Desktop (Electron)
Jika Anda ingin aplikasi ini benar-benar berjalan sebagai aplikasi desktop (tanpa browser):
1. Install **Node.js**.
2. Buka terminal di folder ini.
3. Jalankan `npm install`.
4. Jalankan `npm start`.

## Fitur
- **Chat Assistant**: Tanya jawab seputar akademik.
- **Summarizer**: Meringkas teks panjang secara otomatis.
- **Modern UI**: Tampilan gelap (Dark Mode) dengan estetika Glassmorphism.

## Struktur File
- `public/`: Folder frontend (HTML, CSS, JS).
- `backend/`: Folder logika PHP (API Router).
- `main.js`: Konfigurasi Electron (jika menggunakan Node.js).
- `run_app.bat`: Script peluncur cepat.
