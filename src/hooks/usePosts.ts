import { useState, useEffect } from 'react';

import { useNotification } from '../context/NotificationContext';
import type { PaginationInfo, Post } from '@/types';
import { postsApi } from '@/service/api';

export function usePosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const { showNotification } = useNotification();

    const fetchPosts = async (page = 1, search = searchQuery) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await postsApi.getAll(page, pagination.limit, search);
            setPosts(response.data);
            setPagination(response.pagination);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch posts';
            setError(errorMessage);
            showNotification('error', 'Error', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const createPost = async (data: Omit<Post, 'id' | 'user'>) => {
        try {
            await postsApi.create(data);
            showNotification('success', 'Success', 'Post created successfully');
            fetchPosts();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
            showNotification('error', 'Error', errorMessage);
            throw err;
        }
    };

    const updatePost = async (id: number, data: Partial<Post>) => {
        try {
            await postsApi.update(id, data);
            showNotification('success', 'Success', 'Post updated successfully');
            fetchPosts();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update post';
            showNotification('error', 'Error', errorMessage);
            throw err;
        }
    };

    const deletePost = async (id: number) => {
        try {
            await postsApi.delete(id);
            showNotification('success', 'Success', 'Post deleted successfully');
            fetchPosts();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete post';
            showNotification('error', 'Error', errorMessage);
            throw err;
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        fetchPosts(1, query);
    };

    const handlePageChange = (page: number) => {
        fetchPosts(page);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return {
        posts,
        pagination,
        isLoading,
        error,
        searchQuery,
        fetchPosts,
        createPost,
        updatePost,
        deletePost,
        handleSearch,
        handlePageChange,
    };
}