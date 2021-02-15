const Router = require('express')
const RefreshModel = require('../module/refresh.module')
const OrderModel = require('../module/order.module')
const StoreModel = require('../module/store.module')
const SiteShema = require('../module/site.module')
const OrderRouter = Router();

OrderRouter.post("/kassa", async function (req, res) {
  console.log(req.body)
})

OrderRouter.post("/addOrder", async function (req, res) {
  const {
    adres,
    city,
    index,
    street,
    userId,
    products,
    price
  } = req.body;
 
  const {
    siteName,
    refreshToken
  } = req.cookies;

 
  products.map(async (item) => {



    await StoreModel.updateOne({
      _id: item._id
    }, {
      amount: item.amount - item.count,
    });

  })

  const newOrder = new OrderModel({
    shopName: siteName,
    userId,
    data: {
      adres,
      city,
      index,
      street,
    },
    status: "await",
    products,
    price
  });

  newOrder.save();

  res.status(201).json("order added");
});

OrderRouter.post("/redact", async function (req, res) {

  const {
    status,
    id
  } = req.body;
  const {
    siteName,
    refreshToken
  } = req.cookies;
  const orderCandidat = await OrderModel.findOne({
    _id: id
  })

  const siteCandidat = await SiteShema.findOne({
    name: siteName
  })
 
  if (status === 'delivered')
    await SiteShema.updateOne({
      name: siteName
    }, {
      balance: +orderCandidat.price + +siteCandidat.balance
    })

  await OrderModel.updateOne({
    _id: id
  }, {
    status: status,
  });

  res.status(201).json({
    message: 'redacted!'
  });
});
OrderRouter.post("/loadOrder", async function (req, res) {

  const {
    siteName,
    id
  } = req.cookies;
  console.log(siteName, 'load')
  const orders = await OrderModel.find({
    shopName: siteName
  })
  console.log(orders)
  res.status(201).json({
    orders
  });
});

module.exports = OrderRouter