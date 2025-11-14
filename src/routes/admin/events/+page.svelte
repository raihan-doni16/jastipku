<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import Modal from '$lib/components/Modal.svelte';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'admin') {
      goto('/login?redirect=/admin/events&expected=admin');
      return;
    }
  });

  // Mock event data
  const events = [
    {
      id: 'event-1',
      title: 'Flash Sale Sepatu Nike',
      jastiperName: 'Rina Travel',
      location: 'Bangkok, Thailand',
      startDate: '2024-01-20T08:00:00',
      endDate: '2024-01-25T20:00:00',
      totalSlots: 50,
      filledSlots: 42,
      waitingQueue: 15,
      status: 'active',
      type: 'flash_sale',
      description: 'Flash sale sepatu Nike dengan diskon hingga 50%',
      createdAt: '2024-01-15T10:00:00'
    },
    {
      id: 'event-2',
      title: 'Pre-Order iPhone 15 Pro',
      jastiperName: 'Yuki Japan',
      location: 'Tokyo, Japan',
      startDate: '2024-01-18T00:00:00',
      endDate: '2024-01-30T23:59:00',
      totalSlots: 30,
      filledSlots: 30,
      waitingQueue: 25,
      status: 'full',
      type: 'pre_order',
      description: 'Pre-order iPhone 15 Pro dari Jepang dengan harga spesial',
      createdAt: '2024-01-12T09:30:00'
    },
    {
      id: 'event-3',
      title: 'Kosmetik Korea Festival',
      jastiperName: 'Korea Stuff',
      location: 'Seoul, South Korea',
      startDate: '2024-01-22T10:00:00',
      endDate: '2024-01-28T18:00:00',
      totalSlots: 100,
      filledSlots: 65,
      waitingQueue: 8,
      status: 'active',
      type: 'limited_event',
      description: 'Festival kosmetik Korea dengan berbagai brand ternama',
      createdAt: '2024-01-16T14:20:00'
    },
    {
      id: 'event-4',
      title: 'Clearance Sale Fashion',
      jastiperName: 'Sinta Shop',
      location: 'Singapore',
      startDate: '2024-01-10T00:00:00',
      endDate: '2024-01-15T23:59:00',
      totalSlots: 40,
      filledSlots: 40,
      waitingQueue: 0,
      status: 'closed',
      type: 'flash_sale',
      description: 'Clearance sale fashion items dengan harga miring',
      createdAt: '2024-01-05T11:00:00'
    }
  ];

  // Mock queue data
  const queueDetails = [
    {
      id: 'queue-1',
      eventId: 'event-2',
      eventTitle: 'Pre-Order iPhone 15 Pro',
      buyerName: 'Ahmad Hidayat',
      buyerEmail: 'ahmad@example.com',
      queuePosition: 1,
      joinedAt: '2024-01-17T15:30:00',
      status: 'waiting',
      notified: false
    },
    {
      id: 'queue-2',
      eventId: 'event-2',
      eventTitle: 'Pre-Order iPhone 15 Pro',
      buyerName: 'Dewi Lestari',
      buyerEmail: 'dewi@example.com',
      queuePosition: 2,
      joinedAt: '2024-01-17T16:45:00',
      status: 'waiting',
      notified: false
    },
    {
      id: 'queue-3',
      eventId: 'event-2',
      eventTitle: 'Pre-Order iPhone 15 Pro',
      buyerName: 'Budi Santoso',
      buyerEmail: 'budi@example.com',
      queuePosition: 3,
      joinedAt: '2024-01-17T17:20:00',
      status: 'waiting',
      notified: false
    },
    {
      id: 'queue-4',
      eventId: 'event-1',
      eventTitle: 'Flash Sale Sepatu Nike',
      buyerName: 'Siti Nurhaliza',
      buyerEmail: 'siti@example.com',
      queuePosition: 1,
      joinedAt: '2024-01-16T10:15:00',
      status: 'waiting',
      notified: false
    }
  ];

  let selectedTab = 'events'; // 'events' or 'queue'
  let filterStatus = 'all';
  let searchQuery = '';

  const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'active', label: 'Aktif' },
    { value: 'full', label: 'Penuh' },
    { value: 'closed', label: 'Ditutup' }
  ];

  $: filteredEvents = events.filter((event) => {
    const matchStatus = filterStatus === 'all' || event.status === filterStatus;
    const matchSearch =
      searchQuery === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.jastiperName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  $: activeEvents = events.filter((e) => e.status === 'active').length;
  $: fullEvents = events.filter((e) => e.status === 'full').length;
  $: totalQueue = queueDetails.filter((q) => q.status === 'waiting').length;
  $: totalSlots = events.reduce((sum, e) => sum + e.totalSlots, 0);

  // Modal state
  let modalConfig = {
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'OK',
    cancelText: 'Batal',
    showCancel: false,
    inputValue: '',
    inputPlaceholder: '',
    onConfirm: null
  };

  function showModal(config) {
    modalConfig = {
      isOpen: true,
      type: config.type || 'info',
      title: config.title || '',
      message: config.message || '',
      confirmText: config.confirmText || 'OK',
      cancelText: config.cancelText || 'Batal',
      showCancel: config.showCancel || false,
      inputValue: config.inputValue || '',
      inputPlaceholder: config.inputPlaceholder || '',
      onConfirm: config.onConfirm || null
    };
  }

  function handleModalConfirm(event) {
    if (modalConfig.onConfirm) {
      // For prompt type, pass the input value
      if (modalConfig.type === 'prompt' && event.detail !== undefined) {
        modalConfig.onConfirm(event.detail);
      } else {
        modalConfig.onConfirm();
      }
    }
  }

  function formatDate(dateString) {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function getStatusBadge(status) {
    const badges = {
      active: { label: 'Aktif', color: '#10b981' },
      full: { label: 'Penuh', color: '#f59e0b' },
      closed: { label: 'Ditutup', color: '#94a3b8' },
      waiting: { label: 'Menunggu', color: '#f59e0b' },
      notified: { label: 'Sudah Dinotifikasi', color: '#0ea5e9' }
    };
    return badges[status] || { label: status, color: '#64748b' };
  }

  function getEventTypeBadge(type) {
    const types = {
      flash_sale: { label: 'Flash Sale', color: '#ef4444' },
      pre_order: { label: 'Pre-Order', color: '#8b5cf6' },
      limited_event: { label: 'Limited Event', color: '#f59e0b' }
    };
    return types[type] || { label: type, color: '#64748b' };
  }

  function increaseSlots(eventId) {
    showModal({
      type: 'prompt',
      title: 'Tambah Slot',
      message: 'Tambah berapa slot?',
      inputPlaceholder: 'Masukkan jumlah slot...',
      confirmText: 'Submit',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: (amount) => {
        if (amount && !isNaN(amount)) {
          showModal({
            type: 'success',
            title: 'Berhasil',
            message: `${amount} slot ditambahkan ke event ${eventId}`,
            confirmText: 'OK'
          });
          // In real app, call API
        }
      }
    });
  }

  function closeEvent(eventId) {
    showModal({
      type: 'confirm',
      title: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menutup event ini?',
      confirmText: 'Ya',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: () => {
        showModal({
          type: 'success',
          title: 'Berhasil',
          message: `Event ${eventId} ditutup`,
          confirmText: 'OK'
        });
        // In real app, call API
      }
    });
  }

  function viewEventDetail(eventId) {
    showModal({
      type: 'info',
      title: 'Detail Event',
      message: `Membuka detail event ${eventId}`,
      confirmText: 'OK'
    });
    // In real app, navigate to detail page
  }

  function notifyQueueUser(queueId) {
    showModal({
      type: 'confirm',
      title: 'Konfirmasi',
      message: 'Kirim notifikasi ke user bahwa slot tersedia?',
      confirmText: 'Ya',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: () => {
        showModal({
          type: 'success',
          title: 'Berhasil',
          message: `Notifikasi dikirim ke user ${queueId}`,
          confirmText: 'OK'
        });
        // In real app, call API
      }
    });
  }

  function removeFromQueue(queueId) {
    showModal({
      type: 'confirm',
      title: 'Konfirmasi',
      message: 'Hapus user dari antrian?',
      confirmText: 'Ya',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: () => {
        showModal({
          type: 'success',
          title: 'Berhasil',
          message: `User ${queueId} dihapus dari antrian`,
          confirmText: 'OK'
        });
        // In real app, call API
      }
    });
  }
</script>

<Modal
  bind:isOpen={modalConfig.isOpen}
  type={modalConfig.type}
  title={modalConfig.title}
  message={modalConfig.message}
  confirmText={modalConfig.confirmText}
  cancelText={modalConfig.cancelText}
  showCancel={modalConfig.showCancel}
  bind:inputValue={modalConfig.inputValue}
  inputPlaceholder={modalConfig.inputPlaceholder}
  on:confirm={handleModalConfirm}
/>

<div class="container">
  <div class="header">
    <h1>Event & Kuota</h1>
    <p>Kelola slot dan sistem antrian untuk event terbatas</p>
  </div>

  <!-- Stats Cards -->
  <div class="stats-cards">
    <div class="stat-card">
      <div class="stat-icon" style="background: #d1fae5;">✅</div>
      <div class="stat-content">
        <div class="stat-value">{activeEvents}</div>
        <div class="stat-label">Event Aktif</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #fef3c7;">⚠️</div>
      <div class="stat-content">
        <div class="stat-value">{fullEvents}</div>
        <div class="stat-label">Event Penuh</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #dbeafe;">⏳</div>
      <div class="stat-content">
        <div class="stat-value">{totalQueue}</div>
        <div class="stat-label">Total Antrian</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #e9d5ff;">🎟️</div>
      <div class="stat-content">
        <div class="stat-value">{totalSlots}</div>
        <div class="stat-label">Total Slot</div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs">
    <button
      class="tab-button"
      class:active={selectedTab === 'events'}
      on:click={() => (selectedTab = 'events')}
    >
      Daftar Event
    </button>
    <button
      class="tab-button"
      class:active={selectedTab === 'queue'}
      on:click={() => (selectedTab = 'queue')}
    >
      Antrian Waiting List
    </button>
  </div>

  <!-- Events Tab -->
  {#if selectedTab === 'events'}
    <div class="section">
      <div class="section-header">
        <h2>Daftar Event</h2>
        <div class="filters">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Cari event, jastiper, atau lokasi..."
              bind:value={searchQuery}
            />
          </div>
          <select bind:value={filterStatus}>
            {#each statusOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
      </div>

      <div class="results-info">
        Menampilkan {filteredEvents.length} dari {events.length} event
      </div>

      <div class="events-list">
        {#each filteredEvents as event (event.id)}
          <div class="event-card">
            <div class="event-header">
              <div class="event-title-section">
                <h3 class="event-title">{event.title}</h3>
                <div class="event-badges">
                  <span
                    class="type-badge"
                    style="background-color: {getEventTypeBadge(event.type).color};"
                  >
                    {getEventTypeBadge(event.type).label}
                  </span>
                  <span
                    class="status-badge"
                    style="background-color: {getStatusBadge(event.status).color};"
                  >
                    {getStatusBadge(event.status).label}
                  </span>
                </div>
              </div>
            </div>

            <div class="event-content">
              <div class="info-section">
                <div class="info-label">Jastiper</div>
                <div class="info-value">{event.jastiperName}</div>
              </div>

              <div class="info-section">
                <div class="info-label">Lokasi</div>
                <div class="info-value">{event.location}</div>
              </div>

              <div class="info-section">
                <div class="info-label">Periode</div>
                <div class="info-subvalue">{formatDate(event.startDate)}</div>
                <div class="info-subvalue">s/d {formatDate(event.endDate)}</div>
              </div>

              <div class="info-section">
                <div class="info-label">Slot</div>
                <div class="slot-info">
                  <div class="slot-bar">
                    <div
                      class="slot-fill"
                      style="width: {(event.filledSlots / event.totalSlots) * 100}%"
                    ></div>
                  </div>
                  <div class="slot-text">
                    {event.filledSlots} / {event.totalSlots} terisi
                  </div>
                </div>
              </div>

              {#if event.waitingQueue > 0}
                <div class="info-section">
                  <div class="info-label">Antrian</div>
                  <div class="info-value queue">{event.waitingQueue} orang menunggu</div>
                </div>
              {/if}

              <div class="info-section full-width">
                <div class="info-label">Deskripsi</div>
                <div class="info-subvalue">{event.description}</div>
              </div>
            </div>

            <div class="event-actions">
              <button class="btn-secondary" on:click={() => viewEventDetail(event.id)}>
                Lihat Detail
              </button>
              {#if event.status === 'active' || event.status === 'full'}
                <button class="btn-primary" on:click={() => increaseSlots(event.id)}>
                  Tambah Slot
                </button>
              {/if}
              {#if event.status === 'active'}
                <button class="btn-close" on:click={() => closeEvent(event.id)}>
                  Tutup Event
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      {#if filteredEvents.length === 0}
        <div class="empty-state">
          <div class="empty-icon">🎪</div>
          <h3>Tidak ada event</h3>
          <p>Event dengan kuota terbatas akan muncul di sini</p>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Queue Tab -->
  {#if selectedTab === 'queue'}
    <div class="section">
      <div class="section-header">
        <h2>Antrian Waiting List</h2>
      </div>

      <div class="results-info">Menampilkan {queueDetails.length} antrian aktif</div>

      <div class="queue-list">
        {#each queueDetails as queue (queue.id)}
          <div class="queue-card">
            <div class="queue-header">
              <div class="queue-event-info">
                <div class="queue-event-title">{queue.eventTitle}</div>
                <span class="queue-position">Posisi #{queue.queuePosition}</span>
              </div>
              <span
                class="status-badge"
                style="background-color: {getStatusBadge(
                  queue.notified ? 'notified' : queue.status
                ).color};"
              >
                {getStatusBadge(queue.notified ? 'notified' : queue.status).label}
              </span>
            </div>

            <div class="queue-content">
              <div class="info-section">
                <div class="info-label">Pembeli</div>
                <div class="info-value">{queue.buyerName}</div>
                <div class="info-subvalue">{queue.buyerEmail}</div>
              </div>

              <div class="info-section">
                <div class="info-label">Bergabung</div>
                <div class="info-subvalue">{formatDate(queue.joinedAt)}</div>
              </div>
            </div>

            <div class="queue-actions">
              {#if !queue.notified && queue.status === 'waiting'}
                <button class="btn-notify" on:click={() => notifyQueueUser(queue.id)}>
                  Notifikasi User
                </button>
              {/if}
              <button class="btn-remove" on:click={() => removeFromQueue(queue.id)}>
                Hapus dari Antrian
              </button>
            </div>
          </div>
        {/each}
      </div>

      {#if queueDetails.length === 0}
        <div class="empty-state">
          <div class="empty-icon">⏳</div>
          <h3>Tidak ada antrian</h3>
          <p>User yang masuk waiting list akan muncul di sini</p>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem;
    min-height: calc(100vh - 80px);
  }

  .header {
    text-align: center;
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

  .stats-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }

  .stat-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: #0f172a;
  }

  .stat-label {
    font-size: 0.875rem;
    color: #64748b;
  }

  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid #e2e8f0;
  }

  .tab-button {
    padding: 1rem 2rem;
    border: none;
    background: transparent;
    color: #64748b;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.2s;
  }

  .tab-button.active {
    color: #086adf;
    border-bottom-color: #086adf;
  }

  .tab-button:hover {
    color: #086adf;
  }

  .section {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  .filters {
    display: flex;
    gap: 1rem;
    flex: 1;
    max-width: 600px;
  }

  .search-box {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    font-size: 1.25rem;
  }

  .search-box input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 0.95rem;
    transition: border-color 0.2s;
  }

  .search-box input:focus {
    outline: none;
    border-color: #086adf;
  }

  select {
    padding: 0.75rem 1.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 0.95rem;
    background: white;
    cursor: pointer;
    transition: border-color 0.2s;
    min-width: 180px;
  }

  select:focus {
    outline: none;
    border-color: #086adf;
  }

  .results-info {
    font-size: 0.95rem;
    color: #64748b;
    margin-bottom: 1.5rem;
  }

  .events-list,
  .queue-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .event-card,
  .queue-card {
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    transition: box-shadow 0.3s;
  }

  .event-card:hover,
  .queue-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .event-header,
  .queue-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
  }

  .event-title-section {
    flex: 1;
  }

  .event-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.75rem 0;
  }

  .event-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .type-badge,
  .status-badge {
    padding: 0.375rem 0.875rem;
    border-radius: 999px;
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .event-content,
  .queue-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .info-section {
    display: flex;
    flex-direction: column;
  }

  .info-section.full-width {
    grid-column: 1 / -1;
  }

  .info-label {
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .info-value {
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.25rem;
  }

  .info-value.queue {
    color: #f59e0b;
  }

  .info-subvalue {
    font-size: 0.875rem;
    color: #64748b;
  }

  .slot-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .slot-bar {
    width: 100%;
    height: 8px;
    background: #e2e8f0;
    border-radius: 999px;
    overflow: hidden;
  }

  .slot-fill {
    height: 100%;
    background: linear-gradient(135deg, #10b981, #059669);
    transition: width 0.3s;
  }

  .slot-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: #475569;
  }

  .event-actions,
  .queue-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: 2px solid #f1f5f9;
    flex-wrap: wrap;
  }

  .btn-primary,
  .btn-secondary,
  .btn-close,
  .btn-notify,
  .btn-remove {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .btn-primary {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(8, 106, 223, 0.3);
  }

  .btn-secondary {
    background: white;
    border: 2px solid #e2e8f0;
    color: #475569;
  }

  .btn-secondary:hover {
    border-color: #086adf;
    color: #086adf;
  }

  .btn-close {
    background: white;
    border: 2px solid #94a3b8;
    color: #64748b;
  }

  .btn-close:hover {
    border-color: #64748b;
    background: #f8fafc;
  }

  .btn-notify {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
  }

  .btn-notify:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  .btn-remove {
    background: white;
    border: 2px solid #ef4444;
    color: #ef4444;
  }

  .btn-remove:hover {
    background: #fef2f2;
  }

  .queue-event-info {
    flex: 1;
  }

  .queue-event-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }

  .queue-position {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: #dbeafe;
    color: #1e40af;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 700;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .empty-state h3 {
    font-size: 1.5rem;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .empty-state p {
    color: #64748b;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .stats-cards {
      grid-template-columns: 1fr;
    }

    .section-header {
      flex-direction: column;
      align-items: stretch;
    }

    .filters {
      flex-direction: column;
      max-width: 100%;
    }

    .event-content,
    .queue-content {
      grid-template-columns: 1fr;
    }

    .event-actions,
    .queue-actions {
      flex-direction: column;
    }
  }
</style>
