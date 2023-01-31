import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { md3 } from 'vuetify/blueprints'

import { createVuetify } from "vuetify";

export default createVuetify({
  blueprint: md3,
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1867C0",
          secondary: "#5CBBF6",
        },
      },
    },
  },
});
