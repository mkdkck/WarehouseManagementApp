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
    OrgName:String!
    Members:[User]
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

  type Auth {
    token:ID
    user: User
  }

  type Query {
    user: User
    warehouses:[Warehouse]
    pkConfigs:[PkConfig]
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
  }
`;

module.exports = typeDefs;