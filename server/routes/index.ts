import { Router } from "express";
import authRouter from "./auth.routes";
import StoreRouter from "./store.routes";
import SiteRouter from './site.routes'
import OrderRouter from './order.routes'
const routes = Router();

routes.use("/auth", authRouter);
routes.use("/store", StoreRouter);
routes.use("/site", SiteRouter);
routes.use('/order', OrderRouter)
export default routes;
