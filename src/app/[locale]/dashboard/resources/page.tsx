import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from '@/i18n/routing';
import { getResources } from '@/lib/api/resources';
import { ResourcesClient } from '@/components/resources/ResourcesClient';

export const dynamic = 'force-dynamic';

export default async function ResourcesPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const session = await getServerSession(authOptions);
    const { locale } = await params;

    if (!session) {
        redirect({ href: '/auth/signin', locale });
    }

    const resources = await getResources();

    return <ResourcesClient resources={resources} />;
}

