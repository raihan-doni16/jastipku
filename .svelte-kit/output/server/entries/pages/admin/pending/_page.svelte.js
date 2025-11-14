import { X as ensure_array_like } from "../../../../chunks/index2.js";
import { e as escape_html } from "../../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { S as StatusBadge } from "../../../../chunks/StatusBadge.js";
import { o as orders, s as statusMeta } from "../../../../chunks/mockData.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const initialQueue = orders.filter((order) => order.status === "Menunggu_Review_Admin").map((order) => ({ ...order, state: "pending" }));
    let queue = initialQueue;
    $$renderer2.push(`<section class="pending svelte-tw5h6k"><a class="back-link svelte-tw5h6k" href="/admin">← Kembali</a> <header class="svelte-tw5h6k"><div><h1 class="svelte-tw5h6k">Antrian Permintaan Baru</h1> <p class="svelte-tw5h6k">Terima atau tolak permintaan pengguna sebelum masuk tahap negosiasi. Setelah diterima,
        lanjutkan ke halaman review untuk penanganan detail.</p></div> <a href="/admin" class="back svelte-tw5h6k">← Kembali ke Dashboard</a></header> <div class="list svelte-tw5h6k">`);
    if (queue.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="empty svelte-tw5h6k">Belum ada permintaan baru. Pesanan yang menunggu akan tampil di sini untuk kamu ambil.</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(queue);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let order = each_array[$$index];
        $$renderer2.push(`<article class="card svelte-tw5h6k"><header class="svelte-tw5h6k"><div><h2 class="svelte-tw5h6k">${escape_html(order.code)}</h2> <p class="svelte-tw5h6k">${escape_html(order.store)} · ${escape_html(order.country)}</p></div> `);
        StatusBadge($$renderer2, { statusMeta, status: order.status });
        $$renderer2.push(`<!----></header> <div class="info svelte-tw5h6k"><div><span class="svelte-tw5h6k">Produk</span> <strong>${escape_html(order.product)}</strong></div> <div><span class="svelte-tw5h6k">Variasi</span> <strong>${escape_html(order.variations)}</strong></div> <div><span class="svelte-tw5h6k">Estimasi Total</span> <strong>Rp ${escape_html(order.estimate.toLocaleString("id-ID"))}</strong></div></div> `);
        if (order.state === "pending") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="actions svelte-tw5h6k"><button class="primary svelte-tw5h6k" type="button">Ambil Pesanan</button> <button class="ghost danger svelte-tw5h6k" type="button">Tolak Pesanan</button></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (order.state === "accepted") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="accepted svelte-tw5h6k">✅ Pesanan diambil. Lanjutkan ke halaman negosiasi. <button class="primary svelte-tw5h6k" type="button">Buka Halaman Negosiasi</button></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<div class="declined svelte-tw5h6k">❌ Pesanan ditolak. Sistem akan mengirim notifikasi ke pengguna.</div>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--></article>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
  });
}
export {
  _page as default
};
