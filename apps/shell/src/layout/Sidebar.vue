<template>
  <aside class="bg-primary-700 text-white w-64 h-screen shadow-md flex flex-col">
    <div class="flex items-center px-4 py-4 border-b border-primary-600">
      <router-link to="/" class="flex items-center space-x-2" aria-label="Asset Management Home">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
        </svg>
        <span class="font-bold text-xl">Asset Management</span>
      </router-link>
    </div>
    <nav class="flex-1 px-4 py-4 space-y-2">
      <div v-for="(menuItem, index) in sidebarMenu" :key="index">
        <!-- Parent Menu Item -->
        <div v-if="menuItem.children && menuItem.children.length > 0" class="relative">
          <button @click="toggleSubMenu(menuItem.label)"
            class="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-primary-600 transition focus:outline-none"
            :class="{ 'bg-primary-800': isSubMenuOpen(menuItem.label) || $route.path.startsWith(menuItem.to) }"
            aria-haspopup="true" :aria-expanded="isSubMenuOpen(menuItem.label).toString()">
            <span>{{ menuItem.label }}</span>
            <svg class="w-4 h-4 transform transition-transform" :class="{ 'rotate-90': isSubMenuOpen(menuItem.label) }"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <!-- Sub-menu -->
          <div v-show="isSubMenuOpen(menuItem.label)" class="ml-4 mt-1 space-y-1">
            <router-link v-for="(childItem, childIndex) in menuItem.children" :key="childIndex" :to="childItem.to"
              class="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-primary-600 transition"
              active-class="bg-primary-800" exact>
              {{ childItem.label }}
            </router-link>
          </div>
        </div>

        <!-- Single Menu Item (no children) -->
        <router-link v-else :to="menuItem.to"
          class="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-primary-600 transition"
          active-class="bg-primary-800" exact aria-current="page">
          {{ menuItem.label }}
        </router-link>
      </div>
    </nav>
    
    <!-- Logout Menu -->
    <div class="px-4 py-4 border-t border-primary-600">
      <button @click="handleLogout"
        class="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-primary-600 transition focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  </aside>
</template>

<script>
import { Checkpoints } from 'commons/Utils';

export default {
  name: 'Sidebar',
  data() {
    return {
      Checkpoints,
      sidebarMenu: [
        {
          label: 'Home',
          to: Checkpoints.homepage,
        },
        {
          label: 'Assets',
          to: Checkpoints.assets,
          children: [
            {
              label: 'Dashboard',
              to: Checkpoints.assets, // This will be handled by the router later.
            },
            {
              label: 'Assets',
              to: Checkpoints.assetsList,
            },
            {
              label: 'Reports',
              to: Checkpoints.assetsReports,
            },
            {
              label: 'Profile',
              to: Checkpoints.assetsProfile,
            },
          ],
        },
        {
          label: 'Management',
          to: Checkpoints.managements,
          children: [
            {
              label: 'Dashboard',
              to: Checkpoints.managements,
            },
            {
              label: 'Employees',
              to: Checkpoints.managementEmployees,
            },
            {
              label: 'Departments',
              to: Checkpoints.managementDepartments,
            },
            {
              label: 'Reports',
              to: Checkpoints.managementReports,
            },
          ],
        },
      ],
      openSubMenus: {}, // To store which sub-menus are open
    };
  },
  methods: {
    toggleSubMenu(label) {
      this.$set(this.openSubMenus, label, !this.openSubMenus[label]);
    },
    isSubMenuOpen(label) {
      return this.openSubMenus[label] || false;
    },
    handleLogout() {
      // Clear authentication data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Redirect to login page or home
      this.$router.push('/login');
    }
  },
  watch: {
    // Close submenus when route changes, or keep them open if the new route is within the submenu
    '$route.path': {
      immediate: true,
      handler(newPath) {
        this.sidebarMenu.forEach(menuItem => {
          if (menuItem.children && menuItem.children.length > 0) {
            const isChildRoute = menuItem.children.some(child => newPath.startsWith(child.to));
            if (isChildRoute && !this.isSubMenuOpen(menuItem.label)) {
              this.$set(this.openSubMenus, menuItem.label, true);
            } else if (!isChildRoute && this.isSubMenuOpen(menuItem.label)) {
              this.$set(this.openSubMenus, menuItem.label, false);
            }
          }
        });
      },
    },
  },
};
</script>