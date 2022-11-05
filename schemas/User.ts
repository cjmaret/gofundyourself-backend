import { text, password, relationship, timestamp } from '@keystone-next/fields';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { list } from '@keystone-next/keystone/schema';
import { cloudinary } from '../lib/cloudinary';
import { permissions, rules } from '../access';

export const User = list({
  access: {
    create: () => true,
    read: () => true,
    update: rules.canManageUsers,
    delete: permissions.canManageUsers,
  },
  ui: {
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    avatar: cloudinaryImage({
      cloudinary: {
        ...cloudinary,
        folder: 'gofundyourself/user-images',
      },
      label: 'Avatar',
    }),
    createdOn: timestamp({ defaultValue: new Date().toISOString() }),
    donations: relationship({ ref: 'Donation.user', many: true }),
    fundraisers: relationship({ ref: 'Fundraiser.user', many: true }),
    role: relationship({
      ref: 'Role.assignedTo',
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
  },
});
