import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import { router } from './router'

import VueDatePicker from '@vuepic/vue-datepicker';

const app = createApp(App)
app.use(router)
app.component('VueDatePicker', VueDatePicker);
app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
