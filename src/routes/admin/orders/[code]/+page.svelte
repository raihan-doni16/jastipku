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
    if (currentRole !== 'admin') {
      const currentPath = $page.url.pathname;
      goto(`/login?redirect=${encodeURIComponent(currentPath)}&expected=admin`);
    }
  });

  $: order = data.order;

  const formatDate = (value) =>
    new Date(value).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
</script>

<Navbar />

{#if !order}
  <section class="empty">
    <h1>Pesanan tidak ditemukan</h1>
    <a href="/admin">Kembali ke dashboard</a>
  </section>
{:else}
  <section class="order-detail">
    <header>
      <div>
        <a class="back-link" href="/admin">← Kembali</a>
        <h1>{order.code}</h1>
        <p>Dibuat {formatDate(order.createdAt)}</p>
      </div>
      <StatusBadge {statusMeta} status={order.status} />
    </header>

    <div class="grid">
      <article class="card">
        <h2>Pembeli</h2>
        <p class="title">{order.store ?? order.country}</p>
        <p>{order.product}</p>
        <p>{order.variations}</p>
      </article>
      <article class="card">
        <h2>Estimasi</h2>
        <p class="title">Rp {order.estimate.toLocaleString('id-ID')}</p>
        <ul>
          <li>Negara: {order.country}</li>
          <li>Toko: {order.store ?? '-'}</li>
        </ul>
      </article>
    </div>

    <article class="card">
      <h2>Timeline</h2>
      <ul class="timeline">
        {#each order.timeline ?? [] as item}
          <li>
            <strong>{item.status}</strong>
            <span>{item.timestamp}</span>
          </li>
        {/each}
      </ul>
    </article>
  </section>
{/if}

<style>
  .order-detail {
    padding: 3rem clamp(1.5rem, 5vw, 4rem);
    display: grid;
    gap: 1.5rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .back-link {
    color: #0ea5e9;
    font-weight: 600;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
  }

  .card {
    background: white;
    border-radius: 16px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    padding: 1.5rem;
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  }

  .card .title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .timeline {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0;
    display: grid;
    gap: 0.75rem;
  }

  .timeline li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(148, 163, 184, 0.3);
    padding-bottom: 0.5rem;
  }
</style>
