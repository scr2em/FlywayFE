import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import type { CreateOrganizationRequest } from '../../../generated-api';
import { USER_QUERY_KEY } from './user';

export function useCreateOrganizationMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateOrganizationRequest) => {
      const response = await apiClient.organizations.createOrganization(data);
      return response.data;
    },
    onSuccess: () => {
      // After creating organization, invalidate user query to fetch updated user data
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
}

export function useGetOrganizationQuery(id: string) {
  return useQuery({
    queryKey: ['organization', id],
    queryFn: async () => {
      const response = await apiClient.organizations.getOrganization(id);
      return response.data;
    },
    enabled: !!id,
  });
}

