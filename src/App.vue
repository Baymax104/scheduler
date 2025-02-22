<script setup lang="ts">
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <div class="flex h-screen">
    <SideBar/>

    <div class="flex-1 bg-gray-100 p-6">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>
</style>
