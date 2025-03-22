<script lang="ts" setup>
import Plan from "@/model/plan.ts";


const {plan} = defineProps<{ plan: Plan | null }>()

const emit = defineEmits<{
  click: [event: Plan]
}>()

function onClick() {
  if (plan !== null) {
    emit("click", plan)
  }
}

</script>

<template>
  <div
    :style="{'background-color': plan?.color}"
    class="flex flex-col items-center justify-center size-full rounded-md shadow-md px-[10px]"
    @click="onClick">
    <div class="w-full truncate text-lg">
      {{plan?.task.name}}
    </div>
  </div>
</template>

<style scoped>

</style>