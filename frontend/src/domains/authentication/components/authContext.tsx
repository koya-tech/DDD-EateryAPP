/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
    createContext,
    ReactNode,
    useCallback,
    useMemo,
} from 'react';

export interface AuthContextType {
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
    // const [user, setUser] = useState(null);
    // const login = useCallback(async () => {
    //     try {
    //         const response = await fetch('/auth/google/', {
    //             credentials: 'include',
    //         });
    //         if (!response.ok) {
    //             throw new Error('Login failed');
    //         }
    //         setIsLoggedIn(true);
    //     } catch (error) {
    //         throw new Error('Login failed');
    //     }
    // }, []);

    const logout = useCallback(async () => {
        try {
            const response = await fetch('/auth/google/logout', {
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            // setIsLoggedIn(false);
        } catch (error) {
            throw new Error('Logout failed');
        }
    }, []);
    // const { isLoggedIn, checkAuthStatus, setIsLoggedIn } = useAuth();
    const authContextValue = useMemo(() => ({
        logout,
    }), [logout]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };
