const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

const ProductType = require('../typedefs/ProductType')
const { queryResolver, mutationResolver } = require('../resolvers/ProductReolver')

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      args: { id: { type: GraphQLString }, size: { type: GraphQLInt }, page: { type: GraphQLInt } },
      resolve(parent, args) {
        return queryResolver(parent, args)
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return mutationResolver(parent, args)
      },
    },
  },
});

// Construct a schema, using GraphQL schema language
const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation })

module.exports = schema;