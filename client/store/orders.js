import axios from 'axios'

const defaultOrders = []
//Action types
const GET_ORDERS = 'GET_ORDERS'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHECKOUT = 'CHECKOUT'
const UPDATE_CART = 'UPDATE_CART'

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

const checkoutOrder = order => ({
  type: CHECKOUT,
  order
})

const updateCart = (orderId, productId, quantity) => {
  return {
    type: UPDATE_CART,
    orderId,
    productId,
    quantity
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
    dispatch(addToCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCartThunk = (orderId, productId) => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart/remove', {orderId, productId})
    dispatch(removeFromCart(data.orderId, data.productId))
  } catch (err) {
    console.error(err)
  }
}

export const checkoutThunk = orderId => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart/checkout', {orderId})
    dispatch(checkoutOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateCartThunk = (
  orderId,
  productId,
  quantity,
  unitPrice
) => async dispatch => {
  try {
    const {data} = await axios.put('api/cart/update', {
      orderId,
      productId,
      quantity,
      unitPrice
    })
    dispatch(updateCart(data.orderId, data.productId, data.quantity))
  } catch (err) {
    console.error(err)
  }
}

//Reducer
export default (orders = defaultOrders, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case ADD_TO_CART:
      return [...orders, action.addedItem]
    case REMOVE_FROM_CART:
      return orders.map(order => {
        if (action.orderId === order.id) {
          order.products = order.products.filter(
            product => action.productId !== product.id
          )
          return order
        } else return order
      })
    case CHECKOUT:
      return orders.map(order => {
        if (action.order.id === order.id) {
          order.status = true
          return order
        } else return order
      })
    case UPDATE_CART:
      return orders.map(order => {
        if (action.orderId === order.id) {
          order.products.map(product => {
            if (action.productId === product.id) {
              product.orderDetail.quantity = action.quantity
              return product
            } else return product
          })

          return order
        } else {
          return order
        }
      })
    default:
      return orders
  }
}
