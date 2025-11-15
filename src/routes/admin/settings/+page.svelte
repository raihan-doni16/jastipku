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
      goto('/login?redirect=/admin/settings&expected=admin');
      return;
    }
  });

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalUsers: 2500,
      totalJastiper: 850,
      totalOrders: 1250,
      totalRevenue: 125000000,
      avgOrderValue: 850000,
      userGrowth: 12.5,
      jastiperGrowth: 8.3,
      orderGrowth: 15.7,
      revenueGrowth: 22.4
    },
    topJastiper: [
      { name: 'Rina Travel', orders: 145, revenue: 18500000, rating: 4.8 },
      { name: 'Yuki Japan', orders: 132, revenue: 16200000, rating: 4.9 },
      { name: 'Korea Stuff', orders: 118, revenue: 14800000, rating: 4.7 },
      { name: 'Sinta Shop', orders: 95, revenue: 12100000, rating: 4.6 },
      { name: 'Bangkok Express', orders: 87, revenue: 10900000, rating: 4.5 }
    ],
    topCategories: [
      { name: 'Fashion', orders: 450, percentage: 36 },
      { name: 'Elektronik', orders: 325, percentage: 26 },
      { name: 'Kosmetik', orders: 250, percentage: 20 },
      { name: 'Makanan', orders: 125, percentage: 10 },
      { name: 'Lainnya', orders: 100, percentage: 8 }
    ],
    recentActivity: [
      {
        id: 'act-1',
        type: 'order',
        message: 'Pesanan baru dari Budi Santoso',
        time: '2024-01-17T14:30:00'
      },
      {
        id: 'act-2',
        type: 'jastiper',
        message: 'Jastiper baru terdaftar: New Traveler',
        time: '2024-01-17T13:45:00'
      },
      {
        id: 'act-3',
        type: 'dispute',
        message: 'Sengketa baru dilaporkan untuk ORD-2024-099',
        time: '2024-01-17T12:20:00'
      },
      {
        id: 'act-4',
        type: 'review',
        message: 'Review baru dari Dewi Lestari (5 bintang)',
        time: '2024-01-17T11:10:00'
      },
      {
        id: 'act-5',
        type: 'withdrawal',
        message: 'Permintaan penarikan dana dari Rina Travel',
        time: '2024-01-17T10:00:00'
      }
    ]
  };

  // Mock platform settings
  let platformSettings = {
    general: {
      platformName: 'Jastipku',
      platformEmail: 'support@jastipku.com',
      platformPhone: '08123456789',
      maintenanceMode: false,
      allowNewRegistration: true
    },
    commission: {
      jastiperCommission: 15,
      platformFee: 5,
      minOrderAmount: 50000,
      maxOrderAmount: 10000000
    },
    payment: {
      enableFullPayment: true,
      enableDpPayment: true,
      dpPercentage: 50,
      autoReleaseEscrow: true,
      escrowHoldDays: 7
    },
    verification: {
      requireIdVerification: true,
      requireBankAccount: true,
      minRatingForJastiper: 4.0,
      minOrdersForVerification: 5
    }
  };

  let selectedTab = 'analytics'; // 'analytics' or 'settings'
  let hasUnsavedChanges = false;

  // Modal state
  let modalConfig = {
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'OK',
    cancelText: 'Batal',
    showCancel: false,
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
      onConfirm: config.onConfirm || null
    };
  }

  function handleModalConfirm() {
    if (modalConfig.onConfirm) {
      modalConfig.onConfirm();
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
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) {
      return `${minutes} menit yang lalu`;
    } else if (hours < 24) {
      return `${hours} jam yang lalu`;
    } else {
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }

  function getGrowthColor(growth) {
    return growth >= 0 ? '#10b981' : '#ef4444';
  }

  function getActivityIcon(type) {
    const icons = {
      order: '🛍️',
      jastiper: '👤',
      dispute: '⚠️',
      review: '⭐',
      withdrawal: '💰'
    };
    return icons[type] || '📋';
  }

  function saveSettings() {
    showModal({
      type: 'confirm',
      title: 'Simpan Pengaturan',
      message: 'Simpan perubahan pengaturan platform?\n\nPerubahan akan langsung diterapkan ke semua pengguna.',
      confirmText: 'Simpan',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: () => {
        showModal({
          type: 'success',
          title: 'Berhasil',
          message: 'Pengaturan berhasil disimpan!',
          confirmText: 'OK'
        });
        hasUnsavedChanges = false;
        // In real app, call API to save settings
      }
    });
  }

  function resetSettings() {
    showModal({
      type: 'warning',
      title: 'Reset Pengaturan',
      message: 'Reset pengaturan ke nilai default?\n\nSemua perubahan yang belum disimpan akan hilang.',
      confirmText: 'Reset',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: () => {
        showModal({
          type: 'success',
          title: 'Berhasil',
          message: 'Pengaturan berhasil direset ke nilai default',
          confirmText: 'OK'
        });
        hasUnsavedChanges = false;
        // In real app, reset to default values
      }
    });
  }

  function exportData() {
    showModal({
      type: 'info',
      title: 'Ekspor Data',
      message: 'Mengekspor data analytics...\n\nFile CSV akan segera diunduh.',
      confirmText: 'OK'
    });
    // In real app, trigger CSV download
  }

  function handleSettingChange() {
    hasUnsavedChanges = true;
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
  on:confirm={handleModalConfirm}
/>

<div class="container">
  <div class="header">
    <h1>Analytics & Pengaturan</h1>
    <p>Pantau performa sistem dan konfigurasi platform</p>
  </div>

  <!-- Tabs -->
  <div class="tabs">
    <button
      class="tab-button"
      class:active={selectedTab === 'analytics'}
      on:click={() => (selectedTab = 'analytics')}
    >
      Analytics & Performa
    </button>
    <button
      class="tab-button"
      class:active={selectedTab === 'settings'}
      on:click={() => (selectedTab = 'settings')}
    >
      Pengaturan Platform
    </button>
  </div>

  <!-- Analytics Tab -->
  {#if selectedTab === 'analytics'}
    <div class="analytics-section">
      <!-- Overview Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon">👥</span>
            <span class="stat-label">Total Users</span>
          </div>
          <div class="stat-value">{analyticsData.overview.totalUsers.toLocaleString('id-ID')}</div>
          <div class="stat-growth" style="color: {getGrowthColor(analyticsData.overview.userGrowth)}">
            {analyticsData.overview.userGrowth >= 0 ? '↗' : '↘'}
            {Math.abs(analyticsData.overview.userGrowth)}% vs bulan lalu
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon">🛍️</span>
            <span class="stat-label">Total Jastiper</span>
          </div>
          <div class="stat-value">{analyticsData.overview.totalJastiper.toLocaleString('id-ID')}</div>
          <div class="stat-growth" style="color: {getGrowthColor(analyticsData.overview.jastiperGrowth)}">
            {analyticsData.overview.jastiperGrowth >= 0 ? '↗' : '↘'}
            {Math.abs(analyticsData.overview.jastiperGrowth)}% vs bulan lalu
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon">📦</span>
            <span class="stat-label">Total Orders</span>
          </div>
          <div class="stat-value">{analyticsData.overview.totalOrders.toLocaleString('id-ID')}</div>
          <div class="stat-growth" style="color: {getGrowthColor(analyticsData.overview.orderGrowth)}">
            {analyticsData.overview.orderGrowth >= 0 ? '↗' : '↘'}
            {Math.abs(analyticsData.overview.orderGrowth)}% vs bulan lalu
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon">💰</span>
            <span class="stat-label">Total Revenue</span>
          </div>
          <div class="stat-value">{formatPrice(analyticsData.overview.totalRevenue)}</div>
          <div class="stat-growth" style="color: {getGrowthColor(analyticsData.overview.revenueGrowth)}">
            {analyticsData.overview.revenueGrowth >= 0 ? '↗' : '↘'}
            {Math.abs(analyticsData.overview.revenueGrowth)}% vs bulan lalu
          </div>
        </div>
      </div>

      <div class="analytics-grid">
        <!-- Top Jastiper -->
        <div class="analytics-card">
          <div class="card-header">
            <h3>Top Jastiper</h3>
            <button class="btn-export" on:click={exportData}>Export</button>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {#each analyticsData.topJastiper as jastiper}
                  <tr>
                    <td class="name-cell">{jastiper.name}</td>
                    <td>{jastiper.orders}</td>
                    <td>{formatPrice(jastiper.revenue)}</td>
                    <td class="rating-cell">⭐ {jastiper.rating}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Top Categories -->
        <div class="analytics-card">
          <div class="card-header">
            <h3>Top Kategori</h3>
          </div>
          <div class="categories-list">
            {#each analyticsData.topCategories as category}
              <div class="category-item">
                <div class="category-info">
                  <span class="category-name">{category.name}</span>
                  <span class="category-orders">{category.orders} orders</span>
                </div>
                <div class="category-bar-container">
                  <div class="category-bar" style="width: {category.percentage}%"></div>
                </div>
                <span class="category-percentage">{category.percentage}%</span>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="analytics-card">
        <div class="card-header">
          <h3>Aktivitas Terbaru</h3>
        </div>
        <div class="activity-list">
          {#each analyticsData.recentActivity as activity}
            <div class="activity-item">
              <span class="activity-icon">{getActivityIcon(activity.type)}</span>
              <div class="activity-content">
                <div class="activity-message">{activity.message}</div>
                <div class="activity-time">{formatDate(activity.time)}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Settings Tab -->
  {#if selectedTab === 'settings'}
    <div class="settings-section">
      {#if hasUnsavedChanges}
        <div class="unsaved-banner">
          <span>⚠️ Anda memiliki perubahan yang belum disimpan</span>
          <button class="btn-save-banner" on:click={saveSettings}>Simpan Sekarang</button>
        </div>
      {/if}

      <!-- General Settings -->
      <div class="settings-card">
        <h3>Pengaturan Umum</h3>
        <div class="settings-form general-settings">
          <div class="form-group">
            <label>Nama Platform</label>
            <input
              type="text"
              bind:value={platformSettings.general.platformName}
              on:input={handleSettingChange}
            />
          </div>
          <div class="form-group">
            <label>Email Support</label>
            <input
              type="email"
              bind:value={platformSettings.general.platformEmail}
              on:input={handleSettingChange}
            />
          </div>
          <div class="form-group">
            <label>Nomor Telepon</label>
            <input
              type="tel"
              bind:value={platformSettings.general.platformPhone}
              on:input={handleSettingChange}
            />
          </div>
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                bind:checked={platformSettings.general.maintenanceMode}
                on:change={handleSettingChange}
              />
              Mode Maintenance (Platform tidak dapat diakses)
            </label>
          </div>
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                bind:checked={platformSettings.general.allowNewRegistration}
                on:change={handleSettingChange}
              />
              Izinkan Registrasi User Baru
            </label>
          </div>
        </div>
      </div>

      <!-- Commission Settings -->
      <div class="settings-card">
        <h3>Pengaturan Komisi & Fee</h3>
        <div class="settings-form commission-settings">
          <div class="form-group">
            <label>Komisi Jastiper (%)</label>
            <input
              type="number"
              bind:value={platformSettings.commission.jastiperCommission}
              min="0"
              max="100"
              on:input={handleSettingChange}
            />
            <small>Persentase komisi yang didapat jastiper dari setiap transaksi</small>
          </div>
          <div class="form-group">
            <label>Platform Fee (%)</label>
            <input
              type="number"
              bind:value={platformSettings.commission.platformFee}
              min="0"
              max="100"
              on:input={handleSettingChange}
            />
            <small>Persentase biaya platform dari setiap transaksi</small>
          </div>
          <div class="form-group amount-group">
            <label>Minimum Order Amount</label>
            <input
              type="number"
              bind:value={platformSettings.commission.minOrderAmount}
              on:input={handleSettingChange}
            />
            <small>Nilai minimal pemesanan dalam Rupiah</small>
          </div>
          <div class="form-group amount-group">
            <label>Maximum Order Amount</label>
            <input
              type="number"
              bind:value={platformSettings.commission.maxOrderAmount}
              on:input={handleSettingChange}
            />
            <small>Nilai maksimal pemesanan dalam Rupiah</small>
          </div>
        </div>
      </div>

      <!-- Payment Settings -->
      <div class="settings-card">
        <h3>Pengaturan Pembayaran</h3>
        <div class="settings-form">
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                bind:checked={platformSettings.payment.enableFullPayment}
                on:change={handleSettingChange}
              />
              Aktifkan Pembayaran Penuh
            </label>
          </div>
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                bind:checked={platformSettings.payment.enableDpPayment}
                on:change={handleSettingChange}
              />
              Aktifkan Pembayaran DP
            </label>
          </div>
          <div class="form-group">
            <label>Persentase DP (%)</label>
            <input
              type="number"
              bind:value={platformSettings.payment.dpPercentage}
              min="10"
              max="90"
              on:input={handleSettingChange}
            />
          </div>
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                bind:checked={platformSettings.payment.autoReleaseEscrow}
                on:change={handleSettingChange}
              />
              Auto Release Escrow
            </label>
            <small>Dana escrow otomatis dilepas setelah jangka waktu tertentu</small>
          </div>
          <div class="form-group">
            <label>Escrow Hold Days</label>
            <input
              type="number"
              bind:value={platformSettings.payment.escrowHoldDays}
              min="1"
              max="30"
              on:input={handleSettingChange}
            />
            <small>Jumlah hari dana ditahan di escrow</small>
          </div>
        </div>
      </div>

      <!-- Verification Settings -->
      <div class="settings-card">
        <h3>Pengaturan Verifikasi</h3>
        <div class="settings-form verification-settings">
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                bind:checked={platformSettings.verification.requireIdVerification}
                on:change={handleSettingChange}
              />
              Wajib Verifikasi KTP
            </label>
          </div>
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                bind:checked={platformSettings.verification.requireBankAccount}
                on:change={handleSettingChange}
              />
              Wajib Verifikasi Rekening Bank
            </label>
          </div>
          <div class="form-group">
            <label>Minimum Rating untuk Jastiper</label>
            <input
              type="number"
              step="0.1"
              bind:value={platformSettings.verification.minRatingForJastiper}
              min="0"
              max="5"
              on:input={handleSettingChange}
            />
          </div>
          <div class="form-group">
            <label>Minimum Orders untuk Verifikasi</label>
            <input
              type="number"
              bind:value={platformSettings.verification.minOrdersForVerification}
              min="0"
              on:input={handleSettingChange}
            />
            <small>Jumlah minimal order yang harus diselesaikan untuk verifikasi</small>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="settings-actions">
        <button class="btn-secondary" on:click={resetSettings}>Reset ke Default</button>
        <button class="btn-primary" on:click={saveSettings}>Simpan Perubahan</button>
      </div>
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

  .analytics-section,
  .settings-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .stat-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .stat-icon {
    font-size: 2rem;
  }

  .stat-label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 600;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }

  .stat-growth {
    font-size: 0.875rem;
    font-weight: 600;
  }

  .analytics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
  }

  .analytics-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
  }

  .card-header h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  .btn-export {
    padding: 0.5rem 1rem;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    color: #475569;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-export:hover {
    border-color: #086adf;
    color: #086adf;
  }

  .table-container {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 600;
    padding: 0.75rem 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  td {
    padding: 1rem 0.5rem;
    border-bottom: 1px solid #f1f5f9;
  }

  .name-cell {
    font-weight: 600;
    color: #0f172a;
  }

  .rating-cell {
    color: #f59e0b;
    font-weight: 600;
  }

  .categories-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .category-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .category-info {
    display: flex;
    flex-direction: column;
    min-width: 120px;
  }

  .category-name {
    font-weight: 600;
    color: #0f172a;
  }

  .category-orders {
    font-size: 0.875rem;
    color: #64748b;
  }

  .category-bar-container {
    flex: 1;
    height: 8px;
    background: #e2e8f0;
    border-radius: 999px;
    overflow: hidden;
  }

  .category-bar {
    height: 100%;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    transition: width 0.3s;
  }

  .category-percentage {
    min-width: 50px;
    text-align: right;
    font-weight: 700;
    color: #475569;
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .activity-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
  }

  .activity-icon {
    font-size: 1.5rem;
  }

  .activity-content {
    flex: 1;
  }

  .activity-message {
    color: #1f2937;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .activity-time {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .unsaved-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: #fef3c7;
    border: 2px solid #f59e0b;
    border-radius: 12px;
    color: #92400e;
    font-weight: 600;
  }

  .btn-save-banner {
    padding: 0.5rem 1rem;
    background: #f59e0b;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
  }

  .settings-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .settings-card h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 1.5rem 0;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
  }

  .settings-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .settings-form.general-settings {
    column-gap: 2.25rem;
    row-gap: 1.5rem;
  }

  .settings-form.commission-settings,
  .settings-form.verification-settings {
    align-items: flex-start;
    column-gap: 2.25rem;
    row-gap: 1.5rem;
  }

  .settings-form.commission-settings .amount-group {
    margin-top: 0.25rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin: 5px;
  }

  .form-group label {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  .form-group input[type='text'],
  .form-group input[type='email'],
  .form-group input[type='tel'],
  .form-group input[type='number'] {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .form-group input:focus {
    outline: none;
    border-color: #086adf;
  }

  .form-group small {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #64748b;
  }

  .checkbox-group {
    grid-column: 1 / -1;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
  }

  .checkbox-label input[type='checkbox'] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .settings-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.875rem 2rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1rem;
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

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .analytics-grid {
      grid-template-columns: 1fr;
    }

    .settings-form {
      grid-template-columns: 1fr;
    }

    .settings-actions {
      flex-direction: column;
    }
  }
</style>
