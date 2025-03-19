import { v4 as uuid } from "uuid";
import Task from "@/model/task.ts";

export default class ScheduleEvent {
  id: string = uuid()
  task: Task
  start: Date
  end: Date
  allDay: boolean

  constructor({task, start, end, allDay}: { task: Task, start: Date, end: Date, allDay: boolean }) {
    this.task = task;
    this.start = start;
    this.end = end;
    this.allDay = allDay;
  }
}
