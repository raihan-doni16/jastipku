import { Z as attr_class } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import { e as escape_html } from "../../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { N as Navbar } from "../../../../chunks/Navbar.js";
import { R as RatingStars } from "../../../../chunks/RatingStars.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    authStore.subscribe((val) => {
      val.role;
    });
    let profile = {
      id: "JST001",
      name: "Sarah Kim",
      email: "sarah@example.com",
      phone: "+62812345678",
      avatar: "👩",
      country: "Korea",
      rating: 4.8,
      totalTrips: 45,
      bankAccount: {
        bankName: "BCA",
        accountNumber: "1234567890",
        accountName: "Sarah Kim"
      },
      address: "Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta 12345"
    };
    let activeTab = "profile";
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-hetf4f"><div class="header svelte-hetf4f"><div class="header-left svelte-hetf4f"><div class="avatar-large svelte-hetf4f">${escape_html(profile.avatar)}</div> <div><h1 class="svelte-hetf4f">${escape_html(profile.name)}</h1> <p class="subtitle svelte-hetf4f">${escape_html(profile.email)}</p> <div class="verification-badge svelte-hetf4f">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="badge verified svelte-hetf4f">✓ Terverifikasi</span>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="header-stats svelte-hetf4f"><div class="stat-box svelte-hetf4f"><span class="stat-icon svelte-hetf4f">⭐</span> <div><span class="stat-label svelte-hetf4f">Rating</span> <div class="rating-display svelte-hetf4f">`);
    RatingStars($$renderer2, { rating: profile.rating });
    $$renderer2.push(`<!----> <span class="stat-value svelte-hetf4f">${escape_html(profile.rating)}</span></div></div></div> <div class="stat-box svelte-hetf4f"><span class="stat-icon svelte-hetf4f">✈️</span> <div><span class="stat-label svelte-hetf4f">Total Trip</span> <span class="stat-value svelte-hetf4f">${escape_html(profile.totalTrips)}</span></div></div></div></div> <div class="tabs svelte-hetf4f"><button${attr_class("tab-btn svelte-hetf4f", void 0, { "active": activeTab === "profile" })}>Profil</button> <button${attr_class("tab-btn svelte-hetf4f", void 0, { "active": activeTab === "verification" })}>Verifikasi</button> <button${attr_class("tab-btn svelte-hetf4f", void 0, { "active": activeTab === "documents" })}>Dokumen</button></div> <div class="content svelte-hetf4f">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="profile-card svelte-hetf4f"><div class="card-header svelte-hetf4f"><h3 class="svelte-hetf4f">Informasi Pribadi</h3> `);
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="btn-edit svelte-hetf4f">Edit</button>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="info-grid svelte-hetf4f"><div class="info-item svelte-hetf4f"><span class="label svelte-hetf4f">Nama Lengkap</span> <span class="value svelte-hetf4f">${escape_html(profile.name)}</span></div> <div class="info-item svelte-hetf4f"><span class="label svelte-hetf4f">ID Jastiper</span> <span class="value svelte-hetf4f">${escape_html(profile.id)}</span></div> <div class="info-item svelte-hetf4f"><span class="label svelte-hetf4f">Email</span> <span class="value svelte-hetf4f">${escape_html(profile.email)}</span></div> <div class="info-item svelte-hetf4f"><span class="label svelte-hetf4f">Nomor Telepon</span> <span class="value svelte-hetf4f">${escape_html(profile.phone)}</span></div> <div class="info-item svelte-hetf4f"><span class="label svelte-hetf4f">Negara Tujuan</span> <span class="value svelte-hetf4f">${escape_html(profile.country)}</span></div> <div class="info-item svelte-hetf4f"><span class="label svelte-hetf4f">Status</span> <span class="value svelte-hetf4f">${escape_html("Terverifikasi")}</span></div> <div class="info-item full-width svelte-hetf4f"><span class="label svelte-hetf4f">Alamat</span> <span class="value svelte-hetf4f">${escape_html(profile.address)}</span></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="profile-card svelte-hetf4f"><h3 class="svelte-hetf4f">Informasi Rekening</h3> <div class="info-grid svelte-hetf4f"><div class="info-item svelte-hetf4f"><span class="label svelte-hetf4f">Nama Bank</span> <span class="value svelte-hetf4f">${escape_html(profile.bankAccount.bankName)}</span></div> <div class="info-item svelte-hetf4f"><span class="label svelte-hetf4f">Nomor Rekening</span> <span class="value svelte-hetf4f">${escape_html(profile.bankAccount.accountNumber)}</span></div> <div class="info-item full-width svelte-hetf4f"><span class="label svelte-hetf4f">Nama Pemilik Rekening</span> <span class="value svelte-hetf4f">${escape_html(profile.bankAccount.accountName)}</span></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
