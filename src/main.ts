import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(PiniaVuePlugin)
const pinia = createPinia();
import { useGlobalStore } from "@/database/globalStore"
const app = new Vue({
  data() {
    return {
      globalStore: useGlobalStore()
    }
  },
  router,
  render: h => h(App),
  pinia
})
app.$mount('#app')