import { W as store_get, Z as attr_class, X as ensure_array_like, _ as unsubscribe_stores } from "../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import { e as escape_html } from "../../../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/state.svelte.js";
import { p as page } from "../../../../../chunks/stores.js";
import { a as authStore } from "../../../../../chunks/auth.js";
import { u as users } from "../../../../../chunks/mockData.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let userId, user, statCards, activityLogs, mockOrders;
    authStore.subscribe((val) => {
      val.role;
    });
    function formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
    }
    function formatDate(value) {
      if (!value) return "-";
      return new Date(value).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    }
    userId = store_get($$store_subs ??= {}, "$page", page).params.id;
    user = users.find((u) => u.id === userId);
    statCards = user ? [
      { label: "Total Pesanan", value: user.totalOrders },
      {
        label: "Status Akun",
        value: user.status === "active" ? "Aktif" : "Nonaktif"
      },
      { label: "Tanggal Gabung", value: formatDate(user.joinDate) }
    ] : [];
    activityLogs = user ? [
      {
        id: `${user.id}-ACT-001`,
        title: "Membuat pesanan baru",
        timestamp: "15 Nov 2025, 10:24",
        status: "Selesai"
      },
      {
        id: `${user.id}-ACT-002`,
        title: "Mengunggah bukti pembayaran",
        timestamp: "11 Nov 2025, 21:17",
        status: "Diproses"
      },
      {
        id: `${user.id}-ACT-003`,
        title: "Membuka tiket bantuan",
        timestamp: "03 Nov 2025, 14:05",
        status: "Ditutup"
      }
    ] : [];
    mockOrders = user ? [
      {
        code: `${user.id}-ORD-2311`,
        product: "Tas Charles & Keith",
        total: formatCurrency(185e4),
        status: "Selesai",
        updatedAt: "10 Nov 2025"
      },
      {
        code: `${user.id}-ORD-2310`,
        product: "Skincare Jepang",
        total: formatCurrency(95e4),
        status: "Sedang dikirim",
        updatedAt: "02 Nov 2025"
      },
      {
        code: `${user.id}-ORD-2309`,
        product: "Figurine Anime",
        total: formatCurrency(125e4),
        status: "Dibatalkan",
        updatedAt: "21 Okt 2025"
      }
    ] : [];
    $$renderer2.push(`<div class="container svelte-k8krhj">`);
    if (user) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="page-header svelte-k8krhj"><button class="back-button svelte-k8krhj">Kembali</button> <div class="page-heading svelte-k8krhj"><p class="breadcrumb svelte-k8krhj">Dashboard / Pengguna / ${escape_html(user.name)}</p> <h1 class="svelte-k8krhj">${escape_html(user.name)}</h1> <p class="svelte-k8krhj">${escape_html(user.email)}</p></div> <span${attr_class("status-chip svelte-k8krhj", void 0, { "active": user.status === "active" })}>${escape_html(user.status === "active" ? "Akun Aktif" : "Akun Nonaktif")}</span></div> <div class="summary-card svelte-k8krhj"><div class="profile svelte-k8krhj"><div class="avatar svelte-k8krhj">${escape_html(user.avatar)}</div> <div><p class="label svelte-k8krhj">ID Pengguna</p> <p class="value svelte-k8krhj">${escape_html(user.id)}</p> <p class="subvalue svelte-k8krhj">${escape_html(user.phone)}</p></div></div> <div class="stats-grid svelte-k8krhj"><!--[-->`);
      const each_array = ensure_array_like(statCards);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let stat = each_array[$$index];
        $$renderer2.push(`<div class="stat-card svelte-k8krhj"><p class="label svelte-k8krhj">${escape_html(stat.label)}</p> <p class="value svelte-k8krhj">${escape_html(stat.value)}</p></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="content-grid svelte-k8krhj"><div class="left-column"><div class="card svelte-k8krhj"><h2 class="svelte-k8krhj">Informasi Kontak</h2> <div class="info-row svelte-k8krhj"><span>Email</span> <strong class="svelte-k8krhj">${escape_html(user.email)}</strong></div> <div class="info-row svelte-k8krhj"><span>Nomor Telepon</span> <strong class="svelte-k8krhj">${escape_html(user.phone)}</strong></div> <div class="info-row svelte-k8krhj"><span>Bergabung</span> <strong class="svelte-k8krhj">${escape_html(formatDate(user.joinDate))}</strong></div> <div class="info-row svelte-k8krhj"><span>Role</span> <strong class="svelte-k8krhj">${escape_html(user.role === "user" ? "Pembeli" : user.role)}</strong></div></div> <div class="card svelte-k8krhj"><h2 class="svelte-k8krhj">Catatan Admin</h2> <p>Pengguna ini aktif melakukan transaksi dan belum memiliki riwayat pelanggaran. Tetap
            perhatikan pola pesanan jika terdapat kenaikan jumlah yang signifikan.</p> <div class="actions svelte-k8krhj"><button class="btn text svelte-k8krhj">Kembali ke daftar</button> <button class="btn primary svelte-k8krhj">Simpan Catatan</button></div></div></div> <div class="right-column"><div class="card activity svelte-k8krhj"><h2 class="svelte-k8krhj">Aktivitas Terbaru</h2> <ul class="svelte-k8krhj"><!--[-->`);
      const each_array_1 = ensure_array_like(activityLogs);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let activity = each_array_1[$$index_1];
        $$renderer2.push(`<li class="svelte-k8krhj"><div><p class="title svelte-k8krhj">${escape_html(activity.title)}</p> <p class="timestamp svelte-k8krhj">${escape_html(activity.timestamp)}</p></div> <span class="badge svelte-k8krhj">${escape_html(activity.status)}</span></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div> <div class="card svelte-k8krhj"><h2 class="svelte-k8krhj">Riwayat Pesanan</h2> <table class="svelte-k8krhj"><thead><tr><th class="svelte-k8krhj">Kode</th><th class="svelte-k8krhj">Produk</th><th class="svelte-k8krhj">Status</th><th class="svelte-k8krhj">Update Terakhir</th></tr></thead><tbody><!--[-->`);
      const each_array_2 = ensure_array_like(mockOrders);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let order = each_array_2[$$index_2];
        $$renderer2.push(`<tr><td class="svelte-k8krhj">${escape_html(order.code)}</td><td class="svelte-k8krhj"><p class="table-title svelte-k8krhj">${escape_html(order.product)}</p> <p class="table-sub svelte-k8krhj">${escape_html(order.total)}</p></td><td class="svelte-k8krhj"><span class="badge svelte-k8krhj">${escape_html(order.status)}</span></td><td class="svelte-k8krhj">${escape_html(order.updatedAt)}</td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="empty-state svelte-k8krhj"><h2 class="svelte-k8krhj">Pengguna tidak ditemukan</h2> <p>Periksa kembali tautan atau kembali ke daftar pengguna.</p> <button class="back-button svelte-k8krhj">Kembali</button></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
