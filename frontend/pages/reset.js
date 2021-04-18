import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

const resetPage = ({ query }) => {
  if (!query.token)
    return (
      <div>
        <p>Sorry you must supply a reset token</p>
        <RequestReset />
      </div>
    );
  return <Reset token={query.token} />;
};

export default resetPage;
