import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getStakeholderById, updateStakeholder } from '@/lib/api/stakeholders';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role || 'public';
        const stakeholder = getStakeholderById(id, userRole);
        
        if (!stakeholder) {
            return NextResponse.json({ error: 'Stakeholder not found' }, { status: 404 });
        }
        
        return NextResponse.json(stakeholder);
    } catch (error) {
        console.error('Error fetching stakeholder:', error);
        return NextResponse.json({ error: 'Failed to fetch stakeholder' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userRole = (session?.user as any)?.role;
        const organizationId = (session?.user as any)?.organizationId;

        // Get existing stakeholder to check ownership
        const existing = getStakeholderById(id, 'admin');
        if (!existing) {
            return NextResponse.json({ error: 'Stakeholder not found' }, { status: 404 });
        }

        // Only admin or organization owner can update
        if (userRole !== 'admin' && existing.id !== organizationId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const stakeholder = updateStakeholder(id, body, userRole);
        
        if (!stakeholder) {
            return NextResponse.json({ error: 'Failed to update stakeholder' }, { status: 500 });
        }
        
        return NextResponse.json(stakeholder);
    } catch (error) {
        console.error('Error updating stakeholder:', error);
        return NextResponse.json({ error: 'Failed to update stakeholder' }, { status: 500 });
    }
}

