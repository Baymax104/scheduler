class _EventColor {

  colors: string[] = [
    "#a6c6ed", "#b5d9e8", "#cae8e6",
    "#d5cae8", "#f1a7b6", "#a3c7e0",
    "#b7d99b", "#a3c8b6", "#f8b9ce",
    "#f6c5a7", "#fab59e", "#d2e8f4",
    "#a7c6e7", "#f4d69f", "#b3bfd6"
  ]

  private prev = 0

  getRandomColor(): string {
    let index = Math.floor(Math.random() * this.colors.length);
    while (index === this.prev) {
      index = Math.floor(Math.random() * this.colors.length);
    }
    this.prev = index
    return this.colors[index];
  }
}

export const EventColor: _EventColor = new _EventColor();