import { cloudinaryImage } from '@keystone-next/cloudinary';
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, permissions } from '../access';
import { cloudinary } from '../lib/cloudinary';

export const FundraiserImage = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: permissions.canManageFundraisers,
    delete: permissions.canManageFundraisers,
  },
  fields: {
    image: cloudinaryImage({
      cloudinary: { ...cloudinary, folder: 'gofundyourself/fundraiser-images' },
      label: 'Source',
    }),
    altText: text(),
    fundraiser: relationship({ ref: 'Fundraiser.photo' }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'fundraiser'],
    },
  },
});
