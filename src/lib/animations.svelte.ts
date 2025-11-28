import { animate, stagger, type AnimationPlaybackControlsWithThen } from "motion";
import { playSoundFX } from "./sound.svelte";
import { getWinner } from "./store.svelte";
import { getColors } from "./theme.svelte";

let wJumping: AnimationPlaybackControlsWithThen;
let wBlending: AnimationPlaybackControlsWithThen;

export function cancelWinningAnimation() {
  wJumping?.cancel();
  wBlending?.cancel();
}

export function winnigAnimation() {
  const winner = getWinner();
  if (winner === null) return;

  $effect(() => {
    const marks = document.querySelectorAll(
      `[data-player=${winner}][data-type="mark"]`,
    ) as NodeListOf<SVGElement>;

    const num1 = marks[0].getAttribute("data-nro");
    const num2 = marks[1].getAttribute("data-nro");
    const num3 = marks[2].getAttribute("data-nro");

    const cell1 = document.querySelector(`.cell[data-nro="${num1}"]`);
    const cell2 = document.querySelector(`.cell[data-nro="${num2}"]`);
    const cell3 = document.querySelector(`.cell[data-nro="${num3}"]`);

    wJumping = animate([
      [
        marks,
        { scale: [1, 1.3, 1], y: [0, "-10%", 0] },
        {
          ease: "circIn",
          duration: 0.6,
          delay: stagger(0.2),
        },
      ],
      [
        marks,
        { scale: [1, 0.75, 1] },
        { ease: "circOut", duration: 0.22, delay: stagger(0.2), at: "-0.4" },
      ],
    ]);

    wBlending = animate(
      [cell1, cell2, cell3],
      {
        backgroundColor: [
          getColors().base,
          winner === "player1" ? getColors().primaryBack : getColors().secondaryBack,
        ],
      },
      { ease: "easeOut", duration: 0.6, delay: stagger(0.05, { startDelay: 0.62 }) },
    );
  });

  // Play Sound Effect
  setTimeout(() => playSoundFX().winningNote1(), 100);
  setTimeout(() => playSoundFX().winningNote2(), 300);
  setTimeout(() => playSoundFX().winningNote3(), 500);
  if (winner !== "computer") {
    setTimeout(() => playSoundFX().winning(), 850);
  } else {
    setTimeout(() => playSoundFX().lossing(), 850);
  }
}

export function deniedPlayingShakeAnimation(node: HTMLElement) {
  animate(
    node,
    {
      x: [0, -5, 5, -5, 5, 3, -3, 0],
      y: [0, 2, -2, -3, 3, -1, 1, 0],
      backgroundColor: getColors().base,
    },
    { duration: 0.38, ease: "easeInOut" },
  );
}

export function markAnimation(node: SVGElement) {
  if (node.getAttribute("data-dead") === "true") {
    console.log(node);
    return;
  }

  if (node.getAttribute("data-type") === "dead") {
    deathMarkAnimation(node);
    return;
  }

  placeMarkAnimation(node);
}

function placeMarkAnimation(node: SVGElement) {
  animate([
    [
      node,
      { y: ["-75%", 0], opacity: [0, 1], scale: [1.5, 1] },
      { duration: 0.24, ease: "circOut" },
    ],
    [
      node,
      { scale: [1, 1.1, 1] },
      { type: "spring", stiffness: 682, damping: 24, mass: 2.2, at: "-0.03" },
    ],
  ]);
}

function deathMarkAnimation(node: SVGElement) {
  animate(node, { opacity: [1, 0.4] }, { type: "spring", stiffness: 400, damping: 20, mass: 2.2 });
}
