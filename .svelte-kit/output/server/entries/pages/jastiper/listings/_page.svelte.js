import { Z as attr_class, X as ensure_array_like, $ as attr_style, a0 as stringify } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import { e as escape_html } from "../../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { N as Navbar } from "../../../../chunks/Navbar.js";
import { l as listings } from "../../../../chunks/mockData.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let myListings, filteredListings;
    authStore.subscribe((val) => {
      val.role;
    });
    const currentJastiperId = "JST001";
    let filter = "all";
    function formatPrice(price) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    }
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    }
    myListings = listings.filter((listing) => listing.jastiperId === currentJastiperId);
    filteredListings = myListings.filter((listing) => {
      return true;
    });
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-bv6sn"><div class="header svelte-bv6sn"><div><h1 class="svelte-bv6sn">Postingan Saya</h1> <p class="svelte-bv6sn">Kelola semua postingan jastip, preloved, dan event Anda</p></div> <a href="/jastiper/listings/create" class="btn-create svelte-bv6sn"><span class="svelte-bv6sn">+</span> Buat Postingan Baru</a></div> <div class="filters svelte-bv6sn"><button${attr_class("filter-btn svelte-bv6sn", void 0, { "active": filter === "all" })}>Semua (${escape_html(myListings.length)})</button> <button${attr_class("filter-btn svelte-bv6sn", void 0, { "active": filter === "jastip" })}>Jastip (${escape_html(myListings.filter((l) => l.type === "jastip").length)})</button> <button${attr_class("filter-btn svelte-bv6sn", void 0, { "active": filter === "preloved" })}>Preloved (${escape_html(myListings.filter((l) => l.type === "preloved").length)})</button> <button${attr_class("filter-btn svelte-bv6sn", void 0, { "active": filter === "event" })}>Event (${escape_html(myListings.filter((l) => l.type === "event").length)})</button></div> `);
    if (filteredListings.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="empty-state svelte-bv6sn"><span class="empty-icon svelte-bv6sn">📝</span> <h3 class="svelte-bv6sn">Belum ada postingan</h3> <p class="svelte-bv6sn">Buat postingan pertama Anda untuk mulai menawarkan jastip</p> <a href="/jastiper/listings/create" class="btn-create-empty svelte-bv6sn">Buat Postingan</a></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="listings-grid svelte-bv6sn"><!--[-->`);
      const each_array = ensure_array_like(filteredListings);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let listing = each_array[$$index];
        $$renderer2.push(`<div class="listing-card svelte-bv6sn"><div class="card-header svelte-bv6sn"><span class="type-badge svelte-bv6sn"${attr_style(`background: ${stringify(listing.type === "jastip" ? "#0ea5e9" : listing.type === "preloved" ? "#f97316" : "#a855f7")}`)}>${escape_html(listing.type === "jastip" ? "Jastip" : listing.type === "preloved" ? "Preloved" : "Event")}</span> <span class="status-badge svelte-bv6sn"${attr_style(`background: ${stringify(listing.status === "available" ? "#dcfce7" : "#fee2e2")}; color: ${stringify(listing.status === "available" ? "#15803d" : "#991b1b")}`)}>${escape_html(listing.status === "available" ? "Aktif" : "Nonaktif")}</span></div> <div class="card-image svelte-bv6sn"><div class="image-placeholder svelte-bv6sn">${escape_html(listing.images[0])}</div></div> <div class="card-content svelte-bv6sn"><h3 class="svelte-bv6sn">${escape_html(listing.title)}</h3> <p class="description svelte-bv6sn">${escape_html(listing.description)}</p> <div class="meta-grid svelte-bv6sn"><div class="meta-item svelte-bv6sn"><span class="label svelte-bv6sn">Negara</span> <span class="value svelte-bv6sn">${escape_html(listing.country)}</span></div> `);
        if (listing.type === "preloved") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="meta-item svelte-bv6sn"><span class="label svelte-bv6sn">Harga</span> <span class="value price svelte-bv6sn">${escape_html(formatPrice(listing.price))}</span></div> <div class="meta-item svelte-bv6sn"><span class="label svelte-bv6sn">Stok</span> <span class="value svelte-bv6sn">${escape_html(listing.stock)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="meta-item svelte-bv6sn"><span class="label svelte-bv6sn">Berangkat</span> <span class="value svelte-bv6sn">${escape_html(formatDate(listing.departureDate))}</span></div> <div class="meta-item svelte-bv6sn"><span class="label svelte-bv6sn">Fee</span> <span class="value svelte-bv6sn">${escape_html(listing.fee)}%</span></div> <div class="meta-item svelte-bv6sn"><span class="label svelte-bv6sn">Slot</span> <span class="value svelte-bv6sn">${escape_html(listing.sold)}/${escape_html(listing.quota)}</span></div>`);
        }
        $$renderer2.push(`<!--]--></div> `);
        if (listing.type !== "preloved") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="quota-bar svelte-bv6sn"><div class="quota-fill svelte-bv6sn"${attr_style(`width: ${stringify(listing.sold / listing.quota * 100)}%`)}></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="card-actions svelte-bv6sn"><button class="btn-action svelte-bv6sn">Edit</button> <button class="btn-action toggle svelte-bv6sn">${escape_html(listing.status === "available" ? "Nonaktifkan" : "Aktifkan")}</button> <button class="btn-action delete svelte-bv6sn">Hapus</button></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
