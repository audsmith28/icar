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
    featured?: boolean; // Featured opportunity
    expiry_date?: string; // Optional expiry date
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
        featured: row.featured === 1 || row.featured === true,
        expiry_date: row.expiry_date || null,
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

/**
 * Create a new project
 */
export function createProject(projectData: Omit<Project, 'id' | 'organization_name'>, organizationName: string): Project {
    const db = getDb();
    const id = `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const stmt = db.prepare(`
        INSERT INTO projects (
            id, title, organization_id, organization_name, description, status,
            focus_areas, location, lat, lng, start_date, end_date,
            collaboration_needs, budget, kpis
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
        id,
        projectData.title,
        projectData.organization_id,
        organizationName,
        projectData.description,
        projectData.status || 'Planning',
        JSON.stringify(projectData.focus_areas || []),
        projectData.location,
        projectData.lat || 0,
        projectData.lng || 0,
        projectData.start_date || '',
        projectData.end_date || '',
        projectData.collaboration_needs || null,
        projectData.budget || null,
        projectData.kpis ? JSON.stringify(projectData.kpis) : null,
        projectData.featured ? 1 : 0,
        projectData.expiry_date || null
    );
    
    return getProjectById(id, 'admin')!;
}

/**
 * Update an existing project
 */
export function updateProject(id: string, projectData: Partial<Omit<Project, 'id' | 'organization_id' | 'organization_name'>>, role: UserRole = 'public'): Project | undefined {
    const db = getDb();
    
    // Get existing project to preserve organization_id
    const existing = getProjectById(id, 'admin');
    if (!existing) return undefined;
    
    const stmt = db.prepare(`
        UPDATE projects SET
            title = COALESCE(?, title),
            description = COALESCE(?, description),
            status = COALESCE(?, status),
            focus_areas = COALESCE(?, focus_areas),
            location = COALESCE(?, location),
            lat = COALESCE(?, lat),
            lng = COALESCE(?, lng),
            start_date = COALESCE(?, start_date),
            end_date = COALESCE(?, end_date),
            collaboration_needs = COALESCE(?, collaboration_needs),
            budget = COALESCE(?, budget),
            kpis = COALESCE(?, kpis),
            featured = COALESCE(?, featured),
            expiry_date = COALESCE(?, expiry_date)
        WHERE id = ?
    `);
    
    stmt.run(
        projectData.title || null,
        projectData.description || null,
        projectData.status || null,
        projectData.focus_areas ? JSON.stringify(projectData.focus_areas) : null,
        projectData.location || null,
        projectData.lat ?? null,
        projectData.lng ?? null,
        projectData.start_date || null,
        projectData.end_date || null,
        projectData.collaboration_needs || null,
        projectData.budget ?? null,
        projectData.kpis ? JSON.stringify(projectData.kpis) : null,
        projectData.featured ? 1 : 0,
        projectData.expiry_date || null,
        id
    );
    
    return getProjectById(id, role);
}

/**
 * Delete a project (admin only)
 */
export function deleteProject(id: string): boolean {
    const db = getDb();
    const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
}
