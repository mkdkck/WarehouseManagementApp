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


export const ADD_PKCONFIG = gql`
  mutation addPkConfig(
    $configName: String!
    $itemPerPk: Int!
    $pkPerlayer: Int!
    $layerPerPallet: Int!){  
      addPkConfig(
        configName: $configName
        itemPerPk: $itemPerPk
        pkPerlayer: $pkPerlayer
        layerPerPallet: $layerPerPallet
      ){
        _id
        configName
        itemPerPk
        pkPerlayer
        layerPerPallet
      }
    }
`
export const REMOVE_PKCONFIG = gql`
  mutation removePkConfig($_id: ID!) {
    removePkConfig(_id: $_id) {
      _id
      configName
    }
  }
`;

export const UPDATE_PKCONFIG = gql`
  mutation updatePkConfig(
    $_id:ID!
    $configName: String!
    $itemPerPk: Int!
    $pkPerlayer: Int!
    $layerPerPallet: Int!) {
    updatePkConfig(
      _id: $_id,
      configName: $configName
      itemPerPk: $itemPerPk
      pkPerlayer: $pkPerlayer
      layerPerPallet: $layerPerPallet) {
        _id
        configName
        itemPerPk
        pkPerlayer
        layerPerPallet
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory(
    $name: String!
    $products: [ID]){  
      addCategory(
        name: $name
        products: $products
      ){
        _id
        name
        products{
          _id
          name
        }
      }
    }
`
export const REMOVE_CATEGORY = gql`
  mutation removeCategory($_id: ID!) {
    removeCategory(_id: $_id) {
      _id
      name
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory(
    $_id:ID!
    $name: String!
    $products: [ID]){
    updateCategory(
      _id: $_id,
      name: $name
        products: $products
      ){
        _id
        name
        products{
          _id
          name
        }
      }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String
    $image: String
    $categories:[ID]
    $owner: String){  
      addProduct(
        name: $name
        description: $description
        image: $image
        categories:$categories
        owner: $owner
      ){
        _id
        name
        description
        image
        categories{
          _id
        }
        owner
      }
    }
`
export const REMOVE_PRODUCT = gql`
  mutation removeProduct($_id: ID!) {
    removeProduct(_id: $_id) {
      _id
      name
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $_id:ID!
    $name: String!
    $description: String
    $image: String
    $categories:[ID]
    $owner: String){
      updateProduct(
      _id: $_id,
      name: $name
      description: $description
      image: $image
      categories:$categories
      owner: $owner
      ){
        _id
        name
        description
        image
        categories
        owner
      }
  }
`;

export const ADD_PRODUCTSTACK = gql`
mutation addProductStack(
  $productId:ID!
  $input:ProductStackInput!
){  
    addProductStack(
      productId:$productId
      input:$input
    ){
      _id
      productStacks {
        _id
        pkConfig{_id
        }
        pkQty
        layerQty
        palletQty
        warehouse{_id
        }
        zoneCode
      }      
    }      
  }
`
export const REMOVE_PRODUCTSTACK = gql`
  mutation removeProductStack($productId:ID!,$productStackId: ID!) {
    removeProductStack(productId:$productId,productStackId: $productStackId) {
      _id
      name
    }
  }
`;

export const UPDATE_PRODUCTSTACK = gql`
  mutation updateProductStack(
    $productId:ID!
    $productStackId: ID!,
    $input:ProductStackInput!
  ){
    updateProductStack(
      productId:$productId
      productStackId:$productStackId
      input:$input
      ){
        _id
      productStacks {
        _id
        pkConfig{_id
        }
        pkQty
        layerQty
        palletQty
        warehouse{_id
        }
        zoneCode
        }      
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