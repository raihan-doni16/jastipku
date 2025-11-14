import { W as store_get, X as ensure_array_like, $ as attr_style, Y as attr, a0 as stringify, _ as unsubscribe_stores } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { a as authStore } from "../../../chunks/auth.js";
import { N as Navbar, c as cartStore } from "../../../chunks/Navbar.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let cart, cartItems;
    authStore.subscribe((val) => {
      val.role;
    });
    function formatPrice(price) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    }
    function calculateItemPrice(item) {
      const listing = item.listing;
      if (listing.type === "preloved") {
        return listing.price * item.quantity;
      } else {
        const estimatedPrice = listing.minOrder || 0;
        const fee = estimatedPrice * (listing.fee || 0) / 100;
        return (estimatedPrice + fee) * item.quantity;
      }
    }
    function calculateSubtotal() {
      return cartItems.reduce(
        (total, item) => {
          return total + calculateItemPrice(item);
        },
        0
      );
    }
    function calculateTotalFee() {
      return cartItems.reduce(
        (total, item) => {
          const listing = item.listing;
          if (listing.type !== "preloved") {
            const estimatedPrice = listing.minOrder || 0;
            const fee = estimatedPrice * (listing.fee || 0) / 100;
            return total + fee * item.quantity;
          }
          return total;
        },
        0
      );
    }
    cart = store_get($$store_subs ??= {}, "$cartStore", cartStore);
    cartItems = cart.items;
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-k7hhd7"><div class="header svelte-k7hhd7"><h1 class="svelte-k7hhd7">Keranjang Belanja</h1> <p class="svelte-k7hhd7">Review pesanan Anda sebelum checkout</p></div> `);
    if (cartItems.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="empty-cart svelte-k7hhd7"><span class="empty-icon svelte-k7hhd7">🛒</span> <h2 class="svelte-k7hhd7">Keranjang Anda Kosong</h2> <p class="svelte-k7hhd7">Mulai berbelanja dan tambahkan produk ke keranjang Anda</p> <button class="btn-browse svelte-k7hhd7">Mulai Belanja</button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="cart-grid svelte-k7hhd7"><div class="cart-items svelte-k7hhd7"><div class="items-header svelte-k7hhd7"><h2 class="svelte-k7hhd7">Item dalam Keranjang (${escape_html(cartItems.length)})</h2></div> <!--[-->`);
      const each_array = ensure_array_like(cartItems);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<div class="cart-item svelte-k7hhd7"><div class="item-image svelte-k7hhd7"><div class="image-placeholder svelte-k7hhd7">${escape_html(item.listing.images[0])}</div> <span class="type-badge svelte-k7hhd7"${attr_style(`background: ${stringify(item.listing.type === "jastip" ? "#0ea5e9" : item.listing.type === "preloved" ? "#f97316" : "#a855f7")}`)}>${escape_html(item.listing.type === "jastip" ? "Jastip" : item.listing.type === "preloved" ? "Preloved" : "Event")}</span></div> <div class="item-details svelte-k7hhd7"><h3 class="svelte-k7hhd7"><a${attr("href", `/browse/${stringify(item.listing.id)}`)} class="svelte-k7hhd7">${escape_html(item.listing.title)}</a></h3> <p class="item-jastiper svelte-k7hhd7">oleh ${escape_html(item.listing.jastiperName)} • ${escape_html(item.listing.country)}</p> `);
        if (item.listing.type === "preloved") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="item-price svelte-k7hhd7">${escape_html(formatPrice(item.listing.price))} / item</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="item-info svelte-k7hhd7"><span>Min Order: ${escape_html(formatPrice(item.listing.minOrder))}</span> <span>Fee: ${escape_html(item.listing.fee)}%</span></div>`);
        }
        $$renderer2.push(`<!--]--></div> <div class="item-actions svelte-k7hhd7"><div class="quantity-control svelte-k7hhd7"><button class="qty-btn svelte-k7hhd7">−</button> <input type="number"${attr("value", item.quantity)} min="1" max="99" class="svelte-k7hhd7"/> <button class="qty-btn svelte-k7hhd7">+</button></div> <div class="item-total svelte-k7hhd7">${escape_html(formatPrice(calculateItemPrice(item)))}</div> <button class="btn-remove svelte-k7hhd7">🗑️ Hapus</button></div></div>`);
      }
      $$renderer2.push(`<!--]--> <button class="btn-continue svelte-k7hhd7">← Lanjut Belanja</button></div> <div class="order-summary svelte-k7hhd7"><h3 class="svelte-k7hhd7">Ringkasan Pesanan</h3> <div class="summary-row svelte-k7hhd7"><span class="svelte-k7hhd7">Subtotal (${escape_html(cartItems.length)} item)</span> <span class="value svelte-k7hhd7">${escape_html(formatPrice(calculateSubtotal() - calculateTotalFee()))}</span></div> <div class="summary-row svelte-k7hhd7"><span class="svelte-k7hhd7">Total Fee Jastip</span> <span class="value svelte-k7hhd7">${escape_html(formatPrice(calculateTotalFee()))}</span></div> <hr class="svelte-k7hhd7"/> <div class="summary-row total svelte-k7hhd7"><span class="svelte-k7hhd7">Total</span> <span class="value svelte-k7hhd7">${escape_html(formatPrice(calculateSubtotal()))}</span></div> <div class="info-box svelte-k7hhd7"><p class="svelte-k7hhd7"><strong>Catatan:</strong> Harga final dapat berubah sesuai harga aktual produk
            saat pembelian. Anda akan dikonfirmasi sebelum pembayaran.</p></div> <button class="btn-checkout svelte-k7hhd7">Lanjut ke Checkout</button> <div class="benefits svelte-k7hhd7"><div class="benefit-item svelte-k7hhd7"><span class="benefit-icon svelte-k7hhd7">✓</span> <span>100% Aman &amp; Terpercaya</span></div> <div class="benefit-item svelte-k7hhd7"><span class="benefit-icon svelte-k7hhd7">✓</span> <span>Garansi Uang Kembali</span></div> <div class="benefit-item svelte-k7hhd7"><span class="benefit-icon svelte-k7hhd7">✓</span> <span>Tracking Real-time</span></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
