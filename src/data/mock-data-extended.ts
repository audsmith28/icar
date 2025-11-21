// Mock Projects Data
export const MOCK_PROJECTS = [
    {
        id: 'p1',
        title: 'Mental Health Support for Displaced Families',
        organizationId: 's1',
        organizationName: 'Lev Echad',
        description: 'Providing trauma-informed mental health services to families displaced by conflict in the South District.',
        status: 'Active',
        focusAreas: ['Mental Health', 'Emergency Response', 'Family Support'],
        location: 'South District',
        lat: 31.2518,
        lng: 34.7913,
        startDate: '2024-10-01',
        endDate: '2025-03-31',
        // Public fields end here
        collaborationNeeds: 'Looking for volunteer therapists, translators (Arabic/Hebrew), and logistics support for mobile clinics.',
        budget: 450000,
        kpis: JSON.stringify({
            beneficiaries: 850,
            sessions: 3200,
            satisfaction: '92%'
        })
    },
    {
        id: 'p2',
        title: 'Food Security Initiative - Northern Communities',
        organizationId: 's2',
        organizationName: 'Food for All',
        description: 'Establishing community food hubs and distribution networks for vulnerable populations in Haifa and surrounding areas.',
        status: 'Active',
        focusAreas: ['Food Security', 'Community Development'],
        location: 'Haifa',
        lat: 32.7940,
        lng: 34.9896,
        startDate: '2024-06-15',
        endDate: '2025-12-31',
        collaborationNeeds: 'Seeking partnerships with local farms, warehouse space, and volunteer drivers for weekly distributions.',
        budget: 280000,
        kpis: JSON.stringify({
            familiesServed: 620,
            mealsDistributed: 18500,
            volunteers: 45
        })
    },
    {
        id: 'p3',
        title: 'Emergency Logistics Platform Development',
        organizationId: 's3',
        organizationName: 'Tech Rescue',
        description: 'Building an open-source platform to coordinate aid distribution, volunteer deployment, and resource tracking during emergencies.',
        status: 'Planning',
        focusAreas: ['Technology', 'Logistics', 'Emergency Response'],
        location: 'Remote',
        lat: 32.0853,
        lng: 34.7818,
        startDate: '2025-01-15',
        endDate: '2025-06-30',
        collaborationNeeds: 'Need UX designers, backend developers (Node.js), and NGO partners for pilot testing.',
        budget: 180000,
        kpis: JSON.stringify({
            platformUsers: 0,
            ngoPartners: 3,
            developmentProgress: '35%'
        })
    },
    {
        id: 'p4',
        title: 'Youth Resilience & Leadership Program',
        organizationId: 's1',
        organizationName: 'Lev Echad',
        description: 'Empowering youth (ages 14-18) affected by trauma through leadership training, peer support groups, and community service projects.',
        status: 'Active',
        focusAreas: ['Youth Development', 'Mental Health', 'Education'],
        location: 'Tel Aviv',
        lat: 32.0853,
        lng: 34.7818,
        startDate: '2024-09-01',
        endDate: '2025-08-31',
        collaborationNeeds: 'Looking for mentors, workshop facilitators, and funding for scholarships.',
        budget: 320000,
        kpis: JSON.stringify({
            participants: 120,
            workshops: 24,
            communityProjects: 8
        })
    },
    {
        id: 'p5',
        title: 'Sustainable Agriculture Training',
        organizationId: 's2',
        organizationName: 'Food for All',
        description: 'Teaching sustainable farming techniques to small-scale farmers and community gardens in underserved areas.',
        status: 'Completed',
        focusAreas: ['Food Security', 'Environment', 'Education'],
        location: 'Multiple Locations',
        lat: 32.5,
        lng: 35.0,
        startDate: '2023-03-01',
        endDate: '2024-10-31',
        collaborationNeeds: '',
        budget: 95000,
        kpis: JSON.stringify({
            farmersTrained: 78,
            gardensEstablished: 12,
            yieldIncrease: '40%'
        })
    }
];

// Mock Events Data
export const MOCK_EVENTS = [
    {
        id: 'e1',
        title: 'ICAR Ecosystem Summit 2025',
        date: '2025-02-15',
        time: '09:00 - 17:00',
        location: 'Tel Aviv Convention Center',
        type: 'Conference',
        description: 'Annual gathering of resilience organizations, funders, and stakeholders to share insights and build partnerships.',
        registrationUrl: '#',
        isVirtual: false
    },
    {
        id: 'e2',
        title: 'Grant Writing Workshop',
        date: '2025-01-20',
        time: '14:00 - 16:00',
        location: 'Online (Zoom)',
        type: 'Workshop',
        description: 'Learn effective grant writing strategies from experienced funders and successful NGO leaders.',
        registrationUrl: '#',
        isVirtual: true
    },
    {
        id: 'e3',
        title: 'Volunteer Orientation - South District',
        date: '2025-01-10',
        time: '10:00 - 12:00',
        location: 'Lev Echad Office, Be\'er Sheva',
        type: 'Orientation',
        description: 'Orientation session for new volunteers interested in supporting mental health initiatives in the South.',
        registrationUrl: '#',
        isVirtual: false
    },
    {
        id: 'e4',
        title: 'Funder Networking Breakfast',
        date: '2025-02-05',
        time: '08:00 - 10:00',
        location: 'Jerusalem',
        type: 'Networking',
        description: 'Exclusive breakfast for funders to meet NGO leaders and discuss collaboration opportunities.',
        registrationUrl: '#',
        isVirtual: false
    },
    {
        id: 'e5',
        title: 'Tech for Good Hackathon',
        date: '2025-03-10',
        time: '09:00 - 21:00',
        location: 'Tel Aviv Tech Hub',
        type: 'Hackathon',
        description: '12-hour hackathon to build tech solutions for resilience challenges. Open to developers, designers, and NGO partners.',
        registrationUrl: '#',
        isVirtual: false
    }
];
