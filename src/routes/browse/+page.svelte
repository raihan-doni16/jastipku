<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { cartStore } from '$lib/stores/cart';
  import Navbar from '$lib/components/Navbar.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { listings, popularCountries } from '$lib/data/mockData';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole === 'guest') {
      goto('/login?redirect=/browse&expected=user');
    }
  });

  let searchQuery = '';
  let selectedType = 'all';
  let selectedCountry = 'all';
  let selectedCategory = 'Semua Kategori';

  const types = [
    { value: 'all', label: 'Semua Tipe' },
    { value: 'jastip', label: 'Jastip' },
    { value: 'preloved', label: 'Preloved' },
    { value: 'event', label: 'Event' }
  ];

  const allCategories = [
    'Semua Kategori',
    'Kosmetik',
    'Fashion',
    'Elektronik',
    'Gadget',
    'Gaming',
    'Skincare',
    'Tas',
    'Branded',
    'Sepatu'
  ];

  $: filteredListings = listings.filter((listing) => {
    const matchSearch =
      searchQuery === '' ||
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchType = selectedType === 'all' || listing.type === selectedType;

    const matchCountry =
      selectedCountry === 'all' || listing.countryCode === selectedCountry;

    const matchCategory =
      selectedCategory === 'Semua Kategori' ||
      listing.categories.includes(selectedCategory);

    return matchSearch && matchType && matchCountry && matchCategory;
  });

  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }

  function getTypeLabel(type) {
    const found = types.find((t) => t.value === type);
    return found?.label ?? type;
  }

  function getStatusLabel(status) {
    if (status === 'available') return 'Open';
    return status || '';
  }

  function formatListingAge(dateStr) {
    if (!dateStr) return '';
    const created = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'Hari ini';
    if (diffDays === 1) return '1 hari lalu';
    if (diffDays < 7) return `${diffDays} hari lalu`;

    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks === 1) return '1 minggu lalu';
    return `${diffWeeks} minggu lalu`;
  }

  function getTypeBadgeColor(type) {
    if (type === 'jastip') return '#0ea5e9';
    if (type === 'preloved') return '#f97316';
    if (type === 'event') return '#a855f7';
    return '#64748b';
  }

  let addedItems = {};
  let showCustomOrderModal = false;
  let selectedListingForCustom = null;
  let customOrderForm = {
    productName: '',
    productLink: '',
    store: '',
    quantity: 1,
    estimatedPrice: '',
    notes: ''
  };

  let customOrderFeedbackOpen = false;
  let customOrderFeedbackTitle = '';
  let customOrderFeedbackMessage = '';
  let customOrderFeedbackType = 'info';

  function showCustomOrderFeedback({ title, message, type = 'info' }) {
    customOrderFeedbackTitle = title;
    customOrderFeedbackMessage = message;
    customOrderFeedbackType = type;
    customOrderFeedbackOpen = true;
  }

  function handleAddToCart(listing, event) {
    event.preventDefault();
    event.stopPropagation();

    cartStore.addItem(listing, 1);
    addedItems[listing.id] = true;

    setTimeout(() => {
      addedItems[listing.id] = false;
      addedItems = { ...addedItems };
    }, 2000);
  }

  function openCustomOrderModal(listing, event) {
    event.preventDefault();
    event.stopPropagation();
    selectedListingForCustom = listing;
    customOrderForm = {
      productName: '',
      productLink: '',
      store: listing.stores?.[0] || '',
      quantity: 1,
      estimatedPrice: '',
      notes: ''
    };
    showCustomOrderModal = true;
  }

  function closeCustomOrderModal() {
    showCustomOrderModal = false;
    selectedListingForCustom = null;
  }

  function submitCustomOrder() {
    if (!customOrderForm.productName || !customOrderForm.estimatedPrice) {
      showCustomOrderFeedback({
        title: 'Data belum lengkap',
        message: 'Mohon lengkapi nama produk dan estimasi harga.',
        type: 'warning'
      });
      return;
    }

    // Create a custom listing object
    const customListing = {
      id: 'CUSTOM-' + Date.now(),
      type: 'jastip',
      jastiperId: selectedListingForCustom.jastiperId,
      jastiperName: selectedListingForCustom.jastiperName,
      jastiperAvatar: selectedListingForCustom.jastiperAvatar,
      jastiperRating: selectedListingForCustom.jastiperRating,
      title: `Custom Order: ${customOrderForm.productName}`,
      description: customOrderForm.notes || 'Pesanan custom',
      country: selectedListingForCustom.country,
      countryCode: selectedListingForCustom.countryCode,
      stores: [customOrderForm.store],
      categories: selectedListingForCustom.categories,
      fee: selectedListingForCustom.fee,
      minOrder: parseInt(customOrderForm.estimatedPrice),
      images: ['📦'],
      isCustomOrder: true,
      customDetails: {
        productName: customOrderForm.productName,
        productLink: customOrderForm.productLink,
        store: customOrderForm.store,
        notes: customOrderForm.notes
      }
    };

    cartStore.addItem(customListing, parseInt(customOrderForm.quantity));

    showCustomOrderFeedback({
      title: 'Custom order ditambahkan',
      message: `Custom order "${customOrderForm.productName}" berhasil ditambahkan ke keranjang.`,
      type: 'success'
    });
    closeCustomOrderModal();
  }
</script>

<Navbar />

<div class="container">
  <div class="header">
    <h1>Browse Jastip & Preloved</h1>
    <p>Temukan barang impian dari berbagai negara</p>
  </div>

  <!-- Filters -->
  <div class="filters">
    <input
      type="text"
      placeholder="Cari produk, toko, atau jastiper..."
      bind:value={searchQuery}
      class="search-input"
    />

    <div class="filter-row">
      <select bind:value={selectedType} class="filter-select">
        {#each types as type}
          <option value={type.value}>{type.label}</option>
        {/each}
      </select>

      <select bind:value={selectedCountry} class="filter-select">
        <option value="all">Semua Negara</option>
        {#each popularCountries as country}
          <option value={country.code}>{country.flag} {country.name}</option>
        {/each}
      </select>

      <select bind:value={selectedCategory} class="filter-select">
        {#each allCategories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Results Count -->
  <div class="results-info">
    Menampilkan {filteredListings.length} dari {listings.length} postingan
  </div>

  <!-- Listings Grid -->
  <div class="listings-grid">
    {#each filteredListings as listing (listing.id)}
      <a href="/browse/{listing.id}" class="listing-card">
        <div class="card-image">
          {#if listing.images?.length}
            <img
              src={listing.images[0]}
              alt={listing.title}
              class="card-image-img"
              loading="lazy"
            />
          {:else}
            <div class="image-placeholder">
              {listing.jastiperAvatar}
            </div>
          {/if}
          {#if listing.status}
            <div class="status-badge">
              {getStatusLabel(listing.status)}
            </div>
          {/if}
          <div class="type-badge" style="background-color: {getTypeBadgeColor(listing.type)}">
            {getTypeLabel(listing.type)}
          </div>
        </div>

        <div class="card-content">
          <!-- Price Section -->
          <div class="price-section">
            {#if listing.type === 'preloved'}
              <div class="current-price">{formatPrice(listing.price)}</div>
              {#if listing.originalPrice}
                <div class="original-price">{formatPrice(listing.originalPrice)}</div>
              {/if}
            {:else}
              <div class="current-price">Fee {listing.fee}%</div>
              <div class="min-order-info">Min. Order {formatPrice(listing.minOrder || 0)}</div>
            {/if}
          </div>

          <!-- Title -->
          <h3 class="listing-title">{listing.title}</h3>

          <!-- Category Tags -->
          {#if listing.categories?.length}
            <div class="category-tags">
              {#each listing.categories as category}
                <span class="category-tag">{category}</span>
              {/each}
            </div>
          {/if}

          <!-- Meta Info Row -->
          <div class="meta-row">
            <div class="rating-badge">
              <span class="star-icon">⭐</span>
              <span class="rating-value">{listing.jastiperRating}</span>
            </div>
            <span class="divider">•</span>
            <span class="sold-count">Sold {listing.sold || 0}</span>
          </div>

          <!-- Jastiper Info -->
          <div class="jastiper-compact">
            <img
              src={listing.jastiperAvatar}
              alt={listing.jastiperName}
              class="jastiper-avatar-small"
              loading="lazy"
            />
            <span class="jastiper-name-small">{listing.jastiperName}</span>
          </div>

          {#if listing.type !== 'preloved'}
            <div class="quota-info">
            <div class="quota-bar">
              <div
                class="quota-fill"
                style="width: {(listing.sold / listing.quota) * 100}%"
              ></div>
              </div>
              <span class="quota-text">{listing.sold}/{listing.quota} slot</span>
            </div>
          {/if}

          <div class="card-actions">
            {#if listing.type === 'jastip'}
              {#if listing.stores?.length > 0}
                <button
                  class="btn-custom-order"
                  on:click={(e) => openCustomOrderModal(listing, e)}
                >
                  <span class="btn-icon-circle">✎</span>
                  <span class="btn-label">Custom Order</span>
                </button>
              {/if}
            {:else}
              <button
                class="btn-add-to-cart"
                class:added={addedItems[listing.id]}
                on:click={(e) => handleAddToCart(listing, e)}
              >
                <span class="btn-icon-circle">
                  {addedItems[listing.id] ? '✓' : '+'}
                </span>
                <span class="btn-label">Keranjang</span>
              </button>
            {/if}
          </div>

          <!-- Footer info -->
          <div class="card-footer">
            <div class="footer-group">
              <span class="footer-icon">📍</span>
              <span class="footer-text">{listing.country}</span>
            </div>
            {#if listing.createdAt}
              <div class="footer-group">
                <span class="footer-icon">⏱</span>
                <span class="footer-text">{formatListingAge(listing.createdAt)}</span>
              </div>
            {/if}
          </div>
        </div>
      </a>
    {/each}
  </div>

  {#if filteredListings.length === 0}
    <div class="empty-state">
      <div class="empty-icon">🔍</div>
      <h3>Tidak ada postingan yang ditemukan</h3>
      <p>Coba ubah filter atau kata kunci pencarian Anda</p>
    </div>
  {/if}
</div>

<Modal
  bind:isOpen={showCustomOrderModal}
  title="Custom Order"
  showCancel={true}
  cancelText="Batal"
  confirmText="Tambah ke Keranjang"
  autoCloseOnConfirm={false}
  on:cancel={closeCustomOrderModal}
  on:confirm={submitCustomOrder}
  maxWidth="680px"
>
  {#if selectedListingForCustom}
    <div class="custom-order-modal">
      <div class="jastiper-info-modal">
        <img
          src={selectedListingForCustom.jastiperAvatar}
          alt={selectedListingForCustom.jastiperName}
          class="avatar-large"
        />
        <div>
          <div class="jastiper-name-large">{selectedListingForCustom.jastiperName}</div>
          <div class="jastiper-meta">
            {selectedListingForCustom.country} • Fee {selectedListingForCustom.fee}%
          </div>
          {#if selectedListingForCustom.stores?.length > 0}
            <div class="available-stores">
              <strong>Toko tersedia:</strong>
              {selectedListingForCustom.stores.join(', ')}
            </div>
  {/if}
</div>

<Modal
  bind:isOpen={customOrderFeedbackOpen}
  type={customOrderFeedbackType}
  title={customOrderFeedbackTitle}
  message={customOrderFeedbackMessage}
  confirmText="OK"
/>
      </div>

      <p class="modal-description">
        Pesan produk yang tidak ada di postingan ini, tapi tersedia di toko yang sama dengan
        jastiper
      </p>

      <div class="custom-order-form">
        <div class="form-group">
          <label for="productName"
            >Nama Produk <span class="required">*</span></label
          >
          <input
            id="productName"
            type="text"
            bind:value={customOrderForm.productName}
            placeholder="Contoh: iPhone 15 Pro Max 256GB"
          />
        </div>

        <div class="form-group">
          <label for="productLink">Link Produk (Opsional)</label>
          <input
            id="productLink"
            type="url"
            bind:value={customOrderForm.productLink}
            placeholder="https://..."
          />
        </div>

        <div class="form-group">
          <label for="store">Nama Toko</label>
          <select id="store" bind:value={customOrderForm.store}>
            {#if selectedListingForCustom.stores?.length > 0}
              {#each selectedListingForCustom.stores as store}
                <option value={store}>{store}</option>
              {/each}
            {/if}
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="quantity">Jumlah</label>
            <input
              id="quantity"
              type="number"
              bind:value={customOrderForm.quantity}
              min="1"
              max="99"
            />
          </div>

          <div class="form-group">
            <label for="estimatedPrice"
              >Estimasi Harga (per item) <span class="required">*</span></label
            >
            <input
              id="estimatedPrice"
              type="number"
              bind:value={customOrderForm.estimatedPrice}
              placeholder="Dalam Rupiah"
              min="0"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="notes">Catatan Tambahan</label>
          <textarea
            id="notes"
            bind:value={customOrderForm.notes}
            placeholder="Warna, ukuran, varian, atau detail lainnya"
            rows="3"
          ></textarea>
        </div>

        <div class="info-box-modal">
          <strong>💡 Tips:</strong>
          <ul>
            <li>Pastikan produk tersedia di toko yang dipilih</li>
            <li>Harga final bisa berbeda dengan estimasi</li>
            <li>Jastiper akan konfirmasi harga sebelum pembelian</li>
          </ul>
        </div>
      </div>
    </div>
  {/if}
</Modal>

<style>
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .header h1 {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
  }

  .header p {
    font-size: 1.125rem;
    color: #64748b;
  }

  .filters {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .search-input {
    width: 100%;
    max-width: 1190px;
    padding: 0.875rem 1.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    margin: 0 auto 1rem auto;
    transition: border-color 0.2s;
  }

  .search-input:focus {
    outline: none;
    border-color: #086adf;
  }

  .filter-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .filter-select {
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    background: white;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .filter-select:focus {
    outline: none;
    border-color: #086adf;
  }

  .results-info {
    margin-bottom: 1.5rem;
    color: #64748b;
    font-size: 0.95rem;
  }

  .listings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .listing-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
  }

  .listing-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  .card-image {
    position: relative;
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  }

  .card-image-img {
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
    font-size: 4rem;
  }

  .status-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    background: #dcfce7;
    color: #15803d;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }

  .type-badge {
    position: absolute;
    bottom: 12px;
    right: 12px;
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .card-content {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .price-section {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }

  .current-price {
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
  }

  .original-price {
    font-size: 0.875rem;
    color: #94a3b8;
    text-decoration: line-through;
  }

  .min-order-info {
    font-size: 0.75rem;
    color: #64748b;
  }

  .listing-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: #1f2937;
    line-height: 1.4;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 2.8rem;
  }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: #64748b;
  }

  .category-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .category-tag {
    padding: 0.15rem 0.6rem;
    border-radius: 999px;
    background: #e5f2ff;
    color: #075985;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .rating-badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: #fef3c7;
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
  }

  .star-icon {
    font-size: 0.85rem;
  }

  .rating-value {
    font-weight: 700;
    color: #92400e;
  }

  .divider {
    color: #cbd5e1;
  }

  .sold-count {
    font-size: 0.8rem;
    color: #64748b;
  }

  .jastiper-compact {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: #64748b;
  }

  .jastiper-avatar-small {
    width: 24px;
    height: 24px;
    border-radius: 999px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .jastiper-name-small {
    font-weight: 500;
  }

  .quota-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .quota-bar {
    flex: 1;
    height: 4px;
    background: #e2e8f0;
    border-radius: 999px;
    overflow: hidden;
  }

  .quota-fill {
    height: 100%;
    background: linear-gradient(90deg, #086adf, #0ea5e9);
    border-radius: 999px;
    transition: width 0.3s;
  }

  .quota-text {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 600;
    white-space: nowrap;
  }

  .card-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
    padding-top: 0.75rem;
    border-top: 1px solid #f1f5f9;
  }

  .btn-add-to-cart {
    flex: 1;
    padding: 0.55rem 1rem;
    background: #0ea5e9;
    color: white;
    border-radius: 999px;
    border: 1px solid #0ea5e9;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease,
      border-color 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(14, 165, 233, 0.25);
  }

  .btn-add-to-cart:hover {
    background: #0284c7;
    border-color: #0284c7;
    box-shadow: 0 8px 18px rgba(8, 106, 223, 0.28);
    transform: translateY(-1px);
  }

  .btn-add-to-cart.added {
    background: #22c55e;
    border-color: #22c55e;
    box-shadow: 0 6px 14px rgba(34, 197, 94, 0.28);
  }

  .btn-custom-order {
    flex: 1;
    padding: 0.55rem 1rem;
    background: #ffffff;
    color: #0f172a;
    border-radius: 999px;
    border: 1px solid #e2e8f0;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease,
      border-color 0.2s ease, color 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .btn-custom-order:hover {
    background: #f9fafb;
    border-color: #cbd5e1;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
    transform: translateY(-1px);
  }

  .btn-icon-circle {
    width: 24px;
    height: 24px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .btn-add-to-cart .btn-icon-circle {
    background: rgba(255, 255, 255, 0.18);
    color: #ffffff;
  }

  .btn-custom-order .btn-icon-circle {
    background: #e5e7eb;
    color: #0f172a;
  }

  .btn-label {
    margin-left: 0.35rem;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.75rem;
    padding-top: 0.5rem;
    border-top: 1px dashed #e2e8f0;
    font-size: 0.8rem;
    color: #64748b;
  }

  .footer-group {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .footer-icon {
    font-size: 0.9rem;
  }

  .footer-text {
    font-weight: 500;
  }


  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .empty-state h3 {
    font-size: 1.5rem;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .empty-state p {
    color: #64748b;
  }

  .custom-order-modal {
    display: grid;
    gap: 1.25rem;
  }

  .modal-description {
    color: #475569;
    margin: 0;
  }

  .jastiper-info-modal {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }

  .avatar-large {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .jastiper-name-large {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.25rem;
  }

  .jastiper-meta {
    font-size: 0.875rem;
    color: #64748b;
    margin-bottom: 0.5rem;
  }

  .available-stores {
    font-size: 0.875rem;
    color: #475569;
  }

  .available-stores strong {
    color: #1f2937;
  }

  .modal-description {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .custom-order-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 600;
    color: #1f2937;
    font-size: 0.95rem;
  }

  .required {
    color: #ef4444;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
    font-family: inherit;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #086adf;
  }

  .form-group textarea {
    resize: vertical;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }

  .info-box-modal {
    padding: 1rem;
    background: #fef3c7;
    border-radius: 12px;
    font-size: 0.875rem;
  }

  .info-box-modal strong {
    color: #92400e;
    display: block;
    margin-bottom: 0.5rem;
  }

  .info-box-modal ul {
    margin-left: 1.5rem;
    color: #92400e;
    line-height: 1.8;
  }

  .info-box-modal li {
    margin-bottom: 0.25rem;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .listings-grid {
      grid-template-columns: 1fr;
    }

    .filter-row {
      grid-template-columns: 1fr;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

  }
</style>
