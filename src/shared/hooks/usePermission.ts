import { useMemo } from 'react';
import { useCurrentUserMembershipQuery } from '../api/queries/organization';
import { hasPermission, hasAnyPermission, hasAllPermissions } from '../../features/permissions-calculator/model/permissions';

/**
 * Permission Hooks for checking user permissions
 * 
 * @example
 * // Check single permission
 * const { hasPermission, isLoading } = usePermission('organization.update');
 * 
 * if (isLoading) return <Loader />;
 * if (!hasPermission) return <AccessDenied />;
 * 
 * @example
 * // Check if user has any of multiple permissions
 * const { hasPermission } = useAnyPermission(['member.add', 'member.remove']);
 * 
 * @example
 * // Check if user has all specified permissions
 * const { hasPermission } = useAllPermissions(['role.view', 'role.create']);
 * 
 * @example
 * // Get user's permissions value and role
 * const { permissionsValue, role } = useUserPermissions();
 */

/**
 * Hook to check if the current user has a specific permission
 * @param permissionCode - The permission code to check (e.g., "organization.update")
 * @param enabled - Whether to enable the query (default: true)
 * @returns Object with permission check result and loading state
 */
export function usePermission(permissionCode: string, enabled = true) {
  const { data: membership, isLoading } = useCurrentUserMembershipQuery(enabled);

  const hasPermissionResult = useMemo(() => {
    if (!membership?.role?.permissionsValue) {
      return false;
    }
    return hasPermission(membership.role.permissionsValue, permissionCode);
  }, [membership, permissionCode]);

  return {
    hasPermission: hasPermissionResult,
    isLoading,
    membership,
  };
}

/**
 * Hook to check if the current user has any of the specified permissions
 * @param permissionCodes - Array of permission codes to check
 * @param enabled - Whether to enable the query (default: true)
 * @returns Object with permission check result and loading state
 */
export function useAnyPermission(permissionCodes: string[], enabled = true) {
  const { data: membership, isLoading } = useCurrentUserMembershipQuery(enabled);

  const hasAnyPermissionResult = useMemo(() => {
    if (!membership?.role?.permissionsValue) {
      return false;
    }
    return hasAnyPermission(membership.role.permissionsValue, permissionCodes);
  }, [membership, permissionCodes]);

  return {
    hasPermission: hasAnyPermissionResult,
    isLoading,
    membership,
  };
}

/**
 * Hook to check if the current user has all of the specified permissions
 * @param permissionCodes - Array of permission codes to check
 * @param enabled - Whether to enable the query (default: true)
 * @returns Object with permission check result and loading state
 */
export function useAllPermissions(permissionCodes: string[], enabled = true) {
  const { data: membership, isLoading } = useCurrentUserMembershipQuery(enabled);

  const hasAllPermissionsResult = useMemo(() => {
    if (!membership?.role?.permissionsValue) {
      return false;
    }
    return hasAllPermissions(membership.role.permissionsValue, permissionCodes);
  }, [membership, permissionCodes]);

  return {
    hasPermission: hasAllPermissionsResult,
    isLoading,
    membership,
  };
}

/**
 * Hook to get the current user's permissions value
 * @param enabled - Whether to enable the query (default: true)
 * @returns Object with permissions value, membership data, and loading state
 */
export function useUserPermissions(enabled = true) {
  const { data: membership, isLoading, error } = useCurrentUserMembershipQuery(enabled);

  return {
    permissionsValue: membership?.role?.permissionsValue || null,
    role: membership?.role || null,
    membership,
    isLoading,
    error,
  };
}

