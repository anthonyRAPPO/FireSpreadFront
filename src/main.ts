import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";
import ToastService from "primevue/toastservice";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-dark-purple/theme.css";
import "primeicons/primeicons.css";

createApp(App).use(router).use(PrimeVue).use(ToastService).mount("#app");
