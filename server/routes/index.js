//import { Router } from "express";
const Router = require('express')
const AuthRouter = require('./auth.routes')
const StoreRouter = require('./store.routes')
const SiteRouter = require('./site.routes')
const OrderRouter = require('./order.routes')
const routes = Router();

routes.use("/auth", AuthRouter);
routes.use("/store", StoreRouter);
routes.use("/site", SiteRouter);
routes.use('/order', OrderRouter)

//export default routes;

module.exports = routes