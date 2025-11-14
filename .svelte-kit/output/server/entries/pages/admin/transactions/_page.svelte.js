import { X as ensure_array_like, $ as attr_style, a0 as stringify, Y as attr, Z as attr_class } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredTransactions, filteredWithdrawals, totalHeldAmount, totalReleasedAmount, pendingWithdrawals;
    authStore.subscribe((val) => {
      val.role;
    });
    const transactions = [
      {
        id: "TRX001",
        orderCode: "ORD-2024-001",
        jastiperName: "Rina Travel",
        buyerName: "Budi Santoso",
        amount: 85e4,
        escrowAmount: 85e4,
        status: "held",
        type: "full_payment",
        createdAt: "2024-01-15T10:30:00",
        releasedAt: null
      },
      {
        id: "TRX002",
        orderCode: "ORD-2024-002",
        jastiperName: "Sinta Shop",
        buyerName: "Dewi Lestari",
        amount: 45e4,
        escrowAmount: 0,
        status: "released",
        type: "dp_payment",
        createdAt: "2024-01-14T14:20:00",
        releasedAt: "2024-01-16T09:15:00"
      },
      {
        id: "TRX003",
        orderCode: "ORD-2024-003",
        jastiperName: "Yuki Japan",
        buyerName: "Ahmad Hidayat",
        amount: 12e5,
        escrowAmount: 12e5,
        status: "held",
        type: "full_payment",
        createdAt: "2024-01-13T16:45:00",
        releasedAt: null
      },
      {
        id: "TRX004",
        orderCode: "ORD-2024-004",
        jastiperName: "Rina Travel",
        buyerName: "Siti Nurhaliza",
        amount: 325e3,
        escrowAmount: 0,
        status: "released",
        type: "full_payment",
        createdAt: "2024-01-12T11:30:00",
        releasedAt: "2024-01-14T13:20:00"
      },
      {
        id: "TRX005",
        orderCode: "ORD-2024-005",
        jastiperName: "Korea Stuff",
        buyerName: "Andi Wijaya",
        amount: 6e5,
        escrowAmount: 3e5,
        status: "held",
        type: "dp_payment",
        createdAt: "2024-01-16T08:15:00",
        releasedAt: null
      }
    ];
    const withdrawalRequests = [
      {
        id: "WD001",
        jastiperName: "Rina Travel",
        jastiperEmail: "rina@example.com",
        amount: 245e4,
        bankName: "BCA",
        accountNumber: "1234567890",
        accountName: "Rina Maharani",
        status: "pending",
        requestedAt: "2024-01-17T09:30:00",
        processedAt: null,
        notes: ""
      },
      {
        id: "WD002",
        jastiperName: "Sinta Shop",
        jastiperEmail: "sinta@example.com",
        amount: 18e5,
        bankName: "Mandiri",
        accountNumber: "9876543210",
        accountName: "Sinta Dewi",
        status: "pending",
        requestedAt: "2024-01-16T15:20:00",
        processedAt: null,
        notes: ""
      },
      {
        id: "WD003",
        jastiperName: "Yuki Japan",
        jastiperEmail: "yuki@example.com",
        amount: 32e5,
        bankName: "BNI",
        accountNumber: "5554443332",
        accountName: "Yuki Tanaka",
        status: "approved",
        requestedAt: "2024-01-15T10:00:00",
        processedAt: "2024-01-16T11:30:00",
        notes: "Disetujui dan sudah ditransfer"
      },
      {
        id: "WD004",
        jastiperName: "Korea Stuff",
        jastiperEmail: "korea@example.com",
        amount: 95e4,
        bankName: "BRI",
        accountNumber: "7778889990",
        accountName: "Kim Soo Jin",
        status: "rejected",
        requestedAt: "2024-01-14T13:45:00",
        processedAt: "2024-01-15T09:20:00",
        notes: "Saldo tidak mencukupi"
      }
    ];
    let filterStatus = "all";
    let filterWithdrawalStatus = "all";
    let searchQuery = "";
    const statusOptions = [
      { value: "all", label: "Semua Status" },
      { value: "held", label: "Dana Tertahan" },
      { value: "released", label: "Dana Dicairkan" }
    ];
    const withdrawalStatusOptions = [
      { value: "all", label: "Semua Status" },
      { value: "pending", label: "Menunggu" },
      { value: "approved", label: "Disetujui" },
      { value: "rejected", label: "Ditolak" }
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
        held: { label: "Dana Tertahan", color: "#f59e0b" },
        released: { label: "Dana Dicairkan", color: "#10b981" },
        pending: { label: "Menunggu", color: "#f59e0b" },
        approved: { label: "Disetujui", color: "#10b981" },
        rejected: { label: "Ditolak", color: "#ef4444" }
      };
      return badges[status] || { label: status, color: "#64748b" };
    }
    filteredTransactions = transactions.filter((trx) => {
      const matchSearch = searchQuery === "";
      return matchSearch;
    });
    filteredWithdrawals = withdrawalRequests.filter((wd) => {
      return filterWithdrawalStatus === "all";
    });
    totalHeldAmount = transactions.filter((t) => t.status === "held").reduce((sum, t) => sum + t.escrowAmount, 0);
    totalReleasedAmount = transactions.filter((t) => t.status === "released").reduce((sum, t) => sum + t.amount, 0);
    pendingWithdrawals = withdrawalRequests.filter((w) => w.status === "pending").length;
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
      $$renderer3.push(`<!----> <div class="container svelte-10kheme"><div class="header svelte-10kheme"><h1 class="svelte-10kheme">Transaksi &amp; Rekber</h1> <p class="svelte-10kheme">Pantau saldo tertahan dan pencairan dana</p></div> <div class="stats-cards svelte-10kheme"><div class="stat-card svelte-10kheme"><div class="stat-icon svelte-10kheme" style="background: #fef3c7;">💰</div> <div class="stat-content svelte-10kheme"><div class="stat-value svelte-10kheme">${escape_html(formatPrice(totalHeldAmount))}</div> <div class="stat-label svelte-10kheme">Total Dana Tertahan</div></div></div> <div class="stat-card svelte-10kheme"><div class="stat-icon svelte-10kheme" style="background: #d1fae5;">✅</div> <div class="stat-content svelte-10kheme"><div class="stat-value svelte-10kheme">${escape_html(formatPrice(totalReleasedAmount))}</div> <div class="stat-label svelte-10kheme">Total Dana Dicairkan</div></div></div> <div class="stat-card svelte-10kheme"><div class="stat-icon svelte-10kheme" style="background: #dbeafe;">⏳</div> <div class="stat-content svelte-10kheme"><div class="stat-value svelte-10kheme">${escape_html(pendingWithdrawals)}</div> <div class="stat-label svelte-10kheme">Permintaan Penarikan Pending</div></div></div> <div class="stat-card svelte-10kheme"><div class="stat-icon svelte-10kheme" style="background: #e9d5ff;">📊</div> <div class="stat-content svelte-10kheme"><div class="stat-value svelte-10kheme">${escape_html(transactions.length)}</div> <div class="stat-label svelte-10kheme">Total Transaksi</div></div></div></div> <div class="section svelte-10kheme"><div class="section-header svelte-10kheme"><h2 class="svelte-10kheme">Permintaan Penarikan Dana</h2> `);
      $$renderer3.select(
        { value: filterWithdrawalStatus, class: "" },
        ($$renderer4) => {
          $$renderer4.push(`<!--[-->`);
          const each_array = ensure_array_like(withdrawalStatusOptions);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let option = each_array[$$index];
            $$renderer4.option({ value: option.value }, ($$renderer5) => {
              $$renderer5.push(`${escape_html(option.label)}`);
            });
          }
          $$renderer4.push(`<!--]-->`);
        },
        "svelte-10kheme"
      );
      $$renderer3.push(`</div> <div class="withdrawal-list svelte-10kheme"><!--[-->`);
      const each_array_1 = ensure_array_like(filteredWithdrawals);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let withdrawal = each_array_1[$$index_1];
        $$renderer3.push(`<div class="withdrawal-card svelte-10kheme"><div class="withdrawal-header svelte-10kheme"><div class="withdrawal-id-section svelte-10kheme"><span class="withdrawal-id svelte-10kheme">${escape_html(withdrawal.id)}</span> <span class="status-badge svelte-10kheme"${attr_style(`background-color: ${stringify(getStatusBadge(withdrawal.status).color)};`)}>${escape_html(getStatusBadge(withdrawal.status).label)}</span></div> <div class="withdrawal-date svelte-10kheme">${escape_html(formatDate(withdrawal.requestedAt))}</div></div> <div class="withdrawal-content svelte-10kheme"><div class="info-section svelte-10kheme"><div class="info-label svelte-10kheme">Jastiper</div> <div class="info-value svelte-10kheme">${escape_html(withdrawal.jastiperName)}</div> <div class="info-subvalue svelte-10kheme">${escape_html(withdrawal.jastiperEmail)}</div></div> <div class="info-section svelte-10kheme"><div class="info-label svelte-10kheme">Jumlah Penarikan</div> <div class="info-value price svelte-10kheme">${escape_html(formatPrice(withdrawal.amount))}</div></div> <div class="info-section svelte-10kheme"><div class="info-label svelte-10kheme">Rekening Tujuan</div> <div class="info-value svelte-10kheme">${escape_html(withdrawal.bankName)}</div> <div class="info-subvalue svelte-10kheme">${escape_html(withdrawal.accountNumber)}</div> <div class="info-subvalue svelte-10kheme">a.n. ${escape_html(withdrawal.accountName)}</div></div> `);
        if (withdrawal.processedAt) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="info-section svelte-10kheme"><div class="info-label svelte-10kheme">Diproses</div> <div class="info-subvalue svelte-10kheme">${escape_html(formatDate(withdrawal.processedAt))}</div></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (withdrawal.notes) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="info-section full-width svelte-10kheme"><div class="info-label svelte-10kheme">Catatan</div> <div class="info-subvalue svelte-10kheme">${escape_html(withdrawal.notes)}</div></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div> `);
        if (withdrawal.status === "pending") {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="withdrawal-actions svelte-10kheme"><button class="btn-reject svelte-10kheme">Tolak</button> <button class="btn-approve svelte-10kheme">Setujui Penarikan</button></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div>`);
      }
      $$renderer3.push(`<!--]--></div> `);
      if (filteredWithdrawals.length === 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="empty-state svelte-10kheme"><div class="empty-icon svelte-10kheme">💳</div> <h3 class="svelte-10kheme">Tidak ada permintaan penarikan</h3> <p class="svelte-10kheme">Permintaan penarikan dari jastiper akan muncul di sini</p></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> <div class="section svelte-10kheme"><div class="section-header svelte-10kheme"><h2 class="svelte-10kheme">Riwayat Transaksi Escrow</h2> <div class="filters svelte-10kheme"><div class="search-box svelte-10kheme"><span class="search-icon svelte-10kheme">🔍</span> <input type="text" placeholder="Cari kode order, jastiper, atau pembeli..."${attr("value", searchQuery)} class="svelte-10kheme"/></div> `);
      $$renderer3.select(
        { value: filterStatus, class: "" },
        ($$renderer4) => {
          $$renderer4.push(`<!--[-->`);
          const each_array_2 = ensure_array_like(statusOptions);
          for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
            let option = each_array_2[$$index_2];
            $$renderer4.option({ value: option.value }, ($$renderer5) => {
              $$renderer5.push(`${escape_html(option.label)}`);
            });
          }
          $$renderer4.push(`<!--]-->`);
        },
        "svelte-10kheme"
      );
      $$renderer3.push(`</div></div> <div class="results-info svelte-10kheme">Menampilkan ${escape_html(filteredTransactions.length)} dari ${escape_html(transactions.length)} transaksi</div> <div class="transactions-list svelte-10kheme"><!--[-->`);
      const each_array_3 = ensure_array_like(filteredTransactions);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let transaction = each_array_3[$$index_3];
        $$renderer3.push(`<div class="transaction-card svelte-10kheme"><div class="transaction-header svelte-10kheme"><div class="transaction-id-section svelte-10kheme"><span class="transaction-id svelte-10kheme">${escape_html(transaction.id)}</span> <span class="order-code svelte-10kheme">${escape_html(transaction.orderCode)}</span> <span class="status-badge svelte-10kheme"${attr_style(`background-color: ${stringify(getStatusBadge(transaction.status).color)};`)}>${escape_html(getStatusBadge(transaction.status).label)}</span></div> <div class="transaction-date svelte-10kheme">${escape_html(formatDate(transaction.createdAt))}</div></div> <div class="transaction-content svelte-10kheme"><div class="info-section svelte-10kheme"><div class="info-label svelte-10kheme">Jastiper</div> <div class="info-value svelte-10kheme">${escape_html(transaction.jastiperName)}</div></div> <div class="info-section svelte-10kheme"><div class="info-label svelte-10kheme">Pembeli</div> <div class="info-value svelte-10kheme">${escape_html(transaction.buyerName)}</div></div> <div class="info-section svelte-10kheme"><div class="info-label svelte-10kheme">Tipe Pembayaran</div> <div class="info-value svelte-10kheme">${escape_html(transaction.type === "full_payment" ? "Bayar Penuh" : "DP 50%")}</div></div> <div class="info-section svelte-10kheme"><div class="info-label svelte-10kheme">Total Amount</div> <div class="info-value price svelte-10kheme">${escape_html(formatPrice(transaction.amount))}</div></div> <div class="info-section svelte-10kheme"><div class="info-label svelte-10kheme">Dana Tertahan</div> <div${attr_class("info-value svelte-10kheme", void 0, { "zero": transaction.escrowAmount === 0 })}>${escape_html(formatPrice(transaction.escrowAmount))}</div></div> `);
        if (transaction.releasedAt) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="info-section svelte-10kheme"><div class="info-label svelte-10kheme">Dicairkan Pada</div> <div class="info-subvalue svelte-10kheme">${escape_html(formatDate(transaction.releasedAt))}</div></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div> `);
        if (transaction.status === "held" && transaction.escrowAmount > 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="transaction-actions svelte-10kheme"><button class="btn-release svelte-10kheme">Lepas Dana ke Jastiper</button></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div>`);
      }
      $$renderer3.push(`<!--]--></div> `);
      if (filteredTransactions.length === 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="empty-state svelte-10kheme"><div class="empty-icon svelte-10kheme">💸</div> <h3 class="svelte-10kheme">Tidak ada transaksi</h3> <p class="svelte-10kheme">Transaksi escrow akan muncul di sini</p></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div></div>`);
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
