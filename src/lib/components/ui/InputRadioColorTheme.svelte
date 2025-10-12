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
  />
  <label for={value}>{@render children?.()}</label>
</div>
