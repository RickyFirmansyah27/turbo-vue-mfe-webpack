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
    path: Checkpoints.assets,
    name: "AssetsDashboard",
    component: () => import("remote/Dashboard"),
  },
  {
    path: Checkpoints.assetsProfile,
    name: "AssetsProfile",
    component: () => import("remote/Profile"),
  },
  {
    path: Checkpoints.assetsSetting,
    name: "AssetsSettings",
    component: () => import("remote/Settings"),
  },
  {
    path: Checkpoints.assetsReport,
    name: "AssetsReports",
    component: () => import("remote/Report"),
  },
  {
    path: Checkpoints.assetsList,
    name: "AssetsList",
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
