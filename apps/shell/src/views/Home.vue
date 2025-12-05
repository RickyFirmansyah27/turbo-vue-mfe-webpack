<template>
  <div class="p-6">
    <DashboardHeader
      v-model="selectedPeriod"
      :period-options="periodOptions"
      @refresh="refreshData"
    />

    <StatsCards :stats="stats" />


    <!-- Feature Component -->
    <div class="mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Shell Dashboard</h3>
          <p class="text-sm text-gray-600">Overview of the shell application</p>
        </div>
        <FeatureComponent />
      </div>
    </div>
  </div>
</template>

<script>
import {
  DashboardHeader,
  StatsCards,
  DarkModeToggle,
  ChartSection,
  RecentActivities,
  Card
} from 'commons/Components';
import FeatureComponent from '../components/Feature.vue';
import { Checkpoints } from 'commons/Utils';

export default {
  name: 'Home',
  components: {
    DashboardHeader,
    StatsCards,
    DarkModeToggle,
    ChartSection,
    RecentActivities,
    Card,
    FeatureComponent
  },
  data() {
    return {
      stats: [
        { title: 'Total Users', value: '1,234', change: '+12%', trend: 'up' },
        { title: 'Active Sessions', value: '567', change: '+5%', trend: 'up' },
        { title: 'System Health', value: '99.9%', change: '+0.1%', trend: 'up' },
        { title: 'API Latency', value: '45 ms', change: '-2 ms', trend: 'down' }
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
        { id: 1, user: 'Admin', action: 'logged in', time: '10 min ago' },
        { id: 2, user: 'System', action: 'performed backup', time: '1 hour ago' },
        { id: 3, user: 'User123', action: 'updated profile', time: '2 hours ago' },
        { id: 4, user: 'Support', action: 'resolved ticket', time: '5 hours ago' },
        { id: 5, user: 'Developer', action: 'deployed new version', time: '1 day ago' }
      ],
      Checkpoints
    };
  },
  methods: {
    refreshData() {
      // Simulate data refresh
      alert('Data refreshed!');
    }
  }
};
</script>