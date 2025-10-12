<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.ico";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main class="relative flex min-h-lvh flex-col">
  {@render children?.()}
</main>
