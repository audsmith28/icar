export interface Initiative {
    id: string;
    name: string;
    category: 'Education' | 'Health' | 'Environment' | 'Social' | 'Emergency';
    location: string;
    status: 'Active' | 'Pending' | 'Completed';
    volunteers: number;
    logoUrl?: string;
}

export interface Stats {
    totalInitiatives: number;
    activeVolunteers: number;
    totalResources: number;
    communitiesServed: number;
}

export const mockStats: Stats = {
    totalInitiatives: 150,
    activeVolunteers: 1240,
    totalResources: 85,
    communitiesServed: 32,
};

export const mockInitiatives: Initiative[] = [
    { id: '1', name: 'Tel Aviv Food Bank', category: 'Social', location: 'Tel Aviv', status: 'Active', volunteers: 45, logoUrl: 'https://placehold.co/100x100/orange/white?text=TAFB' },
    { id: '2', name: 'Haifa Emergency Response', category: 'Emergency', location: 'Haifa', status: 'Active', volunteers: 120, logoUrl: 'https://placehold.co/100x100/red/white?text=HER' },
    { id: '3', name: 'Green Jerusalem', category: 'Environment', location: 'Jerusalem', status: 'Pending', volunteers: 15, logoUrl: 'https://placehold.co/100x100/green/white?text=GJ' },
    { id: '4', name: 'Negev Education Support', category: 'Education', location: 'Beersheba', status: 'Active', volunteers: 30, logoUrl: 'https://placehold.co/100x100/blue/white?text=NES' },
    { id: '5', name: 'Galil Medical Aid', category: 'Health', location: 'Safed', status: 'Completed', volunteers: 60, logoUrl: 'https://placehold.co/100x100/purple/white?text=GMA' },
];
