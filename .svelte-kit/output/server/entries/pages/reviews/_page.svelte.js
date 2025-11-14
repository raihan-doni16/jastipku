import { Y as attr, X as ensure_array_like } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { a as authStore } from "../../../chunks/auth.js";
import { m as myReviews } from "../../../chunks/mockData.js";
import { N as Navbar } from "../../../chunks/Navbar.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredReviews;
    authStore.subscribe((val) => {
      val.role;
    });
    let filterRating = "all";
    let searchQuery = "";
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
    }
    function getStarDisplay(rating) {
      return "⭐".repeat(rating) + "☆".repeat(5 - rating);
    }
    filteredReviews = myReviews.filter((review) => {
      const matchSearch = searchQuery === "";
      return matchSearch;
    });
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-1lwsl2u"><div class="header svelte-1lwsl2u"><h1 class="svelte-1lwsl2u">Ulasan Saya</h1> <p class="svelte-1lwsl2u">Lihat semua ulasan yang telah Anda berikan</p></div> <div class="stats-cards svelte-1lwsl2u"><div class="stat-card svelte-1lwsl2u"><div class="stat-icon svelte-1lwsl2u">📝</div> <div class="stat-content svelte-1lwsl2u"><div class="stat-value svelte-1lwsl2u">${escape_html(myReviews.length)}</div> <div class="stat-label svelte-1lwsl2u">Total Ulasan</div></div></div> <div class="stat-card svelte-1lwsl2u"><div class="stat-icon svelte-1lwsl2u">⭐</div> <div class="stat-content svelte-1lwsl2u"><div class="stat-value svelte-1lwsl2u">${escape_html((myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1))}</div> <div class="stat-label svelte-1lwsl2u">Rata-rata Rating</div></div></div> <div class="stat-card svelte-1lwsl2u"><div class="stat-icon svelte-1lwsl2u">👍</div> <div class="stat-content svelte-1lwsl2u"><div class="stat-value svelte-1lwsl2u">${escape_html(myReviews.reduce((sum, r) => sum + r.helpful, 0))}</div> <div class="stat-label svelte-1lwsl2u">Total Helpful</div></div></div> <div class="stat-card svelte-1lwsl2u"><div class="stat-icon svelte-1lwsl2u">✅</div> <div class="stat-content svelte-1lwsl2u"><div class="stat-value svelte-1lwsl2u">${escape_html(myReviews.filter((r) => r.recommended).length)}</div> <div class="stat-label svelte-1lwsl2u">Recommended</div></div></div></div> <div class="filters svelte-1lwsl2u"><div class="search-box svelte-1lwsl2u"><span class="search-icon svelte-1lwsl2u">🔍</span> <input type="text" placeholder="Cari berdasarkan jastiper, produk, atau review..."${attr("value", searchQuery)} class="svelte-1lwsl2u"/></div> `);
    $$renderer2.select(
      { value: filterRating, class: "" },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`Semua Rating`);
        });
        $$renderer3.option({ value: "5" }, ($$renderer4) => {
          $$renderer4.push(`⭐⭐⭐⭐⭐ (5)`);
        });
        $$renderer3.option({ value: "4" }, ($$renderer4) => {
          $$renderer4.push(`⭐⭐⭐⭐ (4)`);
        });
        $$renderer3.option({ value: "3" }, ($$renderer4) => {
          $$renderer4.push(`⭐⭐⭐ (3)`);
        });
        $$renderer3.option({ value: "2" }, ($$renderer4) => {
          $$renderer4.push(`⭐⭐ (2)`);
        });
        $$renderer3.option({ value: "1" }, ($$renderer4) => {
          $$renderer4.push(`⭐ (1)`);
        });
      },
      "svelte-1lwsl2u"
    );
    $$renderer2.push(`</div> <div class="results-info svelte-1lwsl2u">Menampilkan ${escape_html(filteredReviews.length)} dari ${escape_html(myReviews.length)} ulasan</div> <div class="reviews-list svelte-1lwsl2u"><!--[-->`);
    const each_array = ensure_array_like(filteredReviews);
    for (let $$index_3 = 0, $$length = each_array.length; $$index_3 < $$length; $$index_3++) {
      let review = each_array[$$index_3];
      $$renderer2.push(`<div class="review-card svelte-1lwsl2u"><div class="review-header svelte-1lwsl2u"><div class="jastiper-info svelte-1lwsl2u"><span class="avatar svelte-1lwsl2u">${escape_html(review.jastiperAvatar)}</span> <div class="jastiper-details svelte-1lwsl2u"><div class="jastiper-name svelte-1lwsl2u">${escape_html(review.jastiperName)}</div> <div class="product-name svelte-1lwsl2u">${escape_html(review.productName)}</div> <div class="order-code svelte-1lwsl2u">Order: ${escape_html(review.orderCode)}</div></div></div> <div class="review-meta svelte-1lwsl2u"><div class="date svelte-1lwsl2u">${escape_html(formatDate(review.createdAt))}</div> `);
      if (review.recommended) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="recommended-badge svelte-1lwsl2u">✅ Recommended</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div> <div class="rating-section svelte-1lwsl2u"><div class="overall-rating svelte-1lwsl2u"><span class="stars svelte-1lwsl2u">${escape_html(getStarDisplay(review.rating))}</span> <span class="rating-value svelte-1lwsl2u">${escape_html(review.rating)}.0</span></div> <div class="detail-ratings svelte-1lwsl2u"><div class="detail-rating-item svelte-1lwsl2u"><span class="label svelte-1lwsl2u">Pelayanan</span> <span class="value svelte-1lwsl2u">${escape_html(getStarDisplay(review.serviceRating))}</span></div> <div class="detail-rating-item svelte-1lwsl2u"><span class="label svelte-1lwsl2u">Kecepatan</span> <span class="value svelte-1lwsl2u">${escape_html(getStarDisplay(review.speedRating))}</span></div> <div class="detail-rating-item svelte-1lwsl2u"><span class="label svelte-1lwsl2u">Kualitas</span> <span class="value svelte-1lwsl2u">${escape_html(getStarDisplay(review.qualityRating))}</span></div> <div class="detail-rating-item svelte-1lwsl2u"><span class="label svelte-1lwsl2u">Komunikasi</span> <span class="value svelte-1lwsl2u">${escape_html(getStarDisplay(review.communicationRating))}</span></div></div></div> <div class="review-content svelte-1lwsl2u"><p class="review-text svelte-1lwsl2u">${escape_html(review.reviewText)}</p> `);
      if (review.pros.length > 0 || review.cons.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="pros-cons svelte-1lwsl2u">`);
        if (review.pros.length > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="pros"><div class="pros-cons-title svelte-1lwsl2u">👍 Yang Disukai</div> <div class="tags svelte-1lwsl2u"><!--[-->`);
          const each_array_1 = ensure_array_like(review.pros);
          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
            let pro = each_array_1[$$index];
            $$renderer2.push(`<span class="tag pro-tag svelte-1lwsl2u">${escape_html(pro)}</span>`);
          }
          $$renderer2.push(`<!--]--></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (review.cons.length > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="cons"><div class="pros-cons-title svelte-1lwsl2u">👎 Yang Kurang</div> <div class="tags svelte-1lwsl2u"><!--[-->`);
          const each_array_2 = ensure_array_like(review.cons);
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let con = each_array_2[$$index_1];
            $$renderer2.push(`<span class="tag con-tag svelte-1lwsl2u">${escape_html(con)}</span>`);
          }
          $$renderer2.push(`<!--]--></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (review.photos.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="photos svelte-1lwsl2u"><!--[-->`);
        const each_array_3 = ensure_array_like(review.photos);
        for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
          let photo = each_array_3[$$index_2];
          $$renderer2.push(`<div class="photo-item svelte-1lwsl2u">${escape_html(photo)}</div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="review-footer svelte-1lwsl2u"><div class="helpful-count svelte-1lwsl2u"><span class="icon svelte-1lwsl2u">👍</span> <span>${escape_html(review.helpful)} orang merasa ini membantu</span></div></div> `);
      if (review.response) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="jastiper-response svelte-1lwsl2u"><div class="response-header svelte-1lwsl2u"><span class="response-icon svelte-1lwsl2u">💬</span> <span class="response-title svelte-1lwsl2u">Balasan dari Jastiper</span> <span class="response-date svelte-1lwsl2u">${escape_html(formatDate(review.response.createdAt))}</span></div> <p class="response-text svelte-1lwsl2u">${escape_html(review.response.text)}</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredReviews.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="empty-state svelte-1lwsl2u"><div class="empty-icon svelte-1lwsl2u">📝</div> <h3 class="svelte-1lwsl2u">Belum ada ulasan</h3> <p class="svelte-1lwsl2u">Ulasan yang Anda berikan akan muncul di sini</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
