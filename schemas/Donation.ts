import {
  integer,
  relationship,
  text,
  timestamp,
  virtual,
} from '@keystone-next/fields';

import { list } from '@keystone-next/keystone/schema';
import formatMoney from '../lib/formatMoney';

export const Donation = list({
  // TODO: access
  fields: {
    donation: virtual({
      graphQLReturnType: 'String',
      resolver(item: object): string {
        return `${formatMoney(item.total)}`;
      },
    }),
    total: integer(),
    charge: text(),
    user: relationship({ ref: 'User.donations' }),
    fundraiser: relationship({ ref: 'Fundraiser.donations' }),
    dateCreated: timestamp({ defaultValue: new Date().toISOString() }),
  },
});
