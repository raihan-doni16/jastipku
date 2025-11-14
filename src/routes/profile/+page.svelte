<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import Navbar from '$lib/components/Navbar.svelte';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'user') {
      goto('/login?redirect=/profile&expected=user');
    }
  });

  let profile = {
    name: 'Rina Putri',
    email: 'rina@example.com',
    phone: '+62811111111',
    address: 'Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta 12345',
    avatar: '👩'
  };

  let isEditing = false;
  let editForm = { ...profile };

  function handleEdit() {
    isEditing = true;
    editForm = { ...profile };
  }

  function handleCancel() {
    isEditing = false;
  }

  function handleSave() {
    profile = { ...editForm };
    isEditing = false;
    alert('Profil berhasil diperbarui!');
  }
</script>

<Navbar />

<div class="container">
  <h1>Profil Saya</h1>

  <div class="profile-grid">
    <div class="profile-card">
      <div class="avatar-section">
        <div class="avatar-large">{profile.avatar}</div>
        <h2>{profile.name}</h2>
        <p class="email">{profile.email}</p>
      </div>

      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-number">12</span>
          <span class="stat-label">Total Pesanan</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">8</span>
          <span class="stat-label">Selesai</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">3</span>
          <span class="stat-label">Dalam Proses</span>
        </div>
      </div>
    </div>

    <div class="details-card">
      <div class="card-header">
        <h3>Informasi Pribadi</h3>
        {#if !isEditing}
          <button class="btn-edit" on:click={handleEdit}>Edit</button>
        {/if}
      </div>

      {#if isEditing}
        <div class="form">
          <div class="form-group">
            <label>Nama Lengkap</label>
            <input type="text" bind:value={editForm.name} />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" bind:value={editForm.email} />
          </div>

          <div class="form-group">
            <label>Nomor Telepon/WhatsApp</label>
            <input type="tel" bind:value={editForm.phone} />
          </div>

          <div class="form-group">
            <label>Alamat Lengkap</label>
            <textarea bind:value={editForm.address} rows="4"></textarea>
          </div>

          <div class="form-actions">
            <button class="btn-cancel" on:click={handleCancel}>Batal</button>
            <button class="btn-save" on:click={handleSave}>Simpan</button>
          </div>
        </div>
      {:else}
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Nama Lengkap</span>
            <span class="value">{profile.name}</span>
          </div>

          <div class="info-item">
            <span class="label">Email</span>
            <span class="value">{profile.email}</span>
          </div>

          <div class="info-item">
            <span class="label">Nomor Telepon</span>
            <span class="value">{profile.phone}</span>
          </div>

          <div class="info-item full-width">
            <span class="label">Alamat</span>
            <span class="value">{profile.address}</span>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <div class="action-cards">
    <a href="/orders" class="action-card">
      <span class="action-icon">📦</span>
      <h4>Pesanan Saya</h4>
      <p>Lihat semua pesanan dan tracking</p>
    </a>

    <a href="/browse" class="action-card">
      <span class="action-icon">🛍️</span>
      <h4>Browse Jastip</h4>
      <p>Cari produk dari luar negeri</p>
    </a>

    <div class="action-card" on:click={() => alert('Fitur coming soon!')}>
      <span class="action-icon">⭐</span>
      <h4>Ulasan Saya</h4>
      <p>Lihat ulasan yang pernah diberikan</p>
    </div>

    <div class="action-card" on:click={() => alert('Fitur coming soon!')}>
      <span class="action-icon">💬</span>
      <h4>Chat History</h4>
      <p>Percakapan dengan jastiper</p>
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 2rem;
  }

  .profile-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .profile-card,
  .details-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .avatar-section {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .avatar-large {
    font-size: 5rem;
    margin-bottom: 1rem;
  }

  .avatar-section h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }

  .email {
    color: #64748b;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .stat-item {
    text-align: center;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
  }

  .stat-number {
    display: block;
    font-size: 2rem;
    font-weight: 800;
    color: #0ea5e9;
    margin-bottom: 0.25rem;
  }

  .stat-label {
    display: block;
    font-size: 0.75rem;
    color: #64748b;
    text-transform: uppercase;
    font-weight: 600;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .card-header h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
  }

  .btn-edit {
    padding: 0.6rem 1.25rem;
    background: #eff6ff;
    border: none;
    border-radius: 6px;
    color: #086adf;
    font-weight: 600;
    cursor: pointer;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .info-item.full-width {
    grid-column: 1 / -1;
  }

  .label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
  }

  .value {
    font-size: 1rem;
    color: #1f2937;
    font-weight: 600;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 600;
    color: #1f2937;
  }

  .form-group input,
  .form-group textarea {
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #086adf;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .btn-cancel,
  .btn-save {
    padding: 0.875rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-cancel {
    background: #f1f5f9;
    color: #64748b;
  }

  .btn-save {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .action-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .action-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    text-align: center;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    transition: all 0.3s;
  }

  .action-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  .action-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
  }

  .action-card h4 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }

  .action-card p {
    color: #64748b;
    font-size: 0.9rem;
  }

  @media (max-width: 1024px) {
    .profile-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    .info-grid {
      grid-template-columns: 1fr;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
