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
      <div className=" container">
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
                      type="submit"
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
    dispatch(removeFromCartThunk(orderId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
