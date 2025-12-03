<template>
  <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <h3 class="text-xl font-bold text-gray-900 mb-2 flex items-center">
          <span v-if="emoji" class="mr-2">{{ emoji }}</span>
          {{ title }}
        </h3>
        <p class="text-gray-600 mb-4">{{ description }}</p>

        <div v-if="stats && stats.length" class="space-y-2 mb-4">
          <div v-for="stat in stats" :key="stat.label" class="flex justify-between text-sm">
            <span class="text-gray-600">{{ stat.label }}:</span>
            <span :class="stat.class || 'font-semibold'" :style="stat.style">{{ stat.value }}</span>
          </div>
        </div>

        <slot></slot>
      </div>
    </div>

    <div v-if="showActions" class="mt-4 pt-4 border-t border-gray-200">
      <Button
        :label="actionLabel"
        :type="actionType"
        class="w-full"
        @click="$emit('action')"
      >
        <template #icon v-if="actionIcon">
          <component :is="actionIcon" class="w-4 h-4" />
        </template>
      </Button>
    </div>
  </div>
</template>

<script>
import { Button } from './index.js';

export default {
  name: 'ActionCard',
  components: {
    Button
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    emoji: {
      type: String,
      default: ''
    },
    stats: {
      type: Array,
      default: () => []
    },
    showActions: {
      type: Boolean,
      default: true
    },
    actionLabel: {
      type: String,
      default: 'View Details'
    },
    actionType: {
      type: String,
      default: 'primary'
    },
    actionIcon: {
      type: String,
      default: ''
    }
  },
  emits: ['action']
};
</script>