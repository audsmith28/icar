import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';

export default function PrivacyPage() {
    return (
        <div className="container py-10">
            <PageHeader
                title="Privacy Policy"
                description="How we protect and use your data"
            />
            <Card>
                <CardContent className="pt-6">
                    <p className="text-gray-600">
                        Privacy policy content will be added here.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
