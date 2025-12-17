<script setup lang="ts">
type Props = {
  markState: "empty" | "mark" | "dead";
  player: "player1" | "player2" | "computer" | null;
  nro: number;
};

const props = defineProps<Props>();
</script>

<template>
  <svg
    v-if="markState !== 'empty' && player === 'player1'"
    :data-nro="nro"
    :data-player="player"
    :data-type="markState"
    class="fill-primary h-full w-full p-px"
    :class="{ 'opacity-40': markState === 'dead' }"
    viewBox="0 0 64 64"
  >
    <path
      d="M32,16c8.82,0,16,7.18,16,16s-7.18,16-16,16-16-7.18-16-16,7.18-16,16-16M32,0C14.33,0,0,14.33,0,32s14.33,32,32,32,32-14.33,32-32S49.67,0,32,0h0Z"
    />
  </svg>
  <svg
    v-else-if="markState !== 'empty' && player !== 'player1'"
    :data-nro="nro"
    :data-player="player"
    :data-type="markState"
    class="text-secondary h-full w-full p-px"
    :class="{ 'opacity-40': markState === 'dead' }"
    viewBox="0 0 64 64"
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
  </svg>
  <div v-else data-type="empty"></div>
</template>
