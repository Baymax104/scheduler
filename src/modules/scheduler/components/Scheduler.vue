<script lang="ts" setup>
import { onMounted, reactive, Ref, ref, useTemplateRef } from "vue"
import {
  CalendarApi,
  CalendarOptions,
  DateInput,
  DateSpanApi,
  EventAddArg,
  EventApi,
  EventChangeArg,
  EventClickArg,
  EventRemoveArg,
  ViewApi,
} from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/vue3"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import Plan from "@/model/plan.ts";
import { ViewType } from "@/modules/scheduler/model/view-type.ts"

const {events} = defineProps<{
  events: Array<Plan>
}>()

const emit = defineEmits<{
  select: [span: DateSpanApi]
  eventClick: [arg: EventClickArg],
  eventAdd: [arg: EventAddArg],
  eventChange: [arg: EventChangeArg],
  eventRemove: [arg: EventRemoveArg],
}>()

defineSlots<{
  default(props: { event: Plan | null }): void
}>()

const calendarOptions = reactive<CalendarOptions>({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: false,
  initialView: "timeGridWeek",
  views: {
    timeGridWeek: {
      dayHeaderFormat: {
        weekday: "short",
        month: "2-digit",
        day: "2-digit",
      },
      slotLabelFormat: {
        hourCycle: "h24",
        hour: "2-digit",
        minute: "2-digit",
      },
      slotMinTime: "08:00",
      slotMaxTime: "22:00",
      allDaySlot: false,
    },
    dayGridMonth: {}
  },
  contentHeight: 600,
  events: Array.from(events, (e) => ({...e, title: e.task.name})),
  firstDay: 1,
  locale: "zh-cn",
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  eventOverlap: true,
  select: arg => emit('select', arg),
  eventClick: arg => emit("eventClick", arg),
  eventAdd: arg => emit("eventAdd", arg),
  eventChange: arg => emit("eventChange", arg),
  eventRemove: arg => emit("eventRemove", arg),
})

const calendarRef = useTemplateRef<ViewApi>("fullCalendar")

let api: Ref<CalendarApi>
onMounted(() => {
  api = ref(calendarRef.value!!.calendar)
})

defineExpose({
  next: () => api.value.next(),
  prev: () => api.value.prev(),
  today: () => api.value.today(),
  gotoDate: (date: DateInput) => api.value.gotoDate(date),
  switchView: (viewType: ViewType) => api.value.changeView(viewType, new Date()),
  addPlan: (plan: Plan) => {
    api.value.addEvent({
      ...plan,
      title: plan.task.name,
      color: "#00000000",
      bgColor: plan.color
    })
    api.value.unselect()
  },
  removePlan: (plan: Plan) => api.value.getEventById(plan.id)?.remove(),
  updatePlan: (plan: Plan) => {
    const event = api.value.getEventById(plan.id)
    if (event && event.extendedProps["task"]) {
      event.setExtendedProp("task", plan.task)
      event.setExtendedProp("bgColor", plan.color)
      event.setExtendedProp("comment", plan.comment)
    }
  }
})

function toPlan(event: EventApi): Plan | null {
  if (event.id === "" || event.extendedProps["task"] === undefined) {
    return null
  }
  return {
    id: event.id,
    start: event.start!!,
    end: event.end!!,
    allDay: event.allDay,
    color: event.extendedProps.bgColor,
    task: event.extendedProps.task,
    comment: event.extendedProps.comment
  }
}
</script>

<template>
  <FullCalendar
    ref="fullCalendar"
    #eventContent="{ event }"
    :options="calendarOptions">
    <slot :event="toPlan(event)"></slot>
  </FullCalendar>
</template>

<style scoped>
</style>
