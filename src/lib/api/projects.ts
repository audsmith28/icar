import { getDb } from '../db';
import { UserRole } from '../auth';

export interface Project {
    id: string;
    title: string;
    organization_id: string;
    organization_name: string;
    description: string;
    status: string;
    focus_areas: string[]; // Parsed from JSON
    location: string;
    lat: number;
    lng: number;
    start_date: string;
    end_date: string;
    // Role-specific fields
    collaboration_needs?: string; // Org/Funder/Admin only
    budget?: number; // Funder/Admin only
    kpis?: any; // Parsed from JSON, Funder/Admin only
}

/**
 * Get all projects with role-based field filtering
 */
export function getProjects(role: UserRole = 'public'): Project[] {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM projects');
    const rows = stmt.all() as any[];

    return rows.map(row => filterProjectFields(row, role));
}

/**
 * Get a single project by ID with role-based field filtering
 */
export function getProjectById(id: string, role: UserRole = 'public'): Project | undefined {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM projects WHERE id = ?');
    const row = stmt.get(id) as any;

    if (!row) return undefined;

    return filterProjectFields(row, role);
}

/**
 * Filter project fields based on user role
 * Public: Basic fields only
 * Org: + collaboration_needs
 * Funder: + collaboration_needs + budget + kpis
 * Admin: All fields
 */
function filterProjectFields(row: any, role: UserRole): Project {
    const base: Project = {
        id: row.id,
        title: row.title,
        organization_id: row.organization_id,
        organization_name: row.organization_name,
        description: row.description,
        status: row.status,
        focus_areas: JSON.parse(row.focus_areas || '[]'),
        location: row.location,
        lat: row.lat,
        lng: row.lng,
        start_date: row.start_date,
        end_date: row.end_date,
    };

    // Add collaboration_needs for org, funder, admin
    if (role === 'org' || role === 'funder' || role === 'admin') {
        base.collaboration_needs = row.collaboration_needs;
    }

    // Add budget and kpis for funder and admin
    if (role === 'funder' || role === 'admin') {
        base.budget = row.budget;
        base.kpis = row.kpis ? JSON.parse(row.kpis) : null;
    }

    return base;
}
