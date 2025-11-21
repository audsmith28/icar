import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { getStakeholders } from '@/lib/api/stakeholders';
import { getProjects } from '@/lib/api/projects';
import { UserRole } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('q') || '';
        const type = searchParams.get('type') || 'all'; // 'all', 'orgs', 'projects'
        
        if (!query || query.trim().length === 0) {
            return NextResponse.json({ 
                organizations: [], 
                projects: [],
                query: ''
            });
        }

        // Get user role for filtering
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role || 'public';

        const db = getDb();
        const searchTerm = `%${query.trim()}%`;

        const results: {
            organizations: any[];
            projects: any[];
        } = {
            organizations: [],
            projects: []
        };

        // Search Organizations (if type is 'all' or 'orgs')
        if (type === 'all' || type === 'orgs') {
            // Get all stakeholders with role-based filtering
            const allStakeholders = getStakeholders(userRole);
            
            // Filter by search query
            const queryLower = query.toLowerCase();
            results.organizations = allStakeholders.filter(org => {
                // Search in name, description, location, type
                if (org.name.toLowerCase().includes(queryLower) ||
                    org.description.toLowerCase().includes(queryLower) ||
                    org.location.toLowerCase().includes(queryLower) ||
                    org.type.toLowerCase().includes(queryLower)) {
                    return true;
                }
                // Search in focus areas
                if (org.focus && org.focus.some(focus => focus.toLowerCase().includes(queryLower))) {
                    return true;
                }
                return false;
            }).slice(0, 50);
        }

        // Search Projects (if type is 'all' or 'projects')
        if (type === 'all' || type === 'projects') {
            // Get all projects with role-based filtering
            const allProjects = getProjects(userRole);
            
            // Filter by search query
            const queryLower = query.toLowerCase();
            results.projects = allProjects.filter(project => {
                // Search in title, description, location, organization name
                if (project.title.toLowerCase().includes(queryLower) ||
                    project.description.toLowerCase().includes(queryLower) ||
                    project.location.toLowerCase().includes(queryLower) ||
                    project.organization_name.toLowerCase().includes(queryLower)) {
                    return true;
                }
                // Search in focus areas
                if (project.focus_areas && project.focus_areas.some(area => area.toLowerCase().includes(queryLower))) {
                    return true;
                }
                // Search in national imperatives
                if (project.national_imperatives && project.national_imperatives.some(imp => imp.toLowerCase().includes(queryLower))) {
                    return true;
                }
                return false;
            }).slice(0, 50);
        }

        return NextResponse.json({
            organizations: results.organizations,
            projects: results.projects,
            query: query.trim()
        });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            { error: 'Failed to perform search', organizations: [], projects: [], query: '' },
            { status: 500 }
        );
    }
}

