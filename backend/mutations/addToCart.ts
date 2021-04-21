/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('Adding to cart!!!!');
  // 1. Query the current user see if they are signed in
  const sess = context.session as Session;
  if (!sess.itemId) {
    throw new Error('You must be logged in to do this!!');
  }
  // 2. query the current users cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sess.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity',
  });
  const [existingCartItem] = allCartItems;
  // 3. See if the current item is in their cart
  if (existingCartItem) {
    // 4. if it is, invrement by 1
    console.log(
      `There are already ${existingCartItem?.quantity}, increment by 1!`
    );
    return context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
      resolveFields: false,
    }) as CartItemCreateInput;
  }
  // 5. if it is not, create a new cart item!
  console.log('This item is not in the cart, create a new CartItem!');
  return context.lists.CartItem.createOne({
    data: {
      quantity: 1,
      product: { connect: { id: productId } },
      user: { connect: { id: sess.itemId } },
    },
    resolveFields: false,
  }) as CartItemCreateInput;
}

export default addToCart;
