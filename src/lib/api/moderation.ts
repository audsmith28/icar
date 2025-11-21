import { getDb } from '../db';

export interface EditHistory {
    id: string;
    user_id: string;
    entity_type: 'stakeholder' | 'project';
    entity_id: string;
    edit_date: string;
    status: 'pending' | 'approved' | 'rejected';
    edit_type: 'minor' | 'major';
    changes_summary?: string; // JSON string
    reviewed_by?: string;
    reviewed_date?: string;
}

/**
 * Check if a user is "trusted" (has 3+ approved edits)
 */
export function isTrustedUser(userId: string): boolean {
    const db = getDb();
    const stmt = db.prepare(`
        SELECT COUNT(*) as count 
        FROM edit_history 
        WHERE user_id = ? AND status = 'approved'
    `);
    const result = stmt.get(userId) as { count: number };
    return result.count >= 3;
}

/**
 * Determine if an edit is "minor" or "major"
 * Minor: contact info, description, email
 * Major: status, budget, name, type, mission-critical fields
 */
export function getEditType(
    entityType: 'stakeholder' | 'project',
    changes: Record<string, any>,
    existing: Record<string, any>
): 'minor' | 'major' {
    const majorFields: Record<string, string[]> = {
        stakeholder: ['name', 'type', 'status', 'budget'],
        project: ['title', 'status', 'budget', 'organization_id']
    };

    const changedFields = Object.keys(changes).filter(key => changes[key] !== existing[key]);
    const hasMajorChange = changedFields.some(field => majorFields[entityType].includes(field));

    return hasMajorChange ? 'major' : 'minor';
}

/**
 * Create an edit history record
 */
export function createEditHistory(
    userId: string,
    entityType: 'stakeholder' | 'project',
    entityId: string,
    editType: 'minor' | 'major',
    changesSummary: Record<string, any>,
    status: 'pending' | 'approved' = 'pending'
): EditHistory {
    const db = getDb();
    const id = `edit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const editDate = new Date().toISOString();

    const stmt = db.prepare(`
        INSERT INTO edit_history (
            id, user_id, entity_type, entity_id, edit_date, status, edit_type, changes_summary
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
        id,
        userId,
        entityType,
        entityId,
        editDate,
        status,
        editType,
        JSON.stringify(changesSummary)
    );

    return getEditHistoryById(id)!;
}

/**
 * Get edit history by ID
 */
export function getEditHistoryById(id: string): EditHistory | undefined {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM edit_history WHERE id = ?');
    return stmt.get(id) as EditHistory | undefined;
}

/**
 * Get pending edits for moderation
 */
export function getPendingEdits(entityType?: 'stakeholder' | 'project'): EditHistory[] {
    const db = getDb();
    let stmt;
    
    if (entityType) {
        stmt = db.prepare(`
            SELECT * FROM edit_history 
            WHERE status = 'pending' AND entity_type = ? 
            ORDER BY edit_date DESC
        `);
        return stmt.all(entityType) as EditHistory[];
    } else {
        stmt = db.prepare(`
            SELECT * FROM edit_history 
            WHERE status = 'pending' 
            ORDER BY edit_date DESC
        `);
        return stmt.all() as EditHistory[];
    }
}

/**
 * Approve or reject an edit
 */
export function reviewEdit(
    editId: string,
    status: 'approved' | 'rejected',
    reviewedBy: string
): EditHistory | undefined {
    const db = getDb();
    const reviewedDate = new Date().toISOString();

    const stmt = db.prepare(`
        UPDATE edit_history SET
            status = ?,
            reviewed_by = ?,
            reviewed_date = ?
        WHERE id = ?
    `);

    stmt.run(status, reviewedBy, reviewedDate, editId);

    return getEditHistoryById(editId);
}

/**
 * Check if an edit should be auto-approved (trusted user + minor edit)
 */
export function shouldAutoApprove(userId: string, editType: 'minor' | 'major'): boolean {
    // Admin edits are always auto-approved (handled at API level)
    // Trusted users with minor edits can be auto-approved
    return isTrustedUser(userId) && editType === 'minor';
}

