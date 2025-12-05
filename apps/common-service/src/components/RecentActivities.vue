<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <p class="text-sm text-gray-600">Latest user activities</p>
      </div>
      <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
        View all
      </button>
    </div>
    <div class="space-y-4">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
      >
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white font-semibold text-sm">
              {{ activity.user.split(' ').map(n => n[0]).join('') }}
            </span>
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm text-gray-900">
            <span class="font-medium">{{ activity.user }}</span>
            <span class="text-gray-600"> {{ activity.action }}</span>
          </p>
          <p class="text-xs text-gray-500">{{ activity.time }}</p>
        </div>
        <div class="flex-shrink-0">
          <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Card } from './index.js';

export default {
  name: 'RecentActivities',
  components: {
    Card
  },
  props: {
    activities: {
      type: Array,
      default: () => []
    }
  }
};
</script>