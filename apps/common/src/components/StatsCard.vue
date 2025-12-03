<template>
  <div :class="cardClass" class="rounded-xl shadow-lg p-6 border-l-4 transition-all duration-300 hover:shadow-xl">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">{{ value }}</p>
        <p v-if="change" :class="changeClass" class="text-sm mt-1">
          {{ changeIcon }} {{ Math.abs(change) }}% from last month
        </p>
      </div>
      <div :class="iconClass" class="p-3 rounded-full">
        <slot name="icon">
          <svg class="w-8 h-8 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
          </svg>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsCard',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    change: {
      type: Number,
      default: null
    },
    color: {
      type: String,
      default: 'blue'
    }
  },
  computed: {
    cardClass() {
      const colorMap = {
        blue: 'border-blue-500',
        green: 'border-green-500',
        yellow: 'border-yellow-500',
        red: 'border-red-500',
        purple: 'border-purple-500',
        indigo: 'border-indigo-500'
      };
      return colorMap[this.color] || colorMap.blue;
    },
    iconClass() {
      const colorMap = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        red: 'bg-red-100 text-red-600',
        purple: 'bg-purple-100 text-purple-600',
        indigo: 'bg-indigo-100 text-indigo-600'
      };
      return colorMap[this.color] || colorMap.blue;
    },
    changeClass() {
      return this.change >= 0 ? 'text-green-600' : 'text-red-600';
    },
    changeIcon() {
      return this.change >= 0 ? '↗️' : '↘️';
    }
  }
};
</script>