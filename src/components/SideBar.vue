<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

interface Navigation {
  route: string
  title: string
  icon: string
}

const navigations: Array<Navigation> = [
  {
    route: "/",
    title: "计划表",
    icon: "material-symbols:table-outline",
  },
  {
    route: "/task",
    title: "事项管理",
    icon: "material-symbols:format-list-bulleted-rounded"
  }
]

const router = useRouter();

const selected = ref(navigations[0])

watchEffect(() => router.push(selected.value.route))

</script>

<template>
  <div class="flex flex-col items-center bg-gray-200 text-black w-16 h-full">
    <template v-for="nav in navigations" :key="nav.route">
      <div :data-tip="nav.title" class="tooltip tooltip-right">
        <button
          :class="{
            'btn-primary btn-active': selected.route === nav.route,
            'bg-gray-200 hover:bg-gray-300': selected.route !== nav.route
          }"
          class="btn mb-2 mt-2 rounded p-2"
          @click="selected = nav">
          <Icon
            :class="selected.route === nav.route ? 'text-white' : 'text-black'"
            :icon="nav.icon"
            height="25"
            width="25"/>
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
</style>