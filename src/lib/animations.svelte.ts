import { animate, stagger } from "motion";
import { playSoundFX } from "./sound.svelte";

export function winnigAnimation(
  marks: NodeListOf<SVGElement>,
  winner: "player1" | "player2" | "computer",
) {
  animate([
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
  // animate(node, {}, { type: "spring", stiffness: 1000, damping: 30, mass: 1 });
  animate(
    node,
    { x: [0, -5, 5, -5, 5, 3, -3, 0], y: [0, 2, -2, -3, 3, -1, 1, 0] },
    {
      duration: 0.4, // Total duration in seconds (keep it short for a quick shake)
      ease: "easeInOut", // Smooth easing
    },
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
