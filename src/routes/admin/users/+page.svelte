<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { users } from '$lib/data/mockData';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'admin') {
      goto('/login?redirect=/admin/users&expected=admin');
    }
  });

  let searchQuery = '';
  let filterRole = 'all';

  $: filteredUsers = users.filter((user) => {
    const matchSearch =
      searchQuery === '' ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchRole = filterRole === 'all' || user.role === filterRole;

    return matchSearch && matchRole;
  });

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  function handleAction(userId, action) {
    alert(`${action} user ${userId}`);
  }
</script>

<div class="container">
  <div class="header">
    <div>
      <h1>Manajemen Pengguna</h1>
      <p>Kelola semua pengguna pembeli di platform</p>
    </div>
  </div>

  <div class="filters">
    <input
      type="text"
      placeholder="Cari nama atau email..."
      bind:value={searchQuery}
      class="search-input"
    />

    <div class="filter-buttons">
      <button
        class="filter-btn"
        class:active={filterRole === 'all'}
        on:click={() => (filterRole = 'all')}
      >
        Semua ({users.length})
      </button>
      <button
        class="filter-btn"
        class:active={filterRole === 'user'}
        on:click={() => (filterRole = 'user')}
      >
        Pembeli ({users.filter((u) => u.role === 'user').length})
      </button>
    </div>
  </div>

  <div class="users-table">
    <table>
      <thead>
        <tr>
          <th>Pengguna</th>
          <th>Email</th>
          <th>Telepon</th>
          <th>Bergabung</th>
          <th>Total Pesanan</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredUsers as user (user.id)}
          <tr>
            <td>
              <div class="user-cell">
                <span class="avatar">
                  <img src={user.avatar} alt={user.name} loading="lazy" />
                </span>
                <div class="user-info">
                  <span class="user-name">{user.name}</span>
                  <span class="user-id">{user.id}</span>
                </div>
              </div>
            </td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{formatDate(user.joinDate)}</td>
            <td>
              <span class="order-count">{user.totalOrders}</span>
            </td>
            <td>
              <span
                class="status-badge"
                style="background: {user.status === 'active' ? '#dcfce7' : '#fee2e2'};
                       color: {user.status === 'active' ? '#15803d' : '#991b1b'}"
              >
                {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
              </span>
            </td>
            <td>
              <div class="actions">
                <button class="btn-action" on:click={() => goto(`/admin/users/${user.id}`)}>
                  Lihat
                </button>
                <button
                  class="btn-action"
                  on:click={() => handleAction(user.id, 'Suspend')}
                >
                  Suspend
                </button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  {#if filteredUsers.length === 0}
    <div class="empty-state">
      <span class="empty-icon">👥</span>
      <p>Tidak ada pengguna ditemukan</p>
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .header {
    margin-bottom: 2rem;
  }

  .header h1 {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
  }

  .header p {
    font-size: 1.125rem;
    color: #64748b;
  }

  .filters {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .search-input {
    width: 100%;
    max-width: 1300px;
    padding: 0.875rem 1.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    margin-bottom: 1rem;
    transition: border-color 0.2s;
  }


  .search-input:focus {
    outline: none;
    border-color: #086adf;
  }

  .filter-buttons {
    display: flex;
    gap: 1rem;
  }

  .filter-btn {
    padding: 0.75rem 1.5rem;
    border: 2px solid #e2e8f0;
    background: white;
    border-radius: 8px;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s;
  }

  .filter-btn:hover {
    border-color: #086adf;
    color: #086adf;
  }

  .filter-btn.active {
    border-color: #086adf;
    background: #eff6ff;
    color: #086adf;
  }

  .users-table {
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    padding: 1rem 1.5rem;
    background: #f8fafc;
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    border-bottom: 2px solid #e2e8f0;
  }

  td {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #f1f5f9;
    color: #1f2937;
    font-size: 0.9rem;
  }

  tr:last-child td {
    border-bottom: none;
  }

  .user-cell {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    overflow: hidden;
    flex-shrink: 0;
    background: #e5e7eb;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .user-name {
    font-weight: 700;
    color: #0f172a;
  }

  .user-id {
    font-size: 0.8rem;
    color: #94a3b8;
  }

  .order-count {
    display: inline-block;
    padding: 0.35rem 0.75rem;
    background: #eff6ff;
    color: #1e40af;
    border-radius: 6px;
    font-weight: 700;
    font-size: 0.875rem;
  }

  .status-badge {
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-action {
    padding: 0.5rem 1rem;
    border: 2px solid #e2e8f0;
    background: white;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-action:hover {
    border-color: #086adf;
    color: #086adf;
  }

  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
  }

  .empty-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
  }

  .empty-state p {
    color: #94a3b8;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .users-table {
      overflow-x: auto;
    }
  }
</style>
