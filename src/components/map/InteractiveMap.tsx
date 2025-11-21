'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';

// Fix Leaflet icon issue
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function InteractiveMap() {
    const [isMounted, setIsMounted] = useState(false);
    const [stakeholders, setStakeholders] = useState<any[]>([]);
    const [opportunities, setOpportunities] = useState<any[]>([]);

    useEffect(() => {
        setIsMounted(true);
        // Fetch from API
        fetch('/api/stakeholders')
            .then(res => res.json())
            .then(data => setStakeholders(data));
        fetch('/api/opportunities')
            .then(res => res.json())
            .then(data => setOpportunities(data));
    }, []);

    if (!isMounted) {
        return <div className="h-[600px] bg-gray-100 flex items-center justify-center">Loading Map...</div>;
    }

    return (
        <div className="h-[calc(100vh-200px)] w-full rounded-lg overflow-hidden border shadow-md z-0 relative">
            <MapContainer
                center={[31.9, 34.9]}
                zoom={8}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {stakeholders.map((s) => (
                    <Marker key={s.id} position={[s.lat, s.lng]} icon={customIcon}>
                        <Popup>
                            <div className="p-1">
                                <h3 className="font-bold text-sm mb-1">{s.name}</h3>
                                <p className="text-xs text-gray-600 mb-2">{s.type}</p>
                                <Link href={`/organizations/${s.id}`}>
                                    <div className="font-medium hover:underline">{s.name}</div>
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {opportunities.map((o) => (
                    <Marker key={o.id} position={[o.lat, o.lng]} icon={customIcon}>
                        <Popup>
                            <div className="p-1">
                                <h3 className="font-bold text-sm mb-1">{o.title}</h3>
                                <p className="text-xs text-gray-600 mb-2">{o.organization_name}</p>
                                <Link href={`/projects/${o.id}`}>
                                    <Button size="sm" variant="secondary" className="w-full text-xs h-7">View Project</Button>
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
