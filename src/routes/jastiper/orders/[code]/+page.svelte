<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import { statusMeta } from '$lib/data/mockData';
  import { authStore } from '$lib/stores/auth';

  export let data;

  let currentRole = 'guest';
  authStore.subscribe((val) => (currentRole = val.role));

  onMount(() => {
    if (currentRole !== 'jastiper') {
      const currentPath = $page.url.pathname;
      goto(`/login?redirect=${encodeURIComponent(currentPath)}&expected=jastiper`);
    }
  });

  $: order = data.order;

  const statusFlow = [
    { key: 'waiting_payment', label: 'Menunggu Pembayaran' },
    { key: 'paid', label: 'Pembayaran Lunas' },
    { key: 'dp_paid', label: 'DP Dibayar' },
    { key: 'waiting_purchase', label: 'Menunggu Pembelian' },
    { key: 'purchased', label: 'Barang Dibeli' },
    { key: 'shipping', label: 'Dalam Pengiriman' },
    { key: 'delivered', label: 'Sudah Dikirim' },
    { key: 'completed', label: 'Selesai' }
  ];

  $: reached = statusFlow.map((step) => ({
    ...step,
    active: order?.status === step.key,
    done:
      !!order &&
      statusFlow.findIndex((item) => item.key === order.status) >=
        statusFlow.findIndex((item) => item.key === step.key)
  }));

  const formatCurrency = (value = 0) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);

  const formatDate = (value) =>
    value
      ? new Date(value).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : '-';
</script>

<Navbar />

{#if !order}
  <section class="empty">
    <h1>Pesanan tidak ditemukan</h1>
    <a href="/jastiper/orders">Kembali ke daftar pesanan</a>
  </section>
{:else}
  <section class="order-detail">
    <header class="order-header">
      <div>
        <a href="/jastiper/orders" class="back-link">← Kembali</a>
        <h1>{order.orderCode}</h1>
        <p>Dibuat pada {formatDate(order.createdAt)}</p>
      </div>
      <StatusBadge {statusMeta} status={order.status} />
    </header>

    <div class="status-card">
      <h2>Progress Pesanan</h2>
      <div class="status-flow">
        {#each reached as step}
          <div class={`step ${step.done ? 'done' : ''} ${step.active ? 'active' : ''}`}>
            <div class="dot" />
            <span>{step.label}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="summary-grid">
      <article class="card">
        <h3>Informasi Pembeli</h3>
        <p class="highlight">{order.buyerName}</p>
        <p>{order.buyerPhone}</p>
        <p>{order.shippingAddress ?? 'Alamat belum tersedia'}</p>
      </article>
      <article class="card">
        <h3>Detail Produk</h3>
        <p class="highlight">{order.productName}</p>
        <p>Jumlah: {order.quantity}</p>
        <p>Link Produk: {order.productUrl ?? '-'}</p>
        <p>Catatan: {order.notes ?? '-'}</p>
      </article>
      <article class="card">
        <h3>Pembayaran</h3>
        <p>Metode: {order.paymentMethod === 'dp' ? 'DP 50%' : 'Full Payment'}</p>
        {#if order.dpAmount}
          <p>DP: {formatCurrency(order.dpAmount)}</p>
        {/if}
        <p>Total: {formatCurrency(order.totalPrice)}</p>
        <p>Fee Jastip: {formatCurrency(order.fee ?? 0)}</p>
      </article>
    </div>

    <div class="timeline-grid">
      <article class="card">
        <h3>Riwayat Waktu</h3>
        <ul class="timeline">
          <li>
            <span>Dibuat</span>
            <strong>{formatDate(order.createdAt)}</strong>
          </li>
          {#if order.paidAt}
            <li>
              <span>Dibayar</span>
              <strong>{formatDate(order.paidAt)}</strong>
            </li>
          {/if}
          {#if order.purchasedAt}
            <li>
              <span>Barang Dibeli</span>
              <strong>{formatDate(order.purchasedAt)}</strong>
            </li>
          {/if}
        </ul>
      </article>

      <article class="card actions-card">
        <h3>Aksi Cepat</h3>
        <div class="actions">
          <button type="button" class="primary">Update Status</button>
          <a href="/jastiper/chats" class="ghost">Hubungi Pembeli</a>
        </div>
      </article>
    </div>
  </section>
{/if}

<style>
  .order-detail {
    padding: 3rem clamp(1.5rem, 5vw, 4rem);
    display: grid;
    gap: 1.5rem;
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .back-link {
    display: inline-flex;
    margin-bottom: 0.75rem;
    color: #0ea5e9;
    font-weight: 600;
  }

  .status-card,
  .card {
    background: white;
    border-radius: 16px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    padding: 1.75rem;
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  }

  .status-card h2 {
    margin-top: 0;
  }

  .status-flow {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .step {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: #94a3b8;
    font-size: 0.85rem;
  }

  .step .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid currentColor;
  }

  .step.done {
    color: #0ea5e9;
  }

  .step.active {
    color: #1d4ed8;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.25rem;
  }

  .highlight {
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .timeline-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.25rem;
  }

  .timeline {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0;
    display: grid;
    gap: 0.85rem;
  }

  .timeline li {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
  }

  .actions-card .actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .primary,
  .ghost {
    flex: 1;
    padding: 0.9rem 1.2rem;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .primary {
    border: none;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .ghost {
    border: 1px solid #cbd5f5;
    background: transparent;
    color: #1f2937;
  }

  .empty {
    padding: 4rem;
    text-align: center;
    display: grid;
    gap: 1rem;
  }

  @media (max-width: 720px) {
    .order-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .actions-card .actions {
      flex-direction: column;
    }
  }
</style>
