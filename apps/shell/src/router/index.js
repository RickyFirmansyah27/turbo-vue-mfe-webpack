import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import RemoteAppWrapper from "../views/RemoteAppWrapper.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/remote/component",
    name: "RemoteApp",
    component: RemoteAppWrapper,
  },
  {
    path: "/remote/profile",
    name: "RemoteProfile",
     component: () => import("../adaptor/remote-adaptor.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
