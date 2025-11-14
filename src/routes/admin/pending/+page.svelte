<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import { orders, statusMeta } from '$lib/data/mockData';
  import { authStore } from '$lib/stores/auth';

  const initialQueue = orders
    .filter((order) => order.status === 'Menunggu_Review_Admin')
    .map((order) => ({
      ...order,
      state: 'pending'
    }));

  let queue = initialQueue;

  onMount(() => {
    const { role } = get(authStore);
    if (role !== 'admin') {
      goto(`/login?redirect=/admin/pending&expected=admin`);
    }
  });

  function accept(orderCode) {
    queue = queue.map((item) =>
      item.code === orderCode ? { ...item, state: 'accepted' } : item
    );
  }

  function decline(orderCode) {
    queue = queue.map((item) =>
      item.code === orderCode ? { ...item, state: 'declined' } : item
    );
  }

  function goToNegotiation(orderCode) {
    goto(`/admin/review/${orderCode}?mode=negosiasi`);
  }
</script>

<section class="pending">
  <a class="back-link" href="/admin">← Kembali</a>
  <header>
    <div>
      <h1>Antrian Permintaan Baru</h1>
      <p>
        Terima atau tolak permintaan pengguna sebelum masuk tahap negosiasi. Setelah diterima,
        lanjutkan ke halaman review untuk penanganan detail.
      </p>
    </div>
    <a href="/admin" class="back">← Kembali ke Dashboard</a>
  </header>

  <div class="list">
    {#if queue.length === 0}
      <p class="empty">
        Belum ada permintaan baru. Pesanan yang menunggu akan tampil di sini untuk kamu ambil.
      </p>
    {:else}
      {#each queue as order (order.code)}
        <article class="card">
          <header>
            <div>
              <h2>{order.code}</h2>
              <p>{order.store} · {order.country}</p>
            </div>
            <StatusBadge {statusMeta} status={order.status} />
          </header>
          <div class="info">
            <div>
              <span>Produk</span>
              <strong>{order.product}</strong>
            </div>
            <div>
              <span>Variasi</span>
              <strong>{order.variations}</strong>
            </div>
            <div>
              <span>Estimasi Total</span>
              <strong>Rp {order.estimate.toLocaleString('id-ID')}</strong>
            </div>
          </div>

          {#if order.state === 'pending'}
            <div class="actions">
              <button class="primary" type="button" on:click={() => accept(order.code)}>
                Ambil Pesanan
              </button>
              <button class="ghost danger" type="button" on:click={() => decline(order.code)}>
                Tolak Pesanan
              </button>
            </div>
          {:else if order.state === 'accepted'}
            <div class="accepted">
              ✅ Pesanan diambil. Lanjutkan ke halaman negosiasi.
              <button class="primary" type="button" on:click={() => goToNegotiation(order.code)}>
                Buka Halaman Negosiasi
              </button>
            </div>
          {:else}
            <div class="declined">
              ❌ Pesanan ditolak. Sistem akan mengirim notifikasi ke pengguna.
            </div>
          {/if}
        </article>
      {/each}
    {/if}
  </div>
</section>

<style>
  .back-link {
    display: inline-flex;
    width: fit-content;
    padding: 0.6rem 1.1rem;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.3);
    color: #0f172a;
    font-weight: 600;
  }
  .pending {
    padding: 4rem clamp(1.5rem, 5vw, 4rem);
    display: grid;
    gap: 2rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: flex-start;
  }

  header h1 {
    margin: 0;
  }

  header p {
    margin: 0.5rem 0 0 0;
    color: #475569;
    max-width: 640px;
  }

  .back {
    padding: 0.6rem 1.2rem;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.25);
    color: #0f172a;
    font-weight: 600;
  }

  .list {
    display: grid;
    gap: 1.5rem;
  }

  .card {
    background: white;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    box-shadow: 0 18px 30px rgba(15, 23, 42, 0.1);
    padding: 1.75rem;
    display: grid;
    gap: 1.25rem;
  }

  .card header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
  }

  .card h2 {
    margin: 0;
  }

  .card p {
    margin: 0.35rem 0 0 0;
    color: #64748b;
  }

  .info {
    display: grid;
    gap: 0.8rem;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

  .info span {
    display: block;
    color: #64748b;
    font-size: 0.85rem;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .primary,
  .ghost {
    padding: 0.75rem 1.4rem;
    border-radius: 999px;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }

  .primary {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .ghost {
    border: 1px solid rgba(148, 163, 184, 0.5);
    background: white;
    color: #0f172a;
  }

  .danger {
    border-color: rgba(239, 68, 68, 0.4);
    color: #b91c1c;
  }

  .accepted,
  .declined {
    background: rgba(14, 165, 233, 0.12);
    border-radius: 12px;
    padding: 1rem 1.2rem;
    display: grid;
    gap: 0.75rem;
    color: #0369a1;
    font-weight: 600;
  }

  .accepted button {
    justify-self: start;
  }

  .declined {
    background: rgba(239, 68, 68, 0.12);
    color: #b91c1c;
  }

  .empty {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 16px;
    border: 1px dashed rgba(148, 163, 184, 0.3);
    color: #64748b;
  }

  @media (max-width: 1024px) {
    .pending {
      padding: 2rem 1.5rem;
    }

    .info {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 720px) {
    .pending {
      padding: 1.5rem 1rem;
      gap: 1.5rem;
    }

    header {
      flex-direction: column;
      align-items: flex-start;
    }

    header h1 {
      font-size: 1.5rem;
    }

    .back {
      width: 100%;
      text-align: center;
    }

    .card {
      padding: 1.25rem;
    }

    .card header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .card h2 {
      font-size: 1.1rem;
    }

    .info {
      grid-template-columns: 1fr;
      gap: 0.6rem;
    }

    .actions {
      flex-direction: column;
    }

    .primary {
      width: 100%;
      text-align: center;
    }
  }
</style>
