import { Z as attr_class, X as ensure_array_like, $ as attr_style, a0 as stringify } from "../../../../chunks/index2.js";
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
    let activeCouriers, totalShipments, pendingVerifications;
    authStore.subscribe((val) => {
      val.role;
    });
    const courierIntegrations = [
      {
        id: "courier-1",
        name: "JNE",
        logo: "📦",
        status: "active",
        apiKey: "jne_live_xxxxxxxxxxxx",
        isConfigured: true,
        totalShipments: 145,
        lastSync: "2024-01-17T10:30:00"
      },
      {
        id: "courier-2",
        name: "J&T Express",
        logo: "🚚",
        status: "active",
        apiKey: "jnt_live_xxxxxxxxxxxx",
        isConfigured: true,
        totalShipments: 98,
        lastSync: "2024-01-17T09:15:00"
      },
      {
        id: "courier-3",
        name: "SiCepat",
        logo: "⚡",
        status: "active",
        apiKey: "sicepat_live_xxxxxxxxxxxx",
        isConfigured: true,
        totalShipments: 67,
        lastSync: "2024-01-17T08:45:00"
      },
      {
        id: "courier-4",
        name: "AnterAja",
        logo: "🛵",
        status: "inactive",
        apiKey: "",
        isConfigured: false,
        totalShipments: 0,
        lastSync: null
      },
      {
        id: "courier-5",
        name: "ID Express",
        logo: "📮",
        status: "inactive",
        apiKey: "",
        isConfigured: false,
        totalShipments: 0,
        lastSync: null
      }
    ];
    const shippingProofs = [
      {
        id: "proof-1",
        orderCode: "ORD-2024-001",
        jastiperName: "Rina Travel",
        buyerName: "Budi Santoso",
        courier: "JNE",
        trackingNumber: "JNE12345678",
        status: "pending",
        submittedAt: "2024-01-17T10:00:00",
        verifiedAt: null,
        proofImageUrl: "/proof1.jpg",
        notes: ""
      },
      {
        id: "proof-2",
        orderCode: "ORD-2024-002",
        jastiperName: "Sinta Shop",
        buyerName: "Dewi Lestari",
        courier: "J&T Express",
        trackingNumber: "JT987654321",
        status: "pending",
        submittedAt: "2024-01-16T15:30:00",
        verifiedAt: null,
        proofImageUrl: "/proof2.jpg",
        notes: ""
      },
      {
        id: "proof-3",
        orderCode: "ORD-2024-003",
        jastiperName: "Yuki Japan",
        buyerName: "Ahmad Hidayat",
        courier: "SiCepat",
        trackingNumber: "SICEPAT123",
        status: "verified",
        submittedAt: "2024-01-15T14:20:00",
        verifiedAt: "2024-01-16T09:00:00",
        proofImageUrl: "/proof3.jpg",
        notes: "Bukti pengiriman valid"
      },
      {
        id: "proof-4",
        orderCode: "ORD-2024-004",
        jastiperName: "Korea Stuff",
        buyerName: "Siti Nurhaliza",
        courier: "JNE",
        trackingNumber: "JNE55555555",
        status: "rejected",
        submittedAt: "2024-01-14T11:00:00",
        verifiedAt: "2024-01-15T10:30:00",
        proofImageUrl: "/proof4.jpg",
        notes: "Foto tidak jelas, mohon upload ulang"
      }
    ];
    let selectedTab = "integrations";
    let modalConfig = {
      isOpen: false,
      type: "info",
      title: "",
      message: "",
      confirmText: "OK",
      cancelText: "Batal",
      showCancel: false,
      inputValue: "",
      inputPlaceholder: ""
    };
    function formatDate(dateString) {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    function getStatusBadge(status) {
      const badges = {
        active: { label: "Aktif", color: "#10b981" },
        inactive: { label: "Tidak Aktif", color: "#94a3b8" },
        pending: { label: "Menunggu", color: "#f59e0b" },
        verified: { label: "Terverifikasi", color: "#10b981" },
        rejected: { label: "Ditolak", color: "#ef4444" }
      };
      return badges[status] || { label: status, color: "#64748b" };
    }
    activeCouriers = courierIntegrations.filter((c) => c.status === "active").length;
    totalShipments = courierIntegrations.reduce((sum, c) => sum + c.totalShipments, 0);
    pendingVerifications = shippingProofs.filter((p) => p.status === "pending").length;
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
        inputPlaceholder: modalConfig.inputPlaceholder,
        get isOpen() {
          return modalConfig.isOpen;
        },
        set isOpen($$value) {
          modalConfig.isOpen = $$value;
          $$settled = false;
        },
        get inputValue() {
          return modalConfig.inputValue;
        },
        set inputValue($$value) {
          modalConfig.inputValue = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> <div class="container svelte-3lqc9v"><div class="header svelte-3lqc9v"><h1 class="svelte-3lqc9v">Manajemen Kurir &amp; Pengiriman</h1> <p class="svelte-3lqc9v">Integrasi sistem kurir dan verifikasi bukti pengiriman</p></div> <div class="stats-cards svelte-3lqc9v"><div class="stat-card svelte-3lqc9v"><div class="stat-icon svelte-3lqc9v" style="background: #d1fae5;">✅</div> <div class="stat-content svelte-3lqc9v"><div class="stat-value svelte-3lqc9v">${escape_html(activeCouriers)}</div> <div class="stat-label svelte-3lqc9v">Kurir Aktif</div></div></div> <div class="stat-card svelte-3lqc9v"><div class="stat-icon svelte-3lqc9v" style="background: #dbeafe;">📦</div> <div class="stat-content svelte-3lqc9v"><div class="stat-value svelte-3lqc9v">${escape_html(totalShipments)}</div> <div class="stat-label svelte-3lqc9v">Total Pengiriman</div></div></div> <div class="stat-card svelte-3lqc9v"><div class="stat-icon svelte-3lqc9v" style="background: #fef3c7;">⏳</div> <div class="stat-content svelte-3lqc9v"><div class="stat-value svelte-3lqc9v">${escape_html(pendingVerifications)}</div> <div class="stat-label svelte-3lqc9v">Menunggu Verifikasi</div></div></div> <div class="stat-card svelte-3lqc9v"><div class="stat-icon svelte-3lqc9v" style="background: #e9d5ff;">🚚</div> <div class="stat-content svelte-3lqc9v"><div class="stat-value svelte-3lqc9v">${escape_html(courierIntegrations.length)}</div> <div class="stat-label svelte-3lqc9v">Total Integrasi Kurir</div></div></div></div> <div class="tabs svelte-3lqc9v"><button${attr_class("tab-button svelte-3lqc9v", void 0, { "active": selectedTab === "integrations" })}>Integrasi Kurir</button> <button${attr_class("tab-button svelte-3lqc9v", void 0, { "active": selectedTab === "verifications" })}>Verifikasi Bukti Kirim</button></div> `);
      {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="section svelte-3lqc9v"><div class="section-header svelte-3lqc9v"><h2 class="svelte-3lqc9v">Daftar Integrasi Kurir</h2></div> <div class="couriers-grid svelte-3lqc9v"><!--[-->`);
        const each_array = ensure_array_like(courierIntegrations);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let courier = each_array[$$index];
          $$renderer3.push(`<div class="courier-card svelte-3lqc9v"><div class="courier-header svelte-3lqc9v"><div class="courier-logo svelte-3lqc9v">${escape_html(courier.logo)}</div> <div class="courier-info svelte-3lqc9v"><div class="courier-name svelte-3lqc9v">${escape_html(courier.name)}</div> <span class="status-badge svelte-3lqc9v"${attr_style(`background-color: ${stringify(getStatusBadge(courier.status).color)};`)}>${escape_html(getStatusBadge(courier.status).label)}</span></div></div> <div class="courier-stats svelte-3lqc9v"><div class="stat-item svelte-3lqc9v"><span class="stat-label svelte-3lqc9v">Total Pengiriman</span> <span class="stat-value svelte-3lqc9v">${escape_html(courier.totalShipments)}</span></div> `);
          if (courier.isConfigured) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="stat-item svelte-3lqc9v"><span class="stat-label svelte-3lqc9v">API Key</span> <span class="stat-value api-key svelte-3lqc9v">${escape_html(courier.apiKey)}</span></div> <div class="stat-item svelte-3lqc9v"><span class="stat-label svelte-3lqc9v">Last Sync</span> <span class="stat-value svelte-3lqc9v">${escape_html(formatDate(courier.lastSync))}</span></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div> <div class="courier-actions svelte-3lqc9v">`);
          if (courier.isConfigured) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<button class="btn-secondary svelte-3lqc9v">Sync Data</button> <button class="btn-secondary svelte-3lqc9v">${escape_html(courier.status === "active" ? "Nonaktifkan" : "Aktifkan")}</button>`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<button class="btn-primary svelte-3lqc9v">Konfigurasi</button>`);
          }
          $$renderer3.push(`<!--]--></div></div>`);
        }
        $$renderer3.push(`<!--]--></div></div>`);
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
