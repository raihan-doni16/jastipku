import { Y as attr, X as ensure_array_like, $ as attr_style, a0 as stringify, Z as attr_class } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { a as authStore } from "../../../chunks/auth.js";
import { N as Navbar } from "../../../chunks/Navbar.js";
import { M as Modal } from "../../../chunks/Modal.js";
import { p as popularCountries, l as listings } from "../../../chunks/mockData.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredListings;
    authStore.subscribe((val) => {
      val.role;
    });
    let searchQuery = "";
    let selectedType = "all";
    let selectedCountry = "all";
    let selectedCategory = "Semua Kategori";
    const types = [
      { value: "all", label: "Semua Tipe" },
      { value: "jastip", label: "Jastip" },
      { value: "preloved", label: "Preloved" },
      { value: "event", label: "Event" }
    ];
    const allCategories = [
      "Semua Kategori",
      "Kosmetik",
      "Fashion",
      "Elektronik",
      "Gadget",
      "Gaming",
      "Skincare",
      "Tas",
      "Branded",
      "Sepatu"
    ];
    function formatPrice(price) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    }
    function getTypeLabel(type) {
      const found = types.find((t) => t.value === type);
      return found?.label ?? type;
    }
    function getTypeBadgeColor(type) {
      if (type === "jastip") return "#0ea5e9";
      if (type === "preloved") return "#f97316";
      if (type === "event") return "#a855f7";
      return "#64748b";
    }
    let addedItems = {};
    let showCustomOrderModal = false;
    filteredListings = listings.filter((listing) => {
      const matchCategory = selectedCategory === "Semua Kategori";
      return matchCategory;
    });
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Navbar($$renderer3, {});
      $$renderer3.push(`<!----> <div class="container svelte-1kxy863"><div class="header svelte-1kxy863"><h1 class="svelte-1kxy863">Browse Jastip &amp; Preloved</h1> <p class="svelte-1kxy863">Temukan barang impian dari berbagai negara</p></div> <div class="filters svelte-1kxy863"><input type="text" placeholder="Cari produk, toko, atau jastiper..."${attr("value", searchQuery)} class="search-input svelte-1kxy863"/> <div class="filter-row svelte-1kxy863">`);
      $$renderer3.select(
        { value: selectedType, class: "filter-select" },
        ($$renderer4) => {
          $$renderer4.push(`<!--[-->`);
          const each_array = ensure_array_like(types);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let type = each_array[$$index];
            $$renderer4.option({ value: type.value }, ($$renderer5) => {
              $$renderer5.push(`${escape_html(type.label)}`);
            });
          }
          $$renderer4.push(`<!--]-->`);
        },
        "svelte-1kxy863"
      );
      $$renderer3.push(` `);
      $$renderer3.select(
        { value: selectedCountry, class: "filter-select" },
        ($$renderer4) => {
          $$renderer4.option({ value: "all" }, ($$renderer5) => {
            $$renderer5.push(`Semua Negara`);
          });
          $$renderer4.push(`<!--[-->`);
          const each_array_1 = ensure_array_like(popularCountries);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let country = each_array_1[$$index_1];
            $$renderer4.option({ value: country.code }, ($$renderer5) => {
              $$renderer5.push(`${escape_html(country.flag)} ${escape_html(country.name)}`);
            });
          }
          $$renderer4.push(`<!--]-->`);
        },
        "svelte-1kxy863"
      );
      $$renderer3.push(` `);
      $$renderer3.select(
        { value: selectedCategory, class: "filter-select" },
        ($$renderer4) => {
          $$renderer4.push(`<!--[-->`);
          const each_array_2 = ensure_array_like(allCategories);
          for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
            let category = each_array_2[$$index_2];
            $$renderer4.option({ value: category }, ($$renderer5) => {
              $$renderer5.push(`${escape_html(category)}`);
            });
          }
          $$renderer4.push(`<!--]-->`);
        },
        "svelte-1kxy863"
      );
      $$renderer3.push(`</div></div> <div class="results-info svelte-1kxy863">Menampilkan ${escape_html(filteredListings.length)} dari ${escape_html(listings.length)} postingan</div> <div class="listings-grid svelte-1kxy863"><!--[-->`);
      const each_array_3 = ensure_array_like(filteredListings);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let listing = each_array_3[$$index_3];
        $$renderer3.push(`<a${attr("href", `/browse/${stringify(listing.id)}`)} class="listing-card svelte-1kxy863"><div class="card-image svelte-1kxy863"><div class="image-placeholder svelte-1kxy863">${escape_html(listing.images[0])}</div> <div class="type-badge svelte-1kxy863"${attr_style(`background-color: ${stringify(getTypeBadgeColor(listing.type))}`)}>${escape_html(getTypeLabel(listing.type))}</div></div> <div class="card-content svelte-1kxy863"><div class="price-section svelte-1kxy863">`);
        if (listing.type === "preloved") {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="current-price svelte-1kxy863">${escape_html(formatPrice(listing.price))}</div> `);
          if (listing.originalPrice) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="original-price svelte-1kxy863">${escape_html(formatPrice(listing.originalPrice))}</div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]-->`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div class="current-price svelte-1kxy863">Fee ${escape_html(listing.fee)}%</div> <div class="min-order-info svelte-1kxy863">Min. Order ${escape_html(formatPrice(listing.minOrder || 0))}</div>`);
        }
        $$renderer3.push(`<!--]--></div> <h3 class="listing-title svelte-1kxy863">${escape_html(listing.title)}</h3> <div class="meta-row svelte-1kxy863"><div class="rating-badge svelte-1kxy863"><span class="star-icon svelte-1kxy863">⭐</span> <span class="rating-value svelte-1kxy863">${escape_html(listing.jastiperRating)}</span></div> <span class="divider svelte-1kxy863">•</span> <span class="sold-count svelte-1kxy863">Sold ${escape_html(listing.sold || 0)}</span></div> <div class="jastiper-compact svelte-1kxy863"><span class="jastiper-avatar-small svelte-1kxy863">${escape_html(listing.jastiperAvatar)}</span> <span class="jastiper-name-small svelte-1kxy863">${escape_html(listing.jastiperName)}</span></div> `);
        if (listing.type !== "preloved") {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="quota-info svelte-1kxy863"><div class="quota-bar svelte-1kxy863"><div class="quota-fill svelte-1kxy863"${attr_style(`width: ${stringify(listing.sold / listing.quota * 100)}%`)}></div></div> <span class="quota-text svelte-1kxy863">${escape_html(listing.sold)}/${escape_html(listing.quota)} slot</span></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <div class="card-actions svelte-1kxy863"><button${attr_class("btn-add-to-cart svelte-1kxy863", void 0, { "added": addedItems[listing.id] })}>${escape_html(addedItems[listing.id] ? "✓" : "🛒")}</button> `);
        if (listing.type === "jastip" && listing.stores?.length > 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<button class="btn-custom-order svelte-1kxy863">✏️</button>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div></div></a>`);
      }
      $$renderer3.push(`<!--]--></div> `);
      if (filteredListings.length === 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="empty-state svelte-1kxy863"><div class="empty-icon svelte-1kxy863">🔍</div> <h3 class="svelte-1kxy863">Tidak ada postingan yang ditemukan</h3> <p class="svelte-1kxy863">Coba ubah filter atau kata kunci pencarian Anda</p></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> `);
      Modal($$renderer3, {
        title: "Custom Order",
        showCancel: true,
        cancelText: "Batal",
        confirmText: "Tambah ke Keranjang",
        autoCloseOnConfirm: false,
        maxWidth: "680px",
        get isOpen() {
          return showCustomOrderModal;
        },
        set isOpen($$value) {
          showCustomOrderModal = $$value;
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
