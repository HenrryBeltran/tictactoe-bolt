export type ColorThemes =
  | "default-light"
  | "default-dark"
  | "catppuccin-frappe"
  | "dracula"
  | "dark-mono"
  | "everforest";

export type Palette = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  positive0Btn: string;
  positive0BtnHover: string;
  positive1Btn: string;
  positive1BtnHover: string;
  negativeBtn: string;
  negativeBtnHover: string;
  text: string;
  subtext1: string;
  subtext0: string;
  surface0: string;
  base: string;
  baseHover: string;
  mantle: string;
  crust: string;
};

const colorThemes = new Map<ColorThemes, Palette>();

colorThemes.set("default-light", {
  primary: "oklch(68.5% 0.169 237.323)", // sky 500
  primaryLight: "oklch(82.8% 0.111 230.318)", // sky 300
  primaryDark: "oklch(44.3% 0.11 240.79)", // sky 800

  secondary: "oklch(64.5% 0.246 16.439)", // rose 500
  secondaryLight: "oklch(81% 0.117 11.638)", // rose 300
  secondaryDark: "oklch(45.5% 0.188 13.697)", // rose 800

  positive0Btn: "oklch(68.5% 0.169 237.323)", // sky 500
  positive0BtnHover: "oklch(74.6% 0.16 232.661)", // sky 400
  positive1Btn: "oklch(64.5% 0.246 16.439)", // rose 500
  positive1BtnHover: "oklch(71.2% 0.194 13.428)", // rose 400
  negativeBtn: "oklch(26.9% 0 0)", // neutral 700
  negativeBtnHover: "oklch(43.9% 0 0)", // neutral 600

  text: "oklch(26.9% 0 0)", // neutral 800
  subtext1: "oklch(55.6% 0 0)", // neutral 500
  subtext0: "oklch(70.8% 0 0)", // neutral 400

  surface0: "color-mix(in oklab, oklch(70.8% 0 0) 40%, transparent)", // neutral 400 40%

  base: "color-mix(in oklab, oklch(87% 0 0) 80%, transparent)", // neutral 300 80%
  baseHover: "color-mix(in oklab, oklch(87% 0 0) 100%, transparent)", // neutral 300 100%

  mantle: "oklch(97% 0 0)", // neutral 100

  crust: "#ffffff", // white
});

colorThemes.set("default-dark", {
  primary: "oklch(68.5% 0.169 237.323)", // sky 500
  primaryLight: "color-mix(in oklab, oklch(82.8% 0.111 230.318) 75%, transparent)", // sky 300 75%
  primaryDark: "oklch(44.3% 0.11 240.79)", // sky 800

  secondary: "oklch(64.5% 0.246 16.439)", // rose 500
  secondaryLight: "color-mix(in oklab, oklch(81% 0.117 11.638) 75%, transparent)", // rose 300 75%
  secondaryDark: "oklch(45.5% 0.188 13.697)", // rose 800

  positive0Btn: "oklch(68.5% 0.169 237.323)", // sky 500
  positive0BtnHover: "oklch(74.6% 0.16 232.661)", // sky 400
  positive1Btn: "oklch(64.5% 0.246 16.439)", // rose 500
  positive1BtnHover: "oklch(71.2% 0.194 13.428)", // rose 400
  negativeBtn: "oklch(26.9% 0 0)", // neutral 700
  negativeBtnHover: "oklch(43.9% 0 0)", // neutral 600

  text: "oklch(97% 0 0)", // neutral 100
  subtext1: "oklch(87% 0 0)", // neutral 300
  subtext0: "oklch(92.2% 0 0)", // neutral 200

  surface0: "color-mix(in oklab, oklch(43.9% 0 0) 40%, transparent)", // neutral 600 40%

  base: "color-mix(in oklab, oklch(37.1% 0 0) 80%, transparent)", // neutral 700 80%
  baseHover: "color-mix(in oklab, oklch(37.1% 0 0) 100%, transparent)", // neutral 700 100%

  mantle: "oklch(20.5% 0 0)", // neutral 900

  crust: "#000000", // black
});

colorThemes.set("catppuccin-frappe", {} as Palette);

let currentColorTheme = $state<ColorThemes>("default-light");
let colors = $state<Palette>(colorThemes.get(currentColorTheme)!);

export function getCurrenetColorTheme() {
  return currentColorTheme;
}

export function getColors() {
  return colors;
}

export function changeColorTheme(theme: ColorThemes) {
  currentColorTheme = theme;
  colors = colorThemes.get(theme) ?? colors;
}
