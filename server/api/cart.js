const router = require('express').Router()
const {OrderDetail, Order, Product} = require('../db/models')
module.exports = router

router.post('/add', async (req, res, next) => {
  try {
    const alreadyInCart = await OrderDetail.findOne({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
    })
    if (alreadyInCart) {
      alreadyInCart.quantity += req.body.quantity
      alreadyInCart.price =
        alreadyInCart.price * 100 + req.body.price * req.body.quantity
      await alreadyInCart.save()
      return res.json(alreadyInCart)
    } else {
      req.body.price = req.body.price * req.body.quantity
      await OrderDetail.create({
        quantity: req.body.quantity,
        price: req.body.price,
        orderId: req.body.orderId,
        productId: req.body.productId
      })
      const orders = await Order.findAll({
        include: [
          {
            model: Product
          }
        ]
      })
      const product = orders
        .find(order => order.id === req.body.orderId)
        .products.find(jam => jam.id === req.body.productId)
      const sendDetails = {
        quantity: req.body.quantity,
        price: req.body.price,
        orderId: req.body.orderId,
        productId: req.body.productId,
        product: product
      }
      return res.json(sendDetails)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/remove', async (req, res, next) => {
  try {
    const removedProduct = await OrderDetail.findOne({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
    })

    await removedProduct.destroy()

    res.send(removedProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.orderId)
    order.status = true
    order.save()
    await Order.create({
      status: false,
      userId: req.session.passport.user
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/update', async (req, res, next) => {
  try {
    const updatedProduct = await OrderDetail.findOne({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
      //update quantity in products table
    })
    await updatedProduct.update(req.body)
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }
})
