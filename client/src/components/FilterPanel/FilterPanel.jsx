import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';

const DEAL_STAGES = [
    { value: 'new', label: 'New' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'won', label: 'Won' },
    { value: 'lost', label: 'Lost' },
];

const FilterPanel = ({
    open,
    filters,
    onFiltersChange,
    onClose,
    onClear
}) => {
    const handleFilterChange = (key, value) => {
        onFiltersChange({
            ...filters,
            [key]: value,
        });
    };

    const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                >
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Filter Deals
                            </h3>
                            <div className="flex items-center gap-2">
                                {hasActiveFilters && (
                                    <button
                                        onClick={onClear}
                                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                    >
                                        <RotateCcw className="h-4 w-4" />
                                        Clear all
                                    </button>
                                )}
                                <button
                                    onClick={onClose}
                                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Filters Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {/* Deal Stage */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deal Stage
                                </label>
                                <select
                                    value={filters.stage}
                                    onChange={(e) => handleFilterChange('stage', e.target.value)}
                                    className="input-field"
                                >
                                    <option value="">All stages</option>
                                    {DEAL_STAGES.map((stage) => (
                                        <option key={stage.value} value={stage.value}>
                                            {stage.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Min Value */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Min Value ($)
                                </label>
                                <input
                                    type="number"
                                    value={filters.minValue}
                                    onChange={(e) => handleFilterChange('minValue', e.target.value)}
                                    placeholder="0"
                                    min="0"
                                    step="1000"
                                    className="input-field"
                                />
                            </div>

                            {/* Max Value */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Value ($)
                                </label>
                                <input
                                    type="number"
                                    value={filters.maxValue}
                                    onChange={(e) => handleFilterChange('maxValue', e.target.value)}
                                    placeholder="1000000"
                                    min="0"
                                    step="1000"
                                    className="input-field"
                                />
                            </div>

                            {/* Start Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Created After
                                </label>
                                <input
                                    type="date"
                                    value={filters.startDate}
                                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                                    className="input-field"
                                />
                            </div>

                            {/* End Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Created Before
                                </label>
                                <input
                                    type="date"
                                    value={filters.endDate}
                                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                                    className="input-field"
                                />
                            </div>
                        </div>

                        {/* Active Filters */}
                        {hasActiveFilters && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 pt-4 border-t border-gray-200"
                            >
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-sm text-gray-600 mr-2">Active filters:</span>

                                    {filters.stage && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                            Stage: {DEAL_STAGES.find(s => s.value === filters.stage)?.label}
                                            <button
                                                onClick={() => handleFilterChange('stage', '')}
                                                className="ml-1 hover:text-blue-600"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    )}

                                    {filters.minValue && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                            Min: ${parseInt(filters.minValue).toLocaleString()}
                                            <button
                                                onClick={() => handleFilterChange('minValue', '')}
                                                className="ml-1 hover:text-green-600"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    )}

                                    {filters.maxValue && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                            Max: ${parseInt(filters.maxValue).toLocaleString()}
                                            <button
                                                onClick={() => handleFilterChange('maxValue', '')}
                                                className="ml-1 hover:text-green-600"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    )}

                                    {filters.startDate && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                                            After: {new Date(filters.startDate).toLocaleDateString()}
                                            <button
                                                onClick={() => handleFilterChange('startDate', '')}
                                                className="ml-1 hover:text-purple-600"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    )}

                                    {filters.endDate && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                                            Before: {new Date(filters.endDate).toLocaleDateString()}
                                            <button
                                                onClick={() => handleFilterChange('endDate', '')}
                                                className="ml-1 hover:text-purple-600"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FilterPanel;