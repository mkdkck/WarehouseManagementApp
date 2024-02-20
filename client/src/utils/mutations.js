import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser (
    $username:String!,
    $email: String!,
    $password: String!,
    $role:String!,
    $organization:String!){
      addUser(
        username:$username,
        email:$email,
        password:$password,
        role:$role,
        organization:$organization
      ){
        token
        user{
          _id
        }        
      }
    }
`

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;