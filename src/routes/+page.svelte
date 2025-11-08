<script>
  import { Container, Navbar } from "$lib/components/ui";
  import { playSoundFX } from "$lib/sound.svelte";
  import { getColors } from "$lib/theme.svelte";
</script>

<Navbar />
<Container>
  <div class="flex w-full flex-1 flex-col justify-center">
    <header class="@container">
      <h1 class="text-center text-[min(6rem,18cqi)] leading-none font-bold tracking-tighter">
        <span style={`color: ${getColors().primary}`}>Tic</span>&nbsp;<span
          style={`color: ${getColors().secondary}`}>Tac</span
        >&nbsp;<span style={`color: ${getColors().primary}`}>Toe</span>
      </h1>
      <h2
        class="text-end text-[min(2rem,7cqi)] font-semibold tracking-tight"
        style={`color: ${getColors().subtext1}`}
      >
        Bolt Edition
      </h2>
    </header>
    <div class="mt-16">
      <div class="flex flex-col gap-4">
        <a
          href="/pvp"
          class="flex max-h-12 min-h-12 items-center justify-center rounded-full font-semibold tracking-tight"
          style={`background-color: ${getColors().mantle}`}
          onclick={() => playSoundFX().positiveAction()}>Player vs Player</a
        >
        <a
          href="/pvc"
          class="flex max-h-12 min-h-12 items-center justify-center rounded-full font-semibold tracking-tight"
          style={`background-color: ${getColors().mantle}`}
          onclick={() => playSoundFX().positiveAction()}>Player vs Computer</a
        >
      </div>
    </div>
  </div>
</Container>
<footer class="justify-self-end py-6 text-center text-sm" style={`color: ${getColors().subtext1}`}>
  &copy; 2025 Code and design by <a
    href="https://henrry.site"
    target="_blank"
    class="underline-offset-2 hover:underline">Henrry Beltran</a
  >
</footer>
