import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

const productsPage = ({ query: { page } }) => (
  <div>
    <Pagination page={parseInt(page) || 1} />
    <Products page={parseInt(page) || 1} />
    <Pagination page={parseInt(page) || 1} />
  </div>
);

export default productsPage;
