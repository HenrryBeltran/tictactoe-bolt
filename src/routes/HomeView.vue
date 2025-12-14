<script setup lang="ts">
  import { RouterLink } from "vue-router";
</script>

<template>
  <h1>Home</h1>
  <div>
    <div>
      <RouterLink to="/pvp">Player vs Player</RouterLink>
    </div>
    <div>
      <RouterLink to="/pvc">Player vs Computer</RouterLink>
    </div>
  </div>
</template>
