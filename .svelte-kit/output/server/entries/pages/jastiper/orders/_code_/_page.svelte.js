import { X as ensure_array_like, Z as attr_class, a1 as bind_props } from "../../../../../chunks/index2.js";
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
    let order, reached;
    let data = $$props["data"];
    authStore.subscribe((val) => val.role);
    const statusFlow = [
      { key: "waiting_payment", label: "Menunggu Pembayaran" },
      { key: "paid", label: "Pembayaran Lunas" },
      { key: "dp_paid", label: "DP Dibayar" },
      { key: "waiting_purchase", label: "Menunggu Pembelian" },
      { key: "purchased", label: "Barang Dibeli" },
      { key: "shipping", label: "Dalam Pengiriman" },
      { key: "delivered", label: "Sudah Dikirim" },
      { key: "completed", label: "Selesai" }
    ];
    const formatCurrency = (value = 0) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
    const formatDate = (value) => value ? new Date(value).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }) : "-";
    order = data.order;
    reached = statusFlow.map((step) => ({
      ...step,
      active: order?.status === step.key,
      done: !!order && statusFlow.findIndex((item) => item.key === order.status) >= statusFlow.findIndex((item) => item.key === step.key)
    }));
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> `);
    if (!order) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<section class="empty svelte-14ybw7n"><h1>Pesanan tidak ditemukan</h1> <a href="/jastiper/orders">Kembali ke daftar pesanan</a></section>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<section class="order-detail svelte-14ybw7n"><header class="order-header svelte-14ybw7n"><div><a href="/jastiper/orders" class="back-link svelte-14ybw7n">← Kembali</a> <h1>${escape_html(order.orderCode)}</h1> <p>Dibuat pada ${escape_html(formatDate(order.createdAt))}</p></div> `);
      StatusBadge($$renderer2, { statusMeta, status: order.status });
      $$renderer2.push(`<!----></header> <div class="status-card svelte-14ybw7n"><h2 class="svelte-14ybw7n">Progress Pesanan</h2> <div class="status-flow svelte-14ybw7n"><!--[-->`);
      const each_array = ensure_array_like(reached);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let step = each_array[$$index];
        $$renderer2.push(`<div${attr_class(`step ${step.done ? "done" : ""} ${step.active ? "active" : ""}`, "svelte-14ybw7n")}><div class="dot svelte-14ybw7n"></div> <span>${escape_html(step.label)}</span></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="summary-grid svelte-14ybw7n"><article class="card svelte-14ybw7n"><h3>Informasi Pembeli</h3> <p class="highlight svelte-14ybw7n">${escape_html(order.buyerName)}</p> <p>${escape_html(order.buyerPhone)}</p> <p>${escape_html(order.shippingAddress ?? "Alamat belum tersedia")}</p></article> <article class="card svelte-14ybw7n"><h3>Detail Produk</h3> <p class="highlight svelte-14ybw7n">${escape_html(order.productName)}</p> <p>Jumlah: ${escape_html(order.quantity)}</p> <p>Link Produk: ${escape_html(order.productUrl ?? "-")}</p> <p>Catatan: ${escape_html(order.notes ?? "-")}</p></article> <article class="card svelte-14ybw7n"><h3>Pembayaran</h3> <p>Metode: ${escape_html(order.paymentMethod === "dp" ? "DP 50%" : "Full Payment")}</p> `);
      if (order.dpAmount) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p>DP: ${escape_html(formatCurrency(order.dpAmount))}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <p>Total: ${escape_html(formatCurrency(order.totalPrice))}</p> <p>Fee Jastip: ${escape_html(formatCurrency(order.fee ?? 0))}</p></article></div> <div class="timeline-grid svelte-14ybw7n"><article class="card svelte-14ybw7n"><h3>Riwayat Waktu</h3> <ul class="timeline svelte-14ybw7n"><li class="svelte-14ybw7n"><span>Dibuat</span> <strong>${escape_html(formatDate(order.createdAt))}</strong></li> `);
      if (order.paidAt) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<li class="svelte-14ybw7n"><span>Dibayar</span> <strong>${escape_html(formatDate(order.paidAt))}</strong></li>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (order.purchasedAt) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<li class="svelte-14ybw7n"><span>Barang Dibeli</span> <strong>${escape_html(formatDate(order.purchasedAt))}</strong></li>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></ul></article> <article class="card actions-card svelte-14ybw7n"><h3>Aksi Cepat</h3> <div class="actions svelte-14ybw7n"><button type="button" class="primary svelte-14ybw7n">Update Status</button> <a href="/jastiper/chats" class="ghost svelte-14ybw7n">Hubungi Pembeli</a></div></article></div></section>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
