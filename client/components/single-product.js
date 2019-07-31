import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const {products} = this.props
    const product = products.find(
      elem => elem.id === Number(this.props.match.params.id)
    )
    console.log(typeof this.props.match.params.id)
    return product !== undefined ? (
      <div>
        <div>
          <h2>{product.name}</h2>
          <img src={product.imageUrl} />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
        <button type="button">Add</button>
      </div>
    ) : (
      <div>loading...</div>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
