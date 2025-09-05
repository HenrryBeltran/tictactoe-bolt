<script lang="ts">
  import Board from "../../components/Board.svelte";
  import Container from "../../components/ui/Container.svelte";
  import { getCurrentPlayerName, currentPlayerTurn } from "$lib/store.svelte";
</script>

<main class="relative">
  <h1>Player 1 vs Player 2</h1>
  <Container>
    <h2
      data-player={currentPlayerTurn()}
      class="mb-4 text-center text-2xl font-bold data-[player=player1]:text-sky-400 data-[player=player2]:text-rose-500"
    >
      Turn of {getCurrentPlayerName()}
    </h2>
    <Board />
    <div class="flex justify-between">
      <div class="flex flex-col">
        <span>Score {"0"}</span>
        <span>Player 1</span>
      </div>
      <div class="flex flex-col">
        <span>Score {"0"}</span>
        <span>Player 2</span>
      </div>
    </div>
  </Container>
</main>
