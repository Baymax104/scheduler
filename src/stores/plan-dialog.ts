import { defineStore } from "pinia";
import { ref } from "vue"
import Plan from "@/model/plan.ts";

const usePlanDialogStore = defineStore("plan-dialog", () => {
  const open = ref(false)
  const plan = ref<Plan>()

  function show(p: Plan) {
    open.value = true
    plan.value = p
  }

  function dismiss() {
    open.value = false
  }

  return {
    open,
    plan,
    show,
    dismiss,
  }
})

export default usePlanDialogStore