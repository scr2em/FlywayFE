import { useMutation, useQueryClient } from '@tanstack/react-query';
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

