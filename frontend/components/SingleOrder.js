import PropTypes from 'prop-types';
import Head from 'next/head';
import { useUser } from './User';
import OrderStyles from './styles/OrderStyles';
import DisplayError from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const SingleOrder = ({ id }) => {
  const user = useUser();
  if (!user) return <DisplayError error={{ message: 'Order not found' }} />;
  const order = user.orders.filter((or) => or.id === id)[0];
  if (!order) return <DisplayError error={{ message: 'Order not found' }} />;
  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits - Order</title>
      </Head>
      <p>
        <span>Order Id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item Count:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div key={item.id} className="order-item">
            <img src={item.photo.image.publicUrlTransformed} alt={item.name} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {formatMoney(item.price)} each</p>
              <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
};

SingleOrder.propTypes = {
  id: PropTypes.string,
};

export default SingleOrder;
