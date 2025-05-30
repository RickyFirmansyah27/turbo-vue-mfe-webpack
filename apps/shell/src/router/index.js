import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { isRemotePath, Checkpoints } from 'commons/Utils';
import RemoteAppWrapper from "../views/RemoteAppWrapper.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: Checkpoints.transactions,
    name: "Transactions",
    component: RemoteAppWrapper,
  },
  {
    path: Checkpoints.remoteProfile,
    name: "RemoteProfile",
    component: () => import("../adaptor/remote-adaptor.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (isRemotePath(from.path) && !isRemotePath(to.path)) {
    window.location.href = to.fullPath;
  } else {
    next();
  }
});


export default router;
