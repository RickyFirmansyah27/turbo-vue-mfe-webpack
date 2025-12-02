<template>
  <div class="bg-gray-100 rounded-lg p-4">
    <h3 class="text-lg font-semibold text-gray-800 mb-2">Remote Feature Component</h3>
    <p class="text-gray-600">
      This is a feature component from the remote application.
    </p>
    <div class="mt-4 flex items-center gap-4">
      <component 
        v-if="buttonComponent"
        :is="buttonComponent"
        :label="'Increment'"
        :type="'secondary'"
        @click="increment"
      />
      <span class="text-lg font-semibold">Count: {{ clickCount }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureComponent',
  data() {
    return {
      clickCount: 0,
      buttonComponent: null
    }
  },
  methods: {
    increment() {
      this.clickCount += 1;
    },
    async loadCommonComponents() {
      try {
        const buttonModule = await import('commons/Button');
        this.buttonComponent = buttonModule.default;
      } catch (error) {
        console.error('Failed to load common components:', error);
      }
    }
  },
  mounted() {
    this.loadCommonComponents();
  }
}
</script>
