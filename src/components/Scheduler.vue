<script lang="ts" setup>
import { onMounted, reactive, ref, useTemplateRef } from "vue"
import {
  CalendarApi,
  CalendarOptions,
  DateInput,
  DateSelectArg,
  EventAddArg,
  EventChangeArg,
  EventClickArg,
  EventInput,
  EventRemoveArg,
  ViewApi,
} from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/vue3"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

const {
  onSelect = arg => ({
    title: "test",
    start: arg.start,
    end: arg.end,
    allDay: arg.allDay
  })
} = defineProps<{
  onSelect: (arg: DateSelectArg) => EventInput
}>()

const emit = defineEmits<{
  eventClick: [arg: EventClickArg],
  eventAdd: [arg: EventAddArg],
  eventChange: [arg: EventChangeArg],
  eventRemove: [arg: EventRemoveArg],
}>()


const calendarOptions = reactive<CalendarOptions>({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  // headerToolbar: {
  //   left: "prev,next today",
  //   center: "title",
  //   right: "dayGridMonth,timeGridWeek",
  // },
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
  height: "100%",
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
    const event = onSelect(arg)
    calendar.unselect()
    calendar.addEvent(event)
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
  changeView: (viewType: string) => api.value?.changeView(viewType),
  gotoDate: (date: DateInput) => api.value?.gotoDate(date),
  getDate: () => api.value?.getDate(),
})
</script>

<template>
  <FullCalendar ref="fullCalendar" v-slot="{ event, timeText }" :options="calendarOptions">
    <div>{{timeText}}</div>
    <div>{{event.title}}</div>
  </FullCalendar>
</template>

<style scoped>
</style>
