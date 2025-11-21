import { getProjects, Project } from './projects';
import { UserRole } from '../auth';

// Opportunity is just a Project that meets certain criteria
export type Opportunity = Project;

/**
 * Get opportunities from projects based on the roadmap definition:
 * - Has at least one Need (collaboration_needs) OR is flagged as Featured
 * - Status is "Open" or "Active"
 * - Has not expired (no expiry_date set or expiry_date still in the future)
 */
export function getOpportunities(role: UserRole = 'public', sortBy?: 'closing_soon' | 'newest'): Project[] {
    const allProjects = getProjects(role);
    const now = new Date();

    // Filter projects that qualify as opportunities
    const opportunities = allProjects.filter(project => {
        // Must have collaboration needs OR be featured
        const hasNeeds = project.collaboration_needs && project.collaboration_needs.trim().length > 0;
        const isFeatured = project.featured === true;
        
        if (!hasNeeds && !isFeatured) {
            return false;
        }

        // Status must be "Open" or "Active"
        const status = project.status?.toLowerCase();
        if (status !== 'open' && status !== 'active') {
            return false;
        }

        // Must not be expired
        if (project.expiry_date) {
            const expiryDate = new Date(project.expiry_date);
            if (expiryDate < now) {
                return false;
            }
        }

        return true;
    });

    // Sort opportunities
    if (sortBy === 'closing_soon') {
        opportunities.sort((a, b) => {
            // Projects with expiry dates come first, sorted by date
            if (a.expiry_date && b.expiry_date) {
                return new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime();
            }
            if (a.expiry_date) return -1;
            if (b.expiry_date) return 1;
            // If no expiry dates, maintain original order
            return 0;
        });
    } else if (sortBy === 'newest') {
        opportunities.sort((a, b) => {
            const dateA = a.start_date ? new Date(a.start_date).getTime() : 0;
            const dateB = b.start_date ? new Date(b.start_date).getTime() : 0;
            return dateB - dateA; // Newest first
        });
    }

    return opportunities;
}

/**
 * Get opportunity by ID (must qualify as an opportunity)
 */
export function getOpportunityById(id: string, role: UserRole = 'public'): Project | undefined {
    const opportunities = getOpportunities(role);
    return opportunities.find(opp => opp.id === id);
}
