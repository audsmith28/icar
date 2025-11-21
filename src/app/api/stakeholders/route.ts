import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const stmt = db.prepare('SELECT * FROM stakeholders');
        const stakeholders = stmt.all();
        return NextResponse.json(stakeholders);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch stakeholders' }, { status: 500 });
    }
}
