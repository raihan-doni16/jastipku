<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { jastiperOrders } from '$lib/data/mockData';
  import Navbar from '$lib/components/Navbar.svelte';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'jastiper') {
      goto('/login?redirect=/jastiper/orders&expected=jastiper');
      return;
    }
  });

  let filterStatus = 'all';
  let searchQuery = '';

  const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'waiting_payment', label: 'Menunggu Pembayaran' },
    { value: 'paid', label: 'Sudah Dibayar' },
    { value: 'purchased', label: 'Barang Dibeli' },
    { value: 'shipping', label: 'Dalam Pengiriman' },
    { value: 'delivered', label: 'Terkirim' },
    { value: 'completed', label: 'Selesai' },
    { value: 'cancelled', label: 'Dibatalkan' }
  ];

  $: filteredOrders = jastiperOrders.filter((order) => {
    const matchStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchSearch =
      searchQuery === '' ||
      order.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

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
      year: 'numeric'
    });
  }

  function getStatusBadge(status) {
    const badges = {
      waiting_payment: { label: 'Menunggu Pembayaran', color: '#f59e0b' },
      paid: { label: 'Sudah Dibayar', color: '#0ea5e9' },
      dp_paid: { label: 'DP Dibayar', color: '#06b6d4' },
      purchased: { label: 'Barang Dibeli', color: '#8b5cf6' },
      shipping: { label: 'Dalam Pengiriman', color: '#3b82f6' },
      delivered: { label: 'Terkirim', color: '#10b981' },
      completed: { label: 'Selesai', color: '#059669' },
      cancelled: { label: 'Dibatalkan', color: '#ef4444' }
    };
    return badges[status] || { label: status, color: '#64748b' };
  }

  function updateOrderStatus(orderId, newStatus) {
    alert(`Order ${orderId} status updated to: ${newStatus}`);
    // In real app, update via API
  }

  function viewOrderDetail(orderCode) {
    goto(`/jastiper/orders/${orderCode}`);
  }
</script>

<Navbar />

<div class="container">
  <div class="header">
    <h1>Pesanan Masuk</h1>
    <p>Kelola semua pesanan dari pembeli</p>
  </div>

  <div class="stats-cards">
    <div class="stat-card">
      <div class="stat-icon" style="background: #fef3c7;">⏳</div>
      <div class="stat-content">
        <div class="stat-value">
          {jastiperOrders.filter((o) => o.status === 'waiting_payment').length}
        </div>
        <div class="stat-label">Menunggu Pembayaran</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #dbeafe;">💰</div>
      <div class="stat-content">
        <div class="stat-value">
          {jastiperOrders.filter((o) => o.paymentStatus === 'paid' || o.paymentStatus === 'dp_paid').length}
        </div>
        <div class="stat-label">Sudah Dibayar</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #e9d5ff;">🛍️</div>
      <div class="stat-content">
        <div class="stat-value">
          {jastiperOrders.filter((o) => o.status === 'purchased').length}
        </div>
        <div class="stat-label">Barang Dibeli</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #d1fae5;">✅</div>
      <div class="stat-content">
        <div class="stat-value">
          {jastiperOrders.filter((o) => o.status === 'completed').length}
        </div>
        <div class="stat-label">Selesai</div>
      </div>
    </div>
  </div>

  <div class="filters">
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Cari kode pesanan, pembeli, atau produk..."
        bind:value={searchQuery}
      />
    </div>
    <select bind:value={filterStatus}>
      {#each statusOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  </div>

  <div class="results-info">
    Menampilkan {filteredOrders.length} dari {jastiperOrders.length} pesanan
  </div>

  <div class="orders-list">
    {#each filteredOrders as order (order.id)}
      <div class="order-card">
        <div class="order-header">
          <div class="order-code-section">
            <span class="order-code">{order.orderCode}</span>
            <span
              class="status-badge"
              style="background-color: {getStatusBadge(order.status).color};"
            >
              {getStatusBadge(order.status).label}
            </span>
          </div>
          <div class="order-date">{formatDate(order.createdAt)}</div>
        </div>

        <div class="order-content">
          <div class="buyer-info">
            <div class="info-label">Pembeli</div>
            <div class="buyer-name">{order.buyerName}</div>
            <div class="buyer-phone">{order.buyerPhone}</div>
          </div>

          <div class="product-info">
            <div class="info-label">Produk</div>
            <div class="product-name">{order.productName}</div>
            <div class="product-meta">Qty: {order.quantity}</div>
          </div>

          <div class="payment-info">
            <div class="info-label">Pembayaran</div>
            <div class="payment-method">
              {order.paymentMethod === 'full' ? 'Bayar Penuh' : 'DP 50%'}
            </div>
            {#if order.paymentMethod === 'dp'}
              <div class="payment-amount">DP: {formatPrice(order.dpAmount || 0)}</div>
            {/if}
            <div class="total-amount">{formatPrice(order.totalPrice)}</div>
          </div>

          <div class="dates-info">
            {#if order.paidAt}
              <div class="date-item">
                <span class="date-label">Dibayar:</span>
                <span class="date-value">{formatDate(order.paidAt)}</span>
              </div>
            {/if}
            {#if order.purchasedAt}
              <div class="date-item">
                <span class="date-label">Dibeli:</span>
                <span class="date-value">{formatDate(order.purchasedAt)}</span>
              </div>
            {/if}
          </div>
        </div>

        <div class="order-actions">
          <button class="btn-secondary" on:click={() => viewOrderDetail(order.orderCode)}>
            Lihat Detail
          </button>
          {#if order.status === 'paid'}
            <button
              class="btn-primary"
              on:click={() => updateOrderStatus(order.id, 'purchased')}
            >
              Tandai Sudah Dibeli
            </button>
          {/if}
          {#if order.status === 'purchased'}
            <button class="btn-primary" on:click={() => goto(`/jastiper/shipping/${order.id}`)}>
              Atur Pengiriman
            </button>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  {#if filteredOrders.length === 0}
    <div class="empty-state">
      <div class="empty-icon">📦</div>
      <h3>Belum ada pesanan</h3>
      <p>Pesanan dari pembeli akan muncul di sini</p>
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

  .orders-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .order-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
  }

  .order-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
  }

  .order-code-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .order-code {
    font-size: 1.125rem;
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
  }

  .order-date {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .order-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .info-label {
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .buyer-name,
  .product-name {
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.25rem;
  }

  .buyer-phone,
  .product-meta {
    font-size: 0.875rem;
    color: #64748b;
  }

  .payment-method {
    font-weight: 600;
    color: #475569;
    margin-bottom: 0.25rem;
  }

  .payment-amount {
    font-size: 0.875rem;
    color: #64748b;
    margin-bottom: 0.25rem;
  }

  .total-amount {
    font-size: 1.125rem;
    font-weight: 800;
    color: #0ea5e9;
  }

  .dates-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .date-item {
    display: flex;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  .date-label {
    color: #94a3b8;
    font-weight: 600;
  }

  .date-value {
    color: #475569;
  }

  .order-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: 2px solid #f1f5f9;
  }

  .btn-primary,
  .btn-secondary {
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

    .order-content {
      grid-template-columns: 1fr;
    }

    .order-actions {
      flex-direction: column;
    }
  }
</style>
