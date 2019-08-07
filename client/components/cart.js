import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchOrders,
  removeFromCartThunk,
  updateCartThunk,
  checkoutThunk
} from '../store/orders'
import {fetchProducts} from '../store/products'
import {toast, ToastContainer} from 'react-toastify'

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.total = 0
    this.numItems = 0
    this.guestTotal = 0
    this.guestQuantity = 0
    this.handleClick = this.handleClick.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  componentDidMount() {
    this.props.fetchOrders()
    this.props.fetchProducts()
  }

  notify = () => toast('Removed Successfully!')

  handleClick(jamId) {
    const {orders, user} = this.props
    if (Object.keys(user).length) {
      const orderId = orders.find(
        order => !order.status && order.userId === user.id
      ).id

      this.props.removeFromCart(orderId, jamId)
      this.notify()
    } else {
      let guestCart = JSON.parse(localStorage.getItem('cart'))
      let removeIdx = 0
      guestCart.forEach((item, idx) => {
        if (item.productId === jamId) {
          removeIdx = idx
        }
      })
      guestCart.splice(removeIdx, 1)
      localStorage.setItem('cart', JSON.stringify(guestCart))
      this.props.history.push('/cart')
    }
  }

  handleCheckout(orderId) {
    const {history, user} = this.props
    if (Object.keys(user).length) {
      this.props.checkoutThunk(orderId)
    }
    history.push('/home')
  }
  handleUpdate(jamId, quantity, jamPrice) {
    const {user, orders, history} = this.props
    if (Object.keys(user).length) {
      const orderId = orders.find(
        order => !order.status && order.userId === user.id
      ).id

      const jamAmount = Number(quantity)
      this.props.updateCart(orderId, jamId, jamAmount, jamPrice)
    } else {
      let guestCart = JSON.parse(localStorage.getItem('cart'))
      guestCart.map(item => {
        if (Number(item.productId) === Number(jamId)) {
          item.quantity = quantity
          return item
        } else return item
      })
      localStorage.setItem('cart', JSON.stringify(guestCart))
      history.push('/cart')
    }
  }

  populateSelect() {
    const maxQty = []

    for (let i = 1; i <= 30; i++) {
      maxQty.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }

    return maxQty
  }

  render() {
    const {orders, user, products} = this.props
    this.total = 0
    this.numItems = 0
    this.guestTotal = 0
    this.guestQuantity = 0
    let guestCart = JSON.parse(localStorage.getItem('cart'))
    let cart = orders.find(order => order.userId === user.id && !order.status)
    cart && cart.products.length > 0
      ? cart.products.forEach(jam => {
          this.total += jam.price * jam.orderDetail.quantity
          this.numItems += jam.orderDetail.quantity
        })
      : (this.total = 0)

    guestCart.forEach(item => {
      // this.guestTotal +=
      this.guestQuantity += Number(item.quantity)
      if (products.length) {
        this.guestTotal +=
          products.find(product => product.id === Number(item.productId))
            .price * item.quantity
      }
    })

    return Object.keys(this.props.user).length ? (
      cart && cart.products.length > 0 ? (
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
                            Quantity:
                            <select
                              value={jam.orderDetail.quantity}
                              onChange={() =>
                                this.handleUpdate(
                                  jam.id,
                                  event.target.value,
                                  jam.price
                                )
                              }
                            >
                              {this.populateSelect(jam.orderDetail.quantity)}
                            </select>
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
    ) : guestCart && guestCart.length && this.props.products.length ? (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            {guestCart.map((jam, idx) => {
              return (
                <div key={idx} className="card mb-3 shadow">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src={
                          this.props.products.find(
                            elem => elem.id === Number(jam.productId)
                          ).imageUrl
                        }
                        className="card-img"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body text-center">
                        <h3 className="card-title">
                          {
                            products.find(
                              elem => elem.id === Number(jam.productId)
                            ).name
                          }
                        </h3>
                        <p className="card-text">
                          {
                            products.find(
                              elem => elem.id === Number(jam.productId)
                            ).description
                          }
                        </p>
                        <h5 className="card-text font-weight-bold">
                          ${(
                            products.find(
                              elem => elem.id === Number(jam.productId)
                            ).price * jam.quantity
                          ).toFixed(2)}
                        </h5>
                        <div className="card-text">
                          Quantity:
                          <select
                            value={jam.quantity}
                            onChange={() =>
                              this.handleUpdate(
                                jam.productId,
                                event.target.value,
                                products.find(
                                  product =>
                                    Number(jam.productId) === product.id
                                ).price
                              )
                            }
                          >
                            {this.populateSelect(jam.quantity)}
                          </select>
                        </div>
                      </div>
                      <div className="text-center mb-3">
                        <button
                          onClick={() =>
                            this.handleClick(Number(jam.productId))
                          }
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
                  this.guestQuantity
                }{' '}
                item{this.guestQuantity > 1 ? 's)' : ')'}:{' '}
                <span className="font-weight-bold">
                  ${this.guestTotal.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-primary my-3 mx-3"
                onClick={() => {
                  localStorage.clear()
                  this.props.history.push('/products')
                }}
              >
                Checkout
              </button>
            </form>
            <ToastContainer />
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
  user: state.user,
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders()),
  removeFromCart: (orderId, productId) =>
    dispatch(removeFromCartThunk(orderId, productId)),
  checkoutThunk: orderId => dispatch(checkoutThunk(orderId)),
  updateCart: (orderId, productId, quantity, unitPrice) => {
    dispatch(updateCartThunk(orderId, productId, quantity, unitPrice))
  },
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
