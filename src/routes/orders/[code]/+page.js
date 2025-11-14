import { orders } from '$lib/data/mockData';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const order = orders.find((item) => item.code === params.code);

  if (!order) {
    return {
      order: null,
      status: 404
    };
  }

  const adminFees = 350000;
  const feePercent = 0.08;
  const fee = Math.round(order.estimate * feePercent);
  const total = order.estimate + fee + adminFees;

  return {
    order,
    costBreakdown: {
      min: Math.round(order.estimate * 0.95),
      max: Math.round(order.estimate * 1.1),
      fee,
      adminFees,
      total
    },
    chats: [
      {
        sender: 'Admin',
        message: 'Halo, kami sudah konfirmasi ketersediaan barang di toko.',
        time: '2024-01-02 10:15 WIB'
      },
      {
        sender: 'User',
        message: 'Siap kak, tolong dibelikan warna Navy ukuran M ya.',
        time: '2024-01-02 10:28 WIB'
      },
      {
        sender: 'Admin',
        message: 'Oke, estimasi beli besok jam 3 sore waktu Tokyo.',
        time: '2024-01-02 11:02 WIB'
      }
    ],
    history: [
      { status: 'Menunggu_Review_Admin', desc: 'Permintaan baru dibuat.', time: '2024-01-02 09:40' },
      { status: 'Disetujui_Admin', desc: 'Admin menyetujui pesanan.', time: '2024-01-02 11:20' },
      { status: 'Diproses_Penjemputan', desc: 'Admin sedang menuju toko.', time: '2024-01-03 09:15' },
      { status: 'Dalam_Penerbangan', desc: 'Barang dibawa dalam flight JL725.', time: '2024-01-04 13:30' },
      { status: 'Dikirim_Kurir', desc: 'Resi JNE dikirim ke pembeli.', time: '2024-01-05 10:20' }
    ]
  };
}
