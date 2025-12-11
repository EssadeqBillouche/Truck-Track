import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { authAPI } from './authAPI';
import type { AuthState, LoginRequest, User, CreateDriverRequest } from '../../types/auth.types';

interface JWTPayload {
    email: string;
    name: string;
    role: 'admin' | 'driver';
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,
};

// Initialize user from token if exists
if (initialState.token) {
    try {
        const decoded = jwtDecode<JWTPayload>(initialState.token);
        initialState.user = {
            id: '',
            email: decoded.email,
            name: decoded.name,
            role: decoded.role,
        };
    } catch {
        localStorage.removeItem('token');
        initialState.token = null;
        initialState.isAuthenticated = false;
    }
}

// Login thunk
export const login = createAsyncThunk(
    'auth/login',
    async (data: LoginRequest, { rejectWithValue }) => {
        try {
            const response = await authAPI.login(data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            
            const decoded = jwtDecode<JWTPayload>(token);
            const user: User = {
                id: '',
                email: decoded.email,
                name: decoded.name,
                role: decoded.role,
            };
            
            return { token, user };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

// Create driver thunk
export const createDriver = createAsyncThunk(
    'auth/createDriver',
    async (data: CreateDriverRequest, { rejectWithValue }) => {
        try {
            const response = await authAPI.createDriver(data);
            return response.data.driver;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create driver');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Create Driver
            .addCase(createDriver.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createDriver.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createDriver.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;