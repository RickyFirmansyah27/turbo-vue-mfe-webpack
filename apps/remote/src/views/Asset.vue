<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold mb-2">Asset Management</h1>
        <p class="text-blue-100 text-lg">Manage and track all company assets efficiently</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto p-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Total Assets</p>
              <p class="text-3xl font-bold text-gray-900">{{ totalAssets }}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Active Assets</p>
              <p class="text-3xl font-bold text-gray-900">{{ activeAssets }}</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Maintenance Due</p>
              <p class="text-3xl font-bold text-gray-900">{{ maintenanceDue }}</p>
            </div>
            <div class="p-3 bg-yellow-100 rounded-full">
              <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Out of Service</p>
              <p class="text-3xl font-bold text-gray-900">{{ outOfService }}</p>
            </div>
            <div class="p-3 bg-red-100 rounded-full">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Asset Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card
          title="🏗️ Equipment"
          description="Manage company equipment and machinery assets."
          class="hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div class="mt-4 space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Total Items:</span>
              <span class="font-semibold">{{ equipmentCount }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Active:</span>
              <span class="font-semibold text-green-600">{{ equipmentActive }}</span>
            </div>
            <Button label="Manage Equipment" type="primary" class="w-full" @click="viewAssets('equipment')" />
          </div>
        </Card>

        <Card
          title="🚗 Vehicles"
          description="Track and maintain company vehicle fleet."
          class="hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div class="mt-4 space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Total Fleet:</span>
              <span class="font-semibold">{{ vehicleCount }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">In Service:</span>
              <span class="font-semibold text-green-600">{{ vehicleActive }}</span>
            </div>
            <Button label="Manage Vehicles" type="primary" class="w-full" @click="viewAssets('vehicles')" />
          </div>
        </Card>

        <Card
          title="💻 IT Assets"
          description="Monitor computers, servers, and IT equipment."
          class="hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div class="mt-4 space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Total Devices:</span>
              <span class="font-semibold">{{ itCount }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Online:</span>
              <span class="font-semibold text-green-600">{{ itActive }}</span>
            </div>
            <Button label="Manage IT Assets" type="primary" class="w-full" @click="viewAssets('it')" />
          </div>
        </Card>

        <Card
          title="🏢 Real Estate"
          description="Manage property and facility assets."
          class="hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div class="mt-4 space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Properties:</span>
              <span class="font-semibold">{{ propertyCount }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Occupied:</span>
              <span class="font-semibold text-green-600">{{ propertyActive }}</span>
            </div>
            <Button label="Manage Properties" type="primary" class="w-full" @click="viewAssets('property')" />
          </div>
        </Card>

        <Card
          title="📚 Inventory"
          description="Track office supplies and inventory items."
          class="hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div class="mt-4 space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Items:</span>
              <span class="font-semibold">{{ inventoryCount }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">In Stock:</span>
              <span class="font-semibold text-green-600">{{ inventoryActive }}</span>
            </div>
            <Button label="Manage Inventory" type="primary" class="w-full" @click="viewAssets('inventory')" />
          </div>
        </Card>

        <Card
          title="🔧 Maintenance"
          description="Schedule and track maintenance activities."
          class="hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div class="mt-4 space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Scheduled:</span>
              <span class="font-semibold">{{ maintenanceCount }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Overdue:</span>
              <span class="font-semibold text-red-600">{{ maintenanceOverdue }}</span>
            </div>
            <Button label="View Schedule" type="primary" class="w-full" @click="viewAssets('maintenance')" />
          </div>
        </Card>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            label="Add New Asset"
            type="primary"
            class="w-full py-3"
            @click="addNewAsset"
          >
            <template #icon>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </template>
          </Button>
          <Button
            label="Generate Report"
            type="secondary"
            class="w-full py-3"
            @click="generateReport"
          >
            <template #icon>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </template>
          </Button>
          <Button
            label="Export Data"
            type="accent"
            class="w-full py-3"
            @click="exportData"
          >
            <template #icon>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </template>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Card, Button } from 'commons/Components';

export default {
  name: 'Asset',
  components: {
    Card,
    Button
  },
  data() {
    return {
      totalAssets: 1247,
      activeAssets: 1189,
      maintenanceDue: 23,
      outOfService: 35,
      equipmentCount: 456,
      equipmentActive: 432,
      vehicleCount: 89,
      vehicleActive: 85,
      itCount: 234,
      itActive: 228,
      propertyCount: 12,
      propertyActive: 12,
      inventoryCount: 456,
      inventoryActive: 432,
      maintenanceCount: 67,
      maintenanceOverdue: 8
    }
  },
  methods: {
    viewAssets(type) {
      this.$router.push(`/assets/${type}`);
    },
    addNewAsset() {
      this.$router.push('/assets/add');
    },
    generateReport() {
      alert('Generating asset report...');
    },
    exportData() {
      alert('Exporting asset data...');
    }
  }
};
</script>
