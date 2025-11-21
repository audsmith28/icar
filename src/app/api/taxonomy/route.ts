import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAllTaxonomy, getTaxonomy, setTaxonomy, TaxonomyType, initTaxonomyDefaults } from '@/lib/api/taxonomy';

// Initialize defaults on first load
initTaxonomyDefaults();

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role;

        // Only admin can view taxonomy
        if (userRole !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const type = request.nextUrl.searchParams.get('type') as TaxonomyType | null;
        
        if (type) {
            const values = getTaxonomy(type);
            return NextResponse.json({ type, values });
        } else {
            const allTaxonomy = getAllTaxonomy();
            return NextResponse.json(allTaxonomy);
        }
    } catch (error) {
        console.error('Error fetching taxonomy:', error);
        return NextResponse.json({ error: 'Failed to fetch taxonomy' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role;

        // Only admin can update taxonomy
        if (userRole !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const { type, values } = body;

        if (!type || !Array.isArray(values)) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        const success = setTaxonomy(type as TaxonomyType, values);
        
        if (!success) {
            return NextResponse.json({ error: 'Failed to update taxonomy' }, { status: 500 });
        }

        return NextResponse.json({ success: true, type, values });
    } catch (error) {
        console.error('Error updating taxonomy:', error);
        return NextResponse.json({ error: 'Failed to update taxonomy' }, { status: 500 });
    }
}

