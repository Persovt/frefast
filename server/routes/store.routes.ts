import { Router } from "express";
import StoreModel from "../module/store.module";
import TimeFileModel from "../module/timeFiles.module";
import RefreshModel from "../module/refresh.module";
import SiteModel from "../module/site.module";
const StoreRouter = Router();

var multer = require("multer");

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

StoreRouter.post(
  "/createTimeFile",
  upload.single("file"),
  async function (req: any, res) {
    const { siteName } = req.cookies

    const newTimeFile = await new TimeFileModel({
      file: "data:image/png;base64," + req.file.buffer.toString("base64"),
    });

    // await SiteModel.updateOne(
    //   { name: siteName },
    //   {
       
    //     timeFiles: newTimeFile,
    //   }
    // );


    await newTimeFile.save();

    res.status(201).json(newTimeFile.id);
  }
);

StoreRouter.post("/addNewProduct", async function (req, res) {
  try {
    
    
    const {
      nameProduct,
      TimeImageId,
      descriprionProduct,
      priceProduct,
      amountProduct,
      typeProduct
    } = req.body;
    const { siteName } = req.cookies
    //const site = await SiteModel.findOne({name: siteName});
    console.log(typeProduct)
    const img = await TimeFileModel.findById(TimeImageId);

    const newProduct = await new StoreModel({
      img: img.file,
      name: nameProduct,
      description: descriprionProduct,
      price: priceProduct,
      amount: amountProduct,
      shopName: siteName,
      typeProduct,
      visibleCart: false,
      cheackCart: false
    });

    newProduct.save();

 

    TimeFileModel.deleteOne({ _id: TimeImageId }, function (err) {
      if (err) throw err;
    });

    res.status(201).json({ message: "Product create" });
  } catch (error) {
    res.status(500).send(error);
  }
});
StoreRouter.post("/deleteProduct", async function (req, res) {
  try {
  
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
    const { nameProduct, descriprionProduct, id } = req.body;
    const { siteName } = req.cookies

    await StoreModel.updateOne(
      { _id: id },
      {
        name: nameProduct,
        description: descriprionProduct,
      }
    );

    // await SiteModel.updateOne(
    //   { name: siteName },
    //   {
    //    store: [...site.store, newProduct],
    //    // timeFiles: {},
    //   }
    // );

    //await model.save();
    res.status(200).json({ message: "Product redacted!" });
  } catch (error) {
    res.status(500).send(error);
  }
});

StoreRouter.get("/loadProduct", async function (req, res) {
  
  try {
    const { siteName } = req.cookies
    //const site = await SiteModel.findOne({name: siteName});
    const products = await StoreModel.find({shopName: siteName});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default StoreRouter;
