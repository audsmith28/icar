import { SearchResultsClient } from '@/components/search/SearchResultsClient';

export const dynamic = 'force-dynamic';

interface SearchPageProps {
    searchParams: Promise<{ q?: string; type?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = params.q || '';
    const type = params.type || 'all';

    return (
        <SearchResultsClient 
            initialQuery={query}
            initialType={type}
        />
    );
}

