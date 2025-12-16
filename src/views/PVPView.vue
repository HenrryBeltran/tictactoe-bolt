<script setup lang="ts">
import Board from "@/components/Board.vue";
import Score from "@/components/Score.vue";
import ClearGameButton from "@/components/ClearGameButton.vue";
import Container from "@/components/ui/Container.vue";
</script>

<template>
  <Container>
    <Board />
    <div class="mt-6 grid grid-cols-2 gap-4">
      <Score score-of="player1" />
      <Score score-of="player2" />
    </div>
    <div class="mt-12 mb-8 flex w-full items-center justify-center sm:mb-0">
      <ClearGameButton />
    </div>
  </Container>
</template>
