const { makeId, paginate } = require('../../utils')
const productData = require('../../data/mockData.json')

const queryResolver = (parent, args) => {
  const { id, size = 5, page = 0 } = args
  if (id) {
    const product = productData.find(p => p.id === id)
    const result = product ? [product] : null
    return result
  }
  const paginationResult = paginate(productData, size, page);
  return paginationResult;
}

const mutationResolver = (parent, args) => {
  const { name, description, price } = args
  const newProduct = {
    id: makeId(),
    name,
    description,
    price
  }
  productData.unshift(newProduct);
  return productData.find(p => p.id === newProduct.id);
}

module.exports = {
  queryResolver,
  mutationResolver
}