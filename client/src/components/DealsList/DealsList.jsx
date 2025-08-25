import React from 'react';
import { motion } from 'framer-motion';
import DealCard from './DealCard';
import Pagination from './Pagination';

const DealsList = ({ deals, pagination, onPageChange, loading }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
            },
        },
    };

    return (
        <div className="space-y-6">
            {/* Results Summary */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    Showing {deals.length} of {pagination.total} deals
                </div>
                <div className="text-sm text-gray-500">
                    Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
                </div>
            </div>

            {/* Deals Grid */}         
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {deals.map((deal) => (
                    <motion.div key={deal.id} variants={itemVariants}>
                        <DealCard deal={deal} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Pagination */}
            {pagination.total > pagination.limit && (
                <div className="flex justify-center mt-8">
                    <Pagination
                        currentPage={pagination.page}
                        totalPages={Math.ceil(pagination.total / pagination.limit)}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default DealsList;