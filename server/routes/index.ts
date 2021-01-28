import { Router } from "express";
import authRouter from "./auth.routes";
import StoreRouter from "./store.routes";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/store", StoreRouter);
export default routes;
