import { getDb } from '../db';

export interface Resource {
    id: string;
    title: string;
    type: string;
    author: string;
    url: string;
    description: string;
}

export function getResources(): Resource[] {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM resources');
    return stmt.all() as Resource[];
}

export function getResourceById(id: string): Resource | undefined {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM resources WHERE id = ?');
    return stmt.get(id) as Resource | undefined;
}
