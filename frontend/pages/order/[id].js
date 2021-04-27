import PropTypes from 'prop-types';
import SingleOrder from '../../components/SingleOrder';

const SingleOrderPage = ({ query: { id } }) => <SingleOrder id={id} />;

SingleOrderPage.propTypes = {
  query: PropTypes.any,
};

export default SingleOrderPage;
