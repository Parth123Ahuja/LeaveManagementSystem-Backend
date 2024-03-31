require("dotenv").config();
const express = require("express");
const router = require("./routers/index");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log("server is running on ", port);
});
