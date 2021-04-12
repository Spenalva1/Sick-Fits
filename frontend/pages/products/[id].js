import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const SingleProduct = ({ query: { id } }) => <p>Post: {id}</p>;

SingleProduct.propTypes = {
  query: PropTypes.any,
};

export default SingleProduct;
