import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {NavLink as Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]))
    }
    const {allProducts} = this.props
    return (
      <div className="container">
        <h1 className="text-center">Look at All This Jam!</h1>
        <div className="row">
          {allProducts.map(product => {
            return (
              <div
                key={product.id}
                className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3"
              >
                <div className="card shadow h-100">
                  <img src={product.imageUrl} className="card-img-top h-75" />

                  <div className="card-body text-center">
                    <Link to={`/products/${product.id}`} className="card-link">
                      <p className="card-title">{product.name}</p>
                    </Link>
                    <p className="card-text font-weight-bold">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
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
