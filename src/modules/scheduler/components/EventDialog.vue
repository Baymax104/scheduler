<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { computed, ref, watchEffect } from "vue";
import { EventColor } from "@/utils/color.ts";
import Plan from "@/model/plan.ts";
import usePlanDialogStore from "@/stores/plan-dialog.ts";
import dayjs from "dayjs";


const emit = defineEmits<{
  save: [event: Plan]
  delete: [event: Plan]
}>()

const dialog = usePlanDialogStore()
const planName = ref("")
const planComment = ref("")
const planColor = ref("")

const spanText = computed(() => {
  const start = dayjs(dialog.plan?.start ?? new Date(0)).format("HH:mm")
  const end = dayjs(dialog.plan?.end ?? new Date(0)).format("HH:mm")
  return `${start} - ${end}`
})


watchEffect(() => {
  if (dialog.open && dialog.plan) {
    planName.value = dialog.plan.task.name
    planComment.value = dialog.plan.comment
    planColor.value = dialog.plan.color
  }
})


function onSave() {
  dialog.plan!!.task.name = planName.value
  dialog.plan!!.comment = planComment.value
  dialog.plan!!.color = planColor.value
  emit('save', dialog.plan!!)
  dialog.dismiss()
}

function onDelete() {
  emit('delete', dialog.plan!!)
  dialog.dismiss()
}
</script>

<template>
  <dialog :class="{'modal-open': dialog.open}" class="modal">
    <div class="modal-box w-2/6 flex flex-col items-center gap-4 rounded-field">
      <div class="flex items-center w-full">
        <button
          class="hover:bg-gray-200 rounded-full p-px transition-colors duration-150"
          @click="dialog.dismiss()">
          <Icon height="25" icon="ic:round-close" width="25"/>
        </button>
        <h2 class="font-bold text-xl m-auto">事项详情</h2>
      </div>

      <fieldset class="flex flex-col w-full gap-4">

        <div class="flex items-center gap-2">
          <label class="input grow">
            <span class="label">名称</span>
            <input v-model="planName" type="text"/>
          </label>
          <div class="dropdown dropdown-end">
            <div
              :style="{'background-color': planColor}"
              class="rounded-full size-[30px] p-px border-2 border-base-300/90 cursor-pointer"
              tabindex="0"/>
            <div
              class="dropdown-content card shadow-md bg-base-100 rounded-field w-44 h-30 p-3 flex items-center justify-center"
              tabindex="0">
              <div class="grid grid-cols-5 gap-4">
                <template v-for="color in EventColor.colors" :key="color">
                  <div
                    :style="{'background-color': color}"
                    class="rounded-full size-[20px] cursor-pointer"
                    @click="planColor = color"/>
                </template>
              </div>
            </div>
          </div>
        </div>

        <label class="input w-full">
          <span class="label">备注</span>
          <input v-model="planComment">
        </label>

        <label class="input w-full">
          <span class="label">时间段</span>
          <span class="text-gray-400">{{spanText}}</span>
        </label>

      </fieldset>

      <div class="modal-action w-full">
        <form class="flex gap-4" method="dialog">
          <button class="btn btn-error" @click="onDelete">
            <Icon height="25" icon="ic:round-delete" width="25"/>
            删除
          </button>
          <button class="btn btn-primary" @click="onSave">
            <Icon height="25" icon="ic:round-done" width="25"/>
            保存
          </button>
        </form>
      </div>
    </div>
  </dialog>

</template>

<style scoped>
</style>