<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { authStore } from '$lib/stores/auth';
  import { users } from '$lib/data/mockData';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  $: userId = $page.params.id;
  $: user = users.find((u) => u.id === userId);

  onMount(() => {
    if (currentRole !== 'admin') {
      goto(`/login?redirect=/admin/users/${userId}&expected=admin`);
    }
  });

  function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  }

  function formatDate(value) {
    if (!value) return '-';
    return new Date(value).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  $: statCards = user
    ? [
        { label: 'Total Pesanan', value: user.totalOrders },
        { label: 'Status Akun', value: user.status === 'active' ? 'Aktif' : 'Nonaktif' },
        { label: 'Tanggal Gabung', value: formatDate(user.joinDate) }
      ]
    : [];

  $: activityLogs = user
    ? [
        {
          id: `${user.id}-ACT-001`,
          title: 'Membuat pesanan baru',
          timestamp: '15 Nov 2025, 10:24',
          status: 'Selesai'
        },
        {
          id: `${user.id}-ACT-002`,
          title: 'Mengunggah bukti pembayaran',
          timestamp: '11 Nov 2025, 21:17',
          status: 'Diproses'
        },
        {
          id: `${user.id}-ACT-003`,
          title: 'Membuka tiket bantuan',
          timestamp: '03 Nov 2025, 14:05',
          status: 'Ditutup'
        }
      ]
    : [];

  $: mockOrders = user
    ? [
        {
          code: `${user.id}-ORD-2311`,
          product: 'Tas Charles & Keith',
          total: formatCurrency(1850000),
          status: 'Selesai',
          updatedAt: '10 Nov 2025'
        },
        {
          code: `${user.id}-ORD-2310`,
          product: 'Skincare Jepang',
          total: formatCurrency(950000),
          status: 'Sedang dikirim',
          updatedAt: '02 Nov 2025'
        },
        {
          code: `${user.id}-ORD-2309`,
          product: 'Figurine Anime',
          total: formatCurrency(1250000),
          status: 'Dibatalkan',
          updatedAt: '21 Okt 2025'
        }
      ]
    : [];
</script>

<div class="container">
  {#if user}
    <div class="page-header">
      <button class="back-button" on:click={() => goto('/admin/users')}>Kembali</button>
      <div class="page-heading">
        <p class="breadcrumb">Dashboard / Pengguna / {user.name}</p>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
      <span class="status-chip" class:active={user.status === 'active'}>
        {user.status === 'active' ? 'Akun Aktif' : 'Akun Nonaktif'}
      </span>
    </div>

    <div class="summary-card">
      <div class="profile">
        <div class="avatar">
          <img src={user.avatar} alt={user.name} loading="lazy" />
        </div>
        <div>
          <p class="label">ID Pengguna</p>
          <p class="value">{user.id}</p>
          <p class="subvalue">{user.phone}</p>
        </div>
      </div>

      <div class="stats-grid">
        {#each statCards as stat (stat.label)}
          <div class="stat-card">
            <p class="label">{stat.label}</p>
            <p class="value">{stat.value}</p>
          </div>
        {/each}
      </div>
    </div>

    <div class="content-grid">
      <div class="left-column">
        <div class="card">
          <h2>Informasi Kontak</h2>
          <div class="info-row">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>
          <div class="info-row">
            <span>Nomor Telepon</span>
            <strong>{user.phone}</strong>
          </div>
          <div class="info-row">
            <span>Bergabung</span>
            <strong>{formatDate(user.joinDate)}</strong>
          </div>
          <div class="info-row">
            <span>Role</span>
            <strong>{user.role === 'user' ? 'Pembeli' : user.role}</strong>
          </div>
        </div>

        <div class="card">
          <h2>Catatan Admin</h2>
          <p>
            Pengguna ini aktif melakukan transaksi dan belum memiliki riwayat pelanggaran. Tetap
            perhatikan pola pesanan jika terdapat kenaikan jumlah yang signifikan.
          </p>
          <div class="actions">
            <button class="btn text" on:click={() => goto('/admin/users')}>Kembali ke daftar</button>
            <button class="btn primary" on:click={() => alert('Catatan disimpan')}>
              Simpan Catatan
            </button>
          </div>
        </div>
      </div>

      <div class="right-column">
        <div class="card activity">
          <h2>Aktivitas Terbaru</h2>
          <ul>
            {#each activityLogs as activity (activity.id)}
              <li>
                <div>
                  <p class="title">{activity.title}</p>
                  <p class="timestamp">{activity.timestamp}</p>
                </div>
                <span class="badge">{activity.status}</span>
              </li>
            {/each}
          </ul>
        </div>

        <div class="card">
          <h2>Riwayat Pesanan</h2>
          <table>
            <thead>
              <tr>
                <th>Kode</th>
                <th>Produk</th>
                <th>Status</th>
                <th>Update Terakhir</th>
              </tr>
            </thead>
            <tbody>
              {#each mockOrders as order (order.code)}
                <tr>
                  <td>{order.code}</td>
                  <td>
                    <p class="table-title">{order.product}</p>
                    <p class="table-sub">{order.total}</p>
                  </td>
                  <td>
                    <span class="badge">{order.status}</span>
                  </td>
                  <td>{order.updatedAt}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  {:else}
    <div class="empty-state">
      <h2>Pengguna tidak ditemukan</h2>
      <p>Periksa kembali tautan atau kembali ke daftar pengguna.</p>
      <button class="back-button" on:click={() => goto('/admin/users')}>Kembali</button>
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .page-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .page-heading {
    flex: 1;
  }

  .breadcrumb {
    font-size: 0.85rem;
    color: #94a3b8;
    margin: 0 0 0.25rem 0;
  }

  h1 {
    margin: 0;
    font-size: 2rem;
    color: #0f172a;
  }

  .page-heading p {
    margin: 0.25rem 0 0;
    color: #475569;
  }

  .back-button {
    padding: 0.65rem 1.25rem;
    border-radius: 999px;
    border: 1px solid #e2e8f0;
    background: white;
    font-weight: 600;
    cursor: pointer;
  }

  .status-chip {
    padding: 0.5rem 1rem;
    border-radius: 999px;
    background: #fee2e2;
    color: #b91c1c;
    font-weight: 600;
  }

  .status-chip.active {
    background: #dcfce7;
    color: #166534;
  }

  .summary-card {
    background: white;
    border-radius: 16px;
    padding: 1.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    display: flex;
    gap: 2rem;
    align-items: center;
    margin-bottom: 2rem;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: #eff6ff;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .label {
    font-size: 0.85rem;
    color: #94a3b8;
    margin: 0;
  }

  .value {
    margin: 0.15rem 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
  }

  .subvalue {
    margin: 0;
    color: #64748b;
    font-size: 0.9rem;
  }

  .stats-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
  }

  .stat-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1rem;
  }

  .stat-card .value {
    font-size: 1.4rem;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .card {
    margin-top: 10px;
    background: white;
    border-radius: 16px;
    padding: 1.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  .card h2 {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    color: #0f172a;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f1f5f9;
    font-size: 0.95rem;
    color: #475569;
  }

  .info-row strong {
    color: #0f172a;
  }

  .info-row:last-child {
    border-bottom: none;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.25rem;
  }

  .btn {
    padding: 0.75rem 1.25rem;
    border-radius: 10px;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }

  .btn.text {
    background: #f8fafc;
    color: #0f172a;
  }

  .btn.primary {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .activity ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .activity li {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .activity .title {
    margin: 0;
    font-weight: 600;
    color: #0f172a;
  }

  .activity .timestamp {
    margin: 0.25rem 0 0;
    color: #94a3b8;
    font-size: 0.85rem;
  }

  .badge {
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: #eff6ff;
    color: #1e3a8a;
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    font-size: 0.8rem;
    color: #94a3b8;
    text-transform: uppercase;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #f1f5f9;
  }

  td {
    padding: 1rem 0;
    border-bottom: 1px solid #f1f5f9;
    font-size: 0.95rem;
    color: #0f172a;
  }

  .table-title {
    margin: 0;
    font-weight: 600;
  }

  .table-sub {
    margin: 0.25rem 0 0;
    color: #64748b;
    font-size: 0.85rem;
  }

  .empty-state {
    background: white;
    border-radius: 16px;
    padding: 3rem;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  .empty-state h2 {
    margin-bottom: 0.5rem;
  }

  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }

    .summary-card {
      flex-direction: column;
    }
  }

  @media (max-width: 640px) {
    .container {
      padding: 1rem;
    }

    .page-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .summary-card {
      padding: 1.25rem;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    table {
      display: block;
      overflow-x: auto;
    }
  }
</style>
