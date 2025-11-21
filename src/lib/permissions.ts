import { UserRole } from './auth';

/**
 * Simple role-based permission checks
 * Using straightforward if (role === 'funder') style as requested
 */

export function canViewBudget(role: UserRole): boolean {
    return role === 'funder' || role === 'admin';
}

export function canViewCollaboration(role: UserRole): boolean {
    return role === 'org' || role === 'funder' || role === 'admin';
}

export function canModerate(role: UserRole): boolean {
    return role === 'admin';
}

export function canEditOrg(role: UserRole, userId: string, orgOwnerId?: string): boolean {
    if (role === 'admin') return true;
    if (role === 'org' && orgOwnerId && userId === orgOwnerId) return true;
    return false;
}

export function canAccessAdmin(role: UserRole): boolean {
    return role === 'admin';
}

export function canExportData(role: UserRole): boolean {
    return role === 'funder' || role === 'admin';
}

export function isAuthenticated(role: UserRole): boolean {
    return role !== 'public';
}
