import axios from 'axios'

const defaultOrders = []
//Action types
const GET_ORDERS = 'GET_ORDERS'

//Action creators
const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

//Thunks
export const fetchOrders = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${id}/orders`)
      dispatch(getOrders(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export default (orders = defaultOrders, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return orders
  }
}
