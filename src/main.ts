import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import { router } from './router'
import { createPinia } from "pinia";

import VueDatePicker from '@vuepic/vue-datepicker';
import Toast, { PluginOptions, POSITION } from "vue-toastification"

const options: PluginOptions = {
  position: POSITION.TOP_CENTER,
  timeout: 2500,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: false,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: false,
  icon: true,
  rtl: false
}

const app = createApp(App)
app.use(router)
app.use(Toast, options)
app.use(createPinia())
app.component('VueDatePicker', VueDatePicker);
app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
