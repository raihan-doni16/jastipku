<script>
  import { createEventDispatcher } from 'svelte';

  export let isOpen = false;
  export let title = '';
  export let message = '';
  export let type = 'info'; // 'info', 'confirm', 'prompt', 'success', 'error', 'warning'
  export let confirmText = 'OK';
  export let cancelText = 'Batal';
  export let showCancel = false;
  export let inputValue = '';
  export let inputPlaceholder = '';
  export let inputType = 'text';
  export let maxWidth = '500px';
  export let autoCloseOnConfirm = true;

  let hasCustomBody = false;
  $: hasCustomBody = !!$$slots.default;

  const dispatch = createEventDispatcher();

  function handleConfirm() {
    if (type === 'prompt') {
      dispatch('confirm', inputValue);
    } else {
      dispatch('confirm');
    }
    if (autoCloseOnConfirm) {
      close();
    }
  }

  function handleCancel() {
    dispatch('cancel');
    close();
  }

  function close() {
    isOpen = false;
    inputValue = '';
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      handleCancel();
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      handleCancel();
    } else if (event.key === 'Enter' && type !== 'prompt') {
      handleConfirm();
    }
  }
</script>

{#if isOpen}
  <div class="modal-backdrop" on:click={handleBackdropClick} on:keydown={handleKeydown} role="presentation">
    <div class="modal-content" style="max-width: {maxWidth}">
      <div class="modal-header" class:info={type === 'info'} class:confirm={type === 'confirm'} class:success={type === 'success'} class:error={type === 'error'} class:warning={type === 'warning'} class:prompt={type === 'prompt'}>
        <div class="modal-icon">
          {#if type === 'success'}
            ✅
          {:else if type === 'error'}
            ❌
          {:else if type === 'warning'}
            ⚠️
          {:else if type === 'confirm'}
            ❓
          {:else if type === 'prompt'}
            📝
          {:else}
            ℹ️
          {/if}
        </div>
        {#if title}
          <h3 class="modal-title">{title}</h3>
        {/if}
        <button class="modal-close" on:click={handleCancel}>&times;</button>
      </div>

      <div class="modal-body">
        {#if message}
          <p class="modal-message">{message}</p>
        {/if}

        {#if hasCustomBody}
          <slot />
        {:else if type === 'prompt'}
          {#if inputType === 'textarea'}
            <textarea
              bind:value={inputValue}
              placeholder={inputPlaceholder}
              class="modal-input"
              rows="4"
              autofocus
            ></textarea>
          {:else}
            <input
              type="text"
              bind:value={inputValue}
              placeholder={inputPlaceholder}
              class="modal-input"
              autofocus
              on:keydown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleConfirm();
                }
              }}
            />
          {/if}
        {/if}
      </div>

      <div class="modal-footer">
        {#if showCancel || type === 'confirm' || type === 'prompt'}
          <button class="btn-cancel" on:click={handleCancel}>{cancelText}</button>
        {/if}
        <button class="btn-confirm" on:click={handleConfirm}>{confirmText}</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .modal-content {
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-height: 90vh;
    overflow: hidden;
    animation: slideUp 0.3s ease-out;
    display: flex;
    flex-direction: column;
  }

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .modal-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    border-bottom: 2px solid #f1f5f9;
    position: relative;
    flex-shrink: 0;
  }

  .modal-header.success {
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  }

  .modal-header.error {
    background: linear-gradient(135deg, #fee2e2, #fecaca);
  }

  .modal-header.warning {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
  }

  .modal-header.confirm {
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  }

  .modal-header.prompt {
    background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  }

  .modal-header.info {
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  }

  .modal-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
  }

  .modal-title {
    flex: 1;
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.1);
    color: #475569;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .modal-close:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: rotate(90deg);
  }

  .modal-body {
    padding: 2rem 1.5rem;
    flex: 1 1 auto;
    overflow-y: auto;
    min-height: 0;
  }

  .modal-message {
    color: #475569;
    line-height: 1.6;
    margin: 0;
    white-space: pre-wrap;
  }

  .modal-input {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    margin-top: 1rem;
    transition: border-color 0.2s;
    font-family: inherit;
  }

  textarea.modal-input {
    resize: vertical;
    min-height: 100px;
  }

  .modal-input:focus {
    outline: none;
    border-color: #086adf;
  }

  .modal-footer {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 2px solid #f1f5f9;
    justify-content: flex-end;
    flex-shrink: 0;
  }

  .btn-cancel,
  .btn-confirm {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .btn-cancel {
    background: white;
    border: 2px solid #e2e8f0;
    color: #475569;
  }

  .btn-cancel:hover {
    border-color: #cbd5e1;
    background: #f8fafc;
  }

  .btn-confirm {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
  }

  .btn-confirm:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(8, 106, 223, 0.3);
  }

  @media (max-width: 640px) {
    .modal-content {
      width: 95%;
    }

    .modal-header {
      padding: 1rem;
    }

    .modal-icon {
      font-size: 2rem;
    }

    .modal-title {
      font-size: 1.25rem;
    }

    .modal-body {
      padding: 1.5rem 1rem;
    }

    .modal-footer {
      flex-direction: column;
      padding: 1rem;
    }

    .btn-cancel,
    .btn-confirm {
      width: 100%;
    }
  }
</style>
