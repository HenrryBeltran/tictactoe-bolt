<script lang="ts">
  interface Props {
    state: "empty" | "mark" | "dead";
    player: "player1" | "player2" | "computer" | null;
  }
  let { state, player }: Props = $props();
</script>

{#if state !== "empty" && player === "player1"}
  <svg
    data-dead={state === "dead"}
    class="h-full w-full fill-sky-500 p-px data-[dead=true]:opacity-40"
    viewBox="0 0 64 64"
  >
    <path
      d="M32,16c8.82,0,16,7.18,16,16s-7.18,16-16,16-16-7.18-16-16,7.18-16,16-16M32,0C14.33,0,0,14.33,0,32s14.33,32,32,32,32-14.33,32-32S49.67,0,32,0h0Z"
    />
  </svg>
{:else if state !== "empty" && (player === "player2" || player === "computer")}
  <svg
    data-dead={state === "dead"}
    class="h-full w-full p-px data-[dead=true]:opacity-40"
    viewBox="0 0 64 64"
  >
    <line
      x1="8"
      y1="8"
      x2="56"
      y2="56"
      class="stroke-rose-500"
      style="fill: none; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 16px;"
    />
    <line
      x1="56"
      y1="8"
      x2="8"
      y2="56"
      class="stroke-rose-500"
      style="fill: none; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 16px;"
    />
  </svg>
{:else}
  <div data-type="empty"></div>
{/if}
