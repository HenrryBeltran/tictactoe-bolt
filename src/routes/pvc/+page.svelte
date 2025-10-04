<script lang="ts">
  import { Board } from "$lib/components";
  import { Container, Header, Modal } from "$lib/components/ui";
  import {
    getCurrentPlayerName,
    getScores,
    getPlayersName,
    getCurrentPlayerTurn,
    playerAction,
    getWinner,
    getGameState,
  } from "$lib/store.svelte";

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
    playerAction().editName(newName, player);
    if (inputEl === undefined) return;

    if (player === "player1") inputEl.value = getPlayersName().player1();
    else if (player === "player2") inputEl.value = getPlayersName().player2();

    showEditPlayerModal = false;
  }
</script>

<Header>
  {#snippet title()}
    <h1>Player 1 vs Computer</h1>
  {/snippet}
</Header>
<Container>
  <h2
    data-player={getCurrentPlayerTurn()}
    class="mb-4 text-center text-2xl font-bold data-[player=computer]:text-rose-500 data-[player=player1]:text-sky-400"
  >
    {#if getWinner() !== null}
      {getPlayersName().byAlias(getWinner()!)} wins!
    {:else if getGameState() === "cpu_thinking"}
      Turn of Computer 🧠
    {:else}
      Turn of {getCurrentPlayerName()}
    {/if}
  </h2>
  <Board />
  <div class="flex justify-between">
    <div class="flex flex-col">
      <span>Score {getScores().player1()}</span>
      <span>{getPlayersName().player1()}</span>
      <button
        onclick={() => {
          showEditPlayerModal = true;
          isPlayer1OrPlayer2 = "player1";
        }}>Edit name</button
      >
    </div>
    <div class="flex flex-col">
      <span>Score {getScores().computer()}</span>
      <span>{getPlayersName().computer()}</span>
    </div>
  </div>
</Container>

<Modal bind:showModal={showEditPlayerModal}>
  {#snippet header()}
    <h3>Edit name</h3>
  {/snippet}
  <!-- svelte-ignore a11y_autofocus -->
  {#if isPlayer1OrPlayer2 === "player1"}
    <input
      bind:this={inputEl}
      autofocus
      type="text"
      oninput={handleInput}
      value={getPlayersName().player1()}
    />
    <button type="button" onclick={() => updatePlayerName("player1")}>Save</button>
  {:else}
    <input
      bind:this={inputEl}
      autofocus
      type="text"
      oninput={handleInput}
      value={getPlayersName().player2()}
    />
    <button type="button" onclick={() => updatePlayerName("player2")}>Save</button>
  {/if}
</Modal>
