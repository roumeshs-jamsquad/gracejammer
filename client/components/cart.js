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
    const orderIdPlz = this.props.orders.find(
      order => !order.status && order.userId === this.props.user.id
    ).id

    console.log('lloooookk', orderIdPlz)
    console.log('jammmmm', jamId)

    this.props.removeFromCart(
      //Number(
      //   this.props.orders.find(
      //     order => !order.status && order.userId === this.props.user.id
      //   ).id
      orderIdPlz,
      //)
      jamId
    )
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
  fetchOrders: id => dispatch(fetchOrders(id)),
  removeFromCart: (orderId, productId) =>
    dispatch(removeFromCartThunk(orderId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
