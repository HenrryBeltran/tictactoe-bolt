<script setup lang="ts">
import { playSoundFX } from "@/lib/sound";
import { playerAction } from "@/lib/store";
import { springLazyTransition } from "@/lib/transitions";
import { motion } from "motion-v";

function resetBoard() {
  playerAction().clearGame();
  playSoundFX().positiveAction();
}
</script>

<template>
  <motion.button
    @click="resetBoard()"
    aria-label="reset-scores"
    class="text-subtext0 hover:bg-surface0 hover:text-subtext1 flex h-12 w-12 items-center justify-center rounded-[1.25rem] transition-colors duration-180"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ delay: 0.5, ...springLazyTransition }"
  >
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" class="h-6 w-6">
      <path
        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.0413 2 17.7655 3.35767 19.5996 5.5"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="vector-effect: non-scaling-stroke"
      />
      <path
        d="M20 2.5V6H16.5"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="vector-effect: non-scaling-stroke"
      />
    </svg>
  </motion.button>
</template>
