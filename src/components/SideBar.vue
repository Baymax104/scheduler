<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selected = ref(0)

interface Navigation {
  index: number
  route: string
  title: string
  icon: string
}

const navigations = ref<Array<Navigation>>([
  {
    index: 0,
    route: "/",
    title: "计划表",
    icon: "material-symbols:table-outline",
  },
  {
    index: 1,
    route: "/task",
    title: "事项管理",
    icon: "material-symbols:format-list-bulleted-rounded"
  }
])

function onNavigate(nav: Navigation) {
  router.push(nav.route)
  selected.value = nav.index
}

</script>

<template>
  <div class="flex flex-col items-center bg-gray-200 text-black w-16 h-full">
    <template v-for="nav in navigations" :key="nav.index">
      <div :data-tip="nav.title" class="tooltip tooltip-right">
        <button
          :class="{
            'bg-primary-500': selected === nav.index,
            'hover:bg-gray-300': selected !== nav.index
          }"
          class="mb-2 mt-2 rounded p-2 group transition-colors duration-200"
          @click="onNavigate(nav)">
          <Icon
            :class="selected === nav.index ? 'text-white' : 'text-black'"
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