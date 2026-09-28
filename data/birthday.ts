export interface MemoryItem {
  id: number;
  title: string;
  date: string;
  caption: string;
  image: string;
  rotation: number;
}

export interface ReasonItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface GiftItem {
  id: number;
  badge: string;
  title: string;
  image: string;
  description: string;
  statusText: string;
}

export const birthdayData = {
  recipientName: "Zulfa",
  partnerName: "Aku",
  age: 20,
  birthdayDate: "30 September 2026",
  musicPath: "/music/nastelbom-happy-birthday-471481.mp3",

  opening: {
    lines: [
      "Malam ini, ada kejutan kecil untukmu... ❤️",
      "Meskipun kita terpisah jarak ribuan kilometer...",
      "...aku tetap ingin merayakan ulang tahunmu bersama.",
    ],
    buttonText: "Mulai Petualangan Cinta KITA ✨",
  },

  cake: {
    title: "Selamat Ulang Tahun, Zulfa 🎂❤️",
    subtitle: "Panjatkan satu harapan manismu...",
    instruction: "Tiup lilinnya, sayang 🎂",
    blownSuccess: "YAY! Semua lilin berhasil kamu tiup! 🎉❤️",
    blownSubtext: "Meskipun jauh, malam ini cinta kita tetap bersinar paling terang.",
    giftButtonText: "Buka Kejutan Terakhir 🎁",
  },

  gifts: [
    {
      id: 1,
      badge: "Kado 1 dari 3 🧸",
      title: "Boneka Peluk Hangat",
      image: "/images/gift-doll.svg",
      description: "Boneka lucu ini aku kirimkan khusus buat nemenin tidur kamu saat aku belum ada di samping kamu ❤️",
      statusText: "Sedang Dikirim Ke Rumahmu 🚚📦",
    },
    {
      id: 2,
      badge: "Kado 2 dari 3 💐",
      title: "Buket Bunga Romantis",
      image: "/images/gift-flowers.svg",
      description: "Coming Soon! Bunga cantik ini bakal aku serahkan secara langsung saat aku udah nyampe ke tempat kamu nanti! ✨❤️",
      statusText: "Menunggu Aku Nyampe Kesana 🚂",
    },
    {
      id: 3,
      badge: "Kado 3 dari 3 🎁❓",
      title: "Hadiah Rahasia Paling Spesial",
      image: "/images/gift-mystery.svg",
      description: "Sesuatu yang paling spesial dan rahasia... Ada kejutan paling bikin penasaran yang sedang disiapkan khusus untukmu! 🤫✨❤️",
      statusText: "Rahasia Paling Spesial 🗝️✨",
    },
  ] as GiftItem[],

  loveLetter: {
    title: "Surat Cinta Untuk Zulfa ❤️",
    buttonText: "Buka Surat Cinta 💌",
    greeting: "Untuk Zulfa, sayangku ❤️",
    paragraphs: [
      "Selamat ulang tahun yang ke-20, sayang. ❤️",
      "Hari ini adalah hari spesial buat kamu, tapi entah kenapa aku juga ikut merasa bahagia karena bisa melihat seseorang yang sangat berarti buat aku bertambah satu tahun lagi.",
      "Aku mungkin nggak selalu bisa ada di samping kamu. Kadang jarak bikin kita cuma bisa ketemu lewat layar, ngobrol lewat chat, atau sekadar mendengar suara satu sama lain.",
      "Tapi dari semua itu, aku sadar satu hal: jarak nggak pernah bikin rasa sayangku ke kamu jadi berkurang.",
      "Aku bersyukur bisa kenal kamu. Bersyukur bisa punya seseorang yang bisa aku panggil 'sayang'. Dan aku bersyukur karena sampai hari ini kita masih sama-sama berusaha menjaga hubungan ini.",
      "Di umur kamu yang ke-20 ini, aku cuma berharap kamu selalu sehat, selalu bahagia, dan semua hal baik yang kamu inginkan perlahan bisa tercapai.",
      "Kalau suatu hari kamu lagi capek, sedih, atau merasa semuanya terlalu berat, jangan lupa kalau ada aku di sini.",
      "Mungkin aku nggak selalu punya jawaban untuk semua masalah kamu. Tapi aku akan selalu berusaha jadi tempat kamu pulang, tempat kamu cerita, dan orang yang tetap ada buat kamu.",
      "Aku nggak tahu perjalanan kita ke depannya bakal seperti apa. Tapi untuk sekarang, aku cuma ingin menikmati setiap momen yang kita punya. Satu per satu. Hari demi hari.",
      "Dan kalau boleh berharap sedikit lebih jauh... Aku ingin nanti kita punya lebih banyak cerita. Lebih banyak ulang tahun yang bisa kita rayakan berdua.",
      "Selamat ulang tahun, Zulfa. Terima kasih sudah menjadi bagian dari hidupku.",
      "Aku sayang kamu. Hari ini, besok, dan selama kita masih memilih satu sama lain. ❤️",
    ],
    closing: "Dengan seluruh cintaku,",
    signature: "— Dari aku, yang selalu sayang kamu",
  },

  memories: [
    {
      id: 1,
      title: "Kencan Virtual Pertama",
      date: "12 Januari",
      caption: "kapan yah ini lupa aku🤭",
      image: "/images/Screenshot (1034).png",
      rotation: -3,
    },
    {
      id: 2,
      title: "Teleponan Malam Hari",
      date: "28 Februari",
      caption: "Cerita hal-hal random seharian sampai kamu ketiduran.",
      image: "/images/WhatsApp Image 2026-09-28 at 23.33.00.jpeg",
      rotation: 2,
    },
    {
      id: 3,
      title: "Menghitung Hari Bertemu",
      date: "30 Mei",
      caption: "selalu ngitung hari untuk pertama kali nya kita bisa bertemu dan berpelukan untuk pertama kali nya",
      image: "/images/WhatsApp Image 2026-09-28 at 23.40.39.jpeg",
      rotation: -2,
    },
    {
      id: 4,
      title: "Senyuman Terindahmu",
      date: "19 Juli",
      caption: "senyuman paling indah se indah indah nya yang paling indah ku lihat",
      image: "/images/Desain tanpa judul (1).png",
      rotation: 3,
    },
  ] as MemoryItem[],

  reasons: [
    {
      id: 1,
      title: "Senyuman Manismu",
      description: "Senyuman kamu selalu punya cara ajaib untuk menenangkan hatiku.",
      iconName: "Smile",
    },
    {
      id: 2,
      title: "Suara Terhangatmu",
      description: "Mendengar suaramu di telepon adalah melodi terfavoritku setiap hari.",
      iconName: "Volume2",
    },
    {
      id: 3,
      title: "Cerita Random Kamu",
      description: "Cara kamu cerita hal-hal kecil selalu bikin aku jatuh cinta lagi.",
      iconName: "MessageCircle",
    },
    {
      id: 4,
      title: "Perhatian Kecilmu",
      description: "Perhatian tulus dari kamu buat aku merasa jadi orang paling beruntung.",
      iconName: "HeartHandshake",
    },
    {
      id: 5,
      title: "Kebiasaan Lucumu",
      description: "Setiap kebiasaan lucu kamu selalu berhasil bikin aku tersenyum sendiri.",
      iconName: "Sparkles",
    },
    {
      id: 6,
      title: "Kamu Adalah Rumahku",
      description: "Di mana pun kita berada, bersamamu adalah tempat teraman bagiku.",
      iconName: "Home",
    },
  ] as ReasonItem[],

  ldr: {
    line1: "Berbeda tempat.",
    line2: "Langit yang sama.",
    line3: "Cinta yang tak pernah berkurang.",
    quote: "Sejauh apa pun jarak kita, kamu tetap menjadi orang yang paling dekat di hatiku.",
  },

  finalSurprise: {
    teaser1: "Tunggu sebentar...",
    teaser2: "Masih ada satu hal lagi untukmu.",
    buttonText: "Buka Kenangan Terakhir 🎁",
    heroPhoto: "/images/hero.svg",
    headline: "Selamat Ulang Tahun, Zulfa Sayang ❤️",
    subtext: "Terima kasih sudah menjadi bagian terindah dalam hidupku.",
    hopeText: "Aku berharap bisa merayakan ribuan ulang tahun lagi bersamamu.",
  },

  closing: {
    line1: "Sampai nanti kita bisa merayakannya berdampingan...",
    line2: "...mari terus ukir kenangan manis seperti ini.",
    happyBirthdayText: "Selamat Ulang Tahun ke-20, Zulfa. ❤️",
    date: "30 September 2026",
    replayButtonText: "Ulangi Cerita Cinta ↻",
  },
};
