import api from '../../api/axios';
import type { LoginRequest, LoginResponse, CreateDriverRequest, CreateDriverResponse } from '../../types/auth.types';

export const authAPI = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', data);
        return response.data;
    },

    createDriver: async (data: CreateDriverRequest): Promise<CreateDriverResponse> => {
        const response = await api.post<CreateDriverResponse>('/admin/drivers', data);
        return response.data;
    },
};