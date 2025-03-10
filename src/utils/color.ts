import randomColor from "randomcolor";

const baseColors = ["red", "green", "blue", "orange"];

export default function getColor(): string {
  const index = Math.floor(Math.random() * baseColors.length);
  return randomColor({hue: baseColors[index], luminosity: "bright"})
}