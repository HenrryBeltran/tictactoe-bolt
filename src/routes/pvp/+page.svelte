<script lang="ts">
  import { getWinner, getPlayersName, getGameState } from "$lib/store.svelte";
  import { Board, Score } from "$lib/components";
  import { ClearGameButton, Container, Navbar } from "$lib/components/ui";
  import { getCurrentPlayerName, getCurrentPlayerTurn } from "$lib/store.svelte";
  import { getColors } from "$lib/theme.svelte";
</script>

<Navbar>
  {#snippet title()}
    <h1
      class="text-center text-[min(1.5rem,8cqi)] leading-none font-bold tracking-tighter"
      style={`color: ${getCurrentPlayerTurn() === "player1" ? getColors().primary : getColors().secondary}`}
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
    <Score scoreOf="player2" />
  </div>
  <div class="mt-12 mb-8 flex w-full items-center justify-center sm:mb-0">
    <ClearGameButton />
  </div>
</Container>
