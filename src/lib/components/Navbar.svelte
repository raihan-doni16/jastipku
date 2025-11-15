<script>
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { authStore, roles } from '$lib/stores/auth';
  import { cartStore } from '$lib/stores/cart';

  export let showLanguage = false;
  export let language = 'id';
  export let languages = [
    { value: 'id', label: 'Indonesia' },
    { value: 'en', label: 'English' }
  ];

  const dispatch = createEventDispatcher();
  const navItems = [
    { label: 'Browse', href: '/browse', allowedRoles: ['user'] },
    { label: 'Pesanan Saya', href: '/orders', allowedRoles: ['user'] },
    { label: 'Chat', href: '/chats', allowedRoles: ['user'] },
    { label: 'Ulasan Saya', href: '/reviews', allowedRoles: ['user'] },
    { label: 'Profil', href: '/profile', allowedRoles: ['user'] },
    { label: 'Dashboard', href: '/jastiper', allowedRoles: ['jastiper'] },
    { label: 'Pesanan', href: '/jastiper/orders', allowedRoles: ['jastiper'] },
    { label: 'Postingan Saya', href: '/jastiper/listings', allowedRoles: ['jastiper'] },
    { label: 'Chat', href: '/jastiper/chats', allowedRoles: ['jastiper'] },
    { label: 'Wallet', href: '/jastiper/wallet', allowedRoles: ['jastiper'] },
    { label: 'Profil', href: '/jastiper/profile', allowedRoles: ['jastiper'] },
  ];

  let selectedLanguage = language;
  $: selectedLanguage = language;

  let auth = { role: 'guest' };
  $: auth = $authStore;
  $: currentRole = auth.role ?? 'guest';
  $: isAuthenticated = currentRole !== 'guest';
  $: currentPath = $page.url.pathname;

  $: cart = $cartStore;
  $: cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  function handleLanguageChange(event) {
    dispatch('languageChange', event.target.value);
  }

  function handleLogout() {
    authStore.set({ role: 'guest' });
    goto('/');
  }

  function isNavItemActive(href) {
    if (!currentPath) return false;
    if (href === '/jastiper') {
      return currentPath === '/jastiper';
    }
    return currentPath === href || currentPath.startsWith(href + '/');
  }
</script>

<nav class="navbar">
  <a class="brand" href="/">
    <img src="/logo.svg" alt="Jastipku" />
    <span>Jastipku</span>
  </a>
  <div class="nav-actions">
    {#each navItems.filter((item) => item.allowedRoles.includes(currentRole)) as item (item.href)}
      <a
        class="nav-link"
        class:active={isNavItemActive(item.href)}
        href={item.href}
      >
        {item.label}
      </a>
    {/each}
    {#if currentRole === 'user'}
      <a class="cart-button" href="/cart">
        <span class="cart-icon">🛒</span>
        {#if cartItemCount > 0}
          <span class="cart-badge">{cartItemCount}</span>
        {/if}
      </a>
    {/if}
    <span class="spacer" />
    {#if !isAuthenticated}
      <a class="ghost" href="/login">Login</a>
      <button class="primary" type="button">Daftar</button>
    {:else}
      <div class="role-indicator">
        <span>{roles[currentRole]?.label ?? currentRole}</span>
      </div>
      <button class="ghost" type="button" on:click={handleLogout}>Logout</button>
    {/if}
    {#if showLanguage}
      <div class="language">
        <span>🌐</span>
        <select bind:value={selectedLanguage} on:change={handleLanguageChange}>
          {#each languages as item}
            <option value={item.value}>{item.label}</option>
          {/each}
        </select>
      </div>
    {/if}
  </div>
</nav>

<style>
  .navbar {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 3rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 700;
    font-size: 1.5rem;
    color: #086adf;
  }

  .brand img {
    width: 42px;
    height: 42px;
    border-radius: 12px;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .nav-link {
    font-weight: 500;
    color: #1f2937;
    padding: 0.5rem 0.75rem;
    border-radius: 999px;
    transition: background 0.2s, color 0.2s;
  }

  .nav-link.active {
    background: #dbeafe;
    color: #1d4ed8;
    font-weight: 600;
  }

  .spacer {
    width: 1px;
    height: 1.75rem;
    background: rgba(148, 163, 184, 0.5);
  }

  .ghost,
  .primary {
    padding: 0.6rem 1.2rem;
    border-radius: 999px;
    font-weight: 600;
    cursor: pointer;
  }

  button.ghost,
  button.primary {
    border: none;
    font-size: inherit;
    font-family: inherit;
  }

  .ghost {
    border: 1px solid #cbd5f5;
    color: #1f2937;
    background: transparent;
  }

  .primary {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
    border: none;
  }

  .language {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    background: #f1f5f9;
    color: #0f172a;
  }

  select {
    border: none;
    background: transparent;
    font-weight: 500;
  }

  .cart-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    text-decoration: none;
    transition: transform 0.2s;
  }

  .cart-button:hover {
    transform: scale(1.1);
  }

  .cart-icon {
    font-size: 1.5rem;
  }

  .cart-badge {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    background: #ef4444;
    color: white;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .role-indicator {
    padding: 0.5rem 1rem;
    background: #f1f5f9;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #475569;
  }

  @media (max-width: 900px) {
    .navbar {
      flex-direction: column;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
    }

    .nav-actions {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
