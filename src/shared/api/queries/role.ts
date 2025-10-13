import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import type { CreateRoleRequest, UpdateRoleRequest } from '../../../generated-api';

export const ROLES_QUERY_KEY = ['roles'];
export const PERMISSIONS_QUERY_KEY = ['permissions'];

export function useRolesQuery() {
  return useQuery({
    queryKey: ROLES_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.roles.getRoles();
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function usePermissionsQuery() {
  return useQuery({
    queryKey: PERMISSIONS_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.permissions.getAllPermissions();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - permissions don't change often
  });
}

export function useCreateRoleMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateRoleRequest) => {
      const response = await apiClient.roles.createRole(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEY });
    },
  });
}

export function useUpdateRoleMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateRoleRequest }) => {
      const response = await apiClient.roles.updateRole(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEY });
    },
  });
}

export function useDeleteRoleMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.roles.deleteRole(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEY });
    },
  });
}

