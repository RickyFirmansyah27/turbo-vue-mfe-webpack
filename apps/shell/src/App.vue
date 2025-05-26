<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-primary-600 text-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Shell Application</h1>
        <nav>
          <ul class="flex space-x-4">
            <li>
              <router-link to="/" class="hover:text-primary-200 transition-colors">Home</router-link>
            </li>
            <li>
              <router-link to="/remote/profile" class="hover:text-primary-200 transition-colors">Remote Profile</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    
    <main class="container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>

    <footer class="bg-gray-800 text-white py-6">
      <div class="container mx-auto px-4 text-center">
        <p>© 2025 Microfrontend Demo - Shell Application</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './assets/tailwind.css';
</style>