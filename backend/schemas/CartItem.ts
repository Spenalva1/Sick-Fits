import { list } from '@keystone-next/keystone/schema';
import { relationship, integer } from '@keystone-next/fields';

export const CartItem = list({
  fields: {
    // TODO: add custom label
    quantity: integer({ isRequired: true, defaultValue: 1 }),
    product: relationship({ ref: 'Product' }),
    user: relationship({ ref: 'User.cart' }),
  },
});
