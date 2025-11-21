import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getOpportunities } from '@/lib/api/opportunities';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role || 'public';
        const opportunities = getOpportunities(userRole);
        return NextResponse.json(opportunities);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch opportunities' }, { status: 500 });
    }
}
