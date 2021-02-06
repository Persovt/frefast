const Router = require('express')
const SiteShema = require('../module/site.module')
const RefreshModel = require('../module/refresh.module')


const SiteRouter = Router();

SiteRouter.post("/cheackSite", async function (req, res) {
  const {
    siteName
  } = req.body;

  console.log(siteName);
  const candidat = await SiteShema.findOne({
    name: siteName
  });

  if (!candidat) res.status(400).json({
    message: "Site not found "
  });

  res.cookie("siteName", siteName);
  res.status(201).json(candidat);
});

SiteRouter.post("/addSite", async function (req, res) {
  const {
    siteName
  } = req.body;
  const {
    refreshToken
  } = req.cookies;
  console.log(siteName, refreshToken);
  const candidat = await SiteShema.findOne({
    name: siteName
  });
  const user = await RefreshModel.findOne({
    refreshToken
  });
  console.log(user.userId);

  if (candidat) res.status(400).json({
    message: "Name is zanato"
  });

  const newSite = new SiteShema({
    name: siteName,
    adminId: user.userId,
    balance: 0,
    config: {
      background: "black",
    },
    store: {},
    timeFiles: {},
  });

  await newSite.save();

  res.status(201).json({
    message: "site created"
  });
});

module.exports = SiteRouter