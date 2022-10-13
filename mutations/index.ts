import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import checkout from './checkout';
//
const graphql = String.raw;
export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      checkout(token: String!, amount: Int!, fundraiserId: String!): Donation
    }
  `,
  resolvers: {
    Mutation: {
      checkout,
    },
  },
});
