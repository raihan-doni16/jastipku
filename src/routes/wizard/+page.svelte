<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import Navbar from '$lib/components/Navbar.svelte';
  import Stepper from '$lib/components/Stepper.svelte';
  import { popularCountries } from '$lib/data/mockData';
  import { authStore } from '$lib/stores/auth';

  const steps = [
    { title: 'Negara', caption: 'Pilih destinasi belanja' },
    { title: 'Toko', caption: 'Tentukan toko tujuan' },
    { title: 'Produk', caption: 'Detail produk kamu' },
    { title: 'Harga', caption: 'Estimasi biaya' },
    { title: 'Review', caption: 'Cek ulang & kirim' }
  ];

  let currentStep = 0;
  let showSuccess = false;

  let form = {
    country: '',
    store: '',
    storeUrl: '',
    productName: '',
    productUrl: '',
    variation: '',
    note: '',
    minPrice: '',
    maxPrice: '',
    quantity: 1,
    budget: '',
    convertedMin: 0,
    convertedMax: 0,
    convertedMinTotal: 0,
    convertedMaxTotal: 0,
    currency: 'JPY'
  };

  let errors = {};

  const countryOptions = popularCountries.map((country) => ({
    value: country.code,
    label: `${country.flag} ${country.name}`
  }));

  const storeSuggestions = {
    JP: ['Uniqlo Ginza', 'Don Quijote Shibuya', 'Pokemon Center Tokyo DX'],
    US: ['Apple Store Fifth Avenue', 'Best Buy Manhattan', 'Target Brooklyn'],
    KR: ['Olive Young Myeongdong', 'Line Friends Store', 'Lotte Duty Free'],
    SG: ['ION Orchard', 'Takashimaya', 'Mustafa Centre'],
    FR: ['Galeries Lafayette', 'Louis Vuitton Champs-Élysées', 'Le Bon Marché'],
    CA: ['Hudson Bay Toronto', 'Lululemon Robson', 'Apple Store Vancouver']
  };

  const exchangeRates = {
    JPY: 120,
    USD: 16000,
    KRW: 12,
    SGD: 11800,
    EUR: 17500,
    CAD: 12000
  };

  onMount(() => {
    const { role } = get(authStore);
    if (role !== 'user') {
      goto(`/login?redirect=/wizard&expected=user`);
    }
  });

  function nextStep() {
    const isValid = validateStep(currentStep);
    if (!isValid) return;
    if (currentStep < steps.length - 1) {
      currentStep += 1;
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep -= 1;
    }
  }

  function validateStep(stepIndex) {
    errors = {};
    switch (stepIndex) {
      case 0:
        if (!form.country) errors.country = 'Negara wajib dipilih.';
        break;
      case 1:
        if (!form.store) errors.store = 'Toko wajib dipilih.';
        break;
      case 2:
        if (!form.productName) errors.productName = 'Nama produk wajib diisi.';
        if (!isValidUrl(form.productUrl)) errors.productUrl = 'URL produk tidak valid.';
        break;
      case 3:
        if (!form.minPrice) errors.minPrice = 'Harga minimum wajib diisi.';
        if (!form.maxPrice) errors.maxPrice = 'Harga maksimum wajib diisi.';
        if (!form.quantity) errors.quantity = 'Jumlah barang tidak boleh kosong.';
        if (!form.budget) errors.budget = 'Batas budget wajib diisi.';
        break;
      default:
        break;
    }
    return Object.keys(errors).length === 0;
  }

  function isValidUrl(value) {
    try {
      const url = new URL(value);
      return ['http:', 'https:'].includes(url.protocol);
    } catch (error) {
      return false;
    }
  }

  function autoConvert() {
    const rate = exchangeRates[form.currency] ?? 1;
    const min = Number(form.minPrice || 0);
    const max = Number(form.maxPrice || 0);
    const quantity = Number(form.quantity || 1);

    form.convertedMin = Math.round(min * rate);
    form.convertedMax = Math.round(max * rate);
    form.convertedMinTotal = Math.round(form.convertedMin * quantity);
    form.convertedMaxTotal = Math.round(form.convertedMax * quantity);
  }

  function submitRequest() {
    const isValid = validateStep(currentStep);
    if (!isValid) return;
    showSuccess = true;
  }
</script>

<Navbar />

<section class="wizard">
  <header>
    <h1>Buat Permintaan Titip</h1>
    <p>Isi semua langkah berikut untuk mengirimkan permintaan ke Admin Jastipku.</p>
  </header>

  <Stepper {steps} activeIndex={currentStep} />

  <div class="step-content">
    {#if currentStep === 0}
      <div class="card">
        <label for="country">Pilih Negara</label>
        <input
          id="country"
          list="country-options"
          placeholder="Cari negara tujuan"
          bind:value={form.country}
          on:input={() => (errors.country = '')}
        />
        <datalist id="country-options">
          {#each countryOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </datalist>
        {#if errors.country}
          <p class="error">{errors.country}</p>
        {/if}
        <p class="hint">Tip: ketik kode negara (JP, US, KR) untuk mempercepat pencarian.</p>
      </div>
    {:else if currentStep === 1}
      <div class="grid">
        <div class="card">
          <label for="store">Pilih Toko</label>
          <input
            id="store"
            list="store-options"
            placeholder="Ketik nama toko"
            bind:value={form.store}
            on:input={() => (errors.store = '')}
          />
          <datalist id="store-options">
            {#each (storeSuggestions[form.country] ?? []) as item}
              <option value={item} />
            {/each}
          </datalist>
          {#if errors.store}
            <p class="error">{errors.store}</p>
          {/if}
        </div>
        <div class="card">
          <label for="store-url">URL Toko (opsional)</label>
          <input
            id="store-url"
            placeholder="https://tokoluarnegeri.com"
            bind:value={form.storeUrl}
          />
          <p class="hint">Isi jika ingin admin memverifikasi toko tertentu.</p>
        </div>
      </div>
    {:else if currentStep === 2}
      <div class="grid two">
        <div class="card">
          <label for="product-name">Nama Produk</label>
          <input
            id="product-name"
            placeholder="Contoh: Nintendo Switch OLED"
            bind:value={form.productName}
            on:input={() => (errors.productName = '')}
          />
          {#if errors.productName}
            <p class="error">{errors.productName}</p>
          {/if}
        </div>
        <div class="card">
          <label for="product-url">URL Produk</label>
          <input
            id="product-url"
            placeholder="https://toko.com/product/123"
            bind:value={form.productUrl}
            on:input={() => (errors.productUrl = '')}
          />
          {#if errors.productUrl}
            <p class="error">{errors.productUrl}</p>
          {/if}
        </div>
      </div>
      <div class="grid">
        <div class="card">
          <label for="variation">Variasi (warna/ukuran)</label>
          <input
            id="variation"
            placeholder="Warna hitam, ukuran M"
            bind:value={form.variation}
          />
        </div>
        <div class="card">
          <label for="note">Catatan Pembeli</label>
          <textarea
            id="note"
            rows="3"
            placeholder="Tuliskan catatan khusus untuk admin"
            bind:value={form.note}
          />
        </div>
      </div>
      <div class="upload card">
        <p>Upload gambar (opsional)</p>
        <div class="drop-zone">Drag & drop atau klik untuk pilih file</div>
      </div>
    {:else if currentStep === 3}
      <div class="grid two">
        <div class="card">
          <label for="currency">Mata Uang Lokal</label>
          <select id="currency" bind:value={form.currency} on:change={autoConvert}>
            <option value="JPY">JPY - Yen Jepang</option>
            <option value="USD">USD - Dollar Amerika</option>
            <option value="KRW">KRW - Won Korea</option>
            <option value="SGD">SGD - Dollar Singapura</option>
            <option value="EUR">EUR - Euro</option>
            <option value="CAD">CAD - Dollar Kanada</option>
          </select>
        </div>
        <div class="card">
          <label for="min-price">Perkiraan Harga Minimum</label>
          <input
            id="min-price"
            type="number"
            min="0"
            bind:value={form.minPrice}
            on:input={() => {
              errors.minPrice = '';
              autoConvert();
            }}
          />
          {#if errors.minPrice}
            <p class="error">{errors.minPrice}</p>
          {/if}
        </div>
        <div class="card">
          <label for="max-price">Perkiraan Harga Maksimum</label>
          <input
            id="max-price"
            type="number"
            min="0"
            bind:value={form.maxPrice}
            on:input={() => {
              errors.maxPrice = '';
              autoConvert();
            }}
          />
          {#if errors.maxPrice}
            <p class="error">{errors.maxPrice}</p>
          {/if}
        </div>
        <div class="card">
          <label for="quantity">Jumlah Barang</label>
          <input
            id="quantity"
            type="number"
            min="1"
            bind:value={form.quantity}
            on:input={() => {
              errors.quantity = '';
              autoConvert();
            }}
          />
          {#if errors.quantity}
            <p class="error">{errors.quantity}</p>
          {/if}
        </div>
        <div class="card">
          <label for="budget">Batas Budget (Rp)</label>
          <input
            id="budget"
            type="number"
            min="0"
            bind:value={form.budget}
            on:input={() => (errors.budget = '')}
          />
          {#if errors.budget}
            <p class="error">{errors.budget}</p>
          {/if}
        </div>
      </div>
      <div class="summary card">
        <h3>Estimasi Biaya Awal</h3>
        <p>
          Estimasi harga per item: {form.minPrice || 0} - {form.maxPrice || 0} {form.currency} ≈ Rp{' '}
          {form.convertedMin.toLocaleString('id-ID')} - Rp {form.convertedMax.toLocaleString('id-ID')}
        </p>
        <p>Jumlah barang: {form.quantity}</p>
        <p>
          Estimasi total: Rp {form.convertedMinTotal.toLocaleString('id-ID')} - Rp{' '}
          {form.convertedMaxTotal.toLocaleString('id-ID')}
        </p>
        <p>Batas budget: Rp {Number(form.budget || 0).toLocaleString('id-ID')}</p>
      </div>
    {:else}
      <div class="review">
        <aside class="card">
          <h3>Ringkasan Permintaan</h3>
          <div class="row">
            <span>Negara</span>
            <strong>{form.country || '-'}</strong>
          </div>
          <div class="row">
            <span>Toko</span>
            <strong>{form.store || '-'}</strong>
          </div>
          <div class="row">
            <span>Produk</span>
            <strong>{form.productName || '-'}</strong>
          </div>
          <div class="row">
            <span>Variasi</span>
            <strong>{form.variation || '-'}</strong>
          </div>
          <div class="row">
            <span>Harga Estimasi</span>
            <strong>
              {form.minPrice || 0} - {form.maxPrice || 0} {form.currency}
            </strong>
          </div>
          <div class="row">
            <span>Total Estimasi (Rp)</span>
            <strong>
              Rp {form.convertedMinTotal.toLocaleString('id-ID')} - Rp{' '}
              {form.convertedMaxTotal.toLocaleString('id-ID')}
            </strong>
          </div>
          <div class="row">
            <span>Budget</span>
            <strong>Rp {Number(form.budget || 0).toLocaleString('id-ID')}</strong>
          </div>
        </aside>
        <div class="card actions">
          <h3>Siap Kirim?</h3>
          <p>Periksa kembali data di atas sebelum dikirim ke Admin Jastipku.</p>
          <button class="primary" on:click={submitRequest}>Kirim ke Admin</button>
          {#if showSuccess}
            <div class="success">
              ✅ Permintaan berhasil dikirim. Status: <strong>Menunggu_Review_Admin</strong>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>

  <div class="navigation">
    {#if currentStep > 0}
      <button class="ghost" on:click={prevStep}>Back</button>
    {/if}
    {#if currentStep < steps.length - 1}
      <button class="primary" on:click={nextStep}>Next</button>
    {/if}
  </div>
</section>

<style>
  .wizard {
    padding: 4rem clamp(1.5rem, 5vw, 4rem);
    display: grid;
    gap: 2rem;
  }

  header h1 {
    margin: 0;
    font-size: clamp(2rem, 4vw, 2.75rem);
  }

  header p {
    color: #475569;
  }

  .step-content {
    display: grid;
    gap: 1.5rem;
  }

  .card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
    display: grid;
    gap: 0.75rem;
  }

  label {
    font-weight: 600;
    color: #1f2937;
  }

  input,
  select,
  textarea {
    padding: 0.8rem 1rem;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.4);
    background: #f8fafc;
    font-size: 1rem;
  }

  textarea {
    resize: vertical;
  }

  .hint {
    color: #64748b;
    font-size: 0.85rem;
  }

  .grid {
    display: grid;
    gap: 1.5rem;
  }

  .grid.two {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  .upload .drop-zone {
    padding: 2.5rem;
    border: 2px dashed rgba(14, 165, 233, 0.5);
    border-radius: 14px;
    background: rgba(14, 165, 233, 0.08);
    text-align: center;
    color: #0f172a;
    font-weight: 600;
  }

  .summary h3 {
    margin: 0;
  }

  .review {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  .review .row {
    display: flex;
    justify-content: space-between;
    color: #475569;
  }

  .actions button {
    width: fit-content;
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .ghost,
  .primary {
    border-radius: 999px;
    padding: 0.8rem 1.8rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
  }

  .ghost {
    background: white;
    border: 1px solid rgba(148, 163, 184, 0.5);
    color: #1f2937;
  }

  .primary {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
    box-shadow: 0 15px 30px rgba(14, 165, 233, 0.25);
  }

  .error {
    color: #ef4444;
    font-size: 0.85rem;
    margin: 0;
  }

  .success {
    padding: 0.8rem 1rem;
    border-radius: 12px;
    background: rgba(34, 197, 94, 0.15);
    color: #15803d;
  }

  @media (max-width: 600px) {
    .navigation {
      flex-direction: column;
    }

    .ghost,
    .primary {
      width: 100%;
    }
  }
</style>
