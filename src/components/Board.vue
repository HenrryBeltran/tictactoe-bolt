<script setup lang="ts">
import { getBoardState, getGameState, NRO_CELLS, playerAction } from "@/lib/store";
import Mark from "./Mark.vue";
import { onUnmounted } from "vue";

onUnmounted(() => {
  playerAction().clearGame();
});

function clickCell(index: number) {
  const { blocked } = playerAction().placeMark(index);

  if (blocked && getGameState.value === "restarting") {
    console.log("~ Go for quick restart");
    playerAction().quickRestart();
    return;
  }

  if (blocked) {
    console.log("Cell block!");
    const btnCells = document.querySelectorAll(".cell") as NodeListOf<HTMLElement>;

    for (let i = 0; i < NRO_CELLS; i++) {
      const cellNro = Number(btnCells[i]?.getAttribute("data-nro"));
      if (cellNro === index) {
        console.log("Shake Effect", cellNro);
      }
    }

    return;
  }
}
</script>

<template>
  <div
    class="bg-mantle mx-auto mt-20 grid aspect-square h-full w-full grid-cols-3 grid-rows-3 gap-[2.61%] rounded-[13%] p-[7.83%] shadow-xl shadow-neutral-600/5"
  >
    <button
      v-for="(cell, i) in getBoardState"
      :data-nro="i"
      :disabled="getGameState === 'cpu_thinking'"
      :aria-disabled="getGameState === 'cpu_thinking' ? true : undefined"
      class="cell bg-base-color flex items-center justify-center rounded-[20%] p-[10%]"
      :class="{
        'pointer-events-none': getGameState === 'cpu_thinking',
        'pointer-events-auto': getGameState !== 'cpu_thinking',
      }"
      @click="clickCell(i)"
    >
      <Mark :mark-state="cell.cell" :player="cell.player" :nro="i" />
    </button>
  </div>
</template>
