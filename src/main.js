import "./assets/styles/main.css";

import { createApp } from "vue";
import router from "./router";
import store from "./storage";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
