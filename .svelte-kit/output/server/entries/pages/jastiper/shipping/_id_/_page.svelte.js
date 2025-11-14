import { W as store_get, X as ensure_array_like, Y as attr, _ as unsubscribe_stores } from "../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/state.svelte.js";
import { p as page } from "../../../../../chunks/stores.js";
import { a as authStore } from "../../../../../chunks/auth.js";
import { b as jastiperOrders } from "../../../../../chunks/mockData.js";
import { N as Navbar } from "../../../../../chunks/Navbar.js";
import { e as escape_html } from "../../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let orderId, order;
    authStore.subscribe((val) => {
      val.role;
    });
    let shippingData = {
      courier: "",
      trackingNumber: "",
      estimatedDelivery: "",
      senderName: "",
      senderPhone: "",
      notes: ""
    };
    const courierOptions = [
      { value: "jne", label: "JNE" },
      { value: "jnt", label: "J&T Express" },
      { value: "sicepat", label: "SiCepat" },
      { value: "anteraja", label: "AnterAja" },
      { value: "idexpress", label: "ID Express" },
      { value: "ninja", label: "Ninja Express" },
      { value: "tiki", label: "TIKI" },
      { value: "pos", label: "Pos Indonesia" }
    ];
    function formatPrice(price) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    }
    orderId = store_get($$store_subs ??= {}, "$page", page).params.id;
    order = jastiperOrders.find((o) => o.id === orderId);
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-1codj44"><div class="header svelte-1codj44"><button class="back-button svelte-1codj44">← Kembali</button> <h1 class="svelte-1codj44">Manajemen Pengiriman</h1> <p class="svelte-1codj44">Atur pengiriman untuk pesanan ini</p></div> `);
    if (order) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="content-grid svelte-1codj44"><div class="info-card svelte-1codj44"><h2 class="svelte-1codj44">Informasi Pesanan</h2> <div class="info-section svelte-1codj44"><div class="info-label svelte-1codj44">Kode Pesanan</div> <div class="info-value svelte-1codj44">${escape_html(order.orderCode)}</div></div> <div class="info-section svelte-1codj44"><div class="info-label svelte-1codj44">Pembeli</div> <div class="info-value svelte-1codj44">${escape_html(order.buyerName)}</div> <div class="info-subvalue svelte-1codj44">${escape_html(order.buyerPhone)}</div></div> <div class="info-section svelte-1codj44"><div class="info-label svelte-1codj44">Produk</div> <div class="info-value svelte-1codj44">${escape_html(order.productName)}</div> <div class="info-subvalue svelte-1codj44">Qty: ${escape_html(order.quantity)}</div></div> <div class="info-section svelte-1codj44"><div class="info-label svelte-1codj44">Total Pembayaran</div> <div class="info-value price svelte-1codj44">${escape_html(formatPrice(order.totalPrice))}</div></div> <div class="alert-info svelte-1codj44"><strong class="svelte-1codj44">📌 Catatan:</strong> <p class="svelte-1codj44">Pastikan barang sudah dikemas dengan baik sebelum dikirim.</p></div></div> <div class="form-card svelte-1codj44"><h2 class="svelte-1codj44">Form Pengiriman</h2> <div class="form-group svelte-1codj44"><label for="courier" class="svelte-1codj44">Pilih Kurir <span class="required svelte-1codj44">*</span></label> `);
      $$renderer2.select(
        { id: "courier", value: shippingData.courier, class: "" },
        ($$renderer3) => {
          $$renderer3.option({ value: "" }, ($$renderer4) => {
            $$renderer4.push(`-- Pilih Kurir --`);
          });
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(courierOptions);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let courier = each_array[$$index];
            $$renderer3.option({ value: courier.value }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(courier.label)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        },
        "svelte-1codj44"
      );
      $$renderer2.push(`</div> <div class="form-group svelte-1codj44"><label for="trackingNumber" class="svelte-1codj44">Nomor Resi <span class="required svelte-1codj44">*</span></label> <input id="trackingNumber" type="text"${attr("value", shippingData.trackingNumber)} placeholder="Contoh: JNE12345678" class="svelte-1codj44"/></div> <div class="form-group svelte-1codj44"><label for="estimatedDelivery" class="svelte-1codj44">Estimasi Tiba (Opsional)</label> <input id="estimatedDelivery" type="date"${attr("value", shippingData.estimatedDelivery)} class="svelte-1codj44"/></div> <div class="form-group svelte-1codj44"><label for="senderName" class="svelte-1codj44">Nama Pengirim (Opsional)</label> <input id="senderName" type="text"${attr("value", shippingData.senderName)} placeholder="Nama Anda" class="svelte-1codj44"/></div> <div class="form-group svelte-1codj44"><label for="senderPhone" class="svelte-1codj44">Nomor HP Pengirim (Opsional)</label> <input id="senderPhone" type="tel"${attr("value", shippingData.senderPhone)} placeholder="08xxxxxxxxxx" class="svelte-1codj44"/></div> <div class="form-group svelte-1codj44"><label for="notes" class="svelte-1codj44">Catatan Tambahan (Opsional)</label> <textarea id="notes" placeholder="Catatan untuk pembeli..." rows="3" class="svelte-1codj44">`);
      const $$body = escape_html(shippingData.notes);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea></div> <div class="info-box svelte-1codj44"><strong class="svelte-1codj44">💡 Tips Pengiriman:</strong> <ul class="svelte-1codj44"><li class="svelte-1codj44">Double check nomor resi sebelum submit</li> <li class="svelte-1codj44">Foto paket sebagai bukti</li> <li class="svelte-1codj44">Informasikan pembeli via chat</li> <li class="svelte-1codj44">Pastikan asuransi jika nilai barang tinggi</li></ul></div> <div class="button-group svelte-1codj44"><button class="btn-secondary svelte-1codj44">Batal</button> <button class="btn-primary svelte-1codj44">Submit Pengiriman</button></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="error-state svelte-1codj44"><div class="error-icon svelte-1codj44">❌</div> <h3 class="svelte-1codj44">Pesanan Tidak Ditemukan</h3> <p class="svelte-1codj44">Pesanan dengan ID ${escape_html(orderId)} tidak ditemukan</p> <button class="btn-primary svelte-1codj44">Kembali ke Daftar Pesanan</button></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
