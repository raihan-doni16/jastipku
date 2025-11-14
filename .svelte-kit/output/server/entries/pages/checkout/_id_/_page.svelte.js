import { W as store_get, Z as attr_class, Y as attr, _ as unsubscribe_stores } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { N as Navbar } from "../../../../chunks/Navbar.js";
import { l as listings } from "../../../../chunks/mockData.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let listingId, listing, isPrelovedOrder;
    authStore.subscribe((val) => {
      val.role;
    });
    let step = 1;
    let agreedToTerms = false;
    let orderForm = {
      quantity: 1,
      estimatedPrice: 0
    };
    listingId = store_get($$store_subs ??= {}, "$page", page).params.id;
    listing = listings.find((l) => l.id === listingId);
    isPrelovedOrder = listing?.type === "preloved";
    isPrelovedOrder ? 0 : orderForm.estimatedPrice * (listing?.fee ?? 0) / 100;
    isPrelovedOrder ? (listing?.price ?? 0) * orderForm.quantity : orderForm.estimatedPrice * orderForm.quantity;
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-1rf9upl">`);
    if (!listing) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="not-found svelte-1rf9upl"><h2>Postingan tidak ditemukan</h2> <a href="/browse" class="btn-back svelte-1rf9upl">Kembali ke Browse</a></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="checkout-header svelte-1rf9upl"><h1 class="svelte-1rf9upl">Checkout</h1> <div class="steps svelte-1rf9upl"><div${attr_class("step-item svelte-1rf9upl", void 0, { "active": step >= 1, "completed": step > 1 })}><div class="step-number svelte-1rf9upl">1</div> <span class="svelte-1rf9upl">Syarat &amp; Ketentuan</span></div> <div class="step-divider svelte-1rf9upl"></div> <div${attr_class("step-item svelte-1rf9upl", void 0, { "active": step >= 2, "completed": step > 2 })}><div class="step-number svelte-1rf9upl">2</div> <span class="svelte-1rf9upl">Detail Pesanan</span></div> <div class="step-divider svelte-1rf9upl"></div> <div${attr_class("step-item svelte-1rf9upl", void 0, { "active": step >= 3 })}><div class="step-number svelte-1rf9upl">3</div> <span class="svelte-1rf9upl">Pembayaran</span></div></div></div> `);
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="step-content svelte-1rf9upl"><div class="listing-summary svelte-1rf9upl"><div class="summary-image svelte-1rf9upl">${escape_html(listing.images[0])}</div> <div class="summary-info svelte-1rf9upl"><h3 class="svelte-1rf9upl">${escape_html(listing.title)}</h3> <p class="jastiper-name svelte-1rf9upl">oleh ${escape_html(listing.jastiperName)}</p> <p class="country svelte-1rf9upl">${escape_html(listing.country)}</p></div></div> <div class="terms-box svelte-1rf9upl"><h2 class="svelte-1rf9upl">Syarat &amp; Ketentuan</h2> <p class="terms-intro svelte-1rf9upl">Harap baca dan setujui syarat dan ketentuan berikut sebelum melanjutkan pemesanan:</p> <div class="terms-list svelte-1rf9upl"><div class="term-item svelte-1rf9upl"><div class="term-icon svelte-1rf9upl">⚠️</div> <div class="term-content svelte-1rf9upl"><h4 class="svelte-1rf9upl">Risiko Out of Stock</h4> <ul class="svelte-1rf9upl"><li class="svelte-1rf9upl">Barang yang dipesan mungkin tidak tersedia (out of stock) di lokasi pembelian</li> <li class="svelte-1rf9upl">Jika barang tidak tersedia, pembeli akan mendapat refund penuh</li> <li class="svelte-1rf9upl">Jastiper akan berusaha mencari alternatif produk serupa dengan persetujuan pembeli</li></ul></div></div> <div class="term-item svelte-1rf9upl"><div class="term-icon svelte-1rf9upl">💰</div> <div class="term-content svelte-1rf9upl"><h4 class="svelte-1rf9upl">Kebijakan Pembayaran</h4> <ul class="svelte-1rf9upl"><li class="svelte-1rf9upl">Tersedia 2 opsi: DP 50% atau pembayaran penuh</li> <li class="svelte-1rf9upl">DP dibayar saat checkout, sisanya setelah barang dibeli</li> <li class="svelte-1rf9upl">Pembayaran penuh memberikan prioritas dalam antrian pembelian</li> <li class="svelte-1rf9upl">Bukti pembelian akan dikirimkan setelah barang dibeli</li></ul></div></div> <div class="term-item svelte-1rf9upl"><div class="term-icon svelte-1rf9upl">✈️</div> <div class="term-content svelte-1rf9upl"><h4 class="svelte-1rf9upl">Estimasi Waktu</h4> <ul class="svelte-1rf9upl"><li class="svelte-1rf9upl">Jastiper berangkat: ${escape_html(new Date(listing.departureDate).toLocaleDateString("id-ID"))}</li> <li class="svelte-1rf9upl">Jastiper kembali: ${escape_html(new Date(listing.returnDate).toLocaleDateString("id-ID"))}</li> <li class="svelte-1rf9upl">Estimasi pengiriman ke pembeli: ${escape_html(new Date(listing.estimateDelivery).toLocaleDateString("id-ID"))}</li> <li class="svelte-1rf9upl">Estimasi dapat berubah karena kondisi penerbangan atau bea cukai</li></ul></div></div> <div class="term-item svelte-1rf9upl"><div class="term-icon svelte-1rf9upl">📦</div> <div class="term-content svelte-1rf9upl"><h4 class="svelte-1rf9upl">Pengiriman</h4> <ul class="svelte-1rf9upl"><li class="svelte-1rf9upl">Pengiriman dimulai setelah jastiper kembali ke Indonesia</li> <li class="svelte-1rf9upl">Barang akan melalui proses bea cukai terlebih dahulu</li> <li class="svelte-1rf9upl">Pembeli akan mendapat nomor resi kurir domestik</li> <li class="svelte-1rf9upl">Biaya pengiriman domestik sudah termasuk dalam fee jastip</li></ul></div></div> <div class="term-item svelte-1rf9upl"><div class="term-icon svelte-1rf9upl">🔄</div> <div class="term-content svelte-1rf9upl"><h4 class="svelte-1rf9upl">Kebijakan Refund &amp; Penggantian</h4> <ul class="svelte-1rf9upl"><li class="svelte-1rf9upl">Refund penuh jika barang tidak tersedia atau cacat/rusak</li> <li class="svelte-1rf9upl">Pembeli dapat cancel dengan refund penuh sebelum jastiper berangkat</li> <li class="svelte-1rf9upl">Setelah berangkat, pembeli menanggung biaya 20% jika cancel sepihak</li> <li class="svelte-1rf9upl">Komplain harus diajukan maksimal 2x24 jam setelah barang diterima</li></ul></div></div></div> <div class="agreement svelte-1rf9upl"><label class="checkbox-label svelte-1rf9upl"><input type="checkbox"${attr("checked", agreedToTerms, true)} class="svelte-1rf9upl"/> <span class="svelte-1rf9upl">Saya telah membaca dan menyetujui semua syarat dan ketentuan di atas. Saya
                memahami risiko yang ada dan bersedia melanjutkan pemesanan.</span></label></div> <button class="btn-primary svelte-1rf9upl"${attr("disabled", !agreedToTerms, true)}>Lanjutkan ke Pemesanan</button></div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
