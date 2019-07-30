import axios from 'axios'

const defaultProducts = []
//Action types
const GET_PRODUCTS = 'GET_PRODUCTS'

//Action creators
const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

//Thunks
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export default (products = defaultProducts, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return products
  }
}
