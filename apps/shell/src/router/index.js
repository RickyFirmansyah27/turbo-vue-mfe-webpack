import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import RemoteAppWrapper from "../views/RemoteAppWrapper.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/homepage"
  },
  {
    path: "/homepage",
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
  // Catch all untuk handle sub-routes dari remote apps
  {
    path: "/remote/*",
    name: "RemoteCatchAll",
    component: () => import("../adaptor/remote-adaptor.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// Add navigation guards untuk debugging
router.beforeEach((to, from, next) => {
  console.log('Navigating from:', from.path, 'to:', to.path);
  next();
});

router.afterEach((to, from) => {
  console.log('Navigation completed:', to.path);
});

export default router;