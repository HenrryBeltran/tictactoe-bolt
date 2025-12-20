import type { Transition } from "motion-v";

export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 10,
  mass: 1,
};

export const springGlideTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1,
};

export const springLazyTransition: Transition = {
  type: "spring",
  stiffness: 50,
  damping: 12,
  mass: 1.5,
};

export const springBouncyTransition: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 15,
  mass: 2,
};

export const springSwiftTransition: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 45,
  mass: 1,
};
