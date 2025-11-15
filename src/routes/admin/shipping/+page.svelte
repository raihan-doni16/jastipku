<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import Modal from '$lib/components/Modal.svelte';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'admin') {
      goto('/login?redirect=/admin/shipping&expected=admin');
      return;
    }
  });

  // Mock courier integration data
  const courierIntegrations = [
    {
      id: 'courier-1',
      name: 'JNE',
      logo: '📦',
      status: 'active',
      apiKey: 'jne_live_xxxxxxxxxxxx',
      isConfigured: true,
      totalShipments: 145,
      lastSync: '2024-01-17T10:30:00'
    },
    {
      id: 'courier-2',
      name: 'J&T Express',
      logo: '🚚',
      status: 'active',
      apiKey: 'jnt_live_xxxxxxxxxxxx',
      isConfigured: true,
      totalShipments: 98,
      lastSync: '2024-01-17T09:15:00'
    },
    {
      id: 'courier-3',
      name: 'SiCepat',
      logo: '⚡',
      status: 'active',
      apiKey: 'sicepat_live_xxxxxxxxxxxx',
      isConfigured: true,
      totalShipments: 67,
      lastSync: '2024-01-17T08:45:00'
    },
    {
      id: 'courier-4',
      name: 'AnterAja',
      logo: '🛵',
      status: 'inactive',
      apiKey: '',
      isConfigured: false,
      totalShipments: 0,
      lastSync: null
    },
    {
      id: 'courier-5',
      name: 'ID Express',
      logo: '📮',
      status: 'inactive',
      apiKey: '',
      isConfigured: false,
      totalShipments: 0,
      lastSync: null
    }
  ];

  // Mock shipping proof verification data
  const shippingProofs = [
    {
      id: 'proof-1',
      orderCode: 'ORD-2024-001',
      jastiperName: 'Rina Travel',
      buyerName: 'Budi Santoso',
      courier: 'JNE',
      trackingNumber: 'JNE12345678',
      status: 'pending',
      submittedAt: '2024-01-17T10:00:00',
      verifiedAt: null,
      proofImageUrl: '/proof1.jpg',
      notes: ''
    },
    {
      id: 'proof-2',
      orderCode: 'ORD-2024-002',
      jastiperName: 'Sinta Shop',
      buyerName: 'Dewi Lestari',
      courier: 'J&T Express',
      trackingNumber: 'JT987654321',
      status: 'pending',
      submittedAt: '2024-01-16T15:30:00',
      verifiedAt: null,
      proofImageUrl: '/proof2.jpg',
      notes: ''
    },
    {
      id: 'proof-3',
      orderCode: 'ORD-2024-003',
      jastiperName: 'Yuki Japan',
      buyerName: 'Ahmad Hidayat',
      courier: 'SiCepat',
      trackingNumber: 'SICEPAT123',
      status: 'verified',
      submittedAt: '2024-01-15T14:20:00',
      verifiedAt: '2024-01-16T09:00:00',
      proofImageUrl: '/proof3.jpg',
      notes: 'Bukti pengiriman valid'
    },
    {
      id: 'proof-4',
      orderCode: 'ORD-2024-004',
      jastiperName: 'Korea Stuff',
      buyerName: 'Siti Nurhaliza',
      courier: 'JNE',
      trackingNumber: 'JNE55555555',
      status: 'rejected',
      submittedAt: '2024-01-14T11:00:00',
      verifiedAt: '2024-01-15T10:30:00',
      proofImageUrl: '/proof4.jpg',
      notes: 'Foto tidak jelas, mohon upload ulang'
    }
  ];

  let selectedTab = 'integrations'; // 'integrations' or 'verifications'
  let filterProofStatus = 'all';

  const proofStatusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'pending', label: 'Menunggu Verifikasi' },
    { value: 'verified', label: 'Terverifikasi' },
    { value: 'rejected', label: 'Ditolak' }
  ];

  $: filteredProofs = shippingProofs.filter((proof) => {
    return filterProofStatus === 'all' || proof.status === filterProofStatus;
  });

  $: activeCouriers = courierIntegrations.filter((c) => c.status === 'active').length;
  $: totalShipments = courierIntegrations.reduce((sum, c) => sum + c.totalShipments, 0);
  $: pendingVerifications = shippingProofs.filter((p) => p.status === 'pending').length;

  // Modal state
  let modalConfig = {
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'OK',
    cancelText: 'Batal',
    showCancel: false,
    inputValue: '',
    inputPlaceholder: '',
    imageUrl: '',
    onConfirm: null
  };

  function showModal(config) {
    modalConfig = {
      isOpen: true,
      type: config.type || 'info',
      title: config.title || '',
      message: config.message || '',
      confirmText: config.confirmText || 'OK',
      cancelText: config.cancelText || 'Batal',
      showCancel: config.showCancel || false,
      inputValue: config.inputValue || '',
      inputPlaceholder: config.inputPlaceholder || '',
      imageUrl: config.imageUrl || '',
      onConfirm: config.onConfirm || null
    };
  }

  function handleModalConfirm(event) {
    if (modalConfig.onConfirm) {
      // For prompt type, pass the input value
      if (modalConfig.type === 'prompt' && event.detail !== undefined) {
        modalConfig.onConfirm(event.detail);
      } else {
        modalConfig.onConfirm();
      }
    }
  }

  function formatDate(dateString) {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function getStatusBadge(status) {
    const badges = {
      active: { label: 'Aktif', color: '#10b981' },
      inactive: { label: 'Tidak Aktif', color: '#94a3b8' },
      pending: { label: 'Menunggu', color: '#f59e0b' },
      verified: { label: 'Terverifikasi', color: '#10b981' },
      rejected: { label: 'Ditolak', color: '#ef4444' }
    };
    return badges[status] || { label: status, color: '#64748b' };
  }

  function configureCourier(courierId) {
    showModal({
      type: 'info',
      title: 'Konfigurasi Kurir',
      message: `Konfigurasi kurir ${courierId}. Form API key dan pengaturan akan dibuka.`,
      confirmText: 'OK'
    });
    // In real app, open modal to configure API keys
  }

  function toggleCourierStatus(courierId, currentStatus) {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    showModal({
      type: 'success',
      title: 'Berhasil',
      message: `Status kurir ${courierId} diubah menjadi ${newStatus}`,
      confirmText: 'OK'
    });
    // In real app, call API
  }

  function syncCourier(courierId) {
    showModal({
      type: 'info',
      title: 'Sinkronisasi',
      message: `Sinkronisasi data kurir ${courierId}...`,
      confirmText: 'OK'
    });
    // In real app, call sync API
  }

  function verifyProof(proofId) {
    showModal({
      type: 'prompt',
      title: 'Catatan Verifikasi',
      message: 'Catatan verifikasi (opsional):',
      inputPlaceholder: 'Masukkan catatan (opsional)...',
      inputType: 'textarea',
      confirmText: 'Verifikasi',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: (notes) => {
        showModal({
          type: 'success',
          title: 'Berhasil',
          message: `Bukti pengiriman ${proofId} telah diverifikasi.`,
          confirmText: 'OK'
        });
        // In real app, call API
      }
    });
  }

  function rejectProof(proofId) {
    showModal({
      type: 'prompt',
      title: 'Alasan Penolakan',
      message: 'Alasan penolakan:',
      inputPlaceholder: 'Masukkan alasan penolakan...',
      inputType: 'textarea',
      confirmText: 'Submit',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: (reason) => {
        if (reason) {
          showModal({
            type: 'success',
            title: 'Berhasil',
            message: `Bukti pengiriman ${proofId} ditolak dengan alasan: ${reason}`,
            confirmText: 'OK'
          });
          // In real app, call API
        }
      }
    });
  }

  function viewProofImage(imageUrl) {
    showModal({
      type: 'info',
      title: 'Bukti Foto',
      message: '',
      confirmText: 'Tutup'
    });
    modalConfig.imageUrl = imageUrl;
  }
</script>

<Modal
  bind:isOpen={modalConfig.isOpen}
  type={modalConfig.type}
  title={modalConfig.title}
  message={modalConfig.message}
  confirmText={modalConfig.confirmText}
  cancelText={modalConfig.cancelText}
  showCancel={modalConfig.showCancel}
  bind:inputValue={modalConfig.inputValue}
  inputPlaceholder={modalConfig.inputPlaceholder}
  imageUrl={modalConfig.imageUrl}
  on:confirm={handleModalConfirm}
/>

<div class="container">
  <div class="header">
    <h1>Manajemen Kurir & Pengiriman</h1>
    <p>Integrasi sistem kurir dan verifikasi bukti pengiriman</p>
  </div>

  <!-- Stats Cards -->
  <div class="stats-cards">
    <div class="stat-card">
      <div class="stat-icon" style="background: #d1fae5;">✅</div>
      <div class="stat-content">
        <div class="stat-value">{activeCouriers}</div>
        <div class="stat-label">Kurir Aktif</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #dbeafe;">📦</div>
      <div class="stat-content">
        <div class="stat-value">{totalShipments}</div>
        <div class="stat-label">Total Pengiriman</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #fef3c7;">⏳</div>
      <div class="stat-content">
        <div class="stat-value">{pendingVerifications}</div>
        <div class="stat-label">Menunggu Verifikasi</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #e9d5ff;">🚚</div>
      <div class="stat-content">
        <div class="stat-value">{courierIntegrations.length}</div>
        <div class="stat-label">Total Integrasi Kurir</div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs">
    <button
      class="tab-button"
      class:active={selectedTab === 'integrations'}
      on:click={() => (selectedTab = 'integrations')}
    >
      Integrasi Kurir
    </button>
    <button
      class="tab-button"
      class:active={selectedTab === 'verifications'}
      on:click={() => (selectedTab = 'verifications')}
    >
      Verifikasi Bukti Kirim
    </button>
  </div>

  <!-- Courier Integrations Tab -->
  {#if selectedTab === 'integrations'}
    <div class="section">
      <div class="section-header">
        <h2>Daftar Integrasi Kurir</h2>
      </div>

      <div class="couriers-grid">
        {#each courierIntegrations as courier (courier.id)}
          <div class="courier-card">
            <div class="courier-header">
              <div class="courier-logo">{courier.logo}</div>
              <div class="courier-info">
                <div class="courier-name">{courier.name}</div>
                <span
                  class="status-badge"
                  style="background-color: {getStatusBadge(courier.status).color};"
                >
                  {getStatusBadge(courier.status).label}
                </span>
              </div>
            </div>

            <div class="courier-stats">
              <div class="stat-item">
                <span class="stat-label">Total Pengiriman</span>
                <span class="stat-value">{courier.totalShipments}</span>
              </div>
              {#if courier.isConfigured}
                <div class="stat-item">
                  <span class="stat-label">API Key</span>
                  <span class="stat-value api-key">{courier.apiKey}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Last Sync</span>
                  <span class="stat-value">{formatDate(courier.lastSync)}</span>
                </div>
              {/if}
            </div>

            <div class="courier-actions">
              {#if courier.isConfigured}
                <button class="btn-secondary" on:click={() => syncCourier(courier.id)}>
                  Sync Data
                </button>
                <button
                  class="btn-secondary"
                  on:click={() => toggleCourierStatus(courier.id, courier.status)}
                >
                  {courier.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                </button>
              {:else}
                <button class="btn-primary" on:click={() => configureCourier(courier.id)}>
                  Konfigurasi
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Shipping Verifications Tab -->
  {#if selectedTab === 'verifications'}
    <div class="section">
      <div class="section-header">
        <h2>Verifikasi Bukti Pengiriman</h2>
        <select bind:value={filterProofStatus}>
          {#each proofStatusOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>

      <div class="results-info">
        Menampilkan {filteredProofs.length} dari {shippingProofs.length} bukti pengiriman
      </div>

      <div class="proofs-list">
        {#each filteredProofs as proof (proof.id)}
          <div class="proof-card">
            <div class="proof-header">
              <div class="proof-id-section">
                <span class="proof-order">{proof.orderCode}</span>
                <span
                  class="status-badge"
                  style="background-color: {getStatusBadge(proof.status).color};"
                >
                  {getStatusBadge(proof.status).label}
                </span>
              </div>
              <div class="proof-date">{formatDate(proof.submittedAt)}</div>
            </div>

            <div class="proof-content">
              <div class="info-section">
                <div class="info-label">Jastiper</div>
                <div class="info-value">{proof.jastiperName}</div>
              </div>

              <div class="info-section">
                <div class="info-label">Pembeli</div>
                <div class="info-value">{proof.buyerName}</div>
              </div>

              <div class="info-section">
                <div class="info-label">Kurir</div>
                <div class="info-value">{proof.courier}</div>
              </div>

              <div class="info-section">
                <div class="info-label">No Resi</div>
                <div class="info-value">{proof.trackingNumber}</div>
              </div>

              {#if proof.verifiedAt}
                <div class="info-section">
                  <div class="info-label">Diverifikasi</div>
                  <div class="info-subvalue">{formatDate(proof.verifiedAt)}</div>
                </div>
              {/if}

              {#if proof.notes}
                <div class="info-section full-width">
                  <div class="info-label">Catatan</div>
                  <div class="info-subvalue">{proof.notes}</div>
                </div>
              {/if}
            </div>

            <div class="proof-actions">
              <button class="btn-secondary" on:click={() => viewProofImage(proof.proofImageUrl)}>
                Lihat Bukti Foto
              </button>
              {#if proof.status === 'pending'}
                <button class="btn-reject" on:click={() => rejectProof(proof.id)}>Tolak</button>
                <button class="btn-approve" on:click={() => verifyProof(proof.id)}>
                  Verifikasi
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      {#if filteredProofs.length === 0}
        <div class="empty-state">
          <div class="empty-icon">📦</div>
          <h3>Tidak ada bukti pengiriman</h3>
          <p>Bukti pengiriman dari jastiper akan muncul di sini</p>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 1600px;
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

  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid #e2e8f0;
  }

  .tab-button {
    padding: 1rem 2rem;
    border: none;
    background: transparent;
    color: #64748b;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.2s;
  }

  .tab-button.active {
    color: #086adf;
    border-bottom-color: #086adf;
  }

  .tab-button:hover {
    color: #086adf;
  }

  .section {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  select {
    padding: 0.75rem 1.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 0.95rem;
    background: white;
    cursor: pointer;
    transition: border-color 0.2s;
    min-width: 200px;
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

  .couriers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .courier-card {
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    transition: box-shadow 0.3s;
  }

  .courier-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .courier-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
  }

  .courier-logo {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }

  .courier-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .courier-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
  }

  .status-badge {
    padding: 0.375rem 0.875rem;
    border-radius: 999px;
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    display: inline-block;
    width: fit-content;
  }

  .courier-stats {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stat-item .stat-label {
    font-size: 0.875rem;
    color: #94a3b8;
    font-weight: 600;
  }

  .stat-item .stat-value {
    font-size: 0.95rem;
    font-weight: 600;
    color: #0f172a;
  }

  .api-key {
    font-family: monospace;
    font-size: 0.75rem;
    color: #64748b;
  }

  .courier-actions {
    display: flex;
    gap: 0.75rem;
  }

  .proofs-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .proof-card {
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    transition: box-shadow 0.3s;
  }

  .proof-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .proof-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
  }

  .proof-id-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .proof-order {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
  }

  .proof-date {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .proof-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .info-section {
    display: flex;
    flex-direction: column;
  }

  .info-section.full-width {
    grid-column: 1 / -1;
  }

  .info-label {
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .info-value {
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.25rem;
  }

  .info-subvalue {
    font-size: 0.875rem;
    color: #64748b;
  }

  .proof-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: 2px solid #f1f5f9;
    flex-wrap: wrap;
  }

  .btn-primary,
  .btn-secondary,
  .btn-approve,
  .btn-reject {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .btn-primary {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(8, 106, 223, 0.3);
  }

  .btn-secondary {
    background: white;
    border: 2px solid #e2e8f0;
    color: #475569;
  }

  .btn-secondary:hover {
    border-color: #086adf;
    color: #086adf;
  }

  .btn-approve {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
  }

  .btn-approve:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  .btn-reject {
    background: white;
    border: 2px solid #ef4444;
    color: #ef4444;
  }

  .btn-reject:hover {
    background: #fef2f2;
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

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .stats-cards {
      grid-template-columns: 1fr;
    }

    .tabs {
      overflow-x: auto;
    }

    .couriers-grid {
      grid-template-columns: 1fr;
    }

    .proof-content {
      grid-template-columns: 1fr;
    }

    .proof-actions {
      flex-direction: column;
    }

    .courier-actions {
      flex-direction: column;
    }
  }
</style>
