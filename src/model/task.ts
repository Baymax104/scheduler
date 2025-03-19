import { v4 as uuid } from "uuid";
import { EventColor } from "@/utils/color.ts";

export default class Task {
  id: string = uuid()
  name: string
  comment: string
  color: string

  constructor({name, comment}: { name: string, comment: string }) {
    this.name = name
    this.comment = comment
    this.color = EventColor.getRandomColor()
  }
}
