import { User } from '../schemas/User';
import {
  CartItemCreateInput,
  OrderCreateInput,
} from '../.keystone/schema-types';
import { KeystoneContext } from '@keystone-next/types';
import stripeConfig from '../lib/stripe';

const graphql = String.raw;

interface Arguments {
  token: string;
  amount: string;
  fundraiserId: string;
}

async function checkout(
  root: any,
  { token, amount, fundraiserId }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1. Make sure they are signed in
  const userId = context.session.itemId;
  console.log(context.session.itemId);
  console.log(token, amount, fundraiserId);
  if (!userId) {
    throw new Error('Sorry! You must be signed in to create an order!');
  }
  return;
  // 1.5 Query the current user
  // const user = await context.lists.User.findOne({
  //   where: { id: userId },
  //   resolveFields: graphql`
  //     id
  //     name
  //     email
  //     cart {
  //       id
  //       quantity
  //       product {
  //         name
  //         price
  //         description
  //         id
  //         photo {
  //           id
  //           image {
  //             id
  //             publicUrlTransformed
  //           }
  //         }
  //       }
  //     }
  //   `,
  // });
  // console.dir(user, { depth: null });
  // 2. calc the total price for their order
  // const cartItems = user.cart.filter((cartItem) => cartItem.product);
  console.log(amount);
  // // 3. create the charge with the stripe library
  // const charge = await stripeConfig.paymentIntents
  //   .create({
  //     amount,
  //     currency: 'USD',
  //     confirm: true,
  //     payment_method: token,
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     throw new Error(err.message);
  //   });
  // console.log(charge);
  // // 4. Convert the cartItems to OrderItems

  // const orderItem = {
  //   name: fundraiser.name,
  //   description: fundraiser.description,
  //   price: fundraiser.price,
  //   photo: { connect: { id: fundraiser.photo.id } },
  // };

  // console.log('gonna create the order');
  // // 5. Create the order and return it
  // const order = await context.lists.Order.createOne({
  //   data: {
  //     total: charge.amount,
  //     charge: charge.id,
  //     items: { create: orderItem },
  //     user: { connect: { id: userId } },
  //   },
  //   resolveFields: false,
  // });
  // // // 6. Clean up any old cart item
  // // const cartItemIds = user.cart.map((cartItem) => cartItem.id);
  // // console.log('gonna delete cartItems');
  // // await context.lists.CartItem.deleteMany({
  // //   ids: cartItemIds,
  // // });
  // return order;
}

export default checkout;
