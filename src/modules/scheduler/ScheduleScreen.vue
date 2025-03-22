<script lang="ts" setup>
import { reactive, ref, useTemplateRef, watchEffect } from "vue";
import Scheduler from "@/modules/scheduler/components/Scheduler.vue";
import Header from "@/modules/scheduler/components/Header.vue";
import { ViewType } from "@/modules/scheduler/model/view-type.ts";
import PlanContent from "@/modules/scheduler/components/PlanContent.vue";
import PlanDialog from "@/modules/scheduler/components/PlanDialog.vue";
import AddDialog from "@/modules/scheduler/components/AddDialog.vue";
import Plan from "@/model/plan.ts";
import useAddDialogStore from "@/stores/add-dialog.ts";
import usePlanDialogStore from "@/stores/plan-dialog.ts";

const schedulerRef = useTemplateRef("scheduler")
const currentView = ref(ViewType.WEEK)
const addDialog = useAddDialogStore()
const planDialog = usePlanDialogStore()
const plans = reactive<Array<Plan>>([])

watchEffect(() => schedulerRef.value?.switchView(currentView.value))

function onAdd(plan: Plan) {
  plans.push(plan)
  schedulerRef.value!!.addPlan(plan)
}

function onSave(plan: Plan) {
  schedulerRef.value!!.updatePlan(plan)
}

function onDelete(plan: Plan) {
  plans.splice(plans.indexOf(plan), 1)
  schedulerRef.value!!.removePlan(plan)
}

</script>

<template>
  <div class="flex flex-col size-full">
    <Header
      class="mb-2"
      :currentView="currentView"
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
        :plan="event"
        @click="event => planDialog.show(event)"/>
    </Scheduler>
  </div>
  <PlanDialog
    @delete="onDelete"
    @save="onSave"/>
  <AddDialog
    @confirm="onAdd"/>
</template>

<style scoped>
</style>