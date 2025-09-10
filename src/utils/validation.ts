import { z } from 'zod';

export const loginSchema = z.object({
    username: z
        .string()
        .min(1, 'Username is required')
        .min(3, 'Username must be at least 3 characters'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

export const postSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .min(5, 'Title must be at least 5 characters')
        .max(100, 'Title must be less than 100 characters'),
    body: z
        .string()
        .min(1, 'Body is required')
        .min(10, 'Body must be at least 10 characters')
        .max(1000, 'Body must be less than 1000 characters'),
    userId: z.number().min(1, 'User is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type PostFormData = z.infer<typeof postSchema>;