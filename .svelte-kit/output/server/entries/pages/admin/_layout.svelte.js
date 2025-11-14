import { W as store_get, X as ensure_array_like, Y as attr, Z as attr_class, _ as unsubscribe_stores, V as slot } from "../../../chunks/index2.js";
import { N as Navbar } from "../../../chunks/Navbar.js";
import { p as page } from "../../../chunks/stores.js";
import { e as escape_html } from "../../../chunks/context.js";
function AdminSidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const menuItems = [
      {
        section: "Main",
        items: [
          { label: "Dashboard", href: "/admin", icon: "📊" },
          { label: "Manajemen User", href: "/admin/users", icon: "👥" },
          {
            label: "Verifikasi Jastiper",
            href: "/admin/jastiper",
            icon: "✅"
          }
        ]
      },
      {
        section: "Konten",
        items: [
          { label: "Manajemen Post", href: "/admin/posts", icon: "📝" },
          {
            label: "Review & Sengketa",
            href: "/admin/disputes",
            icon: "⚖️"
          },
          {
            label: "Notifikasi",
            href: "/admin/notifications",
            icon: "📢"
          }
        ]
      },
      {
        section: "Transaksi",
        items: [
          {
            label: "Transaksi & Rekber",
            href: "/admin/transactions",
            icon: "💰"
          },
          {
            label: "Kurir & Pengiriman",
            href: "/admin/shipping",
            icon: "🚚"
          },
          { label: "Event & Kuota", href: "/admin/events", icon: "🎟️" }
        ]
      },
      {
        section: "Pengaturan",
        items: [
          {
            label: "Analytics & Settings",
            href: "/admin/settings",
            icon: "⚙️"
          }
        ]
      }
    ];
    let currentPath = "/admin";
    function isActive(href) {
      if (href === "/admin") {
        return currentPath === "/admin";
      }
      return currentPath === href || currentPath.startsWith(`${href}/`);
    }
    {
      const path = store_get($$store_subs ??= {}, "$page", page).url.pathname ?? "/admin";
      currentPath = path.length > 1 && path.endsWith("/") ? path.replace(/\/+$/, "") : path;
    }
    $$renderer2.push(`<aside class="sidebar svelte-ltygjr"><div class="sidebar-header svelte-ltygjr"><div class="admin-badge svelte-ltygjr"><span class="badge-icon svelte-ltygjr">👑</span> <span class="badge-text svelte-ltygjr">Admin Panel</span></div></div> <nav class="sidebar-nav svelte-ltygjr"><!--[-->`);
    const each_array = ensure_array_like(menuItems);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let section = each_array[$$index_1];
      $$renderer2.push(`<div class="nav-section svelte-ltygjr"><div class="section-title svelte-ltygjr">${escape_html(section.section)}</div> <ul class="nav-items svelte-ltygjr"><!--[-->`);
      const each_array_1 = ensure_array_like(section.items);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let item = each_array_1[$$index];
        $$renderer2.push(`<li><a${attr("href", item.href)}${attr_class("nav-item svelte-ltygjr", void 0, { "active": isActive(item.href) })}><span class="nav-icon svelte-ltygjr">${escape_html(item.icon)}</span> <span class="nav-label svelte-ltygjr">${escape_html(item.label)}</span></a></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div>`);
    }
    $$renderer2.push(`<!--]--></nav> <div class="sidebar-footer svelte-ltygjr"><a href="/" class="back-to-site svelte-ltygjr"><span>←</span> <span>Kembali ke Situs</span></a></div></aside>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.push(`<div class="admin-layout">`);
  Navbar($$renderer, {});
  $$renderer.push(`<!----> <div class="admin-shell svelte-1qg5d05">`);
  AdminSidebar($$renderer);
  $$renderer.push(`<!----> <main class="admin-content svelte-1qg5d05"><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></main></div></div>`);
}
export {
  _layout as default
};
