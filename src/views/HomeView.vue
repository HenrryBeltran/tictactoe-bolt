<script setup lang="ts">
import { RouterLink } from "vue-router";
import Container from "@/components/ui/Container.vue";
import { playSoundFX } from "@/lib/sound";
import { motion } from "motion-v";
import { springGlideTransition, springBouncyTransition } from "@/lib/transitions";

function handleClick() {
  playSoundFX().positiveAction();
}
</script>

<template>
  <Container>
    <div class="flex w-full flex-1 flex-col justify-center">
      <header class="@container">
        <h1 class="text-center text-[min(6rem,18cqi)] leading-none font-bold tracking-tighter">
          <motion.span
            class="text-primary inline-block"
            :initial="{ opacity: 0, y: '-100%' }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="springGlideTransition"
            >Tic</motion.span
          >&nbsp;<motion.span
            class="text-secondary inline-block"
            :initial="{ opacity: 0, y: '-100%' }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.2, ...springGlideTransition }"
            >Tac</motion.span
          >&nbsp;<motion.span
            class="text-primary inline-block"
            :initial="{ opacity: 0, y: '-100%' }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.4, ...springGlideTransition }"
            >Toe</motion.span
          >
        </h1>
        <motion.h2
          class="text-subtext1 float-end inline-block origin-center text-end text-[min(2rem,7cqi)] font-semibold tracking-tight"
          :initial="{ opacity: 0, scale: 1.5, rotateZ: 40 }"
          :animate="{ opacity: 1, scale: 1, rotateZ: 0 }"
          :transition="{ delay: 0.4, ...springBouncyTransition }"
          >Bolt Edition</motion.h2
        >
      </header>
      <div class="mt-16">
        <div class="flex flex-col gap-4">
          <motion.template
            :initial="{ opacity: 0, scale: 0.8 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ delay: 0.2, ...springGlideTransition }"
          >
            <RouterLink
              to="/pvp"
              @click="handleClick()"
              class="bg-mantle flex max-h-12 min-h-12 items-center justify-center rounded-full font-semibold tracking-tight"
            >
              Player vs Player</RouterLink
            >
          </motion.template>
          <motion.template
            :initial="{ opacity: 0, scale: 0.8 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ delay: 0.3, ...springGlideTransition }"
          >
            <RouterLink
              to="/pvc"
              @click="handleClick()"
              class="bg-mantle flex max-h-12 min-h-12 items-center justify-center rounded-full font-semibold tracking-tight"
            >
              Player vs Computer</RouterLink
            >
          </motion.template>
        </div>
      </div>
    </div>
    <footer class="text-subtext1 justify-self-end py-6 text-center text-sm">
      &copy; 2025 Code and design by
      <a href="https://henrry.site" @click="handleClick()" target="_blank" class="underline-offset-2 hover:underline"
        >Henrry Beltran</a
      >
    </footer>
  </Container>
</template>
