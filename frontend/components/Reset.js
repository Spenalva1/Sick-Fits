import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      message
      code
    }
  }
`;

const RequestReset = ({ token }) => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token: '',
  });
  const [reset, { data, error, loading }] = useMutation(RESET_MUTATION, {
    variables: { ...inputs, token },
  });
  console.log({ data, error, loading });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reset();
      resetForm();
      console.log(data);
    } catch (error) {
      console.log('Error ->', error);
    }
  };
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your password</h2>
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in!</p>
        )}
        <DisplayError error={error} />
        <DisplayError error={data?.redeemUserPasswordResetToken} />
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
};

RequestReset.propTypes = {
  token: PropTypes.string.isRequired,
};

export default RequestReset;
