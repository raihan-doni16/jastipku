import { Y as attr, X as ensure_array_like, $ as attr_style, a0 as stringify } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { l as listings } from "../../../../chunks/mockData.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredListings;
    authStore.subscribe((val) => {
      val.role;
    });
    let filterType = "all";
    let filterStatus = "all";
    let searchQuery = "";
    const typeOptions = [
      { value: "all", label: "Semua Tipe" },
      { value: "jastip", label: "Jastip" },
      { value: "preloved", label: "Preloved" },
      { value: "event", label: "Event" }
    ];
    const statusOptions = [
      { value: "all", label: "Semua Status" },
      { value: "active", label: "Aktif" },
      { value: "pending", label: "Pending Review" },
      { value: "suspended", label: "Suspended" },
      { value: "rejected", label: "Ditolak" }
    ];
    let allListings = listings.map((l) => ({
      ...l,
      status: "active",
      reportCount: Math.floor(Math.random() * 5),
      views: Math.floor(Math.random() * 1e3) + 100
    }));
    function formatPrice(price) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    }
    function getTypeLabel(type) {
      return typeOptions.find((t) => t.value === type)?.label || type;
    }
    function getTypeBadgeColor(type) {
      if (type === "jastip") return "#0ea5e9";
      if (type === "preloved") return "#f97316";
      if (type === "event") return "#a855f7";
      return "#64748b";
    }
    function getStatusBadge(status) {
      const badges = {
        active: { label: "Aktif", color: "#10b981" },
        pending: { label: "Pending", color: "#f59e0b" },
        suspended: { label: "Suspended", color: "#ef4444" },
        rejected: { label: "Ditolak", color: "#dc2626" }
      };
      return badges[status] || { label: status, color: "#64748b" };
    }
    filteredListings = allListings.filter((listing) => {
      const matchSearch = searchQuery === "";
      return matchSearch;
    });
    $$renderer2.push(`<div class="container svelte-1wdbc8k"><div class="header svelte-1wdbc8k"><h1 class="svelte-1wdbc8k">Manajemen Postingan</h1> <p class="svelte-1wdbc8k">Moderasi semua postingan dari jastiper</p></div> <div class="stats-cards svelte-1wdbc8k"><div class="stat-card svelte-1wdbc8k"><div class="stat-icon svelte-1wdbc8k" style="background: #d1fae5;">📝</div> <div class="stat-content svelte-1wdbc8k"><div class="stat-value svelte-1wdbc8k">${escape_html(
      // Update status in real app
      allListings.length
    )}</div> <div class="stat-label svelte-1wdbc8k">Total Postingan</div></div></div> <div class="stat-card svelte-1wdbc8k"><div class="stat-icon svelte-1wdbc8k" style="background: #dbeafe;">✅</div> <div class="stat-content svelte-1wdbc8k"><div class="stat-value svelte-1wdbc8k">${escape_html(allListings.filter((l) => l.status === "active").length)}</div> <div class="stat-label svelte-1wdbc8k">Aktif</div></div></div> <div class="stat-card svelte-1wdbc8k"><div class="stat-icon svelte-1wdbc8k" style="background: #fef3c7;">⏳</div> <div class="stat-content svelte-1wdbc8k"><div class="stat-value svelte-1wdbc8k">${escape_html(allListings.filter((l) => l.status === "pending").length)}</div> <div class="stat-label svelte-1wdbc8k">Pending Review</div></div></div> <div class="stat-card svelte-1wdbc8k"><div class="stat-icon svelte-1wdbc8k" style="background: #fee2e2;">🚫</div> <div class="stat-content svelte-1wdbc8k"><div class="stat-value svelte-1wdbc8k">${escape_html(allListings.filter((l) => l.status === "suspended").length)}</div> <div class="stat-label svelte-1wdbc8k">Suspended</div></div></div></div> <div class="filters svelte-1wdbc8k"><div class="search-box svelte-1wdbc8k"><span class="search-icon svelte-1wdbc8k">🔍</span> <input type="text" placeholder="Cari judul postingan atau jastiper..."${attr("value", searchQuery)} class="svelte-1wdbc8k"/></div> `);
    $$renderer2.select(
      { value: filterType, class: "" },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(typeOptions);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let option = each_array[$$index];
          $$renderer3.option({ value: option.value }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(option.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-1wdbc8k"
    );
    $$renderer2.push(` `);
    $$renderer2.select(
      { value: filterStatus, class: "" },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(statusOptions);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let option = each_array_1[$$index_1];
          $$renderer3.option({ value: option.value }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(option.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-1wdbc8k"
    );
    $$renderer2.push(`</div> <div class="results-info svelte-1wdbc8k">Menampilkan ${escape_html(filteredListings.length)} dari ${escape_html(allListings.length)} postingan</div> <div class="listings-grid svelte-1wdbc8k"><!--[-->`);
    const each_array_2 = ensure_array_like(filteredListings);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let listing = each_array_2[$$index_2];
      $$renderer2.push(`<div class="listing-card svelte-1wdbc8k"><div class="card-header svelte-1wdbc8k"><div class="type-badge svelte-1wdbc8k"${attr_style(`background-color: ${stringify(getTypeBadgeColor(listing.type))};`)}>${escape_html(getTypeLabel(listing.type))}</div> <div class="status-badge svelte-1wdbc8k"${attr_style(`background-color: ${stringify(getStatusBadge(listing.status).color)};`)}>${escape_html(getStatusBadge(listing.status).label)}</div></div> <div class="card-image svelte-1wdbc8k"><div class="image-placeholder svelte-1wdbc8k">${escape_html(listing.images[0])}</div></div> <div class="card-content svelte-1wdbc8k"><h3 class="listing-title svelte-1wdbc8k">${escape_html(listing.title)}</h3> <p class="listing-description svelte-1wdbc8k">${escape_html(listing.description)}</p> <div class="jastiper-info svelte-1wdbc8k"><span class="avatar svelte-1wdbc8k">${escape_html(listing.jastiperAvatar)}</span> <span class="jastiper-name svelte-1wdbc8k">${escape_html(listing.jastiperName)}</span></div> <div class="stats-row svelte-1wdbc8k"><div class="stat-item svelte-1wdbc8k"><span class="stat-icon svelte-1wdbc8k">👁️</span> <span class="stat-text">${escape_html(listing.views)} views</span></div> <div class="stat-item svelte-1wdbc8k"><span class="stat-icon svelte-1wdbc8k">🛒</span> <span class="stat-text">${escape_html(listing.sold)} sold</span></div> `);
      if (listing.reportCount > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="stat-item warning svelte-1wdbc8k"><span class="stat-icon svelte-1wdbc8k">⚠️</span> <span class="stat-text">${escape_html(listing.reportCount)} reports</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="meta-info svelte-1wdbc8k"><div class="meta-item svelte-1wdbc8k"><span class="meta-label svelte-1wdbc8k">Negara:</span> <span class="meta-value svelte-1wdbc8k">${escape_html(listing.country)}</span></div> `);
      if (listing.type === "preloved") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="meta-item svelte-1wdbc8k"><span class="meta-label svelte-1wdbc8k">Harga:</span> <span class="meta-value svelte-1wdbc8k">${escape_html(formatPrice(listing.price))}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="meta-item svelte-1wdbc8k"><span class="meta-label svelte-1wdbc8k">Fee:</span> <span class="meta-value svelte-1wdbc8k">${escape_html(listing.fee)}%</span></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="card-actions svelte-1wdbc8k"><button class="btn-view svelte-1wdbc8k">👁️ Lihat</button> `);
      if (listing.status === "active") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="btn-suspend svelte-1wdbc8k">🚫 Suspend</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (listing.status === "suspended") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<button class="btn-activate svelte-1wdbc8k">✅ Aktifkan</button>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> <button class="btn-delete svelte-1wdbc8k">🗑️ Hapus</button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredListings.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="empty-state svelte-1wdbc8k"><div class="empty-icon svelte-1wdbc8k">📝</div> <h3 class="svelte-1wdbc8k">Tidak ada postingan</h3> <p class="svelte-1wdbc8k">Tidak ada postingan yang cocok dengan filter</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
