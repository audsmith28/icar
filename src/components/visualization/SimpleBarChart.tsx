'use client';

import React from 'react';

interface BarChartProps {
    data: { label: string; value: number; color?: string }[];
    title: string;
}

export function SimpleBarChart({ data, title }: BarChartProps) {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <div className="space-y-3">
                {data.map((item, idx) => (
                    <div key={idx}>
                        <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium text-gray-700">{item.label}</span>
                            <span className="text-gray-600">{item.value}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="h-3 rounded-full transition-all"
                                style={{
                                    width: `${(item.value / maxValue) * 100}%`,
                                    backgroundColor: item.color || 'var(--color-sea-green)'
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
