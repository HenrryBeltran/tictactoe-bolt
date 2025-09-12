<script>
  import { Container, Header } from "$lib/components/ui";
</script>

<Header />
<Container>
  <header class="border border-red-400">
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
