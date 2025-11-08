<script lang="ts">
  import { getPlayersName, getScores, playerAction } from "$lib/store.svelte";
  import { Modal } from "$lib/components/ui";
  import type { Snippet, SvelteComponent } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { getColors } from "$lib/theme.svelte";
  import { playSoundFX } from "$lib/sound.svelte";

  type Props = {
    scoreOf: "player1" | "player2" | "computer";
  };

  let { scoreOf }: Props = $props();

  let modal: SvelteComponent<{
    showModal?: boolean;
    header?: Snippet;
    children?: Snippet;
    class?: ClassValue;
  }> & { closeModal: () => void } & { $$bindings: "showModal" };
  let showEditPlayerModal = $state(false);
  let isPlayer1OrPlayer2 = $state<"player1" | "player2">("player1");
  let newName = $state("");
  let inputEl = $state<HTMLInputElement>();

  $effect(() => {
    if (inputEl === undefined) return;

    if (showEditPlayerModal) {
      const len = inputEl.value.length;
      newName = inputEl.value;
      inputEl.setSelectionRange(len, len);
    }
  });

  function handleInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    newName = e.currentTarget.value;
  }

  function updatePlayerName(player: "player1" | "player2") {
    if (newName.length < 1) {
      inputEl?.focus();
      console.log("Name has to be at least 1 character long");
      return;
    }
    if (newName.length > 12) {
      inputEl?.focus();
      console.log("Name cannot contain more than 12 character long");
      return;
    }

    playerAction().editName(newName, player);
    if (inputEl === undefined) return;

    if (player === "player1") inputEl.value = getPlayersName().player1();
    else if (player === "player2") inputEl.value = getPlayersName().player2();

    showEditPlayerModal = false;
  }
</script>

<div class="relative flex h-12 w-full flex-col">
  <div
    class="flex h-full items-center rounded-full shadow-xl shadow-neutral-600/5"
    style={`background-color: ${getColors().mantle}`}
  >
    <div class="flex-1 overflow-hidden pl-4 leading-none">
      <span
        class="text-[0.8125rem] leading-none font-semibold tracking-tight wrap-break-word sm:text-base"
      >
        {#if scoreOf === "player1"}
          {getPlayersName().player1()}
        {:else if scoreOf === "player2"}
          {getPlayersName().player2()}
        {:else}
          {getPlayersName().computer()}
        {/if}
      </span>
    </div>
    <div
      class="m-2 flex h-8 min-h-8 w-12 min-w-12 items-center justify-center rounded-full"
      style={`background-color: ${scoreOf === "player1" ? getColors().primaryLight : getColors().secondaryLight}`}
    >
      <span
        class="leading-none font-bold"
        style={`color: ${scoreOf === "player1" ? getColors().primaryDark : getColors().secondaryDark}`}
      >
        {#if scoreOf === "player1"}
          {Math.min(getScores().player1(), 999)}
        {:else if scoreOf === "player2"}
          {Math.min(getScores().player2(), 999)}
        {:else}
          {Math.min(getScores().computer(), 999)}
        {/if}
      </span>
    </div>
  </div>
  {#if scoreOf !== "computer"}
    <button
      onclick={() => {
        showEditPlayerModal = true;
        isPlayer1OrPlayer2 = scoreOf;
        playSoundFX().button();
      }}
      aria-label="edit-name"
      class="absolute -bottom-8 -left-4 flex h-12 w-12 items-center justify-center rounded-full"
    >
      <div
        class="flex h-8 w-8 items-center justify-center rounded-full shadow-xl shadow-neutral-600/10"
        style={`background-color: ${scoreOf === "player1" ? getColors().primary : getColors().secondary}`}
      >
        <svg
          viewBox="0 0 24 24"
          width="100%"
          height="100%"
          class="mb-px h-5 w-5 text-white"
          fill="none"
        >
          <path
            d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
            style="vector-effect: non-scaling-stroke;"
          ></path>
          <path
            d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="vector-effect: non-scaling-stroke;"
          ></path>
        </svg>
      </div>
    </button>
  {/if}
</div>

<Modal
  bind:this={modal}
  bind:showModal={showEditPlayerModal}
  className="fixed top-1/3 left-1/2 max-w-md -translate-1/2 rounded-4xl shadow-2xl backdrop:bg-neutral-600/30 backdrop:backdrop-blur-lg"
>
  <div class="w-full p-4">
    <h3 class="text-center text-lg leading-none font-bold tracking-tight">Edit Name</h3>
    <form method="dialog" class="mt-4">
      <!-- svelte-ignore a11y_autofocus -->
      <input
        bind:this={inputEl}
        autofocus
        type="text"
        minlength={1}
        maxlength={12}
        oninput={handleInput}
        value={isPlayer1OrPlayer2 === "player1"
          ? getPlayersName().player1()
          : getPlayersName().player2()}
        class="rounded-full px-3 py-1.5 font-semibold outline-offset-2 focus-visible:outline-2"
        style={`background-color: ${getColors().base}; outline-color: ${isPlayer1OrPlayer2 === "player1" ? getColors().primary : getColors().secondary}`}
      />
      <div class="mt-4 grid grid-cols-2 gap-4">
        <button
          type="button"
          onclick={() => {
            playSoundFX().button();
            modal.closeModal();
          }}
          class="rounded-full py-1.5 font-bold tracking-tight text-white outline-offset-2 focus-visible:outline-2"
          style={`background-color: ${getColors().negativeBtn}; outline-color: ${isPlayer1OrPlayer2 === "player1" ? getColors().primary : getColors().secondary}`}
          onpointerover={(e) => {
            e.currentTarget.style.backgroundColor = getColors().negativeBtnHover;
          }}
          onpointerleave={(e) => {
            e.currentTarget.style.backgroundColor = getColors().negativeBtn;
          }}>Close</button
        >
        <button
          onclick={() => {
            playSoundFX().positiveAction();
            updatePlayerName(isPlayer1OrPlayer2);
          }}
          class="rounded-full py-1.5 font-bold tracking-tight text-white outline-offset-2 focus-visible:outline-2"
          style={`background-color: ${isPlayer1OrPlayer2 === "player1" ? getColors().positive0Btn : getColors().positive1Btn}; outline-color: ${isPlayer1OrPlayer2 === "player1" ? getColors().primary : getColors().secondary}`}
          onpointerover={(e) => {
            e.currentTarget.style.backgroundColor =
              isPlayer1OrPlayer2 === "player1"
                ? getColors().positive0BtnHover
                : getColors().positive1BtnHover;
          }}
          onpointerleave={(e) => {
            e.currentTarget.style.backgroundColor =
              isPlayer1OrPlayer2 === "player1"
                ? getColors().positive0Btn
                : getColors().positive1Btn;
          }}>Save</button
        >
      </div>
    </form>
  </div>
</Modal>
