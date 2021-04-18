import UpdateProduct from '../components/UpdateProduct';

const updatePage = ({ query: { id } }) => (
  <div>
    <UpdateProduct id={id} />
  </div>
);

export default updatePage;
