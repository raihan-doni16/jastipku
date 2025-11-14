<script>
</script>

<svelte:head>
  <title>Jastipku - Jasa Titip Terpercaya</title>
  <link rel="icon" href="/logo.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/logo.svg" />
  <meta name="description" content="Jastipku - Platform jasa titip barang dari luar negeri yang terpercaya dan aman" />
</svelte:head>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Inter', 'Segoe UI', Tahoma, sans-serif;
    background-color: #f5f7fb;
    color: #1f2937;
  }

  :global(a) {
    color: inherit;
    text-decoration: none;
  }

  :global(button) {
    font-family: inherit;
  }

  main {
    min-height: 100vh;
  }
</style>

<main>
  <slot />
</main>
