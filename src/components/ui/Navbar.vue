<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import { useRoute } from "vue-router";
  import { ref, watchEffect } from "vue";

  const route = useRoute();

  const width = ref(80); // Initial width in px (matches your original w-20)

  // Effect: Update width on route changes
  watchEffect(() => {
    if (route.path === "/") {
      width.value = 80;
    } else {
      width.value = document.documentElement.clientWidth - 48;
    }
  });

  // Effect: Handle window resizes (only when not on '/')
  watchEffect(() => {
    const handleResize = () => {
      if (route.path !== "/") {
        width.value = document.documentElement.clientWidth - 48;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
</script>

<template>
  <nav
    class="bg-mantle absolute top-6 left-[calc(100%-20px)] h-12 w-20 origin-right -translate-x-full rounded-full shadow-xl shadow-neutral-600/5 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
    :style="`width: ${width}px;`"
  >
    <div class="flex h-full items-center justify-between px-5">
      <RouterLink
        v-if="route.path !== '/'"
        to="/"
        class="flex w-10 items-center justify-center self-stretch"
        aria-label="go-back-link"
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%" class="h-8 w-8 stroke-rose-500" fill="none">
          <path
            d="M5.5 12.002H19"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="vector-effect: non-scaling-stroke"
          />
          <path
            d="M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="vector-effect: non-scaling-stroke"
          />
        </svg>
      </RouterLink>
      <div v-else></div>
      <div class="@container flex h-full w-full items-center justify-center">
        <slot />
      </div>
      <button aria-label="hamburger-menu" class="self-stretch px-2">
        <svg class="h-5 w-6" viewBox="0 0 24 20">
          <line
            x1="2"
            y1="2"
            x2="22"
            y2="2"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="4px"
            fill="none"
          />
          <line
            x1="2"
            y1="10"
            x2="22"
            y2="10"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="4px"
            fill="none"
          />
          <line
            x1="2"
            y1="18"
            x2="22"
            y2="18"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="4px"
            fill="none"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>
