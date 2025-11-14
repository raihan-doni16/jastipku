<script>
  export let steps = [];
  export let activeIndex = 0;
</script>

<div class="stepper">
  {#each steps as step, index}
    <div class="step">
      <div class="bullet {index === activeIndex ? 'active' : ''} {index < activeIndex ? 'done' : ''}">
        {index < activeIndex ? '✓' : index + 1}
      </div>
      <div class="label">
        <h3>{step.title}</h3>
        {#if step.caption}
          <p>{step.caption}</p>
        {/if}
      </div>
      {#if index < steps.length - 1}
        <div class="divider {index < activeIndex ? 'done' : ''}" />
      {/if}
    </div>
  {/each}
</div>

<style>
  .stepper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: 1.5rem;
    padding: 1rem;
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  }

  .step {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
    padding: 0 1rem;
  }

  .bullet {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 999px;
    background: #e2e8f0;
    color: #475569;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .bullet.active {
    background: linear-gradient(135deg, #086adf, #0ea5e9);
    color: white;
    transform: scale(1.05);
  }

  .bullet.done {
    background: #22c55e;
    color: white;
  }

  .label h3 {
    margin: 0;
    font-size: 1rem;
    color: #0f172a;
  }

  .label p {
    margin: 0;
    font-size: 0.825rem;
    color: #64748b;
  }

  .divider {
    position: absolute;
    top: 1.5rem;
    right: -50%;
    width: 100%;
    height: 2px;
    background: #e2e8f0;
    z-index: -1;
  }

  .divider.done {
    background: linear-gradient(90deg, #0ea5e9, #22c55e);
  }

  @media (max-width: 768px) {
    .stepper {
      grid-template-columns: 1fr;
    }

    .step {
      align-items: flex-start;
      text-align: left;
    }

    .divider {
      display: none;
    }
  }
</style>
