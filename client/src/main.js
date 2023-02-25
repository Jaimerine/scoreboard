import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas, far);

import VueSocketIO from "vue-3-socket.io";
import SocketIO from "socket.io-client";
import "bootstrap";
import { SetupCalendar } from "v-calendar";
import VueApexCharts from "vue3-apexcharts";
import timeago from 'vue-timeago3'

const app = createApp(App);

app.use(store);
app.use(router);
app.use(SetupCalendar, {});
app.use(VueApexCharts);
app.use(timeago);
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
