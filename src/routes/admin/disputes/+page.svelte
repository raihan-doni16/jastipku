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
      goto('/login?redirect=/admin/disputes&expected=admin');
      return;
    }
  });

  // Mock reports/disputes data
  const reports = [
    {
      id: 'report-1',
      type: 'order_dispute',
      orderCode: 'ORD-2024-001',
      reporterName: 'Budi Santoso',
      reporterRole: 'user',
      reportedName: 'Rina Travel',
      reportedRole: 'jastiper',
      reason: 'Barang tidak sesuai',
      description: 'Barang yang diterima tidak sesuai dengan foto dan deskripsi. Warna berbeda dan ada cacat.',
      evidence: ['photo1.jpg', 'photo2.jpg'],
      status: 'pending',
      priority: 'high',
      createdAt: '2024-01-17T10:00:00',
      resolvedAt: null,
      resolution: '',
      refundAmount: 0
    },
    {
      id: 'report-2',
      type: 'fraud',
      orderCode: 'ORD-2024-005',
      reporterName: 'Dewi Lestari',
      reporterRole: 'user',
      reportedName: 'Fake Seller',
      reportedRole: 'jastiper',
      reason: 'Penipuan',
      description: 'Jastiper menghilang setelah menerima pembayaran. Tidak ada kabar dan tidak bisa dihubungi.',
      evidence: ['screenshot1.jpg', 'chat1.jpg'],
      status: 'investigating',
      priority: 'critical',
      createdAt: '2024-01-16T14:30:00',
      resolvedAt: null,
      resolution: '',
      refundAmount: 0
    },
    {
      id: 'report-3',
      type: 'delayed_shipping',
      orderCode: 'ORD-2024-003',
      reporterName: 'Ahmad Hidayat',
      reporterRole: 'user',
      reportedName: 'Yuki Japan',
      reportedRole: 'jastiper',
      reason: 'Pengiriman terlambat',
      description: 'Sudah 2 minggu sejak jastiper kembali ke Indonesia tapi barang belum dikirim.',
      evidence: [],
      status: 'resolved',
      priority: 'medium',
      createdAt: '2024-01-14T09:15:00',
      resolvedAt: '2024-01-16T15:30:00',
      resolution: 'Jastiper telah mengirim barang dan memberikan kompensasi diskon 20% untuk pembelian berikutnya.',
      refundAmount: 0
    },
    {
      id: 'report-4',
      type: 'damaged_item',
      orderCode: 'ORD-2024-002',
      reporterName: 'Siti Nurhaliza',
      reporterRole: 'user',
      reportedName: 'Korea Stuff',
      reportedRole: 'jastiper',
      reason: 'Barang rusak',
      description: 'Barang diterima dalam kondisi pecah. Kemasan tidak aman.',
      evidence: ['damaged1.jpg', 'packaging1.jpg'],
      status: 'resolved',
      priority: 'high',
      createdAt: '2024-01-15T11:20:00',
      resolvedAt: '2024-01-16T10:00:00',
      resolution: 'Refund penuh diberikan kepada pembeli. Jastiper akan lebih hati-hati dalam packing.',
      refundAmount: 450000
    }
  ];

  // Mock reviews that need moderation
  const flaggedReviews = [
    {
      id: 'review-1',
      orderCode: 'ORD-2024-007',
      reviewerName: 'User123',
      jastiperName: 'Sinta Shop',
      rating: 1,
      comment: 'Penipu! Jangan percaya! Barang palsu semua!',
      flagReason: 'Inappropriate language',
      flaggedBy: 'System',
      status: 'pending',
      createdAt: '2024-01-17T08:30:00'
    },
    {
      id: 'review-2',
      orderCode: 'ORD-2024-008',
      reviewerName: 'Budi Santoso',
      jastiperName: 'Korea Stuff',
      rating: 5,
      comment: 'Mantap! Hubungi saya di 08123456789 untuk diskon spesial!',
      flagReason: 'Spam/Advertising',
      flaggedBy: 'User Report',
      status: 'pending',
      createdAt: '2024-01-16T15:45:00'
    },
    {
      id: 'review-3',
      orderCode: 'ORD-2024-009',
      reviewerName: 'Angry Customer',
      jastiperName: 'Rina Travel',
      rating: 1,
      comment: 'Sialan lu! Gua tau rumah lu dimana!',
      flagReason: 'Threatening/Harassment',
      flaggedBy: 'Jastiper Report',
      status: 'removed',
      createdAt: '2024-01-15T12:00:00'
    }
  ];

  let selectedTab = 'disputes'; // 'disputes' or 'reviews'
  let filterStatus = 'all';
  let filterReviewStatus = 'all';
  let filterPriority = 'all';

  const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'pending', label: 'Menunggu Review' },
    { value: 'investigating', label: 'Sedang Investigasi' },
    { value: 'resolved', label: 'Selesai' },
    { value: 'rejected', label: 'Ditolak' }
  ];

  const reviewStatusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'pending', label: 'Menunggu Review' },
    { value: 'approved', label: 'Disetujui' },
    { value: 'removed', label: 'Dihapus' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'Semua Prioritas' },
    { value: 'critical', label: 'Kritis' },
    { value: 'high', label: 'Tinggi' },
    { value: 'medium', label: 'Sedang' },
    { value: 'low', label: 'Rendah' }
  ];

  $: filteredReports = reports.filter((report) => {
    const matchStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchPriority = filterPriority === 'all' || report.priority === filterPriority;
    return matchStatus && matchPriority;
  });

  $: filteredReviews = flaggedReviews.filter((review) => {
    return filterReviewStatus === 'all' || review.status === filterReviewStatus;
  });

  $: pendingDisputes = reports.filter((r) => r.status === 'pending').length;
  $: investigatingDisputes = reports.filter((r) => r.status === 'investigating').length;
  $: pendingReviews = flaggedReviews.filter((r) => r.status === 'pending').length;
  $: totalRefunds = reports.reduce((sum, r) => sum + r.refundAmount, 0);

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

  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
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
      pending: { label: 'Menunggu Review', color: '#f59e0b' },
      investigating: { label: 'Investigasi', color: '#3b82f6' },
      resolved: { label: 'Selesai', color: '#10b981' },
      rejected: { label: 'Ditolak', color: '#94a3b8' },
      approved: { label: 'Disetujui', color: '#10b981' },
      removed: { label: 'Dihapus', color: '#ef4444' }
    };
    return badges[status] || { label: status, color: '#64748b' };
  }

  function getPriorityBadge(priority) {
    const badges = {
      critical: { label: 'Kritis', color: '#dc2626' },
      high: { label: 'Tinggi', color: '#f59e0b' },
      medium: { label: 'Sedang', color: '#3b82f6' },
      low: { label: 'Rendah', color: '#94a3b8' }
    };
    return badges[priority] || { label: priority, color: '#64748b' };
  }

  function startInvestigation(reportId) {
    showModal({
      type: 'success',
      title: 'Berhasil',
      message: `Memulai investigasi untuk laporan ${reportId}`,
      confirmText: 'OK'
    });
    // In real app, call API
  }

  function resolveDispute(reportId) {
    showModal({
      type: 'prompt',
      title: 'Resolusi Sengketa',
      message: 'Masukkan resolusi untuk sengketa ini:',
      inputPlaceholder: 'Masukkan resolusi...',
      confirmText: 'Lanjutkan',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: (resolution) => {
        if (resolution) {
          showModal({
            type: 'prompt',
            title: 'Jumlah Refund',
            message: 'Jumlah refund (0 jika tidak ada):',
            inputPlaceholder: 'Masukkan jumlah refund...',
            confirmText: 'Submit',
            cancelText: 'Batal',
            showCancel: true,
            onConfirm: (refund) => {
              showModal({
                type: 'success',
                title: 'Berhasil',
                message: `Sengketa ${reportId} diselesaikan.\nResolusi: ${resolution}\nRefund: ${refund ? formatPrice(parseInt(refund)) : 'Tidak ada'}`,
                confirmText: 'OK'
              });
              // In real app, call API
            }
          });
        }
      }
    });
  }

  function rejectDispute(reportId) {
    showModal({
      type: 'prompt',
      title: 'Alasan Penolakan',
      message: 'Alasan penolakan:',
      inputPlaceholder: 'Masukkan alasan penolakan...',
      confirmText: 'Submit',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: (reason) => {
        if (reason) {
          showModal({
            type: 'success',
            title: 'Berhasil',
            message: `Sengketa ${reportId} ditolak.\nAlasan: ${reason}`,
            confirmText: 'OK'
          });
          // In real app, call API
        }
      }
    });
  }

  function viewEvidence(evidence) {
    showModal({
      type: 'info',
      title: 'Bukti',
      message: `Melihat bukti:\n${evidence.join('\n')}\n\nDalam aplikasi nyata, akan membuka galeri foto.`,
      confirmText: 'OK'
    });
    // In real app, open image gallery
  }

  function approveReview(reviewId) {
    showModal({
      type: 'confirm',
      title: 'Konfirmasi',
      message: 'Setujui review ini untuk ditampilkan?',
      confirmText: 'Ya',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: () => {
        showModal({
          type: 'success',
          title: 'Berhasil',
          message: `Review ${reviewId} disetujui dan akan ditampilkan.`,
          confirmText: 'OK'
        });
        // In real app, call API
      }
    });
  }

  function removeReview(reviewId) {
    showModal({
      type: 'prompt',
      title: 'Alasan Penghapusan',
      message: 'Alasan penghapusan review:',
      inputPlaceholder: 'Masukkan alasan penghapusan...',
      confirmText: 'Submit',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: (reason) => {
        if (reason) {
          showModal({
            type: 'success',
            title: 'Berhasil',
            message: `Review ${reviewId} dihapus.\nAlasan: ${reason}`,
            confirmText: 'OK'
          });
          // In real app, call API
        }
      }
    });
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
  on:confirm={handleModalConfirm}
/>

<div class="container">
  <div class="header">
    <h1>Review & Sengketa</h1>
    <p>Tangani laporan, sengketa, dan moderasi review</p>
  </div>

  <!-- Stats Cards -->
  <div class="stats-cards">
    <div class="stat-card">
      <div class="stat-icon" style="background: #fef3c7;">⚠️</div>
      <div class="stat-content">
        <div class="stat-value">{pendingDisputes}</div>
        <div class="stat-label">Sengketa Pending</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #dbeafe;">🔍</div>
      <div class="stat-content">
        <div class="stat-value">{investigatingDisputes}</div>
        <div class="stat-label">Dalam Investigasi</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #fee2e2;">🚫</div>
      <div class="stat-content">
        <div class="stat-value">{pendingReviews}</div>
        <div class="stat-label">Review Perlu Moderasi</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #d1fae5;">💰</div>
      <div class="stat-content">
        <div class="stat-value">{formatPrice(totalRefunds)}</div>
        <div class="stat-label">Total Refund</div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs">
    <button
      class="tab-button"
      class:active={selectedTab === 'disputes'}
      on:click={() => (selectedTab = 'disputes')}
    >
      Laporan & Sengketa
    </button>
    <button
      class="tab-button"
      class:active={selectedTab === 'reviews'}
      on:click={() => (selectedTab = 'reviews')}
    >
      Moderasi Review
    </button>
  </div>

  <!-- Disputes Tab -->
  {#if selectedTab === 'disputes'}
    <div class="section">
      <div class="section-header">
        <h2>Laporan & Sengketa</h2>
        <div class="filters">
          <select bind:value={filterStatus}>
            {#each statusOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
          <select bind:value={filterPriority}>
            {#each priorityOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
      </div>

      <div class="results-info">
        Menampilkan {filteredReports.length} dari {reports.length} laporan
      </div>

      <div class="reports-list">
        {#each filteredReports as report (report.id)}
          <div class="report-card">
            <div class="report-header">
              <div class="report-title-section">
                <span class="report-id">{report.id}</span>
                <span class="order-code">{report.orderCode}</span>
                <div class="badges">
                  <span
                    class="priority-badge"
                    style="background-color: {getPriorityBadge(report.priority).color};"
                  >
                    {getPriorityBadge(report.priority).label}
                  </span>
                  <span
                    class="status-badge"
                    style="background-color: {getStatusBadge(report.status).color};"
                  >
                    {getStatusBadge(report.status).label}
                  </span>
                </div>
              </div>
              <div class="report-date">{formatDate(report.createdAt)}</div>
            </div>

            <div class="report-content">
              <div class="info-section">
                <div class="info-label">Pelapor</div>
                <div class="info-value">{report.reporterName}</div>
                <div class="info-subvalue">({report.reporterRole})</div>
              </div>

              <div class="info-section">
                <div class="info-label">Dilaporkan</div>
                <div class="info-value">{report.reportedName}</div>
                <div class="info-subvalue">({report.reportedRole})</div>
              </div>

              <div class="info-section">
                <div class="info-label">Alasan</div>
                <div class="info-value">{report.reason}</div>
              </div>

              <div class="info-section full-width">
                <div class="info-label">Deskripsi</div>
                <div class="description-text">{report.description}</div>
              </div>

              {#if report.evidence.length > 0}
                <div class="info-section">
                  <div class="info-label">Bukti</div>
                  <button class="btn-link" on:click={() => viewEvidence(report.evidence)}>
                    Lihat {report.evidence.length} bukti
                  </button>
                </div>
              {/if}

              {#if report.status === 'resolved'}
                <div class="info-section full-width resolution-box">
                  <div class="info-label">Resolusi</div>
                  <div class="resolution-text">{report.resolution}</div>
                  {#if report.refundAmount > 0}
                    <div class="refund-amount">Refund: {formatPrice(report.refundAmount)}</div>
                  {/if}
                  <div class="info-subvalue">Diselesaikan: {formatDate(report.resolvedAt)}</div>
                </div>
              {/if}
            </div>

            <div class="report-actions">
              {#if report.status === 'pending'}
                <button class="btn-secondary" on:click={() => startInvestigation(report.id)}>
                  Mulai Investigasi
                </button>
                <button class="btn-reject" on:click={() => rejectDispute(report.id)}>
                  Tolak
                </button>
              {/if}
              {#if report.status === 'investigating' || report.status === 'pending'}
                <button class="btn-primary" on:click={() => resolveDispute(report.id)}>
                  Selesaikan
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      {#if filteredReports.length === 0}
        <div class="empty-state">
          <div class="empty-icon">⚖️</div>
          <h3>Tidak ada laporan</h3>
          <p>Laporan dan sengketa akan muncul di sini</p>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Reviews Tab -->
  {#if selectedTab === 'reviews'}
    <div class="section">
      <div class="section-header">
        <h2>Moderasi Review</h2>
        <select bind:value={filterReviewStatus}>
          {#each reviewStatusOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>

      <div class="results-info">
        Menampilkan {filteredReviews.length} dari {flaggedReviews.length} review
      </div>

      <div class="reviews-list">
        {#each filteredReviews as review (review.id)}
          <div class="review-card">
            <div class="review-header">
              <div class="review-info">
                <span class="review-id">{review.id}</span>
                <span class="order-code">{review.orderCode}</span>
                <span
                  class="status-badge"
                  style="background-color: {getStatusBadge(review.status).color};"
                >
                  {getStatusBadge(review.status).label}
                </span>
              </div>
              <div class="review-date">{formatDate(review.createdAt)}</div>
            </div>

            <div class="review-content">
              <div class="info-section">
                <div class="info-label">Reviewer</div>
                <div class="info-value">{review.reviewerName}</div>
              </div>

              <div class="info-section">
                <div class="info-label">Jastiper</div>
                <div class="info-value">{review.jastiperName}</div>
              </div>

              <div class="info-section">
                <div class="info-label">Rating</div>
                <div class="rating">
                  {#each Array(5) as _, i}
                    <span class="star" class:filled={i < review.rating}>⭐</span>
                  {/each}
                </div>
              </div>

              <div class="info-section full-width">
                <div class="info-label">Komentar</div>
                <div class="comment-text">{review.comment}</div>
              </div>

              <div class="flag-info">
                <strong>🚩 Alasan Flag:</strong> {review.flagReason}
                <br />
                <small>Dilaporkan oleh: {review.flaggedBy}</small>
              </div>
            </div>

            {#if review.status === 'pending'}
              <div class="review-actions">
                <button class="btn-secondary" on:click={() => approveReview(review.id)}>
                  Setujui Review
                </button>
                <button class="btn-remove" on:click={() => removeReview(review.id)}>
                  Hapus Review
                </button>
              </div>
            {/if}
          </div>
        {/each}
      </div>

      {#if filteredReviews.length === 0}
        <div class="empty-state">
          <div class="empty-icon">⭐</div>
          <h3>Tidak ada review</h3>
          <p>Review yang perlu moderasi akan muncul di sini</p>
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
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
    word-break: break-all;
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
    flex-wrap: wrap;
    gap: 1rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  .filters {
    display: flex;
    gap: 1rem;
  }

  select {
    padding: 0.75rem 1.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 0.95rem;
    background: white;
    cursor: pointer;
    transition: border-color 0.2s;
    min-width: 180px;
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

  .reports-list,
  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .report-card,
  .review-card {
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    transition: box-shadow 0.3s;
  }

  .report-card:hover,
  .review-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .report-header,
  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
  }

  .report-title-section,
  .review-info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
  }

  .report-id,
  .review-id {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
  }

  .order-code {
    font-size: 0.875rem;
    font-weight: 600;
    color: #64748b;
  }

  .badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .priority-badge,
  .status-badge {
    padding: 0.375rem 0.875rem;
    border-radius: 999px;
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .report-date,
  .review-date {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .report-content,
  .review-content {
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

  .description-text,
  .comment-text {
    color: #1f2937;
    line-height: 1.6;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
    border-left: 4px solid #086adf;
  }

  .resolution-box {
    background: #f0fdf4;
    padding: 1rem;
    border-radius: 8px;
    border-left: 4px solid #10b981;
  }

  .resolution-text {
    color: #065f46;
    margin-bottom: 0.75rem;
  }

  .refund-amount {
    font-weight: 700;
    color: #059669;
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  .flag-info {
    grid-column: 1 / -1;
    padding: 1rem;
    background: #fef2f2;
    border-radius: 8px;
    border-left: 4px solid #ef4444;
    color: #991b1b;
  }

  .btn-link {
    color: #086adf;
    text-decoration: underline;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 600;
    padding: 0;
  }

  .btn-link:hover {
    color: #0ea5e9;
  }

  .rating {
    display: flex;
    gap: 0.25rem;
  }

  .star {
    font-size: 1.25rem;
    opacity: 0.3;
  }

  .star.filled {
    opacity: 1;
  }

  .report-actions,
  .review-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: 2px solid #f1f5f9;
    flex-wrap: wrap;
  }

  .btn-primary,
  .btn-secondary,
  .btn-reject,
  .btn-remove {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .btn-primary {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
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

  .btn-reject,
  .btn-remove {
    background: white;
    border: 2px solid #ef4444;
    color: #ef4444;
  }

  .btn-reject:hover,
  .btn-remove:hover {
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

    .section-header {
      flex-direction: column;
      align-items: stretch;
    }

    .filters {
      flex-direction: column;
    }

    .report-content,
    .review-content {
      grid-template-columns: 1fr;
    }

    .report-actions,
    .review-actions {
      flex-direction: column;
    }
  }
</style>
