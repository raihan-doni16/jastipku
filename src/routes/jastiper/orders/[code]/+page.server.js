import { error } from '@sveltejs/kit';
import { jastiperOrders } from '$lib/data/mockData';

export async function load({ params }) {
  const order = jastiperOrders.find((item) => item.orderCode === params.code);
  if (!order) {
    throw error(404, 'Pesanan tidak ditemukan');
  }

  return {
    order
  };
}
