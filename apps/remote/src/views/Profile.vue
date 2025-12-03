<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold mb-2">User Profile</h1>
        <p class="text-purple-100 text-lg">Manage your personal information and preferences</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto p-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="text-center">
              <div class="relative inline-block">
                <img
                  :src="profile.avatar"
                  :alt="profile.name"
                  class="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg"
                >
                <button
                  @click="changeAvatar"
                  class="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mt-4">{{ profile.name }}</h3>
              <p class="text-gray-600">{{ profile.role }}</p>
              <div class="mt-4 space-y-2">
                <div class="flex items-center justify-center text-sm text-gray-600">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  {{ profile.email }}
                </div>
                <div class="flex items-center justify-center text-sm text-gray-600">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  {{ profile.phone }}
                </div>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h4>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Projects</span>
                  <span class="font-semibold">{{ profile.stats.projects }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Tasks Completed</span>
                  <span class="font-semibold">{{ profile.stats.tasksCompleted }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Team Members</span>
                  <span class="font-semibold">{{ profile.stats.teamMembers }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Form -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

            <form @submit.prevent="saveProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    v-model="profile.firstName"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter first name"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    v-model="profile.lastName"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter last name"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  v-model="profile.email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter email address"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  v-model="profile.phone"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter phone number"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  v-model="profile.role"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter job title"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  v-model="profile.department"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Department</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance</option>
                  <option value="operations">Operations</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  v-model="profile.bio"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <div class="flex justify-end space-x-4">
                <Button
                  label="Cancel"
                  type="secondary"
                  @click="cancelChanges"
                />
                <Button
                  label="Save Changes"
                  type="primary"
                  @click="saveProfile"
                >
                  <template #icon>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </template>
                </Button>
              </div>
            </form>
          </div>

          <!-- Security Settings -->
          <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Security Settings</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-900">Change Password</h4>
                  <p class="text-sm text-gray-600">Update your password regularly for security</p>
                </div>
                <Button
                  label="Change Password"
                  type="secondary"
                  @click="changePassword"
                />
              </div>

              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 class="font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p class="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <Button
                  label="Enable 2FA"
                  type="primary"
                  @click="enable2FA"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'commons/Components';

export default {
  name: 'Profile',
  components: {
    Button
  },
  data() {
    return {
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        role: 'Senior Software Engineer',
        department: 'engineering',
        bio: 'Passionate software engineer with 5+ years of experience in full-stack development. Love creating innovative solutions and mentoring junior developers.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        stats: {
          projects: 24,
          tasksCompleted: 156,
          teamMembers: 8
        }
      }
    }
  },
  methods: {
    changeAvatar() {
      alert('Avatar change functionality would open file picker');
    },
    saveProfile() {
      alert('Profile saved successfully!');
    },
    cancelChanges() {
      // Reset to original values
      this.profile = {
        firstName: 'John',
        lastName: 'Doe',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        role: 'Senior Software Engineer',
        department: 'engineering',
        bio: 'Passionate software engineer with 5+ years of experience in full-stack development. Love creating innovative solutions and mentoring junior developers.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        stats: {
          projects: 24,
          tasksCompleted: 156,
          teamMembers: 8
        }
      };
    },
    changePassword() {
      alert('Password change modal would open');
    },
    enable2FA() {
      alert('2FA setup would begin');
    }
  },
  watch: {
    'profile.firstName': function() {
      this.profile.name = `${this.profile.firstName} ${this.profile.lastName}`;
    },
    'profile.lastName': function() {
      this.profile.name = `${this.profile.firstName} ${this.profile.lastName}`;
    }
  }
}
</script>