import { createRouter, createWebHistory } from "vue-router";

import ScheduleScreen from "@/screen/ScheduleScreen.vue";
import TaskScreen from "@/screen/TaskScreen.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Time",
      component: ScheduleScreen,
    },
    {
      path: "/course",
      name: "Course",
      component: TaskScreen,
    }
  ]
})