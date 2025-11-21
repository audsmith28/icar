'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Users, HandHeart, Search, Map, ArrowRight, Plus, Briefcase } from 'lucide-react';
import { WavyLines } from '@/components/ui/WavyLines';
import { ColorBlock } from '@/components/ui/ColorBlock';

export function HowCanWeHelp() {
    const { data: session } = useSession();
    const userRole = (session?.user as any)?.role || 'public';
    const canCreateProject = userRole === 'org' || userRole === 'funder' || userRole === 'admin';
    return (
        <section 
            className="w-full py-16 relative overflow-hidden flex" 
            style={{ backgroundColor: '#ffffff' }}
        >
            {/* Large Vertical Color Block - Left Side */}
            <div 
                className="hidden lg:block absolute left-0 top-0 bottom-0 w-32"
                style={{ backgroundColor: '#ffb4a0' }}
            />
            
            {/* Large Vertical Color Block - Right Side */}
            <div 
                className="hidden lg:block absolute right-0 top-0 bottom-0 w-32"
                style={{ backgroundColor: '#d95222' }}
            />
            
            {/* Wavy Lines at Bottom */}
            <WavyLines 
                colors={['#02808b', '#d95222', '#ffb4a0']} 
                position="bottom"
                className="opacity-20"
            />
            
            <div className="container mx-auto max-w-7xl relative z-10 px-4 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#004d57] mb-4">
                        How can we help?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Whether you're looking for partners, need support, or want to contribute, we have a path for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Find Partners */}
                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-[#02808b]">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-[#e8f4f5] rounded-full mb-4">
                                <Users className="w-8 h-8 text-[#02808b]" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#004d57] mb-2">
                                Find Partners
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">
                                Browse organizations to discover potential collaborators and build strategic partnerships.
                            </p>
                            <Link href="/organizations" className="w-full">
                                <Button 
                                    variant="outline" 
                                    fullWidth
                                    className="inline-flex items-center justify-center"
                                >
                                    Browse Organizations
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Get Help */}
                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-[#d95222]">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-[#fff4f0] rounded-full mb-4">
                                <HandHeart className="w-8 h-8 text-[#d95222]" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#004d57] mb-2">
                                Get Help
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">
                                Create a project to seek volunteers, funding, partners, or resources for your initiative.
                            </p>
                            {canCreateProject ? (
                                <Link href="/projects/new" className="w-full">
                                    <Button 
                                        variant="primary"
                                        fullWidth
                                        className="inline-flex items-center justify-center"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Project
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/auth/signin" className="w-full">
                                    <Button 
                                        variant="primary"
                                        fullWidth
                                    >
                                        Sign In to Create
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </Card>

                    {/* Offer Help */}
                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-[#d95222]">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-[#fff4f0] rounded-full mb-4">
                                <Search className="w-8 h-8 text-[#d95222]" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#004d57] mb-2">
                                Offer Help
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">
                                Browse projects seeking collaboration and find opportunities to contribute your expertise.
                            </p>
                            <Link href="/projects?tab=seeking-collaboration" className="w-full">
                                <Button 
                                    variant="outline"
                                    fullWidth
                                    className="inline-flex items-center justify-center"
                                >
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    Browse Projects
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Explore Ecosystem */}
                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-[#02808b]">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-[#e8f4f5] rounded-full mb-4">
                                <Map className="w-8 h-8 text-[#02808b]" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#004d57] mb-2">
                                Explore Ecosystem
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">
                                Visualize the resilience ecosystem on an interactive map to understand coverage and gaps.
                            </p>
                            <Link href="/ecosystem" className="w-full">
                                <Button 
                                    variant="outline" 
                                    fullWidth
                                    className="inline-flex items-center justify-center"
                                >
                                    View Ecosystem
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Additional Help Text */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-500">
                        New to ICAR?{' '}
                        <Link href="/auth/signin" className="text-[#02808b] hover:underline font-medium">
                            Sign in
                        </Link>
                        {' '}to access collaboration features and manage your organization profile.
                    </p>
                </div>
            </div>
        </section>
    );
}

