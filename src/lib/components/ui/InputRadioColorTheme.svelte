<script lang="ts">
  import { playSoundFX } from "$lib/sound.svelte";
  import { type ColorThemes } from "$lib/theme.svelte";
  import type { Snippet } from "svelte";

  type Props = {
    themeRadio: ColorThemes;
    onChangeTheme: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
    value: ColorThemes;
    children: Snippet<[]>;
  };

  let { themeRadio, onChangeTheme, value, children }: Props = $props();
</script>

<div>
  <input
    id={value}
    type="radio"
    {value}
    name="color-theme"
    checked={themeRadio === value}
    onchange={onChangeTheme}
    onclick={() => playSoundFX().positiveAction()}
    hidden
    class="peer hidden"
  />
  <label
    for={value}
    class="inline-block w-full rounded-full px-6 py-1.5 font-semibold tracking-tight"
    class:text-crust={themeRadio === value}
    class:text-text-color={themeRadio !== value}
    class:bg-primary={themeRadio === value}
    class:bg-base-color={themeRadio !== value}>{@render children?.()}</label
  >
</div>
