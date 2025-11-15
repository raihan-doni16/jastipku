<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import Navbar from '$lib/components/Navbar.svelte';
  import RatingStars from '$lib/components/RatingStars.svelte';
  import Modal from '$lib/components/Modal.svelte';

  let currentRole = 'guest';
  authStore.subscribe((val) => {
    currentRole = val.role;
  });

  onMount(() => {
    if (currentRole !== 'jastiper') {
      goto('/login?redirect=/jastiper/profile&expected=jastiper');
    }
  });

  let profile = {
    id: 'JST001',
    name: 'Sarah Kim',
    email: 'sarah@example.com',
    phone: '+62812345678',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    country: 'Korea',
    rating: 4.8,
    totalTrips: 45,
    verified: true,
    status: 'verified',
    passport: {
      number: 'A12345678',
      issueDate: '2020-01-15',
      expiryDate: '2030-01-15',
      nationality: 'Indonesia',
      fileUploaded: true
    },
    bankAccount: {
      bankName: 'BCA',
      accountNumber: '1234567890',
      accountName: 'Sarah Kim'
    },
    address: 'Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta 12345'
  };

  let activeTab = 'profile'; // profile, verification, documents
  let isEditing = false;
  let editForm = { ...profile };

  let uploadingDocument = null;

  let modalOpen = false;
  let modalTitle = '';
  let modalMessage = '';
  let modalType = 'info';

  function openModal({ title, message, type = 'info' }) {
    modalTitle = title;
    modalMessage = message;
    modalType = type;
    modalOpen = true;
  }

  function handleEdit() {
    isEditing = true;
    editForm = { ...profile };
  }

  function handleCancel() {
    isEditing = false;
  }

  function handleSave() {
    profile = { ...editForm };
    isEditing = false;
    openModal({
      title: 'Profil diperbarui',
      message: 'Profil jastiper Anda berhasil diperbarui.',
      type: 'success'
    });
  }

  function handleUploadDocument(docType) {
    uploadingDocument = docType;
    // Simulate file upload
    setTimeout(() => {
      openModal({
        title: 'Upload dokumen',
        message: `Dokumen ${docType} berhasil diupload!`,
        type: 'success'
      });
      uploadingDocument = null;
      if (docType === 'passport') {
        profile.passport.fileUploaded = true;
      }
    }, 1000);
  }

  function handleRequestVerification() {
    if (!profile.passport.fileUploaded) {
      openModal({
        title: 'Dokumen paspor belum ada',
        message: 'Harap upload dokumen paspor terlebih dahulu sebelum ajukan verifikasi.',
        type: 'warning'
      });
      return;
    }
    openModal({
      title: 'Permintaan verifikasi dikirim',
      message:
        'Permintaan verifikasi berhasil dikirim! Admin akan mereview dalam 1-3 hari kerja.',
      type: 'success'
    });
  }
</script>

<Navbar />

<div class="container">
  <div class="header">
    <div class="header-left">
      <div class="avatar-large">
        <img src={profile.avatar} alt={profile.name} />
      </div>
      <div>
        <h1>{profile.name}</h1>
        <p class="subtitle">{profile.email}</p>
        <div class="verification-badge">
          {#if profile.verified}
            <span class="badge verified">✓ Terverifikasi</span>
          {:else}
            <span class="badge pending">⏳ Belum Terverifikasi</span>
          {/if}
        </div>
      </div>
    </div>
    <div class="header-stats">
      <div class="stat-box">
        <span class="stat-icon">⭐</span>
        <div>
          <span class="stat-label">Rating</span>
          <div class="rating-display">
            <RatingStars rating={profile.rating} />
            <span class="stat-value">{profile.rating}</span>
          </div>
        </div>
      </div>
      <div class="stat-box">
        <span class="stat-icon">✈️</span>
        <div>
          <span class="stat-label">Total Trip</span>
          <span class="stat-value">{profile.totalTrips}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs">
    <button
      class="tab-btn"
      class:active={activeTab === 'profile'}
      on:click={() => (activeTab = 'profile')}
    >
      Profil
    </button>
    <button
      class="tab-btn"
      class:active={activeTab === 'verification'}
      on:click={() => (activeTab = 'verification')}
    >
      Verifikasi
    </button>
    <button
      class="tab-btn"
      class:active={activeTab === 'documents'}
      on:click={() => (activeTab = 'documents')}
    >
      Dokumen
    </button>
  </div>

  <!-- Tab Content -->
  <div class="content">
    {#if activeTab === 'profile'}
      <div class="profile-card">
        <div class="card-header">
          <h3>Informasi Pribadi</h3>
          {#if !isEditing}
            <button class="btn-edit" on:click={handleEdit}>Edit</button>
          {/if}
        </div>

        {#if isEditing}
          <div class="form">
            <div class="form-group">
              <label>Nama Lengkap</label>
              <input type="text" bind:value={editForm.name} />
            </div>

            <div class="form-group">
              <label>Email</label>
              <input type="email" bind:value={editForm.email} />
            </div>

            <div class="form-group">
              <label>Nomor Telepon/WhatsApp</label>
              <input type="tel" bind:value={editForm.phone} />
            </div>

            <div class="form-group">
              <label>Negara Tujuan Utama</label>
              <input type="text" bind:value={editForm.country} />
            </div>

            <div class="form-group">
              <label>Alamat Lengkap</label>
              <textarea bind:value={editForm.address} rows="4"></textarea>
            </div>

            <div class="form-actions">
              <button class="btn-cancel" on:click={handleCancel}>Batal</button>
              <button class="btn-save" on:click={handleSave}>Simpan</button>
            </div>
          </div>
        {:else}
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Nama Lengkap</span>
              <span class="value">{profile.name}</span>
            </div>

            <div class="info-item">
              <span class="label">ID Jastiper</span>
              <span class="value">{profile.id}</span>
            </div>

            <div class="info-item">
              <span class="label">Email</span>
              <span class="value">{profile.email}</span>
            </div>

            <div class="info-item">
              <span class="label">Nomor Telepon</span>
              <span class="value">{profile.phone}</span>
            </div>

            <div class="info-item">
              <span class="label">Negara Tujuan</span>
              <span class="value">{profile.country}</span>
            </div>

            <div class="info-item">
              <span class="label">Status</span>
              <span class="value">
                {profile.verified ? 'Terverifikasi' : 'Belum Terverifikasi'}
              </span>
            </div>

            <div class="info-item full-width">
              <span class="label">Alamat</span>
              <span class="value">{profile.address}</span>
            </div>
          </div>
        {/if}
      </div>

      <div class="profile-card">
        <h3>Informasi Rekening</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Nama Bank</span>
            <span class="value">{profile.bankAccount.bankName}</span>
          </div>

          <div class="info-item">
            <span class="label">Nomor Rekening</span>
            <span class="value">{profile.bankAccount.accountNumber}</span>
          </div>

          <div class="info-item full-width">
            <span class="label">Nama Pemilik Rekening</span>
            <span class="value">{profile.bankAccount.accountName}</span>
          </div>
        </div>
      </div>
    {:else if activeTab === 'verification'}
      <div class="verification-section">
        {#if profile.verified}
          <div class="status-card success">
            <span class="status-icon">✅</span>
            <div class="status-content">
              <h3>Akun Terverifikasi</h3>
              <p>
                Selamat! Akun Anda sudah terverifikasi. Anda dapat membuat postingan dan
                menerima pesanan dari pembeli.
              </p>
            </div>
          </div>
        {:else}
          <div class="status-card warning">
            <span class="status-icon">⏳</span>
            <div class="status-content">
              <h3>Verifikasi Diperlukan</h3>
              <p>
                Untuk mulai menerima pesanan, akun Anda perlu diverifikasi terlebih dahulu.
                Upload dokumen paspor dan tunggu review dari admin.
              </p>
            </div>
          </div>
        {/if}

        <div class="verification-checklist">
          <h3>Checklist Verifikasi</h3>
          <div class="checklist-items">
            <div class="checklist-item" class:completed={profile.name}>
              <span class="check-icon">{profile.name ? '✓' : '○'}</span>
              <span>Informasi Profil Lengkap</span>
            </div>
            <div class="checklist-item" class:completed={profile.passport.fileUploaded}>
              <span class="check-icon">{profile.passport.fileUploaded ? '✓' : '○'}</span>
              <span>Upload Dokumen Paspor</span>
            </div>
            <div class="checklist-item" class:completed={profile.bankAccount.accountNumber}>
              <span class="check-icon">{profile.bankAccount.accountNumber ? '✓' : '○'}</span>
              <span>Informasi Rekening Bank</span>
            </div>
            <div class="checklist-item" class:completed={profile.verified}>
              <span class="check-icon">{profile.verified ? '✓' : '○'}</span>
              <span>Verifikasi Admin</span>
            </div>
          </div>
        </div>

        {#if !profile.verified}
          <button class="btn-verify" on:click={handleRequestVerification}>
            Ajukan Verifikasi
          </button>
        {/if}
      </div>
    {:else if activeTab === 'documents'}
      <div class="documents-section">
        <div class="document-card">
          <div class="doc-header">
            <div>
              <h4>Paspor</h4>
              <p>Upload foto/scan paspor Anda</p>
            </div>
            <span
              class="doc-status"
              class:uploaded={profile.passport.fileUploaded}
            >
              {profile.passport.fileUploaded ? '✓ Uploaded' : '⚠ Belum Upload'}
            </span>
          </div>

          {#if profile.passport.number}
            <div class="doc-info">
              <div class="doc-item">
                <span class="doc-label">Nomor Paspor</span>
                <span class="doc-value">{profile.passport.number}</span>
              </div>
              <div class="doc-item">
                <span class="doc-label">Tanggal Terbit</span>
                <span class="doc-value">{profile.passport.issueDate}</span>
              </div>
              <div class="doc-item">
                <span class="doc-label">Tanggal Kadaluarsa</span>
                <span class="doc-value">{profile.passport.expiryDate}</span>
              </div>
              <div class="doc-item">
                <span class="doc-label">Kewarganegaraan</span>
                <span class="doc-value">{profile.passport.nationality}</span>
              </div>
            </div>
          {/if}

          <div class="doc-upload">
            {#if profile.passport.fileUploaded}
              <div class="uploaded-preview">
                <span class="preview-icon">📄</span>
                <span>passport_scan.pdf</span>
              </div>
            {:else}
              <div class="upload-placeholder">
                <span class="upload-icon">📤</span>
                <p>Drag & drop file atau klik untuk upload</p>
                <span class="upload-hint">Format: PDF, JPG, PNG (Max 5MB)</span>
              </div>
            {/if}

            <button
              class="btn-upload"
              disabled={uploadingDocument === 'passport'}
              on:click={() => handleUploadDocument('passport')}
            >
              {uploadingDocument === 'passport' ? 'Uploading...' : profile.passport.fileUploaded ? 'Replace File' : 'Upload File'}
            </button>
          </div>
        </div>

        <div class="info-box">
          <h4>📋 Panduan Upload Dokumen</h4>
          <ul>
            <li>Pastikan dokumen terlihat jelas dan tidak blur</li>
            <li>Semua informasi harus terbaca dengan baik</li>
            <li>Format file: PDF, JPG, atau PNG</li>
            <li>Ukuran maksimal: 5MB per file</li>
            <li>Paspor harus masih berlaku minimal 6 bulan</li>
          </ul>
        </div>
      </div>
    {/if}
  </div>
</div>

<Modal
  bind:isOpen={modalOpen}
  type={modalType}
  title={modalTitle}
  message={modalMessage}
  confirmText="OK"
/>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .avatar-large {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
  }

  .avatar-large img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .header h1 {
    font-size: 2rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #64748b;
    margin-bottom: 0.75rem;
  }

  .verification-badge {
    display: flex;
    gap: 0.5rem;
  }

  .badge {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 700;
  }

  .badge.verified {
    background: #dcfce7;
    color: #15803d;
  }

  .badge.pending {
    background: #fef3c7;
    color: #92400e;
  }

  .header-stats {
    display: flex;
    gap: 1.5rem;
  }

  .stat-box {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
  }

  .stat-icon {
    font-size: 2rem;
  }

  .stat-label {
    display: block;
    font-size: 0.875rem;
    color: #64748b;
    margin-bottom: 0.25rem;
  }

  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
  }

  .rating-display {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .tabs {
    display: flex;
    gap: 0.5rem;
    background: white;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .tab-btn {
    flex: 1;
    padding: 0.875rem 1.5rem;
    background: transparent;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tab-btn:hover {
    background: #f8fafc;
  }

  .tab-btn.active {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .profile-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .profile-card h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
  }

  .btn-edit {
    padding: 0.6rem 1.25rem;
    background: #eff6ff;
    border: none;
    border-radius: 6px;
    color: #086adf;
    font-weight: 600;
    cursor: pointer;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .info-item.full-width {
    grid-column: 1 / -1;
  }

  .label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
  }

  .value {
    font-size: 1rem;
    color: #1f2937;
    font-weight: 600;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 600;
    color: #1f2937;
  }

  .form-group input,
  .form-group textarea {
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

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .btn-cancel,
  .btn-save {
    padding: 0.875rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-cancel {
    background: #f1f5f9;
    color: #64748b;
  }

  .btn-save {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .verification-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .status-card {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .status-card.success {
    border-left: 4px solid #22c55e;
  }

  .status-card.warning {
    border-left: 4px solid #f59e0b;
  }

  .status-icon {
    font-size: 3rem;
  }

  .status-content h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }

  .status-content p {
    color: #64748b;
    line-height: 1.6;
  }

  .verification-checklist {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .verification-checklist h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
  }

  .checklist-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .checklist-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
    color: #64748b;
  }

  .checklist-item.completed {
    background: #dcfce7;
    color: #15803d;
  }

  .check-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: white;
    font-weight: 700;
  }

  .btn-verify {
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

  .btn-verify:hover {
    transform: scale(1.02);
  }

  .documents-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .document-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .doc-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }

  .doc-header h4 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.25rem;
  }

  .doc-header p {
    color: #64748b;
    font-size: 0.9rem;
  }

  .doc-status {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 700;
    background: #fef3c7;
    color: #92400e;
  }

  .doc-status.uploaded {
    background: #dcfce7;
    color: #15803d;
  }

  .doc-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;
  }

  .doc-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .doc-label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 600;
  }

  .doc-value {
    font-size: 1rem;
    color: #1f2937;
    font-weight: 600;
  }

  .doc-upload {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .upload-placeholder,
  .uploaded-preview {
    padding: 3rem 2rem;
    border: 2px dashed #cbd5e1;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
  }

  .uploaded-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: #f8fafc;
    border-color: #22c55e;
  }

  .upload-icon,
  .preview-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
  }

  .upload-placeholder p {
    color: #475569;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .upload-hint {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .btn-upload {
    padding: 0.875rem 1.5rem;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-upload:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .info-box {
    padding: 1.5rem;
    background: #eff6ff;
    border-radius: 12px;
    border: 1px solid #bfdbfe;
  }

  .info-box h4 {
    font-size: 1rem;
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 1rem;
  }

  .info-box ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .info-box li {
    color: #1e40af;
    padding-left: 1.5rem;
    position: relative;
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  .info-box li::before {
    content: '•';
    position: absolute;
    left: 0.5rem;
    font-weight: 700;
  }

  @media (max-width: 1024px) {
    .header {
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-grid,
    .doc-info {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header-left {
      flex-direction: column;
      text-align: center;
    }

    .header h1 {
      font-size: 1.5rem;
    }

    .header-stats {
      flex-direction: column;
      width: 100%;
    }

    .tabs {
      flex-direction: column;
    }
  }
</style>
