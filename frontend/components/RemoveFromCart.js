import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import styled from 'styled-components';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const DeleteButton = styled.button`
  font-size: 3rem;
  background: none;
  margin-right: 0.5rem;
  border: 0;
  cursor: pointer;
  &:hover {
    color: var(--red);
  }
`;

// remove the deleted item from the cache to update the ui
const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCartItem));
};

const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  });

  return (
    <DeleteButton
      disabled={loading}
      onClick={async () => {
        try {
          await removeFromCart();
        } catch (error) {
          console.error(error);
        }
      }}
      type="button"
    >
      &times;
    </DeleteButton>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
