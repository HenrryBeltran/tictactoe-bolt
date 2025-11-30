<script lang="ts">
  import { deniedPlayingShakeAnimation, winningAnimation } from "$lib/animations.svelte";
  import { Mark } from "$lib/components";
  import { onTurnPVC } from "$lib/computer.svelte";
  import { playSoundFX } from "$lib/sound.svelte";
  import {
    type BoardIndex,
    getBoardState,
    getGameState,
    getWinner,
    NRO_CELLS,
    playerAction,
  } from "$lib/store.svelte";
  import { onMount } from "svelte";

  let board = $state<HTMLDivElement>();

  function boardAction() {
    playerAction().quickRestart();
  }

  function touchCell(bIdx: BoardIndex) {
    const { blocked } = playerAction(bIdx).placeMark();
    if (blocked) {
      const btnCells = document.querySelectorAll(".cell") as NodeListOf<HTMLElement>;

      for (let i = 0; i < NRO_CELLS; i++) {
        const cellNro = Number(btnCells[i].getAttribute("data-nro"));
        if (cellNro === bIdx) {
          console.log("shake", cellNro);
          deniedPlayingShakeAnimation(btnCells[i]);
        }
      }

      playSoundFX().denied();
      return;
    }

    playSoundFX().pop();
  }

  onMount(() => {
    playerAction().clearGame();
  });

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

  $effect(() => {
    const winner = getWinner();
    if (winner !== null) {
      winningAnimation();
    }
  });
</script>

<div
  bind:this={board}
  class="mx-auto mt-20 grid aspect-square h-full w-full grid-cols-3 grid-rows-3 gap-[2.61%] rounded-[13%] bg-mantle p-[7.83%] shadow-xl shadow-neutral-600/5"
>
  {#each getBoardState() as cell, i}
    <button
      onclick={() => touchCell(i as BoardIndex)}
      data-nro={i}
      disabled={getGameState() === "restarting" || getGameState() === "cpu_thinking"}
      aria-disabled={getGameState() === "restarting" || getGameState() === "cpu_thinking"
        ? true
        : null}
      class="cell flex items-center justify-center rounded-[20%] bg-base-color p-[10%]"
      class:pointer-events-none={getGameState() === "restarting" ||
        getGameState() === "cpu_thinking"}
      class:pointer-events-auto={getGameState() !== "restarting" &&
        getGameState() !== "cpu_thinking"}
    >
      <Mark markState={cell.cell} player={cell.player} nro={i as BoardIndex} />
    </button>
  {/each}
</div>
