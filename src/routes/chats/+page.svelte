<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { chatHistory } from '$lib/data/mockData';
  import Navbar from '$lib/components/Navbar.svelte';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'user') {
      goto('/login?redirect=/chats&expected=user');
      return;
    }
  });

  let selectedChat = null;
  let searchQuery = '';

  $: filteredChats = chatHistory.filter(
    (chat) =>
      searchQuery === '' ||
      chat.jastiperName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  $: totalUnread = chatHistory.reduce((sum, chat) => sum + chat.unreadCount, 0);

  function selectChat(chat) {
    selectedChat = chat;
    // Mark messages as read
    chat.unreadCount = 0;
  }

  function formatTime(timestamp) {
    const date = new Date(timestamp);
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
    <!-- Chat List Sidebar -->
    <div class="chat-list">
      <div class="chat-list-header">
        <h2>Pesan</h2>
        {#if totalUnread > 0}
          <span class="unread-badge">{totalUnread}</span>
        {/if}
      </div>

      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Cari pesan..." bind:value={searchQuery} />
      </div>

      <div class="chat-items">
        {#each filteredChats as chat (chat.id)}
          <button
            class="chat-item"
            class:active={selectedChat?.id === chat.id}
            class:unread={chat.unreadCount > 0}
            on:click={() => selectChat(chat)}
          >
            <div class="chat-avatar">{chat.jastiperAvatar}</div>
            <div class="chat-info">
              <div class="chat-name-row">
                <span class="chat-name">{chat.jastiperName}</span>
                <span class="chat-time">{formatTime(chat.lastMessageTime)}</span>
              </div>
              <div class="chat-last-message">
                {chat.lastMessage}
              </div>
              {#if chat.orderCode}
                <div class="chat-order-code">📦 {chat.orderCode}</div>
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
          <p>Tidak ada pesan ditemukan</p>
        </div>
      {/if}
    </div>

    <!-- Chat Detail -->
    <div class="chat-detail">
      {#if selectedChat}
        <div class="chat-detail-header">
          <button class="back-button" on:click={closeChatDetail}>←</button>
          <div class="chat-detail-avatar">{selectedChat.jastiperAvatar}</div>
          <div class="chat-detail-info">
            <div class="chat-detail-name">{selectedChat.jastiperName}</div>
            {#if selectedChat.orderCode}
              <div class="chat-detail-order">Order: {selectedChat.orderCode}</div>
            {/if}
          </div>
          <button class="more-button">⋮</button>
        </div>

        <div class="messages-container">
          {#each selectedChat.messages as message (message.id)}
            <div class="message" class:own={message.sender === 'user'}>
              <div class="message-bubble">
                <p class="message-text">{message.text}</p>
                <span class="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          {/each}
        </div>

        <div class="message-input">
          <button class="attach-button">📎</button>
          <input type="text" placeholder="Ketik pesan..." />
          <button class="send-button">📤</button>
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
    gap: 0;
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
    font-size: 0.875rem;
    font-weight: 700;
  }

  .search-box {
    position: relative;
    padding: 1rem 1.5rem;
    border-bottom: 2px solid #e2e8f0;
    width: 100%;
    box-sizing: border-box;
  }

  .search-icon {
    position: absolute;
    left: 2.5rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.25rem;
  }

  .search-box input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 0.95rem;
    box-sizing: border-box;
  }

  .search-box input:focus {
    outline: none;
    border-color: #086adf;
  }

  .chat-items {
    flex: 1;
    overflow-y: auto;
  }

  .chat-item {
    width: 100%;
    display: flex;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border: none;
    border-bottom: 1px solid #f1f5f9;
    background: white;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s;
    position: relative;
  }

  .chat-item:hover {
    background: #f8fafc;
  }

  .chat-item.active {
    background: #eff6ff;
    border-left: 4px solid #086adf;
  }

  .chat-item.unread {
    background: #fef3c7;
  }

  .chat-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    flex-shrink: 0;
  }

  .chat-info {
    flex: 1;
    min-width: 0;
  }

  .chat-name-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  .chat-name {
    font-weight: 700;
    color: #0f172a;
    font-size: 0.95rem;
  }

  .chat-time {
    font-size: 0.75rem;
    color: #94a3b8;
  }

  .chat-last-message {
    color: #64748b;
    font-size: 0.875rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0.25rem;
  }

  .chat-item.unread .chat-last-message {
    color: #92400e;
    font-weight: 600;
  }

  .chat-order-code {
    font-size: 0.75rem;
    color: #086adf;
    font-weight: 600;
  }

  .unread-count {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    background: #ef4444;
    color: white;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-chat-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .empty-chat-list p {
    color: #64748b;
    margin: 0;
  }

  .chat-detail {
    display: flex;
    flex-direction: column;
  }

  .chat-detail-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  .back-button {
    display: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: #f1f5f9;
    color: #475569;
    font-size: 1.25rem;
    cursor: pointer;
  }

  .back-button:hover {
    background: #e2e8f0;
  }

  .chat-detail-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
  }

  .chat-detail-info {
    flex: 1;
  }

  .chat-detail-name {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
  }

  .chat-detail-order {
    font-size: 0.875rem;
    color: #64748b;
  }

  .more-button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: #475569;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .more-button:hover {
    background: #f1f5f9;
  }

  .messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .message {
    display: flex;
  }

  .message.own {
    justify-content: flex-end;
  }

  .message-bubble {
    max-width: 70%;
    padding: 1rem 1.25rem;
    border-radius: 16px;
    background: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .message.own .message-bubble {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .message-text {
    margin: 0 0 0.5rem 0;
    line-height: 1.6;
    word-wrap: break-word;
  }

  .message-time {
    font-size: 0.75rem;
    color: #94a3b8;
  }

  .message.own .message-time {
    color: rgba(255, 255, 255, 0.8);
  }

  .message-input {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 2px solid #e2e8f0;
    background: white;
  }

  .attach-button,
  .send-button {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: #f1f5f9;
    font-size: 1.25rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .attach-button:hover,
  .send-button:hover {
    background: #e2e8f0;
  }

  .send-button {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
  }

  .send-button:hover {
    opacity: 0.9;
  }

  .message-input input {
    flex: 1;
    padding: 0.875rem 1.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 999px;
    font-size: 0.95rem;
  }

  .message-input input:focus {
    outline: none;
    border-color: #086adf;
  }

  .no-chat-selected {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
  }

  .no-chat-icon {
    font-size: 5rem;
    margin-bottom: 1.5rem;
  }

  .no-chat-selected h3 {
    font-size: 1.5rem;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .no-chat-selected p {
    color: #64748b;
  }

  @media (max-width: 1024px) {
    .container {
      padding: 1rem;
    }

    .chat-layout {
      grid-template-columns: 1fr;
      height: calc(100vh - 120px);
    }

    .chat-list {
      border-right: none;
      display: none;
    }

    /* .chat-list.show {
      display: flex;
    } */

    .chat-detail {
      display: none;
    }

    /* .chat-detail.show {
      display: flex;
    } */

    .back-button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (max-width: 768px) {
    .message-bubble {
      max-width: 85%;
    }
  }
</style>
