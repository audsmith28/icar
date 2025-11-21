'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Users, HandHeart, Search, Map, ArrowRight, Plus } from 'lucide-react';
import { WavyLines } from '@/components/ui/WavyLines';
import { ColorBlock } from '@/components/ui/ColorBlock';
import styles from './HowCanWeHelp.module.css';

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
                className="hidden lg:block absolute left-0 top-0 bottom-0 w-32 bg-orange"
            />
            
            {/* Large Vertical Color Block - Right Side */}
            <div 
                className="hidden lg:block absolute right-0 top-0 bottom-0 w-32 bg-orange"
            />
            
            {/* Wavy Lines at Bottom */}
            <WavyLines 
                colors={['#02808b', '#d95222', '#ffb4a0']} 
                position="bottom"
                className="opacity-20"
            />
            
            <div className="container mx-auto max-w-7xl relative z-10 px-4 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-sea-green-darkest mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', lineHeight: '120%', fontWeight: 700 }}>
                        How can we help?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Whether you're looking for partners, need support, or want to contribute, we have a path for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Find Partners */}
                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-sea-green-darker">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-sea-green-off-white rounded-full mb-4">
                                <Users className="w-8 h-8 text-sea-green-darker" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-sea-green-darkest mb-3" style={{ lineHeight: '140%' }}>
                                Find Partners
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">
                                Browse organizations to discover potential collaborators and build strategic partnerships.
                            </p>
                            <Link href="/organizations" className="w-full">
                                <button 
                                    className={`${styles.homepageButton} ${styles.homepageButtonPrimary} w-full`}
                                >
                                    Browse Organizations
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </Card>

                    {/* Get Help */}
                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-sea-green-darker">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-sea-green-off-white rounded-full mb-4">
                                <HandHeart className="w-8 h-8 text-sea-green-darker" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-sea-green-darkest mb-3" style={{ lineHeight: '140%' }}>
                                Get Help
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">
                                Create a project to seek volunteers, funding, partners, or resources for your initiative.
                            </p>
                            {canCreateProject ? (
                                <Link href="/projects/new" className="w-full">
                                    <button 
                                        className={`${styles.homepageButton} ${styles.homepageButtonPrimary} w-full`}
                                    >
                                        <Plus className="w-4 h-4" />
                                        Create Project
                                    </button>
                                </Link>
                            ) : (
                                <Link href="/auth/signin" className="w-full">
                                    <button 
                                        className={`${styles.homepageButton} ${styles.homepageButtonPrimary} w-full`}
                                    >
                                        Sign In to Create
                                    </button>
                                </Link>
                            )}
                        </div>
                    </Card>

                    {/* Offer Help */}
                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-sea-green-darker">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-sea-green-off-white rounded-full mb-4">
                                <Search className="w-8 h-8 text-sea-green-darker" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-sea-green-darkest mb-3" style={{ lineHeight: '140%' }}>
                                Offer Help
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">
                                Browse projects seeking collaboration and find opportunities to contribute your expertise.
                            </p>
                            <Link href="/projects?tab=seeking-collaboration" className="w-full">
                                <button 
                                    className={`${styles.homepageButton} ${styles.homepageButtonPrimary} w-full`}
                                >
                                    Browse Projects
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </Card>

                    {/* Explore Ecosystem */}
                    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-sea-green-darker">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-sea-green-off-white rounded-full mb-4">
                                <Map className="w-8 h-8 text-sea-green-darker" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-sea-green-darkest mb-3" style={{ lineHeight: '140%' }}>
                                Explore Ecosystem
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">
                                Visualize the resilience ecosystem on an interactive map to understand coverage and gaps.
                            </p>
                            <Link href="/ecosystem" className="w-full">
                                <button 
                                    className={`${styles.homepageButton} ${styles.homepageButtonPrimary} w-full`}
                                >
                                    View Ecosystem
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Additional Help Text */}
                <div className="mt-12 text-center">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-sea-green-off-white rounded-lg border border-sea-green-darker border-opacity-20">
                        <div className="text-left">
                            <p className="text-base font-semibold text-sea-green-darkest mb-1">
                                New to ICAR?
                            </p>
                            <p className="text-sm text-gray-600">
                                Sign in to access collaboration features, or request access to join the platform.
                            </p>
                        </div>
                        <div className="flex gap-3 shrink-0">
                            <Link href="/auth/signin">
                                <Button variant="primary" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/contact?subject=Request%20Access&message=I%20would%20like%20to%20request%20access%20to%20the%20ICAR%20platform.%20Please%20let%20me%20know%20what%20information%20you%20need%20for%20verification.">
                                <Button variant="outline" size="sm">
                                    Request Access
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

