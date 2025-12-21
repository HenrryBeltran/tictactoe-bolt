<script setup lang="ts">
import { springHardBounceTransition, springQuickGlideTransition } from "@/lib/transitions";
import { animate, motion } from "motion-v";
import { watch } from "vue";

type Props = {
  markState: "empty" | "mark" | "dead";
  player: "player1" | "player2" | "computer" | null;
  nro: number;
};

const props = defineProps<Props>();

watch(
  () => props.markState,
  () => {
    if (props.markState === "dead" && props.player === "player1") {
      animate(`#${props.player}-${props.nro}`, { opacity: 0.4 }, springHardBounceTransition);
    } else if (props.markState === "dead" && props.player !== "player1") {
      animate(`#${props.player}-${props.nro}`, { opacity: 0.4 }, springHardBounceTransition);
    }
  },
);
</script>

<template>
  <motion.svg
    :id="player + '-' + nro"
    v-if="markState !== 'empty' && player === 'player1'"
    :data-nro="nro"
    :data-player="player"
    :data-type="markState"
    class="fill-primary h-full w-full p-px"
    :class="{ 'opacity-40': markState === 'dead' }"
    viewBox="0 0 64 64"
    :initial="{ opacity: 0, scale: 2, y: '-100%' }"
    :animate="{ opacity: 1, scale: 1, y: 0 }"
    :transition="springQuickGlideTransition"
  >
    <path
      d="M32,16c8.82,0,16,7.18,16,16s-7.18,16-16,16-16-7.18-16-16,7.18-16,16-16M32,0C14.33,0,0,14.33,0,32s14.33,32,32,32,32-14.33,32-32S49.67,0,32,0h0Z"
    />
  </motion.svg>
  <motion.svg
    :id="player + '-' + nro"
    v-else-if="markState !== 'empty' && player !== 'player1'"
    :data-nro="nro"
    :data-player="player"
    :data-type="markState"
    class="text-secondary h-full w-full p-px"
    :class="{ 'opacity-40': markState === 'dead' }"
    viewBox="0 0 64 64"
    :initial="{ opacity: 0, scale: 2, y: '-100%' }"
    :animate="{ opacity: 1, scale: 1, y: 0 }"
    :transition="springQuickGlideTransition"
  >
    <line
      x1="8"
      y1="8"
      x2="56"
      y2="56"
      stroke="currentColor"
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
      stroke="currentColor"
      stroke-width="16px"
      stroke-miterlimit="10"
      stroke-linecap="round"
      fill="none"
    />
  </motion.svg>
  <div v-else data-type="empty"></div>
</template>
