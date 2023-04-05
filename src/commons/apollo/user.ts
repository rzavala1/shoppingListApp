import { gql } from '@apollo/client';

export const CURRENT_USER = gql`
  query CurrentUser( $id: ID!){
    getUser(id: $id) {
      id
      username
      address
      city
      country
      phone
      email
      photo
      token
    }
  }
`;
export const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $username: String!
    $password: String!
  ) {
    login(username: $username, password: $password) {
      id
      address
      city
      country
      phone
      email
      photo
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $user: UserInput!
  ) {
    updateUser(id: $id, user: $user) {
      id
    }
  }
`;

