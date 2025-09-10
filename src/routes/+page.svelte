<script>
  import { Container } from "$lib/components/ui";
</script>

<main class="relative flex min-h-lvh items-center justify-center">
  <div class="absolute top-0 right-0">
    <button class="mt-6 mr-6 rounded-full bg-neutral-700 px-3 py-0.75 text-white">Config</button>
  </div>
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
</main>
