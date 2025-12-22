import { animate, stagger, type AnimationPlaybackControlsWithThen } from "motion-v";
import { playSoundFX } from "./sound.ts";
import { getGameState, getWinner } from "./store.ts";
import { getColors } from "./theme.ts";
import { nextTick } from "vue";
import { springQuickGlideTransition } from "./transitions.ts";

let wJumping: AnimationPlaybackControlsWithThen;
let wBlending: AnimationPlaybackControlsWithThen;

export function cancelWinningAnimation() {
  if (wJumping) wJumping.cancel();
  if (wBlending) wBlending.cancel();
}

export function winningAnimation() {
  nextTick().then(() => {
    const winner = getWinner.value;
    if (winner === null) return;
    if (getGameState.value !== "restarting") return;

    const marks = document.querySelectorAll(
      `[data-player=${winner.value}][data-type="mark"]`,
    ) as NodeListOf<SVGElement>;

    const num1 = marks.item(0).getAttribute("data-nro");
    const num2 = marks.item(1).getAttribute("data-nro");
    const num3 = marks.item(2).getAttribute("data-nro");

    const cell1 = document.querySelector(`.cell[data-nro="${num1}"]`);
    const cell2 = document.querySelector(`.cell[data-nro="${num2}"]`);
    const cell3 = document.querySelector(`.cell[data-nro="${num3}"]`);

    wJumping = animate([
      [
        marks,
        { scale: [1, 1.3, 1], y: [0, "-10%", 0] },
        {
          delay: stagger(0.2),
          ...springQuickGlideTransition,
        },
      ],
      [marks, { scale: [1, 0.75, 1] }, { ease: "circOut", duration: 0.22, delay: stagger(0.2), at: "-0.4" }],
    ]);

    wBlending = animate(
      [cell1, cell2, cell3],
      {
        backgroundColor: [
          getColors.value.base,
          winner.value === "player1" ? getColors.value.primaryBack : getColors.value.secondaryBack,
          getColors.value.base,
        ],
      },
      { ease: "circOut", duration: 3, delay: stagger(0.05, { startDelay: 0.22 }) },
    );

    wBlending.finished.then(() => wBlending.cancel());

    // Play Sound Effect
    setTimeout(() => playSoundFX().winningNote1(), 100);
    setTimeout(() => playSoundFX().winningNote2(), 220);
    setTimeout(() => playSoundFX().winningNote3(), 340);
    if (winner.value !== "computer") {
      setTimeout(() => playSoundFX().winning(), 450);
    } else {
      setTimeout(() => playSoundFX().lossing(), 450);
    }
  });
}
