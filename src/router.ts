import { createRouter, createWebHistory } from "vue-router";

// Import Route pages
import HomeView from "@/views/HomeView.vue";
import PVPView from "@/views/PVPView.vue";
import PVCView from "@/views/PVCView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/pvp", name: "player_vs_player", component: PVPView },
    { path: "/pvc", name: "player_vs_computer", component: PVCView },
  ],
});

export default router;
