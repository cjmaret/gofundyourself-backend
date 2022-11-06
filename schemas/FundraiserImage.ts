import { cloudinaryImage } from '@keystone-next/cloudinary';
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, permissions, rules } from '../access';
import { cloudinary } from '../lib/cloudinary';

export const FundraiserImage = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: permissions.canManageFundraisers,
    delete: rules.canManageFundraisers,
  },
  fields: {
    image: cloudinaryImage({
      cloudinary: { ...cloudinary, folder: 'gofundyourself/fundraiser-images' },
      label: 'Source',
    }),
    altText: text(),
    fundraiser: relationship({ ref: 'Fundraiser.photo' }),
    user: relationship({
      ref: 'User.fundraiserImage',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'fundraiser'],
    },
  },
});
