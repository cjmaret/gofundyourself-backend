import { value checkbox } from '@keystone-next/fields';

export const permissionFields = {
  canManageFundraisers: checkbox({
    defaultValue: false,
    label: 'User can Update and delete a fundraiser',
  }),
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: 'User can query other users',
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: 'User can Edit other users',
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'User can CRUD roles',
  }),
  canManageDonations: checkbox({
    defaultValue: false,
    label: 'User can see all donations',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];
