import { Stakeholder, Project } from './types';

export const MOCK_STAKEHOLDERS: Stakeholder[] = [
    {
        id: '1',
        name: 'TraumaRelief Israel',
        type: 'NGO',
        description: 'Providing immediate trauma care to civilians in the south.',
        regions: ['South', 'Negev'],
        focusAreas: ['PTSD', 'Anxiety'],
        populations: ['Civilians', 'Youth'],
        serviceDelivery: ['Direct Care'],
        isVerified: true,
        budgetRange: '1M-5M',
        beneficiariesCount: 5000,
        startupNationUrl: 'https://finder.startupnationcentral.org/company_page/example'
    },
    {
        id: '2',
        name: 'MindTech Solutions',
        type: 'Startup',
        description: 'AI-driven mental health triage platform.',
        regions: ['National'],
        focusAreas: ['Innovation', 'Triage'],
        populations: ['General Public'],
        serviceDelivery: ['Digital'],
        isVerified: true,
        startupNationUrl: 'https://finder.startupnationcentral.org/company_page/mindtech'
    },
    {
        id: '3',
        name: 'Ministry of Health - Mental Health Div',
        type: 'Government',
        description: 'National policy and regulation for mental health services.',
        regions: ['National'],
        focusAreas: ['Policy', 'Regulation'],
        populations: ['All'],
        serviceDelivery: ['Policy'],
        isVerified: true
    },
    {
        id: '4',
        name: 'Negev Resilience Fund',
        type: 'Funder',
        description: 'Philanthropic fund dedicated to southern resilience initiatives.',
        regions: ['South'],
        focusAreas: ['Community Resilience'],
        populations: ['Civilians'],
        serviceDelivery: ['Funding'],
        isVerified: true
    },
    {
        id: '5',
        name: 'Youth Space Tel Aviv',
        type: 'NGO',
        description: 'Safe space for at-risk youth in central Tel Aviv.',
        regions: ['Center', 'Tel Aviv'],
        focusAreas: ['At-risk Youth', 'Prevention'],
        populations: ['Youth'],
        serviceDelivery: ['Community Center'],
        isVerified: true
    }
];

export const MOCK_PROJECTS: Project[] = [
    {
        id: 'p1',
        ownerId: '1',
        title: 'Mobile Resilience Clinics',
        description: 'Deploying mobile units to hard-hit communities.',
        status: 'Active',
        needs: ['Funding', 'Volunteers'],
        isFeatured: true
    },
    {
        id: 'p2',
        ownerId: '2',
        title: 'AI Triage Pilot',
        description: 'Testing AI triage in 3 community centers.',
        status: 'Active',
        needs: ['Partners'],
        isFeatured: false
    }
];
