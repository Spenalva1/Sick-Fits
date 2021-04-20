import PropTypes from 'prop-types';
import { gql, useMutation, useQuery } from '@apollo/client';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { SINGLE_PRODUCTS_QUERY } from './SingleProduct';
import Form from './styles/Form';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, loading } = useQuery(SINGLE_PRODUCTS_QUERY, {
    variables: { id },
  });

  const { inputs, handleChange, clearForm } = useForm(data?.Product);

  const [
    updateProduct,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const res = await updateProduct({
            variables: {
              id: data.Product.id,
              name: inputs.name,
              price: inputs.price,
              description: inputs.description,
            },
          });
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <fieldset
        disabled={loading || updateLoading}
        aria-busy={loading || updateLoading}
      >
        <DisplayError error={error || updateError} />
        <label htmlFor="name">
          Name
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            required
            type="number"
            id="price"
            name="price"
            placeholder="0"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter a description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
};

UpdateProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateProduct;
