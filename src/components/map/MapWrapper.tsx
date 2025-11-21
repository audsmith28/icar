'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
    ssr: false,
    loading: () => <div className="h-[600px] bg-gray-100 flex items-center justify-center">Loading Map...</div>
});

export default function MapWrapper() {
    return <InteractiveMap />;
}
