<template>
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <div class="bg-secondary-600 text-white p-4">
      <h2 class="text-xl font-bold">Remote Application</h2>
    </div>
    
    <div class="p-6">
      <p class="text-gray-600 mb-6">
        This is a remote application loaded dynamically by the shell.
      </p>
      
      <feature-component />
      
      <div class="mt-6">
        <component 
          v-if="buttonComponent"
          :is="buttonComponent"
          :label="'Click Me'"
          :type="'secondary'"
          @click="handleButtonClick"
        />
        <p v-else class="text-amber-600">Loading common components...</p>
      </div>
    </div>
  </div>
</template>

<script>
import FeatureComponent from './components/Feature.vue';

export default {
  name: 'RemoteApp',
  components: {
    FeatureComponent
  },
  data() {
    return {
      buttonComponent: null,
      clickCount: 0
    }
  },
  methods: {
    handleButtonClick() {
      this.clickCount += 1;
      alert(`Button clicked ${this.clickCount} time(s)!`);
    },
    async loadCommonComponents() {
      try {
        // Dynamically import common components
        const buttonModule = await import('common/Button');
        
        // Set the component directly for dynamic rendering
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

<style>
@import './assets/tailwind.css';
</style>