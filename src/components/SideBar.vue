<script setup lang="ts">
import { ref } from 'vue'
import CourseItem from "@/components/CourseItem.vue";
import Course from "@/model/Course.ts";

const items = ref([
  new Course('test1', '测试1'),
  new Course('test2', '测试2'),
  new Course('test3', '测试3'),
  new Course('test4', '测试4'),
])

function onItemClick(item: Course) {
  alert(item.id)
}

</script>

<template>
  <div class="container flex flex-col bg-gray-200 text-black w-1/5 p-2 gap-2">
    <CourseItem :item="item" @click="onItemClick" v-for="item in items" :key="item.id" class="w-full"/>
  </div>
</template>

<style scoped>
</style>