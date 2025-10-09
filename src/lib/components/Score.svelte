<script lang="ts">
  import { getPlayersName, getScores, playerAction } from "$lib/store.svelte";
  import { Modal } from "$lib/components/ui";

  type Props = {
    scoreOf: "player1" | "player2" | "computer";
  };

  let { scoreOf }: Props = $props();

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
  <div class="flex h-full items-center rounded-full bg-neutral-100 shadow-xl shadow-neutral-600/5">
    <div class="@container flex-1 pr-2 pl-4">
      <span class="text-[min(1rem,13.5cqi)] leading-none font-semibold">
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
      data-player={scoreOf}
      class="m-2 flex h-8 min-h-8 w-12 min-w-12 items-center justify-center rounded-full bg-rose-300/75 data-[player=player1]:bg-sky-300/75"
    >
      <span
        data-player={scoreOf}
        class="leading-none font-bold text-rose-800 data-[player=player1]:text-sky-800"
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
      }}
      aria-label="edit-name"
      class="absolute -bottom-8 -left-4 flex h-12 w-12 items-center justify-center rounded-full"
    >
      <div
        data-player={scoreOf}
        class="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 shadow-xl shadow-neutral-600/10 data-[player=player1]:bg-sky-500"
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

<Modal bind:showModal={showEditPlayerModal}>
  {#snippet header()}
    <h3>Edit name</h3>
  {/snippet}
  <form>
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
    />
    <button onclick={() => updatePlayerName(isPlayer1OrPlayer2)}>Save</button>
  </form>
</Modal>
