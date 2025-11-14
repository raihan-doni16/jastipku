import { X as ensure_array_like, $ as attr_style, a0 as stringify, Z as attr_class } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import { e as escape_html } from "../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { a as authStore } from "../../../chunks/auth.js";
import { N as Navbar } from "../../../chunks/Navbar.js";
import { c as chatHistory, b as jastiperOrders, l as listings, j as jastiperTransactions } from "../../../chunks/mockData.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let myOrders, myListings, myTransactions, pendingBalance, activeBalance, newOrders, purchasedOrders, completedOrders, activeListings, totalSold;
    authStore.subscribe((val) => {
      val.role;
    });
    const currentJastiperId = "JST001";
    let selectedChatId = null;
    let chats = chatHistory.filter((chat) => chat.jastiperId === currentJastiperId).map((chat) => ({ ...chat, messages: [...chat.messages] }));
    function formatPrice(price) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    }
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    }
    myOrders = jastiperOrders.filter((order) => order.jastiperId === currentJastiperId);
    myListings = listings.filter((listing) => listing.jastiperId === currentJastiperId);
    myTransactions = jastiperTransactions.filter((trx) => trx.jastiperId === currentJastiperId);
    if (!selectedChatId && chats.length > 0) {
      selectedChatId = chats[0].id;
    }
    chats.find((chat) => chat.id === selectedChatId) ?? null;
    pendingBalance = myTransactions.filter((t) => t.type === "income" && t.status === "pending").reduce((sum, t) => sum + t.amount, 0);
    activeBalance = myTransactions.filter((t) => t.type === "income" && t.status === "released").reduce((sum, t) => sum + t.amount, 0);
    newOrders = myOrders.filter((o) => o.status === "waiting_purchase").length;
    purchasedOrders = myOrders.filter((o) => o.status === "purchased").length;
    completedOrders = myOrders.filter((o) => o.status === "completed").length;
    activeListings = myListings.filter((l) => l.status === "available").length;
    totalSold = myListings.reduce((sum, l) => sum + (l.sold || 0), 0);
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-1q93x6x"><div class="header svelte-1q93x6x"><div><h1 class="svelte-1q93x6x">Dashboard Jastiper</h1> <p class="svelte-1q93x6x">Selamat datang kembali, Sarah Kim! 👋</p></div> <a href="/jastiper/listings/create" class="btn-create svelte-1q93x6x"><span class="svelte-1q93x6x">+</span> Buat Postingan Baru</a></div> <div class="kpi-grid svelte-1q93x6x"><div class="kpi-card svelte-1q93x6x"><div class="kpi-icon svelte-1q93x6x" style="background: #eff6ff; color: #1e40af;">💰</div> <div class="kpi-content svelte-1q93x6x"><span class="kpi-label svelte-1q93x6x">Saldo Aktif</span> <span class="kpi-value svelte-1q93x6x" style="color: #0ea5e9;">${escape_html(formatPrice(activeBalance))}</span> <span class="kpi-sublabel svelte-1q93x6x">Siap dicairkan</span></div></div> <div class="kpi-card svelte-1q93x6x"><div class="kpi-icon svelte-1q93x6x" style="background: #fef3c7; color: #92400e;">⏳</div> <div class="kpi-content svelte-1q93x6x"><span class="kpi-label svelte-1q93x6x">Saldo Tertahan</span> <span class="kpi-value svelte-1q93x6x" style="color: #f59e0b;">${escape_html(formatPrice(pendingBalance))}</span> <span class="kpi-sublabel svelte-1q93x6x">Menunggu konfirmasi</span></div></div> <div class="kpi-card svelte-1q93x6x"><div class="kpi-icon svelte-1q93x6x" style="background: #dcfce7; color: #15803d;">📦</div> <div class="kpi-content svelte-1q93x6x"><span class="kpi-label svelte-1q93x6x">Pesanan Baru</span> <span class="kpi-value svelte-1q93x6x" style="color: #22c55e;">${escape_html(newOrders)}</span> <span class="kpi-sublabel svelte-1q93x6x">Perlu dibeli</span></div></div> <div class="kpi-card svelte-1q93x6x"><div class="kpi-icon svelte-1q93x6x" style="background: #fae8ff; color: #86198f;">📝</div> <div class="kpi-content svelte-1q93x6x"><span class="kpi-label svelte-1q93x6x">Listing Aktif</span> <span class="kpi-value svelte-1q93x6x" style="color: #a855f7;">${escape_html(activeListings)}</span> <span class="kpi-sublabel svelte-1q93x6x">Postingan tersedia</span></div></div></div> <div class="stats-grid svelte-1q93x6x"><div class="stat-card svelte-1q93x6x"><span class="stat-icon svelte-1q93x6x">✅</span> <span class="stat-number svelte-1q93x6x">${escape_html(completedOrders)}</span> <span class="stat-label svelte-1q93x6x">Pesanan Selesai</span></div> <div class="stat-card svelte-1q93x6x"><span class="stat-icon svelte-1q93x6x">🛒</span> <span class="stat-number svelte-1q93x6x">${escape_html(purchasedOrders)}</span> <span class="stat-label svelte-1q93x6x">Sudah Dibeli</span></div> <div class="stat-card svelte-1q93x6x"><span class="stat-icon svelte-1q93x6x">⭐</span> <span class="stat-number svelte-1q93x6x">4.8</span> <span class="stat-label svelte-1q93x6x">Rating</span></div> <div class="stat-card svelte-1q93x6x"><span class="stat-icon svelte-1q93x6x">🎯</span> <span class="stat-number svelte-1q93x6x">${escape_html(totalSold)}</span> <span class="stat-label svelte-1q93x6x">Total Penjualan</span></div></div> <div class="content-grid svelte-1q93x6x"><div class="section-card svelte-1q93x6x"><div class="section-header svelte-1q93x6x"><h2 class="svelte-1q93x6x">Pesanan Terbaru</h2> <a href="/jastiper/orders" class="link svelte-1q93x6x">Lihat Semua →</a></div> `);
    if (myOrders.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="empty-state svelte-1q93x6x"><span class="empty-icon svelte-1q93x6x">📦</span> <p class="svelte-1q93x6x">Belum ada pesanan</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="orders-list svelte-1q93x6x"><!--[-->`);
      const each_array = ensure_array_like(myOrders.slice(0, 5));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let order = each_array[$$index];
        $$renderer2.push(`<div class="order-item svelte-1q93x6x"><div class="order-info svelte-1q93x6x"><span class="order-code svelte-1q93x6x">${escape_html(order.orderCode)}</span> <span class="order-product svelte-1q93x6x">${escape_html(order.productName)}</span> <span class="order-buyer svelte-1q93x6x">Pembeli: ${escape_html(order.buyerName)}</span></div> <div class="order-meta svelte-1q93x6x"><span class="status-badge svelte-1q93x6x"${attr_style(`background: ${stringify(order.status === "purchased" ? "#dcfce7" : "#fef3c7")}; color: ${stringify(order.status === "purchased" ? "#15803d" : "#92400e")}`)}>${escape_html(order.status === "purchased" ? "Sudah Dibeli" : "Menunggu")}</span> <span class="order-amount svelte-1q93x6x">${escape_html(formatPrice(order.totalPrice))}</span></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="section-card svelte-1q93x6x"><div class="section-header svelte-1q93x6x"><h2 class="svelte-1q93x6x">Postingan Saya</h2> <a href="/jastiper/listings" class="link svelte-1q93x6x">Kelola →</a></div> `);
    if (myListings.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="empty-state svelte-1q93x6x"><span class="empty-icon svelte-1q93x6x">📝</span> <p class="svelte-1q93x6x">Belum ada postingan</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="listings-list svelte-1q93x6x"><!--[-->`);
      const each_array_1 = ensure_array_like(myListings.slice(0, 3));
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let listing = each_array_1[$$index_1];
        $$renderer2.push(`<div class="listing-item svelte-1q93x6x"><div class="listing-icon svelte-1q93x6x">${escape_html(listing.images[0])}</div> <div class="listing-info svelte-1q93x6x"><h4 class="svelte-1q93x6x">${escape_html(listing.title)}</h4> <p class="listing-country svelte-1q93x6x">${escape_html(listing.country)}</p> <div class="listing-stats svelte-1q93x6x">`);
        if (listing.type === "preloved") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="stat svelte-1q93x6x">Harga: ${escape_html(formatPrice(listing.price))}</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<span class="stat svelte-1q93x6x">${escape_html(listing.sold)}/${escape_html(listing.quota)} slot</span> <span class="stat svelte-1q93x6x">Fee: ${escape_html(listing.fee)}%</span>`);
        }
        $$renderer2.push(`<!--]--></div></div> <span class="type-badge svelte-1q93x6x"${attr_style(`background: ${stringify(listing.type === "jastip" ? "#0ea5e9" : listing.type === "preloved" ? "#f97316" : "#a855f7")}`)}>${escape_html(listing.type === "jastip" ? "Jastip" : listing.type === "preloved" ? "Preloved" : "Event")}</span></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="section-card svelte-1q93x6x"><div class="section-header svelte-1q93x6x"><h2 class="svelte-1q93x6x">Transaksi Terbaru</h2> <a href="/jastiper/wallet" class="link svelte-1q93x6x">Lihat Semua →</a></div> `);
    if (myTransactions.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="empty-state svelte-1q93x6x"><span class="empty-icon svelte-1q93x6x">💳</span> <p class="svelte-1q93x6x">Belum ada transaksi</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="transactions-table svelte-1q93x6x"><table class="svelte-1q93x6x"><thead><tr><th class="svelte-1q93x6x">Tanggal</th><th class="svelte-1q93x6x">Deskripsi</th><th class="svelte-1q93x6x">Tipe</th><th class="svelte-1q93x6x">Status</th><th class="svelte-1q93x6x">Jumlah</th></tr></thead><tbody><!--[-->`);
      const each_array_2 = ensure_array_like(myTransactions.slice(0, 5));
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let trx = each_array_2[$$index_2];
        $$renderer2.push(`<tr class="svelte-1q93x6x"><td class="svelte-1q93x6x">${escape_html(formatDate(trx.createdAt))}</td><td class="svelte-1q93x6x">${escape_html(trx.description)}</td><td class="svelte-1q93x6x"><span${attr_class("type-label svelte-1q93x6x", void 0, {
          "income": trx.type === "income",
          "withdrawal": trx.type === "withdrawal"
        })}>${escape_html(trx.type === "income" ? "Pemasukan" : "Penarikan")}</span></td><td class="svelte-1q93x6x"><span class="status-badge small svelte-1q93x6x"${attr_style(`background: ${stringify(trx.status === "completed" ? "#dcfce7" : trx.status === "released" ? "#dbeafe" : "#fef3c7")}; color: ${stringify(trx.status === "completed" ? "#15803d" : trx.status === "released" ? "#1e40af" : "#92400e")}`)}>${escape_html(trx.status === "completed" ? "Selesai" : trx.status === "released" ? "Tersedia" : "Tertahan")}</span></td><td class="svelte-1q93x6x"><span${attr_class("amount svelte-1q93x6x", void 0, { "positive": trx.amount > 0, "negative": trx.amount < 0 })}>${escape_html(formatPrice(Math.abs(trx.amount)))}</span></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
