<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import RatingStars from '$lib/components/RatingStars.svelte';
  import { popularCountries, testimonials, listings } from '$lib/data/mockData';

  const languageOptions = [
    { value: 'id', label: 'Indonesia' },
    { value: 'en', label: 'English' }
  ];

  let language = 'id';

  const copy = {
    id: {
      heroTitle: 'Titip belanja luar negeri, aman & transparan',
      heroSubtitle:
        'Pesan barang dari negara mana saja, biayanya jelas, prosesnya terpantau hingga sampai ke rumah.',
      cta: 'Mulai Titip',
      heroTrust: '10K+ permintaan sukses',
      heroQuote: `"Cukup isi detail produk, kami bantu proses belanja luar negeri sampai tiba di rumahmu."`,
      howTitle: 'Cara Kerja',
      howSubtitle: 'Empat langkah mudah untuk titip belanja impianmu.',
      testimonialsTitle: 'Kata Pengguna',
      testimonialsSubtitle: 'Pengalaman nyata mereka yang sudah titip melalui Jastipku.',
      countriesTitle: 'Negara Populer',
      countriesSubtitle: 'Pilih negara favoritmu dan mulai proses titip dalam hitungan detik.',
      footerLinks: ['FAQ', 'Tentang Kami', 'Kebijakan Privasi', 'Hubungi Kami'],
      footerNote: 'Hak cipta dilindungi.'
    },
    en: {
      heroTitle: 'Shop abroad safely & transparently',
      heroSubtitle:
        'Order items from any country, with crystal clear fees and end-to-end tracking until it arrives at your door.',
      cta: 'Start Request',
      heroTrust: '10K+ successful requests',
      heroQuote: `"Just share your product details and we handle everything abroad until it reaches your doorstep."`,
      howTitle: 'How It Works',
      howSubtitle: 'Four simple steps to get the items you want.',
      testimonialsTitle: 'Customer Stories',
      testimonialsSubtitle: 'Real experiences from customers who already rely on Jastipku.',
      countriesTitle: 'Popular Countries',
      countriesSubtitle: 'Choose a country and jump straight into the request wizard.',
      footerLinks: ['FAQ', 'About Us', 'Privacy Policy', 'Contact Us'],
      footerNote: 'All rights reserved.'
    }
  };

  const howItWorks = [
    {
      icon: '🌍',
      title: { id: 'Pilih Negara', en: 'Choose Country' },
      description: {
        id: 'Tentukan negara tempat kamu ingin membeli barang.',
        en: 'Pick the country where you want to shop.'
      }
    },
    {
      icon: '📝',
      title: { id: 'Isi Detail Produk', en: 'Provide Product Details' },
      description: {
        id: 'Sertakan informasi produk beserta perkiraan harga.',
        en: 'Share product info along with estimated price.'
      }
    },
    {
      icon: '🤝',
      title: { id: 'Admin Beli & Antar', en: 'Admin Buys & Delivers' },
      description: {
        id: 'Admin kami akan konfirmasi, beli, dan bawa barangmu.',
        en: 'Our admins confirm, purchase, and bring the item for you.'
      }
    },
    {
      icon: '📦',
      title: { id: 'Barang Sampai Rumahmu', en: 'Delivered To Your Door' },
      description: {
        id: 'Atur pengiriman domestik dan pantau tracking lengkap.',
        en: 'Arrange local delivery and track every milestone.'
      }
    }
  ];

  const countryNamesByLang = {
    JP: { id: 'Jepang', en: 'Japan' },
    US: { id: 'Amerika Serikat', en: 'United States' },
    KR: { id: 'Korea', en: 'Korea' },
    SG: { id: 'Singapura', en: 'Singapore' },
    FR: { id: 'Prancis', en: 'France' },
    CA: { id: 'Kanada', en: 'Canada' }
  };

  $: currentCopy = copy[language];

  $: featuredListings = listings
    .filter((l) => l.type === 'jastip' || l.type === 'preloved')
    .slice(0, 3);
</script>

<Navbar
  showLanguage
  {language}
  languages={languageOptions}
  on:languageChange={(event) => (language = event.detail)}
/>

<section class="hero">
  <div class="hero-content">
    <h1>{currentCopy.heroTitle}</h1>
    <p>{currentCopy.heroSubtitle}</p>
    <div class="hero-actions">
      <a class="cta" href="/login?redirect=/browse&expected=user">{currentCopy.cta}</a>
      <div class="trusted">
        <span class="avatar-stack">
          <span>🧳</span>
          <span>🛍️</span>
          <span>🎌</span>
        </span>
        <span>{currentCopy.heroTrust}</span>
      </div>
    </div>
  </div>
  <div class="hero-visual">
    <div class="hero-card">
      <div class="illustration">
        <span class="travel">🧳</span>
        <span class="shop">🛒</span>
        <span class="plane">✈️</span>
      </div>
      <div class="quote">{currentCopy.heroQuote}</div>
    </div>
  </div>
</section>

<section class="how">
  <header>
    <h2>{currentCopy.howTitle}</h2>
    <p>{currentCopy.howSubtitle}</p>
  </header>
  <div class="grid">
    {#each howItWorks as step}
      <article class="card">
        <div class="icon">{step.icon}</div>
        <h3>{step.title[language]}</h3>
        <p>{step.description[language]}</p>
      </article>
    {/each}
  </div>
</section>
<section class="featured">
  <header>
    <h2>Featured Jastip & Preloved</h2>
    <p>Pilihan populer yang bisa kamu cek sebelum browse semua listing.</p>
  </header>

  <div class="featured-grid">
    {#each featuredListings as item}
      <a href={`/browse/${item.id}`} class="featured-card">
        <div class="featured-image">
          {#if item.images?.length}
            <img src={item.images[0]} alt={item.title} loading="lazy" />
          {/if}
          <span class="featured-badge {item.type === 'preloved' ? 'preloved' : ''}">
            {item.type === 'preloved' ? 'Preloved' : 'Jastip'}
          </span>
        </div>
        <div class="featured-body">
          <h4>{item.title}</h4>
          <div class="featured-meta">
            <div class="featured-avatar">
              <img src={item.jastiperAvatar} alt={item.jastiperName} />
            </div>
            <div class="featured-text">
              <span class="name">{item.jastiperName}</span>
              <span class="country">{item.country}</span>
            </div>
            {#if item.type === 'preloved' && item.price}
              <span class="price">
                Rp {item.price.toLocaleString('id-ID')}
              </span>
            {:else}
              <span class="rating">⭐ {item.jastiperRating}</span>
            {/if}
          </div>
        </div>
      </a>
    {/each}
  </div>
</section>

<section class="testimonials">
  <header>
    <h2>{currentCopy.testimonialsTitle}</h2>
    <p>{currentCopy.testimonialsSubtitle}</p>
  </header>
  <div class="carousel">
    {#each testimonials as item}
      <article class="testimonial">
        <RatingStars value={item.rating} />
        <p class="comment">“{item.comment}”</p>
        <footer>
          <strong>{item.name}</strong>
          <span>{item.city}</span>
        </footer>
      </article>
    {/each}
  </div>
</section>

<section class="countries">
  <header>
    <h2>{currentCopy.countriesTitle}</h2>
    <p>{currentCopy.countriesSubtitle}</p>
  </header>
  <div class="country-grid">
    {#each popularCountries as country}
      <a class="country-card" href={`/wizard?country=${country.code}`}>
        <span class="flag">{country.flag}</span>
        <span>{countryNamesByLang[country.code]?.[language] ?? country.name}</span>
      </a>
    {/each}
  </div>
</section>



<footer class="footer">
  <div class="links">
    {#each currentCopy.footerLinks as link}
      <a href="#">{link}</a>
    {/each}
  </div>
  <div class="socials">
    <a href="#" aria-label="Instagram">📸</a>
    <a href="#" aria-label="WhatsApp">💬</a>
  </div>
  <p>© {new Date().getFullYear()} Jastipku. {currentCopy.footerNote}</p>
</footer>

<style>
  section {
    padding: 5rem 3rem;
  }


  .hero {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    align-items: center;
    gap: 3rem;
    padding-top: 4rem;
    background: radial-gradient(circle at top left, rgba(8, 106, 223, 0.15), transparent 45%);
  }

  .hero-content h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    margin: 0;
    line-height: 1.1;
  }

  .hero-content p {
    font-size: 1.1rem;
    color: #475569;
    margin: 1.2rem 0 2rem;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.9rem 2.4rem;
    border-radius: 999px;
    font-weight: 600;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
    box-shadow: 0 20px 30px rgba(14, 165, 233, 0.25);
  }

  .trusted {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #0f172a;
    font-weight: 600;
  }

  .avatar-stack {
    display: inline-flex;
    gap: -0.5rem;
    font-size: 1.5rem;
  }

  .hero-visual {
    display: flex;
    justify-content: center;
  }

  .hero-card {
    position: relative;
    padding: 2.5rem;
    border-radius: 24px;
    background: white;
    border: 1px solid rgba(148, 163, 184, 0.3);
    box-shadow: 0 25px 40px rgba(15, 23, 42, 0.15);
    width: min(100%, 26rem);
  }

  .illustration {
    display: flex;
    justify-content: space-between;
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  .quote {
    font-style: italic;
    color: #475569;
    font-size: 1rem;
  }

  .how header,
  .testimonials header,
  .countries header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .how h2,
  .testimonials h2,
  .countries h2 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }

  .grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .card {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 15px 30px rgba(15, 23, 42, 0.1);
    text-align: center;
    display: grid;
    gap: 1rem;
  }

  .icon {
    font-size: 2rem;
  }

  .testimonials {
    background: linear-gradient(135deg, rgba(8, 106, 223, 0.05), rgba(14, 165, 233, 0.1));
  }

  .carousel {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(220px, 1fr);
    gap: 1.5rem;
    overflow-x: auto;
    padding-bottom: 1rem;
  }

  .testimonial {
    background: white;
    border-radius: 18px;
    padding: 1.5rem;
    border: 1px solid rgba(148, 163, 184, 0.2);
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
    display: grid;
    gap: 1rem;
  }

  .comment {
    color: #334155;
    margin: 0;
  }

  footer strong {
    display: block;
  }

  .country-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1.5rem;
  }

  .country-card {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    border-radius: 16px;
    background: white;
    border: 1px solid rgba(148, 163, 184, 0.2);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
    font-weight: 600;
  }

  .flag {
    font-size: 2rem;
  }

  .featured {
    background: #f8fafc;
  }

  .featured header {
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .featured h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
  }

  .featured-card {
    display: flex;
    flex-direction: column;
    border-radius: 18px;
    background: #ffffff;
    border: 1px solid rgba(148, 163, 184, 0.18);
    box-shadow: 0 18px 30px rgba(15, 23, 42, 0.06);
    text-decoration: none;
    color: inherit;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    overflow: hidden;
  }

  .featured-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 22px 40px rgba(15, 23, 42, 0.12);
  }

  .featured-image {
    position: relative;
    width: 100%;
    height: 160px;
    border-radius: 18px 18px 0 0;
    overflow: hidden;
    background: #e5e7eb;
  }

  .featured-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .featured-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    background: rgba(8, 106, 223, 0.95);
    color: white;
    font-size: 0.7rem;
    font-weight: 600;
  }

  .featured-badge.preloved {
    background: rgba(249, 115, 22, 0.95);
  }

  .featured-body h4 {
    font-size: 0.95rem;
    margin: 0 0 0.4rem 0;
    color: #0f172a;
  }

  .featured-body {
    padding: 0.85rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .featured-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: #64748b;
  }

  .featured-avatar {
    width: 28px;
    height: 28px;
    border-radius: 999px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .featured-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .featured-text .name {
    display: block;
    font-weight: 600;
    color: #0f172a;
  }

  .featured-text .country {
    display: block;
    font-size: 0.75rem;
  }

  .featured .rating,
  .featured .price {
    margin-left: auto;
    font-weight: 600;
    color: #0f172a;
  }

  .footer {
    padding: 3rem;
    background: #0f172a;
    color: #e2e8f0;
    display: grid;
    gap: 1.5rem;
    justify-items: center;
  }

  .footer .links {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .footer a {
    color: inherit;
  }

  .socials {
    display: flex;
    gap: 1rem;
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    section {
      padding: 3rem 1.5rem;
    }

    .hero {
      padding-top: 2rem;
    }
  }
</style>
