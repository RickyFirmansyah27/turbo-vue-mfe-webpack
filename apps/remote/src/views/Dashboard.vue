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
    <div class="mb-6">
      <Card title="Interactive Feature" description="Remote feature component with counter">
        <FeatureComponent />
      </Card>
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
    }
  }
};
</script>