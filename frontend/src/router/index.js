import { createRouter, createWebHistory } from 'vue-router';
import MissionListView from "@/views/MissionListView.vue";

const routes = [
    { path: "/", name: "home", component: MissionListView },
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});