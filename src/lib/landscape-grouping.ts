import { Stakeholder } from './api/stakeholders';

export type GroupingType = 'focus' | 'type' | 'location' | 'national_imperative';

export interface GroupedOrganizations {
    [category: string]: Stakeholder[];
}

/**
 * Group organizations by their focus areas
 * Organizations appear in ALL relevant categories (not just primary)
 */
export function groupByFocus(organizations: Stakeholder[]): GroupedOrganizations {
    const grouped: GroupedOrganizations = {};
    
    organizations.forEach(org => {
        if (org.focus && org.focus.length > 0) {
            org.focus.forEach(focus => {
                if (!grouped[focus]) {
                    grouped[focus] = [];
                }
                // Only add if not already in this category (avoid duplicates)
                if (!grouped[focus].some(o => o.id === org.id)) {
                    grouped[focus].push(org);
                }
            });
        } else {
            // Organizations with no focus areas go in "Other"
            if (!grouped['Other']) {
                grouped['Other'] = [];
            }
            if (!grouped['Other'].some(o => o.id === org.id)) {
                grouped['Other'].push(org);
            }
        }
    });
    
    return grouped;
}

/**
 * Group organizations by their type
 */
export function groupByType(organizations: Stakeholder[]): GroupedOrganizations {
    const grouped: GroupedOrganizations = {};
    
    organizations.forEach(org => {
        const type = org.type || 'Other';
        if (!grouped[type]) {
            grouped[type] = [];
        }
        grouped[type].push(org);
    });
    
    return grouped;
}

/**
 * Group organizations by their location
 */
export function groupByLocation(organizations: Stakeholder[]): GroupedOrganizations {
    const grouped: GroupedOrganizations = {};
    
    organizations.forEach(org => {
        const location = org.location || 'Other';
        if (!grouped[location]) {
            grouped[location] = [];
        }
        grouped[location].push(org);
    });
    
    return grouped;
}

/**
 * Group organizations by their national imperatives
 * Organizations appear in ALL relevant categories
 */
export function groupByNationalImperative(organizations: Stakeholder[]): GroupedOrganizations {
    const grouped: GroupedOrganizations = {};
    
    organizations.forEach(org => {
        if (org.national_imperatives && org.national_imperatives.length > 0) {
            org.national_imperatives.forEach(imperative => {
                if (!grouped[imperative]) {
                    grouped[imperative] = [];
                }
                // Only add if not already in this category
                if (!grouped[imperative].some(o => o.id === org.id)) {
                    grouped[imperative].push(org);
                }
            });
        } else {
            // Organizations with no imperatives go in "Other"
            if (!grouped['Other']) {
                grouped['Other'] = [];
            }
            if (!grouped['Other'].some(o => o.id === org.id)) {
                grouped['Other'].push(org);
            }
        }
    });
    
    return grouped;
}

/**
 * Main grouping function that routes to the appropriate grouping method
 */
export function groupOrganizations(
    organizations: Stakeholder[],
    groupingType: GroupingType
): GroupedOrganizations {
    switch (groupingType) {
        case 'focus':
            return groupByFocus(organizations);
        case 'type':
            return groupByType(organizations);
        case 'location':
            return groupByLocation(organizations);
        case 'national_imperative':
            return groupByNationalImperative(organizations);
        default:
            return groupByFocus(organizations);
    }
}

/**
 * Sort categories by count (descending), then alphabetically
 */
export function sortCategories(grouped: GroupedOrganizations): [string, Stakeholder[]][] {
    return Object.entries(grouped)
        .sort((a, b) => {
            // First sort by count (descending)
            if (b[1].length !== a[1].length) {
                return b[1].length - a[1].length;
            }
            // Then sort alphabetically
            return a[0].localeCompare(b[0]);
        });
}

