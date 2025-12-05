<template>
  <div class="p-6">
    <!-- Header -->
    <PageHeader
      title="Department Management"
      subtitle="Organize and manage company departments"
      gradient="from-green-600 to-blue-600"
      subtitle-color="text-green-100"
    />

    <div class="mb-6"></div>
    
    <!-- Actions -->
    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div class="flex space-x-4">
          <Button
            label="Add Department"
            type="primary"
            @click="addDepartment"
          >
            <template #icon>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </template>
          </Button>
          <Button
            label="Department Report"
            type="secondary"
            @click="generateReport"
          />
        </div>
        <div class="flex space-x-2">
          <select
            v-model="selectedFilter"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Departments</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <Button
            label="Filter"
            type="secondary"
            @click="applyFilter"
          />
        </div>
      </div>
    </div>

    <!-- Department Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <StatsCard
        title="Total Departments"
        :value="departments.length.toString()"
        change="+2"
        trend="up"
      />
      <StatsCard
        title="Active"
        :value="activeDepartments.toString()"
        change="0"
        trend="neutral"
      />
      <StatsCard
        title="Employees"
        :value="totalEmployees.toString()"
        change="+15"
        trend="up"
      />
      <StatsCard
        title="Avg Team Size"
        :value="averageTeamSize.toString()"
        change="+1"
        trend="up"
      />
    </div>

    <!-- Department Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="department in filteredDepartments"
        :key="department.id"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
      >
        <!-- Department Header -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div 
              class="w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold"
              :style="{ backgroundColor: department.color }"
            >
              {{ department.name.charAt(0) }}
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ department.name }}</h3>
              <p class="text-sm text-gray-600">{{ department.head }}</p>
            </div>
          </div>
          <span :class="[
            'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
            department.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          ]">
            {{ department.status }}
          </span>
        </div>

        <!-- Department Stats -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900">{{ department.employeeCount }}</div>
            <div class="text-xs text-gray-600">Employees</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900">{{ department.budget }}</div>
            <div class="text-xs text-gray-600">Budget</div>
          </div>
        </div>

        <!-- Department Progress -->
        <div class="mb-4">
          <div class="flex justify-between text-sm text-gray-600 mb-1">
            <span>Team Capacity</span>
            <span>{{ Math.round((department.employeeCount / department.maxCapacity) * 100) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="h-2 rounded-full"
              :style="{ 
                width: `${Math.min((department.employeeCount / department.maxCapacity) * 100, 100)}%`,
                backgroundColor: department.color 
              }"
            ></div>
          </div>
          <div class="text-xs text-gray-500 mt-1">
            {{ department.employeeCount }}/{{ department.maxCapacity }} employees
          </div>
        </div>

        <!-- Recent Activities -->
        <div class="mb-4">
          <h4 class="text-sm font-medium text-gray-900 mb-2">Recent Activities</h4>
          <div class="space-y-2">
            <div
              v-for="activity in department.activities.slice(0, 2)"
              :key="activity.id"
              class="flex items-center space-x-2 text-xs text-gray-600"
            >
              <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>{{ activity.description }}</span>
              <span class="text-gray-400">{{ activity.time }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex space-x-2">
          <Button
            label="View Details"
            type="secondary"
            size="small"
            @click="viewDetails(department)"
          />
          <Button
            label="Manage"
            type="primary"
            size="small"
            @click="manageDepartment(department)"
          />
        </div>
      </div>
    </div>

    <!-- Department Modal (placeholder) -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mt-2">{{ modalTitle }}</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">{{ modalContent }}</p>
          </div>
          <div class="items-center px-4 py-3">
            <Button
              label="Close"
              type="primary"
              @click="closeModal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PageHeader, Button, StatsCard } from 'commons/Components';

export default {
  name: 'Departments',
  components: {
    PageHeader,
    Button,
    StatsCard
  },
  data() {
    return {
      selectedFilter: '',
      showModal: false,
      modalTitle: '',
      modalContent: '',
      departments: [
        {
          id: 1,
          name: 'Engineering',
          head: 'Sarah Johnson',
          status: 'Active',
          employeeCount: 24,
          maxCapacity: 30,
          budget: '$2.4M',
          color: '#3B82F6',
          activities: [
            { id: 1, description: 'Deployed new feature', time: '2 hours ago' },
            { id: 2, description: 'Code review completed', time: '1 day ago' },
            { id: 3, description: 'New sprint started', time: '2 days ago' }
          ]
        },
        {
          id: 2,
          name: 'Product',
          head: 'Michael Chen',
          status: 'Active',
          employeeCount: 8,
          maxCapacity: 10,
          budget: '$800K',
          color: '#10B981',
          activities: [
            { id: 1, description: 'Product roadmap updated', time: '30 min ago' },
            { id: 2, description: 'User research session', time: '3 hours ago' },
            { id: 3, description: 'Feature prioritization', time: '1 day ago' }
          ]
        },
        {
          id: 3,
          name: 'Design',
          head: 'Emily Rodriguez',
          status: 'Active',
          employeeCount: 6,
          maxCapacity: 8,
          budget: '$600K',
          color: '#8B5CF6',
          activities: [
            { id: 1, description: 'UI mockups completed', time: '1 hour ago' },
            { id: 2, description: 'Design system updated', time: '4 hours ago' },
            { id: 3, description: 'User testing session', time: '1 day ago' }
          ]
        },
        {
          id: 4,
          name: 'Marketing',
          head: 'Lisa Wang',
          status: 'Active',
          employeeCount: 12,
          maxCapacity: 15,
          budget: '$1.2M',
          color: '#F59E0B',
          activities: [
            { id: 1, description: 'Campaign launched', time: '45 min ago' },
            { id: 2, description: 'Social media content', time: '2 hours ago' },
            { id: 3, description: 'Email campaign', time: '6 hours ago' }
          ]
        },
        {
          id: 5,
          name: 'Sales',
          head: 'David Kim',
          status: 'Active',
          employeeCount: 10,
          maxCapacity: 12,
          budget: '$1.5M',
          color: '#EF4444',
          activities: [
            { id: 1, description: 'Client meeting', time: '15 min ago' },
            { id: 2, description: 'Proposal submitted', time: '2 hours ago' },
            { id: 3, description: 'Contract signed', time: '1 day ago' }
          ]
        },
        {
          id: 6,
          name: 'HR',
          head: 'Jennifer Taylor',
          status: 'Active',
          employeeCount: 5,
          maxCapacity: 6,
          budget: '$400K',
          color: '#06B6D4',
          activities: [
            { id: 1, description: 'New hire onboarding', time: '20 min ago' },
            { id: 2, description: 'Team building event', time: '1 day ago' },
            { id: 3, description: 'Performance reviews', time: '3 days ago' }
          ]
        }
      ]
    };
  },
  computed: {
    filteredDepartments() {
      if (!this.selectedFilter) return this.departments;
      return this.departments.filter(dept => 
        dept.status.toLowerCase() === this.selectedFilter
      );
    },
    activeDepartments() {
      return this.departments.filter(dept => dept.status === 'Active').length;
    },
    totalEmployees() {
      return this.departments.reduce((sum, dept) => sum + dept.employeeCount, 0);
    },
    averageTeamSize() {
      const activeDepts = this.departments.filter(dept => dept.status === 'Active');
      return activeDepts.length > 0 ? Math.round(this.totalEmployees / activeDepts.length) : 0;
    }
  },
  methods: {
    addDepartment() {
      this.modalTitle = 'Add Department';
      this.modalContent = 'Add new department functionality would open a form';
      this.showModal = true;
    },
    generateReport() {
      this.modalTitle = 'Department Report';
      this.modalContent = 'Generate department performance report functionality';
      this.showModal = true;
    },
    applyFilter() {
      console.log('Applying filter:', this.selectedFilter);
    },
    viewDetails(department) {
      this.modalTitle = `${department.name} Details`;
      this.modalContent = `View detailed information about ${department.name} department`;
      this.showModal = true;
    },
    manageDepartment(department) {
      this.modalTitle = `Manage ${department.name}`;
      this.modalContent = `Manage ${department.name} department settings and configuration`;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.modalTitle = '';
      this.modalContent = '';
    }
  }
};
</script>