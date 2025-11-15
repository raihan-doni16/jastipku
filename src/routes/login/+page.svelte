<script>
  import { goto } from '$app/navigation';
  import Navbar from '$lib/components/Navbar.svelte';
  import { authStore, roles } from '$lib/stores/auth';

  export let data;

  const roleOptions = [
    { value: 'user', label: 'User - Pembeli' },
    { value: 'jastiper', label: 'Jastiper - Penjual' },
    { value: 'admin', label: 'Admin' }
  ];

  let redirectTarget = data.redirect;
  let selectedRole = data.expected?.includes('admin')
    ? 'admin'
    : data.expected?.includes('jastiper')
      ? 'jastiper'
      : 'user';

  function handleLogin() {
    authStore.set({ role: selectedRole });
    const defaultRoute = roles[selectedRole]?.home ?? '/';
    goto(redirectTarget || defaultRoute);
  }
</script>

<Navbar />

<section class="login">
  <div class="card">
    <h1>Masuk ke Jastipku</h1>
    <p>Pilih jenis akun untuk mengakses dashboard sesuai kebutuhanmu.</p>

    <label for="role">Masuk sebagai</label>
    <select id="role" bind:value={selectedRole}>
      {#each roleOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>

    <button class="primary" on:click={handleLogin}>Login</button>

    <div class="hint">
      {#if selectedRole === 'user'}
        Setelah login sebagai <strong>user</strong>, kamu dapat browse postingan jastiper, membuat
        pesanan, dan memantau status pesanan di halaman <em>Browse</em> dan <em>Pesanan Saya</em>.
      {:else if selectedRole === 'jastiper'}
        Login sebagai <strong>jastiper</strong> memberikan akses ke dashboard untuk membuat
        postingan, kelola pesanan, dan manajemen wallet pada halaman <em>Dashboard Jastiper</em>.
      {:else}
        Login sebagai <strong>admin</strong> memberikan akses ke dashboard dan review permintaan
        pengguna pada halaman <em>Admin</em>.
      {/if}
    </div>
  </div>
</section>

<style>
  .login {
    min-height: calc(100vh - 80px);
    display: grid;
    place-items: center;
    padding: 2rem 1.5rem;
  }

  .card {
    width: min(100%, 420px);
    background: white;
    border-radius: 20px;
    padding: 2.5rem;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 24px 50px rgba(15, 23, 42, 0.12);
    display: grid;
    gap: 1rem;
  }

  h1 {
    margin: 0;
    font-size: 1.8rem;
  }

  p {
    margin: 0;
    color: #475569;
  }

  label {
    font-weight: 600;
    color: #1f2937;
  }

  select {
    padding: 0.85rem 1rem;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: #f8fafc;
    font-size: 1rem;
  }

  .primary {
    margin-top: 0.5rem;
    padding: 0.85rem 1.5rem;
    border-radius: 999px;
    border: none;
    font-weight: 600;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
    cursor: pointer;
    box-shadow: 0 18px 30px rgba(14, 165, 233, 0.25);
  }

  .hint {
    background: #f8fafc;
    border-radius: 14px;
    padding: 1rem 1.2rem;
    color: #475569;
    font-size: 0.95rem;
  }

  strong {
    color: #0f172a;
  }

  em {
    font-style: normal;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    .login {
      padding: 1.5rem 1rem;
    }

    .card {
      width: 90%;
      max-width: 360px;
      padding: 2rem 1.75rem;
      border-radius: 18px;
    }
  }
</style>
