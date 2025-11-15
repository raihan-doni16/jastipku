<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import Modal from '$lib/components/Modal.svelte';
  import { listings } from '$lib/data/mockData';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'admin') {
      goto('/login?redirect=/admin/posts&expected=admin');
      return;
    }
  });

  let filterType = 'all';
  let filterStatus = 'all';
  let searchQuery = '';

  const typeOptions = [
    { value: 'all', label: 'Semua Tipe' },
    { value: 'jastip', label: 'Jastip' },
    { value: 'preloved', label: 'Preloved' },
    { value: 'event', label: 'Event' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'active', label: 'Aktif' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'rejected', label: 'Ditolak' }
  ];

  // Add status to listings
  let allListings = listings.map((l) => ({
    ...l,
    status: 'active',
    reportCount: Math.floor(Math.random() * 5),
    views: Math.floor(Math.random() * 1000) + 100
  }));

  $: filteredListings = allListings.filter((listing) => {
    const matchType = filterType === 'all' || listing.type === filterType;
    const matchStatus = filterStatus === 'all' || listing.status === filterStatus;
    const matchSearch =
      searchQuery === '' ||
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.jastiperName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }

  function getTypeLabel(type) {
    return typeOptions.find((t) => t.value === type)?.label || type;
  }

  function getTypeBadgeColor(type) {
    if (type === 'jastip') return '#0ea5e9';
    if (type === 'preloved') return '#f97316';
    if (type === 'event') return '#a855f7';
    return '#64748b';
  }

  function getStatusBadge(status) {
    const badges = {
      active: { label: 'Aktif', color: '#10b981' },
      pending: { label: 'Pending', color: '#f59e0b' },
      suspended: { label: 'Suspended', color: '#ef4444' },
      rejected: { label: 'Ditolak', color: '#dc2626' }
    };
    return badges[status] || { label: status, color: '#64748b' };
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

  function suspendPost(id, title) {
    openModal({
      title: 'Suspend postingan',
      message: `Suspend postingan "${title}"?`,
      type: 'confirm',
      showCancel: true,
      context: { action: 'suspend', id, title }
    });
  }

  function activatePost(id, title) {
    openModal({
      title: 'Aktifkan postingan',
      message: `Aktifkan kembali postingan "${title}"?`,
      type: 'confirm',
      showCancel: true,
      context: { action: 'activate', id, title }
    });
  }

  function deletePost(id, title) {
    openModal({
      title: 'Hapus postingan',
      message: `Hapus postingan "${title}" secara permanen?`,
      type: 'confirm',
      showCancel: true,
      context: { action: 'delete', id, title }
    });
  }

  function handleModalConfirm() {
    if (modalContext?.action === 'suspend') {
      openModal({
        title: 'Postingan di-suspend',
        message: `Postingan "${modalContext.title}" telah di-suspend. (Demo, belum terhubung API)`,
        type: 'success'
      });
    } else if (modalContext?.action === 'activate') {
      openModal({
        title: 'Postingan diaktifkan',
        message: `Postingan "${modalContext.title}" telah diaktifkan. (Demo, belum terhubung API)`,
        type: 'success'
      });
    } else if (modalContext?.action === 'delete') {
      openModal({
        title: 'Postingan dihapus',
        message: `Postingan "${modalContext.title}" telah dihapus. (Demo, belum terhubung API)`,
        type: 'success'
      });
    } else {
      modalOpen = false;
    }
    modalContext = null;
  }

  function handleModalCancel() {
    modalOpen = false;
    modalContext = null;
  }
</script>

<div class="container">
  <div class="header">
    <h1>Manajemen Postingan</h1>
    <p>Moderasi semua postingan dari jastiper</p>
  </div>

  <div class="stats-cards">
    <div class="stat-card">
      <div class="stat-icon" style="background: #d1fae5;">📝</div>
      <div class="stat-content">
        <div class="stat-value">{allListings.length}</div>
        <div class="stat-label">Total Postingan</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #dbeafe;">✅</div>
      <div class="stat-content">
        <div class="stat-value">
          {allListings.filter((l) => l.status === 'active').length}
        </div>
        <div class="stat-label">Aktif</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #fef3c7;">⏳</div>
      <div class="stat-content">
        <div class="stat-value">
          {allListings.filter((l) => l.status === 'pending').length}
        </div>
        <div class="stat-label">Pending Review</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #fee2e2;">🚫</div>
      <div class="stat-content">
        <div class="stat-value">
          {allListings.filter((l) => l.status === 'suspended').length}
        </div>
        <div class="stat-label">Suspended</div>
      </div>
    </div>
  </div>

  <div class="filters">
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Cari judul postingan atau jastiper..."
        bind:value={searchQuery}
      />
    </div>
    <select bind:value={filterType}>
      {#each typeOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
    <select bind:value={filterStatus}>
      {#each statusOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  </div>

  <div class="results-info">
    Menampilkan {filteredListings.length} dari {allListings.length} postingan
  </div>

  <div class="listings-grid">
    {#each filteredListings as listing (listing.id)}
      <div class="listing-card">
        <div class="card-header">
          <div
            class="type-badge"
            style="background-color: {getTypeBadgeColor(listing.type)};"
          >
            {getTypeLabel(listing.type)}
          </div>
          <div
            class="status-badge"
            style="background-color: {getStatusBadge(listing.status).color};"
          >
            {getStatusBadge(listing.status).label}
          </div>
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
          <h3 class="listing-title">{listing.title}</h3>
          <p class="listing-description">{listing.description}</p>

          <div class="jastiper-info">
            <span class="avatar">
              <img src={listing.jastiperAvatar} alt={listing.jastiperName} loading="lazy" />
            </span>
            <span class="jastiper-name">{listing.jastiperName}</span>
          </div>

          <div class="stats-row">
            <div class="stat-item">
              <span class="stat-icon">👁️</span>
              <span class="stat-text">{listing.views} views</span>
            </div>
            <div class="stat-item">
              <span class="stat-icon">🛒</span>
              <span class="stat-text">{listing.sold} sold</span>
            </div>
            {#if listing.reportCount > 0}
              <div class="stat-item warning">
                <span class="stat-icon">⚠️</span>
                <span class="stat-text">{listing.reportCount} reports</span>
              </div>
            {/if}
          </div>

          <div class="meta-info">
            <div class="meta-item">
              <span class="meta-label">Negara:</span>
              <span class="meta-value">{listing.country}</span>
            </div>
            {#if listing.type === 'preloved'}
              <div class="meta-item">
                <span class="meta-label">Harga:</span>
                <span class="meta-value">{formatPrice(listing.price)}</span>
              </div>
            {:else}
              <div class="meta-item">
                <span class="meta-label">Fee:</span>
                <span class="meta-value">{listing.fee}%</span>
              </div>
            {/if}
          </div>
        </div>

        <div class="card-actions">
          <button class="btn-view" on:click={() => goto(`/browse/${listing.id}`)}>
            👁️ Lihat
          </button>
          {#if listing.status === 'active'}
            <button class="btn-suspend" on:click={() => suspendPost(listing.id, listing.title)}>
              🚫 Suspend
            </button>
          {:else if listing.status === 'suspended'}
            <button class="btn-activate" on:click={() => activatePost(listing.id, listing.title)}>
              ✅ Aktifkan
            </button>
          {/if}
          <button class="btn-delete" on:click={() => deletePost(listing.id, listing.title)}>
            🗑️ Hapus
          </button>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredListings.length === 0}
    <div class="empty-state">
      <div class="empty-icon">📝</div>
      <h3>Tidak ada postingan</h3>
      <p>Tidak ada postingan yang cocok dengan filter</p>
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
    min-height: calc(100vh - 80px);
  }

  .header {
    text-align: center;
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

  .stats-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }

  .stat-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: #0f172a;
  }

  .stat-label {
    font-size: 0.875rem;
    color: #64748b;
  }

  .filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .search-box {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    font-size: 1.25rem;
  }

  .search-box input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .search-box input:focus {
    outline: none;
    border-color: #086adf;
  }

  select {
    padding: 1rem 1.5rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    background: white;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  select:focus {
    outline: none;
    border-color: #086adf;
  }

  .results-info {
    font-size: 0.95rem;
    color: #64748b;
    margin-bottom: 1.5rem;
  }

  .listings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .listing-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
    display: flex;
    flex-direction: column;
  }

  .listing-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background: #f8fafc;
  }

  .type-badge,
  .status-badge {
    padding: 0.375rem 0.875rem;
    border-radius: 999px;
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .card-image {
    width: 100%;
    height: 180px;
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
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
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .listing-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.4;
    margin: 0;
  }

  .listing-description {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .jastiper-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    background: #e5e7eb;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .jastiper-name {
    font-weight: 600;
    color: #475569;
    font-size: 0.9rem;
  }

  .stats-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.875rem;
    color: #64748b;
  }

  .stat-item.warning {
    color: #dc2626;
    font-weight: 600;
  }

  .stat-icon {
    font-size: 1rem;
  }

  .meta-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
  }

  .meta-item {
    display: flex;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  .meta-label {
    color: #94a3b8;
    font-weight: 600;
  }

  .meta-value {
    color: #475569;
    font-weight: 600;
  }

  .card-actions {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    border-top: 2px solid #f1f5f9;
  }

  .card-actions button {
    flex: 1;
    padding: 0.625rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .btn-view {
    background: #dbeafe;
    color: #1e40af;
  }

  .btn-view:hover {
    background: #bfdbfe;
  }

  .btn-suspend {
    background: #fee2e2;
    color: #991b1b;
  }

  .btn-suspend:hover {
    background: #fecaca;
  }

  .btn-activate {
    background: #d1fae5;
    color: #065f46;
  }

  .btn-activate:hover {
    background: #a7f3d0;
  }

  .btn-delete {
    background: #fef3c7;
    color: #92400e;
  }

  .btn-delete:hover {
    background: #fde68a;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .stats-cards {
      grid-template-columns: repeat(2, 1fr);
    }

    .filters {
      flex-direction: column;
    }

    .listings-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
