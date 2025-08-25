import { format, formatDistance, formatRelative, isValid, parseISO } from 'date-fns';

/**
 * Format currency values
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
    if (amount === null || amount === undefined || isNaN(amount)) {
        return '$0';
    }

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

/**
 * Format large numbers with K, M, B suffixes
 */
export const formatCompactCurrency = (amount, currency = 'USD', locale = 'en-US') => {
    if (amount === null || amount === undefined || isNaN(amount)) {
        return '$0';
    }

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        notation: 'compact',
        compactDisplay: 'short',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
    }).format(amount);
};

/**
 * Format percentage values
 */
export const formatPercentage = (value, decimals = 1) => {
    if (value === null || value === undefined || isNaN(value)) {
        return '0%';
    }

    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value / 100);
};

/**
 * Format date strings
 */
export const formatDate = (dateString, formatStr = 'MMM dd, yyyy') => {
    if (!dateString) return 'Not set';

    try {
        const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
        if (!isValid(date)) return 'Invalid date';

        return format(date, formatStr);
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid date';
    }
};

/**
 * Format relative time (e.g., "2 days ago", "in 3 hours")
 */
export const formatRelativeTime = (dateString) => {
    if (!dateString) return 'Not set';

    try {
        const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
        if (!isValid(date)) return 'Invalid date';

        return formatDistance(date, new Date(), { addSuffix: true });
    } catch (error) {
        console.error('Error formatting relative time:', error);
        return 'Invalid date';
    }
};

/**
 * Format date relative to today (e.g., "Today at 2:00 PM", "Yesterday at 9:00 AM")
 */
export const formatRelativeDate = (dateString) => {
    if (!dateString) return 'Not set';

    try {
        const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
        if (!isValid(date)) return 'Invalid date';

        return formatRelative(date, new Date());
    } catch (error) {
        console.error('Error formatting relative date:', error);
        return 'Invalid date';
    }
};

/**
 * Format file sizes
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format phone numbers
 */
export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';

    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Format US phone numbers
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    // Format international numbers (basic)
    if (cleaned.length === 11 && cleaned[0] === '1') {
        return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }

    // Return original if can't format
    return phoneNumber;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 50, suffix = '...') => {
    if (!text || text.length <= maxLength) return text;

    return text.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * Format names (capitalize first letters)
 */
export const formatName = (name) => {
    if (!name) return '';

    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

/**
 * Format initials from name
 */
export const getInitials = (name, maxInitials = 2) => {
    if (!name) return '';

    const words = name.trim().split(' ');
    const initials = words
        .slice(0, maxInitials)
        .map(word => word.charAt(0).toUpperCase())
        .join('');

    return initials;
};

/**
 * Format deal stage labels
 */
export const formatStageLabel = (stage) => {
    if (!stage) return 'Unknown';

    const stageMap = {
        new: 'New',
        in_progress: 'In Progress',
        negotiation: 'Negotiation',
        won: 'Won',
        lost: 'Lost'
    };

    return stageMap[stage] || stage.charAt(0).toUpperCase() + stage.slice(1);
};

/**
 * Format search query for display
 */
export const formatSearchQuery = (query) => {
    if (!query) return '';

    return query.trim().replace(/\s+/g, ' ');
};

/**
 * Format URL parameters
 */
export const formatUrlParams = (params) => {
    const validParams = {};

    Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== null && value !== undefined && value !== '') {
            validParams[key] = value;
        }
    });

    return validParams;
};