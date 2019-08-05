import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders, removeFromCartThunk, checkoutThunk} from '../store/orders'

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.total = 0
    this.numItems = 0
    this.handleClick = this.handleClick.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
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

  handleCheckout(orderId) {
    this.props.checkoutThunk(orderId)
    this.props.history.push('/home')
  }

  render() {
    const {orders, user} = this.props
    this.total = 0
    this.numItems = 0
    let cart = orders.find(order => order.userId === user.id && !order.status)
    cart && cart.products.length > 0
      ? cart.products.forEach(jam => {
          this.total += jam.price * jam.orderDetail.quantity
          this.numItems += jam.orderDetail.quantity
        })
      : (this.total = 0)
    return cart && cart.products.length > 0 ? (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            {cart.products.map(jam => {
              return (
                <div key={jam.id} className="card mb-3 shadow">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img src={jam.imageUrl} className="card-img" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body text-center">
                        <h3 className="card-title">{jam.name}</h3>
                        <p className="card-text">{jam.description}</p>
                        <h5 className="card-text font-weight-bold">
                          ${(jam.price * jam.orderDetail.quantity).toFixed(2)}
                        </h5>
                        <div className="card-text">
                          Quantity: {jam.orderDetail.quantity}
                        </div>
                      </div>
                      <div className="text-center mb-3">
                        <button
                          onClick={() => this.handleClick(jam.id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Remove from Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="col-md-3">
            <form className="card shadow">
              <div className="card-text text-center mt-3">
                <span className="font-weight-bold">Subtotal</span> ({
                  this.numItems
                }{' '}
                item{this.numItems > 1 ? 's)' : ')'}:{' '}
                <span className="font-weight-bold">
                  ${this.total.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-primary my-3 mx-3"
                onClick={() => this.handleCheckout(cart.id)}
              >
                Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center">
        Cart is empty! Visit View All Jams page to add jams to cart!
      </div>
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
    dispatch(removeFromCartThunk(orderId, productId)),
  checkoutThunk: orderId => dispatch(checkoutThunk(orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
