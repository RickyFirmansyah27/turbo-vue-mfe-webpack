<template>
  <div class="p-6">
    <!-- Header -->
    <PageHeader
      title="Employee Management"
      subtitle="Manage company employees and their information"
      gradient="from-blue-600 to-teal-600"
      subtitle-color="text-blue-100"
    />

    <div class="mb-6"></div>
    
    <!-- Actions -->
    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div class="flex space-x-4">
          <Button
            label="Add Employee"
            type="primary"
            @click="addEmployee"
          >
            <template #icon>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </template>
          </Button>
          <Button
            label="Export Data"
            type="secondary"
            @click="exportData"
          />
        </div>
        <div class="flex space-x-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search employees..."
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button
            label="Filter"
            type="secondary"
            @click="toggleFilter"
          />
        </div>
      </div>
    </div>

    <!-- Employee Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <StatsCard
        title="Total Employees"
        :value="employees.length.toString()"
        change="+12"
        trend="up"
      />
      <StatsCard
        title="Active"
        :value="activeEmployees.toString()"
        change="+8"
        trend="up"
      />
      <StatsCard
        title="On Leave"
        :value="onLeaveEmployees.toString()"
        change="-2"
        trend="down"
      />
      <StatsCard
        title="New This Month"
        :value="newEmployees.toString()"
        change="+5"
        trend="up"
      />
    </div>

    <!-- Employee List -->
    <div class="bg-white rounded-xl shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Employee Directory</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="employee in filteredEmployees" :key="employee.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" :src="employee.avatar" :alt="employee.name">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ employee.name }}</div>
                    <div class="text-sm text-gray-500">{{ employee.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ employee.position }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ employee.department }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                ]">
                  {{ employee.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(employee.joinDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button
                  label="Edit"
                  type="secondary"
                  size="small"
                  @click="editEmployee(employee)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { PageHeader, Button, StatsCard } from 'commons/Components';
import { formatDate } from 'commons/Utils';

export default {
  name: 'Employees',
  components: {
    PageHeader,
    Button,
    StatsCard
  },
  data() {
    return {
      searchQuery: '',
      showFilter: false,
      employees: [
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah.johnson@company.com',
          position: 'Software Engineer',
          department: 'Engineering',
          status: 'Active',
          joinDate: '2023-01-15',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
          id: 2,
          name: 'Michael Chen',
          email: 'michael.chen@company.com',
          position: 'Product Manager',
          department: 'Product',
          status: 'Active',
          joinDate: '2022-08-20',
          avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
          id: 3,
          name: 'Emily Rodriguez',
          email: 'emily.rodriguez@company.com',
          position: 'UX Designer',
          department: 'Design',
          status: 'On Leave',
          joinDate: '2023-03-10',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
          id: 4,
          name: 'David Kim',
          email: 'david.kim@company.com',
          position: 'Data Analyst',
          department: 'Analytics',
          status: 'Active',
          joinDate: '2023-05-22',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
          id: 5,
          name: 'Lisa Wang',
          email: 'lisa.wang@company.com',
          position: 'Marketing Specialist',
          department: 'Marketing',
          status: 'Active',
          joinDate: '2023-07-18',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      ]
    };
  },
  computed: {
    filteredEmployees() {
      if (!this.searchQuery) return this.employees;
      return this.employees.filter(employee =>
        employee.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    activeEmployees() {
      return this.employees.filter(emp => emp.status === 'Active').length;
    },
    onLeaveEmployees() {
      return this.employees.filter(emp => emp.status === 'On Leave').length;
    },
    newEmployees() {
      const currentMonth = new Date().getMonth();
      return this.employees.filter(emp => {
        const joinMonth = new Date(emp.joinDate).getMonth();
        return joinMonth === currentMonth;
      }).length;
    }
  },
  methods: {
    formatDate,
    addEmployee() {
      alert('Add new employee functionality would open a form');
    },
    exportData() {
      alert('Export employee data functionality');
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    editEmployee(employee) {
      alert(`Edit employee: ${employee.name}`);
    }
  }
};
</script>