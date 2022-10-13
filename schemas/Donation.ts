import {
  integer,
  relationship,
  text,
  virtual,
  timestamp,
} from '@keystone-next/fields';

import { list } from '@keystone-next/keystone/schema';
import formatMoney from '../lib/formatMoney';

export const Donation = list({
  // TODO: access
  fields: {
    donation: virtual({
      graphQLReturnType: 'String',
      resolver: function (item: object): string {
        return `${formatMoney(item.total)}`;
      },
    }),
    total: integer(),
    charge: text(),
    user: relationship({ ref: 'User.donations' }),
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    amount: integer(),
    goal: integer(),
    dateCreated: timestamp({ defaultValue: new Date().toISOString() }),
    photo: relationship({
      ref: 'FundraiserImage',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
  },
});
