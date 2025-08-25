import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const halfVisible = Math.floor(maxVisiblePages / 2);
            let start = Math.max(1, currentPage - halfVisible);
            let end = Math.min(totalPages, currentPage + halfVisible);

            if (end - start + 1 < maxVisiblePages) {
                if (start === 1) {
                    end = Math.min(totalPages, start + maxVisiblePages - 1);
                } else {
                    start = Math.max(1, end - maxVisiblePages + 1);
                }
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex items-center justify-center space-x-1">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
            </button>

            {/* Page Numbers */}
            <div className="flex">
                {pages[0] > 1 && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                        >
                            1
                        </button>
                        {pages[0] > 2 && (
                            <span className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300">
                                ...
                            </span>
                        )}
                    </>
                )}

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-2 text-sm font-medium border-t border-b border-gray-300 transition-colors duration-200 ${page === currentPage
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'text-gray-700 bg-white hover:bg-gray-50'
                            }`}
                    >
                        {page}
                    </button>
                ))}

                {pages[pages.length - 1] < totalPages && (
                    <>
                        {pages[pages.length - 1] < totalPages - 1 && (
                            <span className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300">
                                ...
                            </span>
                        )}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                        >
                            {totalPages}
                        </button>
                    </>
                )}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
            </button>
        </div>
    );
};

export default Pagination;