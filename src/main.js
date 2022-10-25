import { createApp } from "vue";
import { createPinia } from "pinia";
import database from "./firebase/firebase";

import App from "./App.vue";
import router from "./router/router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.provide('database', database);

app.mount("#app");
