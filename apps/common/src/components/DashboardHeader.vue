<template>
  <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p class="text-gray-600">Welcome back! Here's your overview.</p>
    </div>
    <div class="flex items-end gap-4">
      <div class="w-48">
        <Dropdown
          :value="value"
          :options="periodOptions"
          label="Period"
          wrapperClass="w-full"
          selectClass="border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10"
          @input="$emit('input', $event)"
        />
      </div>
      <Button
        label="Refresh Data"
        type="primary"
        class="h-10 px-4"
        @click="$emit('refresh')"
      />
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
