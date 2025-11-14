<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  import Navbar from '$lib/components/Navbar.svelte';
  import { orders } from '$lib/data/mockData';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'user') {
      goto(`/login?redirect=/review/${$page.params.orderCode}&expected=user`);
    }
  });

  $: orderCode = $page.params.orderCode;
  $: order = orders.find((o) => o.code === orderCode);

  // Review form state
  let reviewForm = {
    rating: 0,
    serviceRating: 0,
    speedRating: 0,
    productQualityRating: 0,
    communicationRating: 0,
    title: '',
    comment: '',
    pros: [''],
    cons: [''],
    wouldRecommend: true,
    uploadedImages: []
  };

  let hoveredRating = 0;
  let hoveredCategory = '';
  let submitting = false;

  function handleRatingClick(category, value) {
    if (category === 'overall') {
      reviewForm.rating = value;
    } else if (category === 'service') {
      reviewForm.serviceRating = value;
    } else if (category === 'speed') {
      reviewForm.speedRating = value;
    } else if (category === 'quality') {
      reviewForm.productQualityRating = value;
    } else if (category === 'communication') {
      reviewForm.communicationRating = value;
    }
  }

  function handleRatingHover(category, value) {
    hoveredRating = value;
    hoveredCategory = category;
  }

  function handleRatingLeave() {
    hoveredRating = 0;
    hoveredCategory = '';
  }

  function getDisplayRating(category, currentRating) {
    if (hoveredCategory === category && hoveredRating > 0) {
      return hoveredRating;
    }
    return currentRating;
  }

  function addPro() {
    reviewForm.pros = [...reviewForm.pros, ''];
  }

  function removePro(index) {
    reviewForm.pros = reviewForm.pros.filter((_, i) => i !== index);
  }

  function addCon() {
    reviewForm.cons = [...reviewForm.cons, ''];
  }

  function removeCon(index) {
    reviewForm.cons = reviewForm.cons.filter((_, i) => i !== index);
  }

  function handleImageUpload() {
    alert('Fitur upload gambar akan segera hadir!');
  }

  function handleSubmit() {
    // Validation
    if (reviewForm.rating === 0) {
      alert('Harap berikan rating keseluruhan!');
      return;
    }

    if (!reviewForm.title || !reviewForm.comment) {
      alert('Harap isi judul dan ulasan!');
      return;
    }

    if (reviewForm.comment.length < 20) {
      alert('Ulasan harus minimal 20 karakter!');
      return;
    }

    submitting = true;

    // Simulate API call
    setTimeout(() => {
      const reviewData = {
        orderCode,
        ...reviewForm,
        pros: reviewForm.pros.filter((p) => p.trim() !== ''),
        cons: reviewForm.cons.filter((c) => c.trim() !== ''),
        submittedAt: new Date().toISOString()
      };

      console.log('Review submitted:', reviewData);
      alert('Terima kasih atas ulasan Anda! ⭐');
      submitting = false;
      goto('/orders');
    }, 1000);
  }
</script>

<Navbar />

<div class="container">
  {#if !order}
    <div class="not-found">
      <h2>Pesanan tidak ditemukan</h2>
      <a href="/orders" class="btn-back">Kembali ke Pesanan</a>
    </div>
  {:else}
    <div class="header">
      <h1>Beri Rating & Ulasan</h1>
      <p>Bagikan pengalaman Anda dengan pesanan ini</p>
    </div>

    <div class="review-grid">
      <!-- Order Summary -->
      <div class="order-summary">
        <h3>Pesanan Anda</h3>
        <div class="order-info">
          <div class="info-row">
            <span class="label">Kode Pesanan</span>
            <span class="value">{order.code}</span>
          </div>
          <div class="info-row">
            <span class="label">Produk</span>
            <span class="value">{order.product}</span>
          </div>
          <div class="info-row">
            <span class="label">Negara</span>
            <span class="value">{order.country}</span>
          </div>
          <div class="info-row">
            <span class="label">Toko</span>
            <span class="value">{order.store}</span>
          </div>
        </div>
      </div>

      <!-- Review Form -->
      <div class="review-form">
        <!-- Overall Rating -->
        <div class="rating-section">
          <h3>Rating Keseluruhan *</h3>
          <p class="section-desc">Berapa rating Anda untuk pesanan ini?</p>
          <div class="stars-large">
            {#each [1, 2, 3, 4, 5] as star}
              <button
                class="star-btn large"
                class:filled={getDisplayRating('overall', reviewForm.rating) >= star}
                on:click={() => handleRatingClick('overall', star)}
                on:mouseenter={() => handleRatingHover('overall', star)}
                on:mouseleave={handleRatingLeave}
              >
                ★
              </button>
            {/each}
          </div>
          {#if reviewForm.rating > 0}
            <p class="rating-text">
              {reviewForm.rating === 5
                ? 'Luar Biasa!'
                : reviewForm.rating === 4
                  ? 'Sangat Baik'
                  : reviewForm.rating === 3
                    ? 'Baik'
                    : reviewForm.rating === 2
                      ? 'Cukup'
                      : 'Kurang Baik'}
            </p>
          {/if}
        </div>

        <!-- Category Ratings -->
        <div class="category-ratings">
          <h3>Rating Detail</h3>
          <div class="rating-item">
            <span class="rating-label">Kualitas Layanan</span>
            <div class="stars">
              {#each [1, 2, 3, 4, 5] as star}
                <button
                  class="star-btn"
                  class:filled={getDisplayRating('service', reviewForm.serviceRating) >= star}
                  on:click={() => handleRatingClick('service', star)}
                  on:mouseenter={() => handleRatingHover('service', star)}
                  on:mouseleave={handleRatingLeave}
                >
                  ★
                </button>
              {/each}
            </div>
          </div>

          <div class="rating-item">
            <span class="rating-label">Kecepatan Proses</span>
            <div class="stars">
              {#each [1, 2, 3, 4, 5] as star}
                <button
                  class="star-btn"
                  class:filled={getDisplayRating('speed', reviewForm.speedRating) >= star}
                  on:click={() => handleRatingClick('speed', star)}
                  on:mouseenter={() => handleRatingHover('speed', star)}
                  on:mouseleave={handleRatingLeave}
                >
                  ★
                </button>
              {/each}
            </div>
          </div>

          <div class="rating-item">
            <span class="rating-label">Kualitas Produk</span>
            <div class="stars">
              {#each [1, 2, 3, 4, 5] as star}
                <button
                  class="star-btn"
                  class:filled={getDisplayRating('quality', reviewForm.productQualityRating) >= star}
                  on:click={() => handleRatingClick('quality', star)}
                  on:mouseenter={() => handleRatingHover('quality', star)}
                  on:mouseleave={handleRatingLeave}
                >
                  ★
                </button>
              {/each}
            </div>
          </div>

          <div class="rating-item">
            <span class="rating-label">Komunikasi</span>
            <div class="stars">
              {#each [1, 2, 3, 4, 5] as star}
                <button
                  class="star-btn"
                  class:filled={getDisplayRating('communication', reviewForm.communicationRating) >= star}
                  on:click={() => handleRatingClick('communication', star)}
                  on:mouseenter={() => handleRatingHover('communication', star)}
                  on:mouseleave={handleRatingLeave}
                >
                  ★
                </button>
              {/each}
            </div>
          </div>
        </div>

        <!-- Review Text -->
        <div class="form-section">
          <label>Judul Ulasan *</label>
          <input
            type="text"
            bind:value={reviewForm.title}
            placeholder="Contoh: Pelayanan cepat dan produk sesuai"
            maxlength="100"
          />
        </div>

        <div class="form-section">
          <label>Tulis Ulasan Anda *</label>
          <textarea
            bind:value={reviewForm.comment}
            placeholder="Ceritakan pengalaman Anda... (minimal 20 karakter)"
            rows="6"
          ></textarea>
          <span class="char-count">{reviewForm.comment.length} karakter</span>
        </div>

        <!-- Pros & Cons -->
        <div class="pros-cons-grid">
          <div class="form-section">
            <label>Kelebihan (Opsional)</label>
            <div class="multi-input">
              {#each reviewForm.pros as pro, index}
                <div class="input-row">
                  <input
                    type="text"
                    bind:value={reviewForm.pros[index]}
                    placeholder="Contoh: Cepat & responsif"
                  />
                  {#if reviewForm.pros.length > 1}
                    <button class="btn-remove" on:click={() => removePro(index)}>×</button>
                  {/if}
                </div>
              {/each}
              <button class="btn-add-small" on:click={addPro}>+ Tambah</button>
            </div>
          </div>

          <div class="form-section">
            <label>Kekurangan (Opsional)</label>
            <div class="multi-input">
              {#each reviewForm.cons as con, index}
                <div class="input-row">
                  <input
                    type="text"
                    bind:value={reviewForm.cons[index]}
                    placeholder="Contoh: Harga sedikit mahal"
                  />
                  {#if reviewForm.cons.length > 1}
                    <button class="btn-remove" on:click={() => removeCon(index)}>×</button>
                  {/if}
                </div>
              {/each}
              <button class="btn-add-small" on:click={addCon}>+ Tambah</button>
            </div>
          </div>
        </div>

        <!-- Photo Upload -->
        <div class="form-section">
          <label>Upload Foto (Opsional)</label>
          <div class="upload-area" on:click={handleImageUpload}>
            <span class="upload-icon">📷</span>
            <p>Klik untuk upload foto produk</p>
            <span class="upload-hint">Max 5 foto, masing-masing 3MB</span>
          </div>
        </div>

        <!-- Recommendation -->
        <div class="recommendation">
          <span>Apakah Anda merekomendasikan jastiper ini?</span>
          <div class="recommendation-buttons">
            <button
              class="rec-btn"
              class:active={reviewForm.wouldRecommend}
              on:click={() => (reviewForm.wouldRecommend = true)}
            >
              👍 Ya
            </button>
            <button
              class="rec-btn"
              class:active={!reviewForm.wouldRecommend}
              on:click={() => (reviewForm.wouldRecommend = false)}
            >
              👎 Tidak
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          class="btn-submit"
          disabled={submitting || reviewForm.rating === 0}
          on:click={handleSubmit}
        >
          {submitting ? 'Mengirim...' : 'Kirim Ulasan'}
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .not-found {
    text-align: center;
    padding: 4rem 2rem;
  }

  .not-found h2 {
    font-size: 2rem;
    color: #1f2937;
    margin-bottom: 2rem;
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

  .review-grid {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
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
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
  }

  .order-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .info-row {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .info-row .label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 600;
  }

  .info-row .value {
    font-size: 0.95rem;
    color: #1f2937;
    font-weight: 600;
  }

  .review-form {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .rating-section {
    text-align: center;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 12px;
    margin-bottom: 2rem;
  }

  .rating-section h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }

  .section-desc {
    color: #64748b;
    margin-bottom: 1.5rem;
  }

  .stars-large {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .star-btn {
    background: none;
    border: none;
    font-size: 2rem;
    color: #cbd5e1;
    cursor: pointer;
    transition: all 0.2s;
  }

  .star-btn.large {
    font-size: 3.5rem;
  }

  .star-btn.filled {
    color: #fbbf24;
  }

  .star-btn:hover {
    transform: scale(1.1);
  }

  .rating-text {
    font-size: 1.25rem;
    font-weight: 700;
    color: #086adf;
  }

  .category-ratings {
    margin-bottom: 2rem;
  }

  .category-ratings h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
  }

  .rating-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .rating-label {
    font-weight: 600;
    color: #1f2937;
  }

  .stars {
    display: flex;
    gap: 0.5rem;
  }

  .form-section {
    margin-bottom: 1.5rem;
  }

  .form-section label {
    display: block;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .form-section input,
  .form-section textarea {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s;
  }

  .form-section input:focus,
  .form-section textarea:focus {
    outline: none;
    border-color: #086adf;
  }

  .char-count {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #94a3b8;
    text-align: right;
  }

  .pros-cons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .multi-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .input-row input {
    flex: 1;
  }

  .btn-remove {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    background: #fee2e2;
    border: none;
    border-radius: 6px;
    color: #ef4444;
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;
    line-height: 1;
  }

  .btn-add-small {
    padding: 0.5rem 1rem;
    background: #eff6ff;
    border: 1px dashed #086adf;
    border-radius: 6px;
    color: #086adf;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .upload-area {
    padding: 3rem 2rem;
    border: 2px dashed #cbd5e1;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
  }

  .upload-area:hover {
    border-color: #086adf;
    background: #f8fafc;
  }

  .upload-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
  }

  .upload-area p {
    color: #475569;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .upload-hint {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .recommendation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
    margin-bottom: 2rem;
  }

  .recommendation span {
    font-weight: 600;
    color: #1f2937;
  }

  .recommendation-buttons {
    display: flex;
    gap: 1rem;
  }

  .rec-btn {
    padding: 0.75rem 1.5rem;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .rec-btn:hover {
    border-color: #086adf;
  }

  .rec-btn.active {
    border-color: #086adf;
    background: #eff6ff;
    color: #086adf;
  }

  .btn-submit {
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

  .btn-submit:hover:not(:disabled) {
    transform: scale(1.02);
  }

  .btn-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    .review-grid {
      grid-template-columns: 1fr;
    }

    .order-summary {
      position: static;
    }

    .pros-cons-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .star-btn.large {
      font-size: 2.5rem;
    }
  }
</style>
