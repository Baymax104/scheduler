export default class DialogState {
  extended: { [key: string]: any } = {}
  private open: boolean

  constructor(open: boolean = false) {
    this.open = open
  }

  toggle() {
    this.open = !this.open
  }

  toggleWithArg(arg: { [key: string]: any }) {
    this.open = !this.open
    this.extended = arg
  }

  isOpen(): boolean {
    return this.open
  }
}
