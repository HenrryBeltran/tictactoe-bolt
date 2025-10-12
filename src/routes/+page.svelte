<script>
  import { Container, Navbar } from "$lib/components/ui";
  import { playerAction } from "$lib/store.svelte";

  playerAction().resetScores("pvp");
  playerAction().resetScores("pvc");
  playerAction().resetTurn();
  playerAction().quickRestart();
</script>

<Navbar />
<Container>
  <div class="flex w-full flex-1 flex-col justify-center">
    <header class="@container">
      <h1 class="text-center text-[min(6rem,18cqi)] leading-none font-bold tracking-tighter">
        <span class="text-sky-500">Tic</span>&nbsp;<span class="text-rose-500">Tac</span>&nbsp;<span
          class="text-sky-500">Toe</span
        >
      </h1>
      <h2 class="text-end text-[min(2rem,7cqi)] font-semibold tracking-tight text-neutral-600/90">
        Bolt Edition
      </h2>
    </header>
    <div class="mt-16">
      <div class="flex flex-col gap-3">
        <a
          href="/pvp"
          class="flex max-h-12 min-h-12 items-center justify-center rounded-full bg-neutral-100 font-semibold tracking-tight"
          >Player vs Player</a
        >
        <a
          href="/pvc"
          class="flex max-h-12 min-h-12 items-center justify-center rounded-full bg-neutral-100 font-semibold tracking-tight"
          >Player vs Computer</a
        >
        <a
          href="/how-to-play"
          class="flex max-h-12 min-h-12 items-center justify-center rounded-full bg-neutral-100 font-semibold tracking-tight"
          >How to play?</a
        >
      </div>
    </div>
  </div>
</Container>
<footer class="justify-self-end py-6 text-center text-sm text-neutral-600">
  &copy; 2025 Code and design by <a
    href="https://henrry.site"
    target="_blank"
    class="underline-offset-2 hover:underline">Henrry Beltran</a
  >
</footer>
