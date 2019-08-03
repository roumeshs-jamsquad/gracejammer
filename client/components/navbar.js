import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="container">
    <h1 className="text-center">GRACEJAMMER</h1>
    {isLoggedIn ? (
      <nav className="navbar navbar-light">
        <div>
          <Link to="/home" className="nav-item navbar-text">
            Home
          </Link>
          <Link to="/products" className="nav-item navbar-text">
            View All Jams
          </Link>
        </div>
        <div>
          <Link to="/cart" className="nav-item navbar-text">
            Cart
          </Link>
          <a href="#" onClick={handleClick} className="navbar-text">
            Logout
          </a>
        </div>
      </nav>
    ) : (
      <nav className="navbar navbar-light">
        {/* The navbar will show these links before you log in */}
        <Link to="/products" className="nav-item navbar-text">
          View All Jams
        </Link>
        <div>
          <Link to="/cart" className="nav-item navbar-text">
            Cart
          </Link>
          <Link to="/login" className="nav-item navbar-text">
            Login
          </Link>
          <Link to="/signup" className="nav-item navbar-text">
            Sign Up
          </Link>
        </div>
      </nav>
    )}
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
