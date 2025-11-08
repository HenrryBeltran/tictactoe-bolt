<script lang="ts">
  import { markAnimation } from "$lib/animations.svelte";
  import type { BoardIndex } from "$lib/store.svelte";
  import { getColors } from "$lib/theme.svelte";

  interface Props {
    markState: "empty" | "mark" | "dead";
    player: "player1" | "player2" | "computer" | null;
    nro: BoardIndex;
  }
  let { markState, player, nro }: Props = $props();

  let mark = $state<SVGSVGElement>();

  $effect(() => {
    if (player !== null && markState !== "empty") {
      markAnimation(mark!);
    }
  });
</script>

{#if markState !== "empty" && player === "player1"}
  <svg
    bind:this={mark}
    data-nro={nro}
    data-player={player}
    data-type={markState}
    class="h-full w-full p-px"
    fill={getColors().primary}
    viewBox="0 0 64 64"
  >
    <path
      d="M32,16c8.82,0,16,7.18,16,16s-7.18,16-16,16-16-7.18-16-16,7.18-16,16-16M32,0C14.33,0,0,14.33,0,32s14.33,32,32,32,32-14.33,32-32S49.67,0,32,0h0Z"
    />
  </svg>
{:else if markState !== "empty" && (player === "player2" || player === "computer")}
  <svg
    bind:this={mark}
    data-nro={nro}
    data-player={player}
    data-type={markState}
    class="h-full w-full p-px"
    viewBox="0 0 64 64"
  >
    <line
      x1="8"
      y1="8"
      x2="56"
      y2="56"
      stroke={getColors().secondary}
      stroke-width="16px"
      stroke-miterlimit="10"
      stroke-linecap="round"
      fill="none"
    />
    <line
      x1="56"
      y1="8"
      x2="8"
      y2="56"
      stroke={getColors().secondary}
      stroke-width="16px"
      stroke-miterlimit="10"
      stroke-linecap="round"
      fill="none"
    />
  </svg>
{:else}
  <div data-type="empty"></div>
{/if}
