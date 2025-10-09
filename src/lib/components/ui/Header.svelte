<script lang="ts">
  import type { Snippet } from "svelte";
  import { Modal } from "$lib/components/ui";
  import { page } from "$app/state";

  type Props = {
    title?: Snippet;
  };

  let { title }: Props = $props();

  let showModal = $state(false);
</script>

<nav
  class="absolute top-6 left-1/2 h-12 w-[calc(100%-48px)] -translate-x-1/2 rounded-full bg-neutral-100 shadow-xl shadow-neutral-600/5"
>
  <div class="flex h-full items-center justify-between px-5">
    {#if page.url.pathname !== "/"}
      <a
        href="/"
        class="flex w-10 items-center justify-center self-stretch"
        aria-label="go-back-link"
      >
        <svg
          viewBox="0 0 24 24"
          width="100%"
          height="100%"
          class="h-8 w-8 stroke-rose-500"
          fill="none"
        >
          <path
            d="M5.5 12.002H19"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="vector-effect: non-scaling-stroke;"
          />
          <path
            d="M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="vector-effect: non-scaling-stroke;"
          />
        </svg>
      </a>
    {:else}
      <div></div>
    {/if}
    <div class="@container flex h-full w-full items-center justify-center">
      {@render title?.()}
    </div>
    <button
      onclick={() => (showModal = !showModal)}
      aria-label="hamburger-menu"
      class="self-stretch px-2"
    >
      <svg class="h-5 w-6" viewBox="0 0 24 20">
        <line
          x1="2"
          y1="2"
          x2="22"
          y2="2"
          class="stroke-neutral-800"
          style="fill: none; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 4px;"
        />
        <line
          x1="2"
          y1="10"
          x2="22"
          y2="10"
          class="stroke-neutral-800"
          style="fill: none; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 4px;"
        />
        <line
          x1="2"
          y1="18"
          x2="22"
          y2="18"
          class="stroke-neutral-800"
          style="fill: none; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 4px;"
        />
      </svg>
    </button>
  </div>
</nav>

<Modal bind:showModal>
  <p>More Options</p>
</Modal>
