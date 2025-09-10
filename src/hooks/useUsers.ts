import { useState, useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';
import type { User } from '@/types';
import { usersApi } from '@/service/api';

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { showNotification } = useNotification();

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const userData = await usersApi.getAll();
            setUsers(userData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users';
            setError(errorMessage);
            showNotification('error', 'Error', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        isLoading,
        error,
        fetchUsers,
    };
}