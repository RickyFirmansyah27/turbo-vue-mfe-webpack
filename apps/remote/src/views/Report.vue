<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <PageHeader
      title="Reports & Analytics"
      subtitle="Comprehensive insights and data visualization for better decision making"
      gradient="from-green-600 to-teal-600"
      subtitle-color="text-green-100"
    />

    <div class="max-w-7xl mx-auto p-8">
      <!-- Filters and Controls -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div class="flex flex-col sm:flex-row gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Report Period</label>
              <select
                v-model="selectedPeriod"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
                <option value="this_quarter">This Quarter</option>
                <option value="this_year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div v-if="selectedPeriod === 'custom'">
              <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div class="flex gap-2">
                <input
                  type="date"
                  v-model="startDate"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                <input
                  type="date"
                  v-model="endDate"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
              </div>
            </div>
          </div>
          <div class="flex gap-3">
            <Button
              label="Export PDF"
              type="secondary"
              @click="exportReport('pdf')"
            >
              <template #icon>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </template>
            </Button>
            <Button
              label="Export Excel"
              type="primary"
              @click="exportReport('excel')"
            >
              <template #icon>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </template>
            </Button>
          </div>
        </div>
      </div>

      <!-- Report Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ActionCard
          title="Sales Reports"
          description="Revenue, orders, and sales performance analytics"
          emoji="📊"
          :stats="[
            { label: 'Total Reports', value: salesReports.length },
            { label: 'Last Updated', value: salesLastUpdate }
          ]"
          action-label="View Sales Reports"
          @action="viewReport('sales')"
        />

        <ActionCard
          title="Inventory Reports"
          description="Stock levels, turnover rates, and inventory analysis"
          emoji="📦"
          :stats="[
            { label: 'Total Reports', value: inventoryReports.length },
            { label: 'Low Stock Items', value: lowStockItems, class: 'font-semibold text-red-600' }
          ]"
          action-label="View Inventory Reports"
          @action="viewReport('inventory')"
        />

        <ActionCard
          title="Customer Reports"
          description="Customer behavior, satisfaction, and retention metrics"
          emoji="👥"
          :stats="[
            { label: 'Total Reports', value: customerReports.length },
            { label: 'Active Customers', value: activeCustomers, class: 'font-semibold text-green-600' }
          ]"
          action-label="View Customer Reports"
          @action="viewReport('customer')"
        />

        <ActionCard
          title="Financial Reports"
          description="Profit & loss, cash flow, and financial statements"
          emoji="💰"
          :stats="[
            { label: 'Total Reports', value: financialReports.length },
            { label: 'Monthly Revenue', value: '$' + monthlyRevenue, class: 'font-semibold text-green-600' }
          ]"
          action-label="View Financial Reports"
          @action="viewReport('financial')"
        />

        <ActionCard
          title="Performance Reports"
          description="System performance, uptime, and efficiency metrics"
          emoji="⚡"
          :stats="[
            { label: 'Total Reports', value: performanceReports.length },
            { label: 'System Uptime', value: systemUptime + '%', class: 'font-semibold text-green-600' }
          ]"
          action-label="View Performance Reports"
          @action="viewReport('performance')"
        />

        <ActionCard
          title="Custom Reports"
          description="Create and manage custom report templates"
          emoji="📈"
          :stats="[
            { label: 'Saved Templates', value: customReports.length },
            { label: 'Scheduled', value: scheduledReports, class: 'font-semibold text-blue-600' }
          ]"
          action-label="Create Custom Report"
          @action="createCustomReport"
        />
      </div>

      <!-- Recent Reports -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900">Recent Reports</h3>
          <Button
            label="View All"
            type="secondary"
            @click="viewAllReports"
          />
        </div>

        <div class="space-y-4">
          <div v-for="report in recentReports" :key="report.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center space-x-4">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">{{ report.title }}</h4>
                <p class="text-sm text-gray-600">{{ report.description }}</p>
                <p class="text-xs text-gray-500">Generated {{ report.generatedAt }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span :class="['px-2 py-1 text-xs rounded-full', report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800']">
                {{ report.status }}
              </span>
              <Button
                label="Download"
                type="secondary"
                size="sm"
                @click="downloadReport(report.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PageHeader, ActionCard, Button } from 'commons/Components';

export default {
  name: 'Report',
  components: {
    PageHeader,
    ActionCard,
    Button
  },
  data() {
    return {
      selectedPeriod: 'this_month',
      startDate: '',
      endDate: '',
      salesReports: [
        { id: 1, title: 'Monthly Sales Summary', description: 'Revenue breakdown by product category' },
        { id: 2, title: 'Sales Performance', description: 'Individual salesperson metrics' },
        { id: 3, title: 'Customer Acquisition', description: 'New customer trends and analysis' }
      ],
      inventoryReports: [
        { id: 1, title: 'Stock Level Report', description: 'Current inventory status' },
        { id: 2, title: 'Inventory Turnover', description: 'Stock movement analysis' }
      ],
      customerReports: [
        { id: 1, title: 'Customer Satisfaction', description: 'Survey results and feedback' },
        { id: 2, title: 'Retention Analysis', description: 'Customer churn and retention metrics' }
      ],
      financialReports: [
        { id: 1, title: 'Profit & Loss', description: 'Monthly financial statement' },
        { id: 2, title: 'Cash Flow Statement', description: 'Cash movement analysis' }
      ],
      performanceReports: [
        { id: 1, title: 'System Performance', description: 'Server and application metrics' },
        { id: 2, title: 'User Activity', description: 'Platform usage statistics' }
      ],
      customReports: [
        { id: 1, title: 'Q4 Summary', description: 'Quarterly business overview' }
      ],
      recentReports: [
        {
          id: 1,
          title: 'Monthly Sales Report',
          description: 'Comprehensive sales analysis for November',
          generatedAt: '2 hours ago',
          status: 'completed'
        },
        {
          id: 2,
          title: 'Inventory Status Report',
          description: 'Current stock levels across all warehouses',
          generatedAt: '5 hours ago',
          status: 'completed'
        },
        {
          id: 3,
          title: 'Customer Analytics',
          description: 'User behavior and engagement metrics',
          generatedAt: '1 day ago',
          status: 'processing'
        }
      ],
      salesLastUpdate: '2 hours ago',
      lowStockItems: 23,
      activeCustomers: 15420,
      monthlyRevenue: '245,680',
      systemUptime: '99.8',
      scheduledReports: 5
    }
  },
  methods: {
    viewReport(type) {
      this.$router.push(`/reports/${type}`);
    },
    exportReport(format) {
      alert(`Exporting report as ${format.toUpperCase()}...`);
    },
    createCustomReport() {
      this.$router.push('/reports/custom/create');
    },
    viewAllReports() {
      this.$router.push('/reports/all');
    },
    downloadReport(reportId) {
      alert(`Downloading report ${reportId}...`);
    }
  }
};
</script>
