import { getDb } from '../db';
import { UserRole } from '../auth';

/**
 * ICAR TERMINOLOGY RULE:
 * "Stakeholder" and "Organization" refer to the same entity type.
 * - Database table: "stakeholders"
 * - API functions: getStakeholders(), getStakeholderById()
 * - Routes: /organizations (canonical)
 * - Public-facing label: "Stakeholder Directory" or "Organizations Directory"
 * 
 * This file provides the data layer for organizations/stakeholders.
 * All routes should use /organizations, but the underlying data comes from
 * the stakeholders table and these API functions.
 */

export interface Stakeholder {
    id: string;
    name: string;
    type: string;
    focus: string[]; // Parsed from JSON
    location: string;
    lat: number;
    lng: number;
    status: string;
    description: string;
    contact: string;
    email: string;
    // Role-specific fields
    budget?: number; // Funder/Admin only
    collaboration_needs?: string; // Org/Funder/Admin only
    national_imperatives?: string[]; // National Imperatives tags
    contact_setting?: 'open' | 'via_icar' | 'closed'; // Contact preference
}

export function getStakeholders(role: UserRole = 'public'): Stakeholder[] {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM stakeholders');
    const rows = stmt.all() as any[];

    return rows.map(row => filterStakeholderFields(row, role));
}

export function getStakeholderById(id: string, role: UserRole = 'public'): Stakeholder | undefined {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM stakeholders WHERE id = ?');
    const row = stmt.get(id) as any;

    if (!row) return undefined;

    return filterStakeholderFields(row, role);
}

function filterStakeholderFields(row: any, role: UserRole): Stakeholder {
    const base: Stakeholder = {
        id: row.id,
        name: row.name,
        type: row.type,
        focus: JSON.parse(row.focus || '[]'),
        location: row.location,
        lat: row.lat,
        lng: row.lng,
        status: row.status,
        description: row.description,
        contact: row.contact,
        email: row.email,
        national_imperatives: JSON.parse(row.national_imperatives || '[]'),
        contact_setting: (row.contact_setting || 'open') as 'open' | 'via_icar' | 'closed',
    };

    // Add collaboration_needs for org, funder, admin
    if (role === 'org' || role === 'funder' || role === 'admin') {
        base.collaboration_needs = row.collaboration_needs;
    }

    // Add budget for funder and admin
    if (role === 'funder' || role === 'admin') {
        base.budget = row.budget;
    }

    return base;
}

/**
 * Update an existing stakeholder/organization
 */
export function updateStakeholder(id: string, stakeholderData: Partial<Omit<Stakeholder, 'id'>>, role: UserRole = 'public'): Stakeholder | undefined {
    const db = getDb();
    
    // Get existing stakeholder
    const existing = getStakeholderById(id, 'admin');
    if (!existing) return undefined;
    
    const stmt = db.prepare(`
        UPDATE stakeholders SET
            name = COALESCE(?, name),
            type = COALESCE(?, type),
            focus = COALESCE(?, focus),
            location = COALESCE(?, location),
            lat = COALESCE(?, lat),
            lng = COALESCE(?, lng),
            status = COALESCE(?, status),
            description = COALESCE(?, description),
            contact = COALESCE(?, contact),
            email = COALESCE(?, email),
            collaboration_needs = COALESCE(?, collaboration_needs),
            budget = COALESCE(?, budget),
            national_imperatives = COALESCE(?, national_imperatives),
            contact_setting = COALESCE(?, contact_setting)
        WHERE id = ?
    `);
    
    stmt.run(
        stakeholderData.name || null,
        stakeholderData.type || null,
        stakeholderData.focus ? JSON.stringify(stakeholderData.focus) : null,
        stakeholderData.location || null,
        stakeholderData.lat ?? null,
        stakeholderData.lng ?? null,
        stakeholderData.status || null,
        stakeholderData.description || null,
        stakeholderData.contact || null,
        stakeholderData.email || null,
        stakeholderData.collaboration_needs || null,
        stakeholderData.budget ?? null,
        stakeholderData.national_imperatives ? JSON.stringify(stakeholderData.national_imperatives) : null,
        stakeholderData.contact_setting || null,
        id
    );
    
    return getStakeholderById(id, role);
}
