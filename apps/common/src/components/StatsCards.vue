<template>
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