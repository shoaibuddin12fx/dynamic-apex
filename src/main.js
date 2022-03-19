import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue } from "bootstrap-vue";
// import { IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue'
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css";

Vue.use(BootstrapVue);
// Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false;

// import mitt from "mitt";
// const emitter = mitt();

export const bus = new Vue();
new Vue({
  render: (h) => h(App),
}).$mount("#app");
