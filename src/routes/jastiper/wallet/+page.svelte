<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import Navbar from '$lib/components/Navbar.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { jastiperTransactions } from '$lib/data/mockData';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'jastiper') {
      goto('/login?redirect=/jastiper/wallet&expected=jastiper');
    }
  });

  const currentJastiperId = 'JST001';
  $: myTransactions = jastiperTransactions.filter((trx) => trx.jastiperId === currentJastiperId);

  $: pendingBalance = myTransactions
    .filter((t) => t.type === 'income' && t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  $: activeBalance = myTransactions
    .filter((t) => t.type === 'income' && t.status === 'released')
    .reduce((sum, t) => sum + t.amount, 0);

  $: totalWithdrawn = Math.abs(
    myTransactions
      .filter((t) => t.type === 'withdrawal')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  let showWithdrawModal = false;
  let withdrawForm = {
    amount: 0,
    bankName: '',
    accountNumber: '',
    accountName: ''
  };

  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function handleWithdraw() {
    if (activeBalance === 0) {
      alert('Saldo aktif Anda kosong');
      return;
    }
    showWithdrawModal = true;
  }

  function submitWithdrawal() {
    if (!withdrawForm.amount || withdrawForm.amount > activeBalance) {
      alert('Jumlah penarikan tidak valid');
      return;
    }
    if (!withdrawForm.bankName || !withdrawForm.accountNumber || !withdrawForm.accountName) {
      alert('Harap lengkapi data rekening');
      return;
    }

    alert(
      `Permintaan penarikan berhasil!\nJumlah: ${formatPrice(withdrawForm.amount)}\nBank: ${withdrawForm.bankName}\nRekening: ${withdrawForm.accountNumber}\n\nDana akan ditransfer dalam 1-3 hari kerja.`
    );
    showWithdrawModal = false;
    withdrawForm = {
      amount: 0,
      bankName: '',
      accountNumber: '',
      accountName: ''
    };
  }
</script>

<Navbar />

<div class="container">
  <div class="header">
    <div>
      <h1>Wallet & Saldo</h1>
      <p>Kelola pemasukan dan penarikan dana Anda</p>
    </div>
  </div>

  <!-- Balance Cards -->
  <div class="balance-grid">
    <div class="balance-card primary">
      <div class="balance-icon">💰</div>
      <div class="balance-content">
        <span class="balance-label">Saldo Aktif</span>
        <span class="balance-amount">{formatPrice(activeBalance)}</span>
        <span class="balance-sublabel">Siap dicairkan</span>
      </div>
      <button class="btn-withdraw" on:click={handleWithdraw}>Tarik Dana</button>
    </div>

    <div class="balance-card warning">
      <div class="balance-icon">⏳</div>
      <div class="balance-content">
        <span class="balance-label">Saldo Tertahan (Rekber)</span>
        <span class="balance-amount">{formatPrice(pendingBalance)}</span>
        <span class="balance-sublabel">Menunggu konfirmasi pembeli</span>
      </div>
    </div>

    <div class="balance-card info">
      <div class="balance-icon">📊</div>
      <div class="balance-content">
        <span class="balance-label">Total Ditarik</span>
        <span class="balance-amount">{formatPrice(totalWithdrawn)}</span>
        <span class="balance-sublabel">Riwayat penarikan</span>
      </div>
    </div>
  </div>

  <!-- Transactions History -->
  <div class="transactions-section">
    <h2>Riwayat Transaksi</h2>

    {#if myTransactions.length === 0}
      <div class="empty-state">
        <span class="empty-icon">💳</span>
        <p>Belum ada transaksi</p>
      </div>
    {:else}
      <div class="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Deskripsi</th>
              <th>Tipe</th>
              <th>Status</th>
              <th>Jumlah</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {#each myTransactions as trx (trx.id)}
              <tr>
                <td>{formatDate(trx.createdAt)}</td>
                <td>
                  <div class="description">
                    <span class="desc-text">{trx.description}</span>
                    {#if trx.orderCode}
                      <span class="order-code">{trx.orderCode}</span>
                    {/if}
                  </div>
                </td>
                <td>
                  <span
                    class="type-badge"
                    class:income={trx.type === 'income'}
                    class:withdrawal={trx.type === 'withdrawal'}
                  >
                    {trx.type === 'income' ? 'Pemasukan' : 'Penarikan'}
                  </span>
                </td>
                <td>
                  <span
                    class="status-badge"
                    style="background: {trx.status === 'completed'
                      ? '#dcfce7'
                      : trx.status === 'released'
                        ? '#dbeafe'
                        : '#fef3c7'}; color: {trx.status === 'completed'
                      ? '#15803d'
                      : trx.status === 'released'
                        ? '#1e40af'
                        : '#92400e'}"
                  >
                    {trx.status === 'completed'
                      ? 'Selesai'
                      : trx.status === 'released'
                        ? 'Tersedia'
                        : 'Tertahan'}
                  </span>
                </td>
                <td>
                  <span
                    class="amount"
                    class:positive={trx.amount > 0}
                    class:negative={trx.amount < 0}
                  >
                    {trx.amount > 0 ? '+' : ''}{formatPrice(trx.amount)}
                  </span>
                </td>
                <td>
                  <div class="details">
                    {#if trx.status === 'pending' && trx.releaseDate}
                      <span class="detail-text">Rilis: {formatDate(trx.releaseDate)}</span>
                    {/if}
                    {#if trx.status === 'released' && trx.releasedAt}
                      <span class="detail-text">Dirilis: {formatDate(trx.releasedAt)}</span>
                    {/if}
                    {#if trx.type === 'withdrawal' && trx.bankName}
                      <span class="detail-text"
                        >{trx.bankName} - {trx.accountNumber}</span
                      >
                    {/if}
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>

<Modal
  bind:isOpen={showWithdrawModal}
  title="Tarik Dana"
  showCancel={true}
  cancelText="Batal"
  confirmText="Kirim Permintaan"
  autoCloseOnConfirm={false}
  maxWidth="700px"
  on:cancel={() => (showWithdrawModal = false)}
  on:confirm={submitWithdrawal}
>
  <div class="withdraw-modal">
    <div class="balance-info">
      <span>Saldo Tersedia:</span>
      <span class="balance">{formatPrice(activeBalance)}</span>
    </div>

    <div class="form-group">
      <label>Jumlah Penarikan *</label>
      <div class="input-with-button">
        <input
          type="number"
          bind:value={withdrawForm.amount}
          placeholder="0"
          min="0"
          max={activeBalance}
        />
        <button
          class="btn-max"
          type="button"
          on:click={() => (withdrawForm.amount = activeBalance)}
        >
          Tarik Semua
        </button>
      </div>
    </div>

    <div class="form-group">
      <label>Nama Bank *</label>
      <select bind:value={withdrawForm.bankName}>
        <option value="">Pilih Bank</option>
        <option value="BCA">BCA</option>
        <option value="Mandiri">Mandiri</option>
        <option value="BNI">BNI</option>
        <option value="BRI">BRI</option>
        <option value="CIMB Niaga">CIMB Niaga</option>
      </select>
    </div>

    <div class="form-group">
      <label>Nomor Rekening *</label>
      <input
        type="text"
        bind:value={withdrawForm.accountNumber}
        placeholder="1234567890"
      />
    </div>

    <div class="form-group">
      <label>Nama Pemilik Rekening *</label>
      <input
        type="text"
        bind:value={withdrawForm.accountName}
        placeholder="Nama sesuai rekening"
      />
    </div>

    <div class="info-box">
      <p>
        <strong>Catatan:</strong> Dana akan ditransfer dalam 1-3 hari kerja. Pastikan
        data rekening sudah benar.
      </p>
    </div>
  </div>
</Modal>

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

  .balance-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .balance-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .balance-card.primary {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .balance-card.warning {
    background: linear-gradient(135deg, #f97316, #fb923c);
    color: white;
  }

  .balance-card.info {
    background: linear-gradient(135deg, #8b5cf6, #a78bfa);
    color: white;
  }

  .balance-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .balance-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .balance-label {
    font-size: 0.875rem;
    opacity: 0.9;
    font-weight: 600;
  }

  .balance-amount {
    font-size: 2.25rem;
    font-weight: 800;
  }

  .balance-sublabel {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .btn-withdraw {
    padding: 0.875rem 1.5rem;
    background: white;
    color: #086adf;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .btn-withdraw:hover {
    transform: scale(1.05);
  }

  .transactions-section {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .transactions-section h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
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

  .transactions-table {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    padding: 1rem;
    background: #f8fafc;
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    border-bottom: 2px solid #e2e8f0;
  }

  td {
    padding: 1.25rem 1rem;
    border-bottom: 1px solid #f1f5f9;
    color: #1f2937;
    font-size: 0.9rem;
  }

  tr:last-child td {
    border-bottom: none;
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .desc-text {
    font-weight: 600;
  }

  .order-code {
    font-size: 0.8rem;
    color: #64748b;
  }

  .type-badge {
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .type-badge.income {
    background: #dcfce7;
    color: #15803d;
  }

  .type-badge.withdrawal {
    background: #fee2e2;
    color: #991b1b;
  }

  .status-badge {
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .amount {
    font-weight: 700;
    font-size: 1rem;
  }

  .amount.positive {
    color: #22c55e;
  }

  .amount.negative {
    color: #ef4444;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .detail-text {
    font-size: 0.8rem;
    color: #64748b;
  }

  .withdraw-modal {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .balance-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #eff6ff;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  .balance-info .balance {
    font-size: 1.5rem;
    font-weight: 800;
    color: #0ea5e9;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .form-group input,
  .form-group select {
    width: 100%;
    box-sizing: border-box;
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s;
  }

  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #086adf;
  }

  .input-with-button {
    display: flex;
    gap: 0.75rem;
  }

  .input-with-button input {
    flex: 1;
  }

  .btn-max {
    padding: 0.5rem 1rem;
    background: #eff6ff;
    border: none;
    border-radius: 8px;
    color: #086adf;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .info-box {
    padding: 1rem;
    background: #fef3c7;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  .info-box p {
    font-size: 0.875rem;
    color: #92400e;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .balance-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
