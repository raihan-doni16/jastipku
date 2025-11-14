import { X as ensure_array_like, Y as attr } from "../../../../chunks/index2.js";
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
    const activeOrders = orders.filter((order) => order.status !== "Menunggu_Review_Admin" && order.status !== "Perlu_Negosiasi").map((order) => ({
      ...order,
      chats: [
        {
          sender: "Admin",
          message: "Barang sudah tiba di bandara. Estimasi tiba besok.",
          time: "11.00"
        },
        {
          sender: "User",
          message: "Noted kak, ditunggu update resinya.",
          time: "11.12"
        }
      ]
    }));
    let statusFilter = "all";
    let countryFilter = "all";
    let chatMessages = {};
    const countries = [...new Set(activeOrders.map((order) => order.country))];
    filtered = activeOrders.filter((order) => {
      const matchCountry = countryFilter === "all";
      return matchCountry;
    });
    {
      let updated = chatMessages;
      filtered.forEach((order) => {
        if (!updated[order.code]) {
          updated = { ...updated, [order.code]: order.chats };
        }
      });
      if (updated !== chatMessages) {
        chatMessages = updated;
      }
    }
    $$renderer2.push(`<section class="active svelte-1xwnv87"><a class="back-link svelte-1xwnv87" href="/admin">← Kembali</a> <header class="svelte-1xwnv87"><div><h1 class="svelte-1xwnv87">Pesanan Dalam Proses</h1> <p class="svelte-1xwnv87">Pantau pesanan yang sedang berjalan dari approval hingga pengiriman akhir.</p></div> <a href="/admin" class="back svelte-1xwnv87">← Kembali ke Dashboard</a></header> <div class="toolbar svelte-1xwnv87"><label class="svelte-1xwnv87">Filter Status `);
    $$renderer2.select(
      { value: statusFilter, class: "" },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`Semua`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(Object.keys(statusMeta));
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let key = each_array[$$index];
          if (key !== "Menunggu_Review_Admin" && key !== "Perlu_Negosiasi") {
            $$renderer3.push("<!--[-->");
            $$renderer3.option({ value: key }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(statusMeta[key].label)}`);
            });
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-1xwnv87"
    );
    $$renderer2.push(`</label> <label class="svelte-1xwnv87">Negara `);
    $$renderer2.select(
      { value: countryFilter, class: "" },
      ($$renderer3) => {
        $$renderer3.option({ value: "all" }, ($$renderer4) => {
          $$renderer4.push(`Semua`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(countries);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let country = each_array_1[$$index_1];
          $$renderer3.option({ value: country }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(country)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-1xwnv87"
    );
    $$renderer2.push(`</label></div> `);
    if (filtered.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="empty svelte-1xwnv87">Tidak ada pesanan yang cocok dengan filter. Coba reset filter untuk melihat data lainnya.</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="table-wrapper svelte-1xwnv87"><table class="svelte-1xwnv87"><thead><tr><th class="svelte-1xwnv87">Kode</th><th class="svelte-1xwnv87">Negara</th><th class="svelte-1xwnv87">Toko</th><th class="svelte-1xwnv87">Produk</th><th class="svelte-1xwnv87">Status</th><th class="svelte-1xwnv87">Estimasi Total</th><th class="svelte-1xwnv87">Aksi</th></tr></thead><tbody><!--[-->`);
      const each_array_2 = ensure_array_like(filtered);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let order = each_array_2[$$index_2];
        $$renderer2.push(`<tr><td class="svelte-1xwnv87">${escape_html(order.code)}</td><td class="svelte-1xwnv87">${escape_html(order.country)}</td><td class="svelte-1xwnv87">${escape_html(order.store)}</td><td class="svelte-1xwnv87"><strong class="svelte-1xwnv87">${escape_html(order.product)}</strong> <span class="svelte-1xwnv87">${escape_html(order.variations)}</span></td><td class="svelte-1xwnv87">`);
        StatusBadge($$renderer2, { statusMeta, status: order.status });
        $$renderer2.push(`<!----></td><td class="svelte-1xwnv87">Rp ${escape_html(order.estimate.toLocaleString("id-ID"))}</td><td class="action-cell svelte-1xwnv87"><a class="link admin svelte-1xwnv87"${attr("href", `/admin/review/${order.code}`)}>Detail Admin</a> <span class="svelte-1xwnv87">·</span> <button class="link chat svelte-1xwnv87" type="button">Chat</button></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></section>`);
  });
}
export {
  _page as default
};
