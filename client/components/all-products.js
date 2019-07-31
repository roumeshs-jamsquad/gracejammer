import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div>
        <h1>Look at All This Jam!</h1>
        {this.props.allProducts.map(product => {
          return (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <img src={product.imageUrl} />
              <p>Price: ${product.price}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
