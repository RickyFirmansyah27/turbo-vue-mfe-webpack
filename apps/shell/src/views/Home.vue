<template>
  <div>
    <section class="bg-white shadow rounded-lg p-6 mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Welcome to Microfrontend Demo</h2>
      <p class="text-gray-600 mb-4">
        This is the shell application that loads remote microfrontends dynamically.
      </p>
      
      <common-button
        v-if="buttonComponent"
        :label="'Check Remote Component'"
        :type="'primary'"
        @click="navigateToRemote"
      />
      <p v-else class="text-amber-600">Loading common components...</p>
    </section>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <common-card 
        v-if="cardComponent"
        title="Shell Application"
        description="The main container that orchestrates all microfrontends"
        :image-url="'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'"
      />
      <common-card 
        v-if="cardComponent"
        title="Remote Application"
        description="A separate microfrontend that can be developed independently"
        :image-url="'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {}, // awalnya kosong
  data() {
    return {
      buttonComponent: null,
      cardComponent: null
    }
  },
  methods: {
    navigateToRemote() {
      this.$router.push('/remote/component');
    },
    async loadCommonComponents() {
      try {
        const buttonModule = await import('commons/Button');
        const cardModule = await import('commons/Card');

        this.buttonComponent = buttonModule.default;
        this.cardComponent = cardModule.default;

        // Daftarkan ke komponen secara lokal
        this.$options.components['common-button'] = buttonModule.default;
        this.$options.components['common-card'] = cardModule.default;
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