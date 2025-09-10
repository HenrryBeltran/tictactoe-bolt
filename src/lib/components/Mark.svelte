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
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 47 47"
  >
    <path
      d="M23.5,0C10.52,0,0,10.52,0,23.5s10.52,23.5,23.5,23.5,23.5-10.52,23.5-23.5S36.48,0,23.5,0ZM23.5,39c-8.56,0-15.5-6.94-15.5-15.5s6.94-15.5,15.5-15.5,15.5,6.94,15.5,15.5-6.94,15.5-15.5,15.5Z"
    />
  </svg>
{:else if state !== "empty" && player === "player2"}
  <svg
    data-dead={state === "dead"}
    class="h-full w-full fill-rose-500 p-px data-[dead=true]:opacity-40"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 38.41 38.41"
  >
    <rect
      x="15.74"
      y="-6.52"
      width="6.92"
      height="51.45"
      rx="3.46"
      ry="3.46"
      transform="translate(19.2 -7.95) rotate(45)"
    />
    <rect
      x="15.74"
      y="-6.52"
      width="6.92"
      height="51.45"
      rx="3.46"
      ry="3.46"
      transform="translate(46.36 19.2) rotate(135)"
    />
  </svg>
{:else}
  <div data-type="empty"></div>
{/if}
