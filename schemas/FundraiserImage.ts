import { cloudinaryImage } from '@keystone-next/cloudinary';
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinary } from '../lib/cloudinary';

export const FundraiserImage = list({
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
