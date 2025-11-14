import { X as ensure_array_like, Y as attr } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { N as Navbar } from "../../../chunks/Navbar.js";
import { S as StatusBadge } from "../../../chunks/StatusBadge.js";
import { o as orders, s as statusMeta } from "../../../chunks/mockData.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredOrders;
    let statusFilter = "all";
    let search = "";
    filteredOrders = orders.filter((order) => {
      const term = search.trim().toLowerCase();
      const matchSearch = !term || order.code.toLowerCase().includes(term) || order.store.toLowerCase().includes(term) || order.product.toLowerCase().includes(term);
      return matchSearch;
    });
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <section class="orders svelte-1c7g62i"><header class="svelte-1c7g62i"><div><h1 class="svelte-1c7g62i">Pesanan Saya</h1> <p>Lihat status terbaru permintaan titip yang kamu ajukan.</p></div></header> <div class="filters svelte-1c7g62i"><div class="group svelte-1c7g62i"><label for="status">Status</label> `);
    $$renderer2.select(
      { id: "status", value: statusFilter, class: "" },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`Semua Status`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(Object.keys(statusMeta));
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let key = each_array[$$index];
          $$renderer3.option({ value: key }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(statusMeta[key].label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-1c7g62i"
    );
    $$renderer2.push(`</div> <div class="group svelte-1c7g62i"><label for="search">Cari</label> <input id="search" placeholder="Cari kode, toko, atau produk"${attr("value", search)} class="svelte-1c7g62i"/></div></div> <div class="table-wrapper svelte-1c7g62i"><table class="svelte-1c7g62i"><thead><tr><th class="svelte-1c7g62i">Kode Pesanan</th><th class="svelte-1c7g62i">Negara</th><th class="svelte-1c7g62i">Toko</th><th class="svelte-1c7g62i">Ringkas Produk</th><th class="svelte-1c7g62i">Status</th><th class="svelte-1c7g62i">Estimasi Total</th><th class="svelte-1c7g62i">Tanggal dibuat</th><th class="svelte-1c7g62i">Aksi</th></tr></thead><tbody class="svelte-1c7g62i">`);
    if (filteredOrders.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<tr class="svelte-1c7g62i"><td colspan="8" class="empty svelte-1c7g62i">Belum ada pesanan dengan filter ini.</td></tr>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(filteredOrders);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let order = each_array_1[$$index_1];
        $$renderer2.push(`<tr class="svelte-1c7g62i"><td class="svelte-1c7g62i"><a${attr("href", `/orders/${order.code}`)}>${escape_html(order.code)}</a></td><td class="svelte-1c7g62i">${escape_html(order.country)}</td><td class="svelte-1c7g62i">${escape_html(order.store)}</td><td class="svelte-1c7g62i"><strong class="svelte-1c7g62i">${escape_html(order.product)}</strong> <span class="svelte-1c7g62i">${escape_html(order.variations)}</span></td><td class="svelte-1c7g62i">`);
        StatusBadge($$renderer2, { statusMeta, status: order.status });
        $$renderer2.push(`<!----></td><td class="svelte-1c7g62i">Rp ${escape_html(order.estimate.toLocaleString("id-ID"))}</td><td class="svelte-1c7g62i">${escape_html(order.createdAt)}</td><td class="svelte-1c7g62i"><a class="detail-link svelte-1c7g62i"${attr("href", `/orders/${order.code}`)}>Detail</a></td></tr>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div> <div class="cards svelte-1c7g62i"><!--[-->`);
    const each_array_2 = ensure_array_like(filteredOrders);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let order = each_array_2[$$index_2];
      $$renderer2.push(`<article class="order-card svelte-1c7g62i"><header class="svelte-1c7g62i"><a${attr("href", `/orders/${order.code}`)}>${escape_html(order.code)}</a> `);
      StatusBadge($$renderer2, { statusMeta, status: order.status });
      $$renderer2.push(`<!----></header> <p class="store svelte-1c7g62i">${escape_html(order.store)} · ${escape_html(order.country)}</p> <p class="product svelte-1c7g62i">${escape_html(order.product)}</p> <p class="variation">${escape_html(order.variations)}</p> <footer class="svelte-1c7g62i"><span>Estimasi: Rp ${escape_html(order.estimate.toLocaleString("id-ID"))}</span> <span>Dibuat: ${escape_html(order.createdAt)}</span></footer> <a class="detail-link svelte-1c7g62i"${attr("href", `/orders/${order.code}`)}>Detail Pesanan</a></article>`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
  });
}
export {
  _page as default
};
