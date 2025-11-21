import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getOrganizationFiles, createFileRecord, deleteFileRecord } from '@/lib/api/organization-files';
import { getStakeholderById } from '@/lib/api/stakeholders';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const files = getOrganizationFiles(id);
        return NextResponse.json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
    }
}

export async function POST(
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

        // Get organization to check ownership
        const org = getStakeholderById(id, 'admin');
        if (!org) {
            return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
        }

        // Only admin or organization owner can upload files
        if (userRole !== 'admin' && org.id !== organizationId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        
        // In a real implementation, you would:
        // 1. Upload file to storage (S3, Cloudinary, etc.)
        // 2. Get the file URL
        // 3. Create the file record
        
        // For now, we'll accept a file_url in the request body
        const fileRecord = createFileRecord({
            organization_id: id,
            file_name: body.file_name,
            file_type: body.file_type,
            file_size: body.file_size,
            file_url: body.file_url, // In production, this comes from storage service
            file_category: body.file_category || 'other',
            description: body.description,
            uploaded_by: (session?.user as any)?.email || (session?.user as any)?.name,
        });
        
        return NextResponse.json(fileRecord, { status: 201 });
    } catch (error) {
        console.error('Error creating file record:', error);
        return NextResponse.json({ error: 'Failed to create file record' }, { status: 500 });
    }
}

