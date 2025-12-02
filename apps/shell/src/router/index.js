import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { Checkpoints } from 'commons/Utils';
import { NotFound } from 'commons/Components';

Vue.use(VueRouter);

const routes = [
  {
    path: Checkpoints.homepage,
    name: "Home",
    component: Home,
  },
  {
    path: Checkpoints.transactions,
    name: "Transactions",
    component: () => import("remote/Dashboard"),
  },
  {
    path: Checkpoints.remoteProfile,
    name: "RemoteProfile",
    component: () => import("remote/Profile"),
  },
  {
    path: '/remote/settings',
    name: "RemoteSettings",
    component: () => import("remote/Settings"),
  },
    {
    path: '/*',
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
