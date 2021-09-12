const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

const ProductType = require('../typedefs/ProductType')
const productData = require('../../data/mockData.json')
const { makeId, paginate } = require('../../utils')

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      args: { id: { type: GraphQLString }, size: { type: GraphQLInt }, page: { type: GraphQLInt } },
      resolve(parent, args) {
        const { id, size = 5, page = 0 } = args
        if (id) {
          const product = productData.find(p => p.id === id)
          const result = product ? [product] : null
          return result
        }
        const paginationResult = paginate(productData, size, page);
        return paginationResult;
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
        const { name, description, price } = args
        const newProduct = {
          id: makeId(),
          name,
          description,
          price
        }
        productData.unshift(newProduct);
        return productData.find(p => p.id === newProduct.id);
      },
    },
  },
});

// Construct a schema, using GraphQL schema language
const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation })

module.exports = schema;