<script setup lang="ts">
import Navbar from "@/components/ui/Navbar.vue";
import {
  getCurrentPlayerTurnInPVC,
  getCurrentPlayerTurnInPVP,
  getCurrentPlayerNameInPVP,
  getCurrentPlayerNameInPVC,
  getPlayersName,
  getWinner,
} from "@/lib/store";
import { onMounted } from "vue";
import { setCSSColorVariables } from "@/lib/theme";

onMounted(() => {
  setCSSColorVariables();
});
</script>

<template>
  <Navbar>
    <h1
      class="text-center text-[min(1.5rem,8cqi)] leading-none font-bold tracking-tighter"
      :class="{
        'text-primary': getCurrentPlayerTurnInPVP === 'player1' || getCurrentPlayerTurnInPVC === 'player1',
        'text-secondary': getCurrentPlayerTurnInPVP !== 'player1' || getCurrentPlayerTurnInPVC !== 'player1',
      }"
    >
      <template v-if="getWinner.value === 'player1'">{{ getPlayersName().player1.value }} wins!</template>
      <template v-else-if="$route.path === '/pvp' && getWinner.value === 'player2'"
        >{{ getPlayersName().player2.value }} wins!</template
      >
      <template v-else-if="$route.path === '/pvc' && getWinner.value === 'computer'">Computer wins!</template>
      <template v-else
        >Turn of {{ $route.path === "/pvp" ? getCurrentPlayerNameInPVP : getCurrentPlayerNameInPVC }}</template
      >
    </h1>
  </Navbar>
  <RouterView />
</template>
