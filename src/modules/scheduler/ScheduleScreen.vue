<script lang="ts" setup>
import { ref, useTemplateRef, watchEffect } from "vue";
import Scheduler from "@/modules/scheduler/components/Scheduler.vue";
import Header from "@/modules/scheduler/components/Header.vue";
import { ViewType } from "@/modules/scheduler/model/view-type.ts";
import PlanContent from "@/modules/scheduler/components/PlanContent.vue";
import EventDialog from "@/modules/scheduler/components/EventDialog.vue";
import AddDialog from "@/modules/scheduler/components/AddDialog.vue";
import Plan from "@/model/plan.ts";
import useAddDialogStore from "@/stores/add-dialog.ts";
import usePlanDialogStore from "@/stores/plan-dialog.ts";

const schedulerRef = useTemplateRef("scheduler")
const currentView = ref(ViewType.WEEK)
const addDialog = useAddDialogStore()
const planDialog = usePlanDialogStore()

watchEffect(() => schedulerRef.value?.switchView(currentView.value))

function onAdd(event: Plan) {
  schedulerRef.value!!.addEvent(event)
}

function onSave(event: Plan) {
  console.log(event.task.name)
}

function onDelete(event: Plan) {
  console.log(event.task.name)
}

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
      @select="span => addDialog.show(span)">
      <PlanContent
        :event="event"
        @click="event => planDialog.show(event)"/>
    </Scheduler>
  </div>
  <EventDialog
    @delete="onDelete"
    @save="onSave"/>
  <AddDialog
    @confirm="onAdd"/>
</template>

<style scoped>
</style>