<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <h2 class="text-2xl font-bold text-gray-800">Dashboard</h2>
      <div class="flex items-center space-x-4">
        <Dropdown
          v-model="selectedPeriod"
          :options="periodOptions"
          label="Period"
          wrapperClass="w-40"
          selectClass="border-gray-300 focus:ring-primary-500 focus:border-primary-500"
        />
        <Button label="Refresh" type="primary" @click="refreshData" />
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card
        v-for="stat in stats"
        :key="stat.title"
        :title="stat.title"
        :description="stat.value"
      >
        <div class="mt-2 flex items-center">
          <span :class="stat.trend === 'up' ? 'text-green-600' : 'text-red-600'">
            {{ stat.change }}
          </span>
          <span class="ml-1 text-sm text-gray-500">vs previous period</span>
        </div>
      </Card>
    </div>

    <!-- Dark Mode Toggle -->
    <div class="mb-6 flex justify-end">
      <ToggleSwitch
        label="Dark Mode"
        description="Toggle dark mode"
        v-model="darkMode"
        @change="toggleDarkMode"
      />
    </div>

    <!-- Chart and Recent Activities -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Chart -->
      <Card title="Sales Overview" description="Monthly sales performance">
        <div class="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
          Chart Placeholder
        </div>
      </Card>

      <!-- Recent Activities -->
      <Card title="Recent Activity" description="Latest user activities">
        <ul class="divide-y divide-gray-200">
          <li v-for="activity in recentActivities" :key="activity.id" class="py-3 flex justify-between items-center">
            <div>
              <span class="font-medium text-gray-800">{{ activity.user }}</span>
              <span class="text-gray-600 ml-1">{{ activity.action }}</span>
            </div>
            <span class="text-sm text-gray-500">{{ activity.time }}</span>
          </li>
        </ul>
      </Card>
    </div>

    <!-- Feature Component -->
    <div class="mb-6">
      <Card title="Interactive Feature" description="Remote feature component with counter">
        <FeatureComponent />
      </Card>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <router-link :to="Checkpoints.remoteProfile" class="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition">
          <span class="text-primary-700 font-medium">View Profile</span>
        </router-link>
        <router-link :to="Checkpoints.remoteSettings" class="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition">
          <span class="text-primary-700 font-medium">Settings</span>
        </router-link>
        <router-link :to="Checkpoints.reports" class="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition">
          <span class="text-primary-700 font-medium">Reports</span>
        </router-link>
        <router-link :to="Checkpoints.assets" class="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition">
          <span class="text-primary-700 font-medium">Assets</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Card, Button, Dropdown, ToggleSwitch } from 'commons/Components';
import FeatureComponent from '../components/Feature.vue';
import { Checkpoints } from 'commons/Utils';

export default {
  name: 'Dashboard',
  components: {
    Card,
    Button,
    Dropdown,
    ToggleSwitch,
    FeatureComponent
  },
  data() {
    return {
      stats: [
        { title: 'Total Users', value: '1,234', change: '+12%', trend: 'up' },
        { title: 'Revenue', value: '$56,789', change: '+8%', trend: 'up' },
        { title: 'Orders', value: '789', change: '-3%', trend: 'down' },
        { title: 'Conversion', value: '2.3%', change: '+0.5%', trend: 'up' }
      ],
      selectedPeriod: 'this_month',
      periodOptions: [
        { id: 1, key: 'today', descriptions: 'Today' },
        { id: 2, key: 'this_week', descriptions: 'This Week' },
        { id: 3, key: 'this_month', descriptions: 'This Month' },
        { id: 4, key: 'this_year', descriptions: 'This Year' }
      ],
      darkMode: false,
      recentActivities: [
        { id: 1, user: 'John Doe', action: 'placed an order', time: '10 min ago' },
        { id: 2, user: 'Jane Smith', action: 'signed up', time: '1 hour ago' },
        { id: 3, user: 'Mike Johnson', action: 'updated profile', time: '2 hours ago' },
        { id: 4, user: 'Sarah Williams', action: 'cancelled subscription', time: '5 hours ago' },
        { id: 5, user: 'David Brown', action: 'made a payment', time: '1 day ago' }
      ],
      Checkpoints
    };
  },
  methods: {
    refreshData() {
      // Simulate data refresh
      alert('Data refreshed!');
    },
    toggleDarkMode(value) {
      this.darkMode = value;
      // Could apply dark mode theme here
      console.log('Dark mode:', value);
    }
  }
};
</script>