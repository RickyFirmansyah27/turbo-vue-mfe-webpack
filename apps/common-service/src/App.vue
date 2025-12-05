<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Common Components Library</h1>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Button Component</h2>
      <div class="flex space-x-4">
        <button-component label="Primary Button" type="primary" />
        <button-component label="Secondary Button" type="secondary" />
        <button-component label="Accent Button" type="accent" />
      </div>
    </div>
    
    <div>
      <h2 class="text-xl font-semibold mb-4">Card Component</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <card-component 
          title="Example Card" 
          description="This is an example card component from the common library"
          image-url="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <card-component 
          title="Another Card" 
          description="Cards can be reused across different microfrontends"
          image-url="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from './components/Button.vue';
import CardComponent from './components/Card.vue';

export default {
  name: 'App',
  components: {
    ButtonComponent,
    CardComponent
  }
}
</script>

<style>
@import './assets/tailwind.css';
</style>