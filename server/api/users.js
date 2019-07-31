const router = require('express').Router()
const {User, Order, OrderDetail, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/orders', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          include: [
            {
              model: Product
            }
          ]
        }
      ]
    })
    res.json(user.orders)
  } catch (err) {
    next(err)
  }
})
