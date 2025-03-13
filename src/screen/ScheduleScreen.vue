<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";
import Scheduler from "@/components/Scheduler.vue";
import { DateSpanApi } from "@fullcalendar/core";
import Schedule from "@/model/schedule.ts";
import Task from "@/model/task.ts";
import SchedulerHeader from "@/components/SchedulerHeader.vue";
import { ViewType } from "@/model/globals.ts";

const schedulerRef = useTemplateRef("scheduler")

const viewType = ref(ViewType.WEEK)

function onSelect(arg: DateSpanApi): Schedule {
  return new Schedule({
    task: new Task({
      name: "Test",
      comment: "TestContent",
    }),
    ...arg
  })
}

onMounted(() => {
  viewType.value = schedulerRef.value!!.currentView
})

</script>

<template>
  <div class="flex flex-col size-full">
    <SchedulerHeader
      :viewType="viewType"
      class="mb-2"
      @nextClick="schedulerRef?.next"
      @gotoDate="schedulerRef?.gotoDate"
      @monthClick="schedulerRef?.switchView(ViewType.MONTH)"
      @prevClick="schedulerRef?.prev"
      @weekClick="schedulerRef?.switchView(ViewType.WEEK)"/>
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