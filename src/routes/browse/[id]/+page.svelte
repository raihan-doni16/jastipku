<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  import { cartStore } from '$lib/stores/cart';
  import Navbar from '$lib/components/Navbar.svelte';
  import RatingStars from '$lib/components/RatingStars.svelte';
  import { listings } from '$lib/data/mockData';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole === 'guest') {
      goto(`/login?redirect=/browse/${$page.params.id}&expected=user`);
    }
  });

  $: listingId = $page.params.id;
  $: listing = listings.find((l) => l.id === listingId);

  let activeImageIndex = 0;
  $: activeImage =
    listing && listing.images && listing.images.length
      ? listing.images[activeImageIndex] || listing.images[0]
      : null;

  let quantity = 1;
  let addedToCart = false;

  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  function handleAddToCart() {
    if (!listing) return;

    cartStore.addItem(listing, quantity);
    addedToCart = true;

    setTimeout(() => {
      addedToCart = false;
    }, 2000);
  }

  function handleBuyNow() {
    if (!listing) return;
    cartStore.addItem(listing, quantity);
    goto('/cart');
  }
</script>

<Navbar />

<div class="container">
  {#if !listing}
    <div class="not-found">
      <h2>Postingan tidak ditemukan</h2>
      <p>Postingan yang Anda cari tidak ditemukan atau sudah dihapus.</p>
      <a href="/browse" class="btn-back">Kembali ke Browse</a>
    </div>
  {:else}
    <div class="breadcrumb">
      <a href="/browse">Browse</a>
      <span>/</span>
      <span>{listing.title}</span>
    </div>

    <div class="detail-grid">
      <!-- Image Gallery -->
      <div class="gallery">
        <div class="main-image">
          {#if activeImage}
            <img src={activeImage} alt={listing.title} class="main-image-img" />
          {:else}
            <div class="image-placeholder">{listing.jastiperAvatar}</div>
          {/if}
        </div>
        <div class="type-badge" style="background-color: {listing.type === 'jastip' ? '#0ea5e9' : listing.type === 'preloved' ? '#f97316' : '#a855f7'}">
          {listing.type === 'jastip' ? 'Jastip' : listing.type === 'preloved' ? 'Preloved' : 'Event'}
        </div>
        {#if listing.images && listing.images.length > 1}
          <div class="thumbs">
            {#each listing.images as img, index}
              <button
                type="button"
                class="thumb {index === activeImageIndex ? 'active' : ''}"
                on:click={() => (activeImageIndex = index)}
              >
                <img
                  src={img}
                  alt={`${listing.title} thumbnail ${index + 1}`}
                  loading="lazy"
                />
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Main Info -->
      <div class="main-info">
        <h1 class="title">{listing.title}</h1>

        {#if listing.type === 'preloved'}
          <div class="price-section">
            <div class="current-price">{formatPrice(listing.price)}</div>
            {#if listing.originalPrice}
              <div class="original-price">{formatPrice(listing.originalPrice)}</div>
              <div class="discount">
                {Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)}%
                OFF
              </div>
            {/if}
          </div>
          <div class="condition-badge">Kondisi: {listing.condition}</div>
        {:else}
          <div class="fee-section">
            <span class="fee-label">Fee Jastip:</span>
            <span class="fee-value">{listing.fee}% dari harga barang</span>
          </div>
          <div class="min-order">Minimal Order: {formatPrice(listing.minOrder)}</div>
        {/if}

        <div class="description">
          <h3>Deskripsi</h3>
          <p>{listing.description}</p>
        </div>

        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Negara Asal</span>
            <span class="detail-value">{listing.country}</span>
          </div>

          {#if listing.type !== 'preloved'}
            <div class="detail-item">
              <span class="detail-label">Tanggal Berangkat</span>
              <span class="detail-value">{formatDate(listing.departureDate)}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Tanggal Kembali</span>
              <span class="detail-value">{formatDate(listing.returnDate)}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Estimasi Pengiriman</span>
              <span class="detail-value">{formatDate(listing.estimateDelivery)}</span>
            </div>
          {/if}

          {#if listing.stores}
            <div class="detail-item full-width">
              <span class="detail-label">Toko Tersedia</span>
              <div class="stores-list">
                {#each listing.stores as store}
                  <span class="store-tag">{store}</span>
                {/each}
              </div>
            </div>
          {/if}
        </div>

        {#if listing.type !== 'preloved'}
          <div class="quota-section">
            <div class="quota-header">
              <span>Slot Tersedia</span>
              <span class="quota-count">{listing.quota - listing.sold} dari {listing.quota}</span>
            </div>
            <div class="quota-bar">
              <div
                class="quota-fill"
                style="width: {(listing.sold / listing.quota) * 100}%"
              ></div>
            </div>
          </div>
        {/if}

        <div class="categories-section">
          <h4>Kategori</h4>
          <div class="categories">
            {#each listing.categories as category}
              <span class="category-tag">{category}</span>
            {/each}
          </div>
        </div>

        {#if currentRole !== 'admin'}
          <div class="quantity-section">
            <label>Jumlah</label>
            <div class="quantity-control">
              <button class="qty-btn" on:click={() => (quantity = Math.max(1, quantity - 1))}>
                −
              </button>
              <input type="number" bind:value={quantity} min="1" max="99" />
              <button class="qty-btn" on:click={() => (quantity = Math.min(99, quantity + 1))}>
                +
              </button>
            </div>
          </div>

          {#if listing.type === 'jastip'}
            <div class="action-buttons single">
              <button class="btn-buy-now" on:click={handleBuyNow}>
                Custom Order
              </button>
            </div>
          {:else}
            <div class="action-buttons">
              <button
                class="btn-add-cart"
                on:click={handleAddToCart}
                disabled={addedToCart}
              >
                {addedToCart ? '✓ Ditambahkan!' : '🛒 Tambah ke Keranjang'}
              </button>
              <button class="btn-buy-now" on:click={handleBuyNow}>
                {listing.type === 'preloved' ? 'Beli Sekarang' : 'Order Sekarang'}
              </button>
            </div>
          {/if}
        {/if}
      </div>

      <!-- Jastiper Info Sidebar -->
      <div class="jastiper-card">
        <h3>Tentang Jastiper</h3>
        <div class="jastiper-profile">
          <div class="jastiper-avatar">
            <img src={listing.jastiperAvatar} alt={listing.jastiperName} />
          </div>
          <div class="jastiper-info">
            <h4>{listing.jastiperName}</h4>
            <div class="rating">
              <RatingStars rating={listing.jastiperRating} />
              <span class="rating-value">{listing.jastiperRating}</span>
            </div>
          </div>
        </div>

        <div class="jastiper-stats">
          <div class="stat">
            <span class="stat-label">Total Trip</span>
            <span class="stat-value">45+</span>
          </div>
          <div class="stat">
            <span class="stat-label">Verified</span>
            <span class="stat-value verified">✓</span>
          </div>
        </div>

        {#if currentRole !== 'admin'}
          <a href="/chats" class="btn-chat">Chat Jastiper</a>
        {/if}
      </div>
    </div>

    <!-- Terms & Conditions -->
    <div class="terms-section">
      <h3>Syarat & Ketentuan</h3>
      <div class="terms-content">
        <div class="term-item">
          <span class="term-icon">⚠️</span>
          <div>
            <h4>Risiko Out of Stock</h4>
            <p>
              Barang yang dipesan mungkin tidak tersedia di lokasi pembelian. Jika terjadi,
              pembeli akan direfund penuh.
            </p>
          </div>
        </div>
        <div class="term-item">
          <span class="term-icon">💰</span>
          <div>
            <h4>Kebijakan Pembayaran</h4>
            <p>
              Tersedia opsi DP 50% atau pembayaran penuh. Sisa pembayaran dilakukan setelah
              barang dibeli.
            </p>
          </div>
        </div>
        <div class="term-item">
          <span class="term-icon">📦</span>
          <div>
            <h4>Estimasi Pengiriman</h4>
            <p>
              Pengiriman dimulai setelah jastiper kembali ke Indonesia. Estimasi dapat berubah
              tergantung kondisi.
            </p>
          </div>
        </div>
        <div class="term-item">
          <span class="term-icon">🔄</span>
          <div>
            <h4>Kebijakan Refund</h4>
            <p>
              Refund penuh jika barang tidak tersedia atau tidak sesuai. Buyer menanggung biaya
              return jika cancel sepihak.
            </p>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
  }

  .not-found {
    text-align: center;
    padding: 4rem 2rem;
  }

  .not-found h2 {
    font-size: 2rem;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .not-found p {
    color: #64748b;
    margin-bottom: 2rem;
  }

  .btn-back {
    display: inline-block;
    padding: 0.875rem 1.75rem;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    color: #64748b;
    font-size: 0.9rem;
  }

  .breadcrumb a {
    color: #086adf;
    text-decoration: none;
  }

  .breadcrumb a:hover {
    text-decoration: underline;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr 0.8fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .gallery {
    position: relative;
  }

  .main-image {
    background: #0f172a;
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 1;
  }

  .main-image-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8rem;
  }

  .type-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    color: white;
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .thumbs {
    margin-top: 0.75rem;
    display: flex;
    gap: 0.5rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.25rem;
  }

  .thumb {
    border: none;
    padding: 0;
    background: transparent;
    border-radius: 8px;
    overflow: hidden;
    width: 68px;
    height: 68px;
    flex: 0 0 auto;
    cursor: pointer;
    opacity: 0.8;
    border: 2px solid transparent;
    transition: opacity 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
  }

  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .thumb:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  .thumb.active {
    opacity: 1;
    border-color: #0ea5e9;
  }

  .main-info {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .title {
    font-size: 2rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 1.5rem;
    line-height: 1.3;
  }

  .price-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .current-price {
    font-size: 2rem;
    font-weight: 800;
    color: #0ea5e9;
  }

  .original-price {
    font-size: 1.25rem;
    color: #94a3b8;
    text-decoration: line-through;
  }

  .discount {
    padding: 0.35rem 0.75rem;
    background: #fef3c7;
    color: #92400e;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 700;
  }

  .condition-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #dcfce7;
    color: #15803d;
    border-radius: 8px;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .fee-section {
    padding: 1rem;
    background: #eff6ff;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .fee-label {
    font-weight: 600;
    color: #1e40af;
  }

  .fee-value {
    margin-left: 0.5rem;
    color: #1e40af;
  }

  .min-order {
    color: #64748b;
    margin-bottom: 1.5rem;
  }

  .description {
    margin-bottom: 2rem;
  }

  .description h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.75rem;
  }

  .description p {
    color: #475569;
    line-height: 1.7;
  }

  .details-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .detail-item.full-width {
    grid-column: 1 / -1;
  }

  .detail-label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
  }

  .detail-value {
    font-size: 1rem;
    color: #1f2937;
    font-weight: 600;
  }

  .stores-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .store-tag {
    padding: 0.5rem 1rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #475569;
  }

  .quota-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f0f9ff;
    border-radius: 12px;
  }

  .quota-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    font-weight: 600;
    color: #1e40af;
  }

  .quota-count {
    font-size: 1.125rem;
  }

  .quota-bar {
    height: 10px;
    background: white;
    border-radius: 999px;
    overflow: hidden;
  }

  .quota-fill {
    height: 100%;
    background: linear-gradient(90deg, #086adf, #0ea5e9);
    border-radius: 999px;
    transition: width 0.3s;
  }

  .categories-section {
    margin-bottom: 2rem;
  }

  .categories-section h4 {
    font-size: 1rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.75rem;
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .category-tag {
    padding: 0.5rem 1rem;
    background: #f1f5f9;
    color: #475569;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .quantity-section {
    margin-bottom: 1.5rem;
  }

  .quantity-section label {
    display: block;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.75rem;
  }

  .quantity-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    max-width: 150px;
  }

  .qty-btn {
    width: 40px;
    height: 40px;
    border: 2px solid #e2e8f0;
    background: white;
    border-radius: 8px;
    font-size: 1.25rem;
    font-weight: 700;
    color: #086adf;
    cursor: pointer;
    transition: all 0.2s;
  }

  .qty-btn:hover {
    border-color: #086adf;
    background: #eff6ff;
  }

  .quantity-control input {
    width: 60px;
    height: 40px;
    text-align: center;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 700;
  }

  .action-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .action-buttons.single {
    grid-template-columns: 1fr;
  }

  .btn-add-cart,
  .btn-buy-now {
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-add-cart {
    background: white;
    border: 2px solid #086adf;
    color: #086adf;
  }

  .btn-add-cart:hover:not(:disabled) {
    background: #eff6ff;
  }

  .btn-add-cart:disabled {
    background: #22c55e;
    border-color: #22c55e;
    color: white;
    cursor: not-allowed;
  }

  .btn-buy-now {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .btn-buy-now:hover {
    transform: scale(1.02);
  }

  .jastiper-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    height: fit-content;
    position: sticky;
    top: 2rem;
  }

  .jastiper-card h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1.5rem;
  }

  .jastiper-profile {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .jastiper-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }

  .jastiper-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .jastiper-info h4 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .rating-value {
    font-weight: 700;
    color: #1f2937;
  }

  .jastiper-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stat-label {
    font-size: 0.75rem;
    color: #64748b;
    text-transform: uppercase;
    font-weight: 600;
  }

  .stat-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
  }

  .stat-value.verified {
    color: #22c55e;
  }

  .btn-chat {
    width: 100%;
    padding: 0.875rem 1.5rem;
    background: white;
    border: 2px solid #086adf;
    color: #086adf;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-chat:hover {
    background: #eff6ff;
  }

  .terms-section {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .terms-section h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1.5rem;
  }

  .terms-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .term-item {
    display: flex;
    gap: 1rem;
  }

  .term-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .term-item h4 {
    font-size: 1rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .term-item p {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.6;
  }

  @media (max-width: 1024px) {
    .detail-grid {
      grid-template-columns: 1fr;
    }

    .jastiper-card {
      position: static;
    }

    .terms-content {
      grid-template-columns: 1fr;
    }

    .details-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .title {
      font-size: 1.5rem;
    }

    .current-price {
      font-size: 1.5rem;
    }
  }
</style>
