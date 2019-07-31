import React, {Component} from 'react'
import {connect} from 'react-redux'
import fetchOrders from '../store/orders'

export class Cart extends Component {
  componentDidMount() {
    this.props.fetchOrders(Number(this.props.user.id))
  }

  render() {
    const {orders} = this.props
    const cart = orders.filter(order => !order.status)
    return cart.products ? (
      <div>
        <ul>
          {cart.products.map(jam => {
            return (
              <li key={jam.id}>
                <img src={jam.imageUrl} />
                <div>Name: {jam.name}</div>
                <div>Quantity: {jam.orderDetail.quantity}</div>
              </li>
            )
          })}
        </ul>
      </div>
    ) : (
      <div>loading...</div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: id => dispatch(fetchOrders(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
