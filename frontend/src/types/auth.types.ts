export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'driver';
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    data: {
        token: string;
    };
}

export interface CreateDriverRequest {
    name: string;
    email: string;
    password: string;
}

export interface CreateDriverResponse {
    success: boolean;
    message: string;
    data: {
        driver: User;
    };
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}