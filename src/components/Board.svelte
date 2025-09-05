<script lang="ts">
  import Mark from "./Mark.svelte";
  import { type BoardIndex, getBoardState, playerAction } from "$lib/store.svelte";
</script>

<div
  id="board"
  class="mx-auto grid aspect-square h-full w-full grid-cols-3 grid-rows-3 gap-[3.92%]"
>
  {#each getBoardState() as cell, i}
    <button
      onclick={playerAction(i as BoardIndex).placeMark}
      class="cell flex items-center justify-center rounded-2xl bg-neutral-300/75 p-4"
    >
      <Mark state={cell.cell} player={cell.player} />
    </button>
  {/each}
</div>
