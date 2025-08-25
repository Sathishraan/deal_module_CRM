import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, FileX } from 'lucide-react';

const EmptyState = ({ hasFilters, onClearFilters }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
        >
            <div className="max-w-md mx-auto">
                {hasFilters ? (
                    <>
                        {/* No Results Found */}
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                <Search className="h-10 w-10 text-gray-400" />
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            No deals found
                        </h3>

                        <p className="text-gray-600 mb-8">
                            We couldn't find any deals matching your current search and filter criteria.
                            Try adjusting your filters or search terms.
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={onClearFilters}
                                className="btn-primary flex items-center gap-2 mx-auto"
                            >
                                <Filter className="h-4 w-4" />
                                Clear all filters
                            </button>

                            <p className="text-sm text-gray-500">
                                or try a different search term
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        {/* No Deals at All */}
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                <FileX className="h-10 w-10 text-gray-400" />
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            No deals yet
                        </h3>

                        <p className="text-gray-600 mb-8">
                            You haven't created any deals yet. Start by adding your first deal
                            to begin tracking your sales pipeline.
                        </p>

                        <button className="btn-primary flex items-center gap-2 mx-auto">
                            <Plus className="h-4 w-4" />
                            Add your first deal
                        </button>
                    </>
                )}
            </div>

            {/* Suggestions */}
            <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                    Quick tips:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                        <Search className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>Search by deal name, contact, or company</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <Filter className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>Use filters to narrow down results</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <Plus className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>Create new deals to get started</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EmptyState;