import { computed, ref } from "vue";
import { localState } from "./utils";

const sound = ref(localState("sound", "true").get() === "true");

export const isSoundOn = computed(() => sound.value);

export function toggleSoundFX() {
  sound.value = !sound.value;
  localState("sound", "true").set(String(sound.value));
}

export function playSoundFX() {
  return {
    pop,
    denied,
    winning,
    winningNote1,
    winningNote2,
    winningNote3,
    lossing,
    positiveAction,
    negativeAction,
    button,
    swipeUI,
  };
}

function pop() {
  if (sound.value === false) return;
  const sfx = new Audio("/sound/pop.mp3");
  sfx.play();
}

function denied() {
  if (sound.value === false) return;
  const sfx = new Audio("/sound/denied.mp3");
  sfx.play();
}

function winning() {
  if (sound.value === false) return;
  const sfx = new Audio("/sound/winning.mp3");
  sfx.play();
}

function winningNote1() {
  if (sound.value === false) return;
  const sfx = new Audio("/sound/w_note1.mp3");
  sfx.play();
}

function winningNote2() {
  if (sound.value === false) return;
  const sfx = new Audio("/sound/w_note2.mp3");
  sfx.play();
}

function winningNote3() {
  if (sound.value === false) return;
  const sfx = new Audio("/sound/w_note3.mp3");
  sfx.play();
}

function lossing() {
  if (sound.value === false) return;
  const sfx = new Audio("/sound/lossing.mp3");
  sfx.play();
}

function positiveAction() {
  if (sound.value === false) return;
  const sfx = new Audio("/sound/positive_action.mp3");
  sfx.play();
}

function negativeAction() {
  if (sound.value === false) return;
  const sfx = new Audio("/sound/negative_action.mp3");
  sfx.play();
}

function button() {
  if (sound.value === false) return;
  const sfx = new Audio("/sound/button.mp3");
  sfx.play();
}

function swipeUI() {
  if (sound.value === false) return;
  const sfx = new Audio("/sound/swipe_ui.mp3");
  sfx.play();
}
