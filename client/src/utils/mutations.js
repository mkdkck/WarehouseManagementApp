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
export const ADD_WAREHOUSE = gql`
  mutation addWarehouse(
    $warehouseName:String!,
    $location:String,
    $contactNumber:String){  
      addWarehouse(
        warehouseName:$warehouseName,
        location:$location,
        contactNumber:$contactNumber,
      ){
        _id
        warehouseName
        location
        contactNumber
      }
    }
`
export const REMOVE_WAREHOUSE = gql`
  mutation removeWarehouse($_id: ID!) {
    removeWarehouse(_id: $_id) {
      _id
      warehouseName
      location
      contactNumber
    }
  }
`;

export const UPDATE_WAREHOUSE = gql`
  mutation updateWarehouse(
    $_id: ID!,
    $warehouseName:String,
    $location:String,
    $contactNumber:String) {
    updateWarehouse(
      _id: $_id,
      warehouseName:$warehouseName,
      location:$location,
      contactNumber:$contactNumber,) {
      _id
      warehouseName
      location
      contactNumber
    }
  }
`;


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