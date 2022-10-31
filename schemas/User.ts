import { text, password, relationship, timestamp } from '@keystone-next/fields';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { list } from '@keystone-next/keystone/schema';
import { cloudinary } from '../lib/cloudinary';

export const User = list({
  // access:
  // ui
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    avatar: cloudinaryImage({
      cloudinary: {
        ...cloudinary,
        folder: 'gofundyourself/user-images',
      },
      label: 'Source',
    }),
    createdOn: timestamp({ defaultValue: new Date().toISOString() }),
    donations: relationship({ ref: 'Donation.user', many: true }),
    fundraisers: relationship({ ref: 'Fundraiser.owner', many: true }),
  },
});
