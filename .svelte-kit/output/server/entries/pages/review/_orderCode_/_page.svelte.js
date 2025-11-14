import { W as store_get, X as ensure_array_like, Z as attr_class, Y as attr, _ as unsubscribe_stores } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { N as Navbar } from "../../../../chunks/Navbar.js";
import { o as orders } from "../../../../chunks/mockData.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let orderCode, order;
    authStore.subscribe((val) => {
      val.role;
    });
    let reviewForm = {
      rating: 0,
      serviceRating: 0,
      speedRating: 0,
      productQualityRating: 0,
      communicationRating: 0,
      title: "",
      comment: "",
      pros: [""],
      cons: [""],
      wouldRecommend: true
    };
    let hoveredRating = 0;
    let hoveredCategory = "";
    function getDisplayRating(category, currentRating) {
      if (hoveredCategory === category && hoveredRating > 0) {
        return hoveredRating;
      }
      return currentRating;
    }
    orderCode = store_get($$store_subs ??= {}, "$page", page).params.orderCode;
    order = orders.find((o) => o.code === orderCode);
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-18cpxcn">`);
    if (!order) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="not-found svelte-18cpxcn"><h2 class="svelte-18cpxcn">Pesanan tidak ditemukan</h2> <a href="/orders" class="btn-back svelte-18cpxcn">Kembali ke Pesanan</a></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="header svelte-18cpxcn"><h1 class="svelte-18cpxcn">Beri Rating &amp; Ulasan</h1> <p class="svelte-18cpxcn">Bagikan pengalaman Anda dengan pesanan ini</p></div> <div class="review-grid svelte-18cpxcn"><div class="order-summary svelte-18cpxcn"><h3 class="svelte-18cpxcn">Pesanan Anda</h3> <div class="order-info svelte-18cpxcn"><div class="info-row svelte-18cpxcn"><span class="label svelte-18cpxcn">Kode Pesanan</span> <span class="value svelte-18cpxcn">${escape_html(order.code)}</span></div> <div class="info-row svelte-18cpxcn"><span class="label svelte-18cpxcn">Produk</span> <span class="value svelte-18cpxcn">${escape_html(order.product)}</span></div> <div class="info-row svelte-18cpxcn"><span class="label svelte-18cpxcn">Negara</span> <span class="value svelte-18cpxcn">${escape_html(order.country)}</span></div> <div class="info-row svelte-18cpxcn"><span class="label svelte-18cpxcn">Toko</span> <span class="value svelte-18cpxcn">${escape_html(order.store)}</span></div></div></div> <div class="review-form svelte-18cpxcn"><div class="rating-section svelte-18cpxcn"><h3 class="svelte-18cpxcn">Rating Keseluruhan *</h3> <p class="section-desc svelte-18cpxcn">Berapa rating Anda untuk pesanan ini?</p> <div class="stars-large svelte-18cpxcn"><!--[-->`);
      const each_array = ensure_array_like([1, 2, 3, 4, 5]);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let star = each_array[$$index];
        $$renderer2.push(`<button${attr_class("star-btn large svelte-18cpxcn", void 0, {
          "filled": getDisplayRating("overall", reviewForm.rating) >= star
        })}>★</button>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="category-ratings svelte-18cpxcn"><h3 class="svelte-18cpxcn">Rating Detail</h3> <div class="rating-item svelte-18cpxcn"><span class="rating-label svelte-18cpxcn">Kualitas Layanan</span> <div class="stars svelte-18cpxcn"><!--[-->`);
      const each_array_1 = ensure_array_like([1, 2, 3, 4, 5]);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let star = each_array_1[$$index_1];
        $$renderer2.push(`<button${attr_class("star-btn svelte-18cpxcn", void 0, {
          "filled": getDisplayRating("service", reviewForm.serviceRating) >= star
        })}>★</button>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="rating-item svelte-18cpxcn"><span class="rating-label svelte-18cpxcn">Kecepatan Proses</span> <div class="stars svelte-18cpxcn"><!--[-->`);
      const each_array_2 = ensure_array_like([1, 2, 3, 4, 5]);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let star = each_array_2[$$index_2];
        $$renderer2.push(`<button${attr_class("star-btn svelte-18cpxcn", void 0, {
          "filled": getDisplayRating("speed", reviewForm.speedRating) >= star
        })}>★</button>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="rating-item svelte-18cpxcn"><span class="rating-label svelte-18cpxcn">Kualitas Produk</span> <div class="stars svelte-18cpxcn"><!--[-->`);
      const each_array_3 = ensure_array_like([1, 2, 3, 4, 5]);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let star = each_array_3[$$index_3];
        $$renderer2.push(`<button${attr_class("star-btn svelte-18cpxcn", void 0, {
          "filled": getDisplayRating("quality", reviewForm.productQualityRating) >= star
        })}>★</button>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="rating-item svelte-18cpxcn"><span class="rating-label svelte-18cpxcn">Komunikasi</span> <div class="stars svelte-18cpxcn"><!--[-->`);
      const each_array_4 = ensure_array_like([1, 2, 3, 4, 5]);
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let star = each_array_4[$$index_4];
        $$renderer2.push(`<button${attr_class("star-btn svelte-18cpxcn", void 0, {
          "filled": getDisplayRating("communication", reviewForm.communicationRating) >= star
        })}>★</button>`);
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="form-section svelte-18cpxcn"><label class="svelte-18cpxcn">Judul Ulasan *</label> <input type="text"${attr("value", reviewForm.title)} placeholder="Contoh: Pelayanan cepat dan produk sesuai" maxlength="100" class="svelte-18cpxcn"/></div> <div class="form-section svelte-18cpxcn"><label class="svelte-18cpxcn">Tulis Ulasan Anda *</label> <textarea placeholder="Ceritakan pengalaman Anda... (minimal 20 karakter)" rows="6" class="svelte-18cpxcn">`);
      const $$body = escape_html(reviewForm.comment);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea> <span class="char-count svelte-18cpxcn">${escape_html(reviewForm.comment.length)} karakter</span></div> <div class="pros-cons-grid svelte-18cpxcn"><div class="form-section svelte-18cpxcn"><label class="svelte-18cpxcn">Kelebihan (Opsional)</label> <div class="multi-input svelte-18cpxcn"><!--[-->`);
      const each_array_5 = ensure_array_like(reviewForm.pros);
      for (let index = 0, $$length = each_array_5.length; index < $$length; index++) {
        each_array_5[index];
        $$renderer2.push(`<div class="input-row svelte-18cpxcn"><input type="text"${attr("value", reviewForm.pros[index])} placeholder="Contoh: Cepat &amp; responsif" class="svelte-18cpxcn"/> `);
        if (reviewForm.pros.length > 1) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<button class="btn-remove svelte-18cpxcn">×</button>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--> <button class="btn-add-small svelte-18cpxcn">+ Tambah</button></div></div> <div class="form-section svelte-18cpxcn"><label class="svelte-18cpxcn">Kekurangan (Opsional)</label> <div class="multi-input svelte-18cpxcn"><!--[-->`);
      const each_array_6 = ensure_array_like(reviewForm.cons);
      for (let index = 0, $$length = each_array_6.length; index < $$length; index++) {
        each_array_6[index];
        $$renderer2.push(`<div class="input-row svelte-18cpxcn"><input type="text"${attr("value", reviewForm.cons[index])} placeholder="Contoh: Harga sedikit mahal" class="svelte-18cpxcn"/> `);
        if (reviewForm.cons.length > 1) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<button class="btn-remove svelte-18cpxcn">×</button>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--> <button class="btn-add-small svelte-18cpxcn">+ Tambah</button></div></div></div> <div class="form-section svelte-18cpxcn"><label class="svelte-18cpxcn">Upload Foto (Opsional)</label> <div class="upload-area svelte-18cpxcn"><span class="upload-icon svelte-18cpxcn">📷</span> <p class="svelte-18cpxcn">Klik untuk upload foto produk</p> <span class="upload-hint svelte-18cpxcn">Max 5 foto, masing-masing 3MB</span></div></div> <div class="recommendation svelte-18cpxcn"><span class="svelte-18cpxcn">Apakah Anda merekomendasikan jastiper ini?</span> <div class="recommendation-buttons svelte-18cpxcn"><button${attr_class("rec-btn svelte-18cpxcn", void 0, { "active": reviewForm.wouldRecommend })}>👍 Ya</button> <button${attr_class("rec-btn svelte-18cpxcn", void 0, { "active": false })}>👎 Tidak</button></div></div> <button class="btn-submit svelte-18cpxcn"${attr("disabled", reviewForm.rating === 0, true)}>${escape_html("Kirim Ulasan")}</button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
