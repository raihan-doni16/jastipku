<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import { statusMeta } from '$lib/data/mockData';
  import { authStore } from '$lib/stores/auth';

  export let data;

  const tabs = ['Ringkasan', 'Chat', 'Negosiasi', 'Final Produk', 'Pengiriman', 'Riwayat'];
  let activeTab = 'Ringkasan';
  let showModal = false;
  let showPelunasanModal = false;

  $: order = data.order;
  $: costBreakdown = data.costBreakdown;
  $: chats = data.chats ?? [];
  $: history = data.history ?? [];

  $: whatsappLink = order
    ? `https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20ingin%20tanya%20pesanan%20${order.code}`
    : '#';

  onMount(() => {
    const { role } = get(authStore);
    if (role !== 'user') {
      const currentPath = get(page).url.pathname;
      goto(`/login?redirect=${encodeURIComponent(currentPath)}&expected=user`);
    }
  });
</script>

<Navbar />

{#if !order}
  <section class="empty">
    <h1>Pesanan tidak ditemukan</h1>
    <a href="/orders">Kembali ke Pesanan Saya</a>
  </section>
{:else}
  <section class="detail">
    <a class="back-link" href="/orders">← Kembali</a>
    <header class="order-header">
      <h1>{order.code}</h1>
      <StatusBadge {statusMeta} status={order.status} />
      <p>Dibuat: {order.createdAt} · Estimasi total Rp {order.estimate.toLocaleString('id-ID')}</p>
    </header>

    <nav class="tab-nav">
      {#each tabs as tab}
        <button
          class:active={activeTab === tab}
          on:click={() => (activeTab = tab)}
        >
          {tab}
        </button>
      {/each}
    </nav>

    {#if activeTab === 'Ringkasan'}
      <div class="grid ringkasan">
        <article class="card">
          <h2>Informasi Pemesanan</h2>
          <div class="row">
            <span>Negara</span>
            <strong>{order.country}</strong>
          </div>
          <div class="row">
            <span>Toko</span>
            <strong>{order.store}</strong>
          </div>
          <div class="row">
            <span>Produk</span>
            <strong>{order.product}</strong>
          </div>
          <div class="row">
            <span>Variasi</span>
            <strong>{order.variations}</strong>
          </div>
        </article>
        <article class="card cost">
          <h2>Estimasi Biaya</h2>
          <ul>
            <li>
              <span>Harga Minimum</span>
              <strong>Rp {costBreakdown.min.toLocaleString('id-ID')}</strong>
            </li>
            <li>
              <span>Harga Maksimum</span>
              <strong>Rp {costBreakdown.max.toLocaleString('id-ID')}</strong>
            </li>
            <li>
              <span>Fee Jastip (8%)</span>
              <strong>Rp {costBreakdown.fee.toLocaleString('id-ID')}</strong>
            </li>
            <li>
              <span>Admin & Logistik</span>
              <strong>Rp {costBreakdown.adminFees.toLocaleString('id-ID')}</strong>
            </li>
          </ul>
          <div class="total">
            <span>Total Estimasi</span>
            <strong>Rp {costBreakdown.total.toLocaleString('id-ID')}</strong>
          </div>
          {#if order.status === 'Menunggu_Bayar_Pajak'}
            <div class="pelunasan-actions">
              <button class="primary" on:click={() => (showPelunasanModal = true)}>
                Bayar Pelunasan
              </button>
              <p class="pelunasan-note">
                Tagihan pajak dan pelunasan akan dikonfirmasi oleh admin. (Demo)
              </p>
            </div>
          {/if}
        </article>
      </div>
    {/if}

    {#if activeTab === 'Chat'}
      <div class="chat">
        <div class="conversation">
          {#each chats as item}
            <div class="bubble {item.sender === 'User' ? 'user' : 'admin'}">
              <header>
                <strong>{item.sender}</strong>
                <span>{item.time}</span>
              </header>
              <p>{item.message}</p>
            </div>
          {/each}
        </div>
        <div class="composer">
          <textarea placeholder="Tulis pesan untuk admin..." rows="3" />
          <div class="composer-actions">
            <button class="ghost">Lampirkan</button>
            <button class="primary">Kirim</button>
          </div>
          <a class="wa" href={whatsappLink} target="_blank" rel="noreferrer">
            Whatsapp Admin
          </a>
        </div>
      </div>
    {/if}

    {#if activeTab === 'Negosiasi'}
      <div class="negosiasi card">
        <h2>Ajukan Counter-Offer</h2>
        <label for="counter">Harga Baru</label>
        <input id="counter" type="number" placeholder="Masukkan harga baru (Rp)" />
        <label for="notes">Catatan Negosiasi</label>
        <textarea id="notes" rows="3" placeholder="Tambahkan catatan untuk admin" />
        <button class="primary">Kirim Negosiasi</button>
      </div>
    {/if}

    {#if activeTab === 'Final Produk'}
      <div class="card final">
        <h2>Detail Produk Final (Mock Admin Upload)</h2>
        <table>
          <thead>
            <tr>
              <th>Nama Item</th>
              <th>Variasi</th>
              <th>Qty</th>
              <th>Harga Lokal</th>
              <th>Harga IDR</th>
              <th>Lampiran</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{order.product}</td>
              <td>{order.variations}</td>
              <td>1</td>
              <td>¥ 18.000</td>
              <td>Rp 2.160.000</td>
              <td><a href="#">Nota.png</a></td>
            </tr>
          </tbody>
        </table>
        <div class="totals">
          <div>
            <span>Subtotal Belanja</span>
            <strong>Rp 2.160.000</strong>
          </div>
          <div>
            <span>Fee Jastip (8%)</span>
            <strong>Rp 172.800</strong>
          </div>
          <div>
            <span>Total Akhir</span>
            <strong>Rp 2.332.800</strong>
          </div>
        </div>
        <div class="actions">
          <button class="primary" on:click={() => (showModal = true)}>Setujui Produk Final</button>
          <button class="ghost">Ajukan Perubahan</button>
        </div>
      </div>
    {/if}

    {#if activeTab === 'Pengiriman'}
      <div class="card pengiriman">
        <h2>Detail Pengiriman</h2>
        <div class="grid-pengiriman">
          <div class="field">
            <label for="maskapai">Maskapai</label>
            <select id="maskapai">
              <option>Japan Airlines</option>
              <option>Garuda Indonesia</option>
              <option>Singapore Airlines</option>
            </select>
          </div>
          <div class="field">
            <label for="no-penerbangan">No. Penerbangan</label>
            <input id="no-penerbangan" placeholder="Contoh: JL725" />
          </div>
          <div class="field">
            <label for="berangkat">Berangkat</label>
            <input id="berangkat" type="datetime-local" />
          </div>
          <div class="field">
            <label for="tiba">Tiba</label>
            <input id="tiba" type="datetime-local" />
          </div>
          <div class="field">
            <label for="ekspedisi">Ekspedisi Domestik</label>
            <select id="ekspedisi">
              <option>JNE</option>
              <option>J&T</option>
              <option>SiCepat</option>
            </select>
          </div>
          <div class="field">
            <label for="resi">Nomor Resi</label>
            <input id="resi" placeholder="Isi nomor resi" />
          </div>
          <div class="field full-width">
            <label for="estimasi">Estimasi Tiba</label>
            <input id="estimasi" type="date" />
          </div>
          <div class="field full-width">
            <label for="upload">Upload Airway Bill / Resi</label>
            <div id="upload" class="upload">Drag & drop berkas</div>
          </div>
        </div>

        <div class="timeline">
          <h3>Timeline Tracking</h3>
          <ul>
            {#each order.timeline ?? [] as item}
              <li>
                <span class="status">{item.status}</span>
                <span class="time">{item.timestamp}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/if}

    {#if activeTab === 'Riwayat'}
      <div class="history">
        {#each history as item}
          <article class="card">
            <strong>{statusMeta[item.status]?.label ?? item.status}</strong>
            <span class="time">{item.time}</span>
            <p>{item.desc}</p>
          </article>
        {/each}
      </div>
    {/if}
  </section>
{/if}

<Modal
  bind:isOpen={showModal}
  title="Konfirmasi Pembelian Final"
  showCancel={true}
  confirmText="Setujui"
  cancelText="Ajukan Perubahan"
>
  <div class="order-modal">
    <table class="order-modal-table">
      <thead>
        <tr>
          <th>Nama Produk</th>
          <th>Variasi</th>
          <th>Qty</th>
          <th>Harga IDR</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{order.product}</td>
          <td>{order.variations}</td>
          <td>1</td>
          <td>Rp 2.332.800</td>
        </tr>
      </tbody>
    </table>
  </div>
</Modal>

<Modal
  bind:isOpen={showPelunasanModal}
  title="Bayar Pelunasan"
  showCancel={true}
  confirmText="Saya Sudah Bayar"
  cancelText="Tutup"
>
  <div class="order-modal">
    <p>
      Ini adalah simulasi pelunasan. Silakan lakukan pembayaran pajak dan pelunasan sesuai
      instruksi admin, lalu upload bukti pembayaran di sistem.
    </p>
  </div>
</Modal>

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
    gap: 1.5rem;
  }

  .detail {
    padding: 4rem clamp(1.5rem, 5vw, 4rem);
    display: grid;
    gap: 2rem;
  }

  .order-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .order-header h1 {
    margin: 0;
  }

  .order-header p {
    color: #475569;
  }

  .tab-nav {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tab-nav button {
    padding: 0.6rem 1.2rem;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    background: white;
    cursor: pointer;
    font-weight: 600;
    color: #475569;
  }

  .tab-nav button.active {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
    border-color: transparent;
  }

  .grid.ringkasan {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  .card {
    background: white;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
    padding: 2rem;
    display: grid;
    gap: 1rem;
    max-width: 100%;
    overflow: hidden;
  }

  .card h2 {
    font-size: 1.35rem;
    margin: 0 0 1.25rem 0;
    color: #0f172a;
    font-weight: 700;
  }

  .row {
    display: flex;
    justify-content: space-between;
    color: #475569;
  }

  .row strong {
    color: #0f172a;
  }

  .cost ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0.75rem;
  }

  .cost li {
    display: flex;
    justify-content: space-between;
  }

  .cost .total {
    padding-top: 1rem;
    border-top: 1px solid rgba(148, 163, 184, 0.2);
    display: flex;
    justify-content: space-between;
    font-size: 1.125rem;
  }

  .pelunasan-actions {
    margin-top: 1.25rem;
    display: grid;
    gap: 0.5rem;
  }

  .pelunasan-note {
    font-size: 0.85rem;
    color: #92400e;
  }

  .chat {
    display: grid;
    gap: 1.5rem;
  }

  .conversation {
    display: grid;
    gap: 1rem;
  }

  .bubble {
    padding: 1rem 1.25rem;
    border-radius: 16px;
    max-width: min(80%, 26rem);
    background: #f1f5f9;
    color: #1f2937;
  }

  .bubble.admin {
    background: rgba(14, 165, 233, 0.15);
    border: 1px solid rgba(14, 165, 233, 0.3);
  }

  .bubble.user {
    margin-left: auto;
    background: #eef2ff;
    border: 1px solid rgba(99, 102, 241, 0.3);
  }

  .bubble header {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #64748b;
    margin-bottom: 0.4rem;
  }

  .bubble p {
    margin: 0;
  }

  .composer {
    display: grid;
    gap: 0.75rem;
  }

  textarea {
    width: 100%;
    max-width: 100%;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    padding: 0.85rem 1rem;
    font-family: inherit;
    box-sizing: border-box;
  }

  .composer-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }

  .ghost,
  .primary {
    padding: 0.6rem 1.4rem;
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

  .wa {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem 1.2rem;
    background: #22c55e;
    color: white;
    border-radius: 12px;
    font-weight: 600;
    width: fit-content;
  }

  .negosiasi {
    max-width: 32rem;
  }

  .negosiasi input,
  .negosiasi textarea {
    width: 100%;
    max-width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    box-sizing: border-box;
    font-family: inherit;
  }

  select,
  input {
    padding: 0.8rem 1rem;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.3);
  }

  .final table {
    width: 100%;
    border-collapse: collapse;
  }

  .final th,
  .final td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.2);
    text-align: left;
  }

  .final .totals {
    display: grid;
    gap: 0.6rem;
  }

  .final .totals div {
    display: flex;
    justify-content: space-between;
  }

  .pengiriman .grid-pengiriman {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    margin-bottom: 2rem;
    width: 100%;
  }

  .pengiriman .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
  }

  .pengiriman .field.full-width {
    grid-column: 1 / -1;
  }

  .pengiriman label {
    font-weight: 700;
    font-size: 0.9rem;
    color: #1f2937;
    letter-spacing: 0.01em;
  }

  .pengiriman select,
  .pengiriman input {
    width: 100%;
    max-width: 100%;
    padding: 0.85rem 1rem;
    border-radius: 14px;
    border: 1px solid rgba(148, 163, 184, 0.28);
    background: #ffffff;
    color: #0f172a;
    font-size: 0.95rem;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  .pengiriman select::placeholder,
  .pengiriman input::placeholder {
    color: #9ca3af;
  }

  .pengiriman select:focus,
  .pengiriman input:focus {
    outline: none;
    border-color: rgba(14, 165, 233, 0.7);
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.18);
    background: #f0f9ff;
  }

  .pengiriman .upload {
    width: 100%;
    max-width: 100%;
    border: 2px dashed rgba(14, 165, 233, 0.35);
    padding: 2rem;
    border-radius: 14px;
    text-align: center;
    color: #64748b;
    background: rgba(14, 165, 233, 0.06);
    font-weight: 500;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.2s ease;
  }

  .pengiriman .upload:hover {
    background: rgba(14, 165, 233, 0.12);
    border-color: rgba(14, 165, 233, 0.5);
    color: #0f172a;
  }

  .timeline {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(148, 163, 184, 0.2);
  }

  .timeline h3 {
    font-size: 1.1rem;
    margin: 0 0 1.25rem 0;
    color: #0f172a;
    font-weight: 700;
  }

  .timeline ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0.75rem;
  }

  .timeline li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    border-radius: 12px;
    background: #f8fafc;
    border: 1px solid rgba(148, 163, 184, 0.15);
  }

  .timeline .status {
    font-weight: 600;
    color: #0f172a;
  }

  .timeline .time {
    color: #64748b;
    font-size: 0.9rem;
  }

  .history {
    display: grid;
    gap: 1rem;
  }

  .history .time {
    color: #64748b;
  }

  @media (max-width: 1024px) {
    .pengiriman .grid-pengiriman {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 720px) {
    .tab-nav {
      overflow-x: auto;
    }

    .final table {
      font-size: 0.9rem;
    }

    .timeline li {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .pengiriman .grid-pengiriman {
      grid-template-columns: 1fr;
    }

    .pengiriman .field.full-width {
      grid-column: 1;
    }
  }

  .order-modal {
    padding: 0.5rem;
  }

  .order-modal-table {
    width: 100%;
    border-collapse: collapse;
  }

  .order-modal-table th,
  .order-modal-table td {
    padding: 0.75rem 0.5rem;
    text-align: left;
  }

  .order-modal-table th {
    font-size: 0.85rem;
    text-transform: uppercase;
    color: #94a3b8;
  }

  .order-modal-table tbody td {
    border-top: 1px solid rgba(148, 163, 184, 0.3);
  }
</style>
