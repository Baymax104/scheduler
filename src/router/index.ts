import { createRouter, createWebHistory } from "vue-router";

import ScheduleScreen from "@/screen/ScheduleScreen.vue";
import TaskScreen from "@/screen/TaskScreen.vue";

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