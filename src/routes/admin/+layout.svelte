<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import AdminSidebar from '$lib/components/AdminSidebar.svelte';

  let sidebarOpen = true;

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
</script>

<div class="admin-layout">
  <Navbar />
  <button class="sidebar-toggle" type="button" on:click={toggleSidebar}>
    ☰
  </button>
  <div class="admin-shell">
    <AdminSidebar isOpen={sidebarOpen} />
    <main class="admin-content">
      <slot />
    </main>
  </div>
</div>

<style>
  .admin-shell {
    display: flex;
    width: 100%;
    min-height: 100vh;
  }

  .admin-content {
    flex: 1;
    margin-left: 280px;
    padding: 5rem 3rem 2rem;
    background: #f5f7fb;
    min-height: 100vh;
  }

  .sidebar-toggle {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 120;
    width: 40px;
    height: 40px;
    border-radius: 999px;
    border: none;
    background: #0f172a;
    color: #f9fafb;
    font-size: 1.25rem;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.35);
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    .admin-content {
      margin-left: 260px;
      padding: 5rem 1.5rem 2rem;
    }
  }

  @media (max-width: 768px) {
    .admin-content {
      margin-left: 0;
      padding: 5rem 1rem 2rem;
    }

    .sidebar-toggle {
      display: inline-flex;
    }
  }
</style>
