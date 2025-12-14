import { createMemoryHistory, createRouter } from "vue-router";

// Import Route pages
import HomeView from "./routes/HomeView.vue";
import PVPView from "./routes/PVPView.vue";
import PVCView from "./routes/PVCView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/pvp", component: PVPView },
  { path: "/pvc", component: PVCView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
