const router = require('express').Router()
const {OrderDetail} = require('../db/models')
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
      await alreadyInCart.save()
      return res.json(alreadyInCart)
    } else {
      const product = await OrderDetail.create(req.body)
      return res.json(product)
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
