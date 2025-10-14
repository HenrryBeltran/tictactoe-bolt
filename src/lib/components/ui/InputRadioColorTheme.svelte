<script lang="ts">
  import type { ColorThemes } from "$lib/theme.svelte";
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
    hidden
    class="peer hidden"
  />
  <label
    for={value}
    class="inline-block w-full rounded-full bg-neutral-600 px-6 py-1.5 font-semibold tracking-tight peer-checked:bg-sky-500"
    >{@render children?.()}</label
  >
</div>
