<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { cartStore } from '$lib/stores/cart';
  import Navbar from '$lib/components/Navbar.svelte';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'user') {
      goto('/login?redirect=/checkout&expected=user');
      return;
    }
    if ($cartStore.items.length === 0) {
      goto('/cart');
    }
  });

  $: cart = $cartStore;
  $: cartItems = cart.items;

  let step = 1;
  let agreedToTerms = false;

  // Form data
  let shippingData = {
    fullName: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    notes: ''
  };

  let paymentData = {
    paymentType: 'full',
    bank: 'bca'
  };

  const banks = [
    { code: 'bca', name: 'BCA', number: '1234567890', holder: 'PT Jastipku Indonesia' },
    { code: 'mandiri', name: 'Mandiri', number: '9876543210', holder: 'PT Jastipku Indonesia' },
    { code: 'bni', name: 'BNI', number: '5555666677', holder: 'PT Jastipku Indonesia' }
  ];

  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }

  function calculateItemPrice(item) {
    const listing = item.listing;
    if (listing.type === 'preloved') {
      return listing.price * item.quantity;
    } else {
      const estimatedPrice = listing.minOrder || 0;
      const fee = (estimatedPrice * (listing.fee || 0)) / 100;
      return (estimatedPrice + fee) * item.quantity;
    }
  }

  function calculateSubtotal() {
    return cartItems.reduce((total, item) => total + calculateItemPrice(item), 0);
  }

  function calculateTotalFee() {
    return cartItems.reduce((total, item) => {
      const listing = item.listing;
      if (listing.type !== 'preloved') {
        const estimatedPrice = listing.minOrder || 0;
        const fee = (estimatedPrice * (listing.fee || 0)) / 100;
        return total + fee * item.quantity;
      }
      return total;
    }, 0);
  }

  function calculateTotal() {
    return calculateSubtotal();
  }

  function calculatePaymentAmount() {
    const total = calculateTotal();
    if (paymentData.paymentType === 'dp') {
      return total * 0.5;
    }
    return total;
  }

  function nextStep() {
    if (step === 1) {
      if (!agreedToTerms) {
        alert('Anda harus menyetujui syarat dan ketentuan terlebih dahulu');
        return;
      }
    } else if (step === 2) {
      if (
        !shippingData.fullName ||
        !shippingData.phone ||
        !shippingData.address ||
        !shippingData.city ||
        !shippingData.province ||
        !shippingData.postalCode
      ) {
        alert('Mohon lengkapi semua data pengiriman');
        return;
      }
    }
    step++;
  }

  function prevStep() {
    step--;
  }

  function submitOrder() {
    const orderCode = 'ORD' + Date.now();
    alert(
      `Pesanan Anda telah dibuat!\n\nKode Pesanan: ${orderCode}\n\nSilakan lakukan pembayaran sebesar ${formatPrice(calculatePaymentAmount())} ke rekening:\n${banks.find((b) => b.code === paymentData.bank)?.name} - ${banks.find((b) => b.code === paymentData.bank)?.number}\n\nSetelah transfer, upload bukti pembayaran di halaman Pesanan Saya.`
    );
    cartStore.clearCart();
    goto('/orders');
  }
</script>

<Navbar />

<div class="container">
  <div class="header">
    <h1>Checkout</h1>
    <p>Selesaikan pesanan Anda</p>
  </div>

  <div class="checkout-grid">
    <!-- Main Content -->
    <div class="checkout-content">
      <!-- Progress Steps -->
      <div class="progress-steps">
        <div class="step" class:active={step >= 1} class:completed={step > 1}>
          <div class="step-number">1</div>
          <span>Syarat & Ketentuan</span>
        </div>
        <div class="step-line" class:completed={step > 1}></div>
        <div class="step" class:active={step >= 2} class:completed={step > 2}>
          <div class="step-number">2</div>
          <span>Data Pengiriman</span>
        </div>
        <div class="step-line" class:completed={step > 2}></div>
        <div class="step" class:active={step >= 3}>
          <div class="step-number">3</div>
          <span>Pembayaran</span>
        </div>
      </div>

      <!-- Step 1: Terms & Conditions -->
      {#if step === 1}
        <div class="step-content">
          <h2>Syarat & Ketentuan</h2>
          <div class="terms-box">
            <h3>Ketentuan Umum</h3>
            <ul>
              <li>Harga final dapat berubah sesuai harga aktual produk saat pembelian</li>
              <li>Anda akan dikonfirmasi terlebih dahulu sebelum pembayaran final</li>
              <li>Pembayaran DP 50% akan dikembalikan jika harga final jauh berbeda</li>
              <li>Estimasi waktu pengiriman bergantung pada jadwal keberangkatan jastiper</li>
            </ul>

            <h3>Kebijakan Pembatalan</h3>
            <ul>
              <li>Pembatalan dapat dilakukan sebelum jastiper membeli produk</li>
              <li>Refund akan diproses dalam 3-7 hari kerja</li>
              <li>Biaya admin 5% akan dikenakan untuk pembatalan</li>
            </ul>

            <h3>Ketentuan Preloved</h3>
            <ul>
              <li>Barang preloved dijual dalam kondisi apa adanya</li>
              <li>Foto dan deskripsi merepresentasikan kondisi aktual</li>
              <li>Tidak ada refund untuk barang preloved kecuali tidak sesuai deskripsi</li>
            </ul>
          </div>

          <label class="checkbox-label">
            <input type="checkbox" bind:checked={agreedToTerms} />
            <span>Saya telah membaca dan menyetujui syarat & ketentuan di atas</span>
          </label>

          <div class="button-group">
            <button class="btn-secondary" on:click={() => goto('/cart')}>
              ← Kembali ke Keranjang
            </button>
            <button class="btn-primary" on:click={nextStep} disabled={!agreedToTerms}>
              Lanjut ke Pengiriman →
            </button>
          </div>
        </div>
      {/if}

      <!-- Step 2: Shipping Data -->
      {#if step === 2}
        <div class="step-content">
          <h2>Data Pengiriman</h2>

          <div class="form-grid">
            <div class="form-group full-width">
              <label for="fullName">Nama Lengkap <span class="required">*</span></label>
              <input
                id="fullName"
                type="text"
                bind:value={shippingData.fullName}
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div class="form-group full-width">
              <label for="phone">Nomor Telepon <span class="required">*</span></label>
              <input
                id="phone"
                type="tel"
                bind:value={shippingData.phone}
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <div class="form-group full-width">
              <label for="address">Alamat Lengkap <span class="required">*</span></label>
              <textarea
                id="address"
                bind:value={shippingData.address}
                placeholder="Jalan, nomor rumah, RT/RW"
                rows="3"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="city">Kota <span class="required">*</span></label>
              <input id="city" type="text" bind:value={shippingData.city} placeholder="Kota" />
            </div>

            <div class="form-group">
              <label for="province">Provinsi <span class="required">*</span></label>
              <input
                id="province"
                type="text"
                bind:value={shippingData.province}
                placeholder="Provinsi"
              />
            </div>

            <div class="form-group">
              <label for="postalCode">Kode Pos <span class="required">*</span></label>
              <input
                id="postalCode"
                type="text"
                bind:value={shippingData.postalCode}
                placeholder="12345"
              />
            </div>

            <div class="form-group full-width">
              <label for="notes">Catatan (Opsional)</label>
              <textarea
                id="notes"
                bind:value={shippingData.notes}
                placeholder="Catatan tambahan untuk pengiriman"
                rows="2"
              ></textarea>
            </div>
          </div>

          <div class="button-group">
            <button class="btn-secondary" on:click={prevStep}>← Kembali</button>
            <button class="btn-primary" on:click={nextStep}>Lanjut ke Pembayaran →</button>
          </div>
        </div>
      {/if}

      <!-- Step 3: Payment -->
      {#if step === 3}
        <div class="step-content">
          <h2>Pembayaran</h2>

          <div class="payment-section">
            <h3>Pilih Metode Pembayaran</h3>
            <div class="payment-options">
              <label class="payment-option">
                <input type="radio" bind:group={paymentData.paymentType} value="full" />
                <div class="option-content">
                  <div class="option-header">
                    <span class="option-title">Bayar Penuh</span>
                    <span class="option-price">{formatPrice(calculateTotal())}</span>
                  </div>
                  <p class="option-desc">Bayar seluruh nilai pesanan sekarang</p>
                </div>
              </label>

              <label class="payment-option">
                <input type="radio" bind:group={paymentData.paymentType} value="dp" />
                <div class="option-content">
                  <div class="option-header">
                    <span class="option-title">DP 50%</span>
                    <span class="option-price">{formatPrice(calculateTotal() * 0.5)}</span>
                  </div>
                  <p class="option-desc">
                    Bayar 50% sekarang, sisanya setelah konfirmasi harga final
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div class="payment-section">
            <h3>Pilih Bank Transfer</h3>
            <div class="bank-options">
              {#each banks as bank}
                <label class="bank-option">
                  <input type="radio" bind:group={paymentData.bank} value={bank.code} />
                  <div class="bank-content">
                    <div class="bank-name">{bank.name}</div>
                    <div class="bank-number">{bank.number}</div>
                    <div class="bank-holder">{bank.holder}</div>
                  </div>
                </label>
              {/each}
            </div>
          </div>

          <div class="info-box">
            <strong>Catatan Pembayaran:</strong>
            <ul>
              <li>Transfer sesuai nominal yang tertera untuk verifikasi otomatis</li>
              <li>Upload bukti transfer di halaman Pesanan Saya</li>
              <li>Pembayaran akan diverifikasi dalam 1x24 jam</li>
              <li>
                Untuk DP 50%, sisa pembayaran akan ditagihkan setelah konfirmasi harga final
              </li>
            </ul>
          </div>

          <div class="button-group">
            <button class="btn-secondary" on:click={prevStep}>← Kembali</button>
            <button class="btn-primary" on:click={submitOrder}>Buat Pesanan</button>
          </div>
        </div>
      {/if}
    </div>

    <!-- Order Summary Sidebar -->
    <div class="order-summary">
      <h3>Ringkasan Pesanan</h3>

      <div class="summary-items">
        {#each cartItems as item (item.id)}
          <div class="summary-item">
            <div class="item-image-small">
              {item.listing.images[0]}
            </div>
            <div class="item-info">
              <div class="item-title">{item.listing.title}</div>
              <div class="item-meta">
                <span>{item.listing.jastiperName}</span>
                <span>×{item.quantity}</span>
              </div>
              <div class="item-price">{formatPrice(calculateItemPrice(item))}</div>
            </div>
          </div>
        {/each}
      </div>

      <hr />

      <div class="summary-row">
        <span>Subtotal ({cartItems.length} item)</span>
        <span class="value">{formatPrice(calculateSubtotal() - calculateTotalFee())}</span>
      </div>

      <div class="summary-row">
        <span>Total Fee Jastip</span>
        <span class="value">{formatPrice(calculateTotalFee())}</span>
      </div>

      <hr />

      <div class="summary-row total">
        <span>Total</span>
        <span class="value">{formatPrice(calculateTotal())}</span>
      </div>

      {#if step === 3}
        <hr />
        <div class="summary-row highlight">
          <span>Yang Harus Dibayar</span>
          <span class="value">{formatPrice(calculatePaymentAmount())}</span>
        </div>
        {#if paymentData.paymentType === 'dp'}
          <div class="summary-note">Sisa {formatPrice(calculateTotal() * 0.5)} dibayar kemudian</div>
        {/if}
      {/if}
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    min-height: calc(100vh - 80px);
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
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

  .checkout-grid {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 2rem;
  }

  .checkout-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .progress-steps {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
  }

  .step-number {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #e2e8f0;
    color: #94a3b8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.25rem;
    transition: all 0.3s;
  }

  .step.active .step-number {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .step.completed .step-number {
    background: #10b981;
    color: white;
  }

  .step span {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 600;
    text-align: center;
  }

  .step.active span {
    color: #086adf;
  }

  .step-line {
    flex: 1;
    height: 3px;
    background: #e2e8f0;
    margin: 0 1rem;
    margin-bottom: 1.5rem;
  }

  .step-line.completed {
    background: linear-gradient(90deg, #10b981, #059669);
  }

  .step-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .step-content h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
  }

  .terms-box {
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    max-height: 400px;
    overflow-y: auto;
  }

  .terms-box h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.75rem;
    margin-top: 1rem;
  }

  .terms-box h3:first-child {
    margin-top: 0;
  }

  .terms-box ul {
    margin-left: 1.5rem;
    color: #475569;
    line-height: 1.8;
  }

  .terms-box li {
    margin-bottom: 0.5rem;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: #fef3c7;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    cursor: pointer;
  }

  .checkbox-label input[type='checkbox'] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .checkbox-label span {
    font-weight: 600;
    color: #92400e;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group.full-width {
    grid-column: 1 / -1;
  }

  .form-group label {
    font-weight: 600;
    color: #1f2937;
    font-size: 0.95rem;
  }

  .required {
    color: #ef4444;
  }

  .form-group input,
  .form-group textarea {
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #086adf;
  }

  .form-group textarea {
    resize: vertical;
    font-family: inherit;
  }

  .payment-section {
    margin-bottom: 2rem;
  }

  .payment-section h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1rem;
  }

  .payment-options,
  .bank-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .payment-option,
  .bank-option {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .payment-option:has(input:checked),
  .bank-option:has(input:checked) {
    border-color: #086adf;
    background: #eff6ff;
  }

  .payment-option input[type='radio'],
  .bank-option input[type='radio'] {
    margin-top: 0.25rem;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .option-content,
  .bank-content {
    flex: 1;
  }

  .option-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .option-title {
    font-weight: 700;
    color: #0f172a;
    font-size: 1.125rem;
  }

  .option-price {
    font-weight: 800;
    color: #0ea5e9;
    font-size: 1.25rem;
  }

  .option-desc {
    color: #64748b;
    font-size: 0.9rem;
    margin: 0;
  }

  .bank-name {
    font-weight: 700;
    color: #0f172a;
    font-size: 1.125rem;
    margin-bottom: 0.25rem;
  }

  .bank-number {
    font-weight: 600;
    color: #086adf;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .bank-holder {
    color: #64748b;
    font-size: 0.875rem;
  }

  .info-box {
    padding: 1.25rem;
    background: #fef3c7;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }

  .info-box strong {
    color: #92400e;
    display: block;
    margin-bottom: 0.75rem;
  }

  .info-box ul {
    margin-left: 1.5rem;
    color: #92400e;
    line-height: 1.8;
  }

  .info-box li {
    margin-bottom: 0.25rem;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
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

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(8, 106, 223, 0.3);
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

  .order-summary {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    height: fit-content;
    position: sticky;
    top: 2rem;
  }

  .order-summary h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
  }

  .summary-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
    max-height: 300px;
    overflow-y: auto;
  }

  .summary-item {
    display: flex;
    gap: 0.75rem;
  }

  .item-image-small {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    flex-shrink: 0;
  }

  .item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .item-title {
    font-weight: 600;
    color: #0f172a;
    font-size: 0.9rem;
    line-height: 1.3;
  }

  .item-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #64748b;
  }

  .item-price {
    font-weight: 700;
    color: #0ea5e9;
    font-size: 0.9rem;
  }

  hr {
    border: none;
    height: 1px;
    background: #e2e8f0;
    margin: 1rem 0;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
  }

  .summary-row span {
    color: #64748b;
  }

  .summary-row .value {
    color: #1f2937;
    font-weight: 700;
  }

  .summary-row.total {
    font-size: 1.25rem;
  }

  .summary-row.total span {
    color: #0f172a;
    font-weight: 800;
  }

  .summary-row.total .value {
    color: #0ea5e9;
  }

  .summary-row.highlight {
    font-size: 1.125rem;
    padding: 1rem;
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border-radius: 8px;
    margin: 0;
  }

  .summary-row.highlight span {
    color: #92400e;
    font-weight: 800;
  }

  .summary-note {
    text-align: center;
    font-size: 0.875rem;
    color: #92400e;
    margin-top: 0.5rem;
  }

  @media (max-width: 1024px) {
    .checkout-grid {
      grid-template-columns: 1fr;
    }

    .order-summary {
      position: static;
      order: -1;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .progress-steps {
      padding: 1rem;
    }

    .step span {
      font-size: 0.75rem;
    }

    .step-number {
      width: 40px;
      height: 40px;
      font-size: 1rem;
    }

    .form-grid {
      grid-template-columns: 1fr;
    }

    .button-group {
      flex-direction: column;
    }
  }
</style>
