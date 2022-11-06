import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

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
  // canReadFundraisers({ session }: ListAccessArgs) {
  //   if (permissions.canManageFundraisers({ session })) {
  //     return true;
  //   }
  //   return { OR: [{ user: { id: session.itemId } }, { status: 'ACTIVE' }] };
  // },

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

  // canUiManageFundraisers({ session }: ListAccessArgs) {
  //   if (permissions.canManageFundraisers({ session })) {
  //     return 'edit';
  //   }

  //   return 'read';
  // },
};