import styled from 'styled-components';
import RequestReset from '../components/RequestReset';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const signInPage = () => (
  <GridStyles>
    <SignIn />
    <SignUp />
    <RequestReset />
  </GridStyles>
);

export default signInPage;
