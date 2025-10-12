<script lang="ts">
  import { type Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  type Props = {
    showModal?: boolean;
    header?: Snippet;
    children?: Snippet;
    className?: ClassValue;
  };

  let { showModal = $bindable(), header, children, className }: Props = $props();
  let dialog = $state<HTMLDialogElement>();

  $effect(() => {
    if (showModal && dialog) dialog.showModal();
    else if (!showModal && dialog) dialog.close();
  });

  export function closeModal() {
    if (dialog !== undefined) dialog.close();
  }
</script>

<dialog
  bind:this={dialog}
  onclose={() => (showModal = false)}
  onclick={(e) => {
    if (e.target === dialog) dialog.close();
  }}
  class={className}
  tabindex="-1"
>
  <div>
    {@render header?.()}
    {@render children?.()}
  </div>
</dialog>
