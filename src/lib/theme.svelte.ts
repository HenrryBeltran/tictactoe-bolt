export type ColorThemes =
  | "default-light"
  | "default-dark"
  | "catppuccin-frappe"
  | "dracula"
  | "dark-mono"
  | "everforest";

export type Palette = {
  background: string; // all the variants background colors;
  // ...
  one: string; // all the variants for first player color;
  // ...
  two: string; // all the variants for second player color;
  // ...
};

const colorThemes = new Map<ColorThemes, Palette>();

colorThemes.set("default-light", {
  background: "okcl(dl-bg)",
  one: "okcl(dl-one)",
  two: "okcl(dl-two)",
});
colorThemes.set("default-dark", {
  background: "okcl(dd-bg)",
  one: "okcl(dd-one)",
  two: "okcl(dd-two)",
});
colorThemes.set("catppuccin-frappe", {
  background: "#ct-bg",
  one: "#ct-one",
  two: "#ct-two",
});

let currentColorTheme = $state<ColorThemes>("default-light");
let colors = $state<Palette>(colorThemes.get(currentColorTheme)!);

export function getCurrenetColorTheme() {
  return currentColorTheme;
}

export function getColors() {
  console.log(colors);
  return colors;
}

export function changeColorTheme(theme: ColorThemes) {
  currentColorTheme = theme;
  colors = colorThemes.get(theme) ?? colors;
}
