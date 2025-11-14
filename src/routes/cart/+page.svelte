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
      goto('/login?redirect=/cart&expected=user');
    }
  });

  $: cart = $cartStore;
  $: cartItems = cart.items;

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
      // Untuk jastip/event, gunakan minOrder sebagai estimasi
      const estimatedPrice = listing.minOrder || 0;
      const fee = (estimatedPrice * (listing.fee || 0)) / 100;
      return (estimatedPrice + fee) * item.quantity;
    }
  }

  function calculateSubtotal() {
    return cartItems.reduce((total, item) => {
      return total + calculateItemPrice(item);
    }, 0);
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

  function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) return;
    cartStore.updateQuantity(itemId, newQuantity);
  }

  function removeItem(itemId) {
    if (confirm('Hapus item dari keranjang?')) {
      cartStore.removeItem(itemId);
    }
  }

  function handleCheckout() {
    if (cartItems.length === 0) {
      alert('Keranjang Anda kosong!');
      return;
    }
    goto('/checkout');
  }

  function handleContinueShopping() {
    goto('/browse');
  }
</script>

<Navbar />

<div class="container">
  <div class="header">
    <h1>Keranjang Belanja</h1>
    <p>Review pesanan Anda sebelum checkout</p>
  </div>

  {#if cartItems.length === 0}
    <div class="empty-cart">
      <span class="empty-icon">🛒</span>
      <h2>Keranjang Anda Kosong</h2>
      <p>Mulai berbelanja dan tambahkan produk ke keranjang Anda</p>
      <button class="btn-browse" on:click={handleContinueShopping}>
        Mulai Belanja
      </button>
    </div>
  {:else}
    <div class="cart-grid">
      <!-- Cart Items -->
      <div class="cart-items">
        <div class="items-header">
          <h2>Item dalam Keranjang ({cartItems.length})</h2>
        </div>

        {#each cartItems as item (item.id)}
          <div class="cart-item">
            <div class="item-image">
              <div class="image-placeholder">
                {item.listing.images[0]}
              </div>
              <span
                class="type-badge"
                style="background: {item.listing.type === 'jastip'
                  ? '#0ea5e9'
                  : item.listing.type === 'preloved'
                    ? '#f97316'
                    : '#a855f7'}"
              >
                {item.listing.type === 'jastip'
                  ? 'Jastip'
                  : item.listing.type === 'preloved'
                    ? 'Preloved'
                    : 'Event'}
              </span>
            </div>

            <div class="item-details">
              <h3>
                <a href="/browse/{item.listing.id}">{item.listing.title}</a>
              </h3>
              <p class="item-jastiper">
                oleh {item.listing.jastiperName} • {item.listing.country}
              </p>

              {#if item.listing.type === 'preloved'}
                <div class="item-price">
                  {formatPrice(item.listing.price)} / item
                </div>
              {:else}
                <div class="item-info">
                  <span>Min Order: {formatPrice(item.listing.minOrder)}</span>
                  <span>Fee: {item.listing.fee}%</span>
                </div>
              {/if}
            </div>

            <div class="item-actions">
              <div class="quantity-control">
                <button
                  class="qty-btn"
                  on:click={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  on:change={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                  max="99"
                />
                <button
                  class="qty-btn"
                  on:click={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div class="item-total">
                {formatPrice(calculateItemPrice(item))}
              </div>

              <button class="btn-remove" on:click={() => removeItem(item.id)}>
                🗑️ Hapus
              </button>
            </div>
          </div>
        {/each}

        <button class="btn-continue" on:click={handleContinueShopping}>
          ← Lanjut Belanja
        </button>
      </div>

      <!-- Order Summary -->
      <div class="order-summary">
        <h3>Ringkasan Pesanan</h3>

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
          <span class="value">{formatPrice(calculateSubtotal())}</span>
        </div>

        <div class="info-box">
          <p>
            <strong>Catatan:</strong> Harga final dapat berubah sesuai harga aktual produk
            saat pembelian. Anda akan dikonfirmasi sebelum pembayaran.
          </p>
        </div>

        <button class="btn-checkout" on:click={handleCheckout}>
          Lanjut ke Checkout
        </button>

        <div class="benefits">
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>100% Aman & Terpercaya</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Garansi Uang Kembali</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">✓</span>
            <span>Tracking Real-time</span>
          </div>
        </div>
      </div>
    </div>
  {/if}
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

  .empty-cart {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .empty-icon {
    font-size: 5rem;
    display: block;
    margin-bottom: 1.5rem;
  }

  .empty-cart h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.75rem;
  }

  .empty-cart p {
    color: #64748b;
    margin-bottom: 2rem;
  }

  .btn-browse {
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

  .btn-browse:hover {
    transform: scale(1.05);
  }

  .cart-grid {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 2rem;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .items-header {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .items-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
  }

  .cart-item {
    display: grid;
    grid-template-columns: 120px 1fr auto;
    gap: 1.5rem;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .item-image {
    position: relative;
  }

  .image-placeholder {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
  }

  .type-badge {
    position: absolute;
    bottom: 8px;
    right: 8px;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .item-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .item-details h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
  }

  .item-details h3 a {
    color: inherit;
    text-decoration: none;
  }

  .item-details h3 a:hover {
    color: #086adf;
  }

  .item-jastiper {
    color: #64748b;
    font-size: 0.9rem;
  }

  .item-price {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0ea5e9;
  }

  .item-info {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: #475569;
  }

  .item-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
  }

  .quantity-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .qty-btn {
    width: 32px;
    height: 32px;
    border: 2px solid #e2e8f0;
    background: white;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 700;
    color: #086adf;
    cursor: pointer;
    transition: all 0.2s;
  }

  .qty-btn:hover {
    border-color: #086adf;
    background: #eff6ff;
  }

  .quantity-control input {
    width: 50px;
    height: 32px;
    text-align: center;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .item-total {
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
  }

  .btn-remove {
    padding: 0.5rem 1rem;
    background: #fee2e2;
    border: none;
    border-radius: 6px;
    color: #ef4444;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-remove:hover {
    background: #fecaca;
  }

  .btn-continue {
    padding: 0.875rem 1.5rem;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    color: #475569;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-continue:hover {
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

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }

  .summary-row span {
    color: #64748b;
  }

  .summary-row .value {
    color: #1f2937;
    font-weight: 700;
  }

  hr {
    border: none;
    height: 1px;
    background: #e2e8f0;
    margin: 1.5rem 0;
  }

  .summary-row.total {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .summary-row.total span {
    color: #0f172a;
    font-weight: 800;
  }

  .summary-row.total .value {
    color: #0ea5e9;
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

  .btn-checkout {
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
    margin-bottom: 1.5rem;
  }

  .btn-checkout:hover {
    transform: scale(1.02);
  }

  .benefits {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .benefit-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: #475569;
  }

  .benefit-icon {
    width: 24px;
    height: 24px;
    background: #dcfce7;
    color: #15803d;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
  }

  @media (max-width: 1024px) {
    .cart-grid {
      grid-template-columns: 1fr;
    }

    .order-summary {
      position: static;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .cart-item {
      grid-template-columns: 1fr;
    }

    .item-actions {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
