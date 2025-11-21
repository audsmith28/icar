import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getClaimById, updateClaimStatus } from '@/lib/api/claims';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role;

        // Only admin can view claims
        if (userRole !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const claim = getClaimById(id);
        if (!claim) {
            return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
        }
        
        return NextResponse.json(claim);
    } catch (error) {
        console.error('Error fetching claim:', error);
        return NextResponse.json({ error: 'Failed to fetch claim' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role;

        // Only admin can update claims
        if (userRole !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const { status } = body;
        
        if (status !== 'approved' && status !== 'rejected') {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const reviewerName = (session?.user as any)?.name || (session?.user as any)?.email || 'Admin';
        const claim = updateClaimStatus(id, status, reviewerName);
        
        if (!claim) {
            return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
        }
        
        return NextResponse.json(claim);
    } catch (error) {
        console.error('Error updating claim:', error);
        return NextResponse.json({ error: 'Failed to update claim' }, { status: 500 });
    }
}

