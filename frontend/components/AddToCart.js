import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';
import { useCart } from '../lib/cartState';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($productId: ID!) {
    addToCart(productId: $productId) {
      quantity
      id
    }
  }
`;

const ButtonStyles = styled.button`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const AddToCart = ({ productId }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { productId },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <ButtonStyles
      disabled={loading}
      onClick={async () => {
        try {
          await addToCart();
        } catch (error) {
          console.error(error);
        }
      }}
      type="button"
    >
      Add{loading && 'ing'} To Cart!
    </ButtonStyles>
  );
};

AddToCart.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default AddToCart;
