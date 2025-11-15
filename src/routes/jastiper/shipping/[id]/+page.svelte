<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { authStore } from '$lib/stores/auth';
  import { jastiperOrders } from '$lib/data/mockData';
  import Navbar from '$lib/components/Navbar.svelte';
  import Modal from '$lib/components/Modal.svelte';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  $: orderId = $page.params.id;
  $: order = jastiperOrders.find((o) => o.id === orderId);

  onMount(() => {
    if (currentRole !== 'jastiper') {
      goto('/login?redirect=/jastiper/shipping/' + orderId + '&expected=jastiper');
      return;
    }
  });

  let shippingData = {
    courier: '',
    trackingNumber: '',
    estimatedDelivery: '',
    senderName: '',
    senderPhone: '',
    notes: ''
  };

  const courierOptions = [
    { value: 'jne', label: 'JNE' },
    { value: 'jnt', label: 'J&T Express' },
    { value: 'sicepat', label: 'SiCepat' },
    { value: 'anteraja', label: 'AnterAja' },
    { value: 'idexpress', label: 'ID Express' },
    { value: 'ninja', label: 'Ninja Express' },
    { value: 'tiki', label: 'TIKI' },
    { value: 'pos', label: 'Pos Indonesia' }
  ];

  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }

  let modalOpen = false;
  let modalTitle = '';
  let modalMessage = '';
  let modalType = 'info';
  let modalContext = null;

  function openModal({ title, message, type = 'info', context = null }) {
    modalTitle = title;
    modalMessage = message;
    modalType = type;
    modalContext = context;
    modalOpen = true;
  }

  function submitShipping() {
    if (!shippingData.courier || !shippingData.trackingNumber) {
      openModal({
        title: 'Data pengiriman belum lengkap',
        message: 'Mohon lengkapi data kurir dan nomor resi sebelum submit pengiriman.',
        type: 'warning'
      });
      return;
    }

    openModal({
      title: 'Pengiriman berhasil diatur',
      message: `Kurir: ${
        courierOptions.find((c) => c.value === shippingData.courier)?.label
      }\nNo Resi: ${
        shippingData.trackingNumber
      }\n\nPembeli akan menerima notifikasi dan update status pesanan.`,
      type: 'success',
      context: 'shippingSubmitted'
    });
  }

  function handleModalConfirm() {
    if (modalContext === 'shippingSubmitted') {
      goto('/jastiper/orders');
    }
    modalContext = null;
    modalOpen = false;
  }
</script>

<Navbar />

<div class="container">
  <div class="header">
    <button class="back-button" on:click={() => goto('/jastiper/orders')}>
      ← Kembali
    </button>
    <h1>Manajemen Pengiriman</h1>
    <p>Atur pengiriman untuk pesanan ini</p>
  </div>

  {#if order}
    <div class="content-grid">
      <!-- Order Info Card -->
      <div class="info-card">
        <h2>Informasi Pesanan</h2>

        <div class="info-section">
          <div class="info-label">Kode Pesanan</div>
          <div class="info-value">{order.orderCode}</div>
        </div>

        <div class="info-section">
          <div class="info-label">Pembeli</div>
          <div class="info-value">{order.buyerName}</div>
          <div class="info-subvalue">{order.buyerPhone}</div>
        </div>

        <div class="info-section">
          <div class="info-label">Produk</div>
          <div class="info-value">{order.productName}</div>
          <div class="info-subvalue">Qty: {order.quantity}</div>
        </div>

        <div class="info-section">
          <div class="info-label">Total Pembayaran</div>
          <div class="info-value price">{formatPrice(order.totalPrice)}</div>
        </div>

        <div class="alert-info">
          <strong>📌 Catatan:</strong>
          <p>Pastikan barang sudah dikemas dengan baik sebelum dikirim.</p>
        </div>
      </div>

      <!-- Shipping Form Card -->
      <div class="form-card">
        <h2>Form Pengiriman</h2>

        <div class="form-group">
          <label for="courier"
            >Pilih Kurir <span class="required">*</span></label
          >
          <select id="courier" bind:value={shippingData.courier}>
            <option value="">-- Pilih Kurir --</option>
            {#each courierOptions as courier}
              <option value={courier.value}>{courier.label}</option>
            {/each}
          </select>
        </div>

        <div class="form-group">
          <label for="trackingNumber"
            >Nomor Resi <span class="required">*</span></label
          >
          <input
            id="trackingNumber"
            type="text"
            bind:value={shippingData.trackingNumber}
            placeholder="Contoh: JNE12345678"
          />
        </div>

        <div class="form-group">
          <label for="estimatedDelivery">Estimasi Tiba (Opsional)</label>
          <input id="estimatedDelivery" type="date" bind:value={shippingData.estimatedDelivery} />
        </div>

        <div class="form-group">
          <label for="senderName">Nama Pengirim (Opsional)</label>
          <input
            id="senderName"
            type="text"
            bind:value={shippingData.senderName}
            placeholder="Nama Anda"
          />
        </div>

        <div class="form-group">
          <label for="senderPhone">Nomor HP Pengirim (Opsional)</label>
          <input
            id="senderPhone"
            type="tel"
            bind:value={shippingData.senderPhone}
            placeholder="08xxxxxxxxxx"
          />
        </div>

        <div class="form-group">
          <label for="notes">Catatan Tambahan (Opsional)</label>
          <textarea
            id="notes"
            bind:value={shippingData.notes}
            placeholder="Catatan untuk pembeli..."
            rows="3"
          ></textarea>
        </div>

        <div class="info-box">
          <strong>💡 Tips Pengiriman:</strong>
          <ul>
            <li>Double check nomor resi sebelum submit</li>
            <li>Foto paket sebagai bukti</li>
            <li>Informasikan pembeli via chat</li>
            <li>Pastikan asuransi jika nilai barang tinggi</li>
          </ul>
        </div>

        <div class="button-group">
          <button class="btn-secondary" on:click={() => goto('/jastiper/orders')}>
            Batal
          </button>
          <button class="btn-primary" on:click={submitShipping}>Submit Pengiriman</button>
        </div>
      </div>
    </div>
  {:else}
    <div class="error-state">
      <div class="error-icon">❌</div>
      <h3>Pesanan Tidak Ditemukan</h3>
      <p>Pesanan dengan ID {orderId} tidak ditemukan</p>
      <button class="btn-primary" on:click={() => goto('/jastiper/orders')}>
        Kembali ke Daftar Pesanan
      </button>
    </div>
  {/if}
</div>

<Modal
  bind:isOpen={modalOpen}
  type={modalType}
  title={modalTitle}
  message={modalMessage}
  confirmText="OK"
  on:confirm={handleModalConfirm}
/>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    min-height: calc(100vh - 80px);
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
  }

  .back-button {
    position: absolute;
    left: 0;
    top: 0;
    padding: 0.75rem 1.5rem;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    color: #475569;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .back-button:hover {
    border-color: #086adf;
    color: #086adf;
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

  .content-grid {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 2rem;
  }

  .info-card,
  .form-card {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .info-card h2,
  .form-card h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
  }

  .info-section {
    margin-bottom: 1.5rem;
  }

  .info-label {
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .info-value {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.25rem;
  }

  .info-value.price {
    color: #0ea5e9;
    font-size: 1.5rem;
  }

  .info-subvalue {
    font-size: 0.875rem;
    color: #64748b;
  }

  .alert-info {
    margin-top: 2rem;
    padding: 1rem;
    background: #fef3c7;
    border-radius: 8px;
    border-left: 4px solid #f59e0b;
  }

  .alert-info strong {
    color: #92400e;
    display: block;
    margin-bottom: 0.5rem;
  }

  .alert-info p {
    color: #78350f;
    margin: 0;
    font-size: 0.875rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  .required {
    color: #ef4444;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
    font-family: inherit;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #086adf;
  }

  .form-group textarea {
    resize: vertical;
  }

  .info-box {
    padding: 1.25rem;
    background: #dbeafe;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }

  .info-box strong {
    color: #1e40af;
    display: block;
    margin-bottom: 0.75rem;
  }

  .info-box ul {
    margin-left: 1.5rem;
    color: #1e3a8a;
    line-height: 1.8;
  }

  .info-box li {
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
  }

  .button-group {
    display: flex;
    gap: 1rem;
  }

  .btn-primary,
  .btn-secondary {
    flex: 1;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1rem;
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

  .error-state {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .error-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .error-state h3 {
    font-size: 1.5rem;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .error-state p {
    color: #64748b;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }

    .back-button {
      position: static;
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .button-group {
      flex-direction: column;
    }
  }
</style>
