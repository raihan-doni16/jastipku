import { Z as attr_class, $ as attr_style, X as ensure_array_like, a0 as stringify } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import { e as escape_html } from "../../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { M as Modal } from "../../../../chunks/Modal.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    authStore.subscribe((val) => {
      val.role;
    });
    const analyticsData = {
      overview: {
        totalUsers: 2500,
        totalJastiper: 850,
        totalOrders: 1250,
        totalRevenue: 125e6,
        userGrowth: 12.5,
        jastiperGrowth: 8.3,
        orderGrowth: 15.7,
        revenueGrowth: 22.4
      },
      topJastiper: [
        {
          name: "Rina Travel",
          orders: 145,
          revenue: 185e5,
          rating: 4.8
        },
        {
          name: "Yuki Japan",
          orders: 132,
          revenue: 162e5,
          rating: 4.9
        },
        {
          name: "Korea Stuff",
          orders: 118,
          revenue: 148e5,
          rating: 4.7
        },
        {
          name: "Sinta Shop",
          orders: 95,
          revenue: 121e5,
          rating: 4.6
        },
        {
          name: "Bangkok Express",
          orders: 87,
          revenue: 109e5,
          rating: 4.5
        }
      ],
      topCategories: [
        { name: "Fashion", orders: 450, percentage: 36 },
        { name: "Elektronik", orders: 325, percentage: 26 },
        { name: "Kosmetik", orders: 250, percentage: 20 },
        { name: "Makanan", orders: 125, percentage: 10 },
        { name: "Lainnya", orders: 100, percentage: 8 }
      ],
      recentActivity: [
        {
          id: "act-1",
          type: "order",
          message: "Pesanan baru dari Budi Santoso",
          time: "2024-01-17T14:30:00"
        },
        {
          id: "act-2",
          type: "jastiper",
          message: "Jastiper baru terdaftar: New Traveler",
          time: "2024-01-17T13:45:00"
        },
        {
          id: "act-3",
          type: "dispute",
          message: "Sengketa baru dilaporkan untuk ORD-2024-099",
          time: "2024-01-17T12:20:00"
        },
        {
          id: "act-4",
          type: "review",
          message: "Review baru dari Dewi Lestari (5 bintang)",
          time: "2024-01-17T11:10:00"
        },
        {
          id: "act-5",
          type: "withdrawal",
          message: "Permintaan penarikan dana dari Rina Travel",
          time: "2024-01-17T10:00:00"
        }
      ]
    };
    let selectedTab = "analytics";
    let modalConfig = {
      isOpen: false,
      type: "info",
      title: "",
      message: "",
      confirmText: "OK",
      cancelText: "Batal",
      showCancel: false
    };
    function formatPrice(price) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    }
    function formatDate(dateString) {
      const date = new Date(dateString);
      const now = /* @__PURE__ */ new Date();
      const diff = now - date;
      const minutes = Math.floor(diff / 6e4);
      const hours = Math.floor(diff / 36e5);
      if (minutes < 60) {
        return `${minutes} menit yang lalu`;
      } else if (hours < 24) {
        return `${hours} jam yang lalu`;
      } else {
        return date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit"
        });
      }
    }
    function getGrowthColor(growth) {
      return growth >= 0 ? "#10b981" : "#ef4444";
    }
    function getActivityIcon(type) {
      const icons = {
        order: "🛍️",
        jastiper: "👤",
        dispute: "⚠️",
        review: "⭐",
        withdrawal: "💰"
      };
      return icons[type] || "📋";
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Modal($$renderer3, {
        type: modalConfig.type,
        title: modalConfig.title,
        message: modalConfig.message,
        confirmText: modalConfig.confirmText,
        cancelText: modalConfig.cancelText,
        showCancel: modalConfig.showCancel,
        get isOpen() {
          return modalConfig.isOpen;
        },
        set isOpen($$value) {
          modalConfig.isOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> <div class="container svelte-1gjcsm"><div class="header svelte-1gjcsm"><h1 class="svelte-1gjcsm">Analytics &amp; Pengaturan</h1> <p class="svelte-1gjcsm">Pantau performa sistem dan konfigurasi platform</p></div> <div class="tabs svelte-1gjcsm"><button${attr_class("tab-button svelte-1gjcsm", void 0, { "active": selectedTab === "analytics" })}>Analytics &amp; Performa</button> <button${attr_class("tab-button svelte-1gjcsm", void 0, { "active": selectedTab === "settings" })}>Pengaturan Platform</button></div> `);
      {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="analytics-section svelte-1gjcsm"><div class="stats-grid svelte-1gjcsm"><div class="stat-card svelte-1gjcsm"><div class="stat-header svelte-1gjcsm"><span class="stat-icon svelte-1gjcsm">👥</span> <span class="stat-label svelte-1gjcsm">Total Users</span></div> <div class="stat-value svelte-1gjcsm">${escape_html(analyticsData.overview.totalUsers.toLocaleString("id-ID"))}</div> <div class="stat-growth svelte-1gjcsm"${attr_style(`color: ${stringify(getGrowthColor(analyticsData.overview.userGrowth))}`)}>${escape_html("↗")}
            ${escape_html(Math.abs(analyticsData.overview.userGrowth))}% vs bulan lalu</div></div> <div class="stat-card svelte-1gjcsm"><div class="stat-header svelte-1gjcsm"><span class="stat-icon svelte-1gjcsm">🛍️</span> <span class="stat-label svelte-1gjcsm">Total Jastiper</span></div> <div class="stat-value svelte-1gjcsm">${escape_html(analyticsData.overview.totalJastiper.toLocaleString("id-ID"))}</div> <div class="stat-growth svelte-1gjcsm"${attr_style(`color: ${stringify(getGrowthColor(analyticsData.overview.jastiperGrowth))}`)}>${escape_html("↗")}
            ${escape_html(Math.abs(analyticsData.overview.jastiperGrowth))}% vs bulan lalu</div></div> <div class="stat-card svelte-1gjcsm"><div class="stat-header svelte-1gjcsm"><span class="stat-icon svelte-1gjcsm">📦</span> <span class="stat-label svelte-1gjcsm">Total Orders</span></div> <div class="stat-value svelte-1gjcsm">${escape_html(analyticsData.overview.totalOrders.toLocaleString("id-ID"))}</div> <div class="stat-growth svelte-1gjcsm"${attr_style(`color: ${stringify(getGrowthColor(analyticsData.overview.orderGrowth))}`)}>${escape_html("↗")}
            ${escape_html(Math.abs(analyticsData.overview.orderGrowth))}% vs bulan lalu</div></div> <div class="stat-card svelte-1gjcsm"><div class="stat-header svelte-1gjcsm"><span class="stat-icon svelte-1gjcsm">💰</span> <span class="stat-label svelte-1gjcsm">Total Revenue</span></div> <div class="stat-value svelte-1gjcsm">${escape_html(formatPrice(analyticsData.overview.totalRevenue))}</div> <div class="stat-growth svelte-1gjcsm"${attr_style(`color: ${stringify(getGrowthColor(analyticsData.overview.revenueGrowth))}`)}>${escape_html("↗")}
            ${escape_html(Math.abs(analyticsData.overview.revenueGrowth))}% vs bulan lalu</div></div></div> <div class="analytics-grid svelte-1gjcsm"><div class="analytics-card svelte-1gjcsm"><div class="card-header svelte-1gjcsm"><h3 class="svelte-1gjcsm">Top Jastiper</h3> <button class="btn-export svelte-1gjcsm">Export</button></div> <div class="table-container svelte-1gjcsm"><table class="svelte-1gjcsm"><thead><tr><th class="svelte-1gjcsm">Nama</th><th class="svelte-1gjcsm">Orders</th><th class="svelte-1gjcsm">Revenue</th><th class="svelte-1gjcsm">Rating</th></tr></thead><tbody><!--[-->`);
        const each_array = ensure_array_like(analyticsData.topJastiper);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let jastiper = each_array[$$index];
          $$renderer3.push(`<tr><td class="name-cell svelte-1gjcsm">${escape_html(jastiper.name)}</td><td class="svelte-1gjcsm">${escape_html(jastiper.orders)}</td><td class="svelte-1gjcsm">${escape_html(formatPrice(jastiper.revenue))}</td><td class="rating-cell svelte-1gjcsm">⭐ ${escape_html(jastiper.rating)}</td></tr>`);
        }
        $$renderer3.push(`<!--]--></tbody></table></div></div> <div class="analytics-card svelte-1gjcsm"><div class="card-header svelte-1gjcsm"><h3 class="svelte-1gjcsm">Top Kategori</h3></div> <div class="categories-list svelte-1gjcsm"><!--[-->`);
        const each_array_1 = ensure_array_like(analyticsData.topCategories);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let category = each_array_1[$$index_1];
          $$renderer3.push(`<div class="category-item svelte-1gjcsm"><div class="category-info svelte-1gjcsm"><span class="category-name svelte-1gjcsm">${escape_html(category.name)}</span> <span class="category-orders svelte-1gjcsm">${escape_html(category.orders)} orders</span></div> <div class="category-bar-container svelte-1gjcsm"><div class="category-bar svelte-1gjcsm"${attr_style(`width: ${stringify(category.percentage)}%`)}></div></div> <span class="category-percentage svelte-1gjcsm">${escape_html(category.percentage)}%</span></div>`);
        }
        $$renderer3.push(`<!--]--></div></div></div> <div class="analytics-card svelte-1gjcsm"><div class="card-header svelte-1gjcsm"><h3 class="svelte-1gjcsm">Aktivitas Terbaru</h3></div> <div class="activity-list svelte-1gjcsm"><!--[-->`);
        const each_array_2 = ensure_array_like(analyticsData.recentActivity);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let activity = each_array_2[$$index_2];
          $$renderer3.push(`<div class="activity-item svelte-1gjcsm"><span class="activity-icon svelte-1gjcsm">${escape_html(getActivityIcon(activity.type))}</span> <div class="activity-content svelte-1gjcsm"><div class="activity-message svelte-1gjcsm">${escape_html(activity.message)}</div> <div class="activity-time svelte-1gjcsm">${escape_html(formatDate(activity.time))}</div></div></div>`);
        }
        $$renderer3.push(`<!--]--></div></div></div>`);
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div>`);
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
