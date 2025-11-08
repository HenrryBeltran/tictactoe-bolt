let sound = $state(true);

export function isSoundOn() {
  return sound;
}

export function toggleSoundFX() {
  sound = !sound;
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
  if (sound === false) return;
  const sfx = new Audio("/sound/pop_fix.mp3");
  sfx.play();
}

function denied() {
  if (sound === false) return;
  const sfx = new Audio("/sound/denied.mp3");
  sfx.play();
}

function winning() {
  if (sound === false) return;
  const sfx = new Audio("/sound/winning.mp3");
  sfx.play();
}

function winningNote1() {
  if (sound === false) return;
  const sfx = new Audio("/sound/w_note1.mp3");
  sfx.play();
}

function winningNote2() {
  if (sound === false) return;
  const sfx = new Audio("/sound/w_note2.mp3");
  sfx.play();
}

function winningNote3() {
  if (sound === false) return;
  const sfx = new Audio("/sound/w_note3.mp3");
  sfx.play();
}

function lossing() {
  if (sound === false) return;
  const sfx = new Audio("/sound/lossing.mp3");
  sfx.play();
}

function positiveAction() {
  if (sound === false) return;
  const sfx = new Audio("/sound/positive_action.mp3");
  sfx.play();
}

function negativeAction() {
  if (sound === false) return;
  const sfx = new Audio("/sound/negative_action.mp3");
  sfx.play();
}

function button() {
  if (sound === false) return;
  const sfx = new Audio("/sound/button.mp3");
  sfx.play();
}

function swipeUI() {
  if (sound === false) return;
  const sfx = new Audio("/sound/swipe_ui.mp3");
  sfx.play();
}
