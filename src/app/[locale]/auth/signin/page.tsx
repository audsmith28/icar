'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function SignInPage() {
    const [username, setUsername] = React.useState('admin');
    const [password, setPassword] = React.useState('password');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn('credentials', {
            username,
            password,
            callbackUrl: '/dashboard',
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle>Sign In to ICAR</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium">Username</label>
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full">Sign In</Button>
                    </form>
                    <div className="mt-4 text-center text-sm text-gray-500 space-y-1">
                        <p className="font-semibold">Test Credentials:</p>
                        <p>Admin: <strong>admin</strong> / <strong>password</strong></p>
                        <p>Organization: <strong>org</strong> / <strong>password</strong></p>
                        <p>Funder: <strong>funder</strong> / <strong>password</strong></p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
