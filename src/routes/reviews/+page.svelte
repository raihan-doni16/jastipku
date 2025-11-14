<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { myReviews } from '$lib/data/mockData';
  import Navbar from '$lib/components/Navbar.svelte';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'user') {
      goto('/login?redirect=/reviews&expected=user');
      return;
    }
  });

  let filterRating = 'all';
  let searchQuery = '';

  $: filteredReviews = myReviews.filter((review) => {
    const matchRating = filterRating === 'all' || review.rating === parseInt(filterRating);
    const matchSearch =
      searchQuery === '' ||
      review.jastiperName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.reviewText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRating && matchSearch;
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function getStarDisplay(rating) {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  }
</script>

<Navbar />

<div class="container">
  <div class="header">
    <h1>Ulasan Saya</h1>
    <p>Lihat semua ulasan yang telah Anda berikan</p>
  </div>

  <div class="stats-cards">
    <div class="stat-card">
      <div class="stat-icon">📝</div>
      <div class="stat-content">
        <div class="stat-value">{myReviews.length}</div>
        <div class="stat-label">Total Ulasan</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">⭐</div>
      <div class="stat-content">
        <div class="stat-value">
          {(myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1)}
        </div>
        <div class="stat-label">Rata-rata Rating</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">👍</div>
      <div class="stat-content">
        <div class="stat-value">
          {myReviews.reduce((sum, r) => sum + r.helpful, 0)}
        </div>
        <div class="stat-label">Total Helpful</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">✅</div>
      <div class="stat-content">
        <div class="stat-value">
          {myReviews.filter((r) => r.recommended).length}
        </div>
        <div class="stat-label">Recommended</div>
      </div>
    </div>
  </div>

  <div class="filters">
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Cari berdasarkan jastiper, produk, atau review..."
        bind:value={searchQuery}
      />
    </div>
    <select bind:value={filterRating}>
      <option value="all">Semua Rating</option>
      <option value="5">⭐⭐⭐⭐⭐ (5)</option>
      <option value="4">⭐⭐⭐⭐ (4)</option>
      <option value="3">⭐⭐⭐ (3)</option>
      <option value="2">⭐⭐ (2)</option>
      <option value="1">⭐ (1)</option>
    </select>
  </div>

  <div class="results-info">
    Menampilkan {filteredReviews.length} dari {myReviews.length} ulasan
  </div>

  <div class="reviews-list">
    {#each filteredReviews as review (review.id)}
      <div class="review-card">
        <div class="review-header">
          <div class="jastiper-info">
            <span class="avatar">{review.jastiperAvatar}</span>
            <div class="jastiper-details">
              <div class="jastiper-name">{review.jastiperName}</div>
              <div class="product-name">{review.productName}</div>
              <div class="order-code">Order: {review.orderCode}</div>
            </div>
          </div>
          <div class="review-meta">
            <div class="date">{formatDate(review.createdAt)}</div>
            {#if review.recommended}
              <div class="recommended-badge">✅ Recommended</div>
            {/if}
          </div>
        </div>

        <div class="rating-section">
          <div class="overall-rating">
            <span class="stars">{getStarDisplay(review.rating)}</span>
            <span class="rating-value">{review.rating}.0</span>
          </div>
          <div class="detail-ratings">
            <div class="detail-rating-item">
              <span class="label">Pelayanan</span>
              <span class="value">{getStarDisplay(review.serviceRating)}</span>
            </div>
            <div class="detail-rating-item">
              <span class="label">Kecepatan</span>
              <span class="value">{getStarDisplay(review.speedRating)}</span>
            </div>
            <div class="detail-rating-item">
              <span class="label">Kualitas</span>
              <span class="value">{getStarDisplay(review.qualityRating)}</span>
            </div>
            <div class="detail-rating-item">
              <span class="label">Komunikasi</span>
              <span class="value">{getStarDisplay(review.communicationRating)}</span>
            </div>
          </div>
        </div>

        <div class="review-content">
          <p class="review-text">{review.reviewText}</p>

          {#if review.pros.length > 0 || review.cons.length > 0}
            <div class="pros-cons">
              {#if review.pros.length > 0}
                <div class="pros">
                  <div class="pros-cons-title">👍 Yang Disukai</div>
                  <div class="tags">
                    {#each review.pros as pro}
                      <span class="tag pro-tag">{pro}</span>
                    {/each}
                  </div>
                </div>
              {/if}
              {#if review.cons.length > 0}
                <div class="cons">
                  <div class="pros-cons-title">👎 Yang Kurang</div>
                  <div class="tags">
                    {#each review.cons as con}
                      <span class="tag con-tag">{con}</span>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          {/if}

          {#if review.photos.length > 0}
            <div class="photos">
              {#each review.photos as photo}
                <div class="photo-item">{photo}</div>
              {/each}
            </div>
          {/if}
        </div>

        <div class="review-footer">
          <div class="helpful-count">
            <span class="icon">👍</span>
            <span>{review.helpful} orang merasa ini membantu</span>
          </div>
        </div>

        {#if review.response}
          <div class="jastiper-response">
            <div class="response-header">
              <span class="response-icon">💬</span>
              <span class="response-title">Balasan dari Jastiper</span>
              <span class="response-date">{formatDate(review.response.createdAt)}</span>
            </div>
            <p class="response-text">{review.response.text}</p>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  {#if filteredReviews.length === 0}
    <div class="empty-state">
      <div class="empty-icon">📝</div>
      <h3>Belum ada ulasan</h3>
      <p>Ulasan yang Anda berikan akan muncul di sini</p>
    </div>
  {/if}
</div>

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
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
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

  .filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
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
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .search-box input:focus {
    outline: none;
    border-color: #086adf;
  }

  select {
    padding: 1rem 1.5rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    background: white;
    cursor: pointer;
    transition: border-color 0.2s;
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

  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .review-card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
  }

  .review-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }

  .jastiper-info {
    display: flex;
    gap: 1rem;
  }

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    flex-shrink: 0;
  }

  .jastiper-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .jastiper-name {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
  }

  .product-name {
    font-size: 0.95rem;
    color: #475569;
  }

  .order-code {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .review-meta {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .date {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .recommended-badge {
    padding: 0.375rem 0.75rem;
    background: #d1fae5;
    color: #065f46;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .rating-section {
    margin-bottom: 1.5rem;
  }

  .overall-rating {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .stars {
    font-size: 1.5rem;
  }

  .rating-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
  }

  .detail-ratings {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 12px;
  }

  .detail-rating-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }

  .detail-rating-item .label {
    color: #64748b;
    font-weight: 600;
  }

  .detail-rating-item .value {
    font-size: 1rem;
  }

  .review-content {
    margin-bottom: 1.5rem;
  }

  .review-text {
    color: #1f2937;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .pros-cons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .pros-cons-title {
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    padding: 0.5rem 1rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .pro-tag {
    background: #d1fae5;
    color: #065f46;
  }

  .con-tag {
    background: #fee2e2;
    color: #991b1b;
  }

  .photos {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .photo-item {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    border: 2px solid #e2e8f0;
  }

  .review-footer {
    padding-top: 1rem;
    border-top: 2px solid #e2e8f0;
  }

  .helpful-count {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #64748b;
    font-size: 0.95rem;
  }

  .helpful-count .icon {
    font-size: 1.25rem;
  }

  .jastiper-response {
    margin-top: 1.5rem;
    padding: 1.5rem;
    background: #fef3c7;
    border-radius: 12px;
    border-left: 4px solid #f59e0b;
  }

  .response-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
  }

  .response-icon {
    font-size: 1.25rem;
  }

  .response-title {
    font-weight: 700;
    color: #92400e;
  }

  .response-date {
    color: #92400e;
    margin-left: auto;
  }

  .response-text {
    color: #78350f;
    line-height: 1.6;
    margin: 0;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
      grid-template-columns: repeat(2, 1fr);
    }

    .filters {
      flex-direction: column;
    }

    .review-header {
      flex-direction: column;
      gap: 1rem;
    }

    .review-meta {
      text-align: left;
    }

    .detail-ratings {
      grid-template-columns: 1fr;
    }

    .pros-cons {
      grid-template-columns: 1fr;
    }
  }
</style>
