'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Plus, X, Edit2, Save, Trash2 } from 'lucide-react';
import { NATIONAL_IMPERATIVES } from '@/lib/national-imperatives';

type TaxonomyType = 'focus_areas' | 'organization_types' | 'project_statuses' | 'file_categories';

interface TaxonomyItem {
    id: string;
    value: string;
    label: string;
}

export default function TaxonomyPage() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [focusAreas, setFocusAreas] = useState<string[]>([]);
    const [orgTypes, setOrgTypes] = useState<string[]>([]);
    const [projectStatuses, setProjectStatuses] = useState<string[]>([]);
    const [fileCategories, setFileCategories] = useState<string[]>([]);
    const [editingItem, setEditingItem] = useState<{ type: TaxonomyType; index: number; value: string } | null>(null);
    const [newItem, setNewItem] = useState<{ type: TaxonomyType; value: string } | null>(null);

    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

    useEffect(() => {
        // Load taxonomy from API
        const fetchTaxonomy = async () => {
            try {
                const response = await fetch('/api/taxonomy');
                if (!response.ok) {
                    throw new Error('Failed to fetch taxonomy');
                }
                const data = await response.json();
                setFocusAreas(data.focus_areas || []);
                setOrgTypes(data.organization_types || []);
                setProjectStatuses(data.project_statuses || []);
                setFileCategories(data.file_categories || []);
            } catch (err) {
                console.error('Error loading taxonomy:', err);
                // Fallback to defaults
                setFocusAreas([
                    'Mental Health',
                    'Emergency Response',
                    'Family Support',
                    'Trauma Recovery',
                    'Community Resilience',
                    'Youth Programs',
                    'Elderly Care',
                    'Disability Support',
                    'Education',
                    'Research',
                ]);
                setOrgTypes(['NGO', 'Government', 'Private Sector', 'Academic', 'Community Group', 'Funder', 'Startup']);
                setProjectStatuses(['Planning', 'Active', 'Completed', 'On Hold']);
                setFileCategories(['report', 'impact_data', 'case_study', 'other']);
            } finally {
                setLoading(false);
            }
        };

        fetchTaxonomy();
    }, []);

    const saveTaxonomy = async (type: TaxonomyType, values: string[]) => {
        setSaveStatus('saving');
        try {
            const response = await fetch('/api/taxonomy', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, values }),
            });

            if (!response.ok) {
                throw new Error('Failed to save taxonomy');
            }

            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (err) {
            console.error('Error saving taxonomy:', err);
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 3000);
        }
    };

    const handleAddItem = (type: TaxonomyType) => {
        if (newItem?.value.trim()) {
            const value = newItem.value.trim();
            switch (type) {
                case 'focus_areas':
                    if (!focusAreas.includes(value)) {
                        const updated = [...focusAreas, value];
                        setFocusAreas(updated);
                        saveTaxonomy(type, updated);
                    }
                    break;
                case 'organization_types':
                    if (!orgTypes.includes(value)) {
                        const updated = [...orgTypes, value];
                        setOrgTypes(updated);
                        saveTaxonomy(type, updated);
                    }
                    break;
                case 'project_statuses':
                    if (!projectStatuses.includes(value)) {
                        const updated = [...projectStatuses, value];
                        setProjectStatuses(updated);
                        saveTaxonomy(type, updated);
                    }
                    break;
                case 'file_categories':
                    if (!fileCategories.includes(value)) {
                        const updated = [...fileCategories, value];
                        setFileCategories(updated);
                        saveTaxonomy(type, updated);
                    }
                    break;
            }
            setNewItem(null);
        }
    };

    const handleDeleteItem = (type: TaxonomyType, index: number) => {
        switch (type) {
            case 'focus_areas':
                const updatedFocus = focusAreas.filter((_, i) => i !== index);
                setFocusAreas(updatedFocus);
                saveTaxonomy(type, updatedFocus);
                break;
            case 'organization_types':
                const updatedTypes = orgTypes.filter((_, i) => i !== index);
                setOrgTypes(updatedTypes);
                saveTaxonomy(type, updatedTypes);
                break;
            case 'project_statuses':
                const updatedStatuses = projectStatuses.filter((_, i) => i !== index);
                setProjectStatuses(updatedStatuses);
                saveTaxonomy(type, updatedStatuses);
                break;
            case 'file_categories':
                const updatedCategories = fileCategories.filter((_, i) => i !== index);
                setFileCategories(updatedCategories);
                saveTaxonomy(type, updatedCategories);
                break;
        }
    };

    const handleEditItem = (type: TaxonomyType, index: number, newValue: string) => {
        switch (type) {
            case 'focus_areas':
                const newFocusAreas = [...focusAreas];
                newFocusAreas[index] = newValue;
                setFocusAreas(newFocusAreas);
                saveTaxonomy(type, newFocusAreas);
                break;
            case 'organization_types':
                const newOrgTypes = [...orgTypes];
                newOrgTypes[index] = newValue;
                setOrgTypes(newOrgTypes);
                saveTaxonomy(type, newOrgTypes);
                break;
            case 'project_statuses':
                const newStatuses = [...projectStatuses];
                newStatuses[index] = newValue;
                setProjectStatuses(newStatuses);
                saveTaxonomy(type, newStatuses);
                break;
            case 'file_categories':
                const newCategories = [...fileCategories];
                newCategories[index] = newValue;
                setFileCategories(newCategories);
                saveTaxonomy(type, newCategories);
                break;
        }
        setEditingItem(null);
    };

    const renderTaxonomySection = (
        title: string,
        type: TaxonomyType,
        items: string[],
        setItems: (items: string[]) => void
    ) => {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                {editingItem?.type === type && editingItem.index === index ? (
                                    <div className="flex items-center gap-2">
                                        <Input
                                            value={editingItem.value}
                                            onChange={(e) => setEditingItem({ ...editingItem, value: e.target.value })}
                                            className="w-32"
                                            autoFocus
                                        />
                                        <Button
                                            size="sm"
                                            onClick={() => handleEditItem(type, index, editingItem.value)}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            <Save className="w-3 h-3" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setEditingItem(null)}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <Badge variant="secondary">{item}</Badge>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setEditingItem({ type, index, value: item })}
                                        >
                                            <Edit2 className="w-3 h-3" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDeleteItem(type, index)}
                                            className="text-red-600 hover:text-red-700 border-red-300"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    {newItem?.type === type ? (
                        <div className="flex items-center gap-2">
                            <Input
                                value={newItem.value}
                                onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                                placeholder="Enter new item"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleAddItem(type);
                                    }
                                }}
                            />
                            <Button variant="primary" onClick={() => handleAddItem(type)}>
                                <Save className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" onClick={() => setNewItem(null)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="outline"
                            onClick={() => setNewItem({ type, value: '' })}
                            className="w-full"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add {title.slice(0, -1)}
                        </Button>
                    )}
                </CardContent>
            </Card>
        );
    };

    if (!session || (session.user as any)?.role !== 'admin') {
        return (
            <div className="container py-10">
                <p className="text-red-600">You must be an admin to access this page.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container py-10">
                <p>Loading taxonomy...</p>
            </div>
        );
    }

    return (
        <div className="container py-10">
            <PageHeader
                title="Taxonomy Management"
                description="Manage categories, tags, and classification options used throughout the platform"
            />

            {saveStatus === 'saved' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">✓ Changes saved successfully!</p>
                </div>
            )}

            {saveStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">Error: Failed to save changes. Please try again.</p>
                </div>
            )}

            {saveStatus === 'saving' && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 font-medium">Saving changes...</p>
                </div>
            )}

            <div className="space-y-6">
                {renderTaxonomySection('Focus Areas', 'focus_areas', focusAreas, setFocusAreas)}
                {renderTaxonomySection('Organization Types', 'organization_types', orgTypes, setOrgTypes)}
                {renderTaxonomySection('Project Statuses', 'project_statuses', projectStatuses, setProjectStatuses)}
                {renderTaxonomySection('File Categories', 'file_categories', fileCategories, setFileCategories)}

                {/* National Imperatives (read-only, defined in code) */}
                <Card>
                    <CardHeader>
                        <CardTitle>National Imperatives</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                            National Imperatives are defined in the codebase and cannot be modified here.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {NATIONAL_IMPERATIVES.map((imperative) => (
                                <Badge key={imperative} variant="outline" className="bg-[#c8573c] bg-opacity-10 text-[#c8573c] border-[#c8573c]">
                                    {imperative}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

