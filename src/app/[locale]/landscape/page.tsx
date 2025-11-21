import { redirect } from '@/i18n/routing';

// Redirect /landscape to /ecosystem for backward compatibility
export default async function LandscapeRedirect({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    redirect({ href: '/ecosystem', locale });
}
