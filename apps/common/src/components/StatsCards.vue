<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div
      v-for="stat in stats"
      :key="stat.title"
      class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-600 mb-1">{{ stat.title }}</h3>
          <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
        </div>
        <div class="p-3 rounded-full bg-blue-50">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <span
          :class="[
            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
            stat.trend === 'up'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          ]"
        >
          <svg
            :class="[
              'w-3 h-3 mr-1',
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            ]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="stat.trend === 'up'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          {{ stat.change }}
        </span>
        <span class="ml-2 text-xs text-gray-500">vs last period</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Card } from './index.js';

export default {
  name: 'StatsCards',
  components: {
    Card
  },
  props: {
    stats: {
      type: Array,
      default: () => []
    }
  }
};
</script>