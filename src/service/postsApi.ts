import { api } from "./api";
import type { Post, User } from "@/types";

export const postsApi = {
    getAll: async (page = 1, limit = 10, search = "") => {
        const res = await api.get<Post[]>("/posts");
        let posts = res.data;

        // get users
        const usersRes = await api.get<User[]>("/users");
        const users = usersRes.data;

        // attach user info
        posts = posts.map((post) => ({
            ...post,
            user: users.find((u) => u.id === post.userId),
        }));

        // filter
        if (search) {
            posts = posts.filter(
                (post) =>
                    post.title.toLowerCase().includes(search.toLowerCase()) ||
                    post.body.toLowerCase().includes(search.toLowerCase())
            );
        }

        // pagination
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
        const res = await api.get<Post>(`/posts/${id}`);
        const userRes = await api.get<User>(`/users/${res.data.userId}`);
        return { ...res.data, user: userRes.data };
    },

    create: async (data: Omit<Post, "id" | "user">) => {
        const res = await api.post<Post>("/posts", data);
        return res.data;
    },

    update: async (id: number, data: Partial<Post>) => {
        const res = await api.put<Post>(`/posts/${id}`, data);
        return res.data;
    },

    delete: async (id: number) => {
        await api.delete(`/posts/${id}`);
        return id;
    },
};