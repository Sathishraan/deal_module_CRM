import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import DealsList from '../components/DealsList/DealsList';
import EmptyState from '../components/EmptyState/EmptyState';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import LoadingState from '../components/LoadingState/LoadingState'; // Fixed typo: was 'LodingState'
import SearchBar from '../components/SearchBar';
import { dealsApi } from '../services/api';

const DealsPage = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        stage: '',
        minValue: '',
        maxValue: '',
        startDate: '',
        endDate: '',
    });
    const [showFilters, setShowFilters] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0, // Added totalPages for better pagination control
    });

    const fetchDeals = async () => {
        try {
            setLoading(true);
            const params = {
                search: searchQuery,
                ...filters,
                page: pagination.page,
                limit: pagination.limit,
            };

            // Remove empty filter values
            Object.keys(params).forEach(key => {
                if (!params[key] && params[key] !== 0) {
                    delete params[key];
                }
            });

            const response = await dealsApi.getDeals(params);

            // Handle different possible API response structures
            let allDeals, totalCount;

            if (response.data) {
                // If response has nested data structure
                allDeals = response.data.deals || response.data.data || response.data;
                totalCount = response.data.total || response.data.totalCount || response.total;
            } else {
                // If response is direct array or has different structure
                allDeals = response.deals || response;
                totalCount = response.total || response.totalCount;
            }

            // Ensure allDeals is an array
            if (!Array.isArray(allDeals)) {
                console.warn('API response is not an array:', allDeals);
                allDeals = [];
            }

            // Since API doesn't provide server-side pagination, implement client-side pagination
            const startIndex = (pagination.page - 1) * pagination.limit;
            const endIndex = startIndex + pagination.limit;
            const paginatedDeals = allDeals.slice(startIndex, endIndex);

            // If totalCount is not provided by API, use the array length
            const actualTotal = totalCount || allDeals.length;

            setDeals(paginatedDeals);
            console.log("deals response:", response);
            console.log("all deals:", allDeals.length);
            console.log("paginated deals:", paginatedDeals.length);
            console.log("total count:", actualTotal);

            setPagination(prev => ({
                ...prev,
                total: actualTotal,
                totalPages: Math.ceil(actualTotal / prev.limit),
            }));

            setError(null);
        } catch (err) {
            setError('Failed to fetch deals. Please try again.');
            console.error('Error fetching deals:', err);
            setDeals([]);
            setPagination(prev => ({
                ...prev,
                total: 0,
                totalPages: 0,
            }));
        } finally {
            setLoading(false);
        }
    };

    // 1️⃣ Reset page when search or filters change
    useEffect(() => {
        setPagination(prev => ({ ...prev, page: 1 }));
    }, [searchQuery, filters]);

    // 2️⃣ Fetch deals when page or limit changes (or after reset above)
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDeals();
        }, 300);

        return () => clearTimeout(timer);
    }, [pagination.page, pagination.limit, searchQuery, filters]);

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        // Reset pagination will be handled by useEffect
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        // Reset pagination will be handled by useEffect
    };

    const handlePageChange = (newPage) => {
        // Validate page number
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    };

    const handleLimitChange = (newLimit) => {
        setPagination(prev => ({
            ...prev,
            limit: newLimit,
            page: 1 // Reset to first page when changing limit
        }));
    };

    const clearAllFilters = () => {
        setSearchQuery('');
        setFilters({
            stage: '',
            minValue: '',
            maxValue: '',
            startDate: '',
            endDate: '',
        });
        setShowFilters(false);
        setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
    };

    const hasActiveFilters = searchQuery || Object.values(filters).some(f => f);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Deals Management
                        </h1>
                        <p className="text-gray-600">
                            Search and filter your business deals
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <SearchBar
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onToggleFilters={() => setShowFilters(!showFilters)}
                            showFilters={showFilters}
                            hasActiveFilters={hasActiveFilters}
                        />
                    </div>

                    {/* Filter Panel */}
                    <FilterPanel
                        open={showFilters}
                        filters={filters}
                        onFiltersChange={handleFilterChange}
                        onClose={() => setShowFilters(false)}
                        onClear={clearAllFilters}
                    />

                    {/* Error Alert */}
                    {error && (
                        <ErrorAlert
                            message={error}
                            onClose={() => setError(null)}
                        />
                    )}

                    {/* Content Area */}
                    <div className="mt-6">
                        {loading ? (
                            <LoadingState />
                        ) : deals.length === 0 ? (
                            <EmptyState
                                hasFilters={hasActiveFilters}
                                onClearFilters={clearAllFilters}
                            />
                        ) : (
                            <DealsList
                                deals={deals}
                                pagination={pagination}
                                onPageChange={handlePageChange}
                                onLimitChange={handleLimitChange} // Added if your component supports it
                                loading={loading}
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DealsPage;