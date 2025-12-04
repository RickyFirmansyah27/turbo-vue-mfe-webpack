<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-900">Management Feature</h3>
      <p class="text-sm text-gray-600">Counter for management operations</p>
    </div>
    <div class="flex items-center space-x-4">
      <button 
        @click="decrement"
        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        -
      </button>
      <span class="text-2xl font-bold text-gray-900">{{ count }}</span>
      <button 
        @click="increment"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        +
      </button>
    </div>
    <p class="text-sm text-gray-500 mt-2">
      Management operations count: {{ count }}
    </p>
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
      this.count++
    },
    decrement() {
      if (this.count > 0) {
        this.count--
      }
    }
  }
}
</script>

<style scoped>
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>