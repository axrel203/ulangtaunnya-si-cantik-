# 🎁 Romantic Birthday Gift Website untuk Zulfa ❤️

Website ulang tahun digital interaktif dan romantis khusus untuk pasangan LDR (*Long Distance Relationship*), dilengkapi dengan fitur utama **Interactive Microphone Candle Blower** (Tiup Lilin Pakai Mic HP), animasi visual starry night, surat cinta digital, album kenangan polaroid, dan pemutar musik background.

---

## 🚀 Fitur Utama

- 🕯️ **Tiup Lilin Interaktif**: Menggunakan Web Audio API untuk mendeteksi tiupan ke mic HP secara *real-time* (dengan tombol fallback tap lilin langsung).
- 🌌 **Starry Sky & Floating Hearts**: Visual malam romantis dengan bintang berkelap-kelip dan animasi hati mengapung.
- 💌 **Surrat Cinta Interaktif**: Amplop digital 3D dengan efek mengetik kalimat demi kalimat secara otomatis.
- 📸 **Polaroid Scrapbook Memories**: 6 foto kenangan dengan efek rotasi kertas polaroid, tanggal, caption, serta mode *enlarge modal*.
- ❤️ **Reasons Why I Love You**: Kartu animasi alasan mencintai pasangan dengan icon Lucide.
- 🌙 **LDR Distance Sky Section**: Visual konstelasi hubungan jarak jauh antara dua tempat berbeda di bawah langit yang sama.
- 🎁 **Final Surprise & Replay**: Kartu foto hero pasangan dan tombol ulang perjalanan dari awal.
- 🎵 **Music Player (iOS Safari Compliant)**: Kontrol musik melayang (*Play*, *Pause*, *Mute*, *Volume*) yang aktif setelah interaksi awal pengguna.

---

## 🛠️ Cara Mengedit Konten & Foto

Seluruh isi teks, nama, tanggal, surat cinta, daftar foto, dan lagu tersimpan di satu file konfigurasi:
📍 **`data/birthday.ts`**

### 1. Mengganti Nama Pacar & Tanggal Ulang Tahun
Buka file `data/birthday.ts` dan ubah bagian:
```typescript
export const birthdayData = {
  recipientName: "Zulfa",            // Nama pacar kamu
  partnerName: "Aku",                 // Panggilan kamu
  birthdayDate: "19 September 2026", // Tanggal ulang tahun
  musicPath: "/music/birthday.mp3",   // Path musik pilihanmu
  ...
```

### 2. Mengganti Surat Cinta
Ubah array `paragraphs` pada bagian `loveLetter` di `data/birthday.ts`:
```typescript
  loveLetter: {
    title: "For You, Zulfa ❤️",
    greeting: "Sayang,",
    paragraphs: [
      "Tuliskan paragraf pertama suratmu di sini...",
      "Tuliskan paragraf kedua...",
    ],
    closing: "Dengan segenap cintaku,",
    signature: "Nama Kamu",
  },
```

### 3. Mengganti Foto Polaroid Kenangan
Simpan foto-foto asli kamu di folder `public/images/` (misalnya `memory-1.jpg`, `memory-2.jpg`, dst. Kompres ukuran foto agar di bawah **500 KB** agar loading di HP sangat cepat).

Kemudian perbarui path dan teksnya di `data/birthday.ts`:
```typescript
  memories: [
    {
      id: 1,
      title: "Judul Kenangan 1",
      date: "12 Januari",
      caption: "Cerita singkat momen ini...",
      image: "/images/memory-1.jpg", // Gantilah sesuai nama file di public/images/
      rotation: -3,
    },
    // ... hingga memory 6
  ],
```

### 4. Mengganti Foto Hero Final Surprise
Simpan foto terbaik kalian berdua di `public/images/hero.jpg` dan ubah di `data/birthday.ts`:
```typescript
  finalSurprise: {
    heroPhoto: "/images/hero.jpg",
    headline: "Happy Birthday, Sayang. ❤️",
    subtext: "Terima kasih sudah ada di hidupku.",
  }
```

### 5. Mengganti Musik Background
Simpan file lagu mp3 romantis pilihanmu di:
📍 **`public/music/birthday.mp3`**

---

## 📦 Cara Memulai Pengembangan Lokal (Development)

1. **Buka Terminal / Command Prompt** pada folder ini:
   ```bash
   cd "d:\ultah sayangku"
   ```
2. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
3. Buka browser dan akses `http://localhost:3000`.
4. Untuk menguji di HP lokal, buka IP LAN laptop Anda pada HP di jaringan Wi-Fi yang sama (contoh: `http://192.168.1.x:3000`).

---

## 🚀 Cara Deploy Gratis Ke Vercel

1. Buat akun di [Vercel](https://vercel.com).
2. Push repository ini ke GitHub / GitLab milik Anda.
3. Di dashboard Vercel, klik **"Add New Project"** -> Impor repository GitHub tersebut.
4. Pada konfigurasinya, Vercel akan otomatis mendeteksi **Next.js**. Klik **"Deploy"**.
5. Setelah beberapa detik, Vercel akan memberikan domain HTTPS gratis (contoh: `https://ultah-zulfa.vercel.app`) yang bisa langsung dibuka di HP pacarmu!

---

## ⚡ Verifikasi Kode

Menjalankan pengujian build produksi:
```bash
npm run build
```
Pastikan menghasilkan `✓ Compiled successfully` tanpa error! ❤️
