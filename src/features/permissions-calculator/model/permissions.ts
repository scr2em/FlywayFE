/**
 * Permission definition matching the backend Permission enum
 */
export interface PermissionDefinition {
  code: string;
  label: string;
  description: string;
  category: string;
  bitValue: bigint;
}

/**
 * All permissions with their bitwise values
 * Based on the backend Permission enum
 */
export const PERMISSIONS: PermissionDefinition[] = [
  // Organization permissions (bits 0-2)
  {
    code: 'organization.update',
    label: 'Update Organization',
    description: 'Can update organization information',
    category: 'organization',
    bitValue: 1n << 0n,
  },

  // Member management permissions (bits 3-6)
  {
    code: 'member.view',
    label: 'View Members',
    description: 'Can view organization members',
    category: 'member',
    bitValue: 1n << 3n,
  },
  {
    code: 'member.add',
    label: 'Add Members',
    description: 'Can add new members to the organization',
    category: 'member',
    bitValue: 1n << 4n,
  },
  {
    code: 'member.remove',
    label: 'Remove Members',
    description: 'Can remove members from the organization',
    category: 'member',
    bitValue: 1n << 5n,
  },
  {
    code: 'member.update_role',
    label: 'Update Member Role',
    description: 'Can update member roles',
    category: 'member',
    bitValue: 1n << 6n,
  },

  // Role management permissions (bits 7-11)
  {
    code: 'role.view',
    label: 'View Roles',
    description: 'Can view roles',
    category: 'role',
    bitValue: 1n << 7n,
  },
  {
    code: 'role.create',
    label: 'Create Roles',
    description: 'Can create new roles',
    category: 'role',
    bitValue: 1n << 8n,
  },
  {
    code: 'role.update',
    label: 'Update Roles',
    description: 'Can update existing roles',
    category: 'role',
    bitValue: 1n << 9n,
  },
  {
    code: 'role.delete',
    label: 'Delete Roles',
    description: 'Can delete roles',
    category: 'role',
    bitValue: 1n << 10n,
  },
  {
    code: 'role.assign_permissions',
    label: 'Assign Permissions',
    description: 'Can assign permissions to roles',
    category: 'role',
    bitValue: 1n << 11n,
  },

  // Permission management (bit 12)
  {
    code: 'permission.view',
    label: 'View Permissions',
    description: 'Can view all permissions',
    category: 'permission',
    bitValue: 1n << 12n,
  },

  // Invitation permissions (bits 13-15)
  {
    code: 'invitation.view',
    label: 'View Invitations',
    description: 'Can view organization invitations',
    category: 'invitation',
    bitValue: 1n << 13n,
  },
  {
    code: 'invitation.create',
    label: 'Create Invitations',
    description: 'Can create invitations to join organization',
    category: 'invitation',
    bitValue: 1n << 14n,
  },
  {
    code: 'invitation.cancel',
    label: 'Cancel Invitations',
    description: 'Can cancel pending invitations',
    category: 'invitation',
    bitValue: 1n << 15n,
  },

  // User management permissions (bits 16-18)
  {
    code: 'user.view',
    label: 'View Users',
    description: 'Can view user information',
    category: 'user',
    bitValue: 1n << 16n,
  },
  {
    code: 'user.update',
    label: 'Update Users',
    description: 'Can update user information',
    category: 'user',
    bitValue: 1n << 17n,
  },
  {
    code: 'user.delete',
    label: 'Delete Users',
    description: 'Can delete users',
    category: 'user',
    bitValue: 1n << 18n,
  },

  // Deployment permissions (bits 19-21)
  {
    code: 'deployment.create',
    label: 'Deploy Updates',
    description: 'Can deploy application updates',
    category: 'deployment',
    bitValue: 1n << 19n,
  },
  {
    code: 'deployment.view',
    label: 'View Deployments',
    description: 'Can view deployment history',
    category: 'deployment',
    bitValue: 1n << 20n,
  },
  {
    code: 'deployment.rollback',
    label: 'Rollback Deployments',
    description: 'Can rollback deployments',
    category: 'deployment',
    bitValue: 1n << 21n,
  },

  // Billing permissions (bits 22-23)
  {
    code: 'billing.view',
    label: 'View Billing',
    description: 'Can view billing information',
    category: 'billing',
    bitValue: 1n << 22n,
  },
  {
    code: 'billing.manage',
    label: 'Manage Billing',
    description: 'Can manage billing and subscriptions',
    category: 'billing',
    bitValue: 1n << 23n,
  },
];

/**
 * Get unique categories from permissions
 */
export function getCategories(): string[] {
  const categories = new Set(PERMISSIONS.map((p) => p.category));
  return Array.from(categories).sort();
}

/**
 * Get permissions by category
 */
export function getPermissionsByCategory(category: string): PermissionDefinition[] {
  return PERMISSIONS.filter((p) => p.category === category);
}

/**
 * Convert permission string (bigint) to array of permission codes
 */
export function permissionStringToPermissions(permissionString: string): string[] {
  try {
    const permissionValue = BigInt(permissionString);
    const enabledPermissions: string[] = [];

    for (const permission of PERMISSIONS) {
      if ((permissionValue & permission.bitValue) === permission.bitValue) {
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
export function permissionsToPermissionString(permissionCodes: string[]): string {
  let permissionValue = 0n;

  for (const code of permissionCodes) {
    const permission = PERMISSIONS.find((p) => p.code === code);
    if (permission) {
      permissionValue |= permission.bitValue;
    }
  }

  return permissionValue.toString();
}

/**
 * Get permission definition by code
 */
export function getPermissionByCode(code: string): PermissionDefinition | undefined {
  return PERMISSIONS.find((p) => p.code === code);
}


