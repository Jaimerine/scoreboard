import { createApp } from "vue";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { loadFonts } from "./plugins/webfontloader";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

loadFonts();

import store from "./store";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas, far);

import VueSocketIO from "vue-3-socket.io";
import SocketIO from "socket.io-client";

import "./styles/_variables.scss";
import "bootstrap";

import { SetupCalendar } from "v-calendar";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(vuetify);
app.use(SetupCalendar, {});
app.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO("http://localhost:3001", {
      reconnection: false,
      forceNew: true, // this forces a new connection!
    }),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

app.component("font-awesome-icon", FontAwesomeIcon);

//bootstrap tooltips
import { Tooltip } from 'bootstrap';
const tooltip = {
  mounted(el) {
    const tooltip = new Tooltip(el);
  },
}
app.directive("tooltip", tooltip);

app.mount("#app");
