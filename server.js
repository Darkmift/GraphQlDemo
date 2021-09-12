var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { ProductSchema } = require('./graphql')

if (process.env.NODE_ENV != 'production') {
  const dotenv = require('dotenv')
  const result = dotenv.config()
  if (result.error) {
    throw result.error
  }
}



// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: ProductSchema,
  rootValue: root,
  graphiql: true,
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT);
console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);