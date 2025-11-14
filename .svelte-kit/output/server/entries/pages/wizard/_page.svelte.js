import { X as ensure_array_like, Z as attr_class, a1 as bind_props, a0 as stringify, Y as attr } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { N as Navbar } from "../../../chunks/Navbar.js";
import { w as fallback, e as escape_html } from "../../../chunks/context.js";
import { p as popularCountries } from "../../../chunks/mockData.js";
function Stepper($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let steps = fallback($$props["steps"], () => [], true);
    let activeIndex = fallback($$props["activeIndex"], 0);
    $$renderer2.push(`<div class="stepper svelte-b1fesp"><!--[-->`);
    const each_array = ensure_array_like(steps);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let step = each_array[index];
      $$renderer2.push(`<div class="step svelte-b1fesp"><div${attr_class(`bullet ${stringify(index === activeIndex ? "active" : "")} ${stringify(index < activeIndex ? "done" : "")}`, "svelte-b1fesp")}>${escape_html(index < activeIndex ? "✓" : index + 1)}</div> <div class="label svelte-b1fesp"><h3 class="svelte-b1fesp">${escape_html(step.title)}</h3> `);
      if (step.caption) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="svelte-b1fesp">${escape_html(step.caption)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      if (index < steps.length - 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div${attr_class(`divider ${stringify(index < activeIndex ? "done" : "")}`, "svelte-b1fesp")}></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { steps, activeIndex });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const steps = [
      { title: "Negara", caption: "Pilih destinasi belanja" },
      { title: "Toko", caption: "Tentukan toko tujuan" },
      { title: "Produk", caption: "Detail produk kamu" },
      { title: "Harga", caption: "Estimasi biaya" },
      { title: "Review", caption: "Cek ulang & kirim" }
    ];
    let currentStep = 0;
    let form = {
      country: ""
    };
    let errors = {};
    const countryOptions = popularCountries.map((country) => ({
      value: country.code,
      label: `${country.flag} ${country.name}`
    }));
    Navbar($$renderer2, {});
    $$renderer2.push(`<!----> <section class="wizard svelte-281z2k"><header class="svelte-281z2k"><h1 class="svelte-281z2k">Buat Permintaan Titip</h1> <p class="svelte-281z2k">Isi semua langkah berikut untuk mengirimkan permintaan ke Admin Jastipku.</p></header> `);
    Stepper($$renderer2, { steps, activeIndex: currentStep });
    $$renderer2.push(`<!----> <div class="step-content svelte-281z2k">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card svelte-281z2k"><label for="country" class="svelte-281z2k">Pilih Negara</label> <input id="country" list="country-options" placeholder="Cari negara tujuan"${attr("value", form.country)} class="svelte-281z2k"/> <datalist id="country-options"><!--[-->`);
      const each_array = ensure_array_like(countryOptions);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let option = each_array[$$index];
        $$renderer2.option({ value: option.value }, ($$renderer3) => {
          $$renderer3.push(`${escape_html(option.label)}`);
        });
      }
      $$renderer2.push(`<!--]--></datalist> `);
      if (errors.country) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="error svelte-281z2k">${escape_html(errors.country)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <p class="hint svelte-281z2k">Tip: ketik kode negara (JP, US, KR) untuk mempercepat pencarian.</p></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="navigation svelte-281z2k">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (currentStep < steps.length - 1) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="primary svelte-281z2k">Next</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></section>`);
  });
}
export {
  _page as default
};
