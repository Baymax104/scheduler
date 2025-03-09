<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import Scheduler from "@/components/Scheduler.vue";
import { DateSelectArg, EventInput } from "@fullcalendar/core";

function onSelect(arg: DateSelectArg): EventInput {
  return {
    title: "test",
    start: arg.startStr,
    end: arg.endStr,
    allDay: arg.allDay
  }
}

const schedulerRef = useTemplateRef("scheduler")

onMounted(() => {
})
</script>

<template>
  <button class="btn">点我</button>
  <Scheduler
    ref="scheduler"
    v-slot="{ timeText, event }" :onSelect="onSelect">
    <div>{{timeText}}</div>
    <div>{{event.title}}</div>
  </Scheduler>
</template>

<style scoped>

</style>