<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import Modal from "./ui/Modal.vue";
import { getScores } from "@/lib/store";

type Props = {
  scoreOf: "player1" | "player2" | "computer";
};

const props = defineProps<Props>();

const inputName = ref("");
const modalRef = useTemplateRef("modalRef");
const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}
</script>

<template>
  <div class="relative flex h-12 w-full flex-col">
    <div class="bg-mantle flex h-full items-center rounded-full shadow-xl shadow-neutral-600/5">
      <div class="flex-1 overflow-hidden pl-4 leading-none">
        <span class="text-[0.8125rem] leading-none font-semibold tracking-tight wrap-break-word sm:text-base">
          <template v-if="scoreOf === 'player1'">Player 1</template>
          <template v-else-if="scoreOf === 'player2'">Player 2</template>
          <template v-else>Computer</template>
        </span>
      </div>
      <div
        class="m-2 flex h-8 min-h-8 w-12 min-w-12 items-center justify-center rounded-full"
        :class="{
          'bg-primary-back': scoreOf === 'player1',
          'bg-secondary-back': scoreOf !== 'player1',
        }"
      >
        <span
          class="leading-none font-bold"
          :class="{
            'text-primary-front': scoreOf === 'player1',
            'text-secondary-front': scoreOf !== 'player1',
          }"
        >
          <template v-if="scoreOf === 'player1'">{{ Math.min(getScores().player1.value, 999) }}</template>
          <template v-else-if="scoreOf === 'player2'">{{ Math.min(getScores().player2.value, 999) }}</template>
          <template v-else>{{ Math.min(getScores().computer.value, 999) }}</template>
        </span>
      </div>
    </div>
    <button
      v-if="scoreOf !== 'computer'"
      @click="openModal()"
      aria-label="edit-name"
      class="absolute -bottom-8 -left-4 flex h-12 w-12 items-center justify-center rounded-full"
    >
      <div
        class="flex h-8 w-8 items-center justify-center rounded-full shadow-xl shadow-neutral-600/10"
        :class="{
          'bg-primary': scoreOf === 'player1',
          'bg-secondary': scoreOf !== 'player1',
        }"
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%" class="text-text-alt-color mb-px h-5 w-5" fill="none">
          <path
            d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
            style="vector-effect: non-scaling-stroke"
          ></path>
          <path
            d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="vector-effect: non-scaling-stroke"
          ></path>
        </svg>
      </div>
    </button>
  </div>

  <Modal
    :ref="modalRef"
    :isOpen="isModalOpen"
    @close="closeModal()"
    class="bg-mantle fixed top-1/3 left-1/2 max-w-md -translate-1/2 rounded-4xl shadow-2xl"
  >
    <div class="w-full p-4">
      <h3 class="text-text-color text-center text-lg leading-none font-bold tracking-tight">Edit Name</h3>
      <form method="dialog" class="mt-4">
        <input
          autofocus
          type="text"
          minlength="1"
          maxlength="12"
          v-model="inputName"
          class="bg-base-color text-text-color rounded-full px-3 py-1.5 font-semibold outline-offset-2 focus-visible:outline-2"
          :class="{
            'outline-primary': scoreOf === 'player1',
            'outline-secondary': scoreOf !== 'player1',
          }"
        />
        <div class="mt-4 grid grid-cols-2 gap-4">
          <button
            type="button"
            @click="closeModal()"
            class="bg-negative-btn hover:bg-negative-btn-hover rounded-full py-1.5 font-bold tracking-tight text-white outline-offset-2 focus-visible:outline-2"
            :class="{
              'outline-primary': scoreOf === 'player1',
              'outline-secondary': scoreOf !== 'player1',
            }"
          >
            Close
          </button>
          <button
            @click="() => console.log('Save Input Name', inputName)"
            class="rounded-full py-1.5 font-bold tracking-tight text-white outline-offset-2 focus-visible:outline-2"
            :class="{
              'bg-positive0-btn': scoreOf === 'player1',
              'bg-positive1-btn': scoreOf !== 'player1',
              'hover:bg-positive0-btn-hover': scoreOf === 'player1',
              'hover:bg-positive1-btn-hover': scoreOf !== 'player1',
              'outline-primary': scoreOf === 'player1',
              'outline-secondary': scoreOf !== 'player1',
            }"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>
