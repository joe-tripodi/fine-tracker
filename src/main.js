import { createApp } from "vue";
import { createPinia } from "pinia";
import database from "./firebase/firebase";
import App from "./App.vue";
import router from "./router/router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

import vuetify from './plugins/vuetify'

library.add(fas);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.component('fa', FontAwesomeIcon);

app.provide('database', database);

app.mount("#app");
