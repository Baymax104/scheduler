<script setup lang="ts">
import Course from "@/model/Course.ts"

defineProps<{ item: Course }>()
const emit = defineEmits<{ (e: 'click', item: Course): void }>()
</script>

<template>
  <div id="container" @click="emit('click', item)">
    <div class="flex justify-between items-center">
      <div>学生：{{item.student}}</div>
      <div class="rounded-full w-[18px] h-[18px]" :style="{'background-color': item.color}"/>
    </div>
    <div id="divider"></div>
    <div>课程内容：{{item.content}}</div>
  </div>
</template>

<style scoped>
#container {
  @apply container rounded-md bg-white overflow-hidden shadow-md flex flex-col p-[12px] hover:bg-gray-100
}

#divider {
  @apply h-px bg-gray-400 my-2
}
</style>