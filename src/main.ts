import "./style.css";
import Layout from "@/Layout.vue";
import router from "@/router";
import { createApp } from "vue";

createApp(Layout).use(router).mount("#app");
