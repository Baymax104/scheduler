<script lang="ts" setup>
import { onMounted, reactive, ref, useTemplateRef } from "vue"
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
import Schedule from "@/model/schedule.ts";
import { ViewType } from "@/model/globals.ts";

const {onSelect} = defineProps<{
  onSelect: (arg: DateSpanApi) => Schedule
}>()

const emit = defineEmits<{
  eventClick: [arg: EventClickArg],
  eventAdd: [arg: EventAddArg],
  eventChange: [arg: EventChangeArg],
  eventRemove: [arg: EventRemoveArg],
}>()

defineSlots<{
  default(props: { timeText: string, event: EventApi }): void
}>()

const calendarOptions = reactive<CalendarOptions>({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: false,
  buttonText: {
    week: "周视图",
    month: "月视图",
    today: "今天"
  },
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
  initialView: "timeGridWeek",
  contentHeight: 600,
  events: [],
  firstDay: 1,
  locale: "zh-cn",
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  eventOverlap: true,
  select: arg => {
    const calendar = arg.view.calendar
    const schedule = onSelect(arg)
    calendar.unselect()
    calendar.addEvent({
      ...schedule,
      title: schedule.task.name,
      color: schedule.task.color
    })
  },
  eventClick: arg => emit("eventClick", arg),
  eventAdd: arg => emit("eventAdd", arg),
  eventChange: arg => emit("eventChange", arg),
  eventRemove: arg => emit("eventRemove", arg),
})

const calendarRef = useTemplateRef<ViewApi>("fullCalendar")
const api = ref<CalendarApi | null>(null)

onMounted(() => {
  api.value = calendarRef.value!!.calendar
})

defineExpose({
  next: () => api.value?.next(),
  prev: () => api.value?.prev(),
  today: () => api.value?.today(),
  gotoDayGridMonth: () => api.value?.changeView(ViewType.DAY_MONTH),
  gotoTimeGridWeek: () => api.value?.changeView(ViewType.TIME_WEEK),
  gotoDate: (date: DateInput) => api.value?.gotoDate(date),
  getDate: () => api.value != null ? api.value.getDate() : new Date(),
})
</script>

<template>
  <FullCalendar
    ref="fullCalendar"
    #eventContent="{ event, timeText }"
    :options="calendarOptions">
    <slot :timeText="timeText" :event="event"></slot>
  </FullCalendar>
</template>

<style scoped>
</style>
