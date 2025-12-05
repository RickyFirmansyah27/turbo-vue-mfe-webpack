<template>
  <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
    <div class="mb-6">
      <h4 class="text-lg font-semibold text-gray-900 mb-2">Integrated Dashboard Overview</h4>
      <p class="text-sm text-gray-600">Comprehensive view of all micro-frontend applications</p>
    </div>
    
    <!-- Application Status Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <h5 class="font-medium text-blue-800">Assets Service</h5>
          <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Assets:</span>
            <span class="font-medium">{{ assetStats.total }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Recent Uploads:</span>
            <span class="font-medium">{{ assetStats.recent }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Storage Used:</span>
            <span class="font-medium">{{ assetStats.storage }}</span>
          </div>
        </div>
        <button @click="navigateToAssets" class="mt-3 w-full px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
          View Assets Dashboard
        </button>
      </div>
      
      <div class="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <h5 class="font-medium text-green-800">Management Service</h5>
          <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Employees:</span>
            <span class="font-medium">{{ managementStats.employees }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Departments:</span>
            <span class="font-medium">{{ managementStats.departments }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Active Projects:</span>
            <span class="font-medium">{{ managementStats.projects }}</span>
          </div>
        </div>
        <button @click="navigateToManagement" class="mt-3 w-full px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors">
          View Management Dashboard
        </button>
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="bg-white p-4 rounded-lg border border-gray-200">
      <h5 class="font-medium text-gray-800 mb-3">Quick Actions</h5>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button @click="quickAction('upload')" class="p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
          📤 Upload Asset
        </button>
        <button @click="quickAction('employee')" class="p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
          👥 Add Employee
        </button>
        <button @click="quickAction('report')" class="p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
          📊 Generate Report
        </button>
        <button @click="quickAction('departement')" class="p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
          👥 Departements
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Checkpoints } from 'commons/Utils';

export default {
  name: 'FeatureComponent',
  data() {
    return {
      assetStats: {
        total: '1,234',
        recent: '45',
        storage: '2.3 GB'
      },
      managementStats: {
        employees: '156',
        departments: '8',
        projects: '23'
      }
    }
  },
  methods: {
    navigateToAssets() {
      // Navigate to assets service using Checkpoints
      this.$router.push(Checkpoints.assets);
    },
    navigateToManagement() {
      // Navigate to management service using Checkpoints
      this.$router.push(Checkpoints.managements);
    },
    quickAction(action) {
      console.log(`Quick action: ${action}`);
      // Handle quick actions using Checkpoints
      switch(action) {
        case 'upload':
          this.$router.push(Checkpoints.assetsList);
          break;
        case 'employee':
          this.$router.push(Checkpoints.managementEmployees);
          break;
        case 'report':
          this.$router.push(Checkpoints.assetsReport);
          break;
        case 'departement':
          this.$router.push(Checkpoints.managementDepartments);
          break;
      }
    }
  }
}
</script>