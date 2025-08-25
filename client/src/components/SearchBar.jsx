import { motion } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SearchBar = ({
    value,
    onChange,
    onToggleFilters,
    showFilters,
    hasActiveFilters
}) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onChange(localValue);
    };

    const handleClear = () => {
        setLocalValue('');
        onChange('');
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        onChange(newValue); // Real-time search
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl"
        >
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative flex items-center bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent">
                    {/* Search Icon */}
                    <div className="pl-4 pr-3">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>

                    {/* Input Field */}
                    <input
                        type="text"
                        value={localValue}
                        onChange={handleChange}
                        placeholder="Search deals by name, contact, or company..."
                        className="flex-1 py-3 pr-3 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
                    />

                    {/* Clear Button */}
                    {localValue && (
                        <motion.button
                            type="button"
                            onClick={handleClear}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <X className="h-4 w-4" />
                        </motion.button>
                    )}

                    {/* Divider */}
                    <div className="w-px h-6 bg-gray-200 mx-2" />

                    {/* Filter Button */}
                    <button
                        type="button"
                        onClick={onToggleFilters}
                        className={`flex items-center gap-2 px-4 py-2 mr-2 rounded-lg transition-colors duration-200 ${showFilters || hasActiveFilters
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Filter className="h-4 w-4" />
                        <span className="text-sm font-medium hidden sm:block">
                            Filters
                        </span>
                        {hasActiveFilters && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                    </button>
                </div>

               
            </form>
        </motion.div>
    );
};

export default SearchBar;