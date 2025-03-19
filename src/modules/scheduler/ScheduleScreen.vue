<script lang="ts" setup>
import { ref, useTemplateRef, watchEffect } from "vue";
import Scheduler from "@/modules/scheduler/components/Scheduler.vue";
import Header from "@/modules/scheduler/components/Header.vue";
import { ViewType } from "@/modules/scheduler/model/view-type.ts";
import EventContent from "@/modules/scheduler/components/EventContent.vue";
import EventDialog from "@/modules/scheduler/components/EventDialog.vue";
import AddDialog from "@/modules/scheduler/components/AddDialog.vue";
import DialogState from "@/model/dialog-state.ts";

const schedulerRef = useTemplateRef("scheduler")
const currentView = ref(ViewType.WEEK)

const clickDialogState = ref<DialogState>(new DialogState())
const addDialogState = ref<DialogState>(new DialogState())

watchEffect(() => schedulerRef.value?.switchView(currentView.value))

</script>

<template>
  <div class="flex flex-col size-full">
    <Header
      :currentView="currentView"
      class="mb-2"
      @gotoDate="schedulerRef?.gotoDate"
      @monthClick="currentView = ViewType.MONTH"
      @nextClick="schedulerRef?.next"
      @prevClick="schedulerRef?.prev"
      @weekClick="currentView = ViewType.WEEK"/>
    <Scheduler
      ref="scheduler"
      v-slot="{ event }"
      :events="[]"
      class="flex-1"
      @select="span => addDialogState.toggleWithArg({span})">
      <EventContent
        :event="event"
        @click="event => clickDialogState.toggleWithArg({event})"/>
    </Scheduler>
  </div>
  <EventDialog
    :state="clickDialogState"
  />
  <AddDialog
    :state="addDialogState"
    @confirm="event => schedulerRef?.addEvent(event)"/>
</template>

<style scoped>
</style>