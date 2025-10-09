<script>
  import { Container, Header } from "$lib/components/ui";
  import { playerAction } from "$lib/store.svelte";

  console.log("I'm in home");
  playerAction().resetScores("pvp");
  playerAction().resetScores("pvc");
  playerAction().resetTurn();
  playerAction().quickRestart();
</script>

<Header />
<Container>
  <header class="border-red-400">
    <h1 class="text-2xl font-bold text-neutral-900">Tic Tac Toe</h1>
    <h2 class="font-bold text-neutral-700">Bolt Edition</h2>
  </header>
  <div>
    <div class="flex flex-col gap-4">
      <a href="/pvp">Player vs Player</a>
      <a href="/pvc">Player vs Computer</a>
      <a href="/instructions">Instructions</a>
    </div>
  </div>
</Container>
