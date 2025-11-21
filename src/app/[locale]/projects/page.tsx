import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getProjects } from '@/lib/api/projects';
import { getOpportunities } from '@/lib/api/opportunities';
import { ProjectsClient } from '@/components/projects/ProjectsClient';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role || 'public';

    const allProjects = getProjects(userRole);
    const opportunities = getOpportunities(userRole);

    return (
        <ProjectsClient 
            userRole={userRole} 
            allProjects={allProjects}
            opportunities={opportunities}
        />
    );
}

