import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';

export const API_KEYS_QUERY_KEY = ['apiKeys'];

export function useApiKeysQuery(orgId: string, bundleId: string) {
  return useQuery({
    queryKey: [...API_KEYS_QUERY_KEY, orgId, bundleId],
    queryFn: async () => {
      const response = await apiClient.orgId.getApiKeys(orgId, bundleId);
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
    enabled: !!orgId && !!bundleId,
  });
}

export function useCreateApiKeyMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ orgId, bundleId, name }: { orgId: string; bundleId: string; name: string }) => {
      const response = await apiClient.orgId.createApiKey(orgId, bundleId, { name });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [...API_KEYS_QUERY_KEY, variables.orgId, variables.bundleId] });
    },
  });
}

export function useDeleteApiKeyMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ orgId, bundleId, keyId }: { orgId: string; bundleId: string; keyId: string }) => {
      const response = await apiClient.orgId.deleteApiKey(orgId, bundleId, keyId);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [...API_KEYS_QUERY_KEY, variables.orgId, variables.bundleId] });
    },
  });
}

