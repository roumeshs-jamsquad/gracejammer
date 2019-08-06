import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {fetchOrders, addToCartThunk} from '../store/orders'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: ''
    }
    this.price = 0
  }

  handleAdd = evt => {
    evt.preventDefault()
    this.props.addToCartThunk({
      orderId: Number(
        this.props.orders.find(
          order => !order.status && order.userId === this.props.user.id
        ).id
      ),
      productId: Number(this.props.match.params.id),
      quantity: Number(this.state.quantity),
      price: Number((this.price * 100).toFixed(2))
    })
    this.props.history.push('/cart')
  }

  handleChange = evt => {
    const {name, value} = evt.target
    this.setState({
      [name]: value
    })
  }

  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchOrders()
  }

  render() {
    const {products} = this.props
    const product = products.find(
      elem => elem.id === Number(this.props.match.params.id)
    )
    if (product) this.price = product.price
    return product !== undefined ? (
      <div className="container">
        <div className="card shadow">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={product.imageUrl} className="card-img" />
            </div>
            <div className="col-md-8 text-center">
              <h2 className="card-title">{product.name}</h2>
              <p className="card-text">{product.description}</p>
              <h5 className="card-text font-weight-bold">
                ${product.price.toFixed(2)}
              </h5>
              <form onSubmit={this.handleAdd}>
                <div className="form-group">
                  <div className="form-text">Quantity: </div>
                  <input
                    name="quantity"
                    type="number"
                    min="1"
                    max="30"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  <button type="submit" className="btn-secondary my-3">
                    Add To Cart
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>loading...</div>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchOrders: () => dispatch(fetchOrders()),
    addToCartThunk: product => dispatch(addToCartThunk(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
