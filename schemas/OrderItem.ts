import { integer, relationship, text, timestamp } from '@keystone-next/fields';

import { list } from '@keystone-next/keystone/schema';

export const OrderItem = list({
  // TODO: access
  fields: {
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
    order: relationship({ ref: 'Order.items' }),
  },
});
