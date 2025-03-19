<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { EventColor } from "@/utils/color.ts";
import ScheduleEvent from "@/model/schedule-event.ts";
import Task from "@/model/task.ts";
import { useToast } from "vue-toastification";
import { Icon } from "@iconify/vue";
import DialogState from "@/model/dialog-state.ts";

const {state} = defineProps<{
  state: DialogState
}>()

const emit = defineEmits<{
  confirm: [event: ScheduleEvent]
}>()

const toast = useToast()

const eventName = ref("")
const eventComment = ref("")
const selectedColor = ref(EventColor.getRandomColor())

function onConfirm() {
  if (eventName.value === "") {
    toast.error("名称不能为空")
    return
  }
  const span = state.extended.span
  const event = new ScheduleEvent({
    start: span.start,
    end: span.end,
    allDay: span.allDay,
    task: new Task({
      name: eventName.value,
      comment: eventComment.value,
    })
  })
  emit("confirm", event)
  state.toggle()
}

watchEffect(() => {
  if (!open) {
    eventName.value = ""
    eventComment.value = ""
  }
})

</script>

<template>
  <dialog :class="{'modal-open': state.isOpen()}" class="modal">
    <div class="modal-box w-2/6 flex flex-col items-center gap-4 rounded-field">
      <h2 class="font-bold text-xl">添加事项</h2>

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
              :style="{'background-color': selectedColor}"
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
                    @click="selectedColor = color"/>
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
          <button class="btn" @click="state.toggle()">
            <Icon height="25" icon="ic:round-close" width="25"/>
            取消
          </button>
          <button class="btn btn-primary" @click="onConfirm">
            <Icon height="25" icon="ic:round-done" width="25"/>
            确认
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
</style>