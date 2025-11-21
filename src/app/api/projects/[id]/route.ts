import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getProjectById, updateProject, deleteProject } from '@/lib/api/projects';
import { getEditType, shouldAutoApprove, createEditHistory } from '@/lib/api/moderation';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role || 'public';
        const project = getProjectById(id, userRole);
        
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        
        return NextResponse.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
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

        // Get existing project to check ownership
        const existing = getProjectById(id, 'admin');
        if (!existing) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        // Only admin or project owner can update
        if (userRole !== 'admin' && existing.organization_id !== organizationId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const userId = (session.user as any)?.id;

        // Admin: Always direct publish (no moderation)
        if (userRole === 'admin') {
            const project = updateProject(id, body, userRole);
            if (!project) {
                return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
            }
            return NextResponse.json(project);
        }

        // Org/Funder: Check if auto-approve (trusted user + minor edit)
        const editType = getEditType('project', body, existing);
        const autoApprove = userId && shouldAutoApprove(userId, editType);

        if (autoApprove) {
            // Trusted user with minor edit: Direct publish
            const project = updateProject(id, body, userRole);
            if (!project) {
                return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
            }
            
            // Record the edit for history (approved immediately)
            if (userId) {
                createEditHistory(userId, 'project', id, editType, body, 'approved');
            }
            
            return NextResponse.json(project);
        } else {
            // New user or major edit: Create moderation record (don't update yet)
            if (userId) {
                createEditHistory(userId, 'project', id, editType, body, 'pending');
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
        console.error('Error updating project:', error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(
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

        // Get existing project to check ownership
        const existing = getProjectById(id, 'admin');
        if (!existing) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        // Only admin or project owner can delete
        if (userRole !== 'admin' && existing.organization_id !== organizationId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const success = deleteProject(id);
        if (!success) {
            return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
        }
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}

