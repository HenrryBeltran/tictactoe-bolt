<script lang="ts">
  import { Mark } from "$lib/components";
  import {
    type BoardIndex,
    getBoardState,
    getCanClickBoard,
    playerAction,
  } from "$lib/store.svelte";

  let board = $state<HTMLDivElement>();

  function boardAction() {
    playerAction().quickRestart();
  }

  $effect(() => {
    if (board === undefined) return;
    if (getCanClickBoard().value) {
      board.addEventListener("click", boardAction);
    } else {
      board.removeEventListener("click", boardAction);
    }
  });
</script>

<div
  bind:this={board}
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
