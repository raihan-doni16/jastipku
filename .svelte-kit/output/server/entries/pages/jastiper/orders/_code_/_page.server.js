import { error } from "@sveltejs/kit";
import { b as jastiperOrders } from "../../../../../chunks/mockData.js";
async function load({ params }) {
  const order = jastiperOrders.find((item) => item.orderCode === params.code);
  if (!order) {
    throw error(404, "Pesanan tidak ditemukan");
  }
  return {
    order
  };
}
export {
  load
};
