<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import { orders, statusMeta } from '$lib/data/mockData';
  import { authStore } from '$lib/stores/auth';

  const negotiationOrders = orders
    .filter((order) => order.status === 'Perlu_Negosiasi')
    .map((order) => ({
      ...order,
      notes: [
        'Harga perlu disesuaikan dengan pajak lokal.',
        'Konfirmasi stok warna/ukuran terakhir.'
      ],
      chats: [
        { sender: 'Admin', message: 'Kami melihat harga toko naik 10%. Apakah tetap lanjut?', time: '09.15' },
        { sender: 'User', message: 'Boleh, asalkan total tidak lebih dari Rp 3 juta.', time: '09.22' }
      ]
    }));

let search = '';
let messages = {};
let drafts = {};
let openChatCode = null;

  $: filtered = negotiationOrders.filter((order) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      order.code.toLowerCase().includes(term) ||
      order.store.toLowerCase().includes(term) ||
      order.product.toLowerCase().includes(term)
    );
  });

  $: {
    let nextMessages = messages;
    let nextDrafts = drafts;
    filtered.forEach((order) => {
      if (!nextMessages[order.code]) {
        nextMessages = { ...nextMessages, [order.code]: order.chats };
      }
      if (nextDrafts[order.code] === undefined) {
        nextDrafts = { ...nextDrafts, [order.code]: '' };
      }
    });
    if (nextMessages !== messages) {
      messages = nextMessages;
    }
    if (nextDrafts !== drafts) {
      drafts = nextDrafts;
    }
  }

function toggleChat(code) {
  openChatCode = openChatCode === code ? null : code;
}

function sendMessage(code) {
  const text = drafts[code]?.trim();
  if (!text) return;
  messages = {
    ...messages,
    [code]: [
      ...messages[code],
      {
        sender: 'Admin',
        message: text,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    ]
  };
  drafts = { ...drafts, [code]: '' };
}

  onMount(() => {
    const { role } = get(authStore);
    if (role !== 'admin') {
      goto(`/login?redirect=/admin/negotiations&expected=admin`);
    }
  });
</script>

<section class="negotiations">
  <a class="back-link" href="/admin">← Kembali</a>
  <header>
    <div>
      <h1>Daftar Negosiasi</h1>
      <p>Kelola permintaan yang membutuhkan penawaran ulang harga atau detail produk.</p>
    </div>
    <a href="/admin" class="back">← Kembali ke Dashboard</a>
  </header>

  <div class="toolbar">
    <label>
      Cari
      <input placeholder="Cari kode, toko, atau produk" bind:value={search} />
    </label>
  </div>

  {#if filtered.length === 0}
    <p class="empty">
      Belum ada permintaan yang perlu negosiasi. Pesanan baru akan muncul di halaman Pending.
    </p>
  {:else}
    <div class="list">
      {#each filtered as order (order.code)}
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
          <ul class="notes">
            {#each order.notes as note, index}
              <li>• {note}</li>
            {/each}
          </ul>
          <div class="actions">
            <a class="primary" href={`/admin/review/${order.code}?mode=negosiasi`}>
              Review & Kirim Counter
            </a>
            <button class="ghost" type="button" on:click={() => toggleChat(order.code)}>
              {openChatCode === order.code ? 'Tutup Chat' : 'Lihat Chat'}
            </button>
          </div>
          {#if openChatCode === order.code}
            <div class="chat">
              <header>Chat dengan Pengguna</header>
              <div class="thread">
                {#each messages[order.code] ?? [] as chat}
                  <div class={`bubble ${chat.sender === 'Admin' ? 'admin' : 'user'}`}>
                    <div class="meta">
                      <span>{chat.sender}</span>
                      <span>{chat.time}</span>
                    </div>
                    <p>{chat.message}</p>
                  </div>
                {/each}
              </div>
              <div class="composer">
                <input
                  placeholder="Ketik pesan untuk pengguna"
                  bind:value={drafts[order.code]}
                  on:keydown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      sendMessage(order.code);
                    }
                  }}
                />
                <button type="button" on:click={() => sendMessage(order.code)}>Kirim</button>
              </div>
            </div>
          {/if}
        </article>
      {/each}
    </div>
  {/if}
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
  .negotiations {
    padding: 4rem clamp(1.5rem, 5vw, 4rem);
    display: grid;
    gap: 2rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
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
    background: rgba(250, 204, 21, 0.2);
    color: #92400e;
    font-weight: 600;
  }

  .toolbar {
    display: grid;
    gap: 0.75rem;
  }

  label {
    display: grid;
    gap: 0.4rem;
    color: #1f2937;
    font-weight: 600;
  }

  input {
    padding: 0.8rem 1rem;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.4);
    background: white;
  }

  .list {
    display: grid;
    gap: 1.5rem;
  }

  .card {
    background: white;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 18px 30px rgba(15, 23, 42, 0.1);
    padding: 1.75rem;
    display: grid;
    gap: 1.2rem;
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
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .info span {
    color: #64748b;
    font-size: 0.85rem;
  }

  .notes {
    margin: 0;
    padding-left: 1rem;
    color: #475569;
    display: grid;
    gap: 0.4rem;
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
    font-weight: 600;
  }

  .primary {
    background: linear-gradient(135deg, #f97316, #fb923c);
    color: white;
  }

  .ghost {
    border: 1px solid rgba(148, 163, 184, 0.45);
    color: #1f2937;
    padding: 0.75rem 1.4rem;
    border-radius: 999px;
    font-weight: 600;
  }

  .chat {
    background: #f8fafc;
    border-radius: 14px;
    padding: 1rem;
    display: grid;
    gap: 0.75rem;
  }

  .chat header {
    font-weight: 600;
    color: #0f172a;
  }

  .thread {
    display: grid;
    gap: 0.6rem;
    max-height: 180px;
    overflow-y: auto;
  }

  .bubble {
    padding: 0.6rem 0.75rem;
    border-radius: 12px;
    background: white;
    border: 1px solid rgba(148, 163, 184, 0.25);
    display: grid;
    gap: 0.3rem;
  }

  .bubble.admin {
    border-color: rgba(59, 130, 246, 0.3);
    background: rgba(59, 130, 246, 0.1);
  }

  .bubble.user {
    border-color: rgba(34, 197, 94, 0.3);
    background: rgba(34, 197, 94, 0.1);
  }

  .bubble .meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #64748b;
  }

  .bubble p {
    margin: 0;
    color: #0f172a;
  }

  .composer {
    display: flex;
    gap: 0.6rem;
  }

  .composer input {
    flex: 1;
    padding: 0.7rem 0.9rem;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.4);
    background: white;
  }

  .composer button {
    padding: 0.7rem 1.1rem;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #0ea5e9, #2563eb);
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  .empty {
    text-align: center;
    background: white;
    border-radius: 16px;
    border: 1px dashed rgba(148, 163, 184, 0.3);
    padding: 2rem;
    color: #64748b;
  }

  @media (max-width: 1024px) {
    .negotiations {
      padding: 2rem 1.5rem;
    }

    .info {
      grid-template-columns: 1fr;
    }

    .composer input {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 720px) {
    .negotiations {
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

    .primary,
    .ghost {
      width: 100%;
      text-align: center;
    }

    .composer {
      flex-direction: column;
    }

    .composer button {
      width: 100%;
    }

    .toolbar input {
      font-size: 0.95rem;
    }
  }
</style>
