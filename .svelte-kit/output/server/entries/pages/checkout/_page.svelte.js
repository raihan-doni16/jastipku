import { W as store_get, Z as attr_class, Y as attr, X as ensure_array_like, _ as unsubscribe_stores } from "../../../chunks/index2.js";
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
    let step = 1;
    let agreedToTerms = false;
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
      return cartItems.reduce((total, item) => total + calculateItemPrice(item), 0);
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
    function calculateTotal() {
      return calculateSubtotal();
    }
    cart = store_get($$store_subs ??= {}, "$cartStore", cartStore);
    cartItems = cart.items;
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-jbcej5"><div class="header svelte-jbcej5"><h1 class="svelte-jbcej5">Checkout</h1> <p class="svelte-jbcej5">Selesaikan pesanan Anda</p></div> <div class="checkout-grid svelte-jbcej5"><div class="checkout-content svelte-jbcej5"><div class="progress-steps svelte-jbcej5"><div${attr_class("step svelte-jbcej5", void 0, { "active": step >= 1, "completed": step > 1 })}><div class="step-number svelte-jbcej5">1</div> <span class="svelte-jbcej5">Syarat &amp; Ketentuan</span></div> <div${attr_class("step-line svelte-jbcej5", void 0, { "completed": step > 1 })}></div> <div${attr_class("step svelte-jbcej5", void 0, { "active": step >= 2, "completed": step > 2 })}><div class="step-number svelte-jbcej5">2</div> <span class="svelte-jbcej5">Data Pengiriman</span></div> <div${attr_class("step-line svelte-jbcej5", void 0, { "completed": step > 2 })}></div> <div${attr_class("step svelte-jbcej5", void 0, { "active": step >= 3 })}><div class="step-number svelte-jbcej5">3</div> <span class="svelte-jbcej5">Pembayaran</span></div></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="step-content svelte-jbcej5"><h2 class="svelte-jbcej5">Syarat &amp; Ketentuan</h2> <div class="terms-box svelte-jbcej5"><h3 class="svelte-jbcej5">Ketentuan Umum</h3> <ul class="svelte-jbcej5"><li class="svelte-jbcej5">Harga final dapat berubah sesuai harga aktual produk saat pembelian</li> <li class="svelte-jbcej5">Anda akan dikonfirmasi terlebih dahulu sebelum pembayaran final</li> <li class="svelte-jbcej5">Pembayaran DP 50% akan dikembalikan jika harga final jauh berbeda</li> <li class="svelte-jbcej5">Estimasi waktu pengiriman bergantung pada jadwal keberangkatan jastiper</li></ul> <h3 class="svelte-jbcej5">Kebijakan Pembatalan</h3> <ul class="svelte-jbcej5"><li class="svelte-jbcej5">Pembatalan dapat dilakukan sebelum jastiper membeli produk</li> <li class="svelte-jbcej5">Refund akan diproses dalam 3-7 hari kerja</li> <li class="svelte-jbcej5">Biaya admin 5% akan dikenakan untuk pembatalan</li></ul> <h3 class="svelte-jbcej5">Ketentuan Preloved</h3> <ul class="svelte-jbcej5"><li class="svelte-jbcej5">Barang preloved dijual dalam kondisi apa adanya</li> <li class="svelte-jbcej5">Foto dan deskripsi merepresentasikan kondisi aktual</li> <li class="svelte-jbcej5">Tidak ada refund untuk barang preloved kecuali tidak sesuai deskripsi</li></ul></div> <label class="checkbox-label svelte-jbcej5"><input type="checkbox"${attr("checked", agreedToTerms, true)} class="svelte-jbcej5"/> <span class="svelte-jbcej5">Saya telah membaca dan menyetujui syarat &amp; ketentuan di atas</span></label> <div class="button-group svelte-jbcej5"><button class="btn-secondary svelte-jbcej5">← Kembali ke Keranjang</button> <button class="btn-primary svelte-jbcej5"${attr("disabled", !agreedToTerms, true)}>Lanjut ke Pengiriman →</button></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="order-summary svelte-jbcej5"><h3 class="svelte-jbcej5">Ringkasan Pesanan</h3> <div class="summary-items svelte-jbcej5"><!--[-->`);
    const each_array_1 = ensure_array_like(cartItems);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array_1[$$index_1];
      $$renderer2.push(`<div class="summary-item svelte-jbcej5"><div class="item-image-small svelte-jbcej5">${escape_html(item.listing.images[0])}</div> <div class="item-info svelte-jbcej5"><div class="item-title svelte-jbcej5">${escape_html(item.listing.title)}</div> <div class="item-meta svelte-jbcej5"><span>${escape_html(item.listing.jastiperName)}</span> <span>×${escape_html(item.quantity)}</span></div> <div class="item-price svelte-jbcej5">${escape_html(formatPrice(calculateItemPrice(item)))}</div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <hr class="svelte-jbcej5"/> <div class="summary-row svelte-jbcej5"><span class="svelte-jbcej5">Subtotal (${escape_html(cartItems.length)} item)</span> <span class="value svelte-jbcej5">${escape_html(formatPrice(calculateSubtotal() - calculateTotalFee()))}</span></div> <div class="summary-row svelte-jbcej5"><span class="svelte-jbcej5">Total Fee Jastip</span> <span class="value svelte-jbcej5">${escape_html(formatPrice(calculateTotalFee()))}</span></div> <hr class="svelte-jbcej5"/> <div class="summary-row total svelte-jbcej5"><span class="svelte-jbcej5">Total</span> <span class="value svelte-jbcej5">${escape_html(formatPrice(calculateTotal()))}</span></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
