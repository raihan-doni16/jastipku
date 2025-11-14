import { W as store_get, U as head, Z as attr_class, Y as attr, X as ensure_array_like, _ as unsubscribe_stores } from "../../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../../chunks/exports.js";
import "../../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../../chunks/state.svelte.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { N as Navbar } from "../../../../../../chunks/Navbar.js";
import { a as authStore } from "../../../../../../chunks/auth.js";
import { l as listings, p as popularCountries } from "../../../../../../chunks/mockData.js";
import { e as escape_html } from "../../../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let listingId, listing;
    authStore.subscribe((val) => {
      val.role;
    });
    let postType = "jastip";
    let isInitialized = false;
    let formData = createEmptyForm();
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
    const conditionOptions = ["Seperti Baru", "Sangat Baik", "Baik", "Cukup Baik"];
    function createEmptyForm() {
      return {
        title: "",
        description: "",
        country: "",
        countryCode: "",
        stores: [""],
        categories: [""],
        departureDate: "",
        returnDate: "",
        estimateDelivery: "",
        fee: 15,
        minOrder: 0,
        quota: 1,
        price: 0,
        originalPrice: 0,
        condition: "Sangat Baik",
        stock: 1,
        eventType: "sale"
      };
    }
    function buildFormDataFromListing(listingData) {
      const base = createEmptyForm();
      return {
        ...base,
        title: listingData.title ?? base.title,
        description: listingData.description ?? base.description,
        country: listingData.country ?? base.country,
        countryCode: listingData.countryCode ?? base.countryCode,
        stores: listingData.stores?.length ? [...listingData.stores] : base.stores,
        categories: listingData.categories?.length ? [...listingData.categories] : base.categories,
        departureDate: listingData.departureDate ?? base.departureDate,
        returnDate: listingData.returnDate ?? base.returnDate,
        estimateDelivery: listingData.estimateDelivery ?? base.estimateDelivery,
        fee: listingData.fee ?? base.fee,
        minOrder: listingData.minOrder ?? base.minOrder,
        quota: listingData.quota ?? base.quota,
        price: listingData.price ?? base.price,
        originalPrice: listingData.originalPrice ?? base.originalPrice,
        condition: listingData.condition ?? base.condition,
        stock: listingData.stock ?? base.stock,
        eventType: listingData.eventType ?? base.eventType
      };
    }
    listingId = store_get($$store_subs ??= {}, "$page", page).params.id;
    listing = listings.find((item) => item.id === listingId);
    if (listing && !isInitialized) {
      postType = listing.type ?? "jastip";
      formData = buildFormDataFromListing(listing);
      isInitialized = true;
    }
    head("1ms8k8c", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Edit Postingan ${escape_html(listingId)} | Jastipku</title>`);
      });
    });
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> `);
    if (listing) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="container svelte-1ms8k8c"><div class="header svelte-1ms8k8c"><div><p class="breadcrumb svelte-1ms8k8c">Dashboard / Postingan / ${escape_html(listing.title)}</p> <h1 class="svelte-1ms8k8c">Edit Postingan</h1> <p class="svelte-1ms8k8c">Perbarui detail postingan sebelum disimpan</p></div> <div class="header-meta svelte-1ms8k8c"><span class="badge svelte-1ms8k8c">ID ${escape_html(listing.id)}</span> <button class="link-button svelte-1ms8k8c">�+? Kembali</button></div></div> <div class="form-container svelte-1ms8k8c"><div class="type-selector svelte-1ms8k8c"><button${attr_class("type-btn svelte-1ms8k8c", void 0, { "active": postType === "jastip" })}><span class="type-icon svelte-1ms8k8c">✈️</span> <span class="type-label svelte-1ms8k8c">Jastip</span></button> <button${attr_class("type-btn svelte-1ms8k8c", void 0, { "active": postType === "preloved" })}><span class="type-icon svelte-1ms8k8c">👜</span> <span class="type-label svelte-1ms8k8c">Preloved</span></button> <button${attr_class("type-btn svelte-1ms8k8c", void 0, { "active": postType === "event" })}><span class="type-icon svelte-1ms8k8c">🎉</span> <span class="type-label svelte-1ms8k8c">Event</span></button></div> <div class="form-card svelte-1ms8k8c"><h2 class="svelte-1ms8k8c">Informasi Dasar</h2> <div class="form-group svelte-1ms8k8c"><label for="listing-title" class="svelte-1ms8k8c">Judul Postingan *</label> <input id="listing-title" type="text"${attr("value", formData.title)} placeholder="Contoh: Jastip Korea - Kosmetik &amp; Fashion" class="svelte-1ms8k8c"/></div> <div class="form-group svelte-1ms8k8c"><label for="listing-description" class="svelte-1ms8k8c">Deskripsi *</label> <textarea id="listing-description" placeholder="Jelaskan detail postingan Anda..." rows="5" class="svelte-1ms8k8c">`);
      const $$body = escape_html(formData.description);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea></div> <div class="form-row svelte-1ms8k8c"><div class="form-group svelte-1ms8k8c"><label for="listing-country" class="svelte-1ms8k8c">Negara *</label> `);
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
        "svelte-1ms8k8c"
      );
      $$renderer2.push(`</div> <div class="form-group svelte-1ms8k8c"><label for="category-0" class="svelte-1ms8k8c">Kategori *</label> <div class="multi-input svelte-1ms8k8c"><!--[-->`);
      const each_array_1 = ensure_array_like(formData.categories);
      for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
        each_array_1[index];
        $$renderer2.push(`<div class="input-row svelte-1ms8k8c">`);
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
          "svelte-1ms8k8c"
        );
        $$renderer2.push(` `);
        if (formData.categories.length > 1) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<button class="btn-remove svelte-1ms8k8c">�</button>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--> <button class="btn-add svelte-1ms8k8c">+ Tambah Kategori</button></div></div></div> `);
      if (postType === "jastip" || postType === "event") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<hr class="svelte-1ms8k8c"/> <h2 class="svelte-1ms8k8c">${escape_html(postType === "event" ? "Informasi Event" : "Informasi Jastip")}</h2> <div class="form-group svelte-1ms8k8c"><label for="store-0" class="svelte-1ms8k8c">Toko yang Tersedia *</label> <div class="multi-input svelte-1ms8k8c"><!--[-->`);
        const each_array_3 = ensure_array_like(formData.stores);
        for (let index = 0, $$length = each_array_3.length; index < $$length; index++) {
          each_array_3[index];
          $$renderer2.push(`<div class="input-row svelte-1ms8k8c"><input${attr("id", `store-${index}`)} type="text"${attr("value", formData.stores[index])} placeholder="Nama toko" class="svelte-1ms8k8c"/> `);
          if (formData.stores.length > 1) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<button class="btn-remove svelte-1ms8k8c">�</button>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div>`);
        }
        $$renderer2.push(`<!--]--> <button class="btn-add svelte-1ms8k8c">+ Tambah Toko</button></div></div> <div class="form-row svelte-1ms8k8c"><div class="form-group svelte-1ms8k8c"><label for="departure-date" class="svelte-1ms8k8c">Tanggal Berangkat *</label> <input id="departure-date" type="date"${attr("value", formData.departureDate)} class="svelte-1ms8k8c"/></div> <div class="form-group svelte-1ms8k8c"><label for="return-date" class="svelte-1ms8k8c">Tanggal Kembali *</label> <input id="return-date" type="date"${attr("value", formData.returnDate)} class="svelte-1ms8k8c"/></div> <div class="form-group svelte-1ms8k8c"><label for="estimate-delivery" class="svelte-1ms8k8c">Estimasi Pengiriman *</label> <input id="estimate-delivery" type="date"${attr("value", formData.estimateDelivery)} class="svelte-1ms8k8c"/></div></div> <div class="form-row svelte-1ms8k8c"><div class="form-group svelte-1ms8k8c"><label for="fee-percent" class="svelte-1ms8k8c">Fee (%) *</label> <input id="fee-percent" type="number"${attr("value", formData.fee)} placeholder="15" min="0" max="100" class="svelte-1ms8k8c"/> <span class="hint svelte-1ms8k8c">Fee yang dikenakan dari harga barang</span></div> <div class="form-group svelte-1ms8k8c"><label for="min-order" class="svelte-1ms8k8c">Minimal Order (IDR) *</label> <input id="min-order" type="number"${attr("value", formData.minOrder)} placeholder="100000" min="0" class="svelte-1ms8k8c"/></div> <div class="form-group svelte-1ms8k8c"><label for="quota-slot" class="svelte-1ms8k8c">Quota/Slot *</label> <input id="quota-slot" type="number"${attr("value", formData.quota)} placeholder="10" min="1" class="svelte-1ms8k8c"/></div></div> `);
        if (postType === "event") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="form-group svelte-1ms8k8c"><label for="event-type" class="svelte-1ms8k8c">Tipe Event</label> `);
          $$renderer2.select(
            { id: "event-type", value: formData.eventType, class: "" },
            ($$renderer3) => {
              $$renderer3.option({ value: "sale" }, ($$renderer4) => {
                $$renderer4.push(`Sale Event`);
              });
              $$renderer3.option({ value: "preorder" }, ($$renderer4) => {
                $$renderer4.push(`Pre-Order`);
              });
              $$renderer3.option({ value: "limited" }, ($$renderer4) => {
                $$renderer4.push(`Limited Edition`);
              });
              $$renderer3.option({ value: "seasonal" }, ($$renderer4) => {
                $$renderer4.push(`Seasonal`);
              });
            },
            "svelte-1ms8k8c"
          );
          $$renderer2.push(`</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (postType === "preloved") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<hr class="svelte-1ms8k8c"/> <h2 class="svelte-1ms8k8c">Informasi Preloved</h2> <div class="form-row svelte-1ms8k8c"><div class="form-group svelte-1ms8k8c"><label for="selling-price" class="svelte-1ms8k8c">Harga Jual (IDR) *</label> <input id="selling-price" type="number"${attr("value", formData.price)} placeholder="2500000" min="0" class="svelte-1ms8k8c"/></div> <div class="form-group svelte-1ms8k8c"><label for="original-price" class="svelte-1ms8k8c">Harga Asli (IDR)</label> <input id="original-price" type="number"${attr("value", formData.originalPrice)} placeholder="4500000" min="0" class="svelte-1ms8k8c"/> <span class="hint svelte-1ms8k8c">Opsional, untuk menampilkan diskon</span></div></div> <div class="form-row svelte-1ms8k8c"><div class="form-group svelte-1ms8k8c"><label for="condition" class="svelte-1ms8k8c">Kondisi Barang *</label> `);
        $$renderer2.select(
          { id: "condition", value: formData.condition, class: "" },
          ($$renderer3) => {
            $$renderer3.push(`<!--[-->`);
            const each_array_4 = ensure_array_like(conditionOptions);
            for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
              let cond = each_array_4[$$index_4];
              $$renderer3.option({ value: cond }, ($$renderer4) => {
                $$renderer4.push(`${escape_html(cond)}`);
              });
            }
            $$renderer3.push(`<!--]-->`);
          },
          "svelte-1ms8k8c"
        );
        $$renderer2.push(`</div> <div class="form-group svelte-1ms8k8c"><label for="stock" class="svelte-1ms8k8c">Stok *</label> <input id="stock" type="number"${attr("value", formData.stock)} placeholder="1" min="1" class="svelte-1ms8k8c"/></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="form-actions svelte-1ms8k8c"><button class="btn-cancel svelte-1ms8k8c">Batalkan</button> <button class="btn-secondary svelte-1ms8k8c">Reset Perubahan</button> <button class="btn-submit svelte-1ms8k8c">Simpan Perubahan</button></div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="empty-state svelte-1ms8k8c"><h2 class="svelte-1ms8k8c">Postingan tidak ditemukan</h2> <p class="svelte-1ms8k8c">Periksa kembali tautan atau kembali ke daftar postingan.</p> <button class="btn-submit svelte-1ms8k8c">�+? Kembali ke daftar</button></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
