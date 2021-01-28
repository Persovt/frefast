import { Router } from "express";
import StoreModel from "../module/store.module";
const fs = require("fs");
const StoreRouter = Router();

StoreRouter.post("/addNewProduct", async function (req, res) {
  try {
    const { nameProduct, imageUrl, descriprionProduct } = req.body;
    const newProduct = new StoreModel({
      //img: imageUrl,
      name: nameProduct,
      description: descriprionProduct,
    });
    newProduct.save();
    res.status(201).json({ message: "Product create" });
  } catch (error) {
    res.status(500).send(error);
  }
});
StoreRouter.post("/deleteProduct", async function (req, res) {
  try {
      console.log(req.body.id)
      StoreModel.deleteOne({ _id: req.body.id }, function (err) {
        if (err) throw err;
      });
      res.status(200).json({ message: "Product delete" });
  } catch (error) {
    res.status(500).send(error);
  }
});

StoreRouter.post("/redactProduct", async function (req, res) {
  try {
      const {nameProduct, descriprionProduct, id} = req.body
      console.log(id,nameProduct,descriprionProduct)


    await StoreModel.updateOne({_id: id}, {
        name: nameProduct,
        description: descriprionProduct,
      })

      //await model.save();
      res.status(200).json({ message: "Product redacted!" });
  } catch (error) {
    res.status(500).send(error);
  }
});

StoreRouter.get("/loadProduct", async function (req, res) {
  try {
    const products = await StoreModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default StoreRouter;
