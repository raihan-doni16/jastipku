<script>
  export let statusMeta;
  export let status;

  const meta = statusMeta[status] ?? statusMeta.Draft;
</script>

<span class="badge" style={`--badge-color: ${meta.color}`}>
  {meta.label}
</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.35rem 0.75rem;
    background: color-mix(in srgb, var(--badge-color) 15%, #ffffff 85%);
    border: 1px solid color-mix(in srgb, var(--badge-color) 60%, #ffffff 40%);
    border-radius: 999px;
    color: color-mix(in srgb, var(--badge-color) 75%, #000 25%);
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: capitalize;
  }
</style>
