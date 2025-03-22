import { v4 as uuid } from "uuid";

export default class Task {
  id: string = uuid()
  name: string

  constructor(name: string, id: string = uuid()) {
    this.name = name
    this.id = id
  }
}
