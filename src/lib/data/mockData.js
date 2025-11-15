export const popularCountries = [
  { code: 'JP', name: 'Jepang', flag: '🇯🇵' },
  { code: 'US', name: 'Amerika Serikat', flag: '🇺🇸' },
  { code: 'KR', name: 'Korea', flag: '🇰🇷' },
  { code: 'SG', name: 'Singapura', flag: '🇸🇬' },
  { code: 'FR', name: 'Prancis', flag: '🇫🇷' },
  { code: 'CA', name: 'Kanada', flag: '🇨🇦' }
];

export const testimonials = [
  {
    name: 'Rina Putri',
    city: 'Jakarta',
    rating: 5,
    comment:
      'Barangnya datang tepat waktu dan prosesnya jelas banget dari awal. Recommended!'
  },
  {
    name: 'Andi Wijaya',
    city: 'Surabaya',
    rating: 4,
    comment:
      'Admin komunikatif, biaya transparan. Bisa update status kapan saja.'
  },
  {
    name: 'Mega Saras',
    city: 'Bandung',
    rating: 5,
    comment: 'Pertama kali coba jastip luar negeri, ternyata aman dan gampang.'
  },
  {
    name: 'Dimas Prasetyo',
    city: 'Medan',
    rating: 5,
    comment: 'Negosiasi harga cepat dan tracking jelas sampai kurir lokal.'
  }
];

export const orders = [
  {
    code: 'JP-240102-001',
    country: 'Jepang',
    store: 'Uniqlo Ginza',
    product: 'Jakarta UTme Hoodie - Warna Navy (M)',
    variations: 'Warna Navy, Size M',
    status: 'Menunggu_Review_Admin',
    estimate: 2150000,
    createdAt: '2024-01-02',
    timeline: [
      { status: 'Dibelikan', timestamp: '2024-01-03 12:30 JST' },
      { status: 'Dibawa ke bandara', timestamp: '2024-01-04 10:00 JST' },
      { status: 'Dalam penerbangan JL725', timestamp: '2024-01-04 13:30 JST' },
      { status: 'Proses Bea Cukai', timestamp: '2024-01-04 19:45 WIB' },
      { status: 'Dikirim kurir (JNE) Resi: JN123456789', timestamp: '2024-01-05 10:15 WIB' },
      { status: 'Selesai', timestamp: '2024-01-06 14:20 WIB' }
    ]
  },
  {
    code: 'US-240316-004',
    country: 'Amerika Serikat',
    store: 'Apple Store Fifth Avenue',
    product: 'iPad Pro 11" Wi-Fi 256GB',
    variations: 'Space Gray, 256GB',
    status: 'Perlu_Negosiasi',
    estimate: 15999000,
    createdAt: '2024-03-16'
  },
  {
    code: 'KR-240220-007',
    country: 'Korea',
    store: 'Line Friends Store',
    product: 'BT21 Limited Edition Plush',
    variations: 'Cooky',
    status: 'Dalam_Penerbangan',
    estimate: 920000,
    createdAt: '2024-02-20'
  }
];

export const statusMeta = {
  Draft: { label: 'Draft', color: '#9ca3af' },
  Menunggu_Review_Admin: { label: 'Menunggu Review Admin', color: '#facc15' },
  Perlu_Negosiasi: { label: 'Perlu Negosiasi', color: '#f97316' },
  Disetujui_Admin: { label: 'Disetujui Admin', color: '#38bdf8' },
  Menunggu_Persetujuan_Pembeli: { label: 'Menunggu Persetujuan Pembeli', color: '#a855f7' },
  Disetujui_Pembeli: { label: 'Disetujui Pembeli', color: '#22c55e' },
  Diproses_Penjemputan: { label: 'Diproses Penjemputan', color: '#0ea5e9' },
  Dalam_Penerbangan: { label: 'Dalam Penerbangan', color: '#1d4ed8' },
  'Customs/Transit': { label: 'Customs/Transit', color: '#f97316' },
  Dikirim_Kurir: { label: 'Dikirim Kurir', color: '#38bdf8' },
  Selesai: { label: 'Selesai', color: '#15803d' },
  Dibatalkan: { label: 'Dibatalkan', color: '#ef4444' }
};

export const kpis = [
  { label: 'Pesanan Baru', value: 12, color: '#0ea5e9' },
  { label: 'Perlu Negosiasi', value: 4, color: '#f97316' },
  { label: 'Siap di-Approve', value: 7, color: '#22c55e' },
  { label: 'Dalam Pengiriman', value: 19, color: '#6366f1' }
];

// Data Jastiper
export const jastipers = [
  {
    id: 'JST001',
    name: 'Sarah Kim',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    country: 'Korea',
    rating: 4.8,
    totalTrips: 45,
    verified: true,
    passport: 'A12345678',
    phone: '+62812345678',
    email: 'sarah@example.com',
    status: 'verified'
  },
  {
    id: 'JST002',
    name: 'Budi Santoso',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    country: 'Jepang',
    rating: 4.9,
    totalTrips: 67,
    verified: true,
    passport: 'B98765432',
    phone: '+62823456789',
    email: 'budi@example.com',
    status: 'verified'
  },
  {
    id: 'JST003',
    name: 'Linda Tan',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    country: 'Singapura',
    rating: 4.7,
    totalTrips: 32,
    verified: true,
    passport: 'C11223344',
    phone: '+62834567890',
    email: 'linda@example.com',
    status: 'verified'
  },
  {
    id: 'JST004',
    name: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    country: 'Amerika Serikat',
    rating: 4.6,
    totalTrips: 28,
    verified: false,
    passport: 'D55667788',
    phone: '+62845678901',
    email: 'michael@example.com',
    status: 'pending'
  }
];

// Postingan Jastiper
export const listings = [
  {
    id: 'LST001',
    type: 'jastip',
    jastiperId: 'JST001',
    jastiperName: 'Sarah Kim',
    jastiperAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    jastiperRating: 4.8,
    title: 'Jastip Korea - Kosmetik & Fashion',
    description: 'Jastip langsung dari Korea, bisa request produk dari Olive Young, Innisfree, Etude House, dan brand lokal Korea lainnya.',
    country: 'Korea',
    countryCode: 'KR',
    stores: ['Olive Young', 'Innisfree', 'Etude House', 'Aland'],
    departureDate: '2025-12-15',
    returnDate: '2025-12-22',
    estimateDelivery: '2025-12-28',
    status: 'available',
    minOrder: 100000,
    fee: 15,
    feeType: 'percentage',
    quota: 10,
    sold: 3,
    images: [
      'https://images.pexels.com/photos/3738086/pexels-photo-3738086.jpeg',
      'https://images.pexels.com/photos/3738085/pexels-photo-3738085.jpeg',
      'https://images.pexels.com/photos/3738088/pexels-photo-3738088.jpeg'
    ],
    categories: ['Kosmetik', 'Fashion', 'Skincare'],
    createdAt: '2025-11-01'
  },
  {
    id: 'LST002',
    type: 'jastip',
    jastiperId: 'JST002',
    jastiperName: 'Budi Santoso',
    jastiperAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    jastiperRating: 4.9,
    title: 'Jastip Jepang - Elektronik & Gadget',
    description: 'Trip ke Tokyo bulan depan. Bisa titip barang dari Yodobashi Camera, Bic Camera, Don Quijote, dan toko elektronik lainnya.',
    country: 'Jepang',
    countryCode: 'JP',
    stores: ['Yodobashi Camera', 'Bic Camera', 'Don Quijote'],
    departureDate: '2025-12-10',
    returnDate: '2025-12-18',
    estimateDelivery: '2025-12-25',
    status: 'available',
    minOrder: 200000,
    fee: 20,
    feeType: 'percentage',
    quota: 15,
    sold: 8,
    images: [
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      'https://images.pexels.com/photos/2181109/pexels-photo-2181109.jpeg',
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg'
    ],
    categories: ['Elektronik', 'Gadget', 'Gaming'],
    createdAt: '2025-10-28'
  },
  {
    id: 'LST003',
    type: 'preloved',
    jastiperId: 'JST001',
    jastiperName: 'Sarah Kim',
    jastiperAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    jastiperRating: 4.8,
    title: 'Preloved Tas Original Coach',
    description: 'Tas Coach original kondisi 95%, beli dari US. Masih ada dustbag dan kartu authenticity.',
    country: 'Amerika Serikat',
    countryCode: 'US',
    price: 2500000,
    originalPrice: 4500000,
    condition: 'Sangat Baik',
    status: 'available',
    images: [
      'https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg',
      'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg',
      'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg'
    ],
    categories: ['Fashion', 'Tas', 'Branded'],
    stock: 1,
    createdAt: '2025-11-05'
  },
  {
    id: 'LST004',
    type: 'event',
    jastiperId: 'JST003',
    jastiperName: 'Linda Tan',
    jastiperAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    jastiperRating: 4.7,
    title: 'Event Jastip Singapore Great Sale 2025',
    description: 'Event jastip khusus Singapore Great Sale! Slot terbatas hanya 20 orang. First come first served.',
    country: 'Singapura',
    countryCode: 'SG',
    stores: ['ION Orchard', 'Marina Bay Sands', 'Mustafa Centre'],
    departureDate: '2025-12-20',
    returnDate: '2025-12-23',
    estimateDelivery: '2025-12-27',
    status: 'available',
    minOrder: 150000,
    fee: 10,
    feeType: 'percentage',
    quota: 20,
    sold: 15,
    images: [
      'https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg',
      'https://images.pexels.com/photos/2303781/pexels-photo-2303781.jpeg',
      'https://images.pexels.com/photos/1168940/pexels-photo-1168940.jpeg'
    ],
    categories: ['Fashion', 'Elektronik', 'Kosmetik'],
    eventType: 'sale',
    createdAt: '2025-11-08'
  },
  {
    id: 'LST005',
    type: 'jastip',
    jastiperId: 'JST004',
    jastiperName: 'Michael Chen',
    jastiperAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    jastiperRating: 4.6,
    title: 'Jastip USA - Apple Products & Branded Items',
    description: 'Jastip dari USA, spesialis produk Apple, Nike, dan brand Amerika lainnya. Harga lebih murah dari Indonesia!',
    country: 'Amerika Serikat',
    countryCode: 'US',
    stores: ['Apple Store', 'Nike Store', 'Best Buy'],
    departureDate: '2025-12-25',
    returnDate: '2026-01-05',
    estimateDelivery: '2026-01-12',
    status: 'available',
    minOrder: 500000,
    fee: 25,
    feeType: 'percentage',
    quota: 8,
    sold: 2,
    images: [
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      'https://images.pexels.com/photos/18104/pexels-photo.jpg',
      'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg'
    ],
    categories: ['Elektronik', 'Fashion', 'Sepatu'],
    createdAt: '2025-11-10'
  },
  {
    id: 'LST006',
    type: 'preloved',
    jastiperId: 'JST002',
    jastiperName: 'Budi Santoso',
    jastiperAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    jastiperRating: 4.9,
    title: 'Preloved Nintendo Switch OLED',
    description: 'Nintendo Switch OLED model white, kondisi mulus seperti baru. Bonus 3 games digital.',
    country: 'Jepang',
    countryCode: 'JP',
    price: 3800000,
    originalPrice: 5200000,
    condition: 'Seperti Baru',
    status: 'available',
    images: [
      'https://images.pexels.com/photos/1616516/pexels-photo-1616516.jpeg',
      'https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg',
      'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg'
    ],
    categories: ['Gaming', 'Elektronik'],
    stock: 1,
    createdAt: '2025-11-07'
  }
];

// Data transaksi untuk wallet jastiper
export const jastiperTransactions = [
  {
    id: 'TRX001',
    jastiperId: 'JST001',
    type: 'income',
    amount: 450000,
    status: 'pending',
    description: 'Pembayaran dari pesanan #ORD001',
    orderCode: 'KR-251110-001',
    createdAt: '2025-11-10',
    releaseDate: '2025-11-20'
  },
  {
    id: 'TRX002',
    jastiperId: 'JST001',
    type: 'income',
    amount: 680000,
    status: 'released',
    description: 'Pembayaran dari pesanan #ORD002',
    orderCode: 'KR-251105-002',
    createdAt: '2025-11-05',
    releaseDate: '2025-11-15',
    releasedAt: '2025-11-15'
  },
  {
    id: 'TRX003',
    jastiperId: 'JST001',
    type: 'withdrawal',
    amount: -500000,
    status: 'completed',
    description: 'Pencairan dana ke rekening BCA',
    bankName: 'BCA',
    accountNumber: '1234567890',
    accountName: 'Sarah Kim',
    createdAt: '2025-11-16',
    completedAt: '2025-11-17'
  }
];

// Data users untuk manajemen admin
export const users = [
  {
    id: 'USR001',
    name: 'Rina Putri',
    email: 'rina@example.com',
    phone: '+62811111111',
    role: 'user',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    joinDate: '2024-08-15',
    totalOrders: 12,
    status: 'active'
  },
  {
    id: 'USR002',
    name: 'Andi Wijaya',
    email: 'andi@example.com',
    phone: '+62822222222',
    role: 'user',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    joinDate: '2024-09-20',
    totalOrders: 8,
    status: 'active'
  },
  {
    id: 'USR003',
    name: 'Mega Saras',
    email: 'mega@example.com',
    phone: '+62833333333',
    role: 'user',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    joinDate: '2024-10-05',
    totalOrders: 15,
    status: 'active'
  },
  {
    id: 'USR004',
    name: 'Dimas Prasetyo',
    email: 'dimas@example.com',
    phone: '+62844444444',
    role: 'user',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    joinDate: '2024-07-12',
    totalOrders: 20,
    status: 'active'
  }
];

// Data order dari buyer untuk jastiper
export const jastiperOrders = [
  {
    id: 'JORD001',
    orderCode: 'KR-251110-001',
    listingId: 'LST001',
    buyerId: 'USR001',
    buyerName: 'Rina Putri',
    buyerPhone: '+62811111111',
    jastiperId: 'JST001',
    productName: 'Laneige Cream Skin Refiner',
    productUrl: 'https://example.com',
    quantity: 2,
    estimatedPrice: 350000,
    totalPrice: 402500,
    fee: 52500,
    paymentMethod: 'full',
    paymentStatus: 'paid',
    status: 'purchased',
    createdAt: '2025-11-10',
    paidAt: '2025-11-10',
    purchasedAt: '2025-11-16'
  },
  {
    id: 'JORD002',
    orderCode: 'KR-251112-002',
    listingId: 'LST001',
    buyerId: 'USR002',
    buyerName: 'Andi Wijaya',
    buyerPhone: '+62822222222',
    jastiperId: 'JST001',
    productName: 'Etude House Dear Darling Tint',
    productUrl: 'https://example.com',
    quantity: 3,
    estimatedPrice: 180000,
    totalPrice: 207000,
    fee: 27000,
    paymentMethod: 'dp',
    paymentStatus: 'dp_paid',
    dpAmount: 103500,
    status: 'waiting_purchase',
    createdAt: '2025-11-12',
    paidAt: '2025-11-12'
  }
];

// Data ulasan dari user
export const myReviews = [
  {
    id: 'REV001',
    orderCode: 'KR-251110-001',
    jastiperId: 'JST001',
    jastiperName: 'Sarah Kim',
    jastiperAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    productName: 'Laneige Cream Skin Refiner',
    rating: 5,
    serviceRating: 5,
    speedRating: 5,
    qualityRating: 5,
    communicationRating: 5,
    reviewText: 'Pelayanan sangat baik! Barang sampai dengan cepat dan packaging rapi. Sarah sangat responsif menjawab semua pertanyaan saya. Highly recommended!',
    pros: ['Cepat', 'Komunikatif', 'Packaging Rapi', 'Harga Sesuai'],
    cons: [],
    photos: [
      'https://images.pexels.com/photos/3738086/pexels-photo-3738086.jpeg',
      'https://images.pexels.com/photos/3738088/pexels-photo-3738088.jpeg',
      'https://images.pexels.com/photos/3738085/pexels-photo-3738085.jpeg'
    ],
    recommended: true,
    createdAt: '2025-11-20',
    helpful: 12,
    response: {
      text: 'Terima kasih banyak atas review positifnya! Senang bisa membantu 😊',
      createdAt: '2025-11-20'
    }
  },
  {
    id: 'REV002',
    orderCode: 'JP-251105-002',
    jastiperId: 'JST002',
    jastiperName: 'Yuki Tanaka',
    jastiperAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    productName: 'Uniqlo Heattech Long Sleeve',
    rating: 4,
    serviceRating: 4,
    speedRating: 4,
    qualityRating: 5,
    communicationRating: 4,
    reviewText: 'Barang original dan sesuai deskripsi. Proses agak lama karena menunggu schedule keberangkatan, tapi overall puas dengan hasilnya.',
    pros: ['Barang Original', 'Harga Terjangkau', 'Terpercaya'],
    cons: ['Agak Lama'],
    photos: [
      'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg'
    ],
    recommended: true,
    createdAt: '2025-11-18',
    helpful: 8,
    response: null
  },
  {
    id: 'REV003',
    orderCode: 'US-251101-003',
    jastiperId: 'JST003',
    jastiperName: 'Michael Chen',
    jastiperAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    productName: 'iPhone 15 Pro Case',
    rating: 5,
    serviceRating: 5,
    speedRating: 5,
    qualityRating: 5,
    communicationRating: 5,
    reviewText: 'Fast response, barang datang lebih cepat dari estimasi. Michael selalu update status pembelian dan pengiriman. Pasti order lagi next time!',
    pros: ['Super Cepat', 'Komunikatif', 'Update Berkala', 'Profesional'],
    cons: [],
    photos: [
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      'https://images.pexels.com/photos/1616516/pexels-photo-1616516.jpeg'
    ],
    recommended: true,
    createdAt: '2025-11-15',
    helpful: 15,
    response: {
      text: 'Thank you so much! Looking forward to serve you again 🙏',
      createdAt: '2025-11-15'
    }
  },
  {
    id: 'REV004',
    orderCode: 'KR-251025-004',
    jastiperId: 'JST001',
    jastiperName: 'Sarah Kim',
    jastiperAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    productName: 'Innisfree Green Tea Serum',
    rating: 4,
    serviceRating: 4,
    speedRating: 3,
    qualityRating: 5,
    communicationRating: 4,
    reviewText: 'Produk original dan masih fresh. Pengiriman agak delay karena cuaca buruk, tapi Sarah selalu update kondisinya. Good service overall.',
    pros: ['Produk Fresh', 'Original', 'Informatif'],
    cons: ['Sedikit Delay'],
    photos: [],
    recommended: true,
    createdAt: '2025-11-08',
    helpful: 5,
    response: {
      text: 'Terima kasih reviewnya! Mohon maaf untuk delay karena cuaca. Next order pasti lebih lancar! 🙏',
      createdAt: '2025-11-08'
    }
  }
];

// Data chat history
export const chatHistory = [
  {
    id: 'CHAT001',
    jastiperId: 'JST001',
    jastiperName: 'Sarah Kim',
    jastiperAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    buyerName: 'Nadia Putri',
    buyerAvatar: '🛍️',
    lastMessage: 'Baik, nanti saya update kalau sudah sampai Indonesia ya!',
    lastMessageTime: '2025-11-20 15:30',
    unreadCount: 0,
    orderCode: 'KR-251110-001',
    messages: [
      {
        id: 'MSG001',
        sender: 'user',
        text: 'Halo kak, saya mau tanya Laneige Cream Skin Refiner masih ready stock?',
        timestamp: '2025-11-09 10:00',
        read: true
      },
      {
        id: 'MSG002',
        sender: 'jastiper',
        text: 'Halo! Ready kak, kemarin baru cek di Olive Young masih banyak stock 😊',
        timestamp: '2025-11-09 10:15',
        read: true
      },
      {
        id: 'MSG003',
        sender: 'user',
        text: 'Oke sip, saya order 2 ya kak',
        timestamp: '2025-11-09 10:20',
        read: true
      },
      {
        id: 'MSG004',
        sender: 'jastiper',
        text: 'Siap! Sudah saya terima ordernya. Pembayaran bisa transfer ke rekening BCA ya',
        timestamp: '2025-11-09 10:25',
        read: true
      },
      {
        id: 'MSG005',
        sender: 'user',
        text: 'Sudah transfer ya kak, ini buktinya [📸]',
        timestamp: '2025-11-09 11:00',
        read: true
      },
      {
        id: 'MSG006',
        sender: 'jastiper',
        text: 'Sudah saya cek, pembayaran diterima! Nanti saya belikan hari ini ya kak',
        timestamp: '2025-11-09 11:30',
        read: true
      },
      {
        id: 'MSG007',
        sender: 'jastiper',
        text: 'Update: Barang sudah saya beli! Ini foto nota dan produknya [📸]',
        timestamp: '2025-11-10 14:00',
        read: true
      },
      {
        id: 'MSG008',
        sender: 'user',
        text: 'Wah cepat banget! Thanks ya kak 🙏',
        timestamp: '2025-11-10 14:30',
        read: true
      },
      {
        id: 'MSG009',
        sender: 'jastiper',
        text: 'Sama-sama! Saya flight tanggal 15 Nov ke Jakarta, estimasi sampai 16 Nov',
        timestamp: '2025-11-10 15:00',
        read: true
      },
      {
        id: 'MSG010',
        sender: 'jastiper',
        text: 'Baik, nanti saya update kalau sudah sampai Indonesia ya!',
        timestamp: '2025-11-20 15:30',
        read: true
      }
    ]
  },
  {
    id: 'CHAT002',
    jastiperId: 'JST002',
    jastiperName: 'Yuki Tanaka',
    jastiperAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    buyerName: 'Andi Wijaya',
    buyerAvatar: '🧳',
    lastMessage: 'Size M masih ada kok kak',
    lastMessageTime: '2025-11-19 09:15',
    unreadCount: 2,
    orderCode: 'JP-251105-002',
    messages: [
      {
        id: 'MSG011',
        sender: 'user',
        text: 'Kak, Uniqlo Heattech yang long sleeve ada size M?',
        timestamp: '2025-11-18 20:00',
        read: true
      },
      {
        id: 'MSG012',
        sender: 'jastiper',
        text: 'Size M masih ada kok kak',
        timestamp: '2025-11-19 09:15',
        read: false
      },
      {
        id: 'MSG013',
        sender: 'jastiper',
        text: 'Mau saya carikan yang warna apa?',
        timestamp: '2025-11-19 09:16',
        read: false
      }
    ]
  },
  {
    id: 'CHAT003',
    jastiperId: 'JST003',
    jastiperName: 'Michael Chen',
    jastiperAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    lastMessage: 'You are welcome! Feel free to reach out anytime',
    lastMessageTime: '2025-11-15 18:45',
    unreadCount: 0,
    orderCode: 'US-251101-003',
    messages: [
      {
        id: 'MSG014',
        sender: 'user',
        text: 'Hi, do you have iPhone 15 Pro cases from Apple Store?',
        timestamp: '2025-11-01 10:00',
        read: true
      },
      {
        id: 'MSG015',
        sender: 'jastiper',
        text: 'Yes! I can get the official Apple cases. Which color do you prefer?',
        timestamp: '2025-11-01 10:30',
        read: true
      },
      {
        id: 'MSG016',
        sender: 'user',
        text: 'Navy blue please',
        timestamp: '2025-11-01 11:00',
        read: true
      },
      {
        id: 'MSG017',
        sender: 'jastiper',
        text: 'Got it! I will purchase it tomorrow and send you the receipt',
        timestamp: '2025-11-01 11:15',
        read: true
      },
      {
        id: 'MSG018',
        sender: 'user',
        text: 'Perfect! Thank you so much',
        timestamp: '2025-11-01 11:20',
        read: true
      },
      {
        id: 'MSG019',
        sender: 'jastiper',
        text: 'You are welcome! Feel free to reach out anytime',
        timestamp: '2025-11-15 18:45',
        read: true
      }
    ]
  },
  {
    id: 'CHAT004',
    jastiperId: 'JST004',
    jastiperName: 'Lisa Wong',
    jastiperAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    lastMessage: 'Oke kak, terima kasih banyak!',
    lastMessageTime: '2025-11-12 16:20',
    unreadCount: 0,
    orderCode: null,
    messages: [
      {
        id: 'MSG020',
        sender: 'user',
        text: 'Kak, mau tanya untuk tas Charles & Keith yang di postingan masih available?',
        timestamp: '2025-11-12 15:00',
        read: true
      },
      {
        id: 'MSG021',
        sender: 'jastiper',
        text: 'Halo! Maaf kak untuk tas itu sudah sold out 😢',
        timestamp: '2025-11-12 15:30',
        read: true
      },
      {
        id: 'MSG022',
        sender: 'jastiper',
        text: 'Tapi ada model lain yang mirip, mau saya fotoin?',
        timestamp: '2025-11-12 15:31',
        read: true
      },
      {
        id: 'MSG023',
        sender: 'user',
        text: 'Gapapa kak, next time aja. Thanks infonya!',
        timestamp: '2025-11-12 16:15',
        read: true
      },
      {
        id: 'MSG024',
        sender: 'jastiper',
        text: 'Oke kak, terima kasih banyak!',
        timestamp: '2025-11-12 16:20',
        read: true
      }
    ]
  }
];
