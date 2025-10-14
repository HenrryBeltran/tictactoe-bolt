<script lang="ts">
  import type { Snippet, SvelteComponent } from "svelte";
  import { Modal } from "$lib/components/ui";
  import { page } from "$app/state";
  import { changeColorTheme, getCurrenetColorTheme, type ColorThemes } from "$lib/theme.svelte";
  import InputRadioColorTheme from "./InputRadioColorTheme.svelte";
  import type { ClassValue } from "svelte/elements";
  import {
    getComputersLevel,
    getThereIsSound,
    playerAction,
    type ComputerDifficulty,
  } from "$lib/store.svelte";

  type Props = {
    title?: Snippet;
  };

  let { title }: Props = $props();

  let modal: SvelteComponent<{
    showModal?: boolean;
    header?: Snippet;
    children?: Snippet;
    class?: ClassValue;
  }> & { closeModal: () => void } & { $$bindings: "showModal" };
  let showOptionsModal = $state(false);

  function onChangeCPUDifficulty(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    playerAction().changeComputerDifficulty(e.currentTarget.value as ComputerDifficulty);
  }

  function onChangeTheme(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    changeColorTheme(e.currentTarget.value as ColorThemes);
  }
</script>

<nav
  class="absolute top-6 left-1/2 h-12 w-[calc(100%-48px)] -translate-x-1/2 rounded-full bg-neutral-100 shadow-xl shadow-neutral-600/5"
>
  <div class="flex h-full items-center justify-between px-5">
    {#if page.url.pathname !== "/"}
      <a
        href="/"
        class="flex w-10 items-center justify-center self-stretch"
        aria-label="go-back-link"
      >
        <svg
          viewBox="0 0 24 24"
          width="100%"
          height="100%"
          class="h-8 w-8 stroke-rose-500"
          fill="none"
        >
          <path
            d="M5.5 12.002H19"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="vector-effect: non-scaling-stroke;"
          />
          <path
            d="M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="vector-effect: non-scaling-stroke;"
          />
        </svg>
      </a>
    {:else}
      <div></div>
    {/if}
    <div class="@container flex h-full w-full items-center justify-center">
      {@render title?.()}
    </div>
    <button
      onclick={() => (showOptionsModal = !showOptionsModal)}
      aria-label="hamburger-menu"
      class="self-stretch px-2"
    >
      <svg class="h-5 w-6" viewBox="0 0 24 20">
        <line
          x1="2"
          y1="2"
          x2="22"
          y2="2"
          class="stroke-neutral-800"
          style="fill: none; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 4px;"
        />
        <line
          x1="2"
          y1="10"
          x2="22"
          y2="10"
          class="stroke-neutral-800"
          style="fill: none; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 4px;"
        />
        <line
          x1="2"
          y1="18"
          x2="22"
          y2="18"
          class="stroke-neutral-800"
          style="fill: none; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 4px;"
        />
      </svg>
    </button>
  </div>
</nav>

<Modal
  bind:this={modal}
  bind:showModal={showOptionsModal}
  className="fixed top-0 left-full min-h-dvh w-[50vw] min-w-xs -translate-x-full bg-neutral-500 shadow-2xl backdrop:bg-neutral-800/30 backdrop:backdrop-blur-lg"
>
  <div class="relative w-full space-y-4 p-6 text-white">
    <button
      class="absolute top-0 right-0 mt-7.75 mr-[calc(var(--spacing)*11.75)]"
      onclick={() => modal.closeModal()}
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
          style="vector-effect: non-scaling-stroke;"
        ></path>
      </svg>
    </button>
    <div class="space-y-1.5">
      <h3>SOUND</h3>
      <div>
        <input
          id="sound-input"
          type="checkbox"
          checked={getThereIsSound()}
          onchange={() => {
            playerAction().toggleSound();
          }}
          hidden
          class="peer hidden"
        />
        <label
          for="sound-input"
          class="inline-block w-18 rounded-full bg-neutral-600 px-3 py-1.5 text-center peer-checked:bg-sky-500"
          >{getThereIsSound() ? "ON" : "OFF"}</label
        >
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
            checked={getComputersLevel() === "easy"}
            onchange={onChangeCPUDifficulty}
            hidden
            class="peer hidden"
          />
          <label
            for="easy"
            class="flex items-center justify-center rounded-full bg-neutral-600 py-1.5 tracking-tight peer-checked:bg-sky-500"
            >Easy</label
          >
        </div>
        <div>
          <input
            id="medium"
            type="radio"
            name="cpu-difficulty"
            value="medium"
            checked={getComputersLevel() === "medium"}
            onchange={onChangeCPUDifficulty}
            hidden
            class="peer hidden"
          />
          <label
            for="medium"
            class="flex items-center justify-center rounded-full bg-neutral-600 py-1.5 tracking-tight peer-checked:bg-sky-500"
            >Medium</label
          >
        </div>
        <div>
          <input
            id="hard"
            type="radio"
            name="cpu-difficulty"
            value="hard"
            checked={getComputersLevel() === "hard"}
            onchange={onChangeCPUDifficulty}
            hidden
            class="peer hidden"
          />
          <label
            for="hard"
            class="flex items-center justify-center rounded-full bg-neutral-600 py-1.5 tracking-tight peer-checked:bg-sky-500"
            >Hard</label
          >
        </div>
      </div>
    </div>
    <div class="max-w-md space-y-1.5">
      <h3>COLOR THEME</h3>
      <div class="space-y-1.5">
        <InputRadioColorTheme
          value="default-light"
          themeRadio={getCurrenetColorTheme()}
          {onChangeTheme}>Default Light</InputRadioColorTheme
        >
        <InputRadioColorTheme
          value="default-dark"
          themeRadio={getCurrenetColorTheme()}
          {onChangeTheme}>Default Dark</InputRadioColorTheme
        >
        <InputRadioColorTheme
          value="catppuccin-frappe"
          themeRadio={getCurrenetColorTheme()}
          {onChangeTheme}>Catppuccin Frappe</InputRadioColorTheme
        >
        <InputRadioColorTheme value="dracula" themeRadio={getCurrenetColorTheme()} {onChangeTheme}
          >Dracula</InputRadioColorTheme
        >
        <InputRadioColorTheme value="dark-mono" themeRadio={getCurrenetColorTheme()} {onChangeTheme}
          >Dark Mono</InputRadioColorTheme
        >
        <InputRadioColorTheme
          value="everforest"
          themeRadio={getCurrenetColorTheme()}
          {onChangeTheme}>Everforest</InputRadioColorTheme
        >
      </div>
    </div>
  </div>
</Modal>
