import randomColor from "randomcolor";

const baseColors = ["red", "green", "blue", "orange"];

export function getRandomColor(): string {
  const index = Math.floor(Math.random() * baseColors.length);
  return randomColor({hue: baseColors[index], luminosity: "bright"})
}