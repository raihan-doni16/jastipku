<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import { orders } from '$lib/data/mockData';

  let code = '';
  let result = null;
  let notFound = false;

  function track() {
    result = orders.find((order) => order.code.toLowerCase() === code.trim().toLowerCase()) ?? null;
    notFound = !result;
  }
</script>

<Navbar />

<section class="tracking">
  <header>
    <h1>Tracking Publik</h1>
    <p>Masukkan kode pesanan untuk melihat status terbaru.</p>
  </header>

  <div class="form">
    <input
      placeholder="Contoh: JP-240102-001"
      bind:value={code}
      on:keydown={(event) => event.key === 'Enter' && track()}
    />
    <button class="primary" on:click={track}>Lacak</button>
  </div>

  {#if notFound}
    <div class="empty">Kode pesanan tidak ditemukan di data mock.</div>
  {/if}

  {#if result}
    <div class="card result">
      <h2>{result.code}</h2>
      <p>{result.store} · {result.country}</p>
      <progress max="100" value={result.timeline ? result.timeline.length * 20 : 20} />
      <ul class="timeline">
        {#each result.timeline ?? [] as item}
          <li>
            <span class="status">{item.status}</span>
            <span class="time">{item.timestamp}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</section>

<style>
  .tracking {
    padding: 4rem clamp(1.5rem, 5vw, 4rem);
    display: grid;
    gap: 1.5rem;
    justify-items: start;
  }

  header h1 {
    margin: 0;
  }

  header p {
    margin: 0.5rem 0 0 0;
    color: #475569;
  }

  .form {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  input {
    padding: 0.8rem 1.2rem;
    border-radius: 14px;
    border: 1px solid rgba(148, 163, 184, 0.4);
    min-width: 240px;
  }

  .primary {
    padding: 0.8rem 1.6rem;
    border-radius: 999px;
    border: none;
    font-weight: 600;
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
    cursor: pointer;
  }

  .empty {
    padding: 1rem 1.5rem;
    background: rgba(239, 68, 68, 0.1);
    color: #b91c1c;
    border-radius: 12px;
  }

  .card {
    background: white;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
    padding: 2rem;
    display: grid;
    gap: 1rem;
    width: min(100%, 36rem);
  }

  progress {
    width: 100%;
    height: 0.75rem;
    border-radius: 999px;
    overflow: hidden;
    background: #e2e8f0;
  }

  progress::-webkit-progress-value {
    background: linear-gradient(135deg, #22c55e, #0ea5e9);
    border-radius: 999px;
  }

  .timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.75rem;
  }

  .timeline li {
    display: flex;
    justify-content: space-between;
    background: #f8fafc;
    padding: 0.9rem 1.2rem;
    border-radius: 12px;
  }

  .timeline .status {
    font-weight: 600;
  }

  @media (max-width: 600px) {
    .form {
      width: 100%;
    }

    input {
      flex: 1;
    }

    .timeline li {
      flex-direction: column;
      gap: 0.3rem;
    }
  }
</style>
