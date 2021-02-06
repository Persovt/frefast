const Router = require('express')
const SiteShema = require('../module/site.module')
const RefreshModel = require('../module/refresh.module')
const OrderModel = require('../module/order.module')


const OrderRouter = Router();

OrderRouter.post("/addOrder", async function (req, res) {
  const {
    adres,
    city,
    index,
    street,
    userId,
    products
  } = req.body;
  const {
    siteName,
    refreshToken
  } = req.cookies;
  console.log(req.body);

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
  });

  newOrder.save();

  res.status(201).json("order added");
});
OrderRouter.post("/loadOrder", async function (req, res) {

  const {
    siteName
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