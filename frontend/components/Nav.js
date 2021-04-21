import Link from 'next/link';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

const Nav = () => {
  const user = useUser();
  const { openCart } = useCart();
  const cartCount = user
    ? user.cart.reduce((prev, item) => prev + item.quantity, 0)
    : 0;
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={() => openCart()}>
            My Cart
            <CartCount count={parseInt(cartCount)} />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signIn">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
