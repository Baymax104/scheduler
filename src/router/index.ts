import { createRouter, createWebHistory } from "vue-router";

import ScheduleScreen from "@/modules/scheduler/ScheduleScreen.vue";
import TaskScreen from "@/modules/task/TaskScreen.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Schedule",
      component: ScheduleScreen,
    },
    {
      path: "/task",
      name: "Task",
      component: TaskScreen,
    }
  ]
})