import {
  integer,
  relationship,
  select,
  text,
  timestamp,
} from '@keystone-next/fields';

import { list } from '@keystone-next/keystone/schema';

export const Fundraiser = list({
  // TODO: access
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Unavailable', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'AVAILABLE',
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    amount: integer({
      label: 'Amount (in cents)',
    }),
    goal: integer({
      label: 'Goal (in cents)',
    }),
    dateCreated: timestamp({ defaultValue: new Date().toISOString() }),
    photo: relationship({
      ref: 'FundraiserImage.fundraiser',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    donations: relationship({ ref: 'Donation.fundraiser', many: true }),
  },
});
