import randomColor from "randomcolor";

const baseColors = ["red", "green", "blue", "orange"];

export function getRandomColor(): string {
  const index = Math.floor(Math.random() * baseColors.length);
  return randomColor({hue: baseColors[index], luminosity: "bright"})
}


import chroma from 'chroma-js';

class MorandiPaletteGenerator {
  private readonly saturation = 20;
  private readonly lightness = 60;

  // 生成单色
  generateColor(): string {
    const hue = Math.floor(Math.random() * 361);
    return chroma.hsl(hue, this.saturation / 100, this.lightness / 100).hex();
  }

  // 生成调色板
  generatePalette(count: number = 5): string[] {
    return Array.from({ length: count }, () => this.generateColor());
  }
}
