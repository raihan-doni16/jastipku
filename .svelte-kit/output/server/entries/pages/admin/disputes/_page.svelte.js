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
    let filteredReports, pendingDisputes, investigatingDisputes, pendingReviews, totalRefunds;
    authStore.subscribe((val) => {
      val.role;
    });
    const reports = [
      {
        id: "report-1",
        type: "order_dispute",
        orderCode: "ORD-2024-001",
        reporterName: "Budi Santoso",
        reporterRole: "user",
        reportedName: "Rina Travel",
        reportedRole: "jastiper",
        reason: "Barang tidak sesuai",
        description: "Barang yang diterima tidak sesuai dengan foto dan deskripsi. Warna berbeda dan ada cacat.",
        evidence: ["photo1.jpg", "photo2.jpg"],
        status: "pending",
        priority: "high",
        createdAt: "2024-01-17T10:00:00",
        resolvedAt: null,
        resolution: "",
        refundAmount: 0
      },
      {
        id: "report-2",
        type: "fraud",
        orderCode: "ORD-2024-005",
        reporterName: "Dewi Lestari",
        reporterRole: "user",
        reportedName: "Fake Seller",
        reportedRole: "jastiper",
        reason: "Penipuan",
        description: "Jastiper menghilang setelah menerima pembayaran. Tidak ada kabar dan tidak bisa dihubungi.",
        evidence: ["screenshot1.jpg", "chat1.jpg"],
        status: "investigating",
        priority: "critical",
        createdAt: "2024-01-16T14:30:00",
        resolvedAt: null,
        resolution: "",
        refundAmount: 0
      },
      {
        id: "report-3",
        type: "delayed_shipping",
        orderCode: "ORD-2024-003",
        reporterName: "Ahmad Hidayat",
        reporterRole: "user",
        reportedName: "Yuki Japan",
        reportedRole: "jastiper",
        reason: "Pengiriman terlambat",
        description: "Sudah 2 minggu sejak jastiper kembali ke Indonesia tapi barang belum dikirim.",
        evidence: [],
        status: "resolved",
        priority: "medium",
        createdAt: "2024-01-14T09:15:00",
        resolvedAt: "2024-01-16T15:30:00",
        resolution: "Jastiper telah mengirim barang dan memberikan kompensasi diskon 20% untuk pembelian berikutnya.",
        refundAmount: 0
      },
      {
        id: "report-4",
        type: "damaged_item",
        orderCode: "ORD-2024-002",
        reporterName: "Siti Nurhaliza",
        reporterRole: "user",
        reportedName: "Korea Stuff",
        reportedRole: "jastiper",
        reason: "Barang rusak",
        description: "Barang diterima dalam kondisi pecah. Kemasan tidak aman.",
        evidence: ["damaged1.jpg", "packaging1.jpg"],
        status: "resolved",
        priority: "high",
        createdAt: "2024-01-15T11:20:00",
        resolvedAt: "2024-01-16T10:00:00",
        resolution: "Refund penuh diberikan kepada pembeli. Jastiper akan lebih hati-hati dalam packing.",
        refundAmount: 45e4
      }
    ];
    const flaggedReviews = [
      {
        id: "review-1",
        orderCode: "ORD-2024-007",
        reviewerName: "User123",
        jastiperName: "Sinta Shop",
        rating: 1,
        comment: "Penipu! Jangan percaya! Barang palsu semua!",
        flagReason: "Inappropriate language",
        flaggedBy: "System",
        status: "pending",
        createdAt: "2024-01-17T08:30:00"
      },
      {
        id: "review-2",
        orderCode: "ORD-2024-008",
        reviewerName: "Budi Santoso",
        jastiperName: "Korea Stuff",
        rating: 5,
        comment: "Mantap! Hubungi saya di 08123456789 untuk diskon spesial!",
        flagReason: "Spam/Advertising",
        flaggedBy: "User Report",
        status: "pending",
        createdAt: "2024-01-16T15:45:00"
      },
      {
        id: "review-3",
        orderCode: "ORD-2024-009",
        reviewerName: "Angry Customer",
        jastiperName: "Rina Travel",
        rating: 1,
        comment: "Sialan lu! Gua tau rumah lu dimana!",
        flagReason: "Threatening/Harassment",
        flaggedBy: "Jastiper Report",
        status: "removed",
        createdAt: "2024-01-15T12:00:00"
      }
    ];
    let selectedTab = "disputes";
    let filterStatus = "all";
    let filterPriority = "all";
    const statusOptions = [
      { value: "all", label: "Semua Status" },
      { value: "pending", label: "Menunggu Review" },
      { value: "investigating", label: "Sedang Investigasi" },
      { value: "resolved", label: "Selesai" },
      { value: "rejected", label: "Ditolak" }
    ];
    const priorityOptions = [
      { value: "all", label: "Semua Prioritas" },
      { value: "critical", label: "Kritis" },
      { value: "high", label: "Tinggi" },
      { value: "medium", label: "Sedang" },
      { value: "low", label: "Rendah" }
    ];
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
    function formatPrice(price) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    }
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
        pending: { label: "Menunggu Review", color: "#f59e0b" },
        investigating: { label: "Investigasi", color: "#3b82f6" },
        resolved: { label: "Selesai", color: "#10b981" },
        rejected: { label: "Ditolak", color: "#94a3b8" },
        approved: { label: "Disetujui", color: "#10b981" },
        removed: { label: "Dihapus", color: "#ef4444" }
      };
      return badges[status] || { label: status, color: "#64748b" };
    }
    function getPriorityBadge(priority) {
      const badges = {
        critical: { label: "Kritis", color: "#dc2626" },
        high: { label: "Tinggi", color: "#f59e0b" },
        medium: { label: "Sedang", color: "#3b82f6" },
        low: { label: "Rendah", color: "#94a3b8" }
      };
      return badges[priority] || { label: priority, color: "#64748b" };
    }
    filteredReports = reports.filter((report) => {
      const matchPriority = filterPriority === "all";
      return matchPriority;
    });
    pendingDisputes = reports.filter((r) => r.status === "pending").length;
    investigatingDisputes = reports.filter((r) => r.status === "investigating").length;
    pendingReviews = flaggedReviews.filter((r) => r.status === "pending").length;
    totalRefunds = reports.reduce((sum, r) => sum + r.refundAmount, 0);
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
      $$renderer3.push(`<!----> <div class="container svelte-iq7ybm"><div class="header svelte-iq7ybm"><h1 class="svelte-iq7ybm">Review &amp; Sengketa</h1> <p class="svelte-iq7ybm">Tangani laporan, sengketa, dan moderasi review</p></div> <div class="stats-cards svelte-iq7ybm"><div class="stat-card svelte-iq7ybm"><div class="stat-icon svelte-iq7ybm" style="background: #fef3c7;">⚠️</div> <div class="stat-content svelte-iq7ybm"><div class="stat-value svelte-iq7ybm">${escape_html(pendingDisputes)}</div> <div class="stat-label svelte-iq7ybm">Sengketa Pending</div></div></div> <div class="stat-card svelte-iq7ybm"><div class="stat-icon svelte-iq7ybm" style="background: #dbeafe;">🔍</div> <div class="stat-content svelte-iq7ybm"><div class="stat-value svelte-iq7ybm">${escape_html(investigatingDisputes)}</div> <div class="stat-label svelte-iq7ybm">Dalam Investigasi</div></div></div> <div class="stat-card svelte-iq7ybm"><div class="stat-icon svelte-iq7ybm" style="background: #fee2e2;">🚫</div> <div class="stat-content svelte-iq7ybm"><div class="stat-value svelte-iq7ybm">${escape_html(pendingReviews)}</div> <div class="stat-label svelte-iq7ybm">Review Perlu Moderasi</div></div></div> <div class="stat-card svelte-iq7ybm"><div class="stat-icon svelte-iq7ybm" style="background: #d1fae5;">💰</div> <div class="stat-content svelte-iq7ybm"><div class="stat-value svelte-iq7ybm">${escape_html(formatPrice(totalRefunds))}</div> <div class="stat-label svelte-iq7ybm">Total Refund</div></div></div></div> <div class="tabs svelte-iq7ybm"><button${attr_class("tab-button svelte-iq7ybm", void 0, { "active": selectedTab === "disputes" })}>Laporan &amp; Sengketa</button> <button${attr_class("tab-button svelte-iq7ybm", void 0, { "active": selectedTab === "reviews" })}>Moderasi Review</button></div> `);
      {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="section svelte-iq7ybm"><div class="section-header svelte-iq7ybm"><h2 class="svelte-iq7ybm">Laporan &amp; Sengketa</h2> <div class="filters svelte-iq7ybm">`);
        $$renderer3.select(
          { value: filterStatus, class: "" },
          ($$renderer4) => {
            $$renderer4.push(`<!--[-->`);
            const each_array = ensure_array_like(statusOptions);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let option = each_array[$$index];
              $$renderer4.option({ value: option.value }, ($$renderer5) => {
                $$renderer5.push(`${escape_html(option.label)}`);
              });
            }
            $$renderer4.push(`<!--]-->`);
          },
          "svelte-iq7ybm"
        );
        $$renderer3.push(` `);
        $$renderer3.select(
          { value: filterPriority, class: "" },
          ($$renderer4) => {
            $$renderer4.push(`<!--[-->`);
            const each_array_1 = ensure_array_like(priorityOptions);
            for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
              let option = each_array_1[$$index_1];
              $$renderer4.option({ value: option.value }, ($$renderer5) => {
                $$renderer5.push(`${escape_html(option.label)}`);
              });
            }
            $$renderer4.push(`<!--]-->`);
          },
          "svelte-iq7ybm"
        );
        $$renderer3.push(`</div></div> <div class="results-info svelte-iq7ybm">Menampilkan ${escape_html(filteredReports.length)} dari ${escape_html(reports.length)} laporan</div> <div class="reports-list svelte-iq7ybm"><!--[-->`);
        const each_array_2 = ensure_array_like(filteredReports);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let report = each_array_2[$$index_2];
          $$renderer3.push(`<div class="report-card svelte-iq7ybm"><div class="report-header svelte-iq7ybm"><div class="report-title-section svelte-iq7ybm"><span class="report-id svelte-iq7ybm">${escape_html(report.id)}</span> <span class="order-code svelte-iq7ybm">${escape_html(report.orderCode)}</span> <div class="badges svelte-iq7ybm"><span class="priority-badge svelte-iq7ybm"${attr_style(`background-color: ${stringify(getPriorityBadge(report.priority).color)};`)}>${escape_html(getPriorityBadge(report.priority).label)}</span> <span class="status-badge svelte-iq7ybm"${attr_style(`background-color: ${stringify(getStatusBadge(report.status).color)};`)}>${escape_html(getStatusBadge(report.status).label)}</span></div></div> <div class="report-date svelte-iq7ybm">${escape_html(formatDate(report.createdAt))}</div></div> <div class="report-content svelte-iq7ybm"><div class="info-section svelte-iq7ybm"><div class="info-label svelte-iq7ybm">Pelapor</div> <div class="info-value svelte-iq7ybm">${escape_html(report.reporterName)}</div> <div class="info-subvalue svelte-iq7ybm">(${escape_html(report.reporterRole)})</div></div> <div class="info-section svelte-iq7ybm"><div class="info-label svelte-iq7ybm">Dilaporkan</div> <div class="info-value svelte-iq7ybm">${escape_html(report.reportedName)}</div> <div class="info-subvalue svelte-iq7ybm">(${escape_html(report.reportedRole)})</div></div> <div class="info-section svelte-iq7ybm"><div class="info-label svelte-iq7ybm">Alasan</div> <div class="info-value svelte-iq7ybm">${escape_html(report.reason)}</div></div> <div class="info-section full-width svelte-iq7ybm"><div class="info-label svelte-iq7ybm">Deskripsi</div> <div class="description-text svelte-iq7ybm">${escape_html(report.description)}</div></div> `);
          if (report.evidence.length > 0) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="info-section svelte-iq7ybm"><div class="info-label svelte-iq7ybm">Bukti</div> <button class="btn-link svelte-iq7ybm">Lihat ${escape_html(report.evidence.length)} bukti</button></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (report.status === "resolved") {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="info-section full-width resolution-box svelte-iq7ybm"><div class="info-label svelte-iq7ybm">Resolusi</div> <div class="resolution-text svelte-iq7ybm">${escape_html(report.resolution)}</div> `);
            if (report.refundAmount > 0) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<div class="refund-amount svelte-iq7ybm">Refund: ${escape_html(formatPrice(report.refundAmount))}</div>`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> <div class="info-subvalue svelte-iq7ybm">Diselesaikan: ${escape_html(formatDate(report.resolvedAt))}</div></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div> <div class="report-actions svelte-iq7ybm">`);
          if (report.status === "pending") {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<button class="btn-secondary svelte-iq7ybm">Mulai Investigasi</button> <button class="btn-reject svelte-iq7ybm">Tolak</button>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (report.status === "investigating" || report.status === "pending") {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<button class="btn-primary svelte-iq7ybm">Selesaikan</button>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div></div>`);
        }
        $$renderer3.push(`<!--]--></div> `);
        if (filteredReports.length === 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="empty-state svelte-iq7ybm"><div class="empty-icon svelte-iq7ybm">⚖️</div> <h3 class="svelte-iq7ybm">Tidak ada laporan</h3> <p class="svelte-iq7ybm">Laporan dan sengketa akan muncul di sini</p></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div>`);
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
