import { getDb } from '../db';

export interface OrganizationClaim {
    id: string;
    organization_id: string;
    organization_name: string;
    claimant_name: string;
    claimant_email: string;
    submitted_date: string;
    status: 'pending' | 'approved' | 'rejected';
    notes?: string;
    reviewed_by?: string;
    reviewed_date?: string;
}

/**
 * Get all organization claims
 */
export function getClaims(status?: 'pending' | 'approved' | 'rejected'): OrganizationClaim[] {
    const db = getDb();
    let stmt;
    
    if (status) {
        stmt = db.prepare('SELECT * FROM organization_claims WHERE status = ? ORDER BY submitted_date DESC');
        return stmt.all(status) as OrganizationClaim[];
    } else {
        stmt = db.prepare('SELECT * FROM organization_claims ORDER BY submitted_date DESC');
        return stmt.all() as OrganizationClaim[];
    }
}

/**
 * Get a claim by ID
 */
export function getClaimById(id: string): OrganizationClaim | undefined {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM organization_claims WHERE id = ?');
    return stmt.get(id) as OrganizationClaim | undefined;
}

/**
 * Create a new organization claim
 */
export function createClaim(claimData: Omit<OrganizationClaim, 'id' | 'status' | 'submitted_date' | 'reviewed_by' | 'reviewed_date'>): OrganizationClaim {
    const db = getDb();
    const id = `claim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const submittedDate = new Date().toISOString().split('T')[0];
    
    const stmt = db.prepare(`
        INSERT INTO organization_claims (
            id, organization_id, organization_name, claimant_name, claimant_email,
            submitted_date, status, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
        id,
        claimData.organization_id,
        claimData.organization_name,
        claimData.claimant_name,
        claimData.claimant_email,
        submittedDate,
        'pending',
        claimData.notes || null
    );
    
    return getClaimById(id)!;
}

/**
 * Update claim status (approve or reject)
 */
export function updateClaimStatus(
    id: string,
    status: 'approved' | 'rejected',
    reviewedBy: string
): OrganizationClaim | undefined {
    const db = getDb();
    const reviewedDate = new Date().toISOString();
    
    const stmt = db.prepare(`
        UPDATE organization_claims SET
            status = ?,
            reviewed_by = ?,
            reviewed_date = ?
        WHERE id = ?
    `);
    
    stmt.run(status, reviewedBy, reviewedDate, id);
    
    return getClaimById(id);
}

/**
 * Check if an organization has an approved claim
 */
export function hasApprovedClaim(organizationId: string): boolean {
    const db = getDb();
    const stmt = db.prepare('SELECT COUNT(*) as count FROM organization_claims WHERE organization_id = ? AND status = ?');
    const result = stmt.get(organizationId, 'approved') as { count: number };
    return result.count > 0;
}

/**
 * Get approved claim for an organization
 */
export function getApprovedClaim(organizationId: string): OrganizationClaim | undefined {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM organization_claims WHERE organization_id = ? AND status = ? ORDER BY reviewed_date DESC LIMIT 1');
    return stmt.get(organizationId, 'approved') as OrganizationClaim | undefined;
}

