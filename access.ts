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

    let findOne = args.context.lists.Fundraiser.findOne;
    let found = findOne(args.itemId);
    console.log(found);
    console.log(args.context.lists.Fundraiser);

    // is owner?
    if (args.item?.user == session.itemId) {
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
