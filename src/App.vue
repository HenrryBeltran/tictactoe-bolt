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
  <RouterView v-slot="{ Component }">
    <Transition name="appear" mode="out-in">
      <Component :is="Component" :key="$route.path" />
    </Transition>
  </RouterView>
</template>

<style scoped>
.appear-leave-active,
.appear-enter-active {
  transition-property: transform, opacity;
  transition-duration: 0.24s;
  transition-timing-function: linear(
    0,
    0.012 0.9%,
    0.05 2%,
    0.411 9.2%,
    0.517 11.8%,
    0.611 14.6%,
    0.694 17.7%,
    0.765 21.1%,
    0.824 24.8%,
    0.872 28.9%,
    0.91 33.4%,
    0.939 38.4%,
    0.977 50.9%,
    0.994 68.4%,
    1
  );
}

.appear-enter-from,
.appear-leave-to {
  transform: translateY(6%);
  opacity: 0;
}
</style>
