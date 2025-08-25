// Deal stages configuration
export const DEAL_STAGES = [
    {
        value: 'new',
        label: 'New',
        color: 'badge-new',
        description: 'Newly created deals'
    },
    {
        value: 'in_progress',
        label: 'In Progress',
        color: 'badge-in-progress',
        description: 'Deals being actively worked on'
    },
    {
        value: 'negotiation',
        label: 'Negotiation',
        color: 'badge-negotiation',
        description: 'Deals in negotiation phase'
    },
    {
        value: 'won',
        label: 'Won',
        color: 'badge-won',
        description: 'Successfully closed deals'
    },
    {
        value: 'lost',
        label: 'Lost',
        color: 'badge-lost',
        description: 'Deals that were not successful'
    }
];

// Pagination configuration
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
    MAX_VISIBLE_PAGES: 5
};

// Search and filter defaults
export const SEARCH_CONFIG = {
    DEBOUNCE_DELAY: 300,
    MIN_SEARCH_LENGTH: 2,
    PLACEHOLDER: 'Search deals by name, contact, or company...'
};

// API configuration
export const API_CONFIG = {
    BASE_URL: '/api',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000
};

// Filter configuration
export const FILTER_CONFIG = {
    VALUE_RANGES: [
        { label: 'Under $10K', min: 0, max: 10000 },
        { label: '$10K - $50K', min: 10000, max: 50000 },
        { label: '$50K - $100K', min: 50000, max: 100000 },
        { label: '$100K - $500K', min: 100000, max: 500000 },
        { label: 'Over $500K', min: 500000, max: null }
    ],
    DATE_RANGES: [
        { label: 'Last 7 days', days: 7 },
        { label: 'Last 30 days', days: 30 },
        { label: 'Last 3 months', days: 90 },
        { label: 'Last 6 months', days: 180 },
        { label: 'Last year', days: 365 }
    ]
};

// Animation configuration
export const ANIMATION_CONFIG = {
    DURATION: {
        FAST: 0.2,
        NORMAL: 0.3,
        SLOW: 0.5
    },
    EASING: {
        EASE_OUT: 'easeOut',
        EASE_IN_OUT: 'easeInOut',
        SPRING: { type: 'spring', stiffness: 300, damping: 30 }
    },
    STAGGER: {
        CHILDREN: 0.1,
        CARDS: 0.05
    }
};

// Error messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied. You do not have permission to view this content.',
    NOT_FOUND: 'The requested resource was not found.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    GENERIC_ERROR: 'An unexpected error occurred. Please try again.'
};

// Success messages
export const SUCCESS_MESSAGES = {
    DEAL_CREATED: 'Deal created successfully!',
    DEAL_UPDATED: 'Deal updated successfully!',
    DEAL_DELETED: 'Deal deleted successfully!',
    FILTERS_CLEARED: 'All filters cleared!',
    SEARCH_CLEARED: 'Search cleared!'
};

// Local storage keys
export const STORAGE_KEYS = {
    FILTER_PREFERENCES: 'deals_filter_preferences',
    SEARCH_HISTORY: 'deals_search_history',
    VIEW_PREFERENCES: 'deals_view_preferences',
    AUTH_TOKEN: 'auth_token'
};

// Default values
export const DEFAULTS = {
    FILTERS: {
        stage: '',
        minValue: '',
        maxValue: '',
        startDate: '',
        endDate: ''
    },
    PAGINATION: {
        page: 1,
        limit: PAGINATION.DEFAULT_PAGE_SIZE,
        total: 0
    },
    SEARCH_QUERY: ''
};