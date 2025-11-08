<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.ico";
  import { getColors } from "$lib/theme.svelte";

  let { children } = $props();

  $effect(() => {
    document.body.style.backgroundColor = getColors().base;
    document.body.style.color = getColors().text;
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main class="relative flex min-h-lvh flex-col">
  {@render children?.()}
</main>
