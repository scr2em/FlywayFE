import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import type { LoginRequest, UserRegistrationRequest, AuthResponse } from '../../../generated-api';
import { USER_QUERY_KEY } from './user';

export function useLoginMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await apiClient.auth.login(data);
      return response.data;
    },
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      // Invalidate user query to fetch fresh data
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
}

export function useSignupMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UserRegistrationRequest) => {
      const response = await apiClient.auth.register(data);
      return response.data;
    },
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      // Invalidate user query to fetch fresh data
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
}

