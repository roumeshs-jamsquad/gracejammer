const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://gracejammer.herokuapp.com'
    : 'http://localhost:8080'

// const pk_test_MY_PUBLISHABLE_KEY = require('../../secrets.js')

const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_live_MY_PUBLISHABLE_KEY'
    : 'pk_test_JjzeOPJ8ceTQEnODF3ddpPDT00S6kfk4mN'

module.exports = {
  PAYMENT_SERVER_URL
}
