// Application Configuration
const CONFIG = {
    // Application metadata
    APP_NAME: 'PrepareToWork',
    VERSION: '1.0.0',
    
    // Default settings
    DEFAULT_LANGUAGE: 'en',
    DEFAULT_THEME: 'auto', // 'light', 'dark', or 'auto'
    
    // UI settings
    ANIMATION_DURATION: 300,
    LOADING_SIMULATION_TIME: 800,
    STATUS_DISPLAY_TIME: 3000,
    
    // LocalStorage keys
    STORAGE_KEYS: {
        LANGUAGE: 'lang',
        THEME: 'theme',
        SYSTEM_PROMPT: 'systemPrompt'
    },
    
    // Supported languages
    SUPPORTED_LANGUAGES: ['en', 'ru'],
    
    // Theme options
    THEMES: ['light', 'dark'],
    
    // Form validation
    VALIDATION: {
        MIN_USER_INFO_LENGTH: 10,
        MIN_JOB_DESCRIPTION_LENGTH: 20,
        MAX_FIELD_LENGTH: 10000
    },
    
    // Keyboard shortcuts
    SHORTCUTS: {
        GENERATE_PROMPT: 'Ctrl+Enter', // or Cmd+Enter on Mac
        TOGGLE_THEME: 'Ctrl+Shift+T',
        TOGGLE_LANGUAGE: 'Ctrl+Shift+L'
    },
    
    // API endpoints (for future use)
    API: {
        BASE_URL: '',
        ENDPOINTS: {
            ANALYTICS: '/analytics',
            FEEDBACK: '/feedback'
        }
    },
    
    // Feature flags
    FEATURES: {
        ANALYTICS: false,
        FEEDBACK_FORM: false,
        EXPORT_PDF: false,
        SAVE_DRAFTS: false
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}