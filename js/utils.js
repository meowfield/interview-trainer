// Utility Functions

/**
 * Debounce function to limit the rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Safely get nested object property
 * @param {Object} obj - Object to search
 * @param {string} path - Dot-separated path
 * @param {*} defaultValue - Default value if path not found
 * @returns {*} Value at path or default value
 */
function safeGet(obj, path, defaultValue = null) {
    try {
        return path.split('.').reduce((current, key) => current[key], obj) || defaultValue;
    } catch (error) {
        return defaultValue;
    }
}

/**
 * Format text for better readability
 * @param {string} text - Text to format
 * @returns {string} Formatted text
 */
function formatText(text) {
    if (!text || typeof text !== 'string') return '';
    
    return text
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/\n\s*\n/g, '\n\n');
}

/**
 * Validate form field
 * @param {string} value - Field value
 * @param {Object} rules - Validation rules
 * @returns {Object} Validation result
 */
function validateField(value, rules = {}) {
    const errors = [];
    
    if (rules.required && (!value || value.trim().length === 0)) {
        errors.push('This field is required');
    }
    
    if (rules.minLength && value.length < rules.minLength) {
        errors.push(`Minimum length is ${rules.minLength} characters`);
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`Maximum length is ${rules.maxLength} characters`);
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
        errors.push('Invalid format');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Get device type based on screen size
 * @returns {string} Device type: 'mobile', 'tablet', or 'desktop'
 */
function getDeviceType() {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
}

/**
 * Check if device supports touch
 * @returns {boolean} True if touch is supported
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Generate unique ID
 * @returns {string} Unique identifier
 */
function generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Format bytes to human readable string
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size string
 */
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Deep clone an object
 * @param {*} obj - Object to clone
 * @returns {*} Cloned object
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const cloned = {};
        Object.keys(obj).forEach(key => {
            cloned[key] = deepClone(obj[key]);
        });
        return cloned;
    }
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean} True if user prefers reduced motion
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animate element with CSS class
 * @param {HTMLElement} element - Element to animate
 * @param {string} animationClass - CSS animation class
 * @param {number} duration - Animation duration in ms
 * @returns {Promise} Promise that resolves when animation completes
 */
function animateElement(element, animationClass, duration = 300) {
    return new Promise(resolve => {
        if (prefersReducedMotion()) {
            resolve();
            return;
        }
        
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
            resolve();
        }, duration);
    });
}

/**
 * Escape HTML to prevent XSS
 * @param {string} unsafe - Unsafe HTML string
 * @returns {string} Safe HTML string
 */
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}