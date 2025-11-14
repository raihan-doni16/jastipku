import { e as escape_html } from "../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { a as authStore } from "../../../chunks/auth.js";
import { N as Navbar } from "../../../chunks/Navbar.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    authStore.subscribe((val) => {
      val.role;
    });
    let profile = {
      name: "Rina Putri",
      email: "rina@example.com",
      phone: "+62811111111",
      address: "Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta 12345",
      avatar: "👩"
    };
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-maq4gq"><h1 class="svelte-maq4gq">Profil Saya</h1> <div class="profile-grid svelte-maq4gq"><div class="profile-card svelte-maq4gq"><div class="avatar-section svelte-maq4gq"><div class="avatar-large svelte-maq4gq">${escape_html(profile.avatar)}</div> <h2 class="svelte-maq4gq">${escape_html(profile.name)}</h2> <p class="email svelte-maq4gq">${escape_html(profile.email)}</p></div> <div class="stats-grid svelte-maq4gq"><div class="stat-item svelte-maq4gq"><span class="stat-number svelte-maq4gq">12</span> <span class="stat-label svelte-maq4gq">Total Pesanan</span></div> <div class="stat-item svelte-maq4gq"><span class="stat-number svelte-maq4gq">8</span> <span class="stat-label svelte-maq4gq">Selesai</span></div> <div class="stat-item svelte-maq4gq"><span class="stat-number svelte-maq4gq">3</span> <span class="stat-label svelte-maq4gq">Dalam Proses</span></div></div></div> <div class="details-card svelte-maq4gq"><div class="card-header svelte-maq4gq"><h3 class="svelte-maq4gq">Informasi Pribadi</h3> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="btn-edit svelte-maq4gq">Edit</button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="info-grid svelte-maq4gq"><div class="info-item svelte-maq4gq"><span class="label svelte-maq4gq">Nama Lengkap</span> <span class="value svelte-maq4gq">${escape_html(profile.name)}</span></div> <div class="info-item svelte-maq4gq"><span class="label svelte-maq4gq">Email</span> <span class="value svelte-maq4gq">${escape_html(profile.email)}</span></div> <div class="info-item svelte-maq4gq"><span class="label svelte-maq4gq">Nomor Telepon</span> <span class="value svelte-maq4gq">${escape_html(profile.phone)}</span></div> <div class="info-item full-width svelte-maq4gq"><span class="label svelte-maq4gq">Alamat</span> <span class="value svelte-maq4gq">${escape_html(profile.address)}</span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="action-cards svelte-maq4gq"><a href="/orders" class="action-card svelte-maq4gq"><span class="action-icon svelte-maq4gq">📦</span> <h4 class="svelte-maq4gq">Pesanan Saya</h4> <p class="svelte-maq4gq">Lihat semua pesanan dan tracking</p></a> <a href="/browse" class="action-card svelte-maq4gq"><span class="action-icon svelte-maq4gq">🛍️</span> <h4 class="svelte-maq4gq">Browse Jastip</h4> <p class="svelte-maq4gq">Cari produk dari luar negeri</p></a> <div class="action-card svelte-maq4gq"><span class="action-icon svelte-maq4gq">⭐</span> <h4 class="svelte-maq4gq">Ulasan Saya</h4> <p class="svelte-maq4gq">Lihat ulasan yang pernah diberikan</p></div> <div class="action-card svelte-maq4gq"><span class="action-icon svelte-maq4gq">💬</span> <h4 class="svelte-maq4gq">Chat History</h4> <p class="svelte-maq4gq">Percakapan dengan jastiper</p></div></div></div>`);
  });
}
export {
  _page as default
};
