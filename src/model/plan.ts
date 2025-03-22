import { v4 as uuid } from "uuid";
import Task from "@/model/task.ts";

export default class Plan {
  id: string = uuid()
  task: Task
  start: Date
  end: Date
  allDay: boolean
  color: string
  comment: string

  constructor({start, end, allDay, task, comment, color}: {
    start: Date,
    end: Date,
    allDay: boolean,
    task: Task,
    comment: string,
    color: string
  }) {
    this.task = task
    this.start = start
    this.end = end
    this.allDay = allDay
    this.color = color
    this.comment = comment
  }
}
