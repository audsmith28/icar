'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ExpressInterestButtonProps {
    projectTitle: string;
    projectId: string;
    ownerName: string;
    ownerEmail?: string;
}

export function ExpressInterestButton({ 
    projectTitle, 
    projectId, 
    ownerName, 
    ownerEmail 
}: ExpressInterestButtonProps) {
    const handleExpressInterest = () => {
        const subject = encodeURIComponent(`Interest in: ${projectTitle}`);
        const body = encodeURIComponent(
            `Hello ${ownerName} team,\n\n` +
            `I am interested in learning more about your project:\n\n` +
            `Project: ${projectTitle}\n` +
            `Project ID: ${projectId}\n\n` +
            `I would like to discuss how my organization can contribute to this initiative.\n\n` +
            `Best regards`
        );
        const email = ownerEmail || 'support@icar.org.il';
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    };

    return (
        <>
            <Button 
                className="w-full bg-[#006d77] hover:bg-[#004d55] text-white"
                size="lg"
                onClick={handleExpressInterest}
            >
                <Mail className="w-4 h-4 mr-2" />
                Express Interest
            </Button>
            <p className="mt-3 text-xs text-slate-500 text-center">
                This will open your email client to contact the project team
            </p>
        </>
    );
}

