import { Y as attr, Z as attr_class, X as ensure_array_like, $ as attr_style, a0 as stringify } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { R as RatingStars } from "../../../../chunks/RatingStars.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { a as jastipers } from "../../../../chunks/mockData.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredJastipers;
    authStore.subscribe((val) => {
      val.role;
    });
    let searchQuery = "";
    let filterStatus = "all";
    let showSuspendModal = false;
    filteredJastipers = jastipers.filter((jastiper) => {
      const matchStatus = filterStatus === "all";
      return matchStatus;
    });
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="container svelte-14a8rx1"><div class="header svelte-14a8rx1"><div><h1 class="svelte-14a8rx1">Verifikasi &amp; Manajemen Jastiper</h1> <p class="svelte-14a8rx1">Kelola dan verifikasi semua jastiper di platform</p></div></div> <div class="stats-cards svelte-14a8rx1"><div class="stat-card svelte-14a8rx1"><span class="stat-icon verified svelte-14a8rx1">✓</span> <div class="stat-content svelte-14a8rx1"><span class="stat-number svelte-14a8rx1">${escape_html(jastipers.filter((j) => j.verified).length)}</span> <span class="stat-label svelte-14a8rx1">Terverifikasi</span></div></div> <div class="stat-card svelte-14a8rx1"><span class="stat-icon pending svelte-14a8rx1">⏳</span> <div class="stat-content svelte-14a8rx1"><span class="stat-number svelte-14a8rx1">${escape_html(jastipers.filter((j) => !j.verified).length)}</span> <span class="stat-label svelte-14a8rx1">Menunggu Verifikasi</span></div></div> <div class="stat-card svelte-14a8rx1"><span class="stat-icon total svelte-14a8rx1">👥</span> <div class="stat-content svelte-14a8rx1"><span class="stat-number svelte-14a8rx1">${escape_html(jastipers.length)}</span> <span class="stat-label svelte-14a8rx1">Total Jastiper</span></div></div></div> <div class="filters svelte-14a8rx1"><input type="text" placeholder="Cari nama jastiper atau email..."${attr("value", searchQuery)} class="search-input svelte-14a8rx1"/> <div class="filter-buttons svelte-14a8rx1"><button${attr_class("filter-btn svelte-14a8rx1", void 0, { "active": filterStatus === "all" })}>Semua (${escape_html(jastipers.length)})</button> <button${attr_class("filter-btn svelte-14a8rx1", void 0, { "active": filterStatus === "verified" })}>Terverifikasi (${escape_html(jastipers.filter((j) => j.status === "verified").length)})</button> <button${attr_class("filter-btn svelte-14a8rx1", void 0, { "active": filterStatus === "pending" })}>Pending (${escape_html(jastipers.filter((j) => j.status === "pending").length)})</button></div></div> <div class="jastipers-grid svelte-14a8rx1"><!--[-->`);
      const each_array = ensure_array_like(filteredJastipers);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let jastiper = each_array[$$index];
        $$renderer3.push(`<div class="jastiper-card svelte-14a8rx1"><div class="card-header svelte-14a8rx1"><span class="jastiper-id svelte-14a8rx1">${escape_html(jastiper.id)}</span> <span class="status-badge svelte-14a8rx1"${attr_style(`background: ${stringify(jastiper.verified ? "#dcfce7" : "#fef3c7")}; color: ${stringify(jastiper.verified ? "#15803d" : "#92400e")}`)}>${escape_html(jastiper.verified ? "✓ Verified" : "⏳ Pending")}</span></div> <div class="jastiper-profile svelte-14a8rx1"><div class="avatar svelte-14a8rx1">${escape_html(jastiper.avatar)}</div> <div class="profile-info svelte-14a8rx1"><h3 class="svelte-14a8rx1">${escape_html(jastiper.name)}</h3> <div class="rating svelte-14a8rx1">`);
        RatingStars($$renderer3, { rating: jastiper.rating });
        $$renderer3.push(`<!----> <span class="rating-value svelte-14a8rx1">${escape_html(jastiper.rating)}</span></div></div></div> <div class="jastiper-meta svelte-14a8rx1"><div class="meta-item svelte-14a8rx1"><span class="label svelte-14a8rx1">Negara</span> <span class="value svelte-14a8rx1">${escape_html(jastiper.country)}</span></div> <div class="meta-item svelte-14a8rx1"><span class="label svelte-14a8rx1">Total Trip</span> <span class="value svelte-14a8rx1">${escape_html(jastiper.totalTrips)}</span></div> <div class="meta-item svelte-14a8rx1"><span class="label svelte-14a8rx1">Email</span> <span class="value svelte-14a8rx1">${escape_html(jastiper.email)}</span></div> <div class="meta-item svelte-14a8rx1"><span class="label svelte-14a8rx1">Telepon</span> <span class="value svelte-14a8rx1">${escape_html(jastiper.phone)}</span></div></div> <button class="btn-detail svelte-14a8rx1">Lihat Detail &amp; Verifikasi</button></div>`);
      }
      $$renderer3.push(`<!--]--></div> `);
      if (filteredJastipers.length === 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="empty-state svelte-14a8rx1"><span class="empty-icon svelte-14a8rx1">🔍</span> <p class="svelte-14a8rx1">Tidak ada jastiper ditemukan</p></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      Modal($$renderer3, {
        title: "Suspend Jastiper",
        showCancel: true,
        cancelText: "Batal",
        confirmText: "Suspend Sekarang",
        autoCloseOnConfirm: false,
        maxWidth: "520px",
        get isOpen() {
          return showSuspendModal;
        },
        set isOpen($$value) {
          showSuspendModal = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
