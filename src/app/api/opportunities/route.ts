import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const stmt = db.prepare('SELECT * FROM opportunities');
        const opportunities = stmt.all();
        return NextResponse.json(opportunities);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch opportunities' }, { status: 500 });
    }
}
