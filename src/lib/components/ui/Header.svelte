<script lang="ts">
  import type { Snippet } from "svelte";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { ArrowLeft02Icon, Menu09Icon } from "@hugeicons/core-free-icons";
  import { Modal } from "$lib/components/ui";
  import { page } from "$app/state";

  type Props = {
    title?: Snippet;
  };

  let { title }: Props = $props();

  let showModal = $state(false);
</script>

<nav class="absolute top-0 left-0 w-full border border-red-400">
  <div class="flex justify-between px-6">
    {#if page.url.pathname !== "/"}
      <a href="/">
        <HugeiconsIcon icon={ArrowLeft02Icon} size={32} absoluteStrokeWidth strokeWidth={2} />
      </a>
    {:else}
      <div></div>
    {/if}
    <div>
      {@render title?.()}
    </div>
    <button onclick={() => (showModal = !showModal)}>
      <HugeiconsIcon icon={Menu09Icon} size={32} absoluteStrokeWidth strokeWidth={2} />
    </button>
  </div>
</nav>

<Modal bind:showModal>
  <p>More Options</p>
</Modal>
