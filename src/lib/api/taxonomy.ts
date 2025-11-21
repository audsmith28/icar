import { getDb } from '../db';

export type TaxonomyType = 'focus_areas' | 'organization_types' | 'project_statuses' | 'file_categories';

/**
 * Get taxonomy values for a specific type
 */
export function getTaxonomy(type: TaxonomyType): string[] {
    const db = getDb();
    const stmt = db.prepare('SELECT items FROM taxonomy WHERE type = ?');
    const result = stmt.get(type) as { items: string } | undefined;
    
    if (result) {
        try {
            return JSON.parse(result.items);
        } catch (e) {
            console.error(`Error parsing taxonomy for ${type}:`, e);
            return getDefaultTaxonomy(type);
        }
    }
    
    // Return defaults if not in database
    return getDefaultTaxonomy(type);
}

/**
 * Set taxonomy values for a specific type
 */
export function setTaxonomy(type: TaxonomyType, values: string[]): boolean {
    const db = getDb();
    const valuesJson = JSON.stringify(values);
    
    try {
        const stmt = db.prepare(`
            INSERT INTO taxonomy (id, type, items)
            VALUES (?, ?, ?)
            ON CONFLICT(type) DO UPDATE SET items = excluded.items
        `);
        stmt.run(`${type}_${Date.now()}`, type, valuesJson);
        return true;
    } catch (error) {
        console.error(`Error saving taxonomy for ${type}:`, error);
        return false;
    }
}

/**
 * Get all taxonomy types
 */
export function getAllTaxonomy(): Record<TaxonomyType, string[]> {
    return {
        focus_areas: getTaxonomy('focus_areas'),
        organization_types: getTaxonomy('organization_types'),
        project_statuses: getTaxonomy('project_statuses'),
        file_categories: getTaxonomy('file_categories'),
    };
}

/**
 * Get default taxonomy values (used for seeding)
 */
function getDefaultTaxonomy(type: TaxonomyType): string[] {
    switch (type) {
        case 'focus_areas':
            return [
                'Mental Health',
                'Emergency Response',
                'Family Support',
                'Trauma Recovery',
                'Community Resilience',
                'Youth Programs',
                'Elderly Care',
                'Disability Support',
                'Education',
                'Research',
            ];
        case 'organization_types':
            return ['NGO', 'Government', 'Private Sector', 'Academic', 'Community Group', 'Funder', 'Startup'];
        case 'project_statuses':
            return ['Planning', 'Active', 'Completed', 'On Hold'];
        case 'file_categories':
            return ['report', 'impact_data', 'case_study', 'other'];
        default:
            return [];
    }
}

/**
 * Initialize taxonomy with defaults if empty
 */
export function initTaxonomyDefaults(): void {
    const db = getDb();
    
    // Check if taxonomy table has any data
    const countStmt = db.prepare('SELECT count(*) as count FROM taxonomy');
    const result = countStmt.get() as { count: number };
    
    if (result.count === 0) {
        // Seed with defaults
        const types: TaxonomyType[] = ['focus_areas', 'organization_types', 'project_statuses', 'file_categories'];
        types.forEach(type => {
            const defaults = getDefaultTaxonomy(type);
            setTaxonomy(type, defaults);
        });
    }
}

