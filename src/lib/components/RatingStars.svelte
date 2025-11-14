<script>
  export let value = 0;
  const stars = [1, 2, 3, 4, 5];
</script>

<div class="stars">
  {#each stars as star}
    <span class="{value >= star ? 'filled' : ''}">★</span>
  {/each}
</div>

<style>
  .stars {
    display: inline-flex;
    gap: 0.1rem;
    color: #fbbf24;
    font-size: 1rem;
  }

  span {
    opacity: 0.3;
  }

  .filled {
    opacity: 1;
  }
</style>
