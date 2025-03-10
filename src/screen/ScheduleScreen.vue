<script setup lang="ts">
import { useTemplateRef } from "vue";
import Scheduler from "@/components/Scheduler.vue";
import { DateSpanApi } from "@fullcalendar/core";
import Schedule from "@/model/Schedule.ts";
import Task from "@/model/Task.ts";

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

</script>

<template>
  <div class="flex flex-col size-full">
    <div class="flex h-[100px] w-full bg-red-500">

    </div>
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