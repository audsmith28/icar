export type StakeholderType = 'NGO' | 'Government' | 'Funder' | 'Startup' | 'Academia' | 'Hospital';

export interface Stakeholder {
  id: string;
  name: string;
  type: StakeholderType;
  logoUrl?: string;
  description: string;
  website?: string;
  regions: string[];
  focusAreas: string[];
  populations: string[];
  serviceDelivery: string[];
  isVerified: boolean;
  startupNationUrl?: string; // Link to SNC profile
  contactEmail?: string;
  // Restricted fields (mocked)
  budgetRange?: string;
  beneficiariesCount?: number;
}

export interface Project {
  id: string;
  ownerId: string; // Links to Stakeholder
  title: string;
  description: string;
  status: 'Active' | 'Completed' | 'Planned';
  needs: ('Funding' | 'Volunteers' | 'Partners' | 'Policy Support')[];
  isFeatured: boolean;
  expiryDate?: string;
}

export interface FilterState {
  types: StakeholderType[];
  regions: string[];
  focusAreas: string[];
}
