import {
  integer,
  relationship,
  select,
  text,
  timestamp,
} from '@keystone-next/fields';

import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const Fundraiser = list({
  access: {
    create: isSignedIn,
    read: () => true,
    delete: rules.canManageFundraisers,
  },
  fields: {
    name: text({
      isRequired: true,
      access: {
        update: (args) => {
          return rules.canManageFundraisers(args);
        },
      },
    }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
      access: {
        update: (args) => {
          return rules.canManageFundraisers(args);
        },
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
      access: {
        update: (args) => {
          return rules.canManageFundraisers(args);
        },
      },
    }),
    amount: integer({
      label: 'Amount (in cents)',
      access: {
        update: (args) => {
          return true;
        },
      },
    }),
    goal: integer({
      label: 'Goal (in cents)',
      access: {
        update: (args) => {
          return rules.canManageFundraisers(args);
        },
      },
    }),
    dateCreated: timestamp({
      defaultValue: new Date().toISOString(),
      access: {
        update: (args) => {
          return rules.canManageFundraisers(args);
        },
      },
    }),
    photo: relationship({
      ref: 'FundraiserImage.fundraiser',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
      access: {
        update: (args) => {
          return rules.canManageFundraisers(args);
        },
      },
    }),
    user: relationship({
      ref: 'User.fundraisers',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
      access: {
        update: (args) => {
          return rules.canManageFundraisers(args);
        },
      },
    }),
    donations: relationship({
      ref: 'Donation.fundraiser',
      many: true,
      access: {
        update: (args) => {
          return rules.canManageFundraisers(args);
        },
      },
    }),
  },
});
