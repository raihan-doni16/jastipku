import { a1 as bind_props, X as ensure_array_like, Z as attr_class } from "../../../../chunks/index2.js";
import { e as escape_html } from "../../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { N as Navbar } from "../../../../chunks/Navbar.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { S as StatusBadge } from "../../../../chunks/StatusBadge.js";
import { s as statusMeta } from "../../../../chunks/mockData.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let order, costBreakdown;
    let data = $$props["data"];
    const tabs = [
      "Ringkasan",
      "Chat",
      "Negosiasi",
      "Final Produk",
      "Pengiriman",
      "Riwayat"
    ];
    let activeTab = "Ringkasan";
    let showModal = false;
    order = data.order;
    costBreakdown = data.costBreakdown;
    data.chats ?? [];
    data.history ?? [];
    order ? `https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20ingin%20tanya%20pesanan%20${order.code}` : "#";
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Navbar($$renderer3, {});
      $$renderer3.push(`<!----> `);
      if (!order) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<section class="empty svelte-10aea4e"><h1>Pesanan tidak ditemukan</h1> <a href="/orders">Kembali ke Pesanan Saya</a></section>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<section class="detail svelte-10aea4e"><a class="back-link svelte-10aea4e" href="/orders">← Kembali</a> <header class="order-header svelte-10aea4e"><h1 class="svelte-10aea4e">${escape_html(order.code)}</h1> `);
        StatusBadge($$renderer3, { statusMeta, status: order.status });
        $$renderer3.push(`<!----> <p class="svelte-10aea4e">Dibuat: ${escape_html(order.createdAt)} · Estimasi total Rp ${escape_html(order.estimate.toLocaleString("id-ID"))}</p></header> <nav class="tab-nav svelte-10aea4e"><!--[-->`);
        const each_array = ensure_array_like(tabs);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let tab = each_array[$$index];
          $$renderer3.push(`<button${attr_class("svelte-10aea4e", void 0, { "active": activeTab === tab })}>${escape_html(tab)}</button>`);
        }
        $$renderer3.push(`<!--]--></nav> `);
        {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="grid ringkasan svelte-10aea4e"><article class="card svelte-10aea4e"><h2 class="svelte-10aea4e">Informasi Pemesanan</h2> <div class="row svelte-10aea4e"><span>Negara</span> <strong class="svelte-10aea4e">${escape_html(order.country)}</strong></div> <div class="row svelte-10aea4e"><span>Toko</span> <strong class="svelte-10aea4e">${escape_html(order.store)}</strong></div> <div class="row svelte-10aea4e"><span>Produk</span> <strong class="svelte-10aea4e">${escape_html(order.product)}</strong></div> <div class="row svelte-10aea4e"><span>Variasi</span> <strong class="svelte-10aea4e">${escape_html(order.variations)}</strong></div></article> <article class="card cost svelte-10aea4e"><h2 class="svelte-10aea4e">Estimasi Biaya</h2> <ul class="svelte-10aea4e"><li class="svelte-10aea4e"><span>Harga Minimum</span> <strong>Rp ${escape_html(costBreakdown.min.toLocaleString("id-ID"))}</strong></li> <li class="svelte-10aea4e"><span>Harga Maksimum</span> <strong>Rp ${escape_html(costBreakdown.max.toLocaleString("id-ID"))}</strong></li> <li class="svelte-10aea4e"><span>Fee Jastip (8%)</span> <strong>Rp ${escape_html(costBreakdown.fee.toLocaleString("id-ID"))}</strong></li> <li class="svelte-10aea4e"><span>Admin &amp; Logistik</span> <strong>Rp ${escape_html(costBreakdown.adminFees.toLocaleString("id-ID"))}</strong></li></ul> <div class="total svelte-10aea4e"><span>Total Estimasi</span> <strong>Rp ${escape_html(costBreakdown.total.toLocaleString("id-ID"))}</strong></div></article></div>`);
        }
        $$renderer3.push(`<!--]--> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></section>`);
      }
      $$renderer3.push(`<!--]--> `);
      Modal($$renderer3, {
        title: "Konfirmasi Pembelian Final",
        showCancel: true,
        confirmText: "Setujui",
        cancelText: "Ajukan Perubahan",
        get isOpen() {
          return showModal;
        },
        set isOpen($$value) {
          showModal = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="order-modal svelte-10aea4e"><table class="order-modal-table svelte-10aea4e"><thead><tr><th class="svelte-10aea4e">Nama Produk</th><th class="svelte-10aea4e">Variasi</th><th class="svelte-10aea4e">Qty</th><th class="svelte-10aea4e">Harga IDR</th></tr></thead><tbody class="svelte-10aea4e"><tr><td class="svelte-10aea4e">${escape_html(order.product)}</td><td class="svelte-10aea4e">${escape_html(order.variations)}</td><td class="svelte-10aea4e">1</td><td class="svelte-10aea4e">Rp 2.332.800</td></tr></tbody></table></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
