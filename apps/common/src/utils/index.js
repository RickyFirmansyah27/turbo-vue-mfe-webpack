/**
 * Format a date to a human-readable string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(date).toLocaleDateString(undefined, options);
};

/**
 * Truncate a string to a specified length and add ellipsis
 * @param {string} str - The string to truncate
 * @param {number} length - Maximum length before truncation
 * @returns {string} Truncated string
 */
export const truncateText = (str, length = 100) => {
  if (!str) return '';
  if (str.length <= length) return str;
  
  return `${str.substring(0, length)}...`;
};

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Debounce a function call
 * @param {Function} func - The function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Deep clone an object
 * @param {Object} obj - The object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const menuPrefix = '/service';

// remote app
const remotePrefixes = [
  '/assets',
  '/reports',
  '/transaction',
  '/management',
];

export const Checkpoints = {
  // Shell-specific routes
  login: '/',
  homepage: '/homepage',
  
  // Base paths for remote features
  assets: remotePrefixes[0],      // '/remote'
  reports: remotePrefixes[1],     // '/reports'
  transactions: remotePrefixes[2],// '/transaction'
  managements: remotePrefixes[3], // '/management'

  // Specific sub-paths for the remote app
  assetsProfile: `${remotePrefixes[0]}/profile`,
  assetsSetting: `${remotePrefixes[0]}/settings`,
  assetsReport: `${remotePrefixes[0]}/reports`,
  assetsList: `${remotePrefixes[0]}/assets`,


  // Specific sub-paths for the management app
  managementDashboard: `${remotePrefixes[3]}/dashboard`,
  managementEmployees: `${remotePrefixes[3]}/employees`,
  managementDepartments: `${remotePrefixes[3]}/departments`,
  managementReports: `${remotePrefixes[3]}/reports`,
};

export function getPrefix(path) {
  return remotePrefixes.find(prefix => path.startsWith(prefix)) || null;
}

export function isSameRemotePrefix(from, to) {
  const fromPrefix = getPrefix(from);
  const toPrefix = getPrefix(to);
  return fromPrefix && (fromPrefix !== toPrefix);
}