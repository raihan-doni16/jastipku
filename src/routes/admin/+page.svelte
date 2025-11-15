<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import {
    kpis,
    orders,
    jastiperTransactions,
    listings,
    jastipers
  } from '$lib/data/mockData';
  import { authStore } from '$lib/stores/auth';

  const pendingOrders = orders.filter((item) => item.status === 'Menunggu_Review_Admin');
  const negotiationOrders = orders.filter((item) => item.status === 'Perlu_Negosiasi');
  const activeOrders = orders.filter(
    (item) =>
      item.status !== 'Menunggu_Review_Admin' && item.status !== 'Perlu_Negosiasi'
  );

  const transactionSummary = {
    volume: jastiperTransactions.reduce((sum, trx) => sum + trx.amount, 0),
    held: jastiperTransactions.filter((trx) => trx.status === 'held').length,
    pending: jastiperTransactions.filter((trx) => trx.status === 'pending').length,
    released: jastiperTransactions.filter((trx) => trx.status === 'released').length
  };

  const recentTransactions = [...jastiperTransactions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const listingSummary = [
    {
      label: 'Listing Aktif',
      value: listings.filter((item) => item.status === 'available').length,
      accent: '#0ea5e9'
    },
    {
      label: 'Tipe Jastip',
      value: listings.filter((item) => item.type === 'jastip').length,
      accent: '#22c55e'
    },
    {
      label: 'Tipe Preloved',
      value: listings.filter((item) => item.type === 'preloved').length,
      accent: '#f97316'
    },
    {
      label: 'Event Aktif',
      value: listings.filter((item) => item.type === 'event').length,
      accent: '#a855f7'
    }
  ];

  const topListings = [...listings]
    .sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0))
    .slice(0, 3);

  const jastiperStats = {
    verified: jastipers.filter((item) => item.status === 'verified' || item.verified).length,
    pending: jastipers.filter((item) => item.status !== 'verified' && !item.verified).length,
    avgRating:
      jastipers.length > 0
        ? (jastipers.reduce((sum, item) => sum + item.rating, 0) / jastipers.length).toFixed(1)
        : '0.0'
  };

  const topJastipers = [...jastipers]
    .sort((a, b) => b.rating - a.rating || b.totalTrips - a.totalTrips)
    .slice(0, 3);

  function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  }

  function formatDate(value) {
    return new Date(value).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short'
    });
  }

  onMount(() => {
    const { role } = get(authStore);
    if (role !== 'admin') {
      goto(`/login?redirect=/admin&expected=admin`);
    }
  });
</script>

<section class="admin">
  <header>
    <div>
      <h1>Dashboard Admin</h1>
      <p>Monitor antrian permintaan dan tindak lanjuti secara real-time.</p>
    </div>
    <!-- <a class="pending-link" href="/admin/pending">
      Lihat {pendingOrders.length} pesanan menunggu keputusan
    </a> -->
  </header>

  <div class="kpis">
    {#each kpis as item}
      <div class="kpi-card" style={`--color: ${item.color}`}>
        <span class="label">{item.label}</span>
        <strong>{item.value}</strong>
      </div>
    {/each}
  </div>


  <section class="insights">
    <article class="panel transactions-panel">
      <div class="panel-header">
        <div>
          <h2>Ringkasan Transaksi</h2>
          <p>Performa escrow, release, dan payout jastiper.</p>
        </div>
        <a href="/admin/transactions" class="panel-link">Kelola</a>
      </div>

      <div class="transaction-stats">
        <div class="stat-card">
          <span class="label">Volume 30 hari</span>
          <strong>{formatCurrency(transactionSummary.volume)}</strong>
        </div>
        <div class="stat-card">
          <span class="label">Dana Ditahan</span>
          <strong>{transactionSummary.held}</strong>
          <small>menunggu bukti kirim</small>
        </div>
        <div class="stat-card">
          <span class="label">Payout Pending</span>
          <strong>{transactionSummary.pending}</strong>
          <small>butuh approval</small>
        </div>
        <div class="stat-card">
          <span class="label">Payout Release</span>
          <strong>{transactionSummary.released}</strong>
          <small>siap dicairkan</small>
        </div>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Order</th>
              <th>Jastiper</th>
              <th>Status</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {#each recentTransactions as trx}
              <tr>
                <td>{formatDate(trx.createdAt)}</td>
                <td>
                  <a class="link-inline" href={`/admin/orders/${trx.orderCode}`}>
                    {trx.orderCode}
                  </a>
                </td>
                <td>{trx.jastiperName}</td>
                <td>
                  <span class={`status-chip ${trx.status}`}>
                    {trx.status === 'held'
                      ? 'Ditahan'
                      : trx.status === 'released'
                        ? 'Tersedia'
                        : trx.status === 'pending'
                          ? 'Pending'
                          : 'Selesai'}
                  </span>
                </td>
                <td>{formatCurrency(trx.amount)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </article>

    <article class="panel listings-panel">
      <div class="panel-header">
        <div>
          <h2>Ringkasan Postingan</h2>
          <p>Aktivitas konten jastip, preloved dan event.</p>
        </div>
        <a href="/admin/posts" class="panel-link">Moderasi</a>
      </div>

      <div class="listing-summary">
        {#each listingSummary as item}
          <div class="summary-chip" style={`--accent: ${item.accent}`}>
            <span class="chip-label">{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        {/each}
      </div>

      <div class="top-listings">
        {#each topListings as listing}
          <div class="listing-card">
            <div class="listing-icon">
              {#if listing.images?.length && listing.images[0]?.startsWith('http')}
                <img src={listing.images[0]} alt={listing.title} loading="lazy" />
              {:else}
                <div class="listing-placeholder">
                  {listing.images?.[0] ?? '📦'}
                </div>
              {/if}
            </div>
            <div>
              <h3>{listing.title}</h3>
              <p>{listing.country}</p>
              <div class="listing-meta">
                <span>{listing.type === 'jastip' ? 'Jastip' : listing.type}</span>
                <span>{listing.sold ?? 0}/{listing.quota ?? 0} slot</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </article>

    <article class="panel jastiper-panel">
      <div class="panel-header">
        <div>
          <h2>Performa Jastiper</h2>
          <p>Gap supply, rating, dan top performers.</p>
        </div>
        <a href="/admin/jastiper" class="panel-link">Review</a>
      </div>

      <div class="jastiper-stats">
        <div>
          <span class="label">Terverifikasi</span>
          <strong>{jastiperStats.verified}</strong>
        </div>
        <div>
          <span class="label">Menunggu</span>
          <strong>{jastiperStats.pending}</strong>
        </div>
        <div>
          <span class="label">Rata-rata Rating</span>
          <strong>{jastiperStats.avgRating}</strong>
        </div>
      </div>

      <div class="top-jastipers">
        {#each topJastipers as performer}
          <div class="jastiper-row">
            <div class="avatar">
              {#if performer.avatar?.startsWith('http')}
                <img src={performer.avatar} alt={performer.name} loading="lazy" />
              {:else}
                <div class="avatar-placeholder">
                  {performer.avatar ?? '👤'}
                </div>
              {/if}
            </div>
            <div class="info">
              <strong>{performer.name}</strong>
              <span>{performer.country} · {performer.totalTrips} trip</span>
            </div>
            <div class="rating">⭐ {performer.rating}</div>
          </div>
        {/each}
      </div>
    </article>
  </section>
</section>

<style>
  .admin {
    padding: 4rem clamp(1.5rem, 5vw, 4rem);
    display: grid;
    gap: 2rem;
  }

  header h1 {
    margin: 0;
  }

  .kpis {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
  }

  .kpi-card {
    background: color-mix(in srgb, var(--color) 15%, white 85%);
    border: 1px solid color-mix(in srgb, var(--color) 45%, white 55%);
    border-radius: 16px;
    padding: 1.5rem;
    display: grid;
    gap: 0.5rem;
  }

  .kpi-card .label {
    color: #475569;
    font-weight: 600;
  }

  .kpi-card strong {
    font-size: 2rem;
  }

  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .insights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .panel {
    background: white;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 18px 36px rgba(15, 23, 42, 0.15);
    padding: 1.75rem;
    display: grid;
    gap: 1.25rem;
  }

  .transactions-panel {
    grid-column: span 2;
  }

  @media (max-width: 1024px) {
    .transactions-panel {
      grid-column: span 1;
    }
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .panel-header h2 {
    margin: 0;
  }

  .panel-header p {
    margin: 0.4rem 0 0;
    color: #64748b;
  }

  .panel-link {
    color: #0ea5e9;
    font-weight: 600;
  }

  .transaction-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }

  .stat-card {
    padding: 1rem;
    border-radius: 16px;
    background: #f8fafc;
    display: grid;
    gap: 0.2rem;
  }

  .stat-card .label {
    color: #475569;
    font-weight: 600;
  }

  .stat-card small {
    color: #94a3b8;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .panel table {
    width: 100%;
    border-collapse: collapse;
  }

  .link-inline {
    color: #0ea5e9;
    font-weight: 600;
  }

  .panel th,
  .panel td {
    text-align: left;
    padding: 0.75rem 0.5rem;
  }

  .panel thead th {
    font-size: 0.85rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .panel tbody tr {
    border-top: 1px solid #e2e8f0;
  }

  .status-chip {
    padding: 0.2rem 0.8rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .status-chip.held {
    background: #fef3c7;
    color: #b45309;
  }

  .status-chip.released {
    background: #dbeafe;
    color: #1d4ed8;
  }

  .status-chip.pending {
    background: #fee2e2;
    color: #b91c1c;
  }

  .status-chip.completed {
    background: #dcfce7;
    color: #15803d;
  }

  .listing-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
  }

  .summary-chip {
    border-radius: 14px;
    padding: 0.85rem;
    background: color-mix(in srgb, var(--accent) 15%, white 85%);
    border: 1px solid color-mix(in srgb, var(--accent) 35%, white 65%);
    display: grid;
    gap: 0.2rem;
  }

  .summary-chip .chip-label {
    font-size: 0.8rem;
    color: #475569;
  }

  .top-listings {
    display: grid;
    gap: 0.75rem;
  }

  .listing-card {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: center;
  }

  .listing-card h3 {
    margin: 0;
    font-size: 1rem;
  }

  .listing-card p {
    margin: 0.1rem 0 0;
    color: #94a3b8;
  }

  .listing-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: #f1f5f9;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .listing-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .listing-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .listing-meta {
    display: flex;
    gap: 0.75rem;
    font-size: 0.8rem;
    color: #475569;
  }

  .jastiper-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
  }

  .jastiper-stats .label {
    color: #64748b;
    font-size: 0.8rem;
  }

  .top-jastipers {
    display: grid;
    gap: 0.75rem;
  }

  .jastiper-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.75rem;
    align-items: center;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: #f1f5f9;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .jastiper-row .info span {
    color: #94a3b8;
    font-size: 0.85rem;
  }

  .rating {
    font-weight: 600;
    color: #f97316;
  }

  .pending-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1.2rem;
    border-radius: 999px;
    background: rgba(14, 165, 233, 0.15);
    color: #0369a1;
    font-weight: 600;
  }

  .menu-card {
    background: white;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 16px 30px rgba(15, 23, 42, 0.12);
    padding: 1.8rem;
    display: grid;
    gap: 1rem;
  }

  .menu-card h2 {
    margin: 0;
  }

  .menu-card p {
    margin: 0;
    color: #475569;
  }

  .menu-card .cta {
    width: fit-content;
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    font-weight: 600;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .menu-card .cta.secondary {
    background: linear-gradient(135deg, #f97316, #fb923c);
  }

  .menu-card .cta.tertiary {
    background: linear-gradient(135deg, #10b981, #22d3ee);
  }

  @media (max-width: 720px) {
    .pending-link {
      width: 100%;
      justify-content: center;
    }
  }
</style>
