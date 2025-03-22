import { defineStore } from "pinia";
import { ref } from "vue";
import { DateSpanApi } from "@fullcalendar/core";

const useAddDialogStore = defineStore("add-dialog", () => {
  const open = ref(false)
  const span = ref<DateSpanApi>()

  function show(s: DateSpanApi) {
    open.value = true
    span.value = s
  }

  function dismiss() {
    open.value = false
  }

  return {
    open,
    span,
    show,
    dismiss,
  }
})

export default useAddDialogStore