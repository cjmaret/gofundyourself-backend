import { KeystoneContext } from '@keystone-next/types';
import { OrderCreateInput } from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';

const graphql = String.raw;

interface Arguments {
  token: string;
  amount: number;
  fundraiserId: string;
}
async function checkout(
  root: any,
  { token, amount, fundraiserId }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Sorry! You must be signed in to create an order!');
  }

  const fundraiser = await context.lists.Fundraiser.findOne({
    where: { id: fundraiserId },
    resolveFields: graphql`
      id
      name
      description
      amount
      goal
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    `,
  });

  const charge = await stripeConfig.paymentIntents
    .create({
      amount: parseInt(amount),
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });

  const orderItem = {
    name: fundraiser.name,
    description: fundraiser.description,
    amount,
    photo: { connect: { id: fundraiser.photo.id } },
  };

  // 5. Create the order and return it
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItem },
      user: { connect: { id: userId } },
    },
    resolveFields: false,
  });

  await context.lists.Fundraiser.updateOne({
    id: fundraiserId,
    data: { amount: (fundraiser.amount += amount) },
    resolveFields: graphql`
      id
      name
      description
      amount
      goal
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    `,
  });

  return order;
}

export default checkout;
