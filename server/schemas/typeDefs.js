const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password:String
    role:String
    organization:String
  }

  type Organization{
    _id:ID
    orgName:String!
    members:[User]
  }

  type Warehouse{
    _id:ID
    warehouseName:String!
    location:String
    contactNumber:String
  }

  type PkConfig{
    _id:ID
    configName: String!
    itemPerPk: Int!
    pkPerlayer: Int!
    layerPerPallet: Int!
    palletTotalItems: Int
    palletTotalPks: Int
  }

  type Category{
    _id:ID
    name: String!
    products: [Product]
    productCount: Int
  }

   type Product{
    _id:ID
    name: String!
    description: String
    image: String
    productStacks:[ProductStackSchema]
    categories:[Category]
    owner: String
  }

  type ProductStackSchema{
    _id:ID
    pkConfig: PkConfig
    pkQty: Int!
    layerQty: Int!
    palletQty: Int!
    warehouse: Warehouse
    zoneCode: String
  }

  input ProductStackInput {
    pkConfig: ID!
    pkQty: Int!
    layerQty: Int!
    palletQty: Int!
    warehouse: ID!
    zoneCode: String
  }

  type Auth {
    token:ID
    user: User
  }

  type Query {
    user: User
    users:[User]
    warehouses:[Warehouse]
    pkConfigs:[PkConfig]
    categories:[Category]
    products:[Product]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!,role:String!,organization:String!): Auth
    login(email: String!, password: String!): Auth

    addWarehouse(warehouseName:String!, location:String, contactNumber:String):Warehouse
    updateWarehouse(_id: ID!, warehouseName:String, location:String, contactNumber:String):Warehouse
    removeWarehouse(_id: ID!):Warehouse

    addPkConfig (configName: String!, itemPerPk: Int!, pkPerlayer: Int!, layerPerPallet: Int!):PkConfig
    updatePkConfig(_id:ID!,configName: String!, itemPerPk: Int!, pkPerlayer: Int!, layerPerPallet: Int!):PkConfig
    removePkConfig(_id:ID!):PkConfig

    addCategory(name: String!,products:[ID]):Category
    updateCategory(_id:ID!,name: String!, products:ID):Category
    removeCategory(_id:ID!):Category

    addProduct(name: String!, description: String, image: String, categories:[ID], owner: String):Product
    updateProduct(_id:ID!, name: String!, description: String, image: String, categories:[ID], owner: String):Product
    removeProduct(_id:ID!):Product

    addProductStack(productId:ID!,input:ProductStackInput!):Product
    updateProductStack(productId:ID!,productStackId: ID!,input:ProductStackInput!):Product
    removeProductStack(productId:ID!,productStackId: ID!):Product
  }
`;

module.exports = typeDefs;