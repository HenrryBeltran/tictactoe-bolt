<script lang="ts">
  import { Board, Score } from "$lib/components";
  import { Container, Navbar } from "$lib/components/ui";
  import {
    getCurrentPlayerName,
    getPlayersName,
    getCurrentPlayerTurn,
    getWinner,
    getGameState,
    playerAction,
  } from "$lib/store.svelte";
</script>

<Navbar>
  {#snippet title()}
    <h1
      data-player={getCurrentPlayerTurn()}
      class="text-center text-[min(1.5rem,8cqi)] leading-none font-bold data-[player=computer]:text-rose-500 data-[player=player1]:text-sky-400"
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
    <button
      onclick={() => playerAction().resetScores("pvp")}
      aria-label="reset-scores"
      class="flex h-12 w-12 items-center justify-center rounded-[1.25rem] text-neutral-400 hover:bg-neutral-400/40 hover:text-neutral-500"
    >
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" class="h-6 w-6">
        <path
          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.0413 2 17.7655 3.35767 19.5996 5.5"
          stroke="currentColor"
          stroke-width={4}
          stroke-linecap="round"
          stroke-linejoin="round"
          style="vector-effect: non-scaling-stroke;"
        />
        <path
          d="M20 2.5V6H16.5"
          stroke="currentColor"
          stroke-width={4}
          stroke-linecap="round"
          stroke-linejoin="round"
          style="vector-effect: non-scaling-stroke;"
        />
      </svg>
    </button>
  </div>
</Container>
