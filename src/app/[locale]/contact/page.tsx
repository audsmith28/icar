'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useToast } from '@/components/ui/Toast';

export default function ContactPage() {
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        showToast('Thank you for your message! We will get back to you soon.', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
    };

    return (
        <div className="container py-10">
            <PageHeader
                title="Contact Us"
                description="Get in touch with the ICAR team"
            />

            <div className="grid gap-8 md:grid-cols-3">
                {/* Contact Form */}
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <Input
                                        id="name"
                                        placeholder="Your name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                    <Input
                                        id="subject"
                                        placeholder="What is this regarding?"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <textarea
                                        id="message"
                                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        placeholder="How can we help?"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="font-medium text-sm">Email</p>
                                    <p className="text-sm text-gray-600">info@icar.co.il</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="font-medium text-sm">Phone</p>
                                    <p className="text-sm text-gray-600">+972-2-XXX-XXXX</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="font-medium text-sm">Address</p>
                                    <p className="text-sm text-gray-600">Tel Aviv, Israel</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="font-medium text-sm">Office Hours</p>
                                    <p className="text-sm text-gray-600">Sun-Thu: 9:00-17:00</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Links</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href="/about">
                                <Button variant="outline" className="w-full justify-start">About ICAR</Button>
                            </Link>
                            <Link href="/organizations">
                                <Button>Browse Directory</Button>
                            </Link>
                            <Link href="/projects">
                                <Button variant="outline" className="w-full justify-start">Opportunities</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
