import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getClaims, createClaim } from '@/lib/api/claims';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role;

        // Only admin can view claims
        if (userRole !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const status = request.nextUrl.searchParams.get('status') as 'pending' | 'approved' | 'rejected' | null;
        const claims = getClaims(status || undefined);
        return NextResponse.json(claims);
    } catch (error) {
        console.error('Error fetching claims:', error);
        return NextResponse.json({ error: 'Failed to fetch claims' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        const claim = createClaim({
            organization_id: body.organization_id,
            organization_name: body.organization_name,
            claimant_name: body.claimant_name,
            claimant_email: body.claimant_email,
            notes: body.notes,
        });
        
        return NextResponse.json(claim, { status: 201 });
    } catch (error) {
        console.error('Error creating claim:', error);
        return NextResponse.json({ error: 'Failed to create claim' }, { status: 500 });
    }
}

