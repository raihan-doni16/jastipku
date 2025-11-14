import { X as ensure_array_like, Z as attr_class, $ as attr_style, a0 as stringify, Y as attr } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.js";
import { N as Navbar } from "../../../../chunks/Navbar.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { j as jastiperTransactions } from "../../../../chunks/mockData.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let myTransactions, pendingBalance, activeBalance, totalWithdrawn;
    authStore.subscribe((val) => {
      val.role;
    });
    const currentJastiperId = "JST001";
    let showWithdrawModal = false;
    let withdrawForm = { amount: 0, bankName: "", accountNumber: "", accountName: "" };
    function formatPrice(price) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    }
    function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    myTransactions = jastiperTransactions.filter((trx) => trx.jastiperId === currentJastiperId);
    pendingBalance = myTransactions.filter((t) => t.type === "income" && t.status === "pending").reduce((sum, t) => sum + t.amount, 0);
    activeBalance = myTransactions.filter((t) => t.type === "income" && t.status === "released").reduce((sum, t) => sum + t.amount, 0);
    totalWithdrawn = Math.abs(myTransactions.filter((t) => t.type === "withdrawal").reduce((sum, t) => sum + t.amount, 0));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Navbar($$renderer3, {});
      $$renderer3.push(`<!----> <div class="container svelte-9tmhmf"><div class="header svelte-9tmhmf"><div><h1 class="svelte-9tmhmf">Wallet &amp; Saldo</h1> <p class="svelte-9tmhmf">Kelola pemasukan dan penarikan dana Anda</p></div></div> <div class="balance-grid svelte-9tmhmf"><div class="balance-card primary svelte-9tmhmf"><div class="balance-icon svelte-9tmhmf">💰</div> <div class="balance-content svelte-9tmhmf"><span class="balance-label svelte-9tmhmf">Saldo Aktif</span> <span class="balance-amount svelte-9tmhmf">${escape_html(formatPrice(activeBalance))}</span> <span class="balance-sublabel svelte-9tmhmf">Siap dicairkan</span></div> <button class="btn-withdraw svelte-9tmhmf">Tarik Dana</button></div> <div class="balance-card warning svelte-9tmhmf"><div class="balance-icon svelte-9tmhmf">⏳</div> <div class="balance-content svelte-9tmhmf"><span class="balance-label svelte-9tmhmf">Saldo Tertahan (Rekber)</span> <span class="balance-amount svelte-9tmhmf">${escape_html(formatPrice(pendingBalance))}</span> <span class="balance-sublabel svelte-9tmhmf">Menunggu konfirmasi pembeli</span></div></div> <div class="balance-card info svelte-9tmhmf"><div class="balance-icon svelte-9tmhmf">📊</div> <div class="balance-content svelte-9tmhmf"><span class="balance-label svelte-9tmhmf">Total Ditarik</span> <span class="balance-amount svelte-9tmhmf">${escape_html(formatPrice(totalWithdrawn))}</span> <span class="balance-sublabel svelte-9tmhmf">Riwayat penarikan</span></div></div></div> <div class="transactions-section svelte-9tmhmf"><h2 class="svelte-9tmhmf">Riwayat Transaksi</h2> `);
      if (myTransactions.length === 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="empty-state svelte-9tmhmf"><span class="empty-icon svelte-9tmhmf">💳</span> <p class="svelte-9tmhmf">Belum ada transaksi</p></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="transactions-table svelte-9tmhmf"><table class="svelte-9tmhmf"><thead><tr><th class="svelte-9tmhmf">Tanggal</th><th class="svelte-9tmhmf">Deskripsi</th><th class="svelte-9tmhmf">Tipe</th><th class="svelte-9tmhmf">Status</th><th class="svelte-9tmhmf">Jumlah</th><th class="svelte-9tmhmf">Keterangan</th></tr></thead><tbody><!--[-->`);
        const each_array = ensure_array_like(myTransactions);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let trx = each_array[$$index];
          $$renderer3.push(`<tr class="svelte-9tmhmf"><td class="svelte-9tmhmf">${escape_html(formatDate(trx.createdAt))}</td><td class="svelte-9tmhmf"><div class="description svelte-9tmhmf"><span class="desc-text svelte-9tmhmf">${escape_html(trx.description)}</span> `);
          if (trx.orderCode) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="order-code svelte-9tmhmf">${escape_html(trx.orderCode)}</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div></td><td class="svelte-9tmhmf"><span${attr_class("type-badge svelte-9tmhmf", void 0, {
            "income": trx.type === "income",
            "withdrawal": trx.type === "withdrawal"
          })}>${escape_html(trx.type === "income" ? "Pemasukan" : "Penarikan")}</span></td><td class="svelte-9tmhmf"><span class="status-badge svelte-9tmhmf"${attr_style(`background: ${stringify(trx.status === "completed" ? "#dcfce7" : trx.status === "released" ? "#dbeafe" : "#fef3c7")}; color: ${stringify(trx.status === "completed" ? "#15803d" : trx.status === "released" ? "#1e40af" : "#92400e")}`)}>${escape_html(trx.status === "completed" ? "Selesai" : trx.status === "released" ? "Tersedia" : "Tertahan")}</span></td><td class="svelte-9tmhmf"><span${attr_class("amount svelte-9tmhmf", void 0, { "positive": trx.amount > 0, "negative": trx.amount < 0 })}>${escape_html(trx.amount > 0 ? "+" : "")}${escape_html(formatPrice(trx.amount))}</span></td><td class="svelte-9tmhmf"><div class="details svelte-9tmhmf">`);
          if (trx.status === "pending" && trx.releaseDate) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="detail-text svelte-9tmhmf">Rilis: ${escape_html(formatDate(trx.releaseDate))}</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (trx.status === "released" && trx.releasedAt) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="detail-text svelte-9tmhmf">Dirilis: ${escape_html(formatDate(trx.releasedAt))}</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (trx.type === "withdrawal" && trx.bankName) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="detail-text svelte-9tmhmf">${escape_html(trx.bankName)} - ${escape_html(trx.accountNumber)}</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div></td></tr>`);
        }
        $$renderer3.push(`<!--]--></tbody></table></div>`);
      }
      $$renderer3.push(`<!--]--></div></div> `);
      Modal($$renderer3, {
        title: "Tarik Dana",
        showCancel: true,
        cancelText: "Batal",
        confirmText: "Kirim Permintaan",
        autoCloseOnConfirm: false,
        maxWidth: "700px",
        get isOpen() {
          return showWithdrawModal;
        },
        set isOpen($$value) {
          showWithdrawModal = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="withdraw-modal svelte-9tmhmf"><div class="balance-info svelte-9tmhmf"><span>Saldo Tersedia:</span> <span class="balance svelte-9tmhmf">${escape_html(formatPrice(activeBalance))}</span></div> <div class="form-group svelte-9tmhmf"><label class="svelte-9tmhmf">Jumlah Penarikan *</label> <div class="input-with-button svelte-9tmhmf"><input type="number"${attr("value", withdrawForm.amount)} placeholder="0" min="0"${attr("max", activeBalance)} class="svelte-9tmhmf"/> <button class="btn-max svelte-9tmhmf" type="button">Tarik Semua</button></div></div> <div class="form-group svelte-9tmhmf"><label class="svelte-9tmhmf">Nama Bank *</label> `);
          $$renderer4.select(
            { value: withdrawForm.bankName, class: "" },
            ($$renderer5) => {
              $$renderer5.option({ value: "" }, ($$renderer6) => {
                $$renderer6.push(`Pilih Bank`);
              });
              $$renderer5.option({ value: "BCA" }, ($$renderer6) => {
                $$renderer6.push(`BCA`);
              });
              $$renderer5.option({ value: "Mandiri" }, ($$renderer6) => {
                $$renderer6.push(`Mandiri`);
              });
              $$renderer5.option({ value: "BNI" }, ($$renderer6) => {
                $$renderer6.push(`BNI`);
              });
              $$renderer5.option({ value: "BRI" }, ($$renderer6) => {
                $$renderer6.push(`BRI`);
              });
              $$renderer5.option({ value: "CIMB Niaga" }, ($$renderer6) => {
                $$renderer6.push(`CIMB Niaga`);
              });
            },
            "svelte-9tmhmf"
          );
          $$renderer4.push(`</div> <div class="form-group svelte-9tmhmf"><label class="svelte-9tmhmf">Nomor Rekening *</label> <input type="text"${attr("value", withdrawForm.accountNumber)} placeholder="1234567890" class="svelte-9tmhmf"/></div> <div class="form-group svelte-9tmhmf"><label class="svelte-9tmhmf">Nama Pemilik Rekening *</label> <input type="text"${attr("value", withdrawForm.accountName)} placeholder="Nama sesuai rekening" class="svelte-9tmhmf"/></div> <div class="info-box svelte-9tmhmf"><p class="svelte-9tmhmf"><strong>Catatan:</strong> Dana akan ditransfer dalam 1-3 hari kerja. Pastikan
        data rekening sudah benar.</p></div></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!---->`);
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
