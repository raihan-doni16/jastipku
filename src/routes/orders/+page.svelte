<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import Navbar from '$lib/components/Navbar.svelte';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import { orders, statusMeta } from '$lib/data/mockData';
  import { authStore } from '$lib/stores/auth';

  let statusFilter = 'all';
  let search = '';

  $: filteredOrders = orders.filter((order) => {
    const matchStatus = statusFilter === 'all' || order.status === statusFilter;
    const term = search.trim().toLowerCase();
    const matchSearch =
      !term ||
      order.code.toLowerCase().includes(term) ||
      order.store.toLowerCase().includes(term) ||
      order.product.toLowerCase().includes(term);
    return matchStatus && matchSearch;
  });

  onMount(() => {
    const { role } = get(authStore);
    if (role !== 'user') {
      goto(`/login?redirect=/orders&expected=user`);
    }
  });
</script>

<Navbar />

<section class="orders">
  <header>
    <div>
      <h1>Pesanan Saya</h1>
      <p>Lihat status terbaru permintaan titip yang kamu ajukan.</p>
    </div>
  </header>

  <div class="filters">
    <div class="group">
      <label for="status">Status</label>
      <select id="status" bind:value={statusFilter}>
        <option value="all">Semua Status</option>
        {#each Object.keys(statusMeta) as key}
          <option value={key}>{statusMeta[key].label}</option>
        {/each}
      </select>
    </div>
    <div class="group">
      <label for="search">Cari</label>
      <input id="search" placeholder="Cari kode, toko, atau produk" bind:value={search} />
    </div>
  </div>

  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Kode Pesanan</th>
          <th>Negara</th>
          <th>Toko</th>
          <th>Ringkas Produk</th>
          <th>Status</th>
          <th>Estimasi Total</th>
          <th>Tanggal dibuat</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {#if filteredOrders.length === 0}
          <tr>
            <td colspan="8" class="empty">Belum ada pesanan dengan filter ini.</td>
          </tr>
        {:else}
          {#each filteredOrders as order}
            <tr>
              <td><a href={`/orders/${order.code}`}>{order.code}</a></td>
              <td>{order.country}</td>
              <td>{order.store}</td>
              <td>
                <strong>{order.product}</strong>
                <span>{order.variations}</span>
              </td>
              <td>
                <StatusBadge {statusMeta} status={order.status} />
              </td>
              <td>Rp {order.estimate.toLocaleString('id-ID')}</td>
              <td>{order.createdAt}</td>
              <td>
                <a class="detail-link" href={`/orders/${order.code}`}>Detail</a>
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  <div class="cards">
    {#each filteredOrders as order}
      <article class="order-card">
        <header>
          <a href={`/orders/${order.code}`}>{order.code}</a>
          <StatusBadge {statusMeta} status={order.status} />
        </header>
        <p class="store">{order.store} · {order.country}</p>
        <p class="product">{order.product}</p>
        <p class="variation">{order.variations}</p>
        <footer>
          <span>Estimasi: Rp {order.estimate.toLocaleString('id-ID')}</span>
          <span>Dibuat: {order.createdAt}</span>
        </footer>
        <a class="detail-link" href={`/orders/${order.code}`}>Detail Pesanan</a>
      </article>
    {/each}
  </div>
</section>

<style>
  .orders {
    padding: 4rem clamp(1.5rem, 5vw, 4rem);
    display: grid;
    gap: 2rem;
  }

  header {
    margin-bottom: 1rem;
  }

  header h1 {
    margin: 0;
  }

  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .group {
    display: grid;
    gap: 0.5rem;
  }

  select,
  input {
    padding: 0.75rem 1rem;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.4);
    background: white;
  }

  .table-wrapper {
    background: white;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 1rem 1.2rem;
    text-align: left;
    border-bottom: 1px solid rgba(148, 163, 184, 0.15);
  }

  th {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #64748b;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  td strong {
    display: block;
    color: #0f172a;
  }

  td span {
    color: #64748b;
    font-size: 0.9rem;
  }

  .empty {
    text-align: center;
    color: #64748b;
    padding: 2rem;
  }

  .cards {
    display: none;
  }

  .order-card {
    background: white;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
    padding: 1.5rem;
    display: grid;
    gap: 0.75rem;
  }

  .order-card header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .order-card .store {
    color: #475569;
    margin: 0;
  }

  .order-card .product {
    font-weight: 600;
  }

  .order-card footer {
    display: flex;
    justify-content: space-between;
    color: #64748b;
    font-size: 0.9rem;
  }

  .detail-link {
    display: inline-flex;
    color: #0ea5e9;
    font-weight: 600;
  }

  .order-card .detail-link {
    margin-top: 0.75rem;
  }

  @media (max-width: 860px) {
    .table-wrapper {
      display: none;
    }

    .cards {
      display: grid;
      gap: 1rem;
    }
  }

  @media (max-width: 600px) {
    header {
      flex-direction: column;
      align-items: flex-start;
    }

    .order-card footer {
      flex-direction: column;
      gap: 0.3rem;
    }
  }
</style>
