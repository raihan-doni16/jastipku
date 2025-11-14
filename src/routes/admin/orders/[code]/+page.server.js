import { error } from '@sveltejs/kit';
import { orders } from '$lib/data/mockData';

export function load({ params }) {
  const order = orders.find((item) => item.code === params.code);
  if (!order) {
    throw error(404, 'Pesanan tidak ditemukan');
  }

  return { order };
}
