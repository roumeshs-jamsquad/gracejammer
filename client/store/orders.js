import axios from 'axios'

const defaultOrders = []
//Action types
const GET_ORDERS = 'GET_ORDERS'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

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

const removeFromCart = (orderId, productId) => {
  return {
    type: REMOVE_FROM_CART,
    orderId,
    productId
  }
}

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

export const removeFromCartThunk = (orderId, productId) => async dispatch => {
  try {
    console.log('idssss', orderId, productId)

    const {data} = await axios.put('/api/cart/remove', {orderId, productId})
    console.log('this is data', data)
    dispatch(removeFromCart(data.orderId, data.productId))
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
    case REMOVE_FROM_CART:
      return orders
        .find(order => action.orderId === order.id)
        .products.filter(product => action.productId !== product.id)
    default:
      return orders
  }
}
