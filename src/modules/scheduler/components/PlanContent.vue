<script lang="ts" setup>
import Plan from "@/model/plan.ts";


const {event} = defineProps<{ event: Plan | null }>()

const emit = defineEmits<{
  click: [event: Plan]
}>()

function onClick() {
  if (event !== null) {
    emit("click", event)
  }
}

</script>

<template>
  <div
    :style="{'background-color': event?.color}"
    class="flex flex-col items-center justify-center size-full rounded-md shadow-md px-[10px]"
    @click="onClick">
    <div class="w-full truncate text-lg">
      {{event?.task.name}}
    </div>
  </div>
</template>

<style scoped>

</style>