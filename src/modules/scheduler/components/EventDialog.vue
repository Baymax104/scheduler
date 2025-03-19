<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { ref, watchEffect } from "vue";
import { EventColor } from "@/utils/color.ts";
import DialogState from "@/model/dialog-state.ts";
import ScheduleEvent from "@/model/schedule-event.ts";

const {state} = defineProps<{
  state: DialogState
}>()

const emit = defineEmits<{
  save: []
  delete: []
}>()

const eventName = ref()
const eventComment = ref()
const eventColor = ref()


watchEffect(() => {
  if (state.isOpen()) {
    const event: ScheduleEvent = state.extended.event
    eventName.value = event?.task.name
    eventComment.value = event?.task.comment
    eventColor.value = event?.task.color
  }
})
</script>

<template>
  <dialog :class="{'modal-open': state.isOpen()}" class="modal">
    <div class="modal-box w-2/6 flex flex-col items-center gap-4 rounded-field">
      <div class="flex items-center w-full">
        <button
          class="hover:bg-gray-200 rounded-full p-px transition-colors duration-150"
          @click="state.toggle()">
          <Icon height="25" icon="ic:round-close" width="25"/>
        </button>
        <h2 class="font-bold text-xl m-auto">事项详情</h2>
      </div>

      <fieldset class="fieldset w-full">
        <label class="fieldset-label">事项名称</label>
        <div class="flex items-center gap-2">
          <input
            v-model="eventName"
            class="input grow"
            placeholder="事项名称"
            type="text"/>
          <div class="dropdown dropdown-end">
            <div
              :style="{'background-color': eventColor}"
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
                    @click="eventColor = color"/>
                </template>
              </div>
            </div>
          </div>
        </div>

        <label class="fieldset-label">事项备注</label>
        <textarea v-model="eventComment" class="textarea h-24 w-full max-h-36" placeholder="备注内容"></textarea>

      </fieldset>

      <div class="modal-action w-full">
        <form class="flex gap-4" method="dialog">
          <button class="btn btn-error" @click="">
            <Icon height="25" icon="ic:round-delete" width="25"/>
            删除
          </button>
          <button class="btn btn-primary" @click="">
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