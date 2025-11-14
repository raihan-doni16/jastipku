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
      goto('/login?redirect=/admin/transactions&expected=admin');
      return;
    }
  });

  // Mock data for transactions and escrow
  const transactions = [
    {
      id: 'TRX001',
      orderCode: 'ORD-2024-001',
      jastiperName: 'Rina Travel',
      buyerName: 'Budi Santoso',
      amount: 850000,
      escrowAmount: 850000,
      status: 'held',
      type: 'full_payment',
      createdAt: '2024-01-15T10:30:00',
      releasedAt: null
    },
    {
      id: 'TRX002',
      orderCode: 'ORD-2024-002',
      jastiperName: 'Sinta Shop',
      buyerName: 'Dewi Lestari',
      amount: 450000,
      escrowAmount: 0,
      status: 'released',
      type: 'dp_payment',
      createdAt: '2024-01-14T14:20:00',
      releasedAt: '2024-01-16T09:15:00'
    },
    {
      id: 'TRX003',
      orderCode: 'ORD-2024-003',
      jastiperName: 'Yuki Japan',
      buyerName: 'Ahmad Hidayat',
      amount: 1200000,
      escrowAmount: 1200000,
      status: 'held',
      type: 'full_payment',
      createdAt: '2024-01-13T16:45:00',
      releasedAt: null
    },
    {
      id: 'TRX004',
      orderCode: 'ORD-2024-004',
      jastiperName: 'Rina Travel',
      buyerName: 'Siti Nurhaliza',
      amount: 325000,
      escrowAmount: 0,
      status: 'released',
      type: 'full_payment',
      createdAt: '2024-01-12T11:30:00',
      releasedAt: '2024-01-14T13:20:00'
    },
    {
      id: 'TRX005',
      orderCode: 'ORD-2024-005',
      jastiperName: 'Korea Stuff',
      buyerName: 'Andi Wijaya',
      amount: 600000,
      escrowAmount: 300000,
      status: 'held',
      type: 'dp_payment',
      createdAt: '2024-01-16T08:15:00',
      releasedAt: null
    }
  ];

  const withdrawalRequests = [
    {
      id: 'WD001',
      jastiperName: 'Rina Travel',
      jastiperEmail: 'rina@example.com',
      amount: 2450000,
      bankName: 'BCA',
      accountNumber: '1234567890',
      accountName: 'Rina Maharani',
      status: 'pending',
      requestedAt: '2024-01-17T09:30:00',
      processedAt: null,
      notes: ''
    },
    {
      id: 'WD002',
      jastiperName: 'Sinta Shop',
      jastiperEmail: 'sinta@example.com',
      amount: 1800000,
      bankName: 'Mandiri',
      accountNumber: '9876543210',
      accountName: 'Sinta Dewi',
      status: 'pending',
      requestedAt: '2024-01-16T15:20:00',
      processedAt: null,
      notes: ''
    },
    {
      id: 'WD003',
      jastiperName: 'Yuki Japan',
      jastiperEmail: 'yuki@example.com',
      amount: 3200000,
      bankName: 'BNI',
      accountNumber: '5554443332',
      accountName: 'Yuki Tanaka',
      status: 'approved',
      requestedAt: '2024-01-15T10:00:00',
      processedAt: '2024-01-16T11:30:00',
      notes: 'Disetujui dan sudah ditransfer'
    },
    {
      id: 'WD004',
      jastiperName: 'Korea Stuff',
      jastiperEmail: 'korea@example.com',
      amount: 950000,
      bankName: 'BRI',
      accountNumber: '7778889990',
      accountName: 'Kim Soo Jin',
      status: 'rejected',
      requestedAt: '2024-01-14T13:45:00',
      processedAt: '2024-01-15T09:20:00',
      notes: 'Saldo tidak mencukupi'
    }
  ];

  let filterStatus = 'all';
  let filterWithdrawalStatus = 'all';
  let searchQuery = '';

  const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'held', label: 'Dana Tertahan' },
    { value: 'released', label: 'Dana Dicairkan' }
  ];

  const withdrawalStatusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'pending', label: 'Menunggu' },
    { value: 'approved', label: 'Disetujui' },
    { value: 'rejected', label: 'Ditolak' }
  ];

  $: filteredTransactions = transactions.filter((trx) => {
    const matchStatus = filterStatus === 'all' || trx.status === filterStatus;
    const matchSearch =
      searchQuery === '' ||
      trx.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.jastiperName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.buyerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  $: filteredWithdrawals = withdrawalRequests.filter((wd) => {
    return filterWithdrawalStatus === 'all' || wd.status === filterWithdrawalStatus;
  });

  $: totalHeldAmount = transactions
    .filter((t) => t.status === 'held')
    .reduce((sum, t) => sum + t.escrowAmount, 0);

  $: totalReleasedAmount = transactions
    .filter((t) => t.status === 'released')
    .reduce((sum, t) => sum + t.amount, 0);

  $: pendingWithdrawals = withdrawalRequests.filter((w) => w.status === 'pending').length;

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

  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
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
      held: { label: 'Dana Tertahan', color: '#f59e0b' },
      released: { label: 'Dana Dicairkan', color: '#10b981' },
      pending: { label: 'Menunggu', color: '#f59e0b' },
      approved: { label: 'Disetujui', color: '#10b981' },
      rejected: { label: 'Ditolak', color: '#ef4444' }
    };
    return badges[status] || { label: status, color: '#64748b' };
  }

  function approveWithdrawal(withdrawalId) {
    showModal({
      type: 'confirm',
      title: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menyetujui pencairan dana ini?',
      confirmText: 'Ya',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: () => {
        showModal({
          type: 'success',
          title: 'Berhasil',
          message: `Withdrawal ${withdrawalId} disetujui. Dana akan ditransfer ke rekening jastiper.`,
          confirmText: 'OK'
        });
        // In real app, call API to approve
      }
    });
  }

  function rejectWithdrawal(withdrawalId) {
    showModal({
      type: 'prompt',
      title: 'Alasan Penolakan',
      message: 'Alasan penolakan:',
      inputPlaceholder: 'Masukkan alasan penolakan...',
      confirmText: 'Submit',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: (reason) => {
        if (reason) {
          showModal({
            type: 'success',
            title: 'Berhasil',
            message: `Withdrawal ${withdrawalId} ditolak dengan alasan: ${reason}`,
            confirmText: 'OK'
          });
          // In real app, call API to reject
        }
      }
    });
  }

  function releaseEscrow(transactionId) {
    showModal({
      type: 'confirm',
      title: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin melepas dana escrow ini ke jastiper?',
      confirmText: 'Ya',
      cancelText: 'Batal',
      showCancel: true,
      onConfirm: () => {
        showModal({
          type: 'success',
          title: 'Berhasil',
          message: `Dana escrow untuk transaksi ${transactionId} telah dilepas ke jastiper.`,
          confirmText: 'OK'
        });
        // In real app, call API to release
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
    <h1>Transaksi & Rekber</h1>
    <p>Pantau saldo tertahan dan pencairan dana</p>
  </div>

  <!-- Stats Cards -->
  <div class="stats-cards">
    <div class="stat-card">
      <div class="stat-icon" style="background: #fef3c7;">💰</div>
      <div class="stat-content">
        <div class="stat-value">{formatPrice(totalHeldAmount)}</div>
        <div class="stat-label">Total Dana Tertahan</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #d1fae5;">✅</div>
      <div class="stat-content">
        <div class="stat-value">{formatPrice(totalReleasedAmount)}</div>
        <div class="stat-label">Total Dana Dicairkan</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #dbeafe;">⏳</div>
      <div class="stat-content">
        <div class="stat-value">{pendingWithdrawals}</div>
        <div class="stat-label">Permintaan Penarikan Pending</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #e9d5ff;">📊</div>
      <div class="stat-content">
        <div class="stat-value">{transactions.length}</div>
        <div class="stat-label">Total Transaksi</div>
      </div>
    </div>
  </div>

  <!-- Withdrawal Requests Section -->
  <div class="section">
    <div class="section-header">
      <h2>Permintaan Penarikan Dana</h2>
      <select bind:value={filterWithdrawalStatus}>
        {#each withdrawalStatusOptions as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    </div>

    <div class="withdrawal-list">
      {#each filteredWithdrawals as withdrawal (withdrawal.id)}
        <div class="withdrawal-card">
          <div class="withdrawal-header">
            <div class="withdrawal-id-section">
              <span class="withdrawal-id">{withdrawal.id}</span>
              <span
                class="status-badge"
                style="background-color: {getStatusBadge(withdrawal.status).color};"
              >
                {getStatusBadge(withdrawal.status).label}
              </span>
            </div>
            <div class="withdrawal-date">{formatDate(withdrawal.requestedAt)}</div>
          </div>

          <div class="withdrawal-content">
            <div class="info-section">
              <div class="info-label">Jastiper</div>
              <div class="info-value">{withdrawal.jastiperName}</div>
              <div class="info-subvalue">{withdrawal.jastiperEmail}</div>
            </div>

            <div class="info-section">
              <div class="info-label">Jumlah Penarikan</div>
              <div class="info-value price">{formatPrice(withdrawal.amount)}</div>
            </div>

            <div class="info-section">
              <div class="info-label">Rekening Tujuan</div>
              <div class="info-value">{withdrawal.bankName}</div>
              <div class="info-subvalue">{withdrawal.accountNumber}</div>
              <div class="info-subvalue">a.n. {withdrawal.accountName}</div>
            </div>

            {#if withdrawal.processedAt}
              <div class="info-section">
                <div class="info-label">Diproses</div>
                <div class="info-subvalue">{formatDate(withdrawal.processedAt)}</div>
              </div>
            {/if}

            {#if withdrawal.notes}
              <div class="info-section full-width">
                <div class="info-label">Catatan</div>
                <div class="info-subvalue">{withdrawal.notes}</div>
              </div>
            {/if}
          </div>

          {#if withdrawal.status === 'pending'}
            <div class="withdrawal-actions">
              <button class="btn-reject" on:click={() => rejectWithdrawal(withdrawal.id)}>
                Tolak
              </button>
              <button class="btn-approve" on:click={() => approveWithdrawal(withdrawal.id)}>
                Setujui Penarikan
              </button>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    {#if filteredWithdrawals.length === 0}
      <div class="empty-state">
        <div class="empty-icon">💳</div>
        <h3>Tidak ada permintaan penarikan</h3>
        <p>Permintaan penarikan dari jastiper akan muncul di sini</p>
      </div>
    {/if}
  </div>

  <!-- Transactions Section -->
  <div class="section">
    <div class="section-header">
      <h2>Riwayat Transaksi Escrow</h2>
      <div class="filters">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Cari kode order, jastiper, atau pembeli..."
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
      Menampilkan {filteredTransactions.length} dari {transactions.length} transaksi
    </div>

    <div class="transactions-list">
      {#each filteredTransactions as transaction (transaction.id)}
        <div class="transaction-card">
          <div class="transaction-header">
            <div class="transaction-id-section">
              <span class="transaction-id">{transaction.id}</span>
              <span class="order-code">{transaction.orderCode}</span>
              <span
                class="status-badge"
                style="background-color: {getStatusBadge(transaction.status).color};"
              >
                {getStatusBadge(transaction.status).label}
              </span>
            </div>
            <div class="transaction-date">{formatDate(transaction.createdAt)}</div>
          </div>

          <div class="transaction-content">
            <div class="info-section">
              <div class="info-label">Jastiper</div>
              <div class="info-value">{transaction.jastiperName}</div>
            </div>

            <div class="info-section">
              <div class="info-label">Pembeli</div>
              <div class="info-value">{transaction.buyerName}</div>
            </div>

            <div class="info-section">
              <div class="info-label">Tipe Pembayaran</div>
              <div class="info-value">
                {transaction.type === 'full_payment' ? 'Bayar Penuh' : 'DP 50%'}
              </div>
            </div>

            <div class="info-section">
              <div class="info-label">Total Amount</div>
              <div class="info-value price">{formatPrice(transaction.amount)}</div>
            </div>

            <div class="info-section">
              <div class="info-label">Dana Tertahan</div>
              <div class="info-value" class:zero={transaction.escrowAmount === 0}>
                {formatPrice(transaction.escrowAmount)}
              </div>
            </div>

            {#if transaction.releasedAt}
              <div class="info-section">
                <div class="info-label">Dicairkan Pada</div>
                <div class="info-subvalue">{formatDate(transaction.releasedAt)}</div>
              </div>
            {/if}
          </div>

          {#if transaction.status === 'held' && transaction.escrowAmount > 0}
            <div class="transaction-actions">
              <button class="btn-release" on:click={() => releaseEscrow(transaction.id)}>
                Lepas Dana ke Jastiper
              </button>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    {#if filteredTransactions.length === 0}
      <div class="empty-state">
        <div class="empty-icon">💸</div>
        <h3>Tidak ada transaksi</h3>
        <p>Transaksi escrow akan muncul di sini</p>
      </div>
    {/if}
  </div>
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
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
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
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
  }

  .stat-label {
    font-size: 0.875rem;
    color: #64748b;
  }

  .section {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
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

  .withdrawal-list,
  .transactions-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .withdrawal-card,
  .transaction-card {
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    transition: box-shadow 0.3s;
  }

  .withdrawal-card:hover,
  .transaction-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .withdrawal-header,
  .transaction-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
  }

  .withdrawal-id-section,
  .transaction-id-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .withdrawal-id,
  .transaction-id {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
  }

  .order-code {
    font-size: 0.875rem;
    font-weight: 600;
    color: #64748b;
  }

  .status-badge {
    padding: 0.375rem 0.875rem;
    border-radius: 999px;
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .withdrawal-date,
  .transaction-date {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .withdrawal-content,
  .transaction-content {
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

  .info-value.price {
    font-size: 1.25rem;
    color: #0ea5e9;
  }

  .info-value.zero {
    color: #94a3b8;
  }

  .info-subvalue {
    font-size: 0.875rem;
    color: #64748b;
  }

  .withdrawal-actions,
  .transaction-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: 2px solid #f1f5f9;
  }

  .btn-approve,
  .btn-reject,
  .btn-release {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .btn-approve,
  .btn-release {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
  }

  .btn-approve:hover,
  .btn-release:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  .btn-reject {
    background: white;
    border: 2px solid #ef4444;
    color: #ef4444;
  }

  .btn-reject:hover {
    background: #fef2f2;
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

    .withdrawal-content,
    .transaction-content {
      grid-template-columns: 1fr;
    }

    .withdrawal-actions,
    .transaction-actions {
      flex-direction: column;
    }
  }
</style>
