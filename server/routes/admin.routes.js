const Router = require('express')
const SiteShema = require('../module/site.module')


const AdminRouter = Router();

AdminRouter.post("/applyConfig", async function (req, res) {
    const {
        priceDelivery
    } = req.body;
    const {
        siteName,

    } = req.cookies;

    await SiteShema.updateOne({
        name: siteName
    }, {
        config: {priceDelivery}
    })
    console.log(priceDelivery);

    res.status(201).json();
});



module.exports = AdminRouter