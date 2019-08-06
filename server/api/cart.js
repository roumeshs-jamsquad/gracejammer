const router = require('express').Router()
const {OrderDetail, Order, Product} = require('../db/models')
module.exports = router

router.post('/add', async (req, res, next) => {
  let {orderId, productId, quantity, price} = req.body
  try {
    const alreadyInCart = await OrderDetail.findOne({
      where: {
        orderId: orderId,
        productId: productId
      }
    })
    if (alreadyInCart) {
      alreadyInCart.quantity += quantity
      alreadyInCart.price = alreadyInCart.price * 100 + price * quantity
      await alreadyInCart.save()
      return res.json(alreadyInCart)
    } else {
      price = price * quantity
      await OrderDetail.create({
        quantity: quantity,
        price: price,
        orderId: orderId,
        productId: productId
      })
      const orders = await Order.findAll({
        include: [
          {
            model: Product
          }
        ]
      })
      const product = orders
        .find(order => order.id === orderId)
        .products.find(jam => jam.id === productId)
      const sendDetails = {
        quantity: quantity,
        price: price,
        orderId: orderId,
        productId: productId,
        product: product
      }
      return res.json(sendDetails)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/remove', async (req, res, next) => {
  const {orderId, productId} = req.body
  try {
    const removedProduct = await OrderDetail.findOne({
      where: {
        orderId: orderId,
        productId: productId
      }
    })

    await removedProduct.destroy()

    res.send(removedProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  const {orderId} = req.body
  try {
    const order = await Order.findByPk(orderId)
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
    const {orderId, productId, quantity, unitPrice} = req.body
    const updatedProduct = await OrderDetail.findOne({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
    })
    const convertedSubTotal = (quantity * unitPrice * 100).toFixed(0)

    await updatedProduct.update({
      orderId,
      productId,
      quantity,
      price: convertedSubTotal
    })
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }
})
