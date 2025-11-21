'use client';

import React from 'react';
import { Resource } from '@/lib/api/resources';
import { Card } from '@/components/ui/Card';
import { BookOpen, DollarSign, GraduationCap, Wrench, FileText, Scale, Monitor, ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface ResourceCardProps {
    resource: Resource;
}

// Map resource types to icons and colors
const getResourceIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('guide') || lowerType.includes('document')) {
        return { icon: BookOpen, color: '#006d77' };
    }
    if (lowerType.includes('funding') || lowerType.includes('grant') || lowerType.includes('database')) {
        return { icon: DollarSign, color: '#e29578' };
    }
    if (lowerType.includes('training') || lowerType.includes('course') || lowerType.includes('workshop')) {
        return { icon: GraduationCap, color: '#0284c7' };
    }
    if (lowerType.includes('tool') || lowerType.includes('template')) {
        return { icon: Wrench, color: '#10b981' };
    }
    if (lowerType.includes('research') || lowerType.includes('report') || lowerType.includes('study')) {
        return { icon: FileText, color: '#7c3aed' };
    }
    if (lowerType.includes('legal') || lowerType.includes('compliance')) {
        return { icon: Scale, color: '#6b7280' };
    }
    if (lowerType.includes('tech') || lowerType.includes('software') || lowerType.includes('technology')) {
        return { icon: Monitor, color: '#f59e0b' };
    }
    return { icon: BookOpen, color: '#6b7280' };
};

export function ResourceCard({ resource }: ResourceCardProps) {
    const { icon: Icon, color } = getResourceIcon(resource.type);

    const handleClick = () => {
        if (resource.url && resource.url !== '#') {
            window.open(resource.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <Card
            className="h-full border border-gray-200 hover:border-[#006d77] hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={handleClick}
        >
            <div className="p-6 flex flex-col h-full">
                {/* Icon and Type Badge */}
                <div className="flex items-start justify-between mb-4">
                    <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${color}15`, color }}
                    >
                        <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="default" className="text-xs">
                        {resource.type}
                    </Badge>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#004d55] mb-2 group-hover:text-[#006d77] transition-colors line-clamp-2">
                    {resource.title}
                </h3>

                {/* Author */}
                <p className="text-sm text-gray-600 mb-3">
                    by {resource.author}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3 leading-relaxed">
                    {resource.description}
                </p>

                {/* View Button */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-[#006d77] group-hover:text-[#004d55] transition-colors">
                        {resource.url && resource.url !== '#' ? 'View Resource' : 'Coming Soon'}
                    </span>
                    {resource.url && resource.url !== '#' ? (
                        <ExternalLink className="w-4 h-4 text-[#006d77] group-hover:translate-x-1 transition-transform" />
                    ) : (
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                    )}
                </div>
            </div>
        </Card>
    );
}

