<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import Navbar from '$lib/components/Navbar.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { listings } from '$lib/data/mockData';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'jastiper') {
      goto('/login?redirect=/jastiper/listings&expected=jastiper');
    }
  });

  const currentJastiperId = 'JST001';
  $: myListings = listings.filter((listing) => listing.jastiperId === currentJastiperId);

  let filter = 'all'; // all, jastip, preloved, event

  $: filteredListings = myListings.filter((listing) => {
    if (filter === 'all') return true;
    return listing.type === filter;
  });

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
      month: 'short',
      year: 'numeric'
    });
  }

  let modalOpen = false;
  let modalTitle = '';
  let modalMessage = '';
  let modalType = 'info';
  let modalShowCancel = false;
  let modalContext = null;

  function openModal({ title, message, type = 'info', showCancel = false, context = null }) {
    modalTitle = title;
    modalMessage = message;
    modalType = type;
    modalShowCancel = showCancel;
    modalContext = context;
    modalOpen = true;
  }

  function handleToggleStatus(listingId) {
    openModal({
      title: 'Ubah status postingan',
      message: `Toggle status untuk listing ${listingId}. (Demo, belum terhubung API)`,
      type: 'info'
    });
  }

  function handleEdit(listingId) {
    goto(`/jastiper/listings/${listingId}/edit`);
  }

  function handleDelete(listingId) {
    openModal({
      title: 'Hapus postingan?',
      message: 'Yakin ingin menghapus postingan ini?',
      type: 'confirm',
      showCancel: true,
      context: { action: 'delete', listingId }
    });
  }

  function handleModalConfirm() {
    if (modalContext?.action === 'delete') {
      // Demo: hanya tampilkan pesan, belum hapus data asli/mock
      openModal({
        title: 'Postingan dihapus',
        message: `Postingan ${modalContext.listingId} dihapus. (Demo, belum terhubung API)`,
        type: 'success'
      });
      modalContext = null;
      return;
    }
    modalOpen = false;
    modalContext = null;
  }

  function handleModalCancel() {
    modalOpen = false;
    modalContext = null;
  }
</script>

<Navbar />

<div class="container">
  <div class="header">
    <div>
      <h1>Postingan Saya</h1>
      <p>Kelola semua postingan jastip, preloved, dan event Anda</p>
    </div>
    <a href="/jastiper/listings/create" class="btn-create">
      <span>+</span>
      Buat Postingan Baru
    </a>
  </div>

  <div class="filters">
    <button class="filter-btn" class:active={filter === 'all'} on:click={() => (filter = 'all')}>
      Semua ({myListings.length})
    </button>
    <button
      class="filter-btn"
      class:active={filter === 'jastip'}
      on:click={() => (filter = 'jastip')}
    >
      Jastip ({myListings.filter((l) => l.type === 'jastip').length})
    </button>
    <button
      class="filter-btn"
      class:active={filter === 'preloved'}
      on:click={() => (filter = 'preloved')}
    >
      Preloved ({myListings.filter((l) => l.type === 'preloved').length})
    </button>
    <button
      class="filter-btn"
      class:active={filter === 'event'}
      on:click={() => (filter = 'event')}
    >
      Event ({myListings.filter((l) => l.type === 'event').length})
    </button>
  </div>

  {#if filteredListings.length === 0}
    <div class="empty-state">
      <span class="empty-icon">📝</span>
      <h3>Belum ada postingan</h3>
      <p>Buat postingan pertama Anda untuk mulai menawarkan jastip</p>
      <a href="/jastiper/listings/create" class="btn-create-empty">Buat Postingan</a>
    </div>
  {:else}
    <div class="listings-grid">
      {#each filteredListings as listing (listing.id)}
        <div class="listing-card">
          <div class="card-header">
            <span
              class="type-badge"
              style="background: {listing.type === 'jastip'
                ? '#0ea5e9'
                : listing.type === 'preloved'
                  ? '#f97316'
                  : '#a855f7'}"
            >
              {listing.type === 'jastip' ? 'Jastip' : listing.type === 'preloved' ? 'Preloved' : 'Event'}
            </span>
            <span
              class="status-badge"
              style="background: {listing.status === 'available' ? '#dcfce7' : '#fee2e2'};
                     color: {listing.status === 'available' ? '#15803d' : '#991b1b'}"
            >
              {listing.status === 'available' ? 'Aktif' : 'Nonaktif'}
            </span>
          </div>

          <div class="card-image">
            {#if listing.images?.length && listing.images[0]?.startsWith('http')}
              <img src={listing.images[0]} alt={listing.title} loading="lazy" />
            {:else}
              <div class="image-placeholder">
                {listing.images?.[0] ?? '📦'}
              </div>
            {/if}
          </div>

          <div class="card-content">
            <h3>{listing.title}</h3>
            <p class="description">{listing.description}</p>

            <div class="meta-grid">
              <div class="meta-item">
                <span class="label">Negara</span>
                <span class="value">{listing.country}</span>
              </div>

              {#if listing.type === 'preloved'}
                <div class="meta-item">
                  <span class="label">Harga</span>
                  <span class="value price">{formatPrice(listing.price)}</span>
                </div>
                <div class="meta-item">
                  <span class="label">Stok</span>
                  <span class="value">{listing.stock}</span>
                </div>
              {:else}
                <div class="meta-item">
                  <span class="label">Berangkat</span>
                  <span class="value">{formatDate(listing.departureDate)}</span>
                </div>
                <div class="meta-item">
                  <span class="label">Fee</span>
                  <span class="value">{listing.fee}%</span>
                </div>
                <div class="meta-item">
                  <span class="label">Slot</span>
                  <span class="value">{listing.sold}/{listing.quota}</span>
                </div>
              {/if}
            </div>

            {#if listing.type !== 'preloved'}
              <div class="quota-bar">
                <div
                  class="quota-fill"
                  style="width: {(listing.sold / listing.quota) * 100}%"
                ></div>
              </div>
            {/if}

            <div class="card-actions">
              <button class="btn-action" on:click={() => handleEdit(listing.id)}>Edit</button>
              <button
                class="btn-action toggle"
                on:click={() => handleToggleStatus(listing.id)}
              >
                {listing.status === 'available' ? 'Nonaktifkan' : 'Aktifkan'}
              </button>
              <button class="btn-action delete" on:click={() => handleDelete(listing.id)}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<Modal
  bind:isOpen={modalOpen}
  type={modalType}
  title={modalTitle}
  message={modalMessage}
  showCancel={modalShowCancel}
  cancelText="Batal"
  confirmText="OK"
  on:confirm={handleModalConfirm}
  on:cancel={handleModalCancel}
/>

<style>
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
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

  .btn-create {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.2s;
  }

  .btn-create:hover {
    transform: scale(1.05);
  }

  .btn-create span {
    font-size: 1.5rem;
    line-height: 1;
  }

  .filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    background: white;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .filter-btn {
    padding: 0.75rem 1.5rem;
    border: 2px solid #e2e8f0;
    background: white;
    border-radius: 8px;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s;
  }

  .filter-btn:hover {
    border-color: #086adf;
    color: #086adf;
  }

  .filter-btn.active {
    border-color: #086adf;
    background: #eff6ff;
    color: #086adf;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .empty-icon {
    font-size: 4rem;
    display: block;
    margin-bottom: 1rem;
  }

  .empty-state h3 {
    font-size: 1.5rem;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .empty-state p {
    color: #64748b;
    margin-bottom: 2rem;
  }

  .btn-create-empty {
    display: inline-block;
    padding: 0.875rem 1.75rem;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
  }

  .listings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .listing-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
  }

  .listing-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background: #f8fafc;
  }

  .type-badge,
  .status-badge {
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .type-badge {
    color: white;
  }

  .card-image {
    position: relative;
    width: 100%;
    height: 200px;
    background: #e5e7eb;
    overflow: hidden;
  }

  .card-image img {
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

  .card-content {
    padding: 1.25rem;
  }

  .card-content h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  .description {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .label {
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 600;
  }

  .value {
    font-size: 0.9rem;
    color: #1f2937;
    font-weight: 600;
  }

  .value.price {
    color: #0ea5e9;
    font-size: 1rem;
  }

  .quota-bar {
    height: 6px;
    background: #e2e8f0;
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .quota-fill {
    height: 100%;
    background: linear-gradient(90deg, #086adf, #0ea5e9);
    border-radius: 999px;
    transition: width 0.3s;
  }

  .card-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .btn-action {
    padding: 0.6rem 1rem;
    border: 2px solid #e2e8f0;
    background: white;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-action:hover {
    border-color: #086adf;
    color: #086adf;
  }

  .btn-action.toggle {
    border-color: #f97316;
    color: #f97316;
  }

  .btn-action.toggle:hover {
    background: #fff7ed;
  }

  .btn-action.delete {
    border-color: #ef4444;
    color: #ef4444;
  }

  .btn-action.delete:hover {
    background: #fef2f2;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header {
      flex-direction: column;
      gap: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .filters {
      flex-wrap: wrap;
    }

    .listings-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
