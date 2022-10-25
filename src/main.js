import { createApp } from "vue";
import { createPinia } from "pinia";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);

import database from "./firebase/firebase";

import App from "./App.vue";
import router from "./router/router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component('fa', FontAwesomeIcon);

app.provide('database', database);

app.mount("#app");
