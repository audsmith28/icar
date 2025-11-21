import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getFileById, deleteFileRecord } from '@/lib/api/organization-files';
import { getStakeholderById } from '@/lib/api/stakeholders';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; fileId: string }> }
) {
    try {
        const { id, fileId } = await params;
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userRole = (session?.user as any)?.role;
        const organizationId = (session?.user as any)?.organizationId;

        // Get file to check ownership
        const file = getFileById(fileId);
        if (!file) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        // Get organization to check ownership
        const org = getStakeholderById(id, 'admin');
        if (!org) {
            return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
        }

        // Only admin or organization owner can delete files
        if (userRole !== 'admin' && org.id !== organizationId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // In production, also delete the file from storage
        const success = deleteFileRecord(fileId);
        if (!success) {
            return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
        }
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting file:', error);
        return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
    }
}

