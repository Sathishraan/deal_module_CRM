import React from 'react';
import { motion } from 'framer-motion';
import { Building2, User, Calendar, DollarSign, IndianRupee } from 'lucide-react';
import { format } from 'date-fns';

const DealCard = ({ deal }) => {
    const getStageColor = (stage) => {
        const colors = {
            new: 'badge-new',
            in_progress: 'badge-in-progress',
            negotiation: 'badge-negotiation',
            won: 'badge-won',
            lost: 'badge-lost',
        };
        return colors[stage] || 'badge-new';
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        return format(new Date(dateString), 'MMM dd, yyyy');
    };

    const getStageLabel = (stage) => {
        const labels = {
            new: 'New',
            in_progress: 'In Progress',
            negotiation: 'Negotiation',
            won: 'Won',
            lost: 'Lost',
        };
        return labels[stage] || stage;
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="card cursor-pointer group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {deal.name}
                </h3>
                <span className={`${getStageColor(deal.stage)} ml-2 flex-shrink-0`}>
                    {getStageLabel(deal.stage)}
                </span>
            </div>

            {/* Deal Value */}
            <div className="mb-4">
                <div className="flex items-center text-2xl font-bold text-green-600">
                    <IndianRupee className="h-5 w-5 mr-1" />
                    {formatCurrency(deal.value)}
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm truncate">{deal.contact_name}</span>
                </div>

                <div className="flex items-center text-gray-600">
                    <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm truncate">{deal.company}</span>
                </div>
            </div>

            {/* Dates */}
            <div className="pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                    <div>
                        <div className="flex items-center mb-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            Created
                        </div>
                        <div className="font-medium text-gray-700">
                            {formatDate(deal.created_at)}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center mb-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            Close Date
                        </div>
                        <div className="font-medium text-gray-700">
                            {formatDate(deal.close_date)}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DealCard;