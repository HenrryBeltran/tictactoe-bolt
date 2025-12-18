import { computed, ref } from "vue";
import { localState } from "./utils";

export type ColorThemes =
  | "default-light"
  | "default-dark"
  | "catppuccin-macchiato"
  | "dracula"
  | "dark-mono"
  | "everforest";

export type Palette = {
  primary: string;
  primaryBack: string;
  primaryFront: string;
  secondary: string;
  secondaryBack: string;
  secondaryFront: string;
  positive0Btn: string;
  positive0BtnHover: string;
  positive1Btn: string;
  positive1BtnHover: string;
  negativeBtn: string;
  negativeBtnHover: string;
  text: string;
  textAlt: string;
  subtext1: string;
  subtext0: string;
  surface0: string;
  base: string;
  mantle: string;
  crust: string;
  type: "light" | "dark";
};

export type Themes = {
  "default-light": Palette;
  "default-dark": Palette;
  "catppuccin-macchiato": Palette;
  dracula: Palette;
  "dark-mono": Palette;
  everforest: Palette;
};

const colorThemes: Themes = {
  "default-light": {
    primary: "oklch(68.5% 0.169 237.323)", // sky 500
    primaryBack: "oklch(82.8% 0.111 230.318)", // sky 300
    primaryFront: "oklch(44.3% 0.11 240.79)", // sky 800

    secondary: "oklch(64.5% 0.246 16.439)", // rose 500
    secondaryBack: "oklch(81% 0.117 11.638)", // rose 300
    secondaryFront: "oklch(45.5% 0.188 13.697)", // rose 800

    positive0Btn: "oklch(68.5% 0.169 237.323)", // sky 500
    positive0BtnHover: "oklch(74.6% 0.16 232.661)", // sky 400
    positive1Btn: "oklch(64.5% 0.246 16.439)", // rose 500
    positive1BtnHover: "oklch(71.2% 0.194 13.428)", // rose 400
    negativeBtn: "oklch(26.9% 0 0)", // neutral 700
    negativeBtnHover: "oklch(43.9% 0 0)", // neutral 600

    text: "oklch(26.9% 0 0)", // neutral 800
    textAlt: "oklch(97% 0 0)", // neutral 800
    subtext1: "oklch(55.6% 0 0)", // neutral 500
    subtext0: "oklch(70.8% 0 0)", // neutral 400

    surface0: "oklch(70.8% 0 0 / 40%)", // neutral 400 40%

    base: "oklch(87% 0 0 / 80%)", // neutral 300 80%

    mantle: "oklch(97% 0 0)", // neutral 100

    crust: "#ffffff", // white

    type: "light",
  },
  "default-dark": {
    primary: "oklch(68.5% 0.169 237.323)", // sky 500
    primaryBack: "oklch(37.5% 0.08 240.876)", // sky 900
    primaryFront: "oklch(90.1% 0.058 230.902)", // sky 200

    secondary: "oklch(64.5% 0.246 16.439)", // rose 500
    secondaryBack: "oklch(39% 0.136 10.272)", // rose 900
    secondaryFront: "oklch(89.2% 0.058 10.001)", // rose 200

    positive0Btn: "oklch(68.5% 0.169 237.323)", // sky 500
    positive0BtnHover: "oklch(74.6% 0.16 232.661)", // sky 400
    positive1Btn: "oklch(64.5% 0.246 16.439)", // rose 500
    positive1BtnHover: "oklch(71.2% 0.194 13.428)", // rose 400
    negativeBtn: "oklch(43.9% 0 0)", // neutral 600
    negativeBtnHover: "oklch(55.6% 0 0)", // neutral 500

    text: "oklch(97% 0 0)", // neutral 100
    textAlt: "oklch(97% 0 0)", // neutral 100
    subtext1: "oklch(87% 0 0)", // neutral 300
    subtext0: "oklch(92.2% 0 0)", // neutral 200

    surface0: "oklch(43.9% 0 0 / 60%)", // neutral 600 60%

    base: "oklch(26.9% 0 0)", // neutral 800

    mantle: "oklch(20.5% 0 0)", // neutral 900

    crust: "#000000", // black

    type: "dark",
  },
  "catppuccin-macchiato": {
    primary: "rgb(198, 160, 246)", // mauve
    primaryBack: "hsl(262deg, 44%, 42%, 90%)", // mauve dark 90%
    primaryFront: "hsl(272deg, 88%, 89%)", // mauve light

    secondary: "rgb(245, 169, 127)", // peach
    secondaryBack: "hsl(18deg, 52%, 48%, 86%)", // peach dark 90%
    secondaryFront: "hsl(25deg, 89%, 92%)", // peach light

    positive0Btn: "hsl(265deg, 80%, 70%)", // mauve darker
    positive0BtnHover: "rgb(198, 160, 246)", // mauve
    positive1Btn: "hsl(19deg, 81%, 64%)", // peach darker
    positive1BtnHover: "rgb(245, 169, 127)", // peach
    negativeBtn: "hsl(231deg, 16%, 34%)", // surface1
    negativeBtnHover: "hsl(230deg, 14%, 41%)", // surface2

    text: "rgb(202, 211, 245)", // text
    textAlt: "hsl(230deg, 19%, 26%)", // surface0
    subtext1: "rgb(184, 192, 224)", // subtext1
    subtext0: "rgb(165, 173, 203)", // surface0

    surface0: "hsl(230deg, 19%, 26%)", // surface0

    base: "hsl(232deg, 22%, 20%)", // base (modify)

    mantle: "hsl(233deg, 23%, 15%)", // mantle

    crust: "hsl(236deg, 23%, 12%)", // crust

    type: "dark",
  },
  dracula: {
    primary: "hsl(326deg, 100%, 74%)", // pink
    primaryBack: "hsl(330deg, 55%, 35%)", // pink (modify darker)
    primaryFront: "hsl(322deg, 100%, 92%)", // sky (modify lighter)

    secondary: "hsl(135deg, 94%, 65%)", // green
    secondaryBack: "hsl(138deg, 61%, 33%)", // green (modify darker)
    secondaryFront: "hsl(131deg, 94%, 89%)", // green (modify lighter)

    positive0Btn: "oklch(68.5% 0.169 237.323)", // sky 500
    positive0BtnHover: "oklch(74.6% 0.16 232.661)", // sky 400
    positive1Btn: "oklch(64.5% 0.246 16.439)", // rose 500
    positive1BtnHover: "oklch(71.2% 0.194 13.428)", // rose 400
    negativeBtn: "hsl(225deg, 27%, 51%, 0%)", // neutral 700
    negativeBtnHover: "hsl(225deg, 27%, 51%, 0%)", // neutral 600

    text: "hsl(60deg, 30%, 96%)", // foreground
    textAlt: "hsl(231deg, 15%, 18%)", // base
    subtext1: "hsl(225deg, 29%, 62%)", // comment (modify - lighter)
    subtext0: "hsl(225deg, 27%, 51%)", // comment (modify - light)

    surface0: "hsl(232deg, 18%, 29%)", // selection (modify)

    base: "hsl(231deg, 15%, 18%)", // background

    mantle: "hsl(230deg, 16%, 12%)", // neutral 900

    crust: "hsl(232deg, 14%, 31%)", // selection

    type: "dark",
  },
  "dark-mono": {
    primary: "oklch(70.8% 0 0)", // neutral 400
    primaryBack: "oklch(37.1% 0 0)", // neutral 700
    primaryFront: "oklch(87% 0 0)", // neutral 300

    secondary: "oklch(70.8% 0 0)", // neutral 400
    secondaryBack: "oklch(37.1% 0 0)", // neutral 700
    secondaryFront: "oklch(87% 0 0)", // neutral 300

    positive0Btn: "oklch(55.6% 0 0)", // neutral 500
    positive0BtnHover: "oklch(70.8% 0 0)", // neutral 400
    positive1Btn: "oklch(55.6% 0 0)", // neutral 500
    positive1BtnHover: "oklch(70.8% 0 0)", // neutral 400
    negativeBtn: "oklch(37.1% 0 0 / 75%)", // neutral 700 75%
    negativeBtnHover: "oklch(43.9% 0 0 / 90%)", // neutral 600 90%

    text: "oklch(97% 0 0)", // neutral 100
    textAlt: "oklch(26.9% 0 0)", // neutral 800
    subtext1: "oklch(87% 0 0)", // neutral 300
    subtext0: "oklch(92.2% 0 0)", // neutral 200

    surface0: "oklch(43.9% 0 0 / 60%)", // neutral 600 60%

    base: "oklch(26.9% 0 0)", // neutral 800

    mantle: "oklch(20.5% 0 0)", // neutral 900

    crust: "#000000", // black

    type: "dark",
  },
  everforest: {
    primary: "#7FBBB3", // blue
    primaryBack: "#3B6862", // blue (modify)
    primaryFront: "#ECF5ED", // background blue light

    secondary: "#E67E80", // red
    secondaryBack: "#824041", // red (modify)
    secondaryFront: "#FFE7DE", // background red light

    positive0Btn: "#3A94C5", // blue light
    positive0BtnHover: "#7FBBB3", // blue
    positive1Btn: "#F85552", // red light
    positive1BtnHover: "#E67E80", // red
    negativeBtn: "#4F5B58", // background5
    negativeBtnHover: "#7A8478", // gray0

    text: "#D3C6AA", // foreground
    textAlt: "#272E33", // background0 light
    subtext1: "#859289", // gray1
    subtext0: "#7A8478", // gray0

    surface0: "#414B50", // background3

    base: "#2E383C", // background1

    mantle: "#374145", // background2

    crust: "#272E33", // background0

    type: "dark",
  },
};

const currentColorTheme = ref<ColorThemes>(localState<ColorThemes>("theme", "default-light").get());

export const getCurrenetColorTheme = computed(() => {
  return currentColorTheme.value;
});

export const getColors = computed(() => {
  return colorThemes[currentColorTheme.value];
});

export function changeColorTheme(theme: ColorThemes) {
  currentColorTheme.value = theme;
  localState("theme", "default-light").set(theme);
  setCSSColorVariables();
}

export function setCSSColorVariables() {
  document.querySelector('meta[name="color-scheme"]')?.setAttribute("content", getColors.value.type);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", getColors.value.base);

  document.documentElement.style.setProperty("--primary-color", getColors.value.primary);
  document.documentElement.style.setProperty("--primary-back-color", getColors.value.primaryBack);
  document.documentElement.style.setProperty("--primary-front-color", getColors.value.primaryFront);

  document.documentElement.style.setProperty("--secondary-color", getColors.value.secondary);
  document.documentElement.style.setProperty("--secondary-back-color", getColors.value.secondaryBack);
  document.documentElement.style.setProperty("--secondary-front-color", getColors.value.secondaryFront);

  document.documentElement.style.setProperty("--positive0-btn-color", getColors.value.positive0Btn);
  document.documentElement.style.setProperty("--positive0-btn-hover-color", getColors.value.positive0BtnHover);

  document.documentElement.style.setProperty("--positive1-btn-color", getColors.value.positive1Btn);
  document.documentElement.style.setProperty("--positive1-btn-hover-color", getColors.value.positive1BtnHover);

  document.documentElement.style.setProperty("--negative-btn-color", getColors.value.negativeBtn);
  document.documentElement.style.setProperty("--negative-btn-hover-color", getColors.value.negativeBtnHover);

  document.documentElement.style.setProperty("--text-color", getColors.value.text);
  document.documentElement.style.setProperty("--text-alt-color", getColors.value.textAlt);

  document.documentElement.style.setProperty("--subtext1-color", getColors.value.subtext1);
  document.documentElement.style.setProperty("--subtext0-color", getColors.value.subtext0);

  document.documentElement.style.setProperty("--surface0-color", getColors.value.surface0);
  document.documentElement.style.setProperty("--base-color", getColors.value.base);

  document.documentElement.style.setProperty("--mantle-color", getColors.value.mantle);
  document.documentElement.style.setProperty("--crust-color", getColors.value.crust);
}
