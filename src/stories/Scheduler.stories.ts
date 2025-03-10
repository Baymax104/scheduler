import Scheduler from "@/components/Scheduler.vue";
import { StoryObj } from "@storybook/vue3";
import Schedule from "@/model/Schedule.ts";
import Task from "@/model/Task.ts";

export default {
  title: "Scheduler",
  component: Scheduler,
}

type Story = StoryObj<typeof Scheduler>

export const Basic: Story = {
  args: {
    onSelect(arg): Schedule {
      return new Schedule({
        task: new Task({
          name: "Test",
          comment: "TestContent",
        }),
        ...arg
      })
    },
  }
}
