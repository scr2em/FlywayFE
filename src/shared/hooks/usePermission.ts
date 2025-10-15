import { useCurrentUserQuery } from '../api/queries/user';
import { hasPermission, PERMISSIONS } from '../../features/permissions-calculator/model/permissions';

/**
 * Permission Hooks for checking user permissions
 * 
 * @example
 * // Use the all-in-one permissions hook (recommended)
 * const { canDeleteMobileApp, canCreateMobileApp, canUpdateOrganization } = usePermissions();
 * 
 * @example
 * // Check single permission
 * const hasOrgUpdatePermission = usePermission('organization.update');
 * 
 * @example
 * // Check if user has any of multiple permissions
 * const hasAnyMemberPermission = useAnyPermission(['member.add', 'member.remove']);
 * 
 * @example
 * // Check if user has all specified permissions
 * const hasAllRolePermissions = useAllPermissions(['role.view', 'role.create']);
 * 
 * @example
 * // Get user's permissions value and role
 * const { permissionsValue, role } = useUserPermissions();
 */

/**
 * Convert permission code to camelCase property name
 * e.g., "mobile_app.create" -> "canCreateMobileApp"
 */
function permissionCodeToCamelCase(code: string): string {
  const parts = code.split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    console.warn(`Invalid permission code format: ${code}`);
    return 'canUnknown';
  }
  
  const category = parts[0];
  const action = parts[1];
  const categoryParts = category.split('_');
  const actionParts = action.split('_');
  
  const camelCategory = categoryParts
    .map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  
  const camelAction = actionParts
    .map((part, index) => index === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  
  return `can${camelAction}${camelCategory.charAt(0).toUpperCase() + camelCategory.slice(1)}`;
}

/**
 * Hook to get all permissions as boolean values
 * @param enabled - Whether to enable the query (default: true)
 * @returns Object with all permissions as boolean values (e.g., { canCreateMobileApp: true, canDeleteMobileApp: false, ... })
 * 
 * @example
 * const { canCreateMobileApp, canDeleteMobileApp, canUpdateOrganization } = usePermissions();
 * 
 * if (canCreateMobileApp) {
 *   // Show create button
 * }
 */
export function usePermissions(enabled = true) {
  const { data: user } = useCurrentUserQuery(enabled);
  const permissionsValue = user?.role?.permissionsValue;

  const permissions: Record<string, boolean> = {};

  for (const permission of PERMISSIONS) {
    const key = permissionCodeToCamelCase(permission.code);
    permissions[key] = hasPermission(permissionsValue, permission.code);
  }

  return permissions as {
    canUpdateOrganization: boolean;
    canViewMember: boolean;
    canAddMember: boolean;
    canRemoveMember: boolean;
    canUpdateRoleMember: boolean;
    canViewRole: boolean;
    canCreateRole: boolean;
    canUpdateRole: boolean;
    canDeleteRole: boolean;
    canAssignPermissionsRole: boolean;
    canViewPermission: boolean;
    canViewInvitation: boolean;
    canCreateInvitation: boolean;
    canCancelInvitation: boolean;
    canViewUser: boolean;
    canUpdateUser: boolean;
    canDeleteUser: boolean;
    canCreateDeployment: boolean;
    canViewDeployment: boolean;
    canRollbackDeployment: boolean;
    canViewBilling: boolean;
    canManageBilling: boolean;
    canReadMobileApp: boolean;
    canCreateMobileApp: boolean;
    canUpdateMobileApp: boolean;
    canDeleteMobileApp: boolean;
  };
}