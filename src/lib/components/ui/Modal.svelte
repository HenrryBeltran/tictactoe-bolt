<script lang="ts">
  import { type Snippet } from "svelte";

  type Props = {
    showModal?: boolean;
    header?: Snippet;
    children?: Snippet;
  };

  let { showModal = $bindable(), header, children }: Props = $props();
  let dialog = $state<HTMLDialogElement>();

  $effect(() => {
    if (showModal && dialog) dialog.showModal();
    else if (!showModal && dialog) dialog.close();
  });
</script>

<dialog
  bind:this={dialog}
  onclose={() => (showModal = false)}
  onclick={(e) => {
    if (e.target === dialog) dialog.close();
  }}
  class="rounded-sm border border-purple-400"
>
  <div>
    {@render header?.()}
    <hr />
    {@render children?.()}
    <hr />
    <!-- svelte-ignore a11y_autofocus -->
    <button
      autofocus
      onclick={() => {
        if (dialog !== undefined) dialog.close();
      }}>close modal</button
    >
  </div>
</dialog>
