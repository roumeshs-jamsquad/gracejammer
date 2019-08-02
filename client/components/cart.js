import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders, removeFromCartThunk} from '../store/orders'

export class Cart extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchOrders()
  }

  handleClick(jamId) {
    const orderId = this.props.orders.find(
      order => !order.status && order.userId === this.props.user.id
    ).id

    this.props.removeFromCart(orderId, jamId)
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
                <button onClick={() => this.handleClick(jam.id)} type="submit">
                  Remove from Cart
                </button>
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
  fetchOrders: () => dispatch(fetchOrders()),
  removeFromCart: (orderId, productId) =>
    dispatch(removeFromCartThunk(orderId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
