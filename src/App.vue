<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
</script>

<template>
  <div class="flex h-full">
    <SideBar/>
    <div class="flex-1">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>
</style>
