import { text, password, relationship, timestamp } from '@keystone-next/fields';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { list } from '@keystone-next/keystone/schema';
import { cloudinary } from '../lib/cloudinary';
import { permissions, rules } from '../access';

export const User = list({
  access: {
    create: () => true,
    read: () => true,
    delete: permissions.canManageUsers,
  },
  ui: {
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({
      isRequired: true,
      access: {
        update: rules.canManageUsers,
      },
    }),
    email: text({
      isRequired: true,
      isUnique: true,
      access: {
        update: rules.canManageUsers,
      },
    }),
    password: password({
      access: {
        update: rules.canManageUsers,
      },
    }),
    avatar: cloudinaryImage({
      cloudinary: {
        ...cloudinary,
        folder: 'gofundyourself/user-images',
      },
      label: 'Avatar',
      access: {
        update: rules.canManageUsers,
      },
    }),
    createdOn: timestamp({
      defaultValue: new Date().toISOString(),
      access: {
        update: rules.canManageUsers,
      },
    }),
    donations: relationship({
      ref: 'Donation.user',
      many: true,
      ui: {
        hideCreate: true,
      },
      access: {
        update: () => false,
      },
    }),
    fundraisers: relationship({
      ref: 'Fundraiser.user',
      many: true,
      ui: {
        hideCreate: true,
      },
      access: {
        update: rules.canManageUsers,
      },
    }),
    fundraiserImage: relationship({
      ref: 'FundraiserImage.user',
      many: true,
      access: {
        update: rules.canManageUsers,
      },
    }),
    role: relationship({
      ref: 'Role.assignedTo',
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
  },
});
