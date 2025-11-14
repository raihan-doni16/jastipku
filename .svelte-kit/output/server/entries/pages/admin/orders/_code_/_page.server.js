import { error } from "@sveltejs/kit";
import { o as orders } from "../../../../../chunks/mockData.js";
function load({ params }) {
  const order = orders.find((item) => item.code === params.code);
  if (!order) {
    throw error(404, "Pesanan tidak ditemukan");
  }
  return { order };
}
export {
  load
};
