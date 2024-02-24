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

  type Auth {
    token:ID
    user: User
  }

  type Query {
    user: User
    warehouses:[Warehouse]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!,role:String!,organization:String!): Auth
    login(email: String!, password: String!): Auth
    addWarehouse(warehouseName:String!, location:String, contactNumber:String):Warehouse
    updateWarehouse(_id: ID, warehouseName:String, location:String, contactNumber:String):Warehouse
    removeWarehouse(_id: ID):Warehouse
  }
`;

module.exports = typeDefs;