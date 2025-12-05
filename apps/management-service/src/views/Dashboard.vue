<template>
  <div class="p-6">
    <DashboardHeader
      v-model="selectedPeriod"
      :period-options="periodOptions"
      @refresh="refreshData"
    />

    <StatsCards :stats="stats" />

    <DarkModeToggle
      v-model="darkMode"
    />

    <!-- Chart and Recent Activities -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <ChartSection />
      <RecentActivities :activities="recentActivities" />
    </div>

    <!-- Feature Component -->
    <div class="mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Management Dashboard</h3>
          <p class="text-sm text-gray-600">Company overview and key metrics</p>
        </div>
        <FeatureComponent />
      </div>
    </div>

    <QuickActions :checkpoints="Checkpoints" />
  </div>
</template>

<script>
import {
  DashboardHeader,
  StatsCards,
  DarkModeToggle,
  ChartSection,
  RecentActivities,
  QuickActions,
  Card
} from 'commons/Components';
import FeatureComponent from '../components/Feature.vue';
import { Checkpoints } from 'commons/Utils';

export default {
  name: 'Dashboard',
  components: {
    DashboardHeader,
    StatsCards,
    DarkModeToggle,
    ChartSection,
    RecentActivities,
    QuickActions,
    Card,
    FeatureComponent
  },
  data() {
    return {
      stats: [
        { title: 'Total Employees', value: '1,234', change: '+12%', trend: 'up' },
        { title: 'Departments', value: '12', change: '+2', trend: 'up' },
        { title: 'Active Projects', value: '48', change: '+5', trend: 'up' },
        { title: 'Team Performance', value: '94%', change: '+3%', trend: 'up' }
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
        { id: 1, user: 'HR Department', action: 'onboarded 3 new employees', time: '10 min ago' },
        { id: 2, user: 'IT Department', action: 'completed system upgrade', time: '1 hour ago' },
        { id: 3, user: 'Finance', action: 'processed quarterly reports', time: '2 hours ago' },
        { id: 4, user: 'Marketing', action: 'launched new campaign', time: '5 hours ago' },
        { id: 5, user: 'Operations', action: 'optimized workflows', time: '1 day ago' }
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