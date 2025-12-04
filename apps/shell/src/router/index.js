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
    path: Checkpoints.remote,
    name: "RemoteDashboard",
    component: () => import("remote/Dashboard"),
  },
  {
    path: Checkpoints.remoteProfile,
    name: "RemoteProfile",
    component: () => import("remote/Profile"),
  },
  {
    path: Checkpoints.remoteSettings,
    name: "RemoteSettings",
    component: () => import("remote/Settings"),
  },
  {
    path: Checkpoints.reports,
    name: "Reports",
    component: () => import("remote/Report"),
  },
  {
    path: Checkpoints.assets,
    name: "Assets",
    component: () => import("remote/Asset"),
  },
  {
    path: Checkpoints.managementDashboard,
    name: "ManagementDashboard",
    component: () => import("management/Dashboard"),
  },
  {
    path: Checkpoints.managementEmployees,
    name: "ManagementEmployees",
    component: () => import("management/Employees"),
  },
  {
    path: Checkpoints.managementDepartments,
    name: "ManagementDepartments",
    component: () => import("management/Departments"),
  },
  {
    path: Checkpoints.managementReports,
    name: "ManagementReports",
    component: () => import("management/Reports"),
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
