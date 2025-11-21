'use client';

import React, { useState } from 'react';
import { Mail, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ClaimOrgButtonProps {
    orgId: string;
    orgName: string;
    userEmail?: string;
    userName?: string;
}

export function ClaimOrgButton({ orgId, orgName, userEmail, userName }: ClaimOrgButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleClaim = () => {
        // Create email with pre-filled subject and body
        const subject = encodeURIComponent(`Organization Claim Request: ${orgName}`);
        const body = encodeURIComponent(
            `Hello ICAR Team,\n\n` +
            `I would like to claim ownership of the following organization in the ICAR directory:\n\n` +
            `Organization Name: ${orgName}\n` +
            `Organization ID: ${orgId}\n\n` +
            `${userName ? `My Name: ${userName}\n` : ''}` +
            `${userEmail ? `My Email: ${userEmail}\n` : ''}` +
            `\nPlease verify my ownership and grant me access to manage this organization's profile.\n\n` +
            `Thank you,\n` +
            `${userName || 'Organization Representative'}`
        );

        const mailtoLink = `mailto:support@icar.org.il?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="rounded-xl bg-gradient-to-br from-[#f0f9fa] to-white border-2 border-[#02808b] p-6">
            <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-[#02808b] bg-opacity-10 rounded-lg">
                    <Building2 className="w-6 h-6 text-[#02808b]" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#004d57] mb-1">
                        Is this your organization?
                    </h3>
                    <p className="text-sm text-gray-600">
                        Claim ownership to manage your organization's profile, update information, and access collaboration opportunities.
                    </p>
                </div>
            </div>
            <Button
                variant="primary"
                onClick={handleClaim}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full"
            >
                <Mail className="w-4 h-4 mr-2" />
                Claim Organization via Email
            </Button>
            <p className="mt-3 text-xs text-gray-500 text-center">
                This will open your email client to contact the ICAR team
            </p>
        </div>
    );
}

