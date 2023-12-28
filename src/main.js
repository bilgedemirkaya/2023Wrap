import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/dist/vuetify.min.css'
import './global.css'

import { createPinia } from 'pinia'

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    iconfont: 'mdiSvg',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      dark: {
        primary: '#ffd700',
      },
    },
    defaultTheme: 'dark'
  },
  defaults: {
    VBtn: {
      color: '#f5da42',
      size: 'large',
    },
  },
});

const app = createApp(App);

app.use(router).use(vuetify).use(pinia);

app.mount("#app");
