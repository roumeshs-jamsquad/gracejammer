import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'

export class Cart extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    const {orders, user} = this.props
    let cart = orders.find(order => order.userId === user.id && !order.status)
    return cart && cart.products.length > 0 ? (
      <div>
        <ul>
          {cart.products.map(jam => {
            return (
              <li key={jam.id}>
                <div>Name: {jam.name}</div>
                <img src={jam.imageUrl} />
                <div>Quantity: {jam.orderDetail.quantity}</div>
              </li>
            )
          })}
        </ul>
      </div>
    ) : (
      <div>Cart is empty! Visit View All Jams page to add jams to cart!</div>
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
