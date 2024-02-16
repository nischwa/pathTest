import {MathUtils} from "three";

export const colorPallete: string[] = [
  "orange",
  "coral",
  "darkcyan",
  "burlywood",
  "cornflowerblue",
  "green"
]

export const randomColor = (): string => {
  const randIndex = MathUtils.randInt(0, colorPallete.length - 1);
  return colorPallete[randIndex];
}
