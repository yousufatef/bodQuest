export const authApi = {
    login: async (username: string, password: string) => {
        // mock login
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (username === "admin" && password === "password") {
            return {
                id: 1,
                username: "admin",
                email: "admin@example.com",
                token: "mock-jwt-token-" + Date.now(),
            };
        }

        throw new Error("Invalid credentials");
    },
};
