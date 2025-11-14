import { Y as attr, X as ensure_array_like, Z as attr_class, a1 as bind_props } from "../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/state.svelte.js";
import { S as StatusBadge } from "../../../../../chunks/StatusBadge.js";
import { s as statusMeta } from "../../../../../chunks/mockData.js";
import { e as escape_html } from "../../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    const actions = [
      {
        label: "Setujui",
        status: "Disetujui_Admin",
        variant: "approve"
      },
      {
        label: "Minta Negosiasi",
        status: "Perlu_Negosiasi",
        variant: "negotiate"
      },
      { label: "Tolak", status: "Dibatalkan", variant: "reject" }
    ];
    let selectedAction = "Disetujui_Admin";
    let requestDecision = data.order?.status === "Menunggu_Review_Admin" ? "pending" : "accepted";
    let declineReason = "";
    if (!data.order) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<section class="empty svelte-1wpvxj9"><h1>Pesanan tidak ditemukan</h1> <a href="/admin">Kembali ke Dashboard</a></section>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<section class="review svelte-1wpvxj9"><a class="back-link svelte-1wpvxj9" href="/admin">← Kembali</a> <header class="svelte-1wpvxj9"><div><h1 class="svelte-1wpvxj9">${escape_html(data.order.code)}</h1> <p class="svelte-1wpvxj9">${escape_html(data.order.store)} · ${escape_html(data.order.country)}</p></div> `);
      StatusBadge($$renderer2, { statusMeta, status: data.order.status });
      $$renderer2.push(`<!----></header> <div class="layout svelte-1wpvxj9"><article class="card detail svelte-1wpvxj9"><h2>Detail Permintaan</h2> <dl class="svelte-1wpvxj9"><dt class="svelte-1wpvxj9">Produk</dt> <dd class="svelte-1wpvxj9">${escape_html(data.order.product)}</dd> <dt class="svelte-1wpvxj9">Variasi</dt> <dd class="svelte-1wpvxj9">${escape_html(data.order.variations)}</dd> <dt class="svelte-1wpvxj9">Estimasi Total</dt> <dd class="svelte-1wpvxj9">Rp ${escape_html(data.order.estimate.toLocaleString("id-ID"))}</dd></dl> `);
      if (requestDecision === "accepted") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<h3>Form Final Produk</h3> <table class="svelte-1wpvxj9"><thead><tr><th class="svelte-1wpvxj9">Nama Produk</th><th class="svelte-1wpvxj9">Variasi</th><th class="svelte-1wpvxj9">Qty</th><th class="svelte-1wpvxj9">Harga Lokal</th><th class="svelte-1wpvxj9">Harga IDR</th><th class="svelte-1wpvxj9">Lampiran</th></tr></thead><tbody><tr><td class="svelte-1wpvxj9"><input${attr("value", data.order.product)} class="svelte-1wpvxj9"/></td><td class="svelte-1wpvxj9"><input${attr("value", data.order.variations)} class="svelte-1wpvxj9"/></td><td class="svelte-1wpvxj9"><input type="number" min="1" value="1" class="svelte-1wpvxj9"/></td><td class="svelte-1wpvxj9"><input value="¥ 18.000" class="svelte-1wpvxj9"/></td><td class="svelte-1wpvxj9"><input value="Rp 2.160.000" class="svelte-1wpvxj9"/></td><td class="svelte-1wpvxj9"><button class="ghost svelte-1wpvxj9" type="button">Upload Nota</button></td></tr></tbody></table> <div class="summary svelte-1wpvxj9"><div class="svelte-1wpvxj9"><span>Subtotal Belanja</span> <strong>Rp 2.160.000</strong></div> <div class="svelte-1wpvxj9"><span>Pajak (opsional)</span> <input placeholder="Rp 0" class="svelte-1wpvxj9"/></div> <div class="svelte-1wpvxj9"><span>Fee Jastip (persentase)</span> <input value="8%" class="svelte-1wpvxj9"/></div> <div class="svelte-1wpvxj9"><span>Total Akhir</span> <strong>Rp 2.332.800</strong></div></div> <button class="primary svelte-1wpvxj9" type="button">Kirim ke Pembeli</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (requestDecision === "rejected") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="empty-state svelte-1wpvxj9"><p>Pesanan ditolak. Sampaikan alasan penolakan kepada pengguna.</p> <textarea rows="3" placeholder="Contoh: Produk tidak tersedia atau melebihi batas bagasi." class="svelte-1wpvxj9">`);
          const $$body = escape_html(declineReason);
          if ($$body) {
            $$renderer2.push(`${$$body}`);
          }
          $$renderer2.push(`</textarea> <button class="ghost svelte-1wpvxj9" type="button">Kirim Alasan Penolakan</button></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></article> <aside class="panel svelte-1wpvxj9"><div class="card decision svelte-1wpvxj9"><h2>Ambil Pesanan?</h2> <p class="decision-hint svelte-1wpvxj9">Terima atau tolak pesanan sebelum proses negosiasi dimulai (mirip konfirmasi driver).</p> `);
      if (requestDecision === "pending") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="decision-actions svelte-1wpvxj9"><button class="primary svelte-1wpvxj9" type="button">Terima Permintaan</button> <button class="ghost danger svelte-1wpvxj9" type="button">Tolak Permintaan</button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (requestDecision === "accepted") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="accepted svelte-1wpvxj9">✅ Pesanan diterima. Lanjutkan negosiasi atau finalisasi produk.</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="declined svelte-1wpvxj9">❌ Pesanan ditolak. Kirim alasan resmi ke pengguna.</div>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (requestDecision === "accepted") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="card chat svelte-1wpvxj9"><h2>Catatan Negosiasi</h2> <div class="thread svelte-1wpvxj9"><!--[-->`);
        const each_array = ensure_array_like(data.negotiationNotes);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let note = each_array[$$index];
          $$renderer2.push(`<div class="note svelte-1wpvxj9"><header class="svelte-1wpvxj9"><strong>${escape_html(note.author)}</strong> <span>${escape_html(note.time)}</span></header> <p class="svelte-1wpvxj9">${escape_html(note.message)}</p></div>`);
        }
        $$renderer2.push(`<!--]--></div> <textarea rows="3" placeholder="Tambahkan catatan untuk pembeli" class="svelte-1wpvxj9"></textarea> <button class="ghost svelte-1wpvxj9" type="button">Kirim Catatan</button></div> <div class="card actions svelte-1wpvxj9"><h2>Tindakan Lanjutan</h2> <div class="action-list svelte-1wpvxj9"><!--[-->`);
        const each_array_1 = ensure_array_like(actions);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let action = each_array_1[$$index_1];
          $$renderer2.push(`<label${attr_class(`radio ${action.variant}`, "svelte-1wpvxj9")}><input type="radio" name="action"${attr("value", action.status)}${attr("checked", selectedAction === action.status, true)} class="svelte-1wpvxj9"/> <span>${escape_html(action.label)}</span></label>`);
        }
        $$renderer2.push(`<!--]--></div> `);
        {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <button class="primary svelte-1wpvxj9" type="button">Simpan Keputusan</button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></aside></div></section>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
