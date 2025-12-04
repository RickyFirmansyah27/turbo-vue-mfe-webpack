# Management App

A Vue.js-based management application for employee and department management.

## Features

- **Dashboard**: Overview of company metrics and key performance indicators
- **Employee Management**: View and manage employee information, status, and departments
- **Department Management**: Organize and manage company departments with team capacity tracking
- **Reports**: Generate and view various management reports and analytics

## Sample Pages

### 1. Dashboard
- Company overview with key metrics
- Employee statistics
- Department performance indicators
- Recent activities tracking
- Interactive management features

### 2. Employee Management
- Employee directory with search functionality
- Employee status tracking (Active/On Leave)
- Department assignment
- Employee statistics and KPIs
- Add/edit employee functionality

### 3. Department Management
- Visual department cards with team capacity
- Budget and headcount tracking
- Department status and activities
- Team capacity visualization
- Department performance metrics

### 4. Reports
- Multiple report types (Performance, Financial, Employee, Department)
- Report generation and scheduling
- Report trends and analytics
- Export functionality
- Quick report generation for specific areas

## Sample Data

The app includes realistic sample data:
- 5 sample employees with photos and details
- 6 departments (Engineering, Product, Design, Marketing, Sales, HR)
- 5 sample reports with different statuses
- Realistic metrics and KPIs

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Routes

- `/management` - Dashboard
- `/management/employees` - Employee Management
- `/management/departments` - Department Management
- `/management/reports` - Reports

## Technologies Used

- Vue.js 2.6
- Vue Router 3.5
- Tailwind CSS 3.3
- Webpack 5
- Common components from shared library

## Component Structure

- Uses shared components from `commons/Components`
- Uses shared utilities from `commons/Utils`
- Modular design with reusable components
- Consistent styling with the existing remote app

## Integration

This app is designed to work as a remote microfrontend that can be integrated into a shell application using the mount function pattern.