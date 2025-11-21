'use client';

import React, { useState, useRef } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { OrganizationFile } from '@/lib/api/organization-files';

interface FileUploadProps {
    organizationId: string;
    onFileUploaded?: (file: OrganizationFile) => void;
    onFileDeleted?: (fileId: string) => void;
}

const FILE_CATEGORIES = [
    { value: 'report', label: 'Report' },
    { value: 'impact_data', label: 'Impact Data' },
    { value: 'case_study', label: 'Case Study' },
    { value: 'other', label: 'Other' },
];

export function FileUpload({ organizationId, onFileUploaded, onFileDeleted }: FileUploadProps) {
    const [files, setFiles] = useState<OrganizationFile[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/organizations/${organizationId}/files`);
                if (response.ok) {
                    const data = await response.json();
                    setFiles(data);
                }
            } catch (err) {
                setError('Failed to load files');
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, [organizationId]);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // In production, upload to storage service first
        // For now, we'll create a data URL (not recommended for production)
        const reader = new FileReader();
        reader.onload = async () => {
            const fileUrl = reader.result as string;
            
            setUploading(true);
            setError(null);

            try {
                const response = await fetch(`/api/organizations/${organizationId}/files`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        file_name: selectedFile.name,
                        file_type: selectedFile.type,
                        file_size: selectedFile.size,
                        file_url: fileUrl, // In production, this would be a storage URL
                        file_category: 'other',
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to upload file');
                }

                const newFile = await response.json();
                setFiles([...files, newFile]);
                onFileUploaded?.(newFile);
            } catch (err: any) {
                setError(err.message || 'Failed to upload file');
            } finally {
                setUploading(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleDelete = async (fileId: string) => {
        if (!confirm('Are you sure you want to delete this file?')) return;

        try {
            const response = await fetch(`/api/organizations/${organizationId}/files/${fileId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete file');
            }

            setFiles(files.filter(f => f.id !== fileId));
            onFileDeleted?.(fileId);
        } catch (err: any) {
            setError(err.message || 'Failed to delete file');
        }
    };

    const formatFileSize = (bytes?: number) => {
        if (!bytes) return 'Unknown size';
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Uploaded Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                        <AlertCircle className="w-4 h-4" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="block">
                        <div className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 cursor-pointer text-center disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <Upload className="w-4 h-4" />
                            {uploading ? 'Uploading...' : 'Upload File'}
                        </div>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                        Upload reports, impact data, or case studies (Max 10MB)
                    </p>
                </div>

                {loading ? (
                    <p className="text-sm text-gray-500">Loading files...</p>
                ) : files.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                        No files uploaded yet
                    </p>
                ) : (
                    <div className="space-y-2">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <File className="w-5 h-5 text-gray-400 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {file.file_name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {file.file_category.replace('_', ' ')} • {formatFileSize(file.file_size)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={file.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[#02808b] hover:underline"
                                    >
                                        View
                                    </a>
                                    <button
                                        onClick={() => handleDelete(file.id)}
                                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

