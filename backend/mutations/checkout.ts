/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { KeystoneContext } from '@keystone-next/types';
import Stripe from 'stripe';
import {
  CartItemCreateInput,
  OrderCreateInput,
} from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';

const graphql = String.raw;

async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1. Make sure the are signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Sorry! You must be signed in to create an order!');
  }
  // 1.5 Query the current user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `,
  });

  // 2. calc the total price for ther order
  const cartItems = user.cart.filter(
    // filter products that may have been deleted and still are in the cart
    (item: CartItemCreateInput) => item.product
  );
  const amount = cartItems.reduce(
    (prev: number, curr: CartItemCreateInput) =>
      prev + curr.quantity * curr.product.price,
    0
  );

  // 3. create the charge with the stripe library
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error.message);
    });

  // 4. Convert the cartItems to OrderItems
  const orderItems = cartItems.map((cartItem: CartItemCreateInput) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } },
    };
    return orderItem;
  });

  // 5. Create the order and return it
  const order: OrderCreateInput = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems }, // keyston will automatically create all order items
      user: { connect: { id: userId } },
    },
  });

  // 6. Clean up any old cart items
  const cartItemsIds = user.cart.map((cartItem: { id: string }) => cartItem.id);
  await context.lists.CartItem.deleteMany({
    ids: cartItemsIds,
  });

  return order;
}

export default checkout;
