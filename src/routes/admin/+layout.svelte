<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import AdminSidebar from '$lib/components/AdminSidebar.svelte';
</script>

<div class="admin-layout">
  <Navbar />
  <div class="admin-shell">
    <AdminSidebar />
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
  }
</style>
