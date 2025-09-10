export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    user?: User;
}

export interface AuthUser {
    id: number;
    username: string;
    email: string;
    token: string;
}

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ApiResponse<T> {
    data: T;
    pagination?: PaginationInfo;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    description?: string;
    duration?: number;
}