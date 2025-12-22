<script setup lang="ts">
import Mark from "./Mark.vue";
import { getBoardState, getCurrentPlayerTurnInPVC, getGameState, NRO_CELLS, playerAction } from "@/lib/store";
import { onUnmounted, watchEffect } from "vue";
import { onTurnPVC } from "@/lib/computer";
import { playSoundFX } from "@/lib/sound";
import { animate, motion } from "motion-v";
import { springGlideTransition } from "@/lib/transitions";

onUnmounted(() => {
  playerAction().clearGame();
});

watchEffect(() => {
  onTurnPVC();
});

function clickCell(index: number) {
  const { blocked } = playerAction().placeMark(index);

  if (blocked && getGameState.value === "restarting") {
    console.log("~ Go for quick restart");
    playerAction().quickRestart();
    playSoundFX().denied();
    return;
  }

  if (blocked) {
    console.log("Cell block!");
    const btnCells = document.querySelectorAll(".cell") as NodeListOf<HTMLElement>;

    for (let i = 0; i < NRO_CELLS; i++) {
      const cellNro = Number(btnCells[i]?.getAttribute("data-nro"));
      if (cellNro === index) {
        animate(
          btnCells.item(i),
          {
            x: [0, -5, 5, -5, 5, 3, -3, 0],
            y: [0, 2, -2, -3, 3, -1, 1, 0],
          },
          {
            duration: 0.38,
            ease: "easeInOut",
          },
        );
      }
    }

    playSoundFX().denied();
    return;
  }

  playSoundFX().pop();
}
</script>

<template>
  <motion.div
    id="board"
    class="bg-mantle mx-auto mt-20 grid aspect-square h-full w-full grid-cols-3 grid-rows-3 gap-[2.61%] rounded-[13%] p-[7.83%] shadow-xl shadow-neutral-600/5"
    :initial="{ scale: 0.85 }"
    :animate="{ scale: 1 }"
    :transition="springGlideTransition"
  >
    <motion.button
      v-for="(cell, i) in getBoardState"
      :data-nro="i"
      :disabled="$route.path === '/pvc' && getCurrentPlayerTurnInPVC === 'computer'"
      :aria-disabled="$route.path === '/pvc' && getCurrentPlayerTurnInPVC === 'computer' ? true : false"
      class="cell bg-base-color flex items-center justify-center rounded-[20%] p-[10%]"
      :class="{
        'pointer-events-none': $route.path === '/pvc' && getCurrentPlayerTurnInPVC === 'computer',
        'pointer-events-auto': $route.path === '/pvc' && getCurrentPlayerTurnInPVC !== 'computer',
      }"
      @click="clickCell(i)"
      :initial="{ scale: 0 }"
      :animate="{ scale: 1 }"
      :transition="{ delay: 0 + 0.07 * i, ...springGlideTransition }"
    >
      <Mark :mark-state="cell.cell" :player="cell.player" :nro="i" />
    </motion.button>
  </motion.div>
</template>
