'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Link } from '@/i18n/routing';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Building2, Briefcase, MapPin, Search } from 'lucide-react';
import { Stakeholder } from '@/lib/api/stakeholders';
import { Project } from '@/lib/api/projects';
import { OrgLogo } from '@/components/organizations/OrgLogo';

interface SearchResultsClientProps {
    initialQuery?: string;
    initialType?: string;
}

export function SearchResultsClient({ 
    initialQuery = '',
    initialType = 'all'
}: SearchResultsClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const userRole = (session?.user as any)?.role || 'public';

    const queryFromUrl = searchParams?.get('q') || initialQuery;
    const typeFromUrl = searchParams?.get('type') || initialType;

    const [searchType, setSearchType] = useState(typeFromUrl);
    const [searchQuery, setSearchQuery] = useState(queryFromUrl);
    const [results, setResults] = useState<{
        organizations: Stakeholder[];
        projects: Project[];
        query: string;
    }>({ organizations: [], projects: [], query: '' });
    const [loading, setLoading] = useState(false);

    // Fetch search results
    useEffect(() => {
        const fetchResults = async () => {
            if (!queryFromUrl || queryFromUrl.trim().length === 0) {
                setResults({ organizations: [], projects: [], query: '' });
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(queryFromUrl)}&type=${typeFromUrl}`);
                if (response.ok) {
                    const data = await response.json();
                    setResults(data);
                } else {
                    setResults({ organizations: [], projects: [], query: queryFromUrl });
                }
            } catch (error) {
                console.error('Search error:', error);
                setResults({ organizations: [], projects: [], query: queryFromUrl });
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [queryFromUrl, typeFromUrl]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery.trim()) {
            params.set('q', searchQuery.trim());
        }
        if (searchType !== 'all') {
            params.set('type', searchType);
        }
        router.push(`/search?${params.toString()}`);
    };

    const handleTypeChange = (newType: string) => {
        setSearchType(newType);
        const params = new URLSearchParams();
        if (queryFromUrl.trim()) {
            params.set('q', queryFromUrl.trim());
        }
        if (newType !== 'all') {
            params.set('type', newType);
        }
        router.push(`/search?${params.toString()}`);
    };

    const canViewCollaboration = userRole !== 'public';
    const totalResults = results.organizations.length + results.projects.length;
    const query = queryFromUrl;

    return (
        <div className="container py-10">
            {/* Search Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#02808b] bg-opacity-10 rounded-lg">
                        <Search className="w-6 h-6 text-[#02808b]" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#004d57]">
                        Search Results
                    </h1>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-6">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search organizations and projects..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02808b]"
                            />
                        </div>
                        <Button type="submit" variant="primary">
                            Search
                        </Button>
                    </div>
                </form>

                {/* Results Count and Type Filter */}
                <div className="flex items-center justify-between mb-6">
                    {loading ? (
                        <p className="text-sm text-gray-600">Searching...</p>
                    ) : (
                        <p className="text-sm text-gray-600">
                            {query && totalResults > 0 ? (
                                <>
                                    Found <strong>{totalResults}</strong> result{totalResults !== 1 ? 's' : ''} for "{query}"
                                </>
                            ) : query ? (
                                <>No results found for "{query}"</>
                            ) : (
                                <>Enter a search term to find organizations and projects</>
                            )}
                        </p>
                    )}
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleTypeChange('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                searchType === 'all'
                                    ? 'bg-[#02808b] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => handleTypeChange('orgs')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                searchType === 'orgs'
                                    ? 'bg-[#02808b] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Organizations ({results.organizations.length})
                        </button>
                        <button
                            onClick={() => handleTypeChange('projects')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                searchType === 'projects'
                                    ? 'bg-[#02808b] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Projects ({results.projects.length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Results */}
            {loading ? (
                <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <Search className="w-8 h-8 text-gray-400 animate-pulse" />
                    </div>
                    <p className="text-gray-600">Searching...</p>
                </div>
            ) : totalResults === 0 && query ? (
                <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No results found
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Try different keywords or browse by category.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/organizations">
                            <Button variant="outline">Browse Organizations</Button>
                        </Link>
                        <Link href="/projects">
                            <Button variant="outline">Browse Projects</Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Organizations Section */}
                    {(searchType === 'all' || searchType === 'orgs') && results.organizations.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Building2 className="w-5 h-5 text-[#02808b]" />
                                <h2 className="text-xl font-semibold text-[#004d57]">
                                    Organizations ({results.organizations.length})
                                </h2>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {results.organizations.map((org) => (
                                    <Link key={org.id} href={`/organizations/${org.id}`}>
                                        <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                                            <div className="p-6">
                                                <div className="flex items-start gap-4 mb-3">
                                                    <OrgLogo orgId={org.id} orgName={org.name} size="md" />
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-semibold text-[#004d57] mb-1 line-clamp-2">
                                                            {org.name}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <Building2 className="w-3.5 h-3.5" />
                                                            <span>{org.type}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                    {org.description}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5 mb-3">
                                                    {org.focus.slice(0, 3).map((area, idx) => (
                                                        <Badge key={idx} variant="outline" className="text-xs">
                                                            {area}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span>{org.location}</span>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects Section */}
                    {(searchType === 'all' || searchType === 'projects') && results.projects.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Briefcase className="w-5 h-5 text-[#d95222]" />
                                <h2 className="text-xl font-semibold text-[#004d57]">
                                    Projects ({results.projects.length})
                                </h2>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {results.projects.map((project) => (
                                    <Link key={project.id} href={`/projects/${project.id}`}>
                                        <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                                            <div className="p-6">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-[#004d57] mb-1 line-clamp-2">
                                                            {project.title}
                                                        </h3>
                                                        <Link
                                                            href={`/organizations/${project.organization_id}`}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-sm text-[#02808b] hover:underline"
                                                        >
                                                            {project.organization_name}
                                                        </Link>
                                                    </div>
                                                    <Badge variant={project.status === 'Active' ? 'success' : 'default'}>
                                                        {project.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5 mb-3">
                                                    {project.focus_areas?.slice(0, 3).map((area, idx) => (
                                                        <Badge key={idx} variant="outline" className="text-xs">
                                                            {area}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span>{project.location}</span>
                                                </div>
                                                {canViewCollaboration && project.collaboration_needs && (
                                                    <div className="mt-3 pt-3 border-t">
                                                        <p className="text-xs text-gray-600 line-clamp-1">
                                                            <span className="font-medium">Needs:</span> {project.collaboration_needs}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

