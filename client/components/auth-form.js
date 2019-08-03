import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="text-center container">
      <form onSubmit={handleSubmit} name={name}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            <small className="form-text text-muted">Email</small>
          </label>
          <input name="email" type="email" className="form-control" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">
            <small className="form-text text-muted">Password</small>
          </label>
          <input name="password" type="password" className="form-control" />
        </div>
        <br />
        <div>
          <button type="submit" className="btn btn-primary">
            {displayName}
          </button>
        </div>
        <br />
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <nav className="navbar navbar-light">
        <a href="/auth/google" className="nav-item navbar-text mx-auto">
          {displayName} with Google
        </a>
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
