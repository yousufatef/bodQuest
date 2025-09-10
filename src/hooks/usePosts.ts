import { useState, useEffect } from 'react';

import type { PaginationInfo, Post } from '@/types';
import { postsApi } from '@/service/api';
import { toast } from 'sonner';

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
            toast.error('Error', { description: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    const createPost = async (data: Omit<Post, 'id' | 'user'>) => {
        try {
            await postsApi.create(data);
            toast.success('Post created successfully');

            fetchPosts();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
            toast.error('Error', { description: errorMessage });
            throw err;
        }
    };

    const updatePost = async (id: number, data: Partial<Post>) => {
        try {
            await postsApi.update(id, data);
            toast.success('Post updated successfully');
            fetchPosts();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update post';
            toast.error('Error', { description: errorMessage });
            throw err;
        }
    };

    const deletePost = async (id: number) => {
        try {
            await postsApi.delete(id);
            toast.success('Post deleted successfully');
            fetchPosts();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete post';
            toast.error('Error', { description: errorMessage });
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