const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetail = db.define('orderDetail', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    get() {
      return this.getDataValue('price') / 100
    }
  }
})

module.exports = OrderDetail
