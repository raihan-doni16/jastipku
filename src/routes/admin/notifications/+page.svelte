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
      goto('/login?redirect=/admin/notifications&expected=admin');
      return;
    }
  });

  // Mock notification history
  const notificationHistory = [
    {
      id: 'notif-1',
      title: 'Promo Flash Sale Akhir Tahun',
      message: 'Dapatkan diskon hingga 50% untuk semua produk jastip! Buruan sebelum kehabisan!',
      type: 'promo',
      targetAudience: 'all_users',
      status: 'sent',
      sentAt: '2024-01-17T10:00:00',
      totalRecipients: 1250,
      openRate: 45.6
    },
    {
      id: 'notif-2',
      title: 'Maintenance Terjadwal',
      message: 'Sistem akan maintenance pada tanggal 20 Januari 2024 pukul 01:00 - 03:00 WIB.',
      type: 'announcement',
      targetAudience: 'all',
      status: 'sent',
      sentAt: '2024-01-16T15:30:00',
      totalRecipients: 2500,
      openRate: 78.4
    },
    {
      id: 'notif-3',
      title: 'Verifikasi Akun Jastiper',
      message: 'Segera lengkapi dokumen verifikasi Anda untuk mulai berjualan.',
      type: 'reminder',
      targetAudience: 'unverified_jastiper',
      status: 'sent',
      sentAt: '2024-01-15T09:00:00',
      totalRecipients: 45,
      openRate: 62.2
    },
    {
      id: 'notif-4',
      title: 'Update Fitur Baru',
      message: 'Fitur chat langsung dengan jastiper telah tersedia! Coba sekarang.',
      type: 'feature_update',
      targetAudience: 'all_users',
      status: 'scheduled',
      sentAt: '2024-01-20T08:00:00',
      totalRecipients: 0,
      openRate: 0
    }
  ];

  // Form for new notification
  let notificationForm = {
    title: '',
    message: '',
    type: 'announcement',
    targetAudience: 'all',
    scheduledTime: '',
    sendNow: true
  };

  const notificationTypes = [
    { value: 'announcement', label: 'Pengumuman', icon: '📢' },
    { value: 'promo', label: 'Promosi', icon: '🎉' },
    { value: 'reminder', label: 'Pengingat', icon: '⏰' },
    { value: 'feature_update', label: 'Update Fitur', icon: '✨' },
    { value: 'maintenance', label: 'Maintenance', icon: '🔧' }
  ];

  const targetAudienceOptions = [
    { value: 'all', label: 'Semua Pengguna', count: 2500 },
    { value: 'all_users', label: 'Semua Pembeli', count: 1250 },
    { value: 'all_jastiper', label: 'Semua Jastiper', count: 850 },
    { value: 'verified_jastiper', label: 'Jastiper Terverifikasi', count: 720 },
    { value: 'unverified_jastiper', label: 'Jastiper Belum Verifikasi', count: 130 },
    { value: 'active_users', label: 'User Aktif (30 hari)', count: 980 },
    { value: 'inactive_users', label: 'User Tidak Aktif', count: 270 }
  ];

  let selectedTab = 'create'; // 'create' or 'history'

  $: selectedAudience = targetAudienceOptions.find((a) => a.value === notificationForm.targetAudience);
  $: estimatedRecipients = selectedAudience?.count || 0;

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

  function getTypeBadge(type) {
    const types = {
      announcement: { label: 'Pengumuman', color: '#3b82f6', icon: '📢' },
      promo: { label: 'Promosi', color: '#f59e0b', icon: '🎉' },
      reminder: { label: 'Pengingat', color: '#8b5cf6', icon: '⏰' },
      feature_update: { label: 'Update Fitur', color: '#10b981', icon: '✨' },
      maintenance: { label: 'Maintenance', color: '#ef4444', icon: '🔧' }
    };
    return types[type] || { label: type, color: '#64748b', icon: '📬' };
  }

  function getStatusBadge(status) {
    const statuses = {
      sent: { label: 'Terkirim', color: '#10b981' },
      scheduled: { label: 'Terjadwal', color: '#f59e0b' },
      draft: { label: 'Draft', color: '#94a3b8' },
      failed: { label: 'Gagal', color: '#ef4444' }
    };
    return statuses[status] || { label: status, color: '#64748b' };
  }

  function sendNotification() {
    if (!notificationForm.title || !notificationForm.message) {
      showModal({
        type: 'error',
        title: 'Error',
        message: 'Mohon lengkapi judul dan pesan notifikasi',
        confirmText: 'OK'
      });
      return;
    }

    if (!notificationForm.sendNow && !notificationForm.scheduledTime) {
      showModal({
        type: 'error',
        title: 'Error',
        message: 'Mohon tentukan waktu pengiriman atau pilih kirim sekarang',
        confirmText: 'OK'
      });
      return;
    }

    const confirmMessage = notificationForm.sendNow
      ? `Kirim notifikasi sekarang ke ${estimatedRecipients} pengguna?`
      : `Jadwalkan notifikasi untuk ${formatDate(notificationForm.scheduledTime)}?`;

    showModal({
      type: 'confirm',
      title: 'Konfirmasi',
      message: confirmMessage,
      confirmText: 'Ya',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: () => {
        showModal({
          type: 'success',
          title: 'Berhasil',
          message: `Notifikasi berhasil ${notificationForm.sendNow ? 'dikirim' : 'dijadwalkan'}!\n\nJudul: ${notificationForm.title}\nTarget: ${selectedAudience?.label}\nPenerima: ${estimatedRecipients} orang`,
          confirmText: 'OK'
        });

        // Reset form
        notificationForm = {
          title: '',
          message: '',
          type: 'announcement',
          targetAudience: 'all',
          scheduledTime: '',
          sendNow: true
        };

        // In real app, call API and refresh history
      }
    });
  }

  function saveDraft() {
    if (!notificationForm.title || !notificationForm.message) {
      showModal({
        type: 'error',
        title: 'Error',
        message: 'Mohon lengkapi judul dan pesan notifikasi',
        confirmText: 'OK'
      });
      return;
    }

    showModal({
      type: 'success',
      title: 'Berhasil',
      message: 'Draft notifikasi berhasil disimpan!',
      confirmText: 'OK'
    });
    // In real app, call API to save draft
  }

  function previewNotification() {
    showModal({
      type: 'info',
      title: 'Preview Notifikasi',
      message: `${getTypeBadge(notificationForm.type).icon} ${notificationForm.title}\n\n${notificationForm.message}\n\nTarget: ${selectedAudience?.label} (${estimatedRecipients} orang)`,
      confirmText: 'OK'
    });
  }

  function viewNotificationDetail(notifId) {
    showModal({
      type: 'info',
      title: 'Detail Notifikasi',
      message: `Membuka detail notifikasi ${notifId}`,
      confirmText: 'OK'
    });
    // In real app, open detail modal or page
  }

  function deleteNotification(notifId) {
    showModal({
      type: 'confirm',
      title: 'Konfirmasi',
      message: 'Hapus notifikasi ini dari riwayat?',
      confirmText: 'Ya',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: () => {
        showModal({
          type: 'success',
          title: 'Berhasil',
          message: `Notifikasi ${notifId} dihapus`,
          confirmText: 'OK'
        });
        // In real app, call API
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
    <h1>Notifikasi & Broadcast</h1>
    <p>Kirim pengumuman dan promosi ke pengguna</p>
  </div>

  <!-- Stats Cards -->
  <div class="stats-cards">
    <div class="stat-card">
      <div class="stat-icon" style="background: #d1fae5;">📤</div>
      <div class="stat-content">
        <div class="stat-value">
          {notificationHistory.filter((n) => n.status === 'sent').length}
        </div>
        <div class="stat-label">Notifikasi Terkirim</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #fef3c7;">⏰</div>
      <div class="stat-content">
        <div class="stat-value">
          {notificationHistory.filter((n) => n.status === 'scheduled').length}
        </div>
        <div class="stat-label">Terjadwal</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #dbeafe;">👥</div>
      <div class="stat-content">
        <div class="stat-value">
          {notificationHistory.reduce((sum, n) => sum + n.totalRecipients, 0)}
        </div>
        <div class="stat-label">Total Penerima</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #e9d5ff;">��</div>
      <div class="stat-content">
        <div class="stat-value">
          {Math.round(
            notificationHistory.filter((n) => n.status === 'sent').reduce((sum, n) => sum + n.openRate, 0) /
              notificationHistory.filter((n) => n.status === 'sent').length || 0
          )}%
        </div>
        <div class="stat-label">Avg. Open Rate</div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs">
    <button
      class="tab-button"
      class:active={selectedTab === 'create'}
      on:click={() => (selectedTab = 'create')}
    >
      Buat Notifikasi
    </button>
    <button
      class="tab-button"
      class:active={selectedTab === 'history'}
      on:click={() => (selectedTab = 'history')}
    >
      Riwayat Pengiriman
    </button>
  </div>

  <!-- Create Notification Tab -->
  {#if selectedTab === 'create'}
    <div class="section">
      <div class="section-header">
        <h2>Buat Notifikasi Baru</h2>
      </div>

      <div class="notification-form">
        <div class="form-group">
          <label for="title">Judul Notifikasi <span class="required">*</span></label>
          <input
            id="title"
            type="text"
            bind:value={notificationForm.title}
            placeholder="Masukkan judul notifikasi..."
            maxlength="100"
          />
          <div class="char-count">{notificationForm.title.length}/100</div>
        </div>

        <div class="form-group">
          <label for="message">Pesan <span class="required">*</span></label>
          <textarea
            id="message"
            bind:value={notificationForm.message}
            placeholder="Tulis pesan notifikasi di sini..."
            rows="5"
            maxlength="500"
          ></textarea>
          <div class="char-count">{notificationForm.message.length}/500</div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="type">Tipe Notifikasi</label>
            <select id="type" bind:value={notificationForm.type}>
              {#each notificationTypes as type}
                <option value={type.value}>{type.icon} {type.label}</option>
              {/each}
            </select>
          </div>

          <div class="form-group">
            <label for="audience">Target Penerima <span class="required">*</span></label>
            <select id="audience" bind:value={notificationForm.targetAudience}>
              {#each targetAudienceOptions as option}
                <option value={option.value}>{option.label} ({option.count})</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="recipients-info">
          <div class="info-icon">👥</div>
          <div class="info-text">
            <strong>Estimasi Penerima:</strong> {estimatedRecipients} pengguna
          </div>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" bind:checked={notificationForm.sendNow} />
            Kirim sekarang
          </label>
        </div>

        {#if !notificationForm.sendNow}
          <div class="form-group">
            <label for="scheduledTime">Jadwalkan Waktu Pengiriman</label>
            <input
              id="scheduledTime"
              type="datetime-local"
              bind:value={notificationForm.scheduledTime}
            />
          </div>
        {/if}

        <div class="form-actions">
          <button class="btn-secondary" on:click={saveDraft}>Simpan Draft</button>
          <button class="btn-secondary" on:click={previewNotification}>Preview</button>
          <button class="btn-primary" on:click={sendNotification}>
            {notificationForm.sendNow ? 'Kirim Sekarang' : 'Jadwalkan Pengiriman'}
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- History Tab -->
  {#if selectedTab === 'history'}
    <div class="section">
      <div class="section-header">
        <h2>Riwayat Pengiriman</h2>
      </div>

      <div class="results-info">
        Menampilkan {notificationHistory.length} notifikasi
      </div>

      <div class="notifications-list">
        {#each notificationHistory as notif (notif.id)}
          <div class="notification-card">
            <div class="notification-header">
              <div class="notification-title-section">
                <div class="type-icon">{getTypeBadge(notif.type).icon}</div>
                <div>
                  <h3 class="notification-title">{notif.title}</h3>
                  <div class="notification-meta">
                    <span
                      class="type-badge"
                      style="background-color: {getTypeBadge(notif.type).color};"
                    >
                      {getTypeBadge(notif.type).label}
                    </span>
                    <span
                      class="status-badge"
                      style="background-color: {getStatusBadge(notif.status).color};"
                    >
                      {getStatusBadge(notif.status).label}
                    </span>
                  </div>
                </div>
              </div>
              <div class="notification-date">{formatDate(notif.sentAt)}</div>
            </div>

            <div class="notification-content">
              <p class="notification-message">{notif.message}</p>

              <div class="notification-stats">
                <div class="stat">
                  <span class="stat-label">Penerima</span>
                  <span class="stat-value">{notif.totalRecipients}</span>
                </div>
                {#if notif.status === 'sent'}
                  <div class="stat">
                    <span class="stat-label">Open Rate</span>
                    <span class="stat-value">{notif.openRate}%</span>
                  </div>
                {/if}
              </div>
            </div>

            <div class="notification-actions">
              <button class="btn-secondary" on:click={() => viewNotificationDetail(notif.id)}>
                Lihat Detail
              </button>
              <button class="btn-remove" on:click={() => deleteNotification(notif.id)}>
                Hapus
              </button>
            </div>
          </div>
        {/each}
      </div>

      {#if notificationHistory.length === 0}
        <div class="empty-state">
          <div class="empty-icon">📬</div>
          <h3>Belum ada riwayat</h3>
          <p>Notifikasi yang terkirim akan muncul di sini</p>
        </div>
      {/if}
    </div>
  {/if}
</div>

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
    margin-bottom: 1.5rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  .results-info {
    font-size: 0.95rem;
    color: #64748b;
    margin-bottom: 1.5rem;
  }

  .notification-form {
    max-width: 900px;
    margin: 0 auto;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .form-group label {
    display: block;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  .required {
    color: #ef4444;
  }

  .form-group input[type='text'],
  .form-group input[type='datetime-local'],
  .form-group select,
  .form-group textarea {
    width: 100%;
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
    min-height: 100px;
  }

  .char-count {
    text-align: right;
    font-size: 0.875rem;
    color: #94a3b8;
    margin-top: 0.25rem;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .checkbox-label input[type='checkbox'] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .recipients-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #dbeafe;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  .info-icon {
    font-size: 2rem;
  }

  .info-text {
    color: #1e40af;
    font-size: 0.95rem;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding-top: 1.5rem;
    border-top: 2px solid #f1f5f9;
  }

  .notifications-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .notification-card {
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    transition: box-shadow 0.3s;
  }

  .notification-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .notification-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
  }

  .notification-title-section {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    flex: 1;
  }

  .type-icon {
    font-size: 2rem;
  }

  .notification-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.5rem 0;
  }

  .notification-meta {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .type-badge,
  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .notification-date {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .notification-content {
    margin-bottom: 1rem;
  }

  .notification-message {
    color: #475569;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .notification-stats {
    display: flex;
    gap: 2rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
  }

  .stat .stat-label {
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 600;
  }

  .stat .stat-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
  }

  .notification-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: 2px solid #f1f5f9;
  }

  .btn-primary,
  .btn-secondary,
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

  .btn-remove {
    background: white;
    border: 2px solid #ef4444;
    color: #ef4444;
  }

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

    .form-row {
      grid-template-columns: 1fr;
    }

    .form-actions {
      flex-direction: column;
    }

    .notification-actions {
      flex-direction: column;
    }
  }
</style>
