<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';
  import { authStore } from '$lib/stores/auth';
  import { listings, popularCountries } from '$lib/data/mockData';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  $: listingId = $page.params.id;
  $: listing = listings.find((item) => item.id === listingId);

  let postType = 'jastip';
  let isInitialized = false;
  let formData = createEmptyForm();

  const categoryOptions = [
    'Kosmetik',
    'Fashion',
    'Elektronik',
    'Gadget',
    'Gaming',
    'Skincare',
    'Tas',
    'Branded',
    'Sepatu',
    'Makanan',
    'Obat-obatan',
    'Buku',
    'Mainan'
  ];

  const conditionOptions = ['Seperti Baru', 'Sangat Baik', 'Baik', 'Cukup Baik'];

  onMount(() => {
    if (currentRole !== 'jastiper') {
      goto(`/login?redirect=/jastiper/listings/${listingId}/edit&expected=jastiper`);
    }
  });

  $: if (listing && !isInitialized) {
    postType = listing.type ?? 'jastip';
    formData = buildFormDataFromListing(listing);
    isInitialized = true;
  }

  function createEmptyForm() {
    return {
      title: '',
      description: '',
      country: '',
      countryCode: '',
      stores: [''],
      categories: [''],
      departureDate: '',
      returnDate: '',
      estimateDelivery: '',
      fee: 15,
      minOrder: 0,
      quota: 1,
      price: 0,
      originalPrice: 0,
      condition: 'Sangat Baik',
      stock: 1,
      eventType: 'sale'
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

  function addStore() {
    formData.stores = [...formData.stores, ''];
  }

  function removeStore(index) {
    if (formData.stores.length === 1) return;
    formData.stores = formData.stores.filter((_, i) => i !== index);
  }

  function addCategory() {
    formData.categories = [...formData.categories, ''];
  }

  function removeCategory(index) {
    if (formData.categories.length === 1) return;
    formData.categories = formData.categories.filter((_, i) => i !== index);
  }

  function handleCountryChange() {
    const country = popularCountries.find((c) => c.code === formData.countryCode);
    formData.country = country ? country.name : '';
  }

  function validateForm() {
    if (!formData.title || !formData.description || !formData.countryCode) {
      alert('Harap lengkapi data wajib!');
      return false;
    }

    if (postType === 'jastip' || postType === 'event') {
      if (
        !formData.departureDate ||
        !formData.returnDate ||
        !formData.estimateDelivery ||
        !formData.fee ||
        !formData.quota
      ) {
        alert('Lengkapi data perjalanan terlebih dahulu.');
        return false;
      }

      const validStores = formData.stores.filter((s) => s.trim() !== '');
      if (validStores.length === 0) {
        alert('Harap tambahkan minimal 1 toko.');
        return false;
      }
    }

    if (postType === 'preloved') {
      if (!formData.price || !formData.condition) {
        alert('Harap lengkapi data preloved!');
        return false;
      }
    }

    const validCategories = formData.categories.filter((c) => c.trim() !== '');
    if (validCategories.length === 0) {
      alert('Harap pilih minimal 1 kategori.');
      return false;
    }

    return true;
  }

  function handleSubmit() {
    if (!listing) {
      alert('Postingan tidak ditemukan.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    const updatedListing = {
      ...listing,
      type: postType,
      title: formData.title,
      description: formData.description,
      country: formData.country,
      countryCode: formData.countryCode,
      categories: formData.categories.filter((c) => c.trim() !== ''),
      stores: formData.stores.filter((s) => s.trim() !== ''),
      departureDate: formData.departureDate,
      returnDate: formData.returnDate,
      estimateDelivery: formData.estimateDelivery,
      fee: formData.fee,
      minOrder: formData.minOrder,
      quota: formData.quota,
      price: formData.price,
      originalPrice: formData.originalPrice,
      condition: formData.condition,
      stock: formData.stock,
      eventType: formData.eventType
    };

    console.log('Updated listing:', updatedListing);
    alert(`Postingan ${listing.id} berhasil diperbarui!`);
    goto('/jastiper/listings');
  }

  function resetChanges() {
    if (listing) {
      formData = buildFormDataFromListing(listing);
      postType = listing.type ?? 'jastip';
    }
  }
</script>

<svelte:head>
  <title>Edit Postingan {listingId} | Jastipku</title>
</svelte:head>

<Navbar />

{#if listing}
  <div class="container">
    <div class="header">
      <div>
        <p class="breadcrumb">Dashboard / Postingan / {listing.title}</p>
        <h1>Edit Postingan</h1>
        <p>Perbarui detail postingan sebelum disimpan</p>
      </div>
      <div class="header-meta">
        <span class="badge">ID {listing.id}</span>
        <button class="link-button" on:click={() => goto('/jastiper/listings')}>�+? Kembali</button>
      </div>
    </div>

    <div class="form-container">
      <div class="type-selector">
        <button
          class="type-btn"
          class:active={postType === 'jastip'}
          on:click={() => (postType = 'jastip')}
        >
          <span class="type-icon">✈️</span>
          <span class="type-label">Jastip</span>
        </button>
        <button
          class="type-btn"
          class:active={postType === 'preloved'}
          on:click={() => (postType = 'preloved')}
        >
          <span class="type-icon">👜</span>
          <span class="type-label">Preloved</span>
        </button>
        <button
          class="type-btn"
          class:active={postType === 'event'}
          on:click={() => (postType = 'event')}
        >
          <span class="type-icon">🎉</span>
          <span class="type-label">Event</span>
        </button>
      </div>

      <div class="form-card">
        <h2>Informasi Dasar</h2>

        <div class="form-group">
          <label for="listing-title">Judul Postingan *</label>
          <input
            id="listing-title"
            type="text"
            bind:value={formData.title}
            placeholder="Contoh: Jastip Korea - Kosmetik & Fashion"
          />
        </div>

        <div class="form-group">
          <label for="listing-description">Deskripsi *</label>
          <textarea
            id="listing-description"
            bind:value={formData.description}
            placeholder="Jelaskan detail postingan Anda..."
            rows="5"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="listing-country">Negara *</label>
            <select
              id="listing-country"
              bind:value={formData.countryCode}
              on:change={handleCountryChange}
            >
              <option value="" disabled hidden></option>
              <option value="">Pilih Negara</option>
              {#each popularCountries as country}
                <option value={country.code}>{country.flag} {country.name}</option>
              {/each}
            </select>
          </div>

          <div class="form-group">
            <label for="category-0">Kategori *</label>
            <div class="multi-input">
              {#each formData.categories as category, index}
                <div class="input-row">
                  <select id={`category-${index}`} bind:value={formData.categories[index]}>
                    <option value="" disabled hidden></option>
                    <option value="">Pilih Kategori</option>
                    {#each categoryOptions as cat}
                      <option value={cat}>{cat}</option>
                    {/each}
                  </select>
                  {#if formData.categories.length > 1}
                    <button class="btn-remove" on:click={() => removeCategory(index)}>�</button>
                  {/if}
                </div>
              {/each}
              <button class="btn-add" on:click={addCategory}>+ Tambah Kategori</button>
            </div>
          </div>
        </div>

        {#if postType === 'jastip' || postType === 'event'}
          <hr />
          <h2>{postType === 'event' ? 'Informasi Event' : 'Informasi Jastip'}</h2>

          <div class="form-group">
            <label for="store-0">Toko yang Tersedia *</label>
            <div class="multi-input">
              {#each formData.stores as store, index}
                <div class="input-row">
                  <input
                    id={`store-${index}`}
                    type="text"
                    bind:value={formData.stores[index]}
                    placeholder="Nama toko"
                  />
                  {#if formData.stores.length > 1}
                    <button class="btn-remove" on:click={() => removeStore(index)}>�</button>
                  {/if}
                </div>
              {/each}
              <button class="btn-add" on:click={addStore}>+ Tambah Toko</button>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="departure-date">Tanggal Berangkat *</label>
              <input id="departure-date" type="date" bind:value={formData.departureDate} />
            </div>

            <div class="form-group">
              <label for="return-date">Tanggal Kembali *</label>
              <input id="return-date" type="date" bind:value={formData.returnDate} />
            </div>

            <div class="form-group">
              <label for="estimate-delivery">Estimasi Pengiriman *</label>
              <input
                id="estimate-delivery"
                type="date"
                bind:value={formData.estimateDelivery}
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="fee-percent">Fee (%) *</label>
              <input
                id="fee-percent"
                type="number"
                bind:value={formData.fee}
                placeholder="15"
                min="0"
                max="100"
              />
              <span class="hint">Fee yang dikenakan dari harga barang</span>
            </div>

            <div class="form-group">
              <label for="min-order">Minimal Order (IDR) *</label>
              <input
                id="min-order"
                type="number"
                bind:value={formData.minOrder}
                placeholder="100000"
                min="0"
              />
            </div>

            <div class="form-group">
              <label for="quota-slot">Quota/Slot *</label>
              <input
                id="quota-slot"
                type="number"
                bind:value={formData.quota}
                placeholder="10"
                min="1"
              />
            </div>
          </div>

          {#if postType === 'event'}
            <div class="form-group">
              <label for="event-type">Tipe Event</label>
              <select id="event-type" bind:value={formData.eventType}>
                <option value="sale">Sale Event</option>
                <option value="preorder">Pre-Order</option>
                <option value="limited">Limited Edition</option>
                <option value="seasonal">Seasonal</option>
              </select>
            </div>
          {/if}
        {/if}

        {#if postType === 'preloved'}
          <hr />
          <h2>Informasi Preloved</h2>

          <div class="form-row">
            <div class="form-group">
              <label for="selling-price">Harga Jual (IDR) *</label>
              <input
                id="selling-price"
                type="number"
                bind:value={formData.price}
                placeholder="2500000"
                min="0"
              />
            </div>

            <div class="form-group">
              <label for="original-price">Harga Asli (IDR)</label>
              <input
                id="original-price"
                type="number"
                bind:value={formData.originalPrice}
                placeholder="4500000"
                min="0"
              />
              <span class="hint">Opsional, untuk menampilkan diskon</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="condition">Kondisi Barang *</label>
              <select id="condition" bind:value={formData.condition}>
                {#each conditionOptions as cond}
                  <option value={cond}>{cond}</option>
                {/each}
              </select>
            </div>

            <div class="form-group">
              <label for="stock">Stok *</label>
              <input id="stock" type="number" bind:value={formData.stock} placeholder="1" min="1" />
            </div>
          </div>
        {/if}

        <div class="form-actions">
          <button class="btn-cancel" on:click={() => goto('/jastiper/listings')}>Batalkan</button>
          <button class="btn-secondary" on:click={resetChanges}>Reset Perubahan</button>
          <button class="btn-submit" on:click={handleSubmit}>Simpan Perubahan</button>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="empty-state">
    <h2>Postingan tidak ditemukan</h2>
    <p>Periksa kembali tautan atau kembali ke daftar postingan.</p>
    <button class="btn-submit" on:click={() => goto('/jastiper/listings')}>
      �+? Kembali ke daftar
    </button>
  </div>
{/if}

<style>
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }

  .header {
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
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
    margin: 0;
  }

  .breadcrumb {
    font-size: 0.9rem;
    color: #94a3b8;
    margin-bottom: 0.25rem;
  }

  .header-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: #e0f2fe;
    color: #0369a1;
    font-weight: 600;
  }

  .link-button {
    border: none;
    background: none;
    color: #0ea5e9;
    font-weight: 600;
    cursor: pointer;
  }

  .form-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .type-selector {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: #f8fafc;
    padding: 1rem;
    gap: 1rem;
  }

  .type-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem 1rem;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .type-btn:hover {
    border-color: #086adf;
    transform: translateY(-2px);
  }

  .type-btn.active {
    border-color: #086adf;
    background: #eff6ff;
  }

  .type-icon {
    font-size: 2.5rem;
  }

  .type-label {
    font-weight: 700;
    color: #1f2937;
    font-size: 1.125rem;
  }

  .type-btn.active .type-label {
    color: #086adf;
  }

  .form-card {
    padding: 2rem;
  }

  .form-card h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s;
    box-sizing: border-box;
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
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .form-row .form-group {
    margin-bottom: 0;
  }

  .hint {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #64748b;
  }

  .multi-input {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .input-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .input-row input,
  .input-row select {
    flex: 1;
  }

  .btn-remove {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    background: #fee2e2;
    border: none;
    border-radius: 8px;
    color: #ef4444;
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;
    line-height: 1;
  }

  .btn-remove:hover {
    background: #fecaca;
  }

  .btn-add {
    padding: 0.75rem 1rem;
    background: #eff6ff;
    border: 2px dashed #086adf;
    border-radius: 8px;
    color: #086adf;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-add:hover {
    background: #dbeafe;
  }

  hr {
    border: none;
    height: 1px;
    background: #e2e8f0;
    margin: 2rem 0;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e2e8f0;
  }

  .btn-cancel,
  .btn-secondary,
  .btn-submit {
    padding: 0.875rem 2rem;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .btn-cancel {
    background: #f1f5f9;
    color: #64748b;
  }

  .btn-secondary {
    background: #fff7ed;
    color: #c2410c;
  }

  .btn-submit {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .btn-submit:hover {
    transform: scale(1.02);
  }

  .empty-state {
    max-width: 600px;
    margin: 4rem auto;
    background: white;
    border-radius: 16px;
    padding: 3rem;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  .empty-state h2 {
    margin-bottom: 0.5rem;
    color: #0f172a;
  }

  .empty-state p {
    color: #64748b;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header {
      flex-direction: column;
      align-items: flex-start;
    }

    .type-selector {
      grid-template-columns: 1fr;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .form-actions {
      flex-direction: column;
      align-items: stretch;
    }

    .btn-cancel,
    .btn-secondary,
    .btn-submit {
      width: 100%;
    }
  }
</style>
