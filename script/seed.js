'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const Product = require('../server/db/models/product')
const Order = require('../server/db/models/order')
const OrderDetail = require('../server/db/models/orderDetail')

const products = [
  {
    name: 'Strawberry Jam',
    description:
      'More fruit and 39% less sugar. Made with the finest natural ingredients, full of large pieces of premium quality strawberries, Gracejammer Strawberry delivers an authentic, homemade taste with just the right touch of sweetness.',
    price: 965,
    quantity: 200,
    imageUrl:
      'https://mpng.pngfly.com/20190215/uob/kisspng-jam-portable-network-graphics-clip-art-marmalade-d-fraabiecajolinejamjarvicu-7-png-frascos-decor-5c66d67eed2c15.2541012515502434549715.jpg'
  },
  {
    name: 'Blueberry Jam',
    description:
      'The complex, tangy flavor of Gracejammer’s Seedless Blackberry Jam captures the warm, earthy days of late summer. Picked plump and juicy, our blackberries cook into a rich jam with an ideal spoonable texture. Spread on a scone, add to oatmeal, or use as a sauté base for chicken.',
    price: 970,
    quantity: 200,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAhw4Obf3fq0ykIO49yOSJCOAU8bs8_8bToYZ3BP9nvm5N0TN'
  },
  {
    name: 'Blackberry Jam',
    description:
      'Enjoyed throughout history for its uniquely sweet and delicious flavor, blackberries have always been one of our favorites. Using the ripest, juiciest blackberries and a touch of pure cane sugar, this wonderfully light and tasty jam is great on muffins, toast, in hot cereal or on a peanut butter sandwich.',
    price: 875,
    quantity: 200,
    imageUrl:
      'http://2.bp.blogspot.com/_-aUbHU82SDM/TFdLswOV8LI/AAAAAAAAB7o/QjYaunMb874/s640/Jam.jpg'
  },
  {
    name: 'Apricot Jam',
    description:
      'Gracejammer Apricot Preserves glow with the orange-yellow luster of fresh, ripe apricots. Each jar is filled with large pieces of apricots making every bite a delicious treat. Try it on toast, muffins, in a recipe or as part of a sauce.',
    price: 965,
    quantity: 200,
    imageUrl:
      'https://us.123rf.com/450wm/kamenuka/kamenuka1505/kamenuka150500006/39953530-stock-vector-apricot-jam-honey-mason-jar-watercolor-hand-painted-.jpg?ver=6'
  },
  {
    name: 'Concord Grape Jam',
    description:
      "Concord grape is the national j̶e̶l̶l̶y̶ jam. With its deep purple color and robust sweetness, Concord grape is quintessential for our beloved PB&J. It's been 160 years since the variety was developed in Concord, Mass, and the annual U.S. harvest is now 400,000 tons. That's a lot of peanut butter and j̶e̶l̶l̶y̶ jam sandwiches. Yum. Among superfruits, Concord grape is an unsung hero. The USDA reports that Concord grape juice has almost as much antioxidant activity as blueberry juice! We use concentrated Concord grape juice in this super Premium Spread.",
    price: 850,
    quantity: 200,
    imageUrl:
      'https://png.pngtree.com/png-clipart/20190118/ourmid/pngtree-hand-painted-cartoon-delicious-luster-png-image_445278.jpg'
  }
]

const orders = [
  {
    userId: 1,
    status: false
  },
  {
    userId: 2,
    status: false
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

  await Promise.all(
    orders.map(order => {
      return Order.create(order)
    })
  )

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
