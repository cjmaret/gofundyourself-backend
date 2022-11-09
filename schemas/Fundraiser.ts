import {
  integer,
  relationship,
  select,
  text,
  timestamp,
} from '@keystone-next/fields';

import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, permissions, rules } from '../access';

export const Fundraiser = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: rules.canManageFundraisers,
    delete: rules.canManageFundraisers,
  },
  ui: {
    // hideDelete: (args) => !rules.canManageFundraisers(args),
  },
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
        { label: 'Active', value: 'ACTIVE' },
      ],
      defaultValue: 'ACTIVE',
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
    user: relationship({
      ref: 'User.fundraisers',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
    donations: relationship({ ref: 'Donation.fundraiser', many: true }),
  },
});
