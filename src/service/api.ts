import type { Post, User } from '@/types';
import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const postsApi = {
    getAll: async (page = 1, limit = 10, search = '') => {
        const response = await api.get<Post[]>('/posts');
        let posts = response.data;

        // Get users for post authors
        const usersResponse = await api.get<User[]>('/users');
        const users = usersResponse.data;

        // Add user info to posts
        posts = posts.map(post => ({
            ...post,
            user: users.find(user => user.id === post.userId)
        }));

        // Filter by search
        if (search) {
            posts = posts.filter(post =>
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.body.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Calculate pagination
        const total = posts.length;
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedPosts = posts.slice(start, end);

        return {
            data: paginatedPosts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    },

    getById: async (id: number) => {
        const response = await api.get<Post>(`/posts/${id}`);
        const userResponse = await api.get<User>(`/users/${response.data.userId}`);
        return {
            ...response.data,
            user: userResponse.data,
        };
    },

    create: async (data: Omit<Post, 'id' | 'user'>) => {
        const response = await api.post<Post>('/posts', data);
        return response.data;
    },

    update: async (id: number, data: Partial<Post>) => {
        const response = await api.put<Post>(`/posts/${id}`, data);
        return response.data;
    },

    delete: async (id: number) => {
        await api.delete(`/posts/${id}`);
        return id;
    },
};

export const usersApi = {
    getAll: async () => {
        const response = await api.get<User[]>('/users');
        return response.data;
    },
};

export const authApi = {
    login: async (username: string, password: string) => {
        // Mock authentication - in real app, this would be a real API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (username === 'admin' && password === 'password') {
            const mockUser = {
                id: 1,
                username: 'admin',
                email: 'admin@example.com',
                token: 'mock-jwt-token-' + Date.now(),
            };
            return mockUser;
        }

        throw new Error('Invalid credentials');
    },
};