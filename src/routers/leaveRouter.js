const express = require("express");
const leaveRouter = express.Router();
const authenticate = require("../middlewares/authentication");
const getUserInfo = require("../middlewares/getUserInfo");
const {
  createRecord,
  userLeaves,
  getApplications,
} = require("../functions/prismaFunction");

// prefix string
// /leave/

leaveRouter.post("/apply", authenticate, getUserInfo, async (req, res) => {
  let username = req.userInfo.username;
  let stage = req.userInfo.role;
  let status = undefined;
  let rejMessage = undefined;
  let { type, name, from, to, reqMessage } = req.body;
  try {
    let record = await createRecord({
      username,
      name,
      stage,
      type,
      from,
      to,
      status,
      reqMessage,
      rejMessage,
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
    console.log(error);
    res.status(500).json({
      msg: "Internal server Error",
      error: error,
    });
  }
});

leaveRouter.get(
  "/getApplications",
  authenticate,
  getUserInfo,
  async (req, res) => {
    let applications = undefined;
    try {
      let role = req.userInfo.role;
      if (role === "FACULTY") {
        res.status(400).json({
          success: false,
          msg: "Not authorized for this operation",
        });
      }
      if (role === "HOD") {
        applications = await getApplications("FACULTY");
      }
      if (role === "DIRECTOR") {
        applications = await getApplications("HOD");
      }

      res.status(200).json({
        success: true,
        body: applications,
      });
    } catch (error) {
      res.status(502).json({
        success: false,
        body: error,
      });
    }
  }
);

module.exports = leaveRouter;
