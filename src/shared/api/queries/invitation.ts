import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import { type CreateInvitationRequest } from '../../../generated-api';

export const INVITATIONS_QUERY_KEY = ['invitations'];

export function useCreateInvitationMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateInvitationRequest) => {
      const response = await apiClient.invitations.createInvitation(data);
      return response.data;
    },
    onSuccess: () => {
      // Optionally invalidate members query if needed
      queryClient.invalidateQueries({ queryKey: ['organization-members'] });
    },
  });
}

export function useResendInvitationMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await apiClient.invitations.resendInvitation(userId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization-members'] });
    },
  });
}

export function useGetInvitationByToken(token: string) {
  return useQuery({
    queryKey: [...INVITATIONS_QUERY_KEY, 'token', token],
    queryFn: async () => {
      const response = await apiClient.invitations.getInvitationByToken(token);
      return response.data;
    },
    enabled: !!token,
  });
}

export function useAcceptInvitationMutation() {
  return useMutation({
    mutationFn: async (token: string) => {
      const response = await apiClient.invitations.acceptInvitation(token);
      return response.data;
    },
  });
}

export function useRejectInvitationMutation() {
  return useMutation({
    mutationFn: async (token: string) => {
      const response = await apiClient.invitations.rejectInvitation(token);
      return response.data;
    },
  });
}

