<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import Scheduler from "@/components/Scheduler.vue";
import { DateSpanApi } from "@fullcalendar/core";
import Schedule from "@/model/schedule.ts";
import Task from "@/model/task.ts";
import SchedulerHeader from "@/components/SchedulerHeader.vue";
import { ViewType } from "@/model/globals.ts";

function onSelect(arg: DateSpanApi): Schedule {
  return new Schedule({
    task: new Task({
      name: "Test",
      comment: "TestContent",
    }),
    ...arg
  })
}

const schedulerRef = useTemplateRef("scheduler")


onMounted(() => {
})

</script>

<template>
  <div class="flex flex-col size-full">
    <SchedulerHeader
      :currentDate="schedulerRef ? schedulerRef!!.getDate() : new Date()"
      :eventCount="5"
      :viewType="ViewType.DAY_MONTH"
      class="mb-2"
      @nextClick="schedulerRef?.next"
      @prevClick="schedulerRef?.prev"/>
    <Scheduler
      class="flex-1"
      ref="scheduler"
      v-slot="{ timeText, event }"
      :onSelect="onSelect">
      <div class="flex flex-col items-center justify-center size-full">
        <div>{{timeText}}</div>
        <div>{{event.title}}</div>
      </div>
    </Scheduler>
  </div>
</template>

<style scoped>
</style>