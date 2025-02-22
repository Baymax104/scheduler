<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selected = ref(0)

function onSelected(index: number) {
  selected.value = index
  if (index === 0) {
    router.push("/")
  } else if (index === 1) {
    router.push("/course")
  }
}

</script>

<template>
  <div class="flex flex-col items-center bg-gray-200 text-black w-16">
    <button
      class="mb-2 mt-2 rounded p-2 group"
      :class="{
        'bg-blue-500': selected === 0,
        'hover:bg-gray-300': selected !== 0
      }"
      @click="onSelected(0)">
      <Icon icon="ic:baseline-schedule" width="24" height="24" :class="selected === 0 ? 'text-white' : 'text-black'"/>
    </button>
    <button
      class="mt-2 rounded p-2 group"
      :class="{
        'bg-blue-500': selected === 1,
        'hover:bg-gray-300': selected !== 1,
      }"
      @click="onSelected(1)">
      <Icon icon="ic:baseline-format-list-bulleted" width="24" height="24"
            :class="selected === 1 ? 'text-white' : 'text-black'"/>
    </button>
  </div>
</template>

<style scoped>
</style>