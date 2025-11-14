<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import { orders, statusMeta } from '$lib/data/mockData';
  import { authStore } from '$lib/stores/auth';

  const activeOrders = orders
    .filter(
      (order) =>
        order.status !== 'Menunggu_Review_Admin' && order.status !== 'Perlu_Negosiasi'
    )
    .map((order) => ({
      ...order,
      chats: [
        { sender: 'Admin', message: 'Barang sudah tiba di bandara. Estimasi tiba besok.', time: '11.00' },
        { sender: 'User', message: 'Noted kak, ditunggu update resinya.', time: '11.12' }
      ]
    }));

  let statusFilter = 'all';
  let countryFilter = 'all';
  let selectedChat = null;
  let chatDraft = '';
  let chatMessages = {};

  const countries = [...new Set(activeOrders.map((order) => order.country))];

  $: filtered = activeOrders.filter((order) => {
    const matchStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchCountry = countryFilter === 'all' || order.country === countryFilter;
    return matchStatus && matchCountry;
  });

  $: {
    let updated = chatMessages;
    filtered.forEach((order) => {
      if (!updated[order.code]) {
        updated = { ...updated, [order.code]: order.chats };
      }
    });
    if (updated !== chatMessages) {
      chatMessages = updated;
    }
    if (selectedChat && !filtered.find((order) => order.code === selectedChat)) {
      selectedChat = null;
      chatDraft = '';
    }
  }

  function openChat(code) {
    selectedChat = code;
    chatDraft = '';
  }

  function sendChat() {
    if (!selectedChat) return;
    const text = chatDraft.trim();
    if (!text) return;
    chatMessages = {
      ...chatMessages,
      [selectedChat]: [
        ...chatMessages[selectedChat],
        {
          sender: 'Admin',
          message: text,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    chatDraft = '';
  }

  onMount(() => {
    const { role } = get(authStore);
    if (role !== 'admin') {
      goto(`/login?redirect=/admin/active&expected=admin`);
    }
  });
</script>

<section class="active">
  <a class="back-link" href="/admin">← Kembali</a>
  <header>
    <div>
      <h1>Pesanan Dalam Proses</h1>
      <p>Pantau pesanan yang sedang berjalan dari approval hingga pengiriman akhir.</p>
    </div>
    <a href="/admin" class="back">← Kembali ke Dashboard</a>
  </header>

  <div class="toolbar">
    <label>
      Filter Status
      <select bind:value={statusFilter}>
        <option value="all">Semua</option>
        {#each Object.keys(statusMeta) as key}
          {#if key !== 'Menunggu_Review_Admin' && key !== 'Perlu_Negosiasi'}
            <option value={key}>{statusMeta[key].label}</option>
          {/if}
        {/each}
      </select>
    </label>
    <label>
      Negara
      <select bind:value={countryFilter}>
        <option value="all">Semua</option>
        {#each countries as country}
          <option value={country}>{country}</option>
        {/each}
      </select>
    </label>
  </div>

  {#if filtered.length === 0}
    <p class="empty">
      Tidak ada pesanan yang cocok dengan filter. Coba reset filter untuk melihat data lainnya.
    </p>
  {:else}
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Kode</th>
            <th>Negara</th>
            <th>Toko</th>
            <th>Produk</th>
            <th>Status</th>
            <th>Estimasi Total</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {#each filtered as order}
            <tr>
              <td>{order.code}</td>
              <td>{order.country}</td>
              <td>{order.store}</td>
              <td>
                <strong>{order.product}</strong>
                <span>{order.variations}</span>
              </td>
              <td><StatusBadge {statusMeta} status={order.status} /></td>
              <td>Rp {order.estimate.toLocaleString('id-ID')}</td>
              <td class="action-cell">
                <a class="link admin" href={`/admin/review/${order.code}`}>Detail Admin</a>
                <span>·</span>
                <button class="link chat" type="button" on:click={() => openChat(order.code)}>
                  Chat
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  {#if selectedChat}
    {#if chatMessages[selectedChat]}
      <div class="chat-panel">
        <header>
          <h2>Chat Pesanan {selectedChat}</h2>
          <button type="button" on:click={() => (selectedChat = null)}>Tutup</button>
        </header>
        <div class="thread">
          {#each chatMessages[selectedChat] as item}
            <div class={`bubble ${item.sender === 'Admin' ? 'admin' : 'user'}`}>
              <div class="meta">
                <span>{item.sender}</span>
                <span>{item.time}</span>
              </div>
              <p>{item.message}</p>
            </div>
          {/each}
        </div>
        <div class="composer">
          <input
            placeholder="Balas pengguna..."
            bind:value={chatDraft}
            on:keydown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                sendChat();
              }
            }}
          />
          <button type="button" on:click={sendChat}>Kirim</button>
        </div>
      </div>
    {/if}
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
  .active {
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
    background: rgba(16, 185, 129, 0.18);
    color: #047857;
    font-weight: 600;
  }

  .toolbar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  label {
    display: grid;
    gap: 0.4rem;
    color: #1f2937;
    font-weight: 600;
  }

  select {
    padding: 0.8rem 1rem;
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
    border-bottom: 1px solid rgba(148, 163, 184, 0.15);
    text-align: left;
  }

  th {
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    color: #64748b;
  }

  td strong {
    display: block;
    color: #0f172a;
  }

  td span {
    color: #64748b;
    font-size: 0.85rem;
  }

  .action-cell {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .link {
    color: #0f172a;
    font-weight: 600;
    text-decoration: underline;
  }

  button.link {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
  }

  .link.admin {
    color: #0ea5e9;
  }

  .link.chat {
    color: #ea580c;
  }

  .empty {
    text-align: center;
    padding: 2rem;
    border-radius: 16px;
    background: white;
    border: 1px dashed rgba(148, 163, 184, 0.3);
    color: #64748b;
  }

  .chat-panel {
    background: white;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 16px 34px rgba(15, 23, 42, 0.12);
    padding: 1.5rem;
    display: grid;
    gap: 1rem;
  }

  .chat-panel header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chat-panel header h2 {
    margin: 0;
  }

  .chat-panel header button {
    padding: 0.5rem 1rem;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    background: transparent;
    cursor: pointer;
  }

  .thread {
    max-height: 220px;
    overflow-y: auto;
    display: grid;
    gap: 0.6rem;
  }

  .bubble {
    padding: 0.7rem 0.9rem;
    border-radius: 14px;
    background: #f8fafc;
    border: 1px solid rgba(148, 163, 184, 0.2);
    display: grid;
    gap: 0.3rem;
  }

  .bubble.admin {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
  }

  .bubble.user {
    background: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.3);
  }

  .meta {
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
    gap: 0.75rem;
  }

  .composer input {
    flex: 1;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.4);
    background: #f8fafc;
  }

  .composer button {
    padding: 0.75rem 1.2rem;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #0ea5e9, #2563eb);
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    .active {
      padding: 2rem 1.5rem;
    }

    .filters {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }

  @media (max-width: 720px) {
    .active {
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

    table {
      font-size: 0.85rem;
    }

    th,
    td {
      padding: 0.6rem 0.4rem;
    }

    .code-cell {
      font-size: 0.85rem;
    }
  }
</style>
