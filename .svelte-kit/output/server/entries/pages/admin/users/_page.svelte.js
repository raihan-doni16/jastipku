import { Y as attr, Z as attr_class, X as ensure_array_like, $ as attr_style, a0 as stringify } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { u as users } from "../../../../chunks/mockData.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredUsers;
    authStore.subscribe((val) => {
      val.role;
    });
    let searchQuery = "";
    let filterRole = "all";
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    }
    filteredUsers = users.filter((user) => {
      const matchRole = filterRole === "all";
      return matchRole;
    });
    $$renderer2.push(`<div class="container svelte-1p497kv"><div class="header svelte-1p497kv"><div><h1 class="svelte-1p497kv">Manajemen Pengguna</h1> <p class="svelte-1p497kv">Kelola semua pengguna pembeli di platform</p></div></div> <div class="filters svelte-1p497kv"><input type="text" placeholder="Cari nama atau email..."${attr("value", searchQuery)} class="search-input svelte-1p497kv"/> <div class="filter-buttons svelte-1p497kv"><button${attr_class("filter-btn svelte-1p497kv", void 0, { "active": filterRole === "all" })}>Semua (${escape_html(users.length)})</button> <button${attr_class("filter-btn svelte-1p497kv", void 0, { "active": filterRole === "user" })}>Pembeli (${escape_html(users.filter((u) => u.role === "user").length)})</button></div></div> <div class="users-table svelte-1p497kv"><table class="svelte-1p497kv"><thead><tr><th class="svelte-1p497kv">Pengguna</th><th class="svelte-1p497kv">Email</th><th class="svelte-1p497kv">Telepon</th><th class="svelte-1p497kv">Bergabung</th><th class="svelte-1p497kv">Total Pesanan</th><th class="svelte-1p497kv">Status</th><th class="svelte-1p497kv">Aksi</th></tr></thead><tbody><!--[-->`);
    const each_array = ensure_array_like(filteredUsers);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let user = each_array[$$index];
      $$renderer2.push(`<tr class="svelte-1p497kv"><td class="svelte-1p497kv"><div class="user-cell svelte-1p497kv"><span class="avatar svelte-1p497kv">${escape_html(user.avatar)}</span> <div class="user-info svelte-1p497kv"><span class="user-name svelte-1p497kv">${escape_html(user.name)}</span> <span class="user-id svelte-1p497kv">${escape_html(user.id)}</span></div></div></td><td class="svelte-1p497kv">${escape_html(user.email)}</td><td class="svelte-1p497kv">${escape_html(user.phone)}</td><td class="svelte-1p497kv">${escape_html(formatDate(user.joinDate))}</td><td class="svelte-1p497kv"><span class="order-count svelte-1p497kv">${escape_html(user.totalOrders)}</span></td><td class="svelte-1p497kv"><span class="status-badge svelte-1p497kv"${attr_style(`background: ${stringify(user.status === "active" ? "#dcfce7" : "#fee2e2")}; color: ${stringify(user.status === "active" ? "#15803d" : "#991b1b")}`)}>${escape_html(user.status === "active" ? "Aktif" : "Nonaktif")}</span></td><td class="svelte-1p497kv"><div class="actions svelte-1p497kv"><button class="btn-action svelte-1p497kv">Lihat</button> <button class="btn-action svelte-1p497kv">Suspend</button></div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div> `);
    if (filteredUsers.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="empty-state svelte-1p497kv"><span class="empty-icon svelte-1p497kv">👥</span> <p class="svelte-1p497kv">Tidak ada pengguna ditemukan</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
