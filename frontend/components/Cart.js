import { useUser } from './User';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CartItem from './CartItem';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';

const Cart = () => {
  const user = useUser();
  if (!user) return null;
  return (
    <CartStyles open>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
      </header>
      <ul>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
      </footer>
    </CartStyles>
  );
};

export default Cart;
