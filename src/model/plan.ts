import { v4 as uuid } from "uuid";
import Task from "@/model/task.ts";
import { EventColor } from "@/utils/color.ts";

export default class Plan {
  id: string = uuid()
  task: Task
  start: Date
  end: Date
  allDay: boolean
  color: string
  comment: string

  constructor({task, start, end, allDay, comment}: {
    task: Task,
    start: Date,
    end: Date,
    allDay: boolean,
    comment: string
  }) {
    this.task = task
    this.start = start
    this.end = end
    this.allDay = allDay
    this.color = EventColor.getRandomColor()
    this.comment = comment
  }
}
