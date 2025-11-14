import { X as ensure_array_like, $ as attr_style, Y as attr, Z as attr_class } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { o as orders, j as jastiperTransactions, l as listings, a as jastipers, k as kpis } from "../../../chunks/mockData.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    orders.filter((item) => item.status === "Menunggu_Review_Admin");
    orders.filter((item) => item.status === "Perlu_Negosiasi");
    orders.filter((item) => item.status !== "Menunggu_Review_Admin" && item.status !== "Perlu_Negosiasi");
    const transactionSummary = {
      volume: jastiperTransactions.reduce((sum, trx) => sum + trx.amount, 0),
      held: jastiperTransactions.filter((trx) => trx.status === "held").length,
      pending: jastiperTransactions.filter((trx) => trx.status === "pending").length,
      released: jastiperTransactions.filter((trx) => trx.status === "released").length
    };
    const recentTransactions = [...jastiperTransactions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    const listingSummary = [
      {
        label: "Listing Aktif",
        value: listings.filter((item) => item.status === "available").length,
        accent: "#0ea5e9"
      },
      {
        label: "Tipe Jastip",
        value: listings.filter((item) => item.type === "jastip").length,
        accent: "#22c55e"
      },
      {
        label: "Tipe Preloved",
        value: listings.filter((item) => item.type === "preloved").length,
        accent: "#f97316"
      },
      {
        label: "Event Aktif",
        value: listings.filter((item) => item.type === "event").length,
        accent: "#a855f7"
      }
    ];
    const topListings = [...listings].sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0)).slice(0, 3);
    const jastiperStats = {
      verified: jastipers.filter((item) => item.status === "verified" || item.verified).length,
      pending: jastipers.filter((item) => item.status !== "verified" && !item.verified).length,
      avgRating: jastipers.length > 0 ? (jastipers.reduce((sum, item) => sum + item.rating, 0) / jastipers.length).toFixed(1) : "0.0"
    };
    const topJastipers = [...jastipers].sort((a, b) => b.rating - a.rating || b.totalTrips - a.totalTrips).slice(0, 3);
    function formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
    }
    function formatDate(value) {
      return new Date(value).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
    }
    $$renderer2.push(`<section class="admin svelte-1jef3w8"><header class="svelte-1jef3w8"><div><h1 class="svelte-1jef3w8">Dashboard Admin</h1> <p>Monitor antrian permintaan dan tindak lanjuti secara real-time.</p></div></header> <div class="kpis svelte-1jef3w8"><!--[-->`);
    const each_array = ensure_array_like(kpis);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<div class="kpi-card svelte-1jef3w8"${attr_style(`--color: ${item.color}`)}><span class="label svelte-1jef3w8">${escape_html(item.label)}</span> <strong class="svelte-1jef3w8">${escape_html(item.value)}</strong></div>`);
    }
    $$renderer2.push(`<!--]--></div> <section class="insights svelte-1jef3w8"><article class="panel transactions-panel svelte-1jef3w8"><div class="panel-header svelte-1jef3w8"><div><h2 class="svelte-1jef3w8">Ringkasan Transaksi</h2> <p class="svelte-1jef3w8">Performa escrow, release, dan payout jastiper.</p></div> <a href="/admin/transactions" class="panel-link svelte-1jef3w8">Kelola</a></div> <div class="transaction-stats svelte-1jef3w8"><div class="stat-card svelte-1jef3w8"><span class="label svelte-1jef3w8">Volume 30 hari</span> <strong>${escape_html(formatCurrency(transactionSummary.volume))}</strong></div> <div class="stat-card svelte-1jef3w8"><span class="label svelte-1jef3w8">Dana Ditahan</span> <strong>${escape_html(transactionSummary.held)}</strong> <small class="svelte-1jef3w8">menunggu bukti kirim</small></div> <div class="stat-card svelte-1jef3w8"><span class="label svelte-1jef3w8">Payout Pending</span> <strong>${escape_html(transactionSummary.pending)}</strong> <small class="svelte-1jef3w8">butuh approval</small></div> <div class="stat-card svelte-1jef3w8"><span class="label svelte-1jef3w8">Payout Release</span> <strong>${escape_html(transactionSummary.released)}</strong> <small class="svelte-1jef3w8">siap dicairkan</small></div></div> <div class="table-wrapper svelte-1jef3w8"><table class="svelte-1jef3w8"><thead class="svelte-1jef3w8"><tr><th class="svelte-1jef3w8">Tanggal</th><th class="svelte-1jef3w8">Order</th><th class="svelte-1jef3w8">Jastiper</th><th class="svelte-1jef3w8">Status</th><th class="svelte-1jef3w8">Jumlah</th></tr></thead><tbody class="svelte-1jef3w8"><!--[-->`);
    const each_array_1 = ensure_array_like(recentTransactions);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let trx = each_array_1[$$index_1];
      $$renderer2.push(`<tr class="svelte-1jef3w8"><td class="svelte-1jef3w8">${escape_html(formatDate(trx.createdAt))}</td><td class="svelte-1jef3w8"><a class="link-inline svelte-1jef3w8"${attr("href", `/admin/orders/${trx.orderCode}`)}>${escape_html(trx.orderCode)}</a></td><td class="svelte-1jef3w8">${escape_html(trx.jastiperName)}</td><td class="svelte-1jef3w8"><span${attr_class(`status-chip ${trx.status}`, "svelte-1jef3w8")}>${escape_html(trx.status === "held" ? "Ditahan" : trx.status === "released" ? "Tersedia" : trx.status === "pending" ? "Pending" : "Selesai")}</span></td><td class="svelte-1jef3w8">${escape_html(formatCurrency(trx.amount))}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></article> <article class="panel listings-panel svelte-1jef3w8"><div class="panel-header svelte-1jef3w8"><div><h2 class="svelte-1jef3w8">Ringkasan Postingan</h2> <p class="svelte-1jef3w8">Aktivitas konten jastip, preloved dan event.</p></div> <a href="/admin/posts" class="panel-link svelte-1jef3w8">Moderasi</a></div> <div class="listing-summary svelte-1jef3w8"><!--[-->`);
    const each_array_2 = ensure_array_like(listingSummary);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let item = each_array_2[$$index_2];
      $$renderer2.push(`<div class="summary-chip svelte-1jef3w8"${attr_style(`--accent: ${item.accent}`)}><span class="chip-label svelte-1jef3w8">${escape_html(item.label)}</span> <strong>${escape_html(item.value)}</strong></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="top-listings svelte-1jef3w8"><!--[-->`);
    const each_array_3 = ensure_array_like(topListings);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let listing = each_array_3[$$index_3];
      $$renderer2.push(`<div class="listing-card svelte-1jef3w8"><div class="listing-icon svelte-1jef3w8">${escape_html(listing.images[0])}</div> <div><h3 class="svelte-1jef3w8">${escape_html(listing.title)}</h3> <p class="svelte-1jef3w8">${escape_html(listing.country)}</p> <div class="listing-meta svelte-1jef3w8"><span>${escape_html(listing.type === "jastip" ? "Jastip" : listing.type)}</span> <span>${escape_html(listing.sold ?? 0)}/${escape_html(listing.quota ?? 0)} slot</span></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></article> <article class="panel jastiper-panel svelte-1jef3w8"><div class="panel-header svelte-1jef3w8"><div><h2 class="svelte-1jef3w8">Performa Jastiper</h2> <p class="svelte-1jef3w8">Gap supply, rating, dan top performers.</p></div> <a href="/admin/jastiper" class="panel-link svelte-1jef3w8">Review</a></div> <div class="jastiper-stats svelte-1jef3w8"><div><span class="label svelte-1jef3w8">Terverifikasi</span> <strong>${escape_html(jastiperStats.verified)}</strong></div> <div><span class="label svelte-1jef3w8">Menunggu</span> <strong>${escape_html(jastiperStats.pending)}</strong></div> <div><span class="label svelte-1jef3w8">Rata-rata Rating</span> <strong>${escape_html(jastiperStats.avgRating)}</strong></div></div> <div class="top-jastipers svelte-1jef3w8"><!--[-->`);
    const each_array_4 = ensure_array_like(topJastipers);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let performer = each_array_4[$$index_4];
      $$renderer2.push(`<div class="jastiper-row svelte-1jef3w8"><div class="avatar svelte-1jef3w8">${escape_html(performer.avatar)}</div> <div class="info svelte-1jef3w8"><strong>${escape_html(performer.name)}</strong> <span class="svelte-1jef3w8">${escape_html(performer.country)} · ${escape_html(performer.totalTrips)} trip</span></div> <div class="rating svelte-1jef3w8">⭐ ${escape_html(performer.rating)}</div></div>`);
    }
    $$renderer2.push(`<!--]--></div></article></section></section>`);
  });
}
export {
  _page as default
};
