<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
    <h2 class="text-2xl font-bold text-gray-800">Dashboard</h2>
    <div class="flex items-center space-x-4">
      <Dropdown
        :value="value"
        :options="periodOptions"
        label="Period"
        wrapperClass="w-40"
        selectClass="border-gray-300 focus:ring-primary-500 focus:border-primary-500"
        @input="$emit('input', $event)"
      />
      <Button label="Refresh" type="primary" @click="$emit('refresh')" />
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
        { id: 1, key: 'today', descriptions: 'Today' },
        { id: 2, key: 'this_week', descriptions: 'This Week' },
        { id: 3, key: 'this_month', descriptions: 'This Month' },
        { id: 4, key: 'this_year', descriptions: 'This Year' }
      ]
    }
  },
  emits: ['input', 'refresh']
};
</script>