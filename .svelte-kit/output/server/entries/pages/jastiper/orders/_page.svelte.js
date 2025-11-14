import { Y as attr, X as ensure_array_like, $ as attr_style, a0 as stringify } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { b as jastiperOrders } from "../../../../chunks/mockData.js";
import { N as Navbar } from "../../../../chunks/Navbar.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredOrders;
    authStore.subscribe((val) => {
      val.role;
    });
    let filterStatus = "all";
    let searchQuery = "";
    const statusOptions = [
      { value: "all", label: "Semua Status" },
      { value: "waiting_payment", label: "Menunggu Pembayaran" },
      { value: "paid", label: "Sudah Dibayar" },
      { value: "purchased", label: "Barang Dibeli" },
      { value: "shipping", label: "Dalam Pengiriman" },
      { value: "delivered", label: "Terkirim" },
      { value: "completed", label: "Selesai" },
      { value: "cancelled", label: "Dibatalkan" }
    ];
    function formatPrice(price) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    }
    function formatDate(dateString) {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    }
    function getStatusBadge(status) {
      const badges = {
        waiting_payment: { label: "Menunggu Pembayaran", color: "#f59e0b" },
        paid: { label: "Sudah Dibayar", color: "#0ea5e9" },
        dp_paid: { label: "DP Dibayar", color: "#06b6d4" },
        purchased: { label: "Barang Dibeli", color: "#8b5cf6" },
        shipping: { label: "Dalam Pengiriman", color: "#3b82f6" },
        delivered: { label: "Terkirim", color: "#10b981" },
        completed: { label: "Selesai", color: "#059669" },
        cancelled: { label: "Dibatalkan", color: "#ef4444" }
      };
      return badges[status] || { label: status, color: "#64748b" };
    }
    filteredOrders = jastiperOrders.filter((order) => {
      const matchSearch = searchQuery === "";
      return matchSearch;
    });
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-o1fu7"><div class="header svelte-o1fu7"><h1 class="svelte-o1fu7">Pesanan Masuk</h1> <p class="svelte-o1fu7">Kelola semua pesanan dari pembeli</p></div> <div class="stats-cards svelte-o1fu7"><div class="stat-card svelte-o1fu7"><div class="stat-icon svelte-o1fu7" style="background: #fef3c7;">⏳</div> <div class="stat-content svelte-o1fu7"><div class="stat-value svelte-o1fu7">${escape_html(
      // In real app, update via API
      jastiperOrders.filter((o) => o.status === "waiting_payment").length
    )}</div> <div class="stat-label svelte-o1fu7">Menunggu Pembayaran</div></div></div> <div class="stat-card svelte-o1fu7"><div class="stat-icon svelte-o1fu7" style="background: #dbeafe;">💰</div> <div class="stat-content svelte-o1fu7"><div class="stat-value svelte-o1fu7">${escape_html(jastiperOrders.filter((o) => o.paymentStatus === "paid" || o.paymentStatus === "dp_paid").length)}</div> <div class="stat-label svelte-o1fu7">Sudah Dibayar</div></div></div> <div class="stat-card svelte-o1fu7"><div class="stat-icon svelte-o1fu7" style="background: #e9d5ff;">🛍️</div> <div class="stat-content svelte-o1fu7"><div class="stat-value svelte-o1fu7">${escape_html(jastiperOrders.filter((o) => o.status === "purchased").length)}</div> <div class="stat-label svelte-o1fu7">Barang Dibeli</div></div></div> <div class="stat-card svelte-o1fu7"><div class="stat-icon svelte-o1fu7" style="background: #d1fae5;">✅</div> <div class="stat-content svelte-o1fu7"><div class="stat-value svelte-o1fu7">${escape_html(jastiperOrders.filter((o) => o.status === "completed").length)}</div> <div class="stat-label svelte-o1fu7">Selesai</div></div></div></div> <div class="filters svelte-o1fu7"><div class="search-box svelte-o1fu7"><span class="search-icon svelte-o1fu7">🔍</span> <input type="text" placeholder="Cari kode pesanan, pembeli, atau produk..."${attr("value", searchQuery)} class="svelte-o1fu7"/></div> `);
    $$renderer2.select(
      { value: filterStatus, class: "" },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(statusOptions);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let option = each_array[$$index];
          $$renderer3.option({ value: option.value }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(option.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-o1fu7"
    );
    $$renderer2.push(`</div> <div class="results-info svelte-o1fu7">Menampilkan ${escape_html(filteredOrders.length)} dari ${escape_html(jastiperOrders.length)} pesanan</div> <div class="orders-list svelte-o1fu7"><!--[-->`);
    const each_array_1 = ensure_array_like(filteredOrders);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let order = each_array_1[$$index_1];
      $$renderer2.push(`<div class="order-card svelte-o1fu7"><div class="order-header svelte-o1fu7"><div class="order-code-section svelte-o1fu7"><span class="order-code svelte-o1fu7">${escape_html(order.orderCode)}</span> <span class="status-badge svelte-o1fu7"${attr_style(`background-color: ${stringify(getStatusBadge(order.status).color)};`)}>${escape_html(getStatusBadge(order.status).label)}</span></div> <div class="order-date svelte-o1fu7">${escape_html(formatDate(order.createdAt))}</div></div> <div class="order-content svelte-o1fu7"><div class="buyer-info"><div class="info-label svelte-o1fu7">Pembeli</div> <div class="buyer-name svelte-o1fu7">${escape_html(order.buyerName)}</div> <div class="buyer-phone svelte-o1fu7">${escape_html(order.buyerPhone)}</div></div> <div class="product-info"><div class="info-label svelte-o1fu7">Produk</div> <div class="product-name svelte-o1fu7">${escape_html(order.productName)}</div> <div class="product-meta svelte-o1fu7">Qty: ${escape_html(order.quantity)}</div></div> <div class="payment-info"><div class="info-label svelte-o1fu7">Pembayaran</div> <div class="payment-method svelte-o1fu7">${escape_html(order.paymentMethod === "full" ? "Bayar Penuh" : "DP 50%")}</div> `);
      if (order.paymentMethod === "dp") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="payment-amount svelte-o1fu7">DP: ${escape_html(formatPrice(order.dpAmount || 0))}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="total-amount svelte-o1fu7">${escape_html(formatPrice(order.totalPrice))}</div></div> <div class="dates-info svelte-o1fu7">`);
      if (order.paidAt) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="date-item svelte-o1fu7"><span class="date-label svelte-o1fu7">Dibayar:</span> <span class="date-value svelte-o1fu7">${escape_html(formatDate(order.paidAt))}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (order.purchasedAt) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="date-item svelte-o1fu7"><span class="date-label svelte-o1fu7">Dibeli:</span> <span class="date-value svelte-o1fu7">${escape_html(formatDate(order.purchasedAt))}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div> <div class="order-actions svelte-o1fu7"><button class="btn-secondary svelte-o1fu7">Lihat Detail</button> `);
      if (order.status === "paid") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="btn-primary svelte-o1fu7">Tandai Sudah Dibeli</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (order.status === "purchased") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="btn-primary svelte-o1fu7">Atur Pengiriman</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredOrders.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="empty-state svelte-o1fu7"><div class="empty-icon svelte-o1fu7">📦</div> <h3 class="svelte-o1fu7">Belum ada pesanan</h3> <p class="svelte-o1fu7">Pesanan dari pembeli akan muncul di sini</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
