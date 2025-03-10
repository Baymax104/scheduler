<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
</script>

<template>
  <div class="flex h-full">
    <SideBar/>
    <div class="flex-1 bg-gray-200">
      <div class="size-full bg-gray-50 p-4 rounded-t-2xl rounded-bl-2xl box-border">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
