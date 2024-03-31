const express = require("express");
const leaveRouter = express.Router();
const authenticate = require("../middlewares/authentication");
const getUserInfo = require("../middlewares/getUserInfo");
const { createRecord, userLeaves } = require("../functions/prismaFunction");

leaveRouter.post("/apply", authenticate, getUserInfo, async (req, res) => {
  try {
    const record = await createRecord({});
  } catch (error) {}
});

leaveRouter.get("/", authenticate, getUserInfo, async (req, res) => {
  try {
    const userLeaves = await userLeaves(req.userInfo.username);
    res.status(200).json({
      success: true,
      body: userLeaves,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server Error",
      error: error,
    });
  }
});

module.exports = leaveRouter;
