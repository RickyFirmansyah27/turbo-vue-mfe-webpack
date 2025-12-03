<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <PageHeader
      title="Asset Management"
      subtitle="Manage and track all company assets efficiently"
      gradient="from-blue-600 to-indigo-700"
      subtitle-color="text-blue-100"
    />

    <div class="max-w-7xl mx-auto p-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Assets"
          :value="totalAssets"
          color="blue"
        >
          <template #icon>
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </template>
        </StatsCard>

        <StatsCard
          title="Active Assets"
          :value="activeAssets"
          color="green"
        >
          <template #icon>
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </template>
        </StatsCard>

        <StatsCard
          title="Maintenance Due"
          :value="maintenanceDue"
          color="yellow"
        >
          <template #icon>
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </template>
        </StatsCard>

        <StatsCard
          title="Out of Service"
          :value="outOfService"
          color="red"
        >
          <template #icon>
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </template>
        </StatsCard>
      </div>

      <!-- Asset Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ActionCard
          title="Equipment"
          description="Manage company equipment and machinery assets."
          emoji="🏗️"
          :stats="[
            { label: 'Total Items', value: equipmentCount },
            { label: 'Active', value: equipmentActive, class: 'font-semibold text-green-600' }
          ]"
          action-label="Manage Equipment"
          @action="viewAssets('equipment')"
        />

        <ActionCard
          title="Vehicles"
          description="Track and maintain company vehicle fleet."
          emoji="🚗"
          :stats="[
            { label: 'Total Fleet', value: vehicleCount },
            { label: 'In Service', value: vehicleActive, class: 'font-semibold text-green-600' }
          ]"
          action-label="Manage Vehicles"
          @action="viewAssets('vehicles')"
        />

        <ActionCard
          title="IT Assets"
          description="Monitor computers, servers, and IT equipment."
          emoji="💻"
          :stats="[
            { label: 'Total Devices', value: itCount },
            { label: 'Online', value: itActive, class: 'font-semibold text-green-600' }
          ]"
          action-label="Manage IT Assets"
          @action="viewAssets('it')"
        />

        <ActionCard
          title="Real Estate"
          description="Manage property and facility assets."
          emoji="🏢"
          :stats="[
            { label: 'Properties', value: propertyCount },
            { label: 'Occupied', value: propertyActive, class: 'font-semibold text-green-600' }
          ]"
          action-label="Manage Properties"
          @action="viewAssets('property')"
        />

        <ActionCard
          title="Inventory"
          description="Track office supplies and inventory items."
          emoji="📚"
          :stats="[
            { label: 'Items', value: inventoryCount },
            { label: 'In Stock', value: inventoryActive, class: 'font-semibold text-green-600' }
          ]"
          action-label="Manage Inventory"
          @action="viewAssets('inventory')"
        />

        <ActionCard
          title="Maintenance"
          description="Schedule and track maintenance activities."
          emoji="🔧"
          :stats="[
            { label: 'Scheduled', value: maintenanceCount },
            { label: 'Overdue', value: maintenanceOverdue, class: 'font-semibold text-red-600' }
          ]"
          action-label="View Schedule"
          @action="viewAssets('maintenance')"
        />
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
import { PageHeader, StatsCard, ActionCard, Button } from 'commons/Components';

export default {
  name: 'Asset',
  components: {
    PageHeader,
    StatsCard,
    ActionCard,
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
