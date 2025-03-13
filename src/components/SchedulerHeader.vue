<script setup lang="ts">
import dayjs from "dayjs";
import { Icon } from "@iconify/vue";
import { ViewType } from "@/model/globals.ts";

const {currentDate, eventCount, viewType} = defineProps<{
  currentDate: Date,
  eventCount: number,
  viewType: ViewType
}>()

const emit = defineEmits<{
  prevClick: [],
  nextClick: []
}>()

</script>

<template>
  <div class="flex w-full justify-between items-center">

    <div>
      {{`本${viewType == ViewType.DAY_MONTH ? "月" : "周"}共${eventCount}个事项`}}
    </div>

    <div class="flex items-center gap-2">
      <button
        class="box-border rounded-full hover:bg-gray-200 transition duration-150"
        @click="emit('prevClick')">
        <Icon height="35" icon="ic:round-keyboard-arrow-left" width="35"/>
      </button>
      <button class="font-bold text-xl">
        {{dayjs(currentDate).format("YYYY-MM-DD")}}
      </button>
      <button
        class="box-border rounded-full hover:bg-gray-200 transition duration-150"
        @click="emit('nextClick')">
        <Icon height="35" icon="ic:round-keyboard-arrow-right" width="35"/>
      </button>
    </div>

    <div class="join">
      <button class="btn btn-soft btn-primary">周视图</button>
      <button class="btn btn-soft btn-primary">月视图</button>
    </div>
  </div>
</template>

<style scoped>

</style>