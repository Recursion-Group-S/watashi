import { atom } from "jotai";

export const canvasRefAtom = atom(null);
export const canvasItemsAtom = atom([]);
export const stageRefAtom = atom(null);

export const selectedIDAtom = atom(null);

export const isPaintAtom = atom(false);
export const paintModeAtom = atom('brush');
export const paintWidthAtom = atom(5);
export const paintColorAtom = atom('#000000');

export const mapTitleAtom = atom("");

export const modalDispStatusAtom = atom("hidden");