import Scheduler from "@/components/Scheduler.vue";
import { StoryObj } from "@storybook/vue3";
import { EventInput } from "@fullcalendar/core";

export default {
  title: "Scheduler",
  component: Scheduler,
}

type Story = StoryObj<typeof Scheduler>

export const Basic: Story = {
  args: {
    onSelect(arg): EventInput {
      return {
        title: "test",
        start: arg.start,
        end: arg.end,
        allDay: arg.allDay
      }
    },
  }
}
