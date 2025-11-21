import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';

export default function TermsPage() {
    return (
        <div className="container py-10">
            <PageHeader
                title="Terms of Use"
                description="Terms and conditions for using the ICAR platform"
            />
            <Card>
                <CardContent className="pt-6">
                    <p className="text-gray-600">
                        Terms of use content will be added here.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
