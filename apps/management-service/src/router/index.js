import { Checkpoints } from 'commons/Utils';
import Dashboard from '../views/Dashboard.vue';
import Employees from '../views/Employees.vue';
import Departments from '../views/Departments.vue';
import Reports from '../views/Reports.vue';

const routes = [
  {
    path: Checkpoints.managements,
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: Checkpoints.managementEmployees,
    name: 'Employees',
    component: Employees
  },
  {
    path: Checkpoints.managementDepartments,
    name: 'Departments',
    component: Departments
  },
  {
    path: Checkpoints.managementReports,
    name: 'Reports',
    component: Reports
  }
];

export default routes;