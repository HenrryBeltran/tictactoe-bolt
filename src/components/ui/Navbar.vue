<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { onWatcherCleanup, ref, useTemplateRef, watch } from "vue";
import Modal from "./Modal.vue";
import InputRadioColorTheme from "./InputRadioColorTheme.vue";
import { getComputersLevel, playerAction, type ComputerDifficulty } from "@/lib/store";
import { isSoundOn, playSoundFX, toggleSoundFX } from "@/lib/sound";
import { changeColorTheme, getCurrenetColorTheme, type ColorThemes } from "@/lib/theme";

const route = useRoute();

const width = ref(80);
const modalRef = useTemplateRef("modalRef");
const isModalOpen = ref(false);

watch(
  () => route.path,
  () => {
    const handleResize = () => {
      if (route.path !== "/") {
        width.value = document.documentElement.clientWidth - 48;
      }
    };

    if (route.path === "/") {
      width.value = 80;
    }
    handleResize();

    window.addEventListener("resize", handleResize);

    onWatcherCleanup(() => {
      window.removeEventListener("resize", handleResize);
    });
  },
);

function switchSound() {
  toggleSoundFX();
  playSoundFX().positiveAction();
}

function changeComputerDifficulty(difficulty: ComputerDifficulty) {
  playerAction().changeComputerDifficulty(difficulty);
  playSoundFX().positiveAction();
}

function handleChangeColorTheme(theme: ColorThemes) {
  changeColorTheme(theme);
  playSoundFX().positiveAction();
}

function goToHome() {
  playSoundFX().button();
}

function openModal() {
  isModalOpen.value = true;
  playSoundFX().button();
  playSoundFX().swipeUI();
}

function closeModal() {
  isModalOpen.value = false;
}

function handleClickCloseButton() {
  isModalOpen.value = false;
  playSoundFX().button();
  playSoundFX().swipeUI();
}
</script>

<template>
  <nav
    class="bg-mantle absolute top-6 left-[calc(100%-20px)] h-12 w-20 origin-right -translate-x-full rounded-full shadow-xl shadow-neutral-600/5 transition-[width] duration-500 ease-in-out"
    :style="`width: ${width}px;`"
  >
    <div class="flex h-full items-center justify-between px-5">
      <RouterLink
        v-if="route.path !== '/'"
        @click="goToHome()"
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
      <button @click="openModal()" aria-label="menu-button" class="self-stretch px-2">
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

  <Modal
    :ref="modalRef"
    :isOpen="isModalOpen"
    @close="closeModal()"
    class="bg-mantle fixed top-0 left-full min-h-dvh w-[50vw] min-w-xs -translate-x-full rounded-l-3xl shadow-2xl"
  >
    <div class="text-text-color relative w-full space-y-4 p-6">
      <button
        class="absolute top-0 right-0 mt-7.75 mr-11.75 outline-none"
        @click="handleClickCloseButton()"
        aria-label="close-options-modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="100%"
          height="100%"
          color="currentColor"
          fill="none"
          class="h-8 w-8"
        >
          <path
            d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="vector-effect: non-scaling-stroke"
          ></path>
        </svg>
      </button>
      <div class="space-y-1.5">
        <h3>SOUND</h3>
        <div>
          <input
            id="sound-input"
            type="checkbox"
            @click="switchSound()"
            :checked="isSoundOn"
            hidden
            class="peer hidden"
          />
          <label
            for="sound-input"
            class="inline-block w-18 rounded-full px-3 py-1.5 text-center font-semibold"
            :class="{
              'text-crust': isSoundOn,
              'text-text-color': !isSoundOn,
              'bg-primary': isSoundOn,
              'bg-base-color': !isSoundOn,
            }"
          >
            {{ isSoundOn ? "ON" : "OFF" }}
          </label>
        </div>
      </div>
      <div class="max-w-md space-y-1.5">
        <h3>COMPUTER DIFFICULTY</h3>
        <div class="grid grid-cols-3 gap-1.5">
          <div>
            <input
              id="easy"
              type="radio"
              name="cpu-difficulty"
              value="easy"
              @click="changeComputerDifficulty('easy')"
              :checked="getComputersLevel === 'easy'"
              hidden
              class="peer hidden"
            />
            <label
              for="easy"
              class="flex items-center justify-center rounded-full py-1.5 font-semibold tracking-tight"
              :class="{
                'text-crust': getComputersLevel === 'easy',
                'text-text-color': getComputersLevel !== 'easy',
                'bg-primary': getComputersLevel === 'easy',
                'bg-base-color': getComputersLevel !== 'easy',
              }"
              >Easy</label
            >
          </div>
          <div>
            <input
              id="medium"
              type="radio"
              name="cpu-difficulty"
              value="medium"
              @click="changeComputerDifficulty('medium')"
              :checked="getComputersLevel === 'medium'"
              hidden
              class="peer hidden"
            />
            <label
              for="medium"
              class="flex items-center justify-center rounded-full py-1.5 font-semibold tracking-tight"
              :class="{
                'text-crust': getComputersLevel === 'medium',
                'text-text-color': getComputersLevel !== 'medium',
                'bg-primary': getComputersLevel === 'medium',
                'bg-base-color': getComputersLevel !== 'medium',
              }"
              >Medium</label
            >
          </div>
          <div>
            <input
              id="hard"
              type="radio"
              name="cpu-difficulty"
              value="hard"
              @click="changeComputerDifficulty('hard')"
              :checked="getComputersLevel === 'hard'"
              hidden
              class="peer hidden"
            />
            <label
              for="hard"
              class="flex items-center justify-center rounded-full py-1.5 font-semibold tracking-tight"
              :class="{
                'text-crust': getComputersLevel === 'hard',
                'text-text-color': getComputersLevel !== 'hard',
                'bg-primary': getComputersLevel === 'hard',
                'bg-base-color': getComputersLevel !== 'hard',
              }"
              >Hard</label
            >
          </div>
        </div>
      </div>
      <div class="max-w-md space-y-1.5">
        <h3>COLOR THEME</h3>
        <div class="space-y-1.5">
          <InputRadioColorTheme
            id="default-light"
            name="radio-theme"
            value="default-light"
            :modelValue="getCurrenetColorTheme"
            @updateTheme="handleChangeColorTheme('default-light')"
            >Default Light</InputRadioColorTheme
          >
          <InputRadioColorTheme
            id="default-dark"
            name="radio-theme"
            value="default-dark"
            :modelValue="getCurrenetColorTheme"
            @updateTheme="handleChangeColorTheme('default-dark')"
            >Default Dark</InputRadioColorTheme
          >
          <InputRadioColorTheme
            id="catppuccin-macchiato"
            name="radio-theme"
            value="catppuccin-macchiato"
            :modelValue="getCurrenetColorTheme"
            @updateTheme="handleChangeColorTheme('catppuccin-macchiato')"
            >Catppuccin Macchiato</InputRadioColorTheme
          >
          <InputRadioColorTheme
            id="dracula"
            name="radio-theme"
            value="dracula"
            :modelValue="getCurrenetColorTheme"
            @updateTheme="handleChangeColorTheme('dracula')"
            >Dracula</InputRadioColorTheme
          >
          <InputRadioColorTheme
            id="dark-mono"
            name="radio-theme"
            value="dark-mono"
            :modelValue="getCurrenetColorTheme"
            @updateTheme="handleChangeColorTheme('dark-mono')"
            >Dark Mono</InputRadioColorTheme
          >
          <InputRadioColorTheme
            id="everforest"
            name="radio-theme"
            value="everforest"
            :modelValue="getCurrenetColorTheme"
            @updateTheme="handleChangeColorTheme('everforest')"
            >Everforest</InputRadioColorTheme
          >
        </div>
      </div>
    </div>
  </Modal>
</template>
