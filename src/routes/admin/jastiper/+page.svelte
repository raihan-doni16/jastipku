<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import RatingStars from '$lib/components/RatingStars.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { jastipers } from '$lib/data/mockData';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'admin') {
      goto('/login?redirect=/admin/jastiper&expected=admin');
    }
  });

  let searchQuery = '';
  let filterStatus = 'all';

  $: filteredJastipers = jastipers.filter((jastiper) => {
    const matchSearch =
      searchQuery === '' ||
      jastiper.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jastiper.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = filterStatus === 'all' || jastiper.status === filterStatus;

    return matchSearch && matchStatus;
  });

  let selectedJastiper = null;
  let showDetailModal = false;
  let showSuspendModal = false;
  let suspendReason = '';
  let suspendDuration = '7';

  const suspendDurationOptions = [
    { value: '7', label: '7 hari' },
    { value: '14', label: '14 hari' },
    { value: '30', label: '30 hari' },
    { value: 'permanent', label: 'Permanent' }
  ];

  function handleViewDetail(jastiper) {
    selectedJastiper = jastiper;
    showDetailModal = true;
  }

  function closeDetailModal() {
    showDetailModal = false;
  }

  function handleOverlayKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      closeDetailModal();
    }
  }

  function handleModalKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  function handleVerify(jastiperId) {
    if (confirm('Yakin ingin memverifikasi jastiper ini?')) {
      alert(`Jastiper ${jastiperId} telah diverifikasi!`);
      showDetailModal = false;
    }
  }

  function handleReject(jastiperId) {
    if (confirm('Yakin ingin menolak jastiper ini?')) {
      alert(`Jastiper ${jastiperId} ditolak`);
      showDetailModal = false;
    }
  }

  function openSuspendModal() {
    suspendReason = '';
    suspendDuration = '7';
    showSuspendModal = true;
  }

  function formatSuspendDuration(value) {
    const found = suspendDurationOptions.find((option) => option.value === value);
    return found ? found.label : value;
  }

  function handleSuspendSubmit() {
    if (!selectedJastiper) {
      return;
    }
    if (suspendReason.trim() === '') {
      alert('Mohon isi alasan suspend');
      return;
    }
    alert(
      `Jastiper ${selectedJastiper.id} di-suspend (${formatSuspendDuration(
        suspendDuration
      )}).\nAlasan: ${suspendReason}`
    );
    showSuspendModal = false;
    showDetailModal = false;
  }
</script>

<div class="container">
  <div class="header">
    <div>
      <h1>Verifikasi & Manajemen Jastiper</h1>
      <p>Kelola dan verifikasi semua jastiper di platform</p>
    </div>
  </div>

  <div class="stats-cards">
    <div class="stat-card">
      <span class="stat-icon verified">✓</span>
      <div class="stat-content">
        <span class="stat-number">{jastipers.filter((j) => j.verified).length}</span>
        <span class="stat-label">Terverifikasi</span>
      </div>
    </div>
    <div class="stat-card">
      <span class="stat-icon pending">⏳</span>
      <div class="stat-content">
        <span class="stat-number">{jastipers.filter((j) => !j.verified).length}</span>
        <span class="stat-label">Menunggu Verifikasi</span>
      </div>
    </div>
    <div class="stat-card">
      <span class="stat-icon total">👥</span>
      <div class="stat-content">
        <span class="stat-number">{jastipers.length}</span>
        <span class="stat-label">Total Jastiper</span>
      </div>
    </div>
  </div>

  <div class="filters">
    <input
      type="text"
      placeholder="Cari nama jastiper atau email..."
      bind:value={searchQuery}
      class="search-input"
    />

    <div class="filter-buttons">
      <button
        class="filter-btn"
        class:active={filterStatus === 'all'}
        on:click={() => (filterStatus = 'all')}
      >
        Semua ({jastipers.length})
      </button>
      <button
        class="filter-btn"
        class:active={filterStatus === 'verified'}
        on:click={() => (filterStatus = 'verified')}
      >
        Terverifikasi ({jastipers.filter((j) => j.status === 'verified').length})
      </button>
      <button
        class="filter-btn"
        class:active={filterStatus === 'pending'}
        on:click={() => (filterStatus = 'pending')}
      >
        Pending ({jastipers.filter((j) => j.status === 'pending').length})
      </button>
    </div>
  </div>

  <div class="jastipers-grid">
    {#each filteredJastipers as jastiper (jastiper.id)}
      <div class="jastiper-card">
        <div class="card-header">
          <span class="jastiper-id">{jastiper.id}</span>
          <span
            class="status-badge"
            style="background: {jastiper.verified ? '#dcfce7' : '#fef3c7'};
                   color: {jastiper.verified ? '#15803d' : '#92400e'}"
          >
            {jastiper.verified ? '✓ Verified' : '⏳ Pending'}
          </span>
        </div>

        <div class="jastiper-profile">
          <div class="avatar">{jastiper.avatar}</div>
          <div class="profile-info">
            <h3>{jastiper.name}</h3>
            <div class="rating">
              <RatingStars rating={jastiper.rating} />
              <span class="rating-value">{jastiper.rating}</span>
            </div>
          </div>
        </div>

        <div class="jastiper-meta">
          <div class="meta-item">
            <span class="label">Negara</span>
            <span class="value">{jastiper.country}</span>
          </div>
          <div class="meta-item">
            <span class="label">Total Trip</span>
            <span class="value">{jastiper.totalTrips}</span>
          </div>
          <div class="meta-item">
            <span class="label">Email</span>
            <span class="value">{jastiper.email}</span>
          </div>
          <div class="meta-item">
            <span class="label">Telepon</span>
            <span class="value">{jastiper.phone}</span>
          </div>
        </div>

        <button class="btn-detail" on:click={() => handleViewDetail(jastiper)}>
          Lihat Detail & Verifikasi
        </button>
      </div>
    {/each}
  </div>

  {#if filteredJastipers.length === 0}
    <div class="empty-state">
      <span class="empty-icon">🔍</span>
      <p>Tidak ada jastiper ditemukan</p>
    </div>
  {/if}
</div>

<!-- Detail Modal -->
{#if showDetailModal && selectedJastiper}
  <div
    class="modal-overlay"
    role="button"
    tabindex="0"
    aria-label="Tutup detail jastiper"
    on:click={closeDetailModal}
    on:keydown={handleOverlayKeydown}
  >
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      on:click|stopPropagation
      on:keydown={handleModalKeydown}
    >
      <div class="modal-header">
        <h3>Detail Jastiper - {selectedJastiper.name}</h3>
        <button class="close-btn" on:click={closeDetailModal}>×</button>
      </div>

      <div class="modal-content">
        <div class="detail-section">
          <h4>Informasi Pribadi</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">ID</span>
              <span class="detail-value">{selectedJastiper.id}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Nama Lengkap</span>
              <span class="detail-value">{selectedJastiper.name}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Email</span>
              <span class="detail-value">{selectedJastiper.email}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Telepon</span>
              <span class="detail-value">{selectedJastiper.phone}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h4>Dokumen Perjalanan</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Nomor Paspor</span>
              <span class="detail-value">{selectedJastiper.passport}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Negara Tujuan</span>
              <span class="detail-value">{selectedJastiper.country}</span>
            </div>
          </div>
          <div class="passport-preview">
            <p>📄 Preview Paspor: (Coming soon)</p>
          </div>
        </div>

        <div class="detail-section">
          <h4>Statistik</h4>
          <div class="stats-row">
            <div class="stat-box">
              <span class="stat-label">Rating</span>
              <span class="stat-value">{selectedJastiper.rating}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">Total Trip</span>
              <span class="stat-value">{selectedJastiper.totalTrips}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">Status</span>
              <span class="stat-value">
                {selectedJastiper.verified ? 'Verified' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          {#if !selectedJastiper.verified}
            <button class="btn-verify" on:click={() => handleVerify(selectedJastiper.id)}>
              ✓ Verifikasi
            </button>
            <button class="btn-reject" on:click={() => handleReject(selectedJastiper.id)}>
              ✗ Tolak
            </button>
          {:else}
            <button class="btn-suspend" on:click={openSuspendModal}>
              ⚠ Suspend
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<Modal
  bind:isOpen={showSuspendModal}
  title="Suspend Jastiper"
  showCancel={true}
  cancelText="Batal"
  confirmText="Suspend Sekarang"
  autoCloseOnConfirm={false}
  maxWidth="520px"
  on:cancel={() => (showSuspendModal = false)}
  on:confirm={handleSuspendSubmit}
>
  {#if selectedJastiper}
    <div class="suspend-modal">
      <p>
        Tentukan durasi dan alasan suspend untuk
        <strong>{selectedJastiper.name}</strong>
      </p>

      <div class="form-group">
        <label>Durasi Suspend</label>
        <select bind:value={suspendDuration}>
          {#each suspendDurationOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>

      <div class="form-group">
        <label>Alasan Suspend</label>
        <textarea
          rows="4"
          placeholder="Tulis alasan lengkap untuk suspend jastiper ini..."
          bind:value={suspendReason}
        ></textarea>
      </div>
    </div>
  {/if}
</Modal>

<style>
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .header {
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
    flex-shrink: 0;
  }

  .stat-icon.verified {
    background: #dcfce7;
    color: #15803d;
  }

  .stat-icon.pending {
    background: #fef3c7;
    color: #92400e;
  }

  .stat-icon.total {
    background: #eff6ff;
    color: #1e40af;
  }

  .stat-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 800;
    color: #0f172a;
  }

  .stat-label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 600;
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
    padding: 0.875rem 1.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    margin-bottom: 1rem;
    transition: border-color 0.2s;
  }

  .search-input:focus {
    outline: none;
    border-color: #086adf;
  }

  .filter-buttons {
    display: flex;
    gap: 1rem;
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

  .jastipers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .jastiper-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
  }

  .jastiper-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .jastiper-id {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 600;
  }

  .status-badge {
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .jastiper-profile {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .avatar {
    font-size: 3rem;
  }

  .profile-info h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
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

  .jastiper-meta {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
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

  .btn-detail {
    width: 100%;
    padding: 0.875rem 1.5rem;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .btn-detail:hover {
    transform: scale(1.02);
  }

  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
  }

  .empty-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
  }

  .empty-state p {
    color: #94a3b8;
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    border-radius: 12px;
    max-width: 700px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .modal-header h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    color: #64748b;
    cursor: pointer;
    line-height: 1;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .detail-section {
    margin-bottom: 2rem;
  }

  .detail-section h4 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .detail-label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 600;
  }

  .detail-value {
    font-size: 1rem;
    color: #1f2937;
    font-weight: 600;
  }

  .passport-preview {
    margin-top: 1rem;
    padding: 2rem;
    background: #f8fafc;
    border: 2px dashed #cbd5e1;
    border-radius: 8px;
    text-align: center;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .stat-box {
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
    text-align: center;
  }

  .stat-box .stat-label {
    display: block;
    font-size: 0.75rem;
    color: #64748b;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    font-weight: 600;
  }

  .stat-box .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  .action-buttons button {
    flex: 1;
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .action-buttons button:hover {
    transform: scale(1.02);
  }

  .btn-verify {
    background: linear-gradient(135deg, #22c55e, #10b981);
    color: white;
  }

  .btn-reject {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
  }

  .btn-suspend {
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
  }

  .suspend-modal {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .suspend-modal p {
    margin: 0;
    color: #475569;
    line-height: 1.5;
  }

  .suspend-modal .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .suspend-modal label {
    font-weight: 600;
    color: #1f2937;
  }

  .suspend-modal select,
  .suspend-modal textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s;
  }

  .suspend-modal textarea {
    resize: vertical;
  }

  .suspend-modal select:focus,
  .suspend-modal textarea:focus {
    outline: none;
    border-color: #086adf;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .jastipers-grid {
      grid-template-columns: 1fr;
    }

    .detail-grid,
    .stats-row {
      grid-template-columns: 1fr;
    }
  }
</style>
