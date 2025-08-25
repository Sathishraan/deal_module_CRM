import React from 'react';
import { motion } from 'framer-motion';

const LoadingState = () => {
    const skeletonItems = Array(12).fill(0);

    return (
        <div className="space-y-6">
            {/* Loading Header */}
            <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>

            {/* Loading Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {skeletonItems.map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="card"
                    >
                        {/* Header Skeleton */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                            </div>
                            <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse ml-2"></div>
                        </div>

                        {/* Value Skeleton */}
                        <div className="mb-4">
                            <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                        </div>

                        {/* Contact Info Skeleton */}
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center">
                                <div className="h-4 w-4 bg-gray-200 rounded mr-2 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-4 w-4 bg-gray-200 rounded mr-2 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                            </div>
                        </div>

                        {/* Dates Skeleton */}
                        <div className="pt-4 border-t border-gray-100">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse mb-1"></div>
                                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                                </div>
                                <div>
                                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse mb-1"></div>
                                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LoadingState;