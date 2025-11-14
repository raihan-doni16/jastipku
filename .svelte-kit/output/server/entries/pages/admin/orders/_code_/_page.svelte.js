import { X as ensure_array_like, a1 as bind_props } from "../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import { e as escape_html } from "../../../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/state.svelte.js";
import { N as Navbar } from "../../../../../chunks/Navbar.js";
import { S as StatusBadge } from "../../../../../chunks/StatusBadge.js";
import { s as statusMeta } from "../../../../../chunks/mockData.js";
import { a as authStore } from "../../../../../chunks/auth.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let order;
    let data = $$props["data"];
    authStore.subscribe((val) => val.role);
    const formatDate = (value) => new Date(value).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    order = data.order;
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> `);
    if (!order) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<section class="empty"><h1>Pesanan tidak ditemukan</h1> <a href="/admin">Kembali ke dashboard</a></section>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<section class="order-detail svelte-dxu0pa"><header class="svelte-dxu0pa"><div><a class="back-link svelte-dxu0pa" href="/admin">← Kembali</a> <h1>${escape_html(order.code)}</h1> <p>Dibuat ${escape_html(formatDate(order.createdAt))}</p></div> `);
      StatusBadge($$renderer2, { statusMeta, status: order.status });
      $$renderer2.push(`<!----></header> <div class="grid svelte-dxu0pa"><article class="card svelte-dxu0pa"><h2>Pembeli</h2> <p class="title svelte-dxu0pa">${escape_html(order.store ?? order.country)}</p> <p>${escape_html(order.product)}</p> <p>${escape_html(order.variations)}</p></article> <article class="card svelte-dxu0pa"><h2>Estimasi</h2> <p class="title svelte-dxu0pa">Rp ${escape_html(order.estimate.toLocaleString("id-ID"))}</p> <ul><li>Negara: ${escape_html(order.country)}</li> <li>Toko: ${escape_html(order.store ?? "-")}</li></ul></article></div> <article class="card svelte-dxu0pa"><h2>Timeline</h2> <ul class="timeline svelte-dxu0pa"><!--[-->`);
      const each_array = ensure_array_like(order.timeline ?? []);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<li class="svelte-dxu0pa"><strong>${escape_html(item.status)}</strong> <span>${escape_html(item.timestamp)}</span></li>`);
      }
      $$renderer2.push(`<!--]--></ul></article></section>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
