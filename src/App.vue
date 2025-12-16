<script setup lang="ts">
import Navbar from "@/components/ui/Navbar.vue";
import { getCurrentPlayerName, getCurrentPlayerTurn, getGameState, getPlayersName, getWinner } from "@/lib/store";
</script>

<template>
  <Navbar>
    <h1
      class="text-center text-[min(1.5rem,8cqi)] leading-none font-bold tracking-tighter"
      :class="{
        'text-primary': getCurrentPlayerTurn === 'player1',
        'text-secondary': getCurrentPlayerTurn !== 'player1',
      }"
    >
      <template v-if="getWinner.value === 'player1'">{{ getPlayersName().player1.value }} wins!</template>
      <template v-else-if="$route.path === '/pvp' && getWinner.value === 'player2'"
        >{{ getPlayersName().player2.value }} wins!</template
      >
      <template v-else-if="$route.path === '/pvc' && getWinner.value === 'computer'">Computer wins!</template>
      <template v-else-if="$route.path === '/pvc' && getGameState === 'cpu_thinking'">Turn of Computer 🧠</template>
      <template v-else>Turn of {{ getCurrentPlayerName }}</template>
    </h1>
  </Navbar>
  <RouterView />
</template>
