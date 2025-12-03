<template>
  <Card title="Recent Activity" description="Latest user activities">
    <ul class="divide-y divide-gray-200">
      <li v-for="activity in activities" :key="activity.id" class="py-3 flex justify-between items-center">
        <div>
          <span class="font-medium text-gray-800">{{ activity.user }}</span>
          <span class="text-gray-600 ml-1">{{ activity.action }}</span>
        </div>
        <span class="text-sm text-gray-500">{{ activity.time }}</span>
      </li>
    </ul>
  </Card>
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