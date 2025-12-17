<script setup lang="ts">
import { RouterLink } from "vue-router";
import Container from "@/components/ui/Container.vue";
import { playSoundFX } from "@/lib/sound";

function handleClick() {
  playSoundFX().positiveAction();
}
</script>

<template>
  <Container>
    <div class="flex w-full flex-1 flex-col justify-center">
      <header class="@container">
        <h1 class="text-center text-[min(6rem,18cqi)] leading-none font-bold tracking-tighter">
          <span class="text-primary">Tic</span>&nbsp;<span class="text-secondary">Tac</span>&nbsp;<span
            class="text-primary"
            >Toe</span
          >
        </h1>
        <h2 class="text-subtext1 text-end text-[min(2rem,7cqi)] font-semibold tracking-tight">Bolt Edition</h2>
      </header>
      <div class="mt-16">
        <div class="flex flex-col gap-4">
          <RouterLink
            to="/pvp"
            @click="handleClick()"
            class="bg-mantle flex max-h-12 min-h-12 items-center justify-center rounded-full font-semibold tracking-tight"
          >
            Player vs Player</RouterLink
          >
          <RouterLink
            to="/pvc"
            @click="handleClick()"
            class="bg-mantle flex max-h-12 min-h-12 items-center justify-center rounded-full font-semibold tracking-tight"
          >
            Player vs Computer</RouterLink
          >
        </div>
      </div>
    </div>
  </Container>
  <footer class="text-subtext1 justify-self-end py-6 text-center text-sm">
    &copy; 2025 Code and design by
    <a href="https://henrry.site" @click="handleClick()" target="_blank" class="underline-offset-2 hover:underline"
      >Henrry Beltran</a
    >
  </footer>
</template>
