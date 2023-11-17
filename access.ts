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
  canManageFundraisers(args) {
    const { session } = args;
    if (!isSignedIn({ session })) {
      return false;
    }
    // is admin?
    if (permissions.canManageFundraisers({ session })) {
      return true;
    }

    console.log(args);

    // is owner?
    if (args.item.user == args.session.itemId) {
      return true;
    }

    return false;
  },

  canManageUsers(args) {
    const { session } = args;

    if (!isSignedIn({ session })) {
      return false;
    }

    // is admin?
    if (permissions.canManageUsers({ session })) {
      return true;
    }

    // is user?
    if (args.itemId == args.session.itemId) {
      return true;
    }

    return false;
  },
};
