import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        email
        name
        orders {
          id
          total
          charge
          items {
            id
            name
            description
            price
            quantity
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
        cart {
          id
          quantity
          product {
            id
            name
            price
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export const useUser = () => {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
};
