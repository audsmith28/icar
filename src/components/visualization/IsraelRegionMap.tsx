'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { MapPin } from 'lucide-react';

interface RegionData {
    name: string;
    count: number;
    coordinates: [number, number]; // [lat, lng]
}

interface IsraelRegionMapProps {
    regionData: Record<string, number>;
}

// Israeli region coordinates (approximate centers for markers)
const REGION_COORDINATES: Record<string, [number, number]> = {
    'Tel Aviv': [32.0853, 34.7818],
    'Jerusalem': [31.7683, 35.2137],
    'Haifa': [32.7940, 34.9896],
    'North': [32.7940, 35.0896],
    'South': [31.2518, 34.7913],
    'Center': [31.9510, 34.8885],
    'Judea and Samaria': [31.9510, 35.2137],
    'Other': [31.7683, 35.2137],
};

const COLORS = {
    high: '#d95222',      // Orange/Pink for high counts
    medium: '#02808b',    // Teal for medium counts
    low: '#83c5be',       // Light teal for low counts
    text: '#004d57',      // Dark teal for text
};

export function IsraelRegionMap({ regionData }: IsraelRegionMapProps) {
    // Debug: Log the data we're receiving
    console.log('IsraelRegionMap - regionData:', regionData);
    
    // Convert region data to array with coordinates
    const regions: RegionData[] = Object.entries(regionData || {})
        .map(([name, count]) => ({
            name,
            count,
            coordinates: REGION_COORDINATES[name] || REGION_COORDINATES['Other'],
        }))
        .sort((a, b) => b.count - a.count);
    
    console.log('IsraelRegionMap - regions:', regions);

    // Calculate size based on count (relative scaling)
    const maxCount = Math.max(...regions.map(r => r.count));
    const minCount = Math.min(...regions.map(r => r.count));
    const range = maxCount - minCount || 1;

    const getCircleSize = (count: number) => {
        const normalized = (count - minCount) / range;
        // Size between 50px and 100px
        return 50 + (normalized * 50);
    };

    const getColor = (count: number) => {
        const normalized = (count - minCount) / range;
        if (normalized > 0.5) return COLORS.high; // Orange/Pink for high
        if (normalized > 0.2) return COLORS.medium; // Teal for medium
        return COLORS.low; // Light teal for low
    };

    // Stylized Israel outline - simplified but recognizable shape
    // Israel's distinctive long, narrow shape from north to south
    // Using a simple polygon path that will definitely render
    const israelPath = "M 60 40 L 120 35 L 180 40 L 240 50 L 300 65 L 350 85 L 380 110 L 385 140 L 375 170 L 350 195 L 310 215 L 260 225 L 200 228 L 140 220 L 90 205 L 55 180 L 35 150 L 30 120 L 40 90 L 50 65 Z";

    // Map coordinates to SVG positions (stylized positioning)
    const getMapPosition = (region: RegionData, index: number) => {
        const [lat, lng] = region.coordinates;
        // Simplified positioning - map to SVG viewBox coordinates
        // Adjust these to position markers in a stylized but recognizable way
        const positions: Record<string, { x: number; y: number }> = {
            'Tel Aviv': { x: 200, y: 140 },
            'Jerusalem': { x: 280, y: 160 },
            'Haifa': { x: 150, y: 80 },
            'North': { x: 180, y: 60 },
            'South': { x: 200, y: 200 },
            'Center': { x: 220, y: 150 },
            'Judea and Samaria': { x: 300, y: 170 },
            'Other': { x: 250, y: 180 },
        };
        
        return positions[region.name] || { x: 200 + (index * 30), y: 150 };
    };

    const totalOrgs = Object.values(regionData || {}).reduce((a, b) => a + b, 0);

    // Fallback if no data
    if (!regionData || Object.keys(regionData).length === 0) {
        return (
            <Card className="p-6 bg-white">
                <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-sea-green-darker" />
                    <h3 className="text-lg font-semibold text-sea-green-darkest">
                        Organizations by Region
                    </h3>
                </div>
                <div className="p-8 text-center text-gray-500">
                    No regional data available
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6 bg-white">
            <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-sea-green-darker" />
                <h3 className="text-lg font-semibold text-sea-green-darkest">
                    Organizations by Region
                </h3>
            </div>
            
            <div className="flex gap-6">
                {/* Left: Stylized Map */}
                <div 
                    className="flex-1 relative rounded-lg border-2 border-gray-300" 
                    style={{ 
                        minHeight: '400px', 
                        height: '400px',
                        position: 'relative',
                        backgroundColor: '#f0f9fa',
                        padding: '0'
                    }}
                >
                    {/* Debug info - remove after troubleshooting */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="absolute top-2 left-2 bg-yellow-100 text-xs p-2 rounded z-20 border border-yellow-300">
                            <div>Regions: {regions.length}</div>
                            <div>Total: {totalOrgs}</div>
                            <div className="text-[10px] mt-1">Data keys: {Object.keys(regionData).join(', ')}</div>
                        </div>
                    )}
                    
                    {/* SVG Container with explicit dimensions */}
                    <svg 
                        viewBox="0 0 400 250" 
                        width="100%"
                        height="100%"
                        style={{ 
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            minHeight: '400px',
                            backgroundColor: '#e8f4f5'
                        }}
                        preserveAspectRatio="xMidYMid meet"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Background - very visible */}
                        <rect x="0" y="0" width="400" height="250" fill="#e8f4f5" stroke="#02808b" strokeWidth="3" />
                        
                        {/* Stylized Israel outline - simplified path */}
                        <path
                            d={israelPath}
                            fill="#d1e7e9"
                            stroke="#02808b"
                            strokeWidth="5"
                            opacity="1"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                        
                        {/* Inner highlight */}
                        <path
                            d={israelPath}
                            fill="none"
                            stroke="#83c5be"
                            strokeWidth="2.5"
                            opacity="0.9"
                        />
                        
                        {/* Regional markers */}
                        {regions.map((region, index) => {
                            const size = Math.max(40, getCircleSize(region.count)); // Minimum size
                            const color = getColor(region.count);
                            const { x, y } = getMapPosition(region, index);
                            
                            return (
                                <g key={region.name}>
                                    {/* Circle marker - larger and more visible */}
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r={size / 2}
                                        fill={color}
                                        opacity="0.9"
                                        stroke="#ffffff"
                                        strokeWidth="4"
                                    />
                                    {/* Count text */}
                                    <text
                                        x={x}
                                        y={y + 6}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill="#ffffff"
                                        fontSize="18"
                                        fontWeight="bold"
                                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                                    >
                                        {region.count}
                                    </text>
                                    {/* Region name */}
                                    <text
                                        x={x}
                                        y={y + size / 2 + 25}
                                        textAnchor="middle"
                                        fill={COLORS.text}
                                        fontSize="13"
                                        fontWeight="700"
                                        style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}
                                    >
                                        {region.name}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* Right: Summary List */}
                <div className="w-64 space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Summary</h4>
                    {regions.map((region) => {
                        const percentage = totalOrgs > 0 ? ((region.count / totalOrgs) * 100).toFixed(1) : '0';
                        const color = getColor(region.count);
                        
                        return (
                            <div 
                                key={region.name} 
                                className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <div 
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                    <span className="text-sm font-medium text-gray-700">{region.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-900">{region.count.toLocaleString()}</span>
                                    <span className="text-xs text-gray-500">({percentage}%)</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-orange"></div>
                        <span className="text-gray-600">High concentration</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-sea-green-darker"></div>
                        <span className="text-gray-600">Medium concentration</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-sea-green-light"></div>
                        <span className="text-gray-600">Lower concentration</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
