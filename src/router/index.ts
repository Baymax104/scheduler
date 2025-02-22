import { createRouter, createWebHistory } from "vue-router";

import TimeScreen from "@/screen/TimeScreen.vue";
import CourseScreen from "@/screen/CourseScreen.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Time",
      component: TimeScreen,
    },
    {
      path: "/course",
      name: "Course",
      component: CourseScreen,
    }
  ]
})