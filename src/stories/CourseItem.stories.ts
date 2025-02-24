import CourseItem from "@/components/CourseItem.vue";
import Course from "@/model/Course.ts";

export default {
  component: CourseItem,
  title: "CourseItem",
}

export const Basic = {
  args: {
    item: new Course('testStudent', 'try测试测试测试测试测试测试测试测试测试测试测试测试测试'),
  }
}