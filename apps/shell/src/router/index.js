import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { Checkpoints, isSameRemotePrefix} from 'commons/Utils';
import RemoteAppWrapper from "../views/RemoteAppWrapper.vue";

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
  if (isSameRemotePrefix(from.path, to.path)) {
    window.location.href = to.fullPath;
  } else {
    next();
  }
});


export default router;
