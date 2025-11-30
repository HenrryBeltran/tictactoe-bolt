<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.ico";
  import { setCSSColorVariables } from "$lib/theme.svelte";

  let { children } = $props();

  $effect(() => {
    setCSSColorVariables();
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main class="relative flex min-h-lvh flex-col bg-base-color text-text-color">
  {@render children?.()}
</main>
