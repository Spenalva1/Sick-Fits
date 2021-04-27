import { useMutation } from '@apollo/client';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../lib/cartState';
import SickButton from './styles/SickButton';
import { CURRENT_USER_QUERY } from './User';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const CheckoutForm = () => {
  const { closeCart } = useCart();
  const router = useRouter();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [checkout] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    // 1. Stop the form from submitting and turn the loader on
    e.preventDefault();
    setLoading(true);
    // 2. Start the page transition
    nProgress.start();
    // 3. Create the payment method via stripe (Token comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    // 4. Handle any errors from stripe
    if (error) {
      setError(error);
      setLoading(false);
      nProgress.done();
      return;
    }
    // 5. Send the token from step 3 to our keyston server via custom mutation
    const order = await checkout({
      variables: { token: paymentMethod.id },
    }).catch((error) => {
      console.log('CHECKOUT ERROR -> ', error);
      setError(error);
    });

    // 6. Change the page to view the order
    router.push({
      pathname: `/order/${order.data.checkout.id}`,
    });

    // 7. Close the cart
    closeCart();

    // 8. turn the loader of
    setLoading(false);
    nProgress.done();
    elements.getElement(CardElement).clear();
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12, color: 'red' }}>{error.message}</p>}
      <CardElement />
      <SickButton disabled={loading}>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
};

const Checkout = () => (
  <Elements stripe={stripeLib}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;