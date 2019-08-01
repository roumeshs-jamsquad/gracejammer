import axios from 'axios'

const defaultOrders = []
//Action types
const GET_ORDERS = 'GET_ORDERS'
const ADD_TO_CART = 'ADD_TO_CART'

//Action creators
const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

const addToCart = addedItem => ({
  type: ADD_TO_CART,
  addedItem
})

//Thunks
export const fetchOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders`)
      dispatch(getOrders(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addToCartThunk = product => async dispatch => {
  try {
    const {data} = await axios.post('/api/cart/add', product)
    console.log(product)
    dispatch(addToCart(data))
  } catch (err) {
    console.error(err)
  }
}

export default (orders = defaultOrders, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case ADD_TO_CART:
      return [...orders, action.addedItem]
    default:
      return orders
  }
}
