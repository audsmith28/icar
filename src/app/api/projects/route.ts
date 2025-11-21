import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getProjects, createProject } from '@/lib/api/projects';
import { getStakeholderById } from '@/lib/api/stakeholders';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role || 'public';
        const projects = getProjects(userRole);
        return NextResponse.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userRole = (session?.user as any)?.role;
        const organizationId = (session?.user as any)?.organizationId;

        // Only org, funder, and admin can create projects
        if (userRole !== 'org' && userRole !== 'funder' && userRole !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // If not admin, must have organizationId
        if (userRole !== 'admin' && !organizationId) {
            return NextResponse.json({ error: 'Organization ID required' }, { status: 400 });
        }

        const body = await request.json();
        
        // Get organization name
        const org = organizationId ? await getStakeholderById(organizationId, userRole) : null;
        const orgName = org?.name || body.organization_name || 'Unknown Organization';

        const projectData = {
            title: body.title,
            organization_id: organizationId || body.organization_id,
            description: body.description,
            status: body.status || 'Planning',
            focus_areas: body.focus_areas || [],
            location: body.location,
            lat: body.lat || 0,
            lng: body.lng || 0,
            start_date: body.start_date || '',
            end_date: body.end_date || '',
            collaboration_needs: body.collaboration_needs || null,
            budget: body.budget || null,
            kpis: body.kpis || null,
        };

        const project = createProject(projectData, orgName);
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

