import { Y as attr, X as ensure_array_like, Z as attr_class } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { S as StatusBadge } from "../../../../chunks/StatusBadge.js";
import { o as orders, s as statusMeta } from "../../../../chunks/mockData.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filtered;
    const negotiationOrders = orders.filter((order) => order.status === "Perlu_Negosiasi").map((order) => ({
      ...order,
      notes: [
        "Harga perlu disesuaikan dengan pajak lokal.",
        "Konfirmasi stok warna/ukuran terakhir."
      ],
      chats: [
        {
          sender: "Admin",
          message: "Kami melihat harga toko naik 10%. Apakah tetap lanjut?",
          time: "09.15"
        },
        {
          sender: "User",
          message: "Boleh, asalkan total tidak lebih dari Rp 3 juta.",
          time: "09.22"
        }
      ]
    }));
    let search = "";
    let messages = {};
    let drafts = {};
    let openChatCode = null;
    filtered = negotiationOrders.filter((order) => {
      const term = search.trim().toLowerCase();
      if (!term) return true;
      return order.code.toLowerCase().includes(term) || order.store.toLowerCase().includes(term) || order.product.toLowerCase().includes(term);
    });
    {
      let nextMessages = messages;
      let nextDrafts = drafts;
      filtered.forEach((order) => {
        if (!nextMessages[order.code]) {
          nextMessages = { ...nextMessages, [order.code]: order.chats };
        }
        if (nextDrafts[order.code] === void 0) {
          nextDrafts = { ...nextDrafts, [order.code]: "" };
        }
      });
      if (nextMessages !== messages) {
        messages = nextMessages;
      }
      if (nextDrafts !== drafts) {
        drafts = nextDrafts;
      }
    }
    $$renderer2.push(`<section class="negotiations svelte-1b0lhtv"><a class="back-link svelte-1b0lhtv" href="/admin">← Kembali</a> <header class="svelte-1b0lhtv"><div><h1 class="svelte-1b0lhtv">Daftar Negosiasi</h1> <p class="svelte-1b0lhtv">Kelola permintaan yang membutuhkan penawaran ulang harga atau detail produk.</p></div> <a href="/admin" class="back svelte-1b0lhtv">← Kembali ke Dashboard</a></header> <div class="toolbar svelte-1b0lhtv"><label class="svelte-1b0lhtv">Cari <input placeholder="Cari kode, toko, atau produk"${attr("value", search)} class="svelte-1b0lhtv"/></label></div> `);
    if (filtered.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="empty svelte-1b0lhtv">Belum ada permintaan yang perlu negosiasi. Pesanan baru akan muncul di halaman Pending.</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="list svelte-1b0lhtv"><!--[-->`);
      const each_array = ensure_array_like(filtered);
      for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
        let order = each_array[$$index_2];
        $$renderer2.push(`<article class="card svelte-1b0lhtv"><header class="svelte-1b0lhtv"><div><h2 class="svelte-1b0lhtv">${escape_html(order.code)}</h2> <p class="svelte-1b0lhtv">${escape_html(order.store)} · ${escape_html(order.country)}</p></div> `);
        StatusBadge($$renderer2, { statusMeta, status: order.status });
        $$renderer2.push(`<!----></header> <div class="info svelte-1b0lhtv"><div><span class="svelte-1b0lhtv">Produk</span> <strong>${escape_html(order.product)}</strong></div> <div><span class="svelte-1b0lhtv">Variasi</span> <strong>${escape_html(order.variations)}</strong></div> <div><span class="svelte-1b0lhtv">Estimasi Total</span> <strong>Rp ${escape_html(order.estimate.toLocaleString("id-ID"))}</strong></div></div> <ul class="notes svelte-1b0lhtv"><!--[-->`);
        const each_array_1 = ensure_array_like(order.notes);
        for (let index = 0, $$length2 = each_array_1.length; index < $$length2; index++) {
          let note = each_array_1[index];
          $$renderer2.push(`<li>• ${escape_html(note)}</li>`);
        }
        $$renderer2.push(`<!--]--></ul> <div class="actions svelte-1b0lhtv"><a class="primary svelte-1b0lhtv"${attr("href", `/admin/review/${order.code}?mode=negosiasi`)}>Review &amp; Kirim Counter</a> <button class="ghost svelte-1b0lhtv" type="button">${escape_html(openChatCode === order.code ? "Tutup Chat" : "Lihat Chat")}</button></div> `);
        if (openChatCode === order.code) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="chat svelte-1b0lhtv"><header class="svelte-1b0lhtv">Chat dengan Pengguna</header> <div class="thread svelte-1b0lhtv"><!--[-->`);
          const each_array_2 = ensure_array_like(messages[order.code] ?? []);
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let chat = each_array_2[$$index_1];
            $$renderer2.push(`<div${attr_class(`bubble ${chat.sender === "Admin" ? "admin" : "user"}`, "svelte-1b0lhtv")}><div class="meta svelte-1b0lhtv"><span class="svelte-1b0lhtv">${escape_html(chat.sender)}</span> <span class="svelte-1b0lhtv">${escape_html(chat.time)}</span></div> <p class="svelte-1b0lhtv">${escape_html(chat.message)}</p></div>`);
          }
          $$renderer2.push(`<!--]--></div> <div class="composer svelte-1b0lhtv"><input placeholder="Ketik pesan untuk pengguna"${attr("value", drafts[order.code])} class="svelte-1b0lhtv"/> <button type="button" class="svelte-1b0lhtv">Kirim</button></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></article>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></section>`);
  });
}
export {
  _page as default
};
