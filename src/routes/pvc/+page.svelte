<script lang="ts">
  import { Board, Score } from "$lib/components";
  import { ClearGameButton, Container, Navbar } from "$lib/components/ui";
  import {
    getCurrentPlayerName,
    getPlayersName,
    getCurrentPlayerTurn,
    getWinner,
    getGameState,
  } from "$lib/store.svelte";
</script>

<Navbar>
  {#snippet title()}
    <h1
      class="text-center text-[min(1.5rem,8cqi)] leading-none font-bold"
      class:text-primary={getCurrentPlayerTurn() === "player1"}
      class:text-secondary={getCurrentPlayerTurn() !== "player1"}
    >
      {#if getWinner() !== null}
        {getPlayersName().byAlias(getWinner()!)} wins!
      {:else if getGameState() === "cpu_thinking"}
        Turn of Computer 🧠
      {:else}
        Turn of {getCurrentPlayerName()}
      {/if}
    </h1>
  {/snippet}
</Navbar>
<Container>
  <Board />
  <div class="mt-6 grid grid-cols-2 gap-4">
    <Score scoreOf="player1" />
    <Score scoreOf="computer" />
  </div>
  <div class="mt-12 flex w-full items-center justify-center">
    <ClearGameButton />
  </div>
</Container>
