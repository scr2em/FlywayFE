/**
 * Permission definition from the API
 */
export interface PermissionDefinition {
  code: string;
  label: string;
  description: string;
  category: string;
  bitValue: string;
}

/**
 * Default empty permissions array - will be populated from API
 */
export const PERMISSIONS: PermissionDefinition[] = [];

/**
 * Get unique categories from permissions
 */
export function getCategories(permissions: PermissionDefinition[]): string[] {
  const categories = new Set(permissions.map((p) => p.category));
  return Array.from(categories).sort();
}

/**
 * Get permissions by category
 */
export function getPermissionsByCategory(
  permissions: PermissionDefinition[],
  category: string
): PermissionDefinition[] {
  return permissions.filter((p) => p.category === category);
}

/**
 * Convert permission string (bigint) to array of permission codes
 */
export function permissionStringToPermissions(
  permissionString: string,
  permissions: PermissionDefinition[]
): string[] {
  try {
    const permissionValue = BigInt(permissionString);
    const enabledPermissions: string[] = [];

    for (const permission of permissions) {
      const bitValue = BigInt(permission.bitValue);
      if ((permissionValue & bitValue) === bitValue) {
        enabledPermissions.push(permission.code);
      }
    }

    return enabledPermissions;
  } catch (error) {
    console.error('Invalid permission string:', error);
    return [];
  }
}

/**
 * Convert array of permission codes to permission string (bigint)
 */
export function permissionsToPermissionString(
  permissionCodes: string[],
  permissions: PermissionDefinition[]
): string {
  let permissionValue = 0n;

  for (const code of permissionCodes) {
    const permission = permissions.find((p) => p.code === code);
    if (permission) {
      permissionValue |= BigInt(permission.bitValue);
    }
  }

  return permissionValue.toString();
}

/**
 * Get permission definition by code
 */
export function getPermissionByCode(
  code: string,
  permissions: PermissionDefinition[]
): PermissionDefinition | undefined {
  return permissions.find((p) => p.code === code);
}

/**
 * Check if a permission string contains a specific permission
 * @param permissionString - The bitwise permissions value as a string
 * @param permissionCode - The permission code to check (e.g., "organization.update")
 * @param permissions - The list of permission definitions
 * @returns true if the permission is present, false otherwise
 */
export function hasPermission(
  permissionString: string | undefined | null,
  permissionCode: string,
  permissions: PermissionDefinition[]
): boolean {
  if (!permissionString) {
    return false;
  }

  try {
    const permissionValue = BigInt(permissionString);
    const permission = getPermissionByCode(permissionCode, permissions);
    
    if (!permission) {
      console.warn(`Unknown permission code: ${permissionCode}`);
      return false;
    }

    const bitValue = BigInt(permission.bitValue);
    return (permissionValue & bitValue) === bitValue;
  } catch (error) {
    console.error('Invalid permission string:', error);
    return false;
  }
}
