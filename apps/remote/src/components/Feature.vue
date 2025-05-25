<template>
  <div class="bg-gray-100 rounded-lg p-4">
    <h3 class="text-lg font-semibold text-gray-800 mb-2">Remote Feature Component</h3>
    <p class="text-gray-600">
      This is a feature component from the remote application.
    </p>
    <div class="mt-4 flex items-center">
      <button 
        @click="increment"
        class="px-4 py-2 bg-accent-500 text-white rounded hover:bg-accent-600 transition-colors mr-4"
      >
        Increment
      </button>
      <span class="text-lg font-semibold">Count: {{ count }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureComponent',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count += 1;
    }
  }
}
</script>