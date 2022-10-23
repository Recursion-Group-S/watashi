import { atom } from "jotai";

export const textColorAtom = atom("#000000");
export const fontFamilyAtom = atom('Potta One');
export const fontSizeAtom = atom(30);
export const sizeChangingAtom = atom(false);

export const selectedTextAtom = atom(null);

export const inputPositionAtom = atom(null);
export const textComponentsAtom = atom([]);