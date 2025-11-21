import { getDb } from '../db';

export interface Opportunity {
    id: string;
    title: string;
    organization_id: string;
    organization_name: string;
    type: string;
    location: string;
    lat: number;
    lng: number;
    date: string;
    status: string;
    description: string;
}

export function getOpportunities(): Opportunity[] {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM opportunities');
    return stmt.all() as Opportunity[];
}

export function getOpportunityById(id: string): Opportunity | undefined {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM opportunities WHERE id = ?');
    return stmt.get(id) as Opportunity | undefined;
}
