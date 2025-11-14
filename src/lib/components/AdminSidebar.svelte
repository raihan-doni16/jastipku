<script>
  import { page } from '$app/stores';

  const menuItems = [
    {
      section: 'Main',
      items: [
        { label: 'Dashboard', href: '/admin', icon: '📊' },
        { label: 'Manajemen User', href: '/admin/users', icon: '👥' },
        { label: 'Verifikasi Jastiper', href: '/admin/jastiper', icon: '✅' }
      ]
    },
    {
      section: 'Konten',
      items: [
        { label: 'Manajemen Post', href: '/admin/posts', icon: '📝' },
        { label: 'Review & Sengketa', href: '/admin/disputes', icon: '⚖️' },
        { label: 'Notifikasi', href: '/admin/notifications', icon: '📢' }
      ]
    },
    {
      section: 'Transaksi',
      items: [
        { label: 'Transaksi & Rekber', href: '/admin/transactions', icon: '💰' },
        { label: 'Kurir & Pengiriman', href: '/admin/shipping', icon: '🚚' },
        { label: 'Event & Kuota', href: '/admin/events', icon: '🎟️' }
      ]
    },
    {
      section: 'Pengaturan',
      items: [{ label: 'Analytics & Settings', href: '/admin/settings', icon: '⚙️' }]
    }
  ];

  let currentPath = '/admin';
  $: {
    const path = $page.url.pathname ?? '/admin';
    currentPath = path.length > 1 && path.endsWith('/') ? path.replace(/\/+$/, '') : path;
  }

  function isActive(href) {
    if (href === '/admin') {
      return currentPath === '/admin';
    }
    return currentPath === href || currentPath.startsWith(`${href}/`);
  }
</script>

<aside class="sidebar">
  <div class="sidebar-header">
    <div class="admin-badge">
      <span class="badge-icon">👑</span>
      <span class="badge-text">Admin Panel</span>
    </div>
  </div>

  <nav class="sidebar-nav">
    {#each menuItems as section}
      <div class="nav-section">
        <div class="section-title">{section.section}</div>
        <ul class="nav-items">
          {#each section.items as item}
            <li>
              <a href={item.href} class="nav-item" class:active={isActive(item.href)}>
                <span class="nav-icon">{item.icon}</span>
                <span class="nav-label">{item.label}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </nav>

  <div class="sidebar-footer">
    <a href="/" class="back-to-site">
      <span>←</span>
      <span>Kembali ke Situs</span>
    </a>
  </div>
</aside>

<style>
  .sidebar {
    width: 280px;
    height: 100vh;
    background: white;
    border-right: 2px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    overflow-y: auto;
  }

  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  .admin-badge {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    border-radius: 12px;
    color: white;
  }

  .badge-icon {
    font-size: 1.5rem;
  }

  .badge-text {
    font-weight: 700;
    font-size: 1.125rem;
  }

  .sidebar-nav {
    flex: 1;
    padding: 1rem 0;
    overflow-y: auto;
  }

  .nav-section {
    margin-bottom: 1.5rem;
  }

  .section-title {
    padding: 0.5rem 1.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #94a3b8;
    letter-spacing: 0.05em;
  }

  .nav-items {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1.5rem;
    color: #475569;
    text-decoration: none;
    transition: all 0.2s;
    position: relative;
  }

  .nav-item:hover {
    background: #f8fafc;
    color: #086adf;
  }

  .nav-item.active {
    background: #dbeafe;
    color: #1d4ed8;
    font-weight: 600;
  }

  .nav-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #1d4ed8;
  }

  .nav-icon {
    font-size: 1.25rem;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-label {
    font-size: 0.95rem;
  }

  .sidebar-footer {
    padding: 1rem 1.5rem;
    border-top: 2px solid #e2e8f0;
  }

  .back-to-site {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: #f8fafc;
    border-radius: 8px;
    color: #64748b;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.2s;
  }

  .back-to-site:hover {
    background: #e2e8f0;
    color: #475569;
  }

  /* Scrollbar styling */
  .sidebar::-webkit-scrollbar {
    width: 6px;
  }

  .sidebar::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  .sidebar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  .sidebar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  @media (max-width: 1024px) {
    .sidebar {
      width: 260px;
    }
  }

  @media (max-width: 768px) {
    .sidebar {
      transform: translateX(-100%);
      transition: transform 0.3s;
    }

    .sidebar.open {
      transform: translateX(0);
    }
  }
</style>
