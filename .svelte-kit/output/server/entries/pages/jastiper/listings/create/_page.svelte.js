import { Z as attr_class, Y as attr, X as ensure_array_like } from "../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../../chunks/auth.js";
import { N as Navbar } from "../../../../../chunks/Navbar.js";
import { p as popularCountries } from "../../../../../chunks/mockData.js";
import { e as escape_html } from "../../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    authStore.subscribe((val) => {
      val.role;
    });
    let postType = "jastip";
    let formData = {
      title: "",
      description: "",
      countryCode: "",
      stores: [""],
      categories: [""],
      // Jastip & Event
      departureDate: "",
      returnDate: "",
      estimateDelivery: "",
      fee: 15,
      minOrder: 1e5,
      quota: 10
    };
    const categoryOptions = [
      "Kosmetik",
      "Fashion",
      "Elektronik",
      "Gadget",
      "Gaming",
      "Skincare",
      "Tas",
      "Branded",
      "Sepatu",
      "Makanan",
      "Obat-obatan",
      "Buku",
      "Mainan"
    ];
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="container svelte-wxcqhy"><div class="header svelte-wxcqhy"><div><h1 class="svelte-wxcqhy">Buat Postingan Baru</h1> <p class="svelte-wxcqhy">Buat postingan jastip, preloved, atau event untuk ditawarkan ke pembeli</p></div></div> <div class="form-container svelte-wxcqhy"><div class="type-selector svelte-wxcqhy"><button${attr_class("type-btn svelte-wxcqhy", void 0, { "active": postType === "jastip" })}><span class="type-icon svelte-wxcqhy">✈️</span> <span class="type-label svelte-wxcqhy">Jastip</span></button> <button${attr_class("type-btn svelte-wxcqhy", void 0, { "active": postType === "preloved" })}><span class="type-icon svelte-wxcqhy">👜</span> <span class="type-label svelte-wxcqhy">Preloved</span></button> <button${attr_class("type-btn svelte-wxcqhy", void 0, { "active": postType === "event" })}><span class="type-icon svelte-wxcqhy">🎉</span> <span class="type-label svelte-wxcqhy">Event</span></button></div> <div class="form-card svelte-wxcqhy"><h2 class="svelte-wxcqhy">Informasi Dasar</h2> <div class="form-group svelte-wxcqhy"><label for="listing-title" class="svelte-wxcqhy">Judul Postingan *</label> <input id="listing-title" type="text"${attr("value", formData.title)} placeholder="Contoh: Jastip Korea - Kosmetik &amp; Fashion" class="svelte-wxcqhy"/></div> <div class="form-group svelte-wxcqhy"><label for="listing-description" class="svelte-wxcqhy">Deskripsi *</label> <textarea id="listing-description" placeholder="Jelaskan detail postingan Anda..." rows="5" class="svelte-wxcqhy">`);
    const $$body = escape_html(formData.description);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <div class="form-row svelte-wxcqhy"><div class="form-group svelte-wxcqhy"><label for="listing-country" class="svelte-wxcqhy">Negara *</label> `);
    $$renderer2.select(
      {
        id: "listing-country",
        value: formData.countryCode,
        class: ""
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "", disabled: true, hidden: true }, ($$renderer4) => {
        });
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`Pilih Negara`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(popularCountries);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let country = each_array[$$index];
          $$renderer3.option({ value: country.code }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(country.flag)} ${escape_html(country.name)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-wxcqhy"
    );
    $$renderer2.push(`</div> <div class="form-group svelte-wxcqhy"><label for="category-0" class="svelte-wxcqhy">Kategori *</label> <div class="multi-input svelte-wxcqhy"><!--[-->`);
    const each_array_1 = ensure_array_like(formData.categories);
    for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
      each_array_1[index];
      $$renderer2.push(`<div class="input-row svelte-wxcqhy">`);
      $$renderer2.select(
        {
          id: `category-${index}`,
          value: formData.categories[index],
          class: ""
        },
        ($$renderer3) => {
          $$renderer3.option({ value: "", disabled: true, hidden: true }, ($$renderer4) => {
          });
          $$renderer3.option({ value: "" }, ($$renderer4) => {
            $$renderer4.push(`Pilih Kategori`);
          });
          $$renderer3.push(`<!--[-->`);
          const each_array_2 = ensure_array_like(categoryOptions);
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let cat = each_array_2[$$index_1];
            $$renderer3.option({ value: cat }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(cat)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        },
        "svelte-wxcqhy"
      );
      $$renderer2.push(` `);
      if (formData.categories.length > 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="btn-remove svelte-wxcqhy">×</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--> <button class="btn-add svelte-wxcqhy">+ Tambah Kategori</button></div></div></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<hr class="svelte-wxcqhy"/> <h2 class="svelte-wxcqhy">${escape_html("Informasi Jastip")}</h2> <div class="form-group svelte-wxcqhy"><label for="store-0" class="svelte-wxcqhy">Toko yang Tersedia *</label> <div class="multi-input svelte-wxcqhy"><!--[-->`);
      const each_array_3 = ensure_array_like(formData.stores);
      for (let index = 0, $$length = each_array_3.length; index < $$length; index++) {
        each_array_3[index];
        $$renderer2.push(`<div class="input-row svelte-wxcqhy"><input${attr("id", `store-${index}`)} type="text"${attr("value", formData.stores[index])} placeholder="Nama toko" class="svelte-wxcqhy"/> `);
        if (formData.stores.length > 1) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<button class="btn-remove svelte-wxcqhy">×</button>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--> <button class="btn-add svelte-wxcqhy">+ Tambah Toko</button></div></div> <div class="form-row svelte-wxcqhy"><div class="form-group svelte-wxcqhy"><label for="departure-date" class="svelte-wxcqhy">Tanggal Berangkat *</label> <input id="departure-date" type="date"${attr("value", formData.departureDate)} class="svelte-wxcqhy"/></div> <div class="form-group svelte-wxcqhy"><label for="return-date" class="svelte-wxcqhy">Tanggal Kembali *</label> <input id="return-date" type="date"${attr("value", formData.returnDate)} class="svelte-wxcqhy"/></div> <div class="form-group svelte-wxcqhy"><label for="estimate-delivery" class="svelte-wxcqhy">Estimasi Pengiriman *</label> <input id="estimate-delivery" type="date"${attr("value", formData.estimateDelivery)} class="svelte-wxcqhy"/></div></div> <div class="form-row svelte-wxcqhy"><div class="form-group svelte-wxcqhy"><label for="fee-percent" class="svelte-wxcqhy">Fee (%) *</label> <input id="fee-percent" type="number"${attr("value", formData.fee)} placeholder="15" min="0" max="100" class="svelte-wxcqhy"/> <span class="hint svelte-wxcqhy">Fee yang dikenakan dari harga barang</span></div> <div class="form-group svelte-wxcqhy"><label for="min-order" class="svelte-wxcqhy">Minimal Order (IDR) *</label> <input id="min-order" type="number"${attr("value", formData.minOrder)} placeholder="100000" min="0" class="svelte-wxcqhy"/></div> <div class="form-group svelte-wxcqhy"><label for="quota-slot" class="svelte-wxcqhy">Quota/Slot *</label> <input id="quota-slot" type="number"${attr("value", formData.quota)} placeholder="10" min="1" class="svelte-wxcqhy"/></div></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="form-actions svelte-wxcqhy"><button class="btn-cancel svelte-wxcqhy">Batal</button> <button class="btn-submit svelte-wxcqhy">Buat Postingan</button></div></div></div></div>`);
  });
}
export {
  _page as default
};
