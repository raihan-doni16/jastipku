<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  import Navbar from '$lib/components/Navbar.svelte';
  import { listings } from '$lib/data/mockData';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole === 'guest') {
      goto(`/login?redirect=/checkout/${$page.params.id}&expected=user`);
    }
  });

  $: listingId = $page.params.id;
  $: listing = listings.find((l) => l.id === listingId);

  let step = 1; // 1: Terms, 2: Order Form, 3: Payment
  let agreedToTerms = false;

  // Order form data
  let orderForm = {
    productName: '',
    productUrl: '',
    quantity: 1,
    estimatedPrice: 0,
    notes: '',
    shippingAddress: '',
    phoneNumber: ''
  };

  let paymentMethod = 'full'; // 'full' or 'dp'
  let selectedBank = '';

  $: isPrelovedOrder = listing?.type === 'preloved';
  $: fee = isPrelovedOrder ? 0 : ((orderForm.estimatedPrice * (listing?.fee ?? 0)) / 100);
  $: totalBeforeFee = isPrelovedOrder
    ? (listing?.price ?? 0) * orderForm.quantity
    : orderForm.estimatedPrice * orderForm.quantity;
  $: totalPrice = totalBeforeFee + fee;
  $: dpAmount = totalPrice * 0.5;

  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }

  function handleAgreeTerms() {
    if (!agreedToTerms) {
      alert('Harap setujui syarat dan ketentuan terlebih dahulu');
      return;
    }
    step = 2;
  }

  function handleSubmitOrder() {
    if (!orderForm.productName || !orderForm.shippingAddress || !orderForm.phoneNumber) {
      alert('Harap lengkapi semua data yang diperlukan');
      return;
    }

    if (!isPrelovedOrder && orderForm.estimatedPrice === 0) {
      alert('Harap masukkan estimasi harga produk');
      return;
    }

    step = 3;
  }

  function handlePayment() {
    if (!selectedBank) {
      alert('Harap pilih metode pembayaran');
      return;
    }

    alert(
      `Pembayaran berhasil dibuat!\nMetode: ${paymentMethod === 'full' ? 'Full Payment' : 'DP 50%'}\nTotal: ${formatPrice(paymentMethod === 'full' ? totalPrice : dpAmount)}\n\nSilahkan transfer ke rekening yang tertera.`
    );
    goto('/orders');
  }
</script>

<Navbar />

<div class="container">
  {#if !listing}
    <div class="not-found">
      <h2>Postingan tidak ditemukan</h2>
      <a href="/browse" class="btn-back">Kembali ke Browse</a>
    </div>
  {:else}
    <div class="checkout-header">
      <h1>Checkout</h1>
      <div class="steps">
        <div class="step-item" class:active={step >= 1} class:completed={step > 1}>
          <div class="step-number">1</div>
          <span>Syarat & Ketentuan</span>
        </div>
        <div class="step-divider"></div>
        <div class="step-item" class:active={step >= 2} class:completed={step > 2}>
          <div class="step-number">2</div>
          <span>Detail Pesanan</span>
        </div>
        <div class="step-divider"></div>
        <div class="step-item" class:active={step >= 3}>
          <div class="step-number">3</div>
          <span>Pembayaran</span>
        </div>
      </div>
    </div>

    {#if step === 1}
      <!-- Step 1: Terms & Conditions -->
      <div class="step-content">
        <div class="listing-summary">
          <div class="summary-image">{listing.images[0]}</div>
          <div class="summary-info">
            <h3>{listing.title}</h3>
            <p class="jastiper-name">oleh {listing.jastiperName}</p>
            <p class="country">{listing.country}</p>
          </div>
        </div>

        <div class="terms-box">
          <h2>Syarat & Ketentuan</h2>
          <p class="terms-intro">
            Harap baca dan setujui syarat dan ketentuan berikut sebelum melanjutkan pemesanan:
          </p>

          <div class="terms-list">
            <div class="term-item">
              <div class="term-icon">⚠️</div>
              <div class="term-content">
                <h4>Risiko Out of Stock</h4>
                <ul>
                  <li>
                    Barang yang dipesan mungkin tidak tersedia (out of stock) di lokasi pembelian
                  </li>
                  <li>Jika barang tidak tersedia, pembeli akan mendapat refund penuh</li>
                  <li>Jastiper akan berusaha mencari alternatif produk serupa dengan persetujuan pembeli</li>
                </ul>
              </div>
            </div>

            <div class="term-item">
              <div class="term-icon">💰</div>
              <div class="term-content">
                <h4>Kebijakan Pembayaran</h4>
                <ul>
                  <li>Tersedia 2 opsi: DP 50% atau pembayaran penuh</li>
                  <li>DP dibayar saat checkout, sisanya setelah barang dibeli</li>
                  <li>Pembayaran penuh memberikan prioritas dalam antrian pembelian</li>
                  <li>Bukti pembelian akan dikirimkan setelah barang dibeli</li>
                </ul>
              </div>
            </div>

            <div class="term-item">
              <div class="term-icon">✈️</div>
              <div class="term-content">
                <h4>Estimasi Waktu</h4>
                <ul>
                  <li>Jastiper berangkat: {new Date(listing.departureDate).toLocaleDateString('id-ID')}</li>
                  <li>Jastiper kembali: {new Date(listing.returnDate).toLocaleDateString('id-ID')}</li>
                  <li>Estimasi pengiriman ke pembeli: {new Date(listing.estimateDelivery).toLocaleDateString('id-ID')}</li>
                  <li>Estimasi dapat berubah karena kondisi penerbangan atau bea cukai</li>
                </ul>
              </div>
            </div>

            <div class="term-item">
              <div class="term-icon">📦</div>
              <div class="term-content">
                <h4>Pengiriman</h4>
                <ul>
                  <li>Pengiriman dimulai setelah jastiper kembali ke Indonesia</li>
                  <li>Barang akan melalui proses bea cukai terlebih dahulu</li>
                  <li>Pembeli akan mendapat nomor resi kurir domestik</li>
                  <li>Biaya pengiriman domestik sudah termasuk dalam fee jastip</li>
                </ul>
              </div>
            </div>

            <div class="term-item">
              <div class="term-icon">🔄</div>
              <div class="term-content">
                <h4>Kebijakan Refund & Penggantian</h4>
                <ul>
                  <li>Refund penuh jika barang tidak tersedia atau cacat/rusak</li>
                  <li>Pembeli dapat cancel dengan refund penuh sebelum jastiper berangkat</li>
                  <li>Setelah berangkat, pembeli menanggung biaya 20% jika cancel sepihak</li>
                  <li>Komplain harus diajukan maksimal 2x24 jam setelah barang diterima</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="agreement">
            <label class="checkbox-label">
              <input type="checkbox" bind:checked={agreedToTerms} />
              <span>
                Saya telah membaca dan menyetujui semua syarat dan ketentuan di atas. Saya
                memahami risiko yang ada dan bersedia melanjutkan pemesanan.
              </span>
            </label>
          </div>

          <button class="btn-primary" on:click={handleAgreeTerms} disabled={!agreedToTerms}>
            Lanjutkan ke Pemesanan
          </button>
        </div>
      </div>
    {:else if step === 2}
      <!-- Step 2: Order Form -->
      <div class="step-content">
        <div class="order-grid">
          <div class="order-form">
            <h2>Detail Pesanan</h2>

            {#if isPrelovedOrder}
              <div class="form-group">
                <label>Produk</label>
                <input type="text" value={listing.title} disabled />
              </div>

              <div class="form-group">
                <label>Harga Satuan</label>
                <input type="text" value={formatPrice(listing.price)} disabled />
              </div>
            {:else}
              <div class="form-group">
                <label>Nama Produk yang Dipesan *</label>
                <input
                  type="text"
                  bind:value={orderForm.productName}
                  placeholder="Contoh: Laneige Cream Skin Refiner"
                />
              </div>

              <div class="form-group">
                <label>URL Produk (Optional)</label>
                <input
                  type="url"
                  bind:value={orderForm.productUrl}
                  placeholder="https://..."
                />
              </div>

              <div class="form-group">
                <label>Estimasi Harga Produk (per item) *</label>
                <input
                  type="number"
                  bind:value={orderForm.estimatedPrice}
                  placeholder="0"
                  min="0"
                />
                <span class="hint">Masukkan estimasi harga dalam Rupiah</span>
              </div>
            {/if}

            <div class="form-group">
              <label>Jumlah *</label>
              <input type="number" bind:value={orderForm.quantity} min="1" max="10" />
            </div>

            <div class="form-group">
              <label>Catatan Tambahan</label>
              <textarea
                bind:value={orderForm.notes}
                placeholder="Contoh: Warna putih, ukuran M, etc."
                rows="3"
              ></textarea>
            </div>

            <hr />

            <h3>Informasi Pengiriman</h3>

            <div class="form-group">
              <label>Alamat Lengkap *</label>
              <textarea
                bind:value={orderForm.shippingAddress}
                placeholder="Jl. Contoh No. 123, Kelurahan, Kecamatan, Kota, Provinsi, Kode Pos"
                rows="4"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Nomor Telepon/WhatsApp *</label>
              <input
                type="tel"
                bind:value={orderForm.phoneNumber}
                placeholder="+62812345678"
              />
            </div>

            <button class="btn-primary" on:click={handleSubmitOrder}>
              Lanjut ke Pembayaran
            </button>
          </div>

          <div class="order-summary">
            <h3>Ringkasan Pesanan</h3>

            <div class="summary-row">
              <span>Listing</span>
              <span class="value">{listing.title}</span>
            </div>

            {#if !isPrelovedOrder && orderForm.productName}
              <div class="summary-row">
                <span>Produk</span>
                <span class="value">{orderForm.productName}</span>
              </div>
            {/if}

            <div class="summary-row">
              <span>Jumlah</span>
              <span class="value">{orderForm.quantity}x</span>
            </div>

            <hr />

            <div class="summary-row">
              <span>Subtotal</span>
              <span class="value">{formatPrice(totalBeforeFee)}</span>
            </div>

            {#if !isPrelovedOrder}
              <div class="summary-row">
                <span>Fee Jastip ({listing.fee}%)</span>
                <span class="value">{formatPrice(fee)}</span>
              </div>
            {/if}

            <hr />

            <div class="summary-row total">
              <span>Total</span>
              <span class="value">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    {:else if step === 3}
      <!-- Step 3: Payment -->
      <div class="step-content">
        <div class="payment-grid">
          <div class="payment-options">
            <h2>Pilih Metode Pembayaran</h2>

            <div class="payment-method-selection">
              <label class="payment-method-card">
                <input type="radio" bind:group={paymentMethod} value="full" />
                <div class="method-content">
                  <h4>Bayar Penuh</h4>
                  <p class="amount">{formatPrice(totalPrice)}</p>
                  <p class="description">
                    Bayar penuh sekarang dan dapatkan prioritas dalam antrian pembelian
                  </p>
                  <span class="badge recommended">Direkomendasikan</span>
                </div>
              </label>

              <label class="payment-method-card">
                <input type="radio" bind:group={paymentMethod} value="dp" />
                <div class="method-content">
                  <h4>DP 50%</h4>
                  <p class="amount">{formatPrice(dpAmount)}</p>
                  <p class="description">
                    Bayar DP 50% sekarang, sisanya setelah barang dibeli oleh jastiper
                  </p>
                </div>
              </label>
            </div>

            <hr />

            <h3>Pilih Bank Transfer</h3>
            <div class="bank-selection">
              <label class="bank-card">
                <input type="radio" bind:group={selectedBank} value="bca" />
                <div class="bank-info">
                  <span class="bank-name">BCA</span>
                  <span class="bank-account">1234567890</span>
                  <span class="bank-holder">a.n. Jastipku Official</span>
                </div>
              </label>

              <label class="bank-card">
                <input type="radio" bind:group={selectedBank} value="mandiri" />
                <div class="bank-info">
                  <span class="bank-name">Mandiri</span>
                  <span class="bank-account">9876543210</span>
                  <span class="bank-holder">a.n. Jastipku Official</span>
                </div>
              </label>

              <label class="bank-card">
                <input type="radio" bind:group={selectedBank} value="bni" />
                <div class="bank-info">
                  <span class="bank-name">BNI</span>
                  <span class="bank-account">1122334455</span>
                  <span class="bank-holder">a.n. Jastipku Official</span>
                </div>
              </label>
            </div>

            <button class="btn-primary btn-pay" on:click={handlePayment}>
              Bayar {formatPrice(paymentMethod === 'full' ? totalPrice : dpAmount)}
            </button>
          </div>

          <div class="payment-summary">
            <h3>Detail Pembayaran</h3>

            <div class="summary-item">
              <span>Produk</span>
              <span>{isPrelovedOrder ? listing.title : orderForm.productName}</span>
            </div>

            <div class="summary-item">
              <span>Jumlah</span>
              <span>{orderForm.quantity}x</span>
            </div>

            <div class="summary-item">
              <span>Subtotal</span>
              <span>{formatPrice(totalBeforeFee)}</span>
            </div>

            {#if !isPrelovedOrder}
              <div class="summary-item">
                <span>Fee Jastip</span>
                <span>{formatPrice(fee)}</span>
              </div>
            {/if}

            <hr />

            <div class="summary-item total">
              <span>Total Keseluruhan</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            {#if paymentMethod === 'dp'}
              <div class="summary-item highlight">
                <span>Dibayar Sekarang (DP 50%)</span>
                <span>{formatPrice(dpAmount)}</span>
              </div>
              <div class="summary-item">
                <span>Sisa Pembayaran</span>
                <span>{formatPrice(totalPrice - dpAmount)}</span>
              </div>
            {:else}
              <div class="summary-item highlight">
                <span>Dibayar Sekarang</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            {/if}

            <div class="payment-note">
              <p>
                <strong>Catatan:</strong> Setelah melakukan pembayaran, harap upload bukti transfer
                melalui halaman pesanan Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
  }

  .not-found {
    text-align: center;
    padding: 4rem 2rem;
  }

  .btn-back {
    display: inline-block;
    padding: 0.875rem 1.75rem;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
  }

  .checkout-header {
    margin-bottom: 3rem;
  }

  .checkout-header h1 {
    font-size: 2.5rem;
    font-weight: 800;
    text-align: center;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 2rem;
  }

  .steps {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.4;
    transition: opacity 0.3s;
  }

  .step-item.active {
    opacity: 1;
  }

  .step-item.completed {
    opacity: 0.7;
  }

  .step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e2e8f0;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    transition: all 0.3s;
  }

  .step-item.active .step-number {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .step-item.completed .step-number {
    background: #22c55e;
    color: white;
  }

  .step-item span {
    font-size: 0.875rem;
    font-weight: 600;
    text-align: center;
  }

  .step-divider {
    width: 60px;
    height: 2px;
    background: #e2e8f0;
  }

  .step-content {
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }

  .listing-summary {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
    margin-bottom: 2rem;
  }

  .summary-image {
    font-size: 4rem;
    flex-shrink: 0;
  }

  .summary-info h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }

  .jastiper-name {
    color: #64748b;
    margin-bottom: 0.25rem;
  }

  .country {
    color: #086adf;
    font-weight: 600;
  }

  .terms-box h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1rem;
  }

  .terms-intro {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .terms-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .term-item {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
  }

  .term-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .term-content h4 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.75rem;
  }

  .term-content ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .term-content li {
    color: #475569;
    line-height: 1.7;
    padding-left: 1.5rem;
    position: relative;
    margin-bottom: 0.5rem;
  }

  .term-content li::before {
    content: '•';
    position: absolute;
    left: 0.5rem;
    color: #086adf;
    font-weight: 700;
  }

  .agreement {
    padding: 1.5rem;
    background: #eff6ff;
    border: 2px solid #bfdbfe;
    border-radius: 12px;
    margin-bottom: 2rem;
  }

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    cursor: pointer;
  }

  .checkbox-label input[type='checkbox'] {
    margin-top: 0.25rem;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .checkbox-label span {
    color: #1e40af;
    line-height: 1.6;
    font-weight: 500;
  }

  .btn-primary {
    width: 100%;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.125rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .btn-primary:hover:not(:disabled) {
    transform: scale(1.02);
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .order-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 2rem;
  }

  .order-form h2,
  .order-summary h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
  }

  .order-form h3 {
    font-size: 1.25rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
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
  .form-group textarea {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #086adf;
  }

  .form-group input:disabled {
    background: #f1f5f9;
    color: #64748b;
  }

  .hint {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #64748b;
  }

  hr {
    border: none;
    height: 1px;
    background: #e2e8f0;
    margin: 2rem 0;
  }

  .order-summary {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 12px;
    height: fit-content;
    position: sticky;
    top: 2rem;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }

  .summary-row span {
    color: #64748b;
  }

  .summary-row .value {
    color: #1f2937;
    font-weight: 600;
    text-align: right;
  }

  .summary-row.total {
    font-size: 1.25rem;
    font-weight: 700;
  }

  .summary-row.total span {
    color: #0f172a;
  }

  .summary-row.total .value {
    color: #0ea5e9;
  }

  .payment-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 2rem;
  }

  .payment-options h2,
  .payment-options h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
  }

  .payment-options h3 {
    font-size: 1.25rem;
  }

  .payment-method-selection {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .payment-method-card {
    position: relative;
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .payment-method-card:has(input:checked) {
    border-color: #086adf;
    background: #eff6ff;
  }

  .payment-method-card input[type='radio'] {
    margin-top: 0.25rem;
    cursor: pointer;
  }

  .method-content {
    flex: 1;
  }

  .method-content h4 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }

  .method-content .amount {
    font-size: 1.5rem;
    font-weight: 800;
    color: #0ea5e9;
    margin-bottom: 0.5rem;
  }

  .method-content .description {
    color: #64748b;
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .badge {
    display: inline-block;
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 0.5rem;
  }

  .badge.recommended {
    background: #fef3c7;
    color: #92400e;
  }

  .bank-selection {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .bank-card {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .bank-card:has(input:checked) {
    border-color: #086adf;
    background: #eff6ff;
  }

  .bank-card input[type='radio'] {
    cursor: pointer;
  }

  .bank-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .bank-name {
    font-weight: 700;
    color: #0f172a;
    font-size: 1.125rem;
  }

  .bank-account {
    font-weight: 600;
    color: #475569;
  }

  .bank-holder {
    font-size: 0.875rem;
    color: #64748b;
  }

  .btn-pay {
    font-size: 1.25rem;
    padding: 1.25rem 2rem;
  }

  .payment-summary {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 12px;
    height: fit-content;
    position: sticky;
    top: 2rem;
  }

  .payment-summary h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }

  .summary-item span:first-child {
    color: #64748b;
  }

  .summary-item span:last-child {
    color: #1f2937;
    font-weight: 600;
  }

  .summary-item.total {
    font-size: 1.125rem;
    font-weight: 700;
    padding-top: 1rem;
  }

  .summary-item.total span {
    color: #0f172a;
  }

  .summary-item.highlight {
    padding: 1rem;
    background: #eff6ff;
    border-radius: 8px;
    font-weight: 700;
  }

  .summary-item.highlight span {
    color: #1e40af;
  }

  .payment-note {
    margin-top: 1.5rem;
    padding: 1rem;
    background: #fef3c7;
    border-radius: 8px;
  }

  .payment-note p {
    font-size: 0.875rem;
    color: #92400e;
    line-height: 1.6;
  }

  @media (max-width: 1024px) {
    .order-grid,
    .payment-grid {
      grid-template-columns: 1fr;
    }

    .order-summary,
    .payment-summary {
      position: static;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .checkout-header h1 {
      font-size: 2rem;
    }

    .steps {
      flex-direction: column;
    }

    .step-divider {
      width: 2px;
      height: 30px;
    }
  }
</style>
