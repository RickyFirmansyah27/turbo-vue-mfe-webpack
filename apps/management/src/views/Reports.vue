<template>
  <div class="p-6">
    <!-- Header -->
    <PageHeader
      title="Management Reports"
      subtitle="Generate and view company performance reports"
      gradient="from-purple-600 to-blue-600"
      subtitle-color="text-purple-100"
    />

    <div class="mb-6"></div>
    
    <!-- Report Actions -->
    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div class="flex space-x-4">
          <Button
            label="Generate Report"
            type="primary"
            @click="generateReport"
          >
            <template #icon>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </template>
          </Button>
          <Button
            label="Schedule Report"
            type="secondary"
            @click="scheduleReport"
          />
        </div>
        <div class="flex space-x-2">
          <select
            v-model="selectedReportType"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Reports</option>
            <option value="performance">Performance</option>
            <option value="financial">Financial</option>
            <option value="employee">Employee</option>
            <option value="department">Department</option>
          </select>
          <Button
            label="Export"
            type="secondary"
            @click="exportReports"
          />
        </div>
      </div>
    </div>

    <!-- Report Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <StatsCard
        title="Total Reports"
        :value="reports.length.toString()"
        change="+8"
        trend="up"
      />
      <StatsCard
        title="This Month"
        :value="monthlyReports.toString()"
        change="+3"
        trend="up"
      />
      <StatsCard
        title="Scheduled"
        :value="scheduledReports.toString()"
        change="+1"
        trend="up"
      />
      <StatsCard
        title="Completed"
        :value="completedReports.toString()"
        change="+12"
        trend="up"
      />
    </div>

    <!-- Recent Reports -->
    <div class="bg-white rounded-xl shadow-sm mb-6">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Recent Reports</h3>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div
            v-for="report in filteredReports"
            :key="report.id"
            class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div class="flex items-center space-x-4">
              <div 
                class="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                :style="{ backgroundColor: report.color }"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="report.icon"></path>
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">{{ report.title }}</h4>
                <p class="text-sm text-gray-500">{{ report.description }}</p>
                <div class="flex items-center space-x-4 mt-1">
                  <span class="text-xs text-gray-400">{{ report.date }}</span>
                  <span :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    report.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    report.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  ]">
                    {{ report.status }}
                  </span>
                  <span class="text-xs text-gray-400">{{ report.type }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <Button
                label="View"
                type="secondary"
                size="small"
                @click="viewReport(report)"
              />
              <Button
                label="Download"
                type="primary"
                size="small"
                @click="downloadReport(report)"
                :disabled="report.status !== 'Completed'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Report Generation Trends -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Report Generation Trends</h3>
        <div class="space-y-4">
          <div
            v-for="trend in reportTrends"
            :key="trend.id"
            class="flex items-center justify-between"
          >
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                   :style="{ backgroundColor: trend.color }">
                {{ trend.month.charAt(0) }}
              </div>
              <span class="text-sm text-gray-900">{{ trend.month }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  class="h-2 rounded-full"
                  :style="{ 
                    width: `${(trend.count / maxTrendCount) * 100}%`,
                    backgroundColor: trend.color 
                  }"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-900">{{ trend.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Report Types Distribution -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Report Types Distribution</h3>
        <div class="space-y-4">
          <div
            v-for="type in reportTypeStats"
            :key="type.name"
            class="flex items-center justify-between"
          >
            <div class="flex items-center space-x-3">
              <div 
                class="w-4 h-4 rounded"
                :style="{ backgroundColor: type.color }"
              ></div>
              <span class="text-sm text-gray-900">{{ type.name }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  class="h-2 rounded-full"
                  :style="{ 
                    width: `${(type.count / totalReports) * 100}%`,
                    backgroundColor: type.color 
                  }"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-900">{{ type.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          label="Employee Report"
          type="secondary"
          @click="generateEmployeeReport"
        />
        <Button
          label="Department Report"
          type="secondary"
          @click="generateDepartmentReport"
        />
        <Button
          label="Financial Summary"
          type="secondary"
          @click="generateFinancialReport"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { PageHeader, Button, StatsCard } from 'commons/Components';

export default {
  name: 'Reports',
  components: {
    PageHeader,
    Button,
    StatsCard
  },
  data() {
    return {
      selectedReportType: '',
      reports: [
        {
          id: 1,
          title: 'Q4 2024 Performance Report',
          description: 'Comprehensive quarterly performance analysis',
          type: 'Performance',
          status: 'Completed',
          date: '2024-12-01',
          color: '#3B82F6',
          icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        },
        {
          id: 2,
          title: 'Employee Satisfaction Survey',
          description: 'Annual employee satisfaction and engagement survey',
          type: 'Employee',
          status: 'Processing',
          date: '2024-11-28',
          color: '#10B981',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        },
        {
          id: 3,
          title: 'Financial Summary November',
          description: 'Monthly financial performance and budget analysis',
          type: 'Financial',
          status: 'Completed',
          date: '2024-11-30',
          color: '#F59E0B',
          icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
          id: 4,
          title: 'Department Performance Analysis',
          description: 'Cross-departmental performance metrics and KPI analysis',
          type: 'Department',
          status: 'Completed',
          date: '2024-11-25',
          color: '#8B5CF6',
          icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
        },
        {
          id: 5,
          title: 'Yearly Budget Report',
          description: 'Annual budget allocation and expenditure report',
          type: 'Financial',
          status: 'Scheduled',
          date: '2024-12-15',
          color: '#EF4444',
          icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
        }
      ],
      reportTrends: [
        { id: 1, month: 'Jan', count: 12, color: '#3B82F6' },
        { id: 2, month: 'Feb', count: 19, color: '#10B981' },
        { id: 3, month: 'Mar', count: 15, color: '#F59E0B' },
        { id: 4, month: 'Apr', count: 22, color: '#8B5CF6' },
        { id: 5, month: 'May', count: 18, color: '#EF4444' },
        { id: 6, month: 'Jun', count: 25, color: '#06B6D4' }
      ],
      reportTypeStats: [
        { name: 'Performance', count: 28, color: '#3B82F6' },
        { name: 'Financial', count: 22, color: '#10B981' },
        { name: 'Employee', count: 18, color: '#F59E0B' },
        { name: 'Department', count: 15, color: '#8B5CF6' }
      ]
    };
  },
  computed: {
    filteredReports() {
      if (!this.selectedReportType) return this.reports;
      return this.reports.filter(report => 
        report.type.toLowerCase() === this.selectedReportType
      );
    },
    monthlyReports() {
      const currentMonth = new Date().getMonth();
      return this.reports.filter(report => {
        const reportMonth = new Date(report.date).getMonth();
        return reportMonth === currentMonth;
      }).length;
    },
    scheduledReports() {
      return this.reports.filter(report => report.status === 'Scheduled').length;
    },
    completedReports() {
      return this.reports.filter(report => report.status === 'Completed').length;
    },
    totalReports() {
      return this.reportTypeStats.reduce((sum, type) => sum + type.count, 0);
    },
    maxTrendCount() {
      return Math.max(...this.reportTrends.map(trend => trend.count));
    }
  },
  methods: {
    generateReport() {
      alert('Generate new report functionality');
    },
    scheduleReport() {
      alert('Schedule recurring report functionality');
    },
    exportReports() {
      alert('Export reports data functionality');
    },
    viewReport(report) {
      alert(`View report: ${report.title}`);
    },
    downloadReport(report) {
      alert(`Download report: ${report.title}`);
    },
    generateEmployeeReport() {
      alert('Generate employee report functionality');
    },
    generateDepartmentReport() {
      alert('Generate department report functionality');
    },
    generateFinancialReport() {
      alert('Generate financial summary functionality');
    }
  }
};
</script>