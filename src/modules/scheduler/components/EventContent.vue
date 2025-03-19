<script lang="ts" setup>
import ScheduleEvent from "@/model/schedule-event.ts";


const {event} = defineProps<{ event: ScheduleEvent | null }>()

const emit = defineEmits<{
  click: [event: ScheduleEvent]
}>()

function onClick() {
  if (event !== null) {
    emit("click", event)
  }
}

</script>

<template>
  <div
    :style="{'background-color': event?.task.color}"
    class="flex flex-col items-center justify-center size-full rounded-md shadow-md px-[10px]"
    @click="onClick">
    <div class="w-full truncate text-lg">
      {{event?.task.name}}
    </div>
  </div>
</template>

<style scoped>

</style>