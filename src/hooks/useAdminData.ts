'use client';

import { useState, useCallback, useMemo } from 'react';
import { MOCK_USERS } from '@/data/mock-data';
import { getResources } from '@/lib/api/resources';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS as User[]);

  const createUser = useCallback((userData: Partial<User>) => {
    const newUser: User = {
      id: `u${Date.now()}`,
      name: userData.name || 'New User',
      email: userData.email || `user${Date.now()}@example.com`,
      role: userData.role || 'user',
      avatar: userData.avatar || 'https://placehold.co/150',
      ...userData,
    };
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  }, []);

  const updateUser = useCallback((id: string, updates: Partial<User>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
  }, []);

  const deleteUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const searchUsers = useCallback((query: string) => {
    if (!query.trim()) return users;
    const lowerQuery = query.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(lowerQuery) ||
        u.email.toLowerCase().includes(lowerQuery)
    );
  }, [users]);

  return { users, createUser, updateUser, deleteUser, searchUsers };
}

export function useResources() {
  const [resources, setResources] = useState(() => getResources());

  const createResource = useCallback((resourceData: any) => {
    const newResource = {
      id: `r${Date.now()}`,
      title: resourceData.title || 'New Resource',
      type: resourceData.type || 'Document',
      author: resourceData.author || 'ICAR Team',
      url: resourceData.url || '#',
      description: resourceData.description || '',
      ...resourceData,
    };
    setResources((prev) => [...prev, newResource]);
    return newResource;
  }, []);

  const updateResource = useCallback((id: string, updates: any) => {
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  }, []);

  const deleteResource = useCallback((id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const searchResources = useCallback((query: string) => {
    if (!query.trim()) return resources;
    const lowerQuery = query.toLowerCase();
    return resources.filter(
      (r) =>
        r.title.toLowerCase().includes(lowerQuery) ||
        r.author.toLowerCase().includes(lowerQuery)
    );
  }, [resources]);

  return { resources, createResource, updateResource, deleteResource, searchResources };
}
