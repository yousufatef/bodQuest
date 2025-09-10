import { authApi } from "@/service/authApi";
import type { AuthUser } from "@/types";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    useMemo,
    type ReactNode,
} from "react";

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Restore session
        const token = localStorage.getItem("auth_token");
        const userData = localStorage.getItem("auth_user");

        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
                // (Optional) validate token with backend
                // authApi.validate(token).catch(() => logout());
            } catch {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        try {
            const userData = await authApi.login(username, password);
            if (!userData?.token) {
                throw new Error("Invalid login response");
            }
            setUser(userData);
            localStorage.setItem("auth_token", userData.token);
            localStorage.setItem("auth_user", JSON.stringify(userData));
        } catch (err) {
            console.error("Login failed:", err);
            throw err; // let UI handle error
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
    };

    const value = useMemo(
        () => ({
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            logout,
        }),
        [user, isLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
