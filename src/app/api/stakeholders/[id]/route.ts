import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getStakeholderById, updateStakeholder } from '@/lib/api/stakeholders';
import { getEditType, shouldAutoApprove, createEditHistory } from '@/lib/api/moderation';

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
        const userId = (session.user as any)?.id;

        // Admin: Always direct publish (no moderation)
        if (userRole === 'admin') {
            const stakeholder = updateStakeholder(id, body, userRole);
            if (!stakeholder) {
                return NextResponse.json({ error: 'Failed to update stakeholder' }, { status: 500 });
            }
            return NextResponse.json(stakeholder);
        }

        // Org/Funder: Check if auto-approve (trusted user + minor edit)
        const editType = getEditType('stakeholder', body, existing);
        const autoApprove = userId && shouldAutoApprove(userId, editType);

        if (autoApprove) {
            // Trusted user with minor edit: Direct publish
            const stakeholder = updateStakeholder(id, body, userRole);
            if (!stakeholder) {
                return NextResponse.json({ error: 'Failed to update stakeholder' }, { status: 500 });
            }
            
            // Record the edit for history (approved immediately)
            if (userId) {
                createEditHistory(userId, 'stakeholder', id, editType, body, 'approved');
            }
            
            return NextResponse.json(stakeholder);
        } else {
            // New user or major edit: Create moderation record (don't update yet)
            if (userId) {
                createEditHistory(userId, 'stakeholder', id, editType, body, 'pending');
            }
            
            // Return pending status (changes not applied yet)
            return NextResponse.json({
                message: 'Edit submitted for moderation. Your changes will be reviewed before being published.',
                status: 'pending',
                editType,
                note: 'For new users, all edits require moderation. After 3 approved edits, minor changes will be published immediately.'
            }, { status: 202 }); // 202 Accepted
        }
    } catch (error) {
        console.error('Error updating stakeholder:', error);
        return NextResponse.json({ error: 'Failed to update stakeholder' }, { status: 500 });
    }
}

