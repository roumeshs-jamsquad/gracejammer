import React, {Component} from 'react'
import {fetchOrders} from '../store/orders'
import {fetchProducts} from '../store/products'
import {connect} from 'react-redux'

export class OrderHistory extends Component {
  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchOrders()
  }

  render() {
    const {orders, user} = this.props
    let usersOrders = []
    if (orders && orders.length) {
      usersOrders = orders
        .filter(order => order.userId === user.id && order.status)
        .sort((a, b) => a.id - b.id)
    }
    return usersOrders.length ? (
      <table className="table container text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {usersOrders.map(order => {
            let total = 0
            return (
              <tr key={order.id}>
                <th scope="row">{order.id}</th>
                <td>
                  {order.products.map(product => {
                    total += product.orderDetail.price
                    return (
                      order.id === product.orderDetail.orderId && (
                        <p key={product.id}>
                          {product.name}
                          <br />
                        </p>
                      )
                    )
                  })}
                </td>
                <td>
                  {order.products.map(product => {
                    return (
                      order.id === product.orderDetail.orderId && (
                        <p key={product.id}>
                          {product.orderDetail.quantity}
                          <br />
                        </p>
                      )
                    )
                  })}
                </td>
                <td>
                  {order.products.map(product => {
                    return (
                      order.id === product.orderDetail.orderId && (
                        <p key={product.id}>
                          ${(
                            product.orderDetail.price /
                            product.orderDetail.quantity
                          ).toFixed(2)}
                          <br />
                        </p>
                      )
                    )
                  })}
                </td>

                <td>
                  <p>${total.toFixed(2)}</p>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    ) : (
      <p className="text-center">No orders made!</p>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    user: state.user,
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
