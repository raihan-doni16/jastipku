<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import Navbar from '$lib/components/Navbar.svelte';
  import { chatHistory, jastiperOrders, jastiperTransactions, listings } from '$lib/data/mockData';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'jastiper') {
      goto('/login?redirect=/jastiper&expected=jastiper');
    }
  });

  // Mock jastiper ID (in real app, this would come from auth)
  const currentJastiperId = 'JST001';

  // Filter data untuk jastiper yang sedang login
  $: myOrders = jastiperOrders.filter((order) => order.jastiperId === currentJastiperId);
  $: myListings = listings.filter((listing) => listing.jastiperId === currentJastiperId);
  $: myTransactions = jastiperTransactions.filter((trx) => trx.jastiperId === currentJastiperId);

  let selectedChatId = null;
  let chatDraft = '';
  let chats = chatHistory
    .filter((chat) => chat.jastiperId === currentJastiperId)
    .map((chat) => ({ ...chat, messages: [...chat.messages] }));

  $: if (!selectedChatId && chats.length > 0) {
    selectedChatId = chats[0].id;
  }

  $: selectedChat = chats.find((chat) => chat.id === selectedChatId) ?? null;

  // Calculate wallet balances
  $: pendingBalance = myTransactions
    .filter((t) => t.type === 'income' && t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  $: activeBalance = myTransactions
    .filter((t) => t.type === 'income' && t.status === 'released')
    .reduce((sum, t) => sum + t.amount, 0);

  // Order statistics
  $: newOrders = myOrders.filter((o) => o.status === 'waiting_purchase').length;
  $: purchasedOrders = myOrders.filter((o) => o.status === 'purchased').length;
  $: completedOrders = myOrders.filter((o) => o.status === 'completed').length;

  // Listing statistics
  $: activeListings = myListings.filter((l) => l.status === 'available').length;
  $: totalSold = myListings.reduce((sum, l) => sum + (l.sold || 0), 0);

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

  function formatChatTimestamp(value) {
    if (!value) return '';
    return new Date(value).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function formatLastMessageTime(date = new Date()) {
    const pad = (val) => String(val).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
      date.getHours()
    )}:${pad(date.getMinutes())}`;
  }

  function selectChat(id) {
    selectedChatId = id;
    chatDraft = '';
  }

  function sendMessage() {
    if (!chatDraft.trim() || !selectedChat) return;
    const text = chatDraft.trim();
    const timestamp = new Date().toISOString();
    const newMessage = {
      id: `MSG-${Date.now()}`,
      sender: 'jastiper',
      text,
      timestamp,
      read: true
    };
    chats = chats.map((chat) =>
      chat.id === selectedChat.id
        ? {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: text,
            lastMessageTime: formatLastMessageTime(new Date())
          }
        : chat
    );
    chatDraft = '';
  }
</script>

<Navbar />

<div class="container">
  <div class="header">
    <div>
      <h1>Dashboard Jastiper</h1>
      <p>Selamat datang kembali, Sarah Kim! 👋</p>
    </div>
    <a href="/jastiper/listings/create" class="btn-create">
      <span>+</span>
      Buat Postingan Baru
    </a>
  </div>

  <!-- KPI Cards -->
  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-icon" style="background: #eff6ff; color: #1e40af;">💰</div>
      <div class="kpi-content">
        <span class="kpi-label">Saldo Aktif</span>
        <span class="kpi-value" style="color: #0ea5e9;">{formatPrice(activeBalance)}</span>
        <span class="kpi-sublabel">Siap dicairkan</span>
      </div>
    </div>

    <div class="kpi-card">
      <div class="kpi-icon" style="background: #fef3c7; color: #92400e;">⏳</div>
      <div class="kpi-content">
        <span class="kpi-label">Saldo Tertahan</span>
        <span class="kpi-value" style="color: #f59e0b;">{formatPrice(pendingBalance)}</span>
        <span class="kpi-sublabel">Menunggu konfirmasi</span>
      </div>
    </div>

    <div class="kpi-card">
      <div class="kpi-icon" style="background: #dcfce7; color: #15803d;">📦</div>
      <div class="kpi-content">
        <span class="kpi-label">Pesanan Baru</span>
        <span class="kpi-value" style="color: #22c55e;">{newOrders}</span>
        <span class="kpi-sublabel">Perlu dibeli</span>
      </div>
    </div>

    <div class="kpi-card">
      <div class="kpi-icon" style="background: #fae8ff; color: #86198f;">📝</div>
      <div class="kpi-content">
        <span class="kpi-label">Listing Aktif</span>
        <span class="kpi-value" style="color: #a855f7;">{activeListings}</span>
        <span class="kpi-sublabel">Postingan tersedia</span>
      </div>
    </div>
  </div>

   <!-- Quick Stats -->
  <div class="stats-grid">
    <div class="stat-card">
      <span class="stat-icon">✅</span>
      <span class="stat-number">{completedOrders}</span>
      <span class="stat-label">Pesanan Selesai</span>
    </div>
    <div class="stat-card">
      <span class="stat-icon">🛒</span>
      <span class="stat-number">{purchasedOrders}</span>
      <span class="stat-label">Sudah Dibeli</span>
    </div>
    <div class="stat-card">
      <span class="stat-icon">⭐</span>
      <span class="stat-number">4.8</span>
      <span class="stat-label">Rating</span>
    </div>
    <div class="stat-card">
      <span class="stat-icon">🎯</span>
      <span class="stat-number">{totalSold}</span>
      <span class="stat-label">Total Penjualan</span>
    </div>
  </div>

  <!-- Main Content Grid -->
  <div class="content-grid">
    <!-- Recent Orders -->
    <div class="section-card">
      <div class="section-header">
        <h2>Pesanan Terbaru</h2>
        <a href="/jastiper/orders" class="link">Lihat Semua →</a>
      </div>

      {#if myOrders.length === 0}
        <div class="empty-state">
          <span class="empty-icon">📦</span>
          <p>Belum ada pesanan</p>
        </div>
      {:else}
        <div class="orders-list">
          {#each myOrders.slice(0, 5) as order (order.id)}
            <div class="order-item">
              <div class="order-info">
                <span class="order-code">{order.orderCode}</span>
                <span class="order-product">{order.productName}</span>
                <span class="order-buyer">Pembeli: {order.buyerName}</span>
              </div>
              <div class="order-meta">
                <span
                  class="status-badge"
                  style="background: {order.status === 'purchased'
                    ? '#dcfce7'
                    : '#fef3c7'}; color: {order.status === 'purchased' ? '#15803d' : '#92400e'}"
                >
                  {order.status === 'purchased' ? 'Sudah Dibeli' : 'Menunggu'}
                </span>
                <span class="order-amount">{formatPrice(order.totalPrice)}</span>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- My Listings -->
    <div class="section-card">
      <div class="section-header">
        <h2>Postingan Saya</h2>
        <a href="/jastiper/listings" class="link">Kelola →</a>
      </div>

      {#if myListings.length === 0}
        <div class="empty-state">
          <span class="empty-icon">📝</span>
          <p>Belum ada postingan</p>
        </div>
      {:else}
        <div class="listings-list">
          {#each myListings.slice(0, 3) as listing (listing.id)}
            <div class="listing-item">
              <div class="listing-icon">{listing.images[0]}</div>
              <div class="listing-info">
                <h4>{listing.title}</h4>
                <p class="listing-country">{listing.country}</p>
                <div class="listing-stats">
                  {#if listing.type === 'preloved'}
                    <span class="stat">Harga: {formatPrice(listing.price)}</span>
                  {:else}
                    <span class="stat">{listing.sold}/{listing.quota} slot</span>
                    <span class="stat">Fee: {listing.fee}%</span>
                  {/if}
                </div>
              </div>
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
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Recent Transactions -->
  <div class="section-card">
    <div class="section-header">
      <h2>Transaksi Terbaru</h2>
      <a href="/jastiper/wallet" class="link">Lihat Semua →</a>
    </div>

    {#if myTransactions.length === 0}
      <div class="empty-state">
        <span class="empty-icon">💳</span>
        <p>Belum ada transaksi</p>
      </div>
    {:else}
      <div class="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Deskripsi</th>
              <th>Tipe</th>
              <th>Status</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {#each myTransactions.slice(0, 5) as trx (trx.id)}
              <tr>
                <td>{formatDate(trx.createdAt)}</td>
                <td>{trx.description}</td>
                <td>
                  <span class="type-label" class:income={trx.type === 'income'} class:withdrawal={trx.type === 'withdrawal'}>
                    {trx.type === 'income' ? 'Pemasukan' : 'Penarikan'}
                  </span>
                </td>
                <td>
                  <span
                    class="status-badge small"
                    style="background: {trx.status === 'completed'
                      ? '#dcfce7'
                      : trx.status === 'released'
                        ? '#dbeafe'
                        : '#fef3c7'}; color: {trx.status === 'completed'
                      ? '#15803d'
                      : trx.status === 'released'
                        ? '#1e40af'
                        : '#92400e'}"
                  >
                    {trx.status === 'completed'
                      ? 'Selesai'
                      : trx.status === 'released'
                        ? 'Tersedia'
                        : 'Tertahan'}
                  </span>
                </td>
                <td>
                  <span class="amount" class:positive={trx.amount > 0} class:negative={trx.amount < 0}>
                    {formatPrice(Math.abs(trx.amount))}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>

 
</div>

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

  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .kpi-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .kpi-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    flex-shrink: 0;
  }

  .kpi-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .kpi-label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 600;
  }

  .kpi-value {
    font-size: 1.75rem;
    font-weight: 800;
  }

  .kpi-sublabel {
    font-size: 0.75rem;
    color: #94a3b8;
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .section-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .section-header h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
  }

  .link {
    color: #086adf;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .link:hover {
    text-decoration: underline;
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

  .orders-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
  }

  .order-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .order-code {
    font-weight: 700;
    color: #1f2937;
    font-size: 0.95rem;
  }

  .order-product {
    color: #64748b;
    font-size: 0.875rem;
  }

  .order-buyer {
    color: #94a3b8;
    font-size: 0.8rem;
  }

  .order-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .order-amount {
    font-weight: 700;
    color: #0ea5e9;
    font-size: 1rem;
  }

  .status-badge {
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .status-badge.small {
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
  }

  .listings-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .listing-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
  }

  .listing-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
  }

  .listing-info {
    flex: 1;
  }

  .listing-info h4 {
    font-size: 1rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.25rem;
  }

  .listing-country {
    color: #64748b;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .listing-stats {
    display: flex;
    gap: 1rem;
  }

  .listing-stats .stat {
    font-size: 0.8rem;
    color: #94a3b8;
  }

  .type-badge {
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    flex-shrink: 0;
  }

  .transactions-table {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    padding: 0.75rem 1rem;
    background: #f8fafc;
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid #f1f5f9;
    color: #1f2937;
    font-size: 0.9rem;
  }

  tr:last-child td {
    border-bottom: none;
  }

  .type-label {
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .type-label.income {
    background: #dcfce7;
    color: #15803d;
  }

  .type-label.withdrawal {
    background: #fee2e2;
    color: #991b1b;
  }

  .amount {
    font-weight: 700;
  }

  .amount.positive {
    color: #22c55e;
  }

  .amount.negative {
    color: #ef4444;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }

  .stat-icon {
    font-size: 2.5rem;
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

  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
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

    .kpi-grid {
      grid-template-columns: 1fr;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
