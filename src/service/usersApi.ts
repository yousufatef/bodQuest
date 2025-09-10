import { api } from "./api";
import type { User } from "@/types";

export const usersApi = {
    getAll: async () => {
        const res = await api.get<User[]>("/users");
        return res.data;
    },
};
