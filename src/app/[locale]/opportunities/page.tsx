import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function OpportunitiesRedirect() {
    // Redirect to projects with seeking-collaboration tab (default anyway, but explicit)
    redirect('/projects?tab=seeking-collaboration');
}
