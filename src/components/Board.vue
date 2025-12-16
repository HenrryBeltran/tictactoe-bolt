<script setup lang="ts">
import Mark from "./Mark.vue";
import { ref } from "vue";

type Board = { cell: "empty" | "mark" | "dead"; player: null | "player1" | "player2" | "computer" }[];

const board = ref<Board>([
  { cell: "empty", player: null },
  { cell: "empty", player: null },
  { cell: "empty", player: null },
  { cell: "mark", player: "player1" },
  { cell: "empty", player: null },
  { cell: "mark", player: "player2" },
  { cell: "empty", player: null },
  { cell: "mark", player: "player1" },
  { cell: "empty", player: null },
]);
</script>

<template>
  <div
    class="bg-mantle mx-auto mt-20 grid aspect-square h-full w-full grid-cols-3 grid-rows-3 gap-[2.61%] rounded-[13%] p-[7.83%] shadow-xl shadow-neutral-600/5"
  >
    <button
      v-for="(cell, i) in board"
      :data-nro="i"
      class="cell bg-base-color flex items-center justify-center rounded-[20%] p-[10%]"
    >
      <Mark :mark-state="cell.cell" :player="cell.player" :nro="i" />
    </button>
  </div>
</template>
