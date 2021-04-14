import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const ButtonStyles = styled.button`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// remove the deleted product from the cache to update the ui
const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <ButtonStyles
      style={{ cursor: 'pointer' }}
      disabled={loading}
      onClick={async () => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm('Are you sure you want to delete the product')) return;
        try {
          await deleteProduct();
        } catch (error) {
          alert(error.message);
          console.error(error);
        }
      }}
      type="button"
    >
      {children}
    </ButtonStyles>
  );
};

DeleteProduct.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default DeleteProduct;
