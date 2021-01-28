import { Router } from "express";
const AuthRouter = Router();

import RefreshModel from "../module/refresh.module";
import UserModel from "../module/auth.module";

import { sha512 } from "js-sha512";
const jwt = require("jsonwebtoken");
import { v4 as uuidv4 } from "uuid";

AuthRouter.post("/register", async function (req, res) {
  try {
    const { email, password } = req.body;

    const candidat = await UserModel.findOne({ email });

    if (candidat)
      return res.status(400).json({
        message: "Email is using!",
      });

    const user = new UserModel({
      email,
      password: sha512.hmac("password", password),
      role: "user",
    });
    console.log(user);
    await user.save();
    res.status(201).json({ message: "User create" });
  } catch (error) {
    res.send(error);
  }
});
AuthRouter.post("/login", async function (req, res) {
  try {
    //console.log(req.body, req.cookies)
    const { email, password, visitorId } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.password !== sha512.hmac("password", password))
      res.status("400").json({ message: "Password incorrect" });

    const cons = await RefreshModel.find({ userId: user.id });
    //console.log(cons.length,cons)
    if (cons.length > 4) {
      RefreshModel.deleteOne(
        { refreshToken: cons[0].refreshToken },
        function (err) {
          if (err) throw err;
        }
      );
    }
    //console.log(cons.length)
    const refreshToken = uuidv4();

    const refreshTokenShema = new RefreshModel({
      userId: user.id,
      refreshToken: refreshToken,
      fingerprint: visitorId,
      expiresIn: new Date().getTime() + 1000 * 60 * 60 * 24 * 30,
      createdAt: new Date().getTime(),
    });
    // console.log(refreshTokenShema)
    await refreshTokenShema.save();
    const accesToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      "shhhh",
      { expiresIn: "30m" }
    ); //30m
    console.log("login");
    res.cookie("accesToken", accesToken, {
      maxAge: 30 * 60 * 1000,
      security: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 60 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      security: true,
    });
    res.status(201).json({ userId: user.id });
  } catch (error) {
    res.status("500").send(error);
  }
});

AuthRouter.post("/refresh-tokens", async function (req, res) {
  try {
    const { visitorId } = req.body;
    const { refreshToken } = req.cookies;

    const candidat = await RefreshModel.find({ refreshToken });

    if (candidat[0].fingerprint !== visitorId) {
      RefreshModel.deleteOne({ refreshToken: refreshToken }, function (err) {
        if (err) throw err;
      });
      res.cookie("accesToken", "", { maxAge: 0, security: true });
      res.cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
        security: true,
      });
      res.status("400").json({ message: "Person incorrect" });
    } else {
      const refreshTokenNew = uuidv4();

      const refreshTokenShema = new RefreshModel({
        userId: candidat[0].userId,
        refreshToken: refreshTokenNew,
        fingerprint: candidat[0].fingerprint,
        expiresIn: new Date().getTime() + 1000 * 60 * 60 * 24 * 30,
        createdAt: new Date().getTime(),
        status: "refreshed",
      });

      await refreshTokenShema.save();

      const user = await UserModel.findById(candidat[0].userId);

      const accesToken = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        "shhhh",
        { expiresIn: "30m" }
      ); //30m
      //           const accesToken = jwt.sign({userId: candidat.userId}, 'shhhh', { expiresIn: '30m' }) //30m

      RefreshModel.deleteOne(
        { refreshToken: candidat[0].refreshToken },
        function (err) {
          if (err) throw err;
        }
      );

      console.log(accesToken, refreshTokenNew, "create");
      res.cookie("accesToken", accesToken, {
        maxAge: 30 * 60 * 1000,
        security: true,
      });
      res.cookie("refreshToken", refreshTokenNew, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        security: true,
      });
      res.status("201").json({ message: "Hi bir" });
    }
  } catch (error) {
    console.log(error);
    res.cookie("accesToken", "", { maxAge: 0, security: true });
    res.cookie("refreshToken", "", {
      maxAge: 0,
      httpOnly: true,
      security: true,
    });

    res.status("500").send(error);
  }
});
AuthRouter.post("/verifyToken", async function (req, res) {
  try {
    const { accesToken } = req.cookies;
    res.status(201).json(jwt.verify(accesToken, "shhhh"));
  } catch (error) {
    res.status("500").send(error);
  }
});
AuthRouter.post("/logout", async function (req, res) {
  try {
  } catch (error) {
    res.status("500").send(error);
  }
});

export default AuthRouter;
