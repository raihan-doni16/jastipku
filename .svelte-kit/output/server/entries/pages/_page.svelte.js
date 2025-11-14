import { X as ensure_array_like, Y as attr } from "../../chunks/index2.js";
import { N as Navbar } from "../../chunks/Navbar.js";
import { R as RatingStars } from "../../chunks/RatingStars.js";
import { t as testimonials, p as popularCountries } from "../../chunks/mockData.js";
import { e as escape_html } from "../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentCopy;
    const languageOptions = [
      { value: "id", label: "Indonesia" },
      { value: "en", label: "English" }
    ];
    let language = "id";
    const copy = {
      id: {
        heroTitle: "Titip belanja luar negeri, aman & transparan",
        heroSubtitle: "Pesan barang dari negara mana saja, biayanya jelas, prosesnya terpantau hingga sampai ke rumah.",
        cta: "Mulai Titip",
        heroTrust: "10K+ permintaan sukses",
        heroQuote: `"Cukup isi detail produk, kami bantu proses belanja luar negeri sampai tiba di rumahmu."`,
        howTitle: "Cara Kerja",
        howSubtitle: "Empat langkah mudah untuk titip belanja impianmu.",
        testimonialsTitle: "Kata Pengguna",
        testimonialsSubtitle: "Pengalaman nyata mereka yang sudah titip melalui Jastipku.",
        countriesTitle: "Negara Populer",
        countriesSubtitle: "Pilih negara favoritmu dan mulai proses titip dalam hitungan detik.",
        footerLinks: ["FAQ", "Tentang Kami", "Kebijakan Privasi", "Hubungi Kami"],
        footerNote: "Hak cipta dilindungi."
      },
      en: {
        heroTitle: "Shop abroad safely & transparently",
        heroSubtitle: "Order items from any country, with crystal clear fees and end-to-end tracking until it arrives at your door.",
        cta: "Start Request",
        heroTrust: "10K+ successful requests",
        heroQuote: `"Just share your product details and we handle everything abroad until it reaches your doorstep."`,
        howTitle: "How It Works",
        howSubtitle: "Four simple steps to get the items you want.",
        testimonialsTitle: "Customer Stories",
        testimonialsSubtitle: "Real experiences from customers who already rely on Jastipku.",
        countriesTitle: "Popular Countries",
        countriesSubtitle: "Choose a country and jump straight into the request wizard.",
        footerLinks: ["FAQ", "About Us", "Privacy Policy", "Contact Us"],
        footerNote: "All rights reserved."
      }
    };
    const howItWorks = [
      {
        icon: "🌍",
        title: { id: "Pilih Negara", en: "Choose Country" },
        description: {
          id: "Tentukan negara tempat kamu ingin membeli barang.",
          en: "Pick the country where you want to shop."
        }
      },
      {
        icon: "📝",
        title: { id: "Isi Detail Produk", en: "Provide Product Details" },
        description: {
          id: "Sertakan informasi produk beserta perkiraan harga.",
          en: "Share product info along with estimated price."
        }
      },
      {
        icon: "🤝",
        title: { id: "Admin Beli & Antar", en: "Admin Buys & Delivers" },
        description: {
          id: "Admin kami akan konfirmasi, beli, dan bawa barangmu.",
          en: "Our admins confirm, purchase, and bring the item for you."
        }
      },
      {
        icon: "📦",
        title: { id: "Barang Sampai Rumahmu", en: "Delivered To Your Door" },
        description: {
          id: "Atur pengiriman domestik dan pantau tracking lengkap.",
          en: "Arrange local delivery and track every milestone."
        }
      }
    ];
    const countryNamesByLang = {
      JP: { id: "Jepang", en: "Japan" },
      US: { id: "Amerika Serikat", en: "United States" },
      KR: { id: "Korea", en: "Korea" },
      SG: { id: "Singapura", en: "Singapore" },
      FR: { id: "Prancis", en: "France" },
      CA: { id: "Kanada", en: "Canada" }
    };
    currentCopy = copy[language];
    Navbar($$renderer2, { showLanguage: true, language, languages: languageOptions });
    $$renderer2.push(`<!----> <section class="hero svelte-1uha8ag"><div class="hero-content svelte-1uha8ag"><h1 class="svelte-1uha8ag">${escape_html(currentCopy.heroTitle)}</h1> <p class="svelte-1uha8ag">${escape_html(currentCopy.heroSubtitle)}</p> <div class="hero-actions svelte-1uha8ag"><a class="cta svelte-1uha8ag" href="/login?redirect=/browse&amp;expected=user">${escape_html(currentCopy.cta)}</a> <div class="trusted svelte-1uha8ag"><span class="avatar-stack svelte-1uha8ag"><span>🧳</span> <span>🛍️</span> <span>🎌</span></span> <span>${escape_html(currentCopy.heroTrust)}</span></div></div></div> <div class="hero-visual svelte-1uha8ag"><div class="hero-card svelte-1uha8ag"><div class="illustration svelte-1uha8ag"><span class="travel">🧳</span> <span class="shop">🛒</span> <span class="plane">✈️</span></div> <div class="quote svelte-1uha8ag">${escape_html(currentCopy.heroQuote)}</div></div></div></section> <section class="how svelte-1uha8ag"><header class="svelte-1uha8ag"><h2 class="svelte-1uha8ag">${escape_html(currentCopy.howTitle)}</h2> <p>${escape_html(currentCopy.howSubtitle)}</p></header> <div class="grid svelte-1uha8ag"><!--[-->`);
    const each_array = ensure_array_like(howItWorks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let step = each_array[$$index];
      $$renderer2.push(`<article class="card svelte-1uha8ag"><div class="icon svelte-1uha8ag">${escape_html(step.icon)}</div> <h3>${escape_html(step.title[language])}</h3> <p>${escape_html(step.description[language])}</p></article>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="testimonials svelte-1uha8ag"><header class="svelte-1uha8ag"><h2 class="svelte-1uha8ag">${escape_html(currentCopy.testimonialsTitle)}</h2> <p>${escape_html(currentCopy.testimonialsSubtitle)}</p></header> <div class="carousel svelte-1uha8ag"><!--[-->`);
    const each_array_1 = ensure_array_like(testimonials);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array_1[$$index_1];
      $$renderer2.push(`<article class="testimonial svelte-1uha8ag">`);
      RatingStars($$renderer2, { value: item.rating });
      $$renderer2.push(`<!----> <p class="comment svelte-1uha8ag">“${escape_html(item.comment)}”</p> <footer class="svelte-1uha8ag"><strong class="svelte-1uha8ag">${escape_html(item.name)}</strong> <span>${escape_html(item.city)}</span></footer></article>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="countries svelte-1uha8ag"><header class="svelte-1uha8ag"><h2 class="svelte-1uha8ag">${escape_html(currentCopy.countriesTitle)}</h2> <p>${escape_html(currentCopy.countriesSubtitle)}</p></header> <div class="country-grid svelte-1uha8ag"><!--[-->`);
    const each_array_2 = ensure_array_like(popularCountries);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let country = each_array_2[$$index_2];
      $$renderer2.push(`<a class="country-card svelte-1uha8ag"${attr("href", `/wizard?country=${country.code}`)}><span class="flag svelte-1uha8ag">${escape_html(country.flag)}</span> <span>${escape_html(countryNamesByLang[country.code]?.[language] ?? country.name)}</span></a>`);
    }
    $$renderer2.push(`<!--]--></div></section> <footer class="footer svelte-1uha8ag"><div class="links svelte-1uha8ag"><!--[-->`);
    const each_array_3 = ensure_array_like(currentCopy.footerLinks);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let link = each_array_3[$$index_3];
      $$renderer2.push(`<a href="#" class="svelte-1uha8ag">${escape_html(link)}</a>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="socials svelte-1uha8ag"><a href="#" aria-label="Instagram" class="svelte-1uha8ag">📸</a> <a href="#" aria-label="WhatsApp" class="svelte-1uha8ag">💬</a></div> <p>© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} Jastipku. ${escape_html(currentCopy.footerNote)}</p></footer>`);
  });
}
export {
  _page as default
};
