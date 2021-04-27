import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import { useUser } from './User';
import OrderItemStyles from './styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const countItemsInOrder = (order) =>
  order.items.reduce((prev, cur) => prev + cur.quantity, 0);

const Orders = () => {
  const user = useUser();
  if (!user) return null;
  const { orders } = user;
  return (
    <div>
      <Head>
        <title>Orders - ({orders.length})</title>
      </Head>
      <h2>You have {orders.length} orders!</h2>
      <OrderUl>
        {orders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>
                    {countItemsInOrder(order)} item
                    {countItemsInOrder(order) > 1 ? 's' : ''}
                  </p>
                  <p>
                    {order.items.length} Product
                    {order.items.length > 1 ? 's' : ''}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={item.id}
                      src={item.photo.image.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
};

export default Orders;
