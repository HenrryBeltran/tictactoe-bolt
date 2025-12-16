<script setup lang="ts">
import Navbar from "@/components/ui/Navbar.vue";
</script>

<template>
  <Navbar>
    <h1
      class="text-center text-[min(1.5rem,8cqi)] leading-none font-bold tracking-tighter"
      :class="{
        'text-primary': 'player1' === 'player1',
        'text-secondary': 'player1' !== 'player1',
      }"
    >
      <!-- get winner -->
      <template v-if="false">{{ "Player 1" }} wins!</template>
      <!-- if the route is pvp should display player 2 turn instead of computer -->
      <template v-else-if="false">{{ "Player 2" }} wins!</template>
      <!-- if cpu is thinking then is computer's turn -->
      <template v-else-if="false">Turn of Computer 🧠</template>
      <!-- displays the players name -->
      <template v-else>Turn of {{ "Player 1" }}</template>
    </h1>
  </Navbar>
  <RouterView />
</template>
