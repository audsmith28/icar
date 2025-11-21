import { getProjects, Project, filterProjectFields } from './projects';
import { UserRole } from '../auth';
import { getDb } from '../db';

// Opportunity is just a Project that meets certain criteria
export type Opportunity = Project;

/**
 * Get opportunities from projects based on the roadmap definition:
 * - Has at least one Need (collaboration_needs) OR is flagged as Featured
 * - Status is "Open" or "Active"
 * - Has not expired (no expiry_date set or expiry_date still in the future)
 */
export function getOpportunities(role: UserRole = 'public', sortBy?: 'closing_soon' | 'newest'): Project[] {
    const db = getDb();
    const now = new Date();
    
    // Get all projects from database (we need to check collaboration_needs even for public users)
    const stmt = db.prepare('SELECT * FROM projects');
    const allRows = stmt.all() as any[];

    // Filter projects that qualify as opportunities (check raw DB values)
    const qualifyingProjects = allRows.filter(row => {
        // Must have collaboration needs OR be featured
        const hasNeeds = row.collaboration_needs && row.collaboration_needs.trim().length > 0;
        const isFeatured = row.featured === 1 || row.featured === true;
        
        if (!hasNeeds && !isFeatured) {
            return false;
        }

        // Status must be "Open" or "Active"
        const status = row.status?.toLowerCase();
        if (status !== 'open' && status !== 'active') {
            return false;
        }

        // Must not be expired
        if (row.expiry_date) {
            const expiryDate = new Date(row.expiry_date);
            if (expiryDate < now) {
                return false;
            }
        }

        return true;
    });

    // Now apply role-based filtering to the qualifying projects
    const opportunities = qualifyingProjects.map(row => filterProjectFields(row, role));

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
