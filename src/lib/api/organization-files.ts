import { getDb } from '../db';

export interface OrganizationFile {
    id: string;
    organization_id: string;
    file_name: string;
    file_type: string;
    file_size?: number;
    file_url: string;
    file_category: 'report' | 'impact_data' | 'case_study' | 'other';
    description?: string;
    uploaded_date: string;
    uploaded_by?: string;
}

/**
 * Get all files for an organization
 */
export function getOrganizationFiles(organizationId: string): OrganizationFile[] {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM organization_files WHERE organization_id = ? ORDER BY uploaded_date DESC');
    return stmt.all(organizationId) as OrganizationFile[];
}

/**
 * Get a file by ID
 */
export function getFileById(id: string): OrganizationFile | undefined {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM organization_files WHERE id = ?');
    return stmt.get(id) as OrganizationFile | undefined;
}

/**
 * Create a file record (after upload)
 */
export function createFileRecord(fileData: Omit<OrganizationFile, 'id' | 'uploaded_date'>): OrganizationFile {
    const db = getDb();
    const id = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const uploadedDate = new Date().toISOString();
    
    const stmt = db.prepare(`
        INSERT INTO organization_files (
            id, organization_id, file_name, file_type, file_size, file_url,
            file_category, description, uploaded_date, uploaded_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
        id,
        fileData.organization_id,
        fileData.file_name,
        fileData.file_type,
        fileData.file_size || null,
        fileData.file_url,
        fileData.file_category,
        fileData.description || null,
        uploadedDate,
        fileData.uploaded_by || null
    );
    
    return getFileById(id)!;
}

/**
 * Delete a file record
 */
export function deleteFileRecord(id: string): boolean {
    const db = getDb();
    const stmt = db.prepare('DELETE FROM organization_files WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
}

