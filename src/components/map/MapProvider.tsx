'use client';

import React, { createContext, useContext, useState } from 'react';

interface MapContextType {
    center: [number, number];
    zoom: number;
    setCenter: (center: [number, number]) => void;
    setZoom: (zoom: number) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: React.ReactNode }) {
    const [center, setCenter] = useState<[number, number]>([31.7683, 35.2137]); // Jerusalem
    const [zoom, setZoom] = useState(8);

    return (
        <MapContext.Provider value={{ center, zoom, setCenter, setZoom }}>
            {children}
        </MapContext.Provider>
    );
}

export function useMap() {
    const context = useContext(MapContext);
    if (context === undefined) {
        throw new Error('useMap must be used within a MapProvider');
    }
    return context;
}
