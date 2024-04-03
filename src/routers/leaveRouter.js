const express = require("express");
const leaveRouter = express.Router();
const authenticate = require("../middlewares/authentication");
const getUserInfo = require("../middlewares/getUserInfo");
const { createRecord, userLeaves } = require("../functions/prismaFunction");

// prefix string
// /leave/

leaveRouter.post("/apply", authenticate, getUserInfo, async (req, res) => {
  let username = req.userInfo.username;
  let stage = req.userInfo.role;
  let status = "accepted";
  let rejMessafe = "awaiting confimation";
  let { type, from, to, reqMessage } = req.body;
  try {
    let record = await createRecord({
      username,
      stage,
      type,
      from,
      to,
      status,
      reqMessage,
    });
    res.status(201).json({
      success: true,
      msg: "leave applied success",
      body: record,
    });
  } catch (error) {
    res.status(500).json({
      error: `failed to post leave :- ${error}`,
    });
  }
});

leaveRouter.get("/getLeaves", authenticate, getUserInfo, async (req, res) => {
  try {
    let leaves = await userLeaves(req.userInfo.username);
    res.status(200).json({
      success: true,
      body: leaves,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server Error",
      error: error,
    });
  }
});

module.exports = leaveRouter;
