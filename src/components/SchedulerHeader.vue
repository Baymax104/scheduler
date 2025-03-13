<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ViewType } from "@/model/globals.ts";
import { computed, ref } from "vue";
import dayjs, { Dayjs } from "dayjs";

const {viewType} = defineProps<{
  viewType: ViewType
}>()

const emit = defineEmits<{
  prevClick: [],
  nextClick: []
  weekClick: [],
  monthClick: [],
  gotoDate: [date: Date]
}>()

const date = ref<Dayjs>(dayjs())

const title = computed(() => {
  if (viewType === ViewType.WEEK) {
    const start = date.value.startOf("week")
    const end = date.value.endOf("week")
    return `${start.format("MM/DD")} - ${end.format("MM/DD")}`
  } else {
    return `${date.value.month() + 1}月`
  }
})

function nextClick() {
  emit("nextClick")
  if (viewType === ViewType.WEEK) {
    date.value = date.value.add(1, "week")
  } else {
    date.value = date.value.add(1, "month")
  }
}

function prevClick() {
  emit("prevClick")
  if (viewType === ViewType.WEEK) {
    date.value = date.value.subtract(1, "week")
  } else {
    date.value = date.value.subtract(1, "month")
  }
}

function onWeekClick() {
  emit("weekClick")
  date.value = dayjs()
}

function onMonthClick() {
  emit("monthClick")
  date.value = dayjs()
}

function onGotoDate(target: Date) {
  emit('gotoDate', target)
  date.value = dayjs(target)
}

</script>

<template>
  <div class="flex w-full justify-between items-center">

    <VueDatePicker
      cancelText="取消"
      disable-year-select
      locale="zh-cn"
      selectText="选择"
      @update:model-value="onGotoDate">
      <template #trigger>
        <button class="btn btn-soft btn-primary">
          <Icon height="23" icon="ic:outline-calendar-month" width="23"/>
          跳转日期
        </button>
      </template>
      <template #time-picker>
        <div></div>
      </template>
    </VueDatePicker>

    <div class="flex items-center gap-3">
      <button
        class="box-border rounded-full hover:bg-gray-200 transition duration-150"
        @click="prevClick">
        <Icon height="35" icon="ic:round-keyboard-arrow-left" width="35"/>
      </button>
      <div class="w-44 flex justify-center">
        <button class="font-bold text-2xl">{{title}}</button>
      </div>
      <button
        class="box-border rounded-full hover:bg-gray-200 transition duration-150"
        @click="nextClick">
        <Icon height="35" icon="ic:round-keyboard-arrow-right" width="35"/>
      </button>
    </div>

    <div class="join">
      <button
        :class="{'btn-active': viewType === ViewType.WEEK}"
        class="btn btn-soft btn-primary rounded-l-full"
        @click="onWeekClick">
        周视图
      </button>
      <button
        :class="{'btn-active': viewType === ViewType.MONTH}"
        class="btn btn-soft btn-primary rounded-r-full"
        @click="onMonthClick">
        月视图
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>