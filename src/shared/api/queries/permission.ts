import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';

export const PERMISSIONS_QUERY_KEY = ['permissions'];

export function usePermissionsQuery() {
  return useQuery({
    queryKey: PERMISSIONS_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.permissions.getPermissions();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - permissions don't change often
  });
}

