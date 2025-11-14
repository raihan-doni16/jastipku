<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import Navbar from '$lib/components/Navbar.svelte';
  import { chatHistory } from '$lib/data/mockData';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'jastiper') {
      goto('/login?redirect=/jastiper/chats&expected=jastiper');
    }
  });

  const currentJastiperId = 'JST001';
  $: chats = chatHistory.filter((chat) => chat.jastiperId === currentJastiperId);

  let selectedChat = null;
  let searchQuery = '';

  $: filteredChats = chats.filter((chat) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      chat.buyerName?.toLowerCase().includes(q) ||
      chat.orderCode?.toLowerCase().includes(q) ||
      chat.lastMessage?.toLowerCase().includes(q)
    );
  });

  $: totalUnread = chats.reduce((sum, chat) => sum + (chat.unreadCount || 0), 0);

  function selectChat(chat) {
    selectedChat = chat;
    chat.unreadCount = 0;
  }

  function formatTime(timestamp) {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
      return timestamp;
    }
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Kemarin';
    } else if (days < 7) {
      return date.toLocaleDateString('id-ID', { weekday: 'long' });
    } else {
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    }
  }

  function closeChatDetail() {
    selectedChat = null;
  }
</script>

<Navbar />

<div class="container">
  <div class="chat-layout">
    <div class="chat-list">
      <div class="chat-list-header">
        <h2>Pesan Pembeli</h2>
        {#if totalUnread > 0}
          <span class="unread-badge">{totalUnread}</span>
        {/if}
      </div>

      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Cari pembeli atau order..." bind:value={searchQuery} />
      </div>

      <div class="chat-items">
        {#each filteredChats as chat (chat.id)}
          <button
            class="chat-item"
            class:active={selectedChat?.id === chat.id}
            class:unread={chat.unreadCount > 0}
            on:click={() => selectChat(chat)}
          >
            <div class="chat-avatar">{chat.buyerAvatar ?? '🛒'}</div>
            <div class="chat-info">
              <div class="chat-name-row">
                <span class="chat-name">{chat.buyerName ?? 'Pembeli'}</span>
                <span class="chat-time">{formatTime(chat.lastMessageTime)}</span>
              </div>
              <div class="chat-last-message">
                {chat.lastMessage}
              </div>
              {#if chat.orderCode}
                <div class="chat-order-code">Order: {chat.orderCode}</div>
              {/if}
            </div>
            {#if chat.unreadCount > 0}
              <span class="unread-count">{chat.unreadCount}</span>
            {/if}
          </button>
        {/each}
      </div>

      {#if filteredChats.length === 0}
        <div class="empty-chat-list">
          <div class="empty-icon">💬</div>
          <p>Tidak ada percakapan ditemukan</p>
        </div>
      {/if}
    </div>

    <div class="chat-detail">
      {#if selectedChat}
        <div class="chat-detail-header">
          <button class="back-button" on:click={closeChatDetail}>←</button>
          <div class="chat-detail-avatar">{selectedChat.buyerAvatar ?? '🛍️'}</div>
          <div class="chat-detail-info">
            <div class="chat-detail-name">{selectedChat.buyerName ?? 'Pembeli'}</div>
            {#if selectedChat.orderCode}
              <div class="chat-detail-order">Order: {selectedChat.orderCode}</div>
            {/if}
          </div>
          <button class="more-button">⋮</button>
        </div>

        <div class="messages-container">
          {#each selectedChat.messages as message (message.id)}
            <div class="message" class:own={message.sender === 'jastiper'}>
              <div class="message-bubble">
                <p class="message-text">{message.text}</p>
                <span class="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          {/each}
        </div>

        <div class="message-input">
          <button class="attach-button" type="button">📎</button>
          <input type="text" placeholder="Ketik balasan..." />
          <button class="send-button" type="button">📤</button>
        </div>
      {:else}
        <div class="no-chat-selected">
          <div class="no-chat-icon">💬</div>
          <h3>Pilih Chat</h3>
          <p>Pilih percakapan dari daftar untuk melihat pesan</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem;
    min-height: calc(100vh - 80px);
  }

  .chat-layout {
    display: grid;
    grid-template-columns: 400px 1fr;
    height: calc(100vh - 140px);
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .chat-list {
    border-right: 2px solid #e2e8f0;
    display: flex;
    flex-direction: column;
  }

  .chat-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  .chat-list-header h2 {
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
  }

  .unread-badge {
    padding: 0.25rem 0.75rem;
    background: #ef4444;
    color: white;
    border-radius: 999px;
    font-weight: 600;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  .search-box input {
    flex: 1;
    border: none;
    font-size: 0.95rem;
  }

  .search-box input:focus {
    outline: none;
  }

  .chat-items {
    flex: 1;
    overflow-y: auto;
  }

  .chat-item {
    width: 100%;
    border: none;
    background: transparent;
    padding: 1.25rem 1.5rem;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
    cursor: pointer;
  }

  .chat-item:hover,
  .chat-item.active {
    background: #f8fafc;
  }

  .chat-item.unread .chat-name {
    font-weight: 700;
    color: #0f172a;
  }

  .chat-avatar {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .chat-info {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .chat-name-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
  }

  .chat-name {
    font-weight: 600;
    color: #0f172a;
  }

  .chat-time {
    color: #94a3b8;
  }

  .chat-last-message {
    color: #475569;
    font-size: 0.9rem;
  }

  .chat-order-code {
    font-size: 0.8rem;
    color: #38bdf8;
    font-weight: 600;
  }

  .unread-count {
    align-self: flex-start;
    padding: 0.15rem 0.6rem;
    border-radius: 999px;
    background: #ef4444;
    color: white;
    font-weight: 700;
    font-size: 0.8rem;
  }

  .empty-chat-list {
    padding: 2rem;
    text-align: center;
    color: #94a3b8;
  }

  .chat-detail {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .chat-detail-header {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    gap: 1rem;
    align-items: center;
    padding: 1.25rem 1.75rem;
    border-bottom: 2px solid #e2e8f0;
  }

  .chat-detail-avatar {
    width: 52px;
    height: 52px;
    border-radius: 999px;
    background: #f0f9ff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
  }

  .chat-detail-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .chat-detail-name {
    font-weight: 700;
    color: #0f172a;
  }

  .chat-detail-order {
    font-size: 0.85rem;
    color: #38bdf8;
    font-weight: 600;
  }

  .messages-container {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: #f8fafc;
  }

  .message {
    display: flex;
  }

  .message-bubble {
    max-width: 65%;
    padding: 0.85rem 1rem;
    border-radius: 18px;
    background: white;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
  }

  .message.own {
    justify-content: flex-end;
  }

  .message.own .message-bubble {
    background: #dbeafe;
  }

  .message-text {
    margin: 0 0 0.4rem;
    color: #0f172a;
  }

  .message-time {
    font-size: 0.75rem;
    color: #94a3b8;
  }

  .message-input {
    padding: 1rem 1.5rem;
    display: flex;
    gap: 0.75rem;
    border-top: 2px solid #e2e8f0;
    background: white;
  }

  .message-input input {
    flex: 1;
    border: none;
    background: #f1f5f9;
    border-radius: 999px;
    padding: 0.85rem 1.25rem;
  }

  .message-input input:focus {
    outline: none;
  }

  .message-input button {
    border: none;
    border-radius: 999px;
    padding: 0.75rem 1.25rem;
    font-size: 1.15rem;
    cursor: pointer;
  }

  .attach-button {
    background: #e2e8f0;
  }

  .send-button {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .back-button,
  .more-button {
    border: none;
    background: transparent;
    font-size: 1.25rem;
    cursor: pointer;
  }

  .no-chat-selected {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.25rem;
    color: #64748b;
  }

  .no-chat-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 1024px) {
    .chat-layout {
      grid-template-columns: 1fr;
      height: auto;
    }

    .chat-detail {
      min-height: 60vh;
    }
  }
</style>
