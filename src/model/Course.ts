import { v4 as uuid } from "uuid";
import randomColor from "randomcolor";

export default class Course {
  id: string
  student: string
  content: string
  color: string

  constructor(student: string, content: string) {
    this.id = uuid()
    this.student = student
    this.content = content
    this.color = randomColor({luminosity: 'light'})
  }
}
