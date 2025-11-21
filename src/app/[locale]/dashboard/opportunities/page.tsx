import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function DashboardOpportunitiesRedirect() {
    // Redirect to projects with seeking-collaboration tab (default anyway, but explicit)
    redirect('/dashboard/projects?tab=seeking-collaboration');
}
