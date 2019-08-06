// const pk_test_MY_PUBLISHABLE_KEY = require('../../secrets.js')

const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_live_MY_PUBLISHABLE_KEY'
    : 'pk_test_JjzeOPJ8ceTQEnODF3ddpPDT00S6kfk4mN'

export default STRIPE_PUBLISHABLE
