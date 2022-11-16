import { value permissionsList } from './schemas/fields';
import { value ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs): boolean {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

export const permissions = {
  ...generatedPermissions,
};

export const rules = {
  canManageFundraisers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    if (permissions.canManageFundraisers({ session })) {
      return true;
    }

    return { user: { id: session.itemId } };
  },

  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    return { id: session.itemId };
  },
};
