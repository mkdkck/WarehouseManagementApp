const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    role:String
    organization:String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!,role:String!,organization:String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;