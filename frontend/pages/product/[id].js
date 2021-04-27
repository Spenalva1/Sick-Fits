import PropTypes from 'prop-types';
import SingleProduct from '../../components/SingleProduct';

const singleProductPage = ({ query: { id } }) => <SingleProduct id={id} />;

singleProductPage.propTypes = {
  query: PropTypes.any,
};

export default singleProductPage;
