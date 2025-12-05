<template>
  <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg border border-blue-200 transition-all duration-300 hover:shadow-xl">
    <div class="flex items-center gap-4">
      <div class="p-3 bg-blue-500 rounded-xl shadow-md">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      </div>
      <div>
        <h1 class="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Dashboard</h1>
        <p class="text-gray-700 text-lg">Welcome back! Here's your overview.</p>
      </div>
    </div>
    <div class="flex items-end gap-4">
      <div class="w-52">
        <Dropdown
          :value="value"
          :options="periodOptions"
          label="Period"
          wrapperClass="w-full"
          selectClass="border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-xl h-12 shadow-sm transition-all duration-200 hover:shadow-md"
          @input="$emit('input', $event)"
        />
      </div>
      <Button
        label="Refresh Data"
        type="primary"
        class="h-12 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        @click="$emit('refresh')"
      >
        <template #icon>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </template>
      </Button>
    </div>
  </div>
</template>

<script>
import { Button, Dropdown } from './index.js';

export default {
  name: 'DashboardHeader',
  components: {
    Button,
    Dropdown
  },
  props: {
    value: {
      type: String,
      default: 'this_month'
    },
    periodOptions: {
      type: Array,
      default: () => [
        { id: 1, key: 'today', descriptions: '📅 Today', icon: '📅' },
        { id: 2, key: 'yesterday', descriptions: '📆 Yesterday', icon: '📆' },
        { id: 3, key: null, descriptions: '─────────────' },
        { id: 4, key: 'last_7_days', descriptions: '📊 Last 7 Days', icon: '📊' },
        { id: 5, key: 'last_30_days', descriptions: '📈 Last 30 Days', icon: '📈' },
        { id: 6, key: null, descriptions: '─────────────' },
        { id: 7, key: 'this_week', descriptions: '📅 This Week', icon: '📅' },
        { id: 8, key: 'last_week', descriptions: '📆 Last Week', icon: '📆' },
        { id: 9, key: null, descriptions: '─────────────' },
        { id: 10, key: 'this_month', descriptions: '🗓️ This Month', icon: '🗓️' },
        { id: 11, key: 'last_month', descriptions: '📅 Last Month', icon: '📅' },
        { id: 12, key: 'last_3_months', descriptions: '📊 Last 3 Months', icon: '📊' },
        { id: 13, key: null, descriptions: '─────────────' },
        { id: 14, key: 'this_year', descriptions: '🎯 This Year', icon: '🎯' },
        { id: 15, key: 'last_year', descriptions: '🏆 Last Year', icon: '🏆' },
        { id: 16, key: 'all_time', descriptions: '🌟 All Time', icon: '🌟' }
      ]
    }
  },
  emits: ['input', 'refresh']
};
</script>
