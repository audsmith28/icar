'use client';

import React, { useState } from 'react';
import { Mail, Lock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface ContactOrganizationButtonProps {
    organizationId: string;
    organizationName: string;
    contactSetting: 'open' | 'via_icar' | 'closed';
    email?: string;
    userEmail?: string;
    userName?: string;
}

export function ContactOrganizationButton({
    organizationId,
    organizationName,
    contactSetting,
    email,
    userEmail,
    userName,
}: ContactOrganizationButtonProps) {
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleContact = () => {
        if (contactSetting === 'open' && email) {
            // Direct email
            const subject = encodeURIComponent(`Contact Request: ${organizationName}`);
            const body = encodeURIComponent(
                `Hello ${organizationName},\n\n` +
                `I would like to get in touch regarding collaboration opportunities.\n\n` +
                `${userName ? `My name: ${userName}\n` : ''}` +
                `${userEmail ? `My email: ${userEmail}\n` : ''}` +
                `\nBest regards`
            );
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        } else if (contactSetting === 'via_icar') {
            // Show form to submit via ICAR
            setShowForm(true);
        }
        // If 'closed', nothing happens
    };

    const handleSubmitViaICAR = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // In production, this would call an API endpoint
        // For now, we'll use email as fallback
        const subject = encodeURIComponent(`ICAR Contact Request: ${organizationName}`);
        const body = encodeURIComponent(
            `Dear ICAR Team,\n\n` +
            `I would like to contact ${organizationName} (ID: ${organizationId}).\n\n` +
            `${userName ? `My name: ${userName}\n` : ''}` +
            `${userEmail ? `My email: ${userEmail}\n` : ''}` +
            `\nMessage:\n${message}\n\n` +
            `Please forward this request to the organization.\n\n` +
            `Thank you.`
        );
        window.location.href = `mailto:contact@icar.org.il?subject=${subject}&body=${body}`;
        setIsSubmitting(false);
        setShowForm(false);
    };

    if (contactSetting === 'closed') {
        return (
            <Card className="border-slate-200">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3 text-slate-500">
                        <Lock className="w-5 h-5" />
                        <p className="text-sm">This organization is not accepting contact requests at this time.</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (contactSetting === 'via_icar' && !showForm) {
        return (
            <Card className="border-[#02808b]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-[#02808b]" />
                        Contact via ICAR
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                        This organization prefers to be contacted through ICAR. We'll forward your message to them.
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => setShowForm(true)}
                        className="w-full"
                    >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Request Contact
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (contactSetting === 'via_icar' && showForm) {
        return (
            <Card className="border-[#02808b]">
                <CardHeader>
                    <CardTitle>Contact Request via ICAR</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmitViaICAR} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Message
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02808b]"
                                placeholder="Tell us why you'd like to contact this organization..."
                            />
                        </div>
                        <div className="flex gap-3">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={isSubmitting}
                                className="flex-1"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Request'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setShowForm(false);
                                    setMessage('');
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        );
    }

    // contactSetting === 'open'
    return (
        <Card className="border-[#02808b]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#02808b]" />
                    Contact Organization
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                    This organization accepts direct contact. Click below to send them an email.
                </p>
                <Button
                    variant="primary"
                    onClick={handleContact}
                    className="w-full"
                >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact via Email
                </Button>
            </CardContent>
        </Card>
    );
}

