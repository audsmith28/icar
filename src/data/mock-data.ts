export const MOCK_USERS = [
    { id: 'u1', name: 'Admin User', email: 'admin@icar.co.il', role: 'admin' as 'admin' | 'user', avatar: 'https://placehold.co/150' },
    { id: 'u2', name: 'Sarah Cohen', email: 'sarah@example.com', role: 'user' as 'admin' | 'user', avatar: 'https://placehold.co/150' },
    { id: 'u3', name: 'David Levy', email: 'david@example.com', role: 'user' as 'admin' | 'user', avatar: 'https://placehold.co/150' },
];

export const MOCK_STAKEHOLDERS = [
    {
        id: 's1',
        name: 'Lev Echad',
        type: 'NGO',
        focus: ['Mental Health', 'Emergency Response'],
        location: 'Tel Aviv',
        lat: 32.0853,
        lng: 34.7818,
        status: 'Active',
        description: 'Providing mental health support during crises.',
        contact: 'contact@levechad.org',
        email: 'contact@levechad.org',
    },
    {
        id: 's2',
        name: 'Food for All',
        type: 'Volunteer Group',
        focus: ['Food Security'],
        location: 'Haifa',
        lat: 32.7940,
        lng: 34.9896,
        status: 'Active',
        description: 'Distributing food packages to elderly citizens.',
        contact: 'info@foodforall.il',
        email: 'info@foodforall.il',
    },
    {
        id: 's3',
        name: 'Tech Rescue',
        type: 'Private Sector',
        focus: ['Logistics', 'Technology'],
        location: 'Remote',
        lat: 32.0853,
        lng: 34.7818,
        status: 'Pending',
        description: 'Developing logistics software for aid distribution.',
        contact: 'support@techrescue.io',
        email: 'support@techrescue.io',
    },
];

export const MOCK_OPPORTUNITIES = [
    {
        id: 'o1',
        title: 'Emergency Drivers Needed',
        organization_id: 's1',
        organization_name: 'Lev Echad',
        type: 'Volunteering',
        location: 'South District',
        lat: 31.2518,
        lng: 34.7913,
        date: '2025-11-25',
        status: 'Open',
        description: 'Drivers needed to transport medical supplies to the south.'
    },
    {
        id: 'o2',
        title: 'Web Developer for NGO Site',
        organization_id: 's2',
        organization_name: 'Food for All',
        type: 'Pro Bono',
        location: 'Remote',
        lat: 32.0853,
        lng: 34.7818,
        date: '2025-12-01',
        status: 'Open',
        description: 'Looking for a React developer to update our donation portal.'
    },
    {
        id: 'o3',
        title: 'Winter Gear Collection',
        organization_id: 'org_city',
        organization_name: 'City Community Center',
        type: 'Donation',
        location: 'Jerusalem',
        lat: 31.7683,
        lng: 35.2137,
        date: '2025-11-30',
        status: 'Closed',
        description: 'Collecting coats and blankets for winter.'
    }
];

export const MOCK_RESOURCES = [
    {
        id: 'r1',
        title: 'Mental Health First Aid Kit',
        type: 'Guide',
        author: 'Ministry of Health',
        url: '#',
        description: 'Comprehensive guide for providing mental health first aid.',
    },
    {
        id: 'r2',
        title: 'Volunteer Management Best Practices',
        type: 'Document',
        author: 'ICAR Core Team',
        url: '#',
        description: 'Standard operating procedures for managing volunteers effectively.',
    },
    {
        id: 'r3',
        title: 'Funding Opportunities Database',
        type: 'Database',
        author: 'Philanthropy IL',
        url: '#',
        description: 'List of active grants and funding opportunities for NGOs.',
    }
];
