import { W as store_get, $ as attr_style, a0 as stringify, X as ensure_array_like, Y as attr, _ as unsubscribe_stores } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { N as Navbar } from "../../../../chunks/Navbar.js";
import { R as RatingStars } from "../../../../chunks/RatingStars.js";
import { l as listings } from "../../../../chunks/mockData.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let listingId, listing;
    let currentRole = "guest";
    authStore.subscribe((val) => {
      currentRole = val.role;
    });
    let quantity = 1;
    let addedToCart = false;
    function formatPrice(price) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    }
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    }
    listingId = store_get($$store_subs ??= {}, "$page", page).params.id;
    listing = listings.find((l) => l.id === listingId);
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-p88sn7">`);
    if (!listing) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="not-found svelte-p88sn7"><h2 class="svelte-p88sn7">Postingan tidak ditemukan</h2> <p class="svelte-p88sn7">Postingan yang Anda cari tidak ditemukan atau sudah dihapus.</p> <a href="/browse" class="btn-back svelte-p88sn7">Kembali ke Browse</a></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="breadcrumb svelte-p88sn7"><a href="/browse" class="svelte-p88sn7">Browse</a> <span>/</span> <span>${escape_html(listing.title)}</span></div> <div class="detail-grid svelte-p88sn7"><div class="gallery svelte-p88sn7"><div class="main-image svelte-p88sn7"><div class="image-placeholder svelte-p88sn7">${escape_html(listing.images[0])}</div></div> <div class="type-badge svelte-p88sn7"${attr_style(`background-color: ${stringify(listing.type === "jastip" ? "#0ea5e9" : listing.type === "preloved" ? "#f97316" : "#a855f7")}`)}>${escape_html(listing.type === "jastip" ? "Jastip" : listing.type === "preloved" ? "Preloved" : "Event")}</div></div> <div class="main-info svelte-p88sn7"><h1 class="title svelte-p88sn7">${escape_html(listing.title)}</h1> `);
      if (listing.type === "preloved") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="price-section svelte-p88sn7"><div class="current-price svelte-p88sn7">${escape_html(formatPrice(listing.price))}</div> `);
        if (listing.originalPrice) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="original-price svelte-p88sn7">${escape_html(formatPrice(listing.originalPrice))}</div> <div class="discount svelte-p88sn7">${escape_html(Math.round((listing.originalPrice - listing.price) / listing.originalPrice * 100))}%
                OFF</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <div class="condition-badge svelte-p88sn7">Kondisi: ${escape_html(listing.condition)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="fee-section svelte-p88sn7"><span class="fee-label svelte-p88sn7">Fee Jastip:</span> <span class="fee-value svelte-p88sn7">${escape_html(listing.fee)}% dari harga barang</span></div> <div class="min-order svelte-p88sn7">Minimal Order: ${escape_html(formatPrice(listing.minOrder))}</div>`);
      }
      $$renderer2.push(`<!--]--> <div class="description svelte-p88sn7"><h3 class="svelte-p88sn7">Deskripsi</h3> <p class="svelte-p88sn7">${escape_html(listing.description)}</p></div> <div class="details-grid svelte-p88sn7"><div class="detail-item svelte-p88sn7"><span class="detail-label svelte-p88sn7">Negara Asal</span> <span class="detail-value svelte-p88sn7">${escape_html(listing.country)}</span></div> `);
      if (listing.type !== "preloved") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="detail-item svelte-p88sn7"><span class="detail-label svelte-p88sn7">Tanggal Berangkat</span> <span class="detail-value svelte-p88sn7">${escape_html(formatDate(listing.departureDate))}</span></div> <div class="detail-item svelte-p88sn7"><span class="detail-label svelte-p88sn7">Tanggal Kembali</span> <span class="detail-value svelte-p88sn7">${escape_html(formatDate(listing.returnDate))}</span></div> <div class="detail-item svelte-p88sn7"><span class="detail-label svelte-p88sn7">Estimasi Pengiriman</span> <span class="detail-value svelte-p88sn7">${escape_html(formatDate(listing.estimateDelivery))}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (listing.stores) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="detail-item full-width svelte-p88sn7"><span class="detail-label svelte-p88sn7">Toko Tersedia</span> <div class="stores-list svelte-p88sn7"><!--[-->`);
        const each_array = ensure_array_like(listing.stores);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let store = each_array[$$index];
          $$renderer2.push(`<span class="store-tag svelte-p88sn7">${escape_html(store)}</span>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      if (listing.type !== "preloved") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="quota-section svelte-p88sn7"><div class="quota-header svelte-p88sn7"><span>Slot Tersedia</span> <span class="quota-count svelte-p88sn7">${escape_html(listing.quota - listing.sold)} dari ${escape_html(listing.quota)}</span></div> <div class="quota-bar svelte-p88sn7"><div class="quota-fill svelte-p88sn7"${attr_style(`width: ${stringify(listing.sold / listing.quota * 100)}%`)}></div></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="categories-section svelte-p88sn7"><h4 class="svelte-p88sn7">Kategori</h4> <div class="categories svelte-p88sn7"><!--[-->`);
      const each_array_1 = ensure_array_like(listing.categories);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let category = each_array_1[$$index_1];
        $$renderer2.push(`<span class="category-tag svelte-p88sn7">${escape_html(category)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div> `);
      if (currentRole !== "admin") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="quantity-section svelte-p88sn7"><label class="svelte-p88sn7">Jumlah</label> <div class="quantity-control svelte-p88sn7"><button class="qty-btn svelte-p88sn7">−</button> <input type="number"${attr("value", quantity)} min="1" max="99" class="svelte-p88sn7"/> <button class="qty-btn svelte-p88sn7">+</button></div></div> <div class="action-buttons svelte-p88sn7"><button class="btn-add-cart svelte-p88sn7"${attr("disabled", addedToCart, true)}>${escape_html("🛒 Tambah ke Keranjang")}</button> <button class="btn-buy-now svelte-p88sn7">${escape_html(listing.type === "preloved" ? "Beli Sekarang" : "Order Sekarang")}</button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="jastiper-card svelte-p88sn7"><h3 class="svelte-p88sn7">Tentang Jastiper</h3> <div class="jastiper-profile svelte-p88sn7"><div class="jastiper-avatar svelte-p88sn7">${escape_html(listing.jastiperAvatar)}</div> <div class="jastiper-info svelte-p88sn7"><h4 class="svelte-p88sn7">${escape_html(listing.jastiperName)}</h4> <div class="rating svelte-p88sn7">`);
      RatingStars($$renderer2, { rating: listing.jastiperRating });
      $$renderer2.push(`<!----> <span class="rating-value svelte-p88sn7">${escape_html(listing.jastiperRating)}</span></div></div></div> <div class="jastiper-stats svelte-p88sn7"><div class="stat svelte-p88sn7"><span class="stat-label svelte-p88sn7">Total Trip</span> <span class="stat-value svelte-p88sn7">45+</span></div> <div class="stat svelte-p88sn7"><span class="stat-label svelte-p88sn7">Verified</span> <span class="stat-value verified svelte-p88sn7">✓</span></div></div> `);
      if (currentRole !== "admin") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<a href="/chats" class="btn-chat svelte-p88sn7">Chat Jastiper</a>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div> <div class="terms-section svelte-p88sn7"><h3 class="svelte-p88sn7">Syarat &amp; Ketentuan</h3> <div class="terms-content svelte-p88sn7"><div class="term-item svelte-p88sn7"><span class="term-icon svelte-p88sn7">⚠️</span> <div><h4 class="svelte-p88sn7">Risiko Out of Stock</h4> <p class="svelte-p88sn7">Barang yang dipesan mungkin tidak tersedia di lokasi pembelian. Jika terjadi,
              pembeli akan direfund penuh.</p></div></div> <div class="term-item svelte-p88sn7"><span class="term-icon svelte-p88sn7">💰</span> <div><h4 class="svelte-p88sn7">Kebijakan Pembayaran</h4> <p class="svelte-p88sn7">Tersedia opsi DP 50% atau pembayaran penuh. Sisa pembayaran dilakukan setelah
              barang dibeli.</p></div></div> <div class="term-item svelte-p88sn7"><span class="term-icon svelte-p88sn7">📦</span> <div><h4 class="svelte-p88sn7">Estimasi Pengiriman</h4> <p class="svelte-p88sn7">Pengiriman dimulai setelah jastiper kembali ke Indonesia. Estimasi dapat berubah
              tergantung kondisi.</p></div></div> <div class="term-item svelte-p88sn7"><span class="term-icon svelte-p88sn7">🔄</span> <div><h4 class="svelte-p88sn7">Kebijakan Refund</h4> <p class="svelte-p88sn7">Refund penuh jika barang tidak tersedia atau tidak sesuai. Buyer menanggung biaya
              return jika cancel sepihak.</p></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
