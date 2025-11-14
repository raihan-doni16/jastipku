<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import { statusMeta } from '$lib/data/mockData';
  import { authStore } from '$lib/stores/auth';

  export let data;

  const actions = [
    { label: 'Setujui', status: 'Disetujui_Admin', variant: 'approve' },
    { label: 'Minta Negosiasi', status: 'Perlu_Negosiasi', variant: 'negotiate' },
    { label: 'Tolak', status: 'Dibatalkan', variant: 'reject' }
  ];

  let selectedAction = 'Disetujui_Admin';
  let reason = '';
  let requestDecision =
    data.order?.status === 'Menunggu_Review_Admin' ? 'pending' : 'accepted';
  let declineReason = '';

  function acceptRequest() {
    requestDecision = 'accepted';
    selectedAction = 'Disetujui_Admin';
  }

  function declineRequest() {
    requestDecision = 'rejected';
  }

  onMount(() => {
    const { role } = get(authStore);
    if (role !== 'admin') {
      const currentPath = get(page).url.pathname;
      goto(`/login?redirect=${encodeURIComponent(currentPath)}&expected=admin`);
    }
  });
</script>

{#if !data.order}
  <section class="empty">
    <h1>Pesanan tidak ditemukan</h1>
    <a href="/admin">Kembali ke Dashboard</a>
  </section>
{:else}
  <section class="review">
    <a class="back-link" href="/admin">← Kembali</a>
    <header>
      <div>
        <h1>{data.order.code}</h1>
        <p>{data.order.store} · {data.order.country}</p>
      </div>
      <StatusBadge statusMeta={statusMeta} status={data.order.status} />
    </header>

    <div class="layout">
      <article class="card detail">
        <h2>Detail Permintaan</h2>
        <dl>
          <dt>Produk</dt>
          <dd>{data.order.product}</dd>
          <dt>Variasi</dt>
          <dd>{data.order.variations}</dd>
          <dt>Estimasi Total</dt>
          <dd>Rp {data.order.estimate.toLocaleString('id-ID')}</dd>
        </dl>

        {#if requestDecision === 'accepted'}
          <h3>Form Final Produk</h3>
          <table>
            <thead>
              <tr>
                <th>Nama Produk</th>
                <th>Variasi</th>
                <th>Qty</th>
                <th>Harga Lokal</th>
                <th>Harga IDR</th>
                <th>Lampiran</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input value={data.order.product} />
                </td>
                <td>
                  <input value={data.order.variations} />
                </td>
                <td>
                  <input type="number" min="1" value="1" />
                </td>
                <td>
                  <input value="¥ 18.000" />
                </td>
                <td>
                  <input value="Rp 2.160.000" />
                </td>
                <td>
                  <button class="ghost" type="button">Upload Nota</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="summary">
            <div>
              <span>Subtotal Belanja</span>
              <strong>Rp 2.160.000</strong>
            </div>
            <div>
              <span>Pajak (opsional)</span>
              <input placeholder="Rp 0" />
            </div>
            <div>
              <span>Fee Jastip (persentase)</span>
              <input value="8%" />
            </div>
            <div>
              <span>Total Akhir</span>
              <strong>Rp 2.332.800</strong>
            </div>
          </div>

          <button class="primary" type="button">Kirim ke Pembeli</button>
        {:else if requestDecision === 'rejected'}
          <div class="empty-state">
            <p>Pesanan ditolak. Sampaikan alasan penolakan kepada pengguna.</p>
            <textarea
              rows="3"
              placeholder="Contoh: Produk tidak tersedia atau melebihi batas bagasi."
              bind:value={declineReason}
            />
            <button class="ghost" type="button">Kirim Alasan Penolakan</button>
          </div>
        {/if}
      </article>

      <aside class="panel">
        <div class="card decision">
          <h2>Ambil Pesanan?</h2>
          <p class="decision-hint">
            Terima atau tolak pesanan sebelum proses negosiasi dimulai (mirip konfirmasi driver).
          </p>
          {#if requestDecision === 'pending'}
            <div class="decision-actions">
              <button class="primary" type="button" on:click={acceptRequest}>Terima Permintaan</button>
              <button class="ghost danger" type="button" on:click={declineRequest}>Tolak Permintaan</button>
            </div>
          {:else if requestDecision === 'accepted'}
            <div class="accepted">
              ✅ Pesanan diterima. Lanjutkan negosiasi atau finalisasi produk.
            </div>
          {:else}
            <div class="declined">
              ❌ Pesanan ditolak. Kirim alasan resmi ke pengguna.
            </div>
          {/if}
        </div>

        {#if requestDecision === 'accepted'}
          <div class="card chat">
            <h2>Catatan Negosiasi</h2>
            <div class="thread">
              {#each data.negotiationNotes as note}
                <div class="note">
                  <header>
                    <strong>{note.author}</strong>
                    <span>{note.time}</span>
                  </header>
                  <p>{note.message}</p>
                </div>
              {/each}
            </div>
            <textarea rows="3" placeholder="Tambahkan catatan untuk pembeli" />
            <button class="ghost" type="button">Kirim Catatan</button>
          </div>

          <div class="card actions">
            <h2>Tindakan Lanjutan</h2>
            <div class="action-list">
              {#each actions as action}
                <label class={`radio ${action.variant}`}>
                  <input
                    type="radio"
                    name="action"
                    value={action.status}
                    bind:group={selectedAction}
                  />
                  <span>{action.label}</span>
                </label>
              {/each}
            </div>
            {#if selectedAction !== 'Disetujui_Admin'}
              <textarea
                rows="3"
                placeholder="Tuliskan alasan"
                bind:value={reason}
              />
            {/if}
            <button class="primary" type="button">Simpan Keputusan</button>
          </div>
        {/if}
      </aside>
    </div>
  </section>
{/if}

<style>
  .back-link {
    display: inline-flex;
    width: fit-content;
    padding: 0.6rem 1.1rem;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.2);
    color: #0f172a;
    font-weight: 600;
  }

  .empty {
    padding: 4rem;
    text-align: center;
    display: grid;
    gap: 1rem;
  }

  .review {
    padding: 4rem clamp(1.5rem, 5vw, 4rem);
    display: grid;
    gap: 2rem;
  }

  header h1 {
    margin: 0 0 0.2rem 0;
  }

  header p {
    margin: 0;
    color: #475569;
  }

  .layout {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: minmax(0, 2fr) minmax(220px, 1fr);
    align-items: start;
  }

  .card {
    background: white;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
    padding: 1.5rem;
    display: grid;
    gap: 1.2rem;
    max-width: 100%;
    overflow: hidden;
  }

  .detail dl {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 0.5rem 1rem;
    margin: 0;
  }

  dt {
    font-weight: 600;
    color: #475569;
  }

  dd {
    margin: 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.75rem 0.5rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.2);
    text-align: left;
  }

  th:first-child,
  td:first-child {
    padding-left: 0;
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }

  input,
  textarea {
    width: 100%;
    max-width: 100%;
    padding: 0.75rem 0.9rem;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    background: #f8fafc;
    box-sizing: border-box;
    font-family: inherit;
  }

  .ghost,
  .primary {
    padding: 0.7rem 1.4rem;
    border-radius: 999px;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }

  .ghost {
    background: white;
    border: 1px solid rgba(148, 163, 184, 0.4);
  }

  .primary {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .summary {
    display: grid;
    gap: 0.8rem;
  }

  .summary div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .summary input {
    width: 140px;
  }

  .panel {
    display: grid;
    gap: 1.5rem;
  }

  .chat .thread {
    display: grid;
    gap: 0.75rem;
    max-height: 220px;
    overflow-y: auto;
  }

  .note {
    padding: 0.75rem 1rem;
    border-radius: 12px;
    background: #f8fafc;
  }

  .note header {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #64748b;
    margin-bottom: 0.3rem;
  }

  .note p {
    margin: 0;
  }

  .decision {
    display: grid;
    gap: 0.75rem;
  }

  .decision-hint {
    margin: 0;
    color: #475569;
    font-size: 0.9rem;
  }

  .decision-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .danger {
    border-color: rgba(239, 68, 68, 0.4);
    color: #b91c1c;
  }

  .accepted,
  .declined {
    padding: 0.75rem 1rem;
    border-radius: 12px;
    font-weight: 600;
    background: rgba(34, 197, 94, 0.12);
    color: #166534;
  }

  .declined {
    background: rgba(239, 68, 68, 0.12);
    color: #b91c1c;
  }

  .empty-state {
    display: grid;
    gap: 0.75rem;
  }

  .actions .action-list {
    display: grid;
    gap: 0.5rem;
  }

  .radio {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.3);
  }

  .radio input {
    width: auto;
    accent-color: #086adf;
  }

  .radio.approve {
    background: rgba(34, 197, 94, 0.08);
  }

  .radio.negotiate {
    background: rgba(249, 115, 22, 0.08);
  }

  .radio.reject {
    background: rgba(239, 68, 68, 0.08);
  }

  @media (max-width: 1024px) {
    .review {
      padding: 2rem 1.5rem;
    }

    .layout {
      grid-template-columns: 1fr;
    }

    .panel {
      order: -1;
    }
  }

  @media (max-width: 720px) {
    .review {
      padding: 1.5rem 1rem;
      gap: 1.5rem;
    }

    .card {
      padding: 1.25rem;
      gap: 1rem;
    }

    header h1 {
      font-size: 1.5rem;
    }

    .detail dl {
      grid-template-columns: 1fr;
      gap: 0.3rem 0;
    }

    table {
      font-size: 0.9rem;
    }

    th,
    td {
      padding: 0.6rem 0.4rem;
    }

    .summary input {
      width: 100px;
      font-size: 0.9rem;
    }

    .decision-actions {
      flex-direction: column;
    }

    .decision-actions button {
      width: 100%;
    }

    .ghost,
    .primary {
      width: 100%;
      text-align: center;
    }

    .chat .thread {
      max-height: 160px;
    }
  }
</style>
