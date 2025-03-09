import { v4 as uuid } from "uuid";
import randomColor from "randomcolor";

export interface Navigation {
  index: number
  route: string
  title: string
  icon: string
}


export class Task {
  id: string = uuid()
  name: string
  content: string
  color: string = randomColor({luminosity: 'light'})
}