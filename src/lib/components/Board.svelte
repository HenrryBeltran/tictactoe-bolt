<script lang="ts">
  import { Mark } from "$lib/components";
  import { onTurnPVC } from "$lib/computer.svelte";
  import { type BoardIndex, getBoardState, getGameState, playerAction } from "$lib/store.svelte";

  let board = $state<HTMLDivElement>();

  function boardAction() {
    playerAction().quickRestart();
  }

  $effect(() => {
    if (board === undefined) return;

    if (getGameState() === "restarting") {
      board.addEventListener("click", boardAction);
    } else {
      board.removeEventListener("click", boardAction);
    }
  });

  $effect(() => {
    onTurnPVC();
  });
</script>

<div
  bind:this={board}
  class="mx-auto mt-20 grid aspect-square h-full w-full grid-cols-3 grid-rows-3 gap-[2.61%] rounded-[13%] bg-neutral-100 p-[7.83%] shadow-xl shadow-neutral-600/5"
>
  {#each getBoardState() as cell, i}
    <button
      onclick={playerAction(i as BoardIndex).placeMark}
      disabled={getGameState() === "restarting" || getGameState() === "cpu_thinking"}
      aria-disabled={getGameState() === "restarting" || getGameState() === "cpu_thinking"
        ? true
        : null}
      class="cell flex items-center justify-center rounded-[20%] bg-neutral-300/75 p-[10%]"
      style={`pointer-events: ${getGameState() === "restarting" || getGameState() === "cpu_thinking" ? "none" : "auto"}`}
    >
      <Mark state={cell.cell} player={cell.player} />
    </button>
  {/each}
</div>
