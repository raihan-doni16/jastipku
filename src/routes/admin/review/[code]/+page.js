import { orders } from '$lib/data/mockData';

/** @type {import('./$types').PageLoad} */
export function load({ params, url }) {
  const order = orders.find((item) => item.code === params.code);

  return {
    order,
    mode: url.searchParams.get('mode') ?? 'review',
    negotiationNotes: [
      {
        author: 'Admin Taro',
        message: 'Harga dari toko naik, mohon konfirmasi penyesuaian Rp 150.000.',
        time: '2024-03-17 09:45'
      },
      {
        author: 'User Mega',
        message: 'Boleh, asalkan stok warna biru tetap tersedia.',
        time: '2024-03-17 11:02'
      }
    ]
  };
}
