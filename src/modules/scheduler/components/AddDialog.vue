<script lang="ts" setup>
import { computed, reactive, ref, watchEffect } from "vue";
import { EventColor } from "@/utils/color.ts";
import Plan from "@/model/plan.ts";
import Task from "@/model/task.ts";
import { useToast } from "vue-toastification";
import { Icon } from "@iconify/vue";
import useAddDialogStore from "@/stores/add-dialog.ts";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"

dayjs.locale("zh-cn")

const emit = defineEmits<{
  confirm: [event: Plan]
}>()

const toast = useToast()
const dialog = useAddDialogStore()

const planName = ref("")
const planComment = ref("")
const planColor = ref(EventColor.getRandomColor())

const tasks = reactive<Array<Task>>([
  new Task("添加新事项", "0"),
  new Task("测试1")
])

const selected = ref<Task>(tasks[0])

const spanText = computed(() => {
  if (!dialog.span) {
    return ""
  }
  const start = dayjs(dialog.span.start).format("HH:mm")
  const end = dayjs(dialog.span.end).format("HH:mm")
  return `${start} - ${end}`
})


function onConfirm() {
  if (planName.value === "") {
    toast.error("名称不能为空")
    return
  }
  if (!dialog.span) {
    return
  }
  const {start, end, allDay} = dialog.span
  const plan = new Plan({
    ...{start, end, allDay},
    task: new Task(planName.value),
    comment: planComment.value,
  })
  emit("confirm", plan)
  dialog.dismiss()
}

watchEffect(() => {
  if (!dialog.open) {
    planName.value = ""
    planComment.value = ""
    planColor.value = EventColor.getRandomColor()
  }
})

</script>

<template>
  <dialog :class="{'modal-open': dialog.open}" class="modal">
    <div class="modal-box w-2/6 flex flex-col items-center gap-4 rounded-field">
      <h2 class="font-bold text-xl">添加事项</h2>

      <fieldset class="flex flex-col w-full gap-4">
        <div class="flex items-center gap-2">
          <select v-model="selected" class="select grow">
            <option v-for="task in tasks" :key="task.id" :value="task">{{task.name}}</option>
          </select>
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

        <label v-if="selected.id === '0'" class="input w-full">
          <span class="label">名称</span>
          <input v-model="planName" type="text"/>
        </label>

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
          <button class="btn" @click="dialog.dismiss()">
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